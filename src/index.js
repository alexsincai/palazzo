import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import util from './util';
import {
	saveSvgAsPng
} from 'save-svg-as-png';

import Group from './components/editor/group';
import Range from './components/editor/range';
import Check from './components/editor/check';
import Color from './components/editor/color';

import Defs from './components/defs';
import Building from './components/building';

const unit = 5;

const cleanProps = ( object ) => {
	let o = Object.assign( {}, object );

	o.width = o.width * 2 + 1;

	if ( o.facadeWidth > 0 )
		o.facadeWidth = o.facadeWidth * 2 + 1;

	delete o.editing;

	return o;
}

class Palazzo extends React.Component {
	state = {
		editing: false,
		color: util.generateRandomColor(),
		width: 4,
		stairs: true,
		roof: 2,
		floors: [ {
			balcony: false,
			columns: true,
			windows: 1,
			windowsType: 1
		} ],
		facadeWidth: 0,
		facadeFloors: [ {
			columns: false,
			balcony: true,
			windows: 1,
			windowsType: 1
		} ],
		towers: 1,
		towerProps: {
			floors: 1,
			columns: false,
			balcony: false,
			windows: 1,
			windowsType: 1,
			roof: 1,
		}
	}

	update = {
		color: ( e ) => {
			let s = this.state;
			s.color = util.generateRandomColor( e.target.value );
			this.setState( s );
		},
		building: ( e ) => {
			let s = this.state;
			let t = e.target;
			s[ t.dataset.name ] = t.type === 'range' ? Number( t.value ) : Boolean( t.checked );
			this.setState( s );
		},
		floors: ( e ) => {
			let s = this.state;
			let t = e.target;
			let d = t.dataset;
			s[ d.set ][ Number( d.index ) ][ d.name ] = t.type === 'range' ? Number( t.value ) : Boolean( t.checked );
			this.setState( s );
		},
		floorCount: ( e ) => {
			let s = this.state;
			[ 'floors', 'facadeFloors' ].forEach( n => {
				let arr = Array( Number( e.target.value ) ).fill( {
					columns: false,
					balcony: false,
					windows: 1,
					windowsType: 1
				} ).map( ( f, ff ) => f = s[ n ][ ff ] || f );
				s[ n ] = arr;
			} );
			this.setState( s );
		},
		towerProps: ( e ) => {
			let s = this.state;
			let t = e.target;
			s.towerProps[ t.dataset.name ] = t.type === 'range' ? Number( t.value ) : Boolean( t.checked );
			this.setState( s );
		}
	}

	edit = ( e ) => {
		this.setState( {
			editing: !this.state.editing
		} );
	}

	save = ( e ) => {
		saveSvgAsPng( document.querySelector( 'svg' ), `palazzo-${ Date.now() }.png`, {
			top: -120,
			left: -60,
			width: 120,
			height: 120,
			scale: 5,
			encoderOptions: 1,
		} );
	}

	randomize = ( e ) => {
		let floors = util.random( 1, 4 );

		let w = util.random( 3, 9 );
		let f = util.random( 0, 3 );
		let t = util.random( 0, Math.floor( ( w * 0.5 ) + 1 ) )

		let ww = util.minmax( 1 + ( w * 2 ) ).length - 1;
		let fw = util.minmax( 1 + ( f * 2 ) ).length - 1;

		let s = {
			color: util.generateRandomColor(),
			width: w,
			stairs: !!util.random( 0, 1 ),
			roof: util.random( 0, 3 ),
			facadeWidth: f,
			towers: t,
			towerProps: {
				floors: util.random( 1, 4 ),
				columns: !!util.random( 0, 1 ),
				balcony: !!util.random( 0, 1 ),
				windows: util.random( 1, 3 ),
				windowsType: util.random( 1, 5 ),
				roof: util.random( 1, 3 ),
			},
			floors: [],
			facadeFloors: []
		}

		for ( let i = 0; i < floors; i++ ) {
			s.floors.push( {
				columns: !!util.random( 0, 1 ),
				balcony: !!util.random( 0, 1 ),
				windows: util.random( 1, ww ),
				windowsType: util.random( 1, 5 )
			} );
			s.facadeFloors.push( {
				columns: !!util.random( 0, 1 ),
				balcony: !!util.random( 0, 1 ),
				windows: util.random( 1, fw ),
				windowsType: util.random( 1, 5 )
			} );
		}

		this.setState( s );
	}

	componentWillMount() {
		this.randomize();
	}

	render() {

		let floorWindows = util.minmax( this.state.width * 2 + 1 );
		let facadeWindows = util.minmax( this.state.facadeWidth * 2 + 1 );
		let towerWindows = util.minmax( this.state.towerProps.width );

		let maxTowers = Math.floor( ( this.state.width * 0.5 ) + 1 );
		let towers = maxTowers < this.state.towers ? maxTowers : this.state.towers;

		return (
			<div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-60 -100 120 100" width="800" height="600">
          <Defs unit={ unit } />
          <Building unit={ unit } id="building" { ...cleanProps( this.state ) } />
        </svg>
        <div className="buttons">
          <button onClick={ this.edit }>Edit</button>
          <button onClick={ this.randomize }>Randomize</button>
          <button onClick={ this.save }>Save PNG</button>
        </div>
        { this.state.editing && (
          <div className="editing">
            <Group on name="Building">
              <Color color={ this.state.color } func={ this.update.color }></Color>
              <Range name="width" min="1" max="9" value={ this.state.width } func={ this.update.building } />
              <Check name="stairs" value={ this.state.stairs } func={ this.update.building } />
              <Range name="roof" min="0" max="3" value={ this.state.roof } func={ this.update.building } />
              <Range name="floors" min="1" max="4" value={ this.state.floors.length } func={ this.update.floorCount } />
              <Range name="facadeWidth" min="0" max="3" value={ this.state.facadeWidth } func={ this.update.building } />
              <Range name="towers" min="0" max={ maxTowers } value={ towers } func={ this.update.building } />
            </Group>
            { this.state.floors.map( ( f, ff ) => (
              <Group key={ ff } name={ `Floor ${ ff + 1 }` }>
                <Check set="floors" name="columns" index={ ff } value={ f.columns } func={ this.update.floors } />
                <Check set="floors" name="balcony" index={ ff } value={ f.balcony } func={ this.update.floors } />
                <Range display={ floorWindows } set="floors" name="windows" index={ ff } min="0" max="4" value={ Math.min( f.windows, floorWindows.length - 1 ) } func={ this.update.floors } />
                <Range set="floors" name="windowsType" index={ ff } min="1" max="5" value={ f.windowsType } func={ this.update.floors } />
              </Group>
            ) ) }
            { this.state.facadeWidth > 0 && this.state.facadeFloors.map( ( f, ff ) => (
              <Group key={ ff } name={ `Facade floor ${ ff + 1 }` }>
                <Check set="facadeFloors" name="columns" index={ ff } value={ f.columns } func={ this.update.floors } />
                <Check set="facadeFloors" name="balcony" index={ ff } value={ f.balcony } func={ this.update.floors } />
                <Range display={ facadeWindows } set="facadeFloors" name="windows" index={ ff } min="0" max={ facadeWindows.length - 1 } value={ Math.min( f.windows, facadeWindows.length - 1 ) } func={ this.update.floors } />
                <Range set="facadeFloors" name="windowsType" index={ ff } min="1" max="5" value={ f.windowsType } func={ this.update.floors }/>
              </Group>
            ) ) }
            { this.state.towers > 0 && (
              <Group name="Towers">
                <Range name="floors" min="1" max="4" value={ this.state.towerProps.floors } func={ this.update.towerProps } />
                <Check name="columns" value={ this.state.towerProps.columns } func={ this.update.towerProps } />
                <Check name="balcony" value={ this.state.towerProps.balcony } func={ this.update.towerProps } />
                <Range display={ towerWindows } name="windows" min="0" max={ towerWindows.length - 1 } value={ this.state.towerProps.windows } func={ this.update.towerProps } />
                <Range name="windowsType" min="1" max="5" value={ this.state.towerProps.windowsType } func={ this.update.towerProps } />
                <Range name="roof" min="0" max="3" value={ this.state.towerProps.roof } func={ this.update.towerProps } />
              </Group>
            ) }
          </div>
        ) }
      </div>
		)
	}
}

ReactDOM.render( <Palazzo />, document.getElementById( 'root' ) );