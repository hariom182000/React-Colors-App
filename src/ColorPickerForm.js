import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/styles';

const styles = {
	picker: {
		marginTop: '2rem',
		width: '100%'
	},
    addColor:{
        width:'100%',
        padding:'1rem',
        marginTop:'1rem',
        fontSize:'1rem'
    },
    colorNameInput:{
        width:'100%',
        height:'70px'
    }
};
class ColorPickerForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentColor: '#008080',
			newName: ''
		};
		this.updateCurrentColor = this.updateCurrentColor.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	componentDidUpdate() {
		ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
			//colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase());

			let bol = true;
			for (let c of this.props.colors) {
				if (c.name.toLowerCase() !== this.state.newName.toLowerCase()) {
					bol = true;
					//console.log(bol,c.name,newName)
				} else {
					//console.log(bol,c.name,newName)
					bol = false;
					break;
				}
			}
			return bol;
		});
		ValidatorForm.addValidationRule('isColorUnique', (value) => {
			//colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase());

			let bol = true;
			for (let c of this.props.colors) {
				if (c.color !== this.state.currentColor) {
					bol = true;
					//console.log(bol,c.color,currentColor)
					//break;
				} else {
					//console.log(bol,c.color,currentColor)
					bol = false;
					break;
				}
			}
			return bol;
		});
	}
	updateCurrentColor(newColor) {
		this.setState({ ...this.state, currentColor: newColor.hex });
	}

	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	}
	handleSubmit() {
		const nColor = { color: this.state.currentColor, name: this.state.newName };
		this.props.addColor(nColor);
		this.setState({ currentColor: '', newName: '' });
	}

	render() {
		const { paletteIsFull, classes } = this.props;
		const { currentColor, newName } = this.state;
		return (
			<div>
				<ChromePicker
					color={currentColor}
					onChangeComplete={(newColor) => this.updateCurrentColor(newColor)}
					className={classes.picker}
				/>
				<ValidatorForm onSubmit={() => this.handleSubmit()}>
					<TextValidator
						value={newName}
						onChange={this.handleChange}
						name="newName"
						validators={[ 'required', 'isColorNameUnique', 'isColorUnique' ]}
						errorMessages={[ 'this field is required', 'color name must be unique', 'color already used' ]}
                        className={classes.colorNameInput}
                        variant='filled'
                        margin='normal'
                        placeholder='color name'
					/>
					<Button
						variant="contained"
						color="primary"
						style={{ background: paletteIsFull ? 'rgba(0, 0, 0, 0.14)' : currentColor }}
						type="submit"
						disabled={paletteIsFull}
                        className={classes.addColor}
					>
						{paletteIsFull ? 'Palette Full' : 'Add Color'}
					</Button>
				</ValidatorForm>
			</div>
		);
	}
}

export default withStyles(styles)(ColorPickerForm);
