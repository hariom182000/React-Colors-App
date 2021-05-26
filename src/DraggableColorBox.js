import React from 'react-color';
import { withStyles } from '@material-ui/styles';
import { SortableElement } from 'react-sortable-hoc';
import DeleteIocn from '@material-ui/icons/Delete';
import sizes from './styles/sizes';
import chroma from 'chroma-js';
const styles = {
	root: {
		width: '20%',
		height: '25%',
		display: 'inline-block',
		margin: '0 auto',
		position: 'relative',
		cursor: 'pointer',
		marginBottom: '-3.5px',
		'&:hover svg': {
			color: 'white',
			transfrom: 'scale(1.5)'
		},
		[sizes.down('lg')]: {
			width: '25%',
			height: '20%'
		},
		[sizes.down('md')]: {
			width: '50%',
			height: '10%'
		},
		[sizes.down('sm')]: {
			width: '100%',
			height: '5%'
		}
	},
	boxContent: {
		position: 'absolute',
		width: '100%',
		left: '0px',
		bottom: '0px',
		padding: '10px',
		letterSpacing: '1px',
		textTransform: 'uppercase',
		fontSize: '12px',
		display: 'flex',
		justifyContent: 'space-between',
		color: (props) => (chroma(props.color).luminance() <= 0.08 ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.6)')
	},
	deleteIocn: {
		transition: 'all 0.3s ease-in-out'
	}
};
const DraggableColorBox = SortableElement((props) => {
	const { classes, handleClick, name, color } = props;
	return (
		<div style={{ backgroundColor: color }} className={classes.root}>
			<div className={classes.boxContent}>
				<span>{name}</span>
				<DeleteIocn className={classes.deleteIocn} onClick={handleClick} />
			</div>
		</div>
	);
});

export default withStyles(styles)(DraggableColorBox);
