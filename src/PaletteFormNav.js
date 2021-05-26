import React, { Component } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { withStyles } from '@material-ui/styles';
import PaletteMetaForm from './PaletteMetaForm';
import sizes from './styles/sizes'

const styles = {
	navBtns: {
		'& a':{
			textDecoration:'none',

		},
		
	},
	button:{
		margin:'0.8rem auto',
		[sizes.down('xs')]:{
			margin:0,
			padding:'0.3rem'
		}
	}
};

class PaletteFormNav extends Component {
	constructor(props) {
		super(props);
		this.state={
			formShowing:false
		}
		this.showForm=this.showForm.bind(this)
		this.hideForm=this.hideForm.bind(this)
	}
	showForm(){
		this.setState({formShowing:true})
	}
	hideForm(){
		this.setState({formShowing:false})
	}
	render() {
		const { classes, open, handleSubmit, handleDrawerOpen, palettes } = this.props;

		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					color="default"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open
					})}
				>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							name="open"
							edge="start"
							className={clsx(classes.menuButton, open && classes.hide)}
						>
							<AddToPhotosIcon/>
						</IconButton>
						<Typography variant="h6" noWrap>
							Create Palette
						</Typography>
					</Toolbar>
					<div className={classes.navBtns}>
						<Link to="/">
							<Button variant="contained" color="secondary" className={classes.button}>
								GoBack
							</Button>
						</Link>
						<Button variant="contained" color="primary" onClick={this.showForm} className={classes.button}>
							Save
						</Button>
					</div>
				</AppBar>
				{this.state.formShowing && <PaletteMetaForm handleSubmit={handleSubmit} palettes={palettes} hideForm={this.hideForm}/>}
			</div>
		);
	}
}

export default withStyles(styles)(PaletteFormNav);
