import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteStyles';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';

class SingleColorPalette extends Component {
	constructor(props) {
		super(props);
		this._shades = this.gatherShades(this.props.palette, this.props.colorId);
		this.state = {
			format: 'hex',
			open: false
		};
		this.changeFormat = this.changeFormat.bind(this);
	}

	changeFormat(val) {
		this.setState({
			format: val
		});
	}
	gatherShades(palette, colorToFilterBy) {
		let shades = [];
		let allColors = palette.colors;
		for (let key in allColors)
			shades = shades.concat(allColors[key].filter((color) => color.id === colorToFilterBy));

		return shades.slice(1);
	}
	render() {
		const { format } = this.state;
		const { paletteName, emoji, id } = this.props.palette;
		const { classes } = this.props;
		const colorBoxes = this._shades.map((c) => (
			<ColorBox name={c.name} key={c.name} background={c[format]} showingFullPalette={false} />
		));
		return (
			<div className={classes.Palette}>
				<Navbar handleChange={this.changeFormat} showingAllColor={false} />
				<div className={classes.colors}>
					{colorBoxes}
					<div className={classes.goBack}>
						<Link to={`/palette/${id}`}>Go Back</Link>
					</div>
				</div>
				<PaletteFooter paletteName={paletteName} emoji={emoji} />
			</div>
		);
	}
}

export default withStyles(styles)(SingleColorPalette);
