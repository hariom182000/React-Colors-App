import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import PaletteFormNav from './PaletteFormNav';
import DraggableColorList from './DragabbleColorList';
import ColorPickerForm from './ColorPickerForm';
//import { arrayMove } from 'react-sortable-hoc';

const arrayMove = require('array-move');
const drawerWidth = 400;
const maxColors = 20;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	hide:{
		display:'none'
	},
	appBar: {
		transition: theme.transitions.create([ 'margin', 'width' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		flexDirection: 'row',
		justifyContent: 'space-between',
		//alignItems:'center',
		height: '64px'
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create([ 'margin', 'width' ], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth,
		display: 'flex',
		alignItems: 'center'
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		width: '100%',
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end'
	},
	content: {
		flexGrow: 1,
		height: '100vh',
		padding: 0,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: -drawerWidth
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: 0
	},
	container: {
		width: '90%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%'
	},
	buttons: {
		width: '100%'
	},
	button: {
		width: '50%'
	}
}));

export default function NewPaletteForm(props) {
	const classes = useStyles();
	const [ open, setOpen ] = React.useState(false);
	//const [ newName, setNewName ] = React.useState('');
	//const [ newPaletteName, setNewPaletteName ] = React.useState('');
	const [ colors, insertColor ] = React.useState([]);
	//const [ currentColor, changeCurrentColor ] = React.useState('#008080');
	const paletteIsFull = colors.length >= maxColors;

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const addColor = (nColor) => {
		//const nColor = { color: currentColor, name: newName };
		//console.log(nColor);
		insertColor([ ...colors, nColor ]);
		//setNewName('');
		//changeCurrentColor('');
	};

	const handleSubmit = (newPalette) => {
		newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
		newPalette.colors = colors;

		props.savePalette(newPalette);
		props.history.push('/');
	};
	const removeColor = (colorName) => {
		const nColors = colors.filter((c) => c.name !== colorName);
		insertColor(nColors);
	};
	const onSortEnd = ({ oldIndex, newIndex }) => {
		const nColor = (colors) => arrayMove(colors, oldIndex, newIndex);
		insertColor(nColor);
	};
	const clearPalette = () => {
		insertColor([]);
	};
	const addRandomColor = () => {
		const allColors = props.palettes.map((p) => p.colors).flat();
		let rand = Math.floor(Math.random() * allColors.length);
		let rcolor = allColors[rand];
		while (colors.indexOf(rcolor) !== -1) {
			rand = Math.floor(Math.random() * allColors.length);
			rcolor = allColors[rand];
		}
		insertColor([ ...colors, rcolor ]);
	};

	return (
		<div className={classes.root}>
			<PaletteFormNav
				open={open}
				classes={classes}
				palettes={props.palettes}
				handleSubmit={handleSubmit}
				handleDrawerOpen={handleDrawerOpen}
			/>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<div className={classes.container}>
					<Typography variant="h4" gutterBottom>
						Design your Palette
					</Typography>
					<div className={classes.buttons}>
						<Button variant="contained" color="secondary" onClick={clearPalette} className={classes.button}>
							Clear Palette
						</Button>
						<Button
							variant="contained"
							color="primary"
							onClick={addRandomColor}
							disabled={paletteIsFull}
							className={classes.button}
						>
							Random Color
						</Button>
					</div>
					<ColorPickerForm paletteIsFull={paletteIsFull} addColor={addColor} colors={colors} />
				</div>
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open
				})}
			>
				<div className={classes.drawerHeader} />

				<DraggableColorList colors={colors} removeColor={removeColor} axis="xy" onSortEnd={onSortEnd} distance={20}/>
			</main>
		</div>
	);
}
