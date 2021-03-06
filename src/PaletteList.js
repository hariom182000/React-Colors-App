import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ListItemText from '@material-ui/core/ListItemText';
import styles from './styles/PaletteListStyles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
class PaletteList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openDeleteDialog: false,
			deletingId: ''
		};
		this.goToPalette = this.goToPalette.bind(this);
		this.toggleDeleteDialog = this.toggleDeleteDialog.bind(this);
		this.handleDelete=this.handleDelete.bind(this)
	}
	toggleDeleteDialog(id) {
		this.setState({ openDeleteDialog: !this.state.openDeleteDialog, deletingId: id });
	}
	goToPalette(id) {
		this.props.history.push(`/palette/${id}`);
	}
	handleDelete() {
		this.props.deletePalette(this.state.deletingId);
		this.setState({
			openDeleteDialog: false,
			deletingId: ''
		});
	}
	render() {
		const { palettes, classes } = this.props;
		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h1 className={classes.heading}>React Colors</h1>
						<Link to="/palette/new">Create Palette</Link>
					</nav>

					<TransitionGroup className={classes.palettes}>
						{palettes.map((palette) => (
							<CSSTransition key={palette.id} classNames="fade" timeout={500}>
								<MiniPalette
									{...palette}
									handleClick={this.goToPalette}
									//deletePalette={deletePalette}
									openDialog={this.toggleDeleteDialog}
									key={palette.id}
								/>
							</CSSTransition>
						))}
					</TransitionGroup>
				</div>
				<Dialog
					open={this.state.openDeleteDialog}
					aria-labelledby="delete-dialog-title"
					onClose={this.toggleDeleteDialog}
				>
					<DialogTitle id="delete-dialog-title">delete this palette</DialogTitle>
					<List>
						<ListItem button onClick={this.handleDelete}>
							<ListItemAvatar>
								<Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
									<CheckIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText>Delete</ListItemText>
						</ListItem>
						<ListItem button onClick={this.toggleDeleteDialog}>
							<ListItemAvatar>
								<Avatar style={{ backgroundColor: red[100], color: red[600] }}>
									<CloseIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText>Cancel</ListItemText>
						</ListItem>
					</List>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(PaletteList);
