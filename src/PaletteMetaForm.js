import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
export default function PaletteMetaForm(props) {
	const [ stage, setStage ] = React.useState('form');
	const [ newPaletteName, setNewPaletteName ] = React.useState('');

	const handleChange = (evt) => {
		setNewPaletteName(evt.target.value);
	};
    const showEmojiPicker=()=>{
        //props.handleSubmit(newPaletteName)
        setStage('emoji')
    }
    const savePalette=(emoji)=>{
        const newPalette={paletteName:newPaletteName,emoji:emoji.native}
        props.handleSubmit(newPalette)
    }

	useEffect(() => {
		ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
			let bol = true;
			for (let p of props.palettes) {
				if (p.paletteName.toLowerCase() !== newPaletteName.toLowerCase()) {
					bol = true;
				} else {
					bol = false;

					break;
				}
			}
			return bol;
		});
	});

	return (
		<div>
			<Dialog open={stage==='emoji'} onClose={props.hideForm}>
            <DialogTitle id="form-dialog-title">pick a palette emoji</DialogTitle>
				<Picker onSelect={savePalette} title='pick a palette emoji'/>
			</Dialog>
			<Dialog open={stage==='form'} onClose={props.hideForm} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please enter a name for your new beautiful Palette. Make sure it's unique.
					</DialogContentText>

					<ValidatorForm onSubmit={() =>showEmojiPicker()}>
						<TextValidator
							value={newPaletteName}
							label="Palette Name"
							name="newPaletteName"
							onChange={handleChange}
							validators={[ 'required', 'isPaletteNameUnique' ]}
							errorMessages={[ 'this field is required', 'Palette name must be unique' ]}
						/>
						<DialogActions>
							<Button onClick={props.hideForm} color="primary">
								Cancel
							</Button>
							<Button variant="contained" color="primary" type="submit">
								Save Palette
							</Button>
						</DialogActions>
					</ValidatorForm>
				</DialogContent>
			</Dialog>
		</div>
	);
}
