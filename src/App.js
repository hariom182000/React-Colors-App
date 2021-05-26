import './App.css';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import { Route, Switch } from 'react-router-dom';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import NewPaletteForm from './NewPaletteForm';
import { Component } from 'react';

class App extends Component {
	constructor(props) {
		super(props);
		const SavedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
		this.state = {
			palettes: SavedPalettes || seedColors
		};
		this.findPalette = this.findPalette.bind(this);
		this.savePalette = this.savePalette.bind(this);
		this.deletePalette = this.deletePalette.bind(this);
	}

	findPalette(id) {
		return this.state.palettes.find(function(palette) {
			return palette.id === id;
		});
	}
	savePalette(NewPalette) {
		this.setState({ palettes: [ ...this.state.palettes, NewPalette ] }, this.syncLocalStorage);

		//console.log(palettes);
	}
	syncLocalStorage() {
		window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes));
	}
	deletePalette(id) {
		this.setState((st) => ({ palettes: st.palettes.filter((p) => p.id !== id) }), this.syncLocalStorage);
	}

	render() {
		const { palettes } = this.state;

		return (
			<Switch>
				<Route
					exact
					path="/"
					render={(routeProps) => (
						<PaletteList palettes={palettes} {...routeProps} deletePalette={this.deletePalette} />
					)}
				/>
				<Route
					exact
					path="/palette/new"
					render={(routeProps) => (
						<NewPaletteForm savePalette={this.savePalette} {...routeProps} palettes={palettes} />
					)}
				/>
				<Route
					exact
					path="/palette/:id"
					render={(routeProps) => (
						<Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />
					)}
				/>

				<Route
					exact
					path="/palette/:paletteId/:colorId"
					render={(routeProps) => (
						<SingleColorPalette
							colorId={routeProps.match.params.colorId}
							palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
						/>
					)}
				/>

				<Route
					render={(routeProps) => (
						<PaletteList palettes={palettes} {...routeProps} deletePalette={this.deletePalette} />
					)}
				/>
			</Switch>

			//<div>
			//<Palette palette={generatePalette(seedColors[4])} />
			//</div>
		);
	}
}

export default App;
