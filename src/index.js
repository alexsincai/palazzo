import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import util from './util';

import Group from './components/editor/group';
import Range from './components/editor/range';
import Check from './components/editor/check';
import Color from './components/editor/color';

class Palazzo extends React.Component {
	state = {
		editing: true,
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
			balcony: false,
			windows: 1,
			windowsType: 1
		} ],
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
		}
	}

	render() {
		let maxFloorWindows = 1 + ( this.state.width * 2 );
		let maxFacadeWindows = 1 + ( this.state.facadeWidth * 2 );

		return (
			<div>
        <button className="editing" onClick={ (e) => this.setState({ editing: !this.state.editing }) }>Edit</button>
        { this.state.editing && (
          <div className="editing">
            <Group on name="Building">
              <Color color={ this.state.color } func={ this.update.color }></Color>
              <Range name="width" min="1" max="9" value={ this.state.width } func={ this.update.building } />
              <Check name="stairs" value={ this.state.stairs } func={ this.update.building } />
              <Range name="roof" min="0" max="4" value={ this.state.roof } func={ this.update.building } />
              <Range name="floors" min="1" max="4" value={ this.state.floors.length } func={ this.update.floorCount } />
              <Range name="facadeWidth" min="0" max="3" value={ this.state.facadeWidth } func={ this.update.building } />
            </Group>
            { this.state.floors.map( ( f, ff ) => (
              <Group key={ ff } name={ `Floor ${ ff + 1 }` }>
                <Check set="floors" name="columns" index={ ff } value={ f.columns } func={ this.update.floors } />
                <Check set="floors" name="balcony" index={ ff } value={ f.balcony } func={ this.update.floors } />
                <Range set="floors" name="windows" index={ ff } min="0" max={ maxFloorWindows } value={ Math.min(f.windows, maxFloorWindows) } func={ this.update.floors }/>
                <Range set="floors" name="windowsType" index={ ff } min="1" max="5" value={ f.windowsType } func={ this.update.floors }/>
              </Group>
            ) ) }
            { this.state.facadeFloors.map( ( f, ff ) => (
              <Group key={ ff } name={ `Facade floor ${ ff + 1 }` }>
                <Check set="facadeFloors" name="columns" index={ ff } value={ f.columns } func={ this.update.floors } />
                <Check set="facadeFloors" name="balcony" index={ ff } value={ f.balcony } func={ this.update.floors } />
                <Range set="facadeFloors" name="windows" index={ ff } min="0" max={ maxFacadeWindows } value={ Math.min(f.windows, maxFacadeWindows) } func={ this.update.floors }/>
                <Range set="facadeFloors" name="windowsType" index={ ff } min="1" max="5" value={ f.windowsType } func={ this.update.floors }/>
              </Group>
            ) ) }
          </div>
        ) }
      </div>
		)
	}
}

ReactDOM.render( <Palazzo />, document.getElementById( 'root' ) );