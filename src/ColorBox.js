import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from './styles/ColorBoxStyles';
import { Link } from 'react-router-dom';

class ColorBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			copied: false
		};
		this.changeCopystate = this.changeCopystate.bind(this);
	}

	changeCopystate() {
		this.setState({ copied: true }, () => {
			setTimeout(() => this.setState({ copied: false }), 1000);
		});
	}
	render() {
		const { name, background, moreUrl, showingFullPalette, classes } = this.props;
		const { copied } = this.state;
		return (
			<CopyToClipboard text={background} onCopy={this.changeCopystate}>
				<div className={classes.ColorBox} style={{ background }}>
					<div className={`${classes.copyOverlay} ${copied && classes.showOverlay}`} style={{ background }} />
					<div className={`${classes.copyMsg} ${copied && classes.showMsg}`}>
						<h1>Copied!</h1>
						<p className={classes.copyText}>{background}</p>
					</div>
					<div>
						<div className={classes.boxContent}>
							<span className={classes.colorName}>{name} </span>
						</div>
						<button className={classes.copyButton}>copied</button>
					</div>

					{showingFullPalette && (
						<Link eact to={moreUrl} onClick={(e) => e.stopPropagation()}>
							<span className={classes.seeMore}>MORE</span>
						</Link>
					)}
				</div>
			</CopyToClipboard>
		);
	}
}

export default withStyles(styles)(ColorBox);
