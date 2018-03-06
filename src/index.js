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

class Palazzo extends React.Component {
	state = {
		editing: false,
		color: util.generateRandomColor(),
		width: 4,
		stairs: false,
		roof: 1,
		floors: [ {
			columns: false,
			balcony: false,
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
		towers: 0,
		towerProps: {
			floors: 1,
			stairs: true,
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

	save = ( e ) => {
		let svg = document.querySelector( 'svg' );
		let rect = svg.getBBox();
		let maxDim = Math.max( window.outerWidth, window.outerHeight );
		let scale = Math.round( maxDim / Math.max( rect.width, rect.height ) ) / 2;

		saveSvgAsPng( svg, `palazzo-${ Date.now() }.png`, {
			scale
		} );
	}

	randomize = ( e ) => {
		let floors = util.random( 1, 4 );

		let w = util.random( 3, 9 );
		let f = util.random( 0, 3 );

		let s = {
			color: util.generateRandomColor(),
			width: w,
			stairs: !!util.random( 0, 1 ),
			roof: util.random( 0, 3 ),
			facadeWidth: f,
			floors: [],
			facadeFloors: []
		}

		for ( let i = 0; i < floors; i++ ) {
			s.floors.push( {
				columns: !!util.random( 0, 1 ),
				balcony: !!util.random( 0, 1 ),
				windows: util.random( 0, 4 ),
				windowsType: util.random( 1, 5 )
			} );
			s.facadeFloors.push( {
				columns: !!util.random( 0, 1 ),
				balcony: !!util.random( 0, 1 ),
				windows: util.random( 0, 4 ),
				windowsType: util.random( 1, 5 )
			} );
		}

		// console.log( ww, fw )

		this.setState( s );
	}

	render() {
		let maxTowers = ( this.state.width * 2 ) - 1;

		let towers = maxTowers <= this.state.towers ? maxTowers : this.state.towers;

		let floorWindows = util.minmax( 1 + ( this.state.width * 2 ) );
		let facadeWindows = util.minmax( 1 + ( this.state.facadeWidth * 2 ) );

		return (
			<div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <Defs
            unit={ unit }
            floorWidth={ this.state.width }
            floorId="building"
            facadeWidth={ this.state.facadeWidth }
            facadeId="facade"
            light={ this.state.color.light }
            dark={ this.state.color.dark }
          />
          <Building
            unit={ unit }
            decoration={ this.state.color.light }
            wall={ this.state.color.mid }
            stroke={ this.state.color.dark }
            width={ this.state.width }
            stairs={ this.state.stairs }
            roof={ this.state.roof }
            floors={ this.state.floors }
            floorWindows={ floorWindows }
            facade={ this.state.facadeWidth }
            facadeFloors={ this.state.facadeFloors }
            facadeWindows={ facadeWindows }
            towers={ this.state.towers }
            towerProps={ this.state.towerProps }
          />
        </svg>
        <div className="buttons">
          <button onClick={ (e) => document.querySelector('.editing').classList.toggle('hidden') }>Edit</button>
          <button onClick={ this.randomize }>Randomize</button>
          <button onClick={ this.save }>Save PNG</button>
        </div>
        <div className={ `editing ${ this.state.editing ? '' : 'hidden' }` }>
          <Group on name="Building">
            <Color color={ this.state.color } func={ this.update.color }></Color>
            <Range name="width" min="1" max="9" value={ this.state.width } func={ this.update.building } />
            <Check name="stairs" value={ this.state.stairs } func={ this.update.building } />
            <Range name="roof" min="0" max="3" value={ this.state.roof } func={ this.update.building } />
            <Range name="floors" min="1" max="4" value={ this.state.floors.length } func={ this.update.floorCount } />
            <Range name="facadeWidth" min="0" max="3" value={ this.state.facadeWidth } func={ this.update.building } />
            {/* <Range name="towers" min="0" max={ maxTowers } value={ towers } func={ this.update.building } /> */}
          </Group>
          { this.state.floors.map( ( f, ff ) => (
            <Group key={ ff } name={ `Floor ${ ff + 1 }` }>
              <Check set="floors" name="columns" index={ ff } value={ f.columns } func={ this.update.floors } />
              <Check set="floors" name="balcony" index={ ff } value={ f.balcony } func={ this.update.floors } />
              <Range display={ floorWindows } set="floors" name="windows" index={ ff } min="0" max={ floorWindows.length - 1 } value={ Math.min( f.windows, floorWindows.length - 1 ) } func={ this.update.floors } />
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
              <Check name="stairs" value={ this.state.towerProps.stairs } func={ this.update.towerProps } />
              <Check name="columns" value={ this.state.towerProps.columns } func={ this.update.towerProps } />
              <Check name="balcony" value={ this.state.towerProps.balcony } func={ this.update.towerProps } />
              <Range display={null} name="windows" min="0" max="5" value={ this.state.towerProps.windows } func={ this.update.towerProps } />
              <Range name="windowsType" min="1" max="5" value={ this.state.towerProps.windowsType } func={ this.update.towerProps } />
              <Range name="roof" min="0" max="3" value={ this.state.towerProps.roof } func={ this.update.towerProps } />
            </Group>
          ) }
        </div>
      </div>
		)
	}
}

ReactDOM.render( <Palazzo />, document.getElementById( 'root' ) );