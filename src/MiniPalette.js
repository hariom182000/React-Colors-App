import React from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete';

function MiniPalette(props) {
	const { classes, paletteName, emoji, colors, handleClick,id } = props;
	const miniColorBoxes = colors.map((c) => (
		<div className={classes.miniColor} style={{ backgroundColor: c.color }} key={c.name} />
	));
	const deletePalette=(e)=>{
		e.stopPropagation()
		props.openDialog(id)
	}
	return (
		<div className={classes.root} onClick={()=>handleClick(id)}>
			<DeleteIcon className={classes.deleteIcon} 
			style={{ transition: 'all 0.3s ease-in-out' }}
			onClick={deletePalette} />
			<div className={classes.colors}>{miniColorBoxes}</div>
			<h5 className={classes.title}>
				{paletteName}
				<span className={classes.emoji}>{emoji}</span>
			</h5>
		</div>
	);
}

export default withStyles(styles)(MiniPalette);
