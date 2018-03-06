import React from 'react';
// import util from '../util';

import Structure from './structure';

const Building = ( props ) => {

	let width = ( 1 + ( props.width * 2 ) );

	let towers = Array( Number( props.towers ) ).fill( null ).map( ( _, t ) => {
		let floors = props.floors.length + Number( props.towerProps.floors );
		return {
			width: 1,
			stairs: props.towerProps.stairs,
			roof: props.towerProps.roof,
			floors: Array( floors ).fill( {
				columns: props.towerProps.columns,
				balcony: props.towerProps.balcony,
				windows: props.towerProps.windows,
				windowsType: props.towerProps.windowsType
			} )
		}
	} );

	return (
		<g id="building" stroke={ props.stroke } strokeWidth="0.1">

      { towers.map( ( t, tt ) => (
        <Structure
          key={ tt }
          id={ `tower-${ tt + 1 }` }
          unit={ props.unit }
          wall={ props.wall }
          decoration={ props.decoration }
          width={ 1 }
          stairs={ t.stairs }
          roof={ t.roof }
          floors={ t.floors }
        />
      ) ) }

      <Structure
        id="building"
        unit={ props.unit }
        wall={ props.wall }
        decoration={ props.decoration }
        width={ width }
        stairs={ props.stairs }
        roof={ props.roof }
        floors={ props.floors }
      />

      { props.facade > 0 && (
        <Structure
          id="facade"
          unit={ props.unit }
          wall={ props.decoration }
          decoration={ props.decoration }
          width={ 1 + props.facade }
          stairs={ true }
          roof={ 3 }
          floors={ props.facadeFloors }
        />
      ) }

    </g>
	);
}

export default Building;