import React from 'react';
// import util from '../util';

import Structure from './structure';

const Building = ( props ) => {

	let commonProps = {
		unit: props.unit,
		width: props.width,
	}

	let buildingProps = Object.assign( {}, commonProps, {
		id: 'body',
		light: props.color.light,
		mid: props.color.mid,
		dark: props.color.dark,
		strokeWidth: 0.2,
		stairs: props.stairs,
		floors: props.floors,
		roof: props.roof,
	} );

	let facadeProps = Object.assign( {}, buildingProps, {
		id: 'facade',
		width: props.facadeWidth,
		mid: props.color.light,
		stairs: true,
		floors: props.facadeFloors,
		roof: 3,
	} );

	return (
		<g id="building">
      <Structure { ...buildingProps }></Structure>
      { props.facadeWidth > 0 && (
        <Structure { ...facadeProps }></Structure>
      ) }
    </g>
	)

	// let width = 1 + ( props.width * 2 );
	// let facade = 1 + ( props.facade * 2 );
	//
	// let towers = Array( Number( props.towers ) ).fill( null ).map( ( _, t ) => {
	// 	let floors = props.floors.length + Number( props.towerProps.floors );
	// 	return {
	// 		width: 1,
	// 		stairs: props.towerProps.stairs,
	// 		roof: props.towerProps.roof,
	// 		floors: Array( floors ).fill( {
	// 			columns: props.towerProps.columns,
	// 			balcony: props.towerProps.balcony,
	// 			windows: props.towerProps.windows,
	// 			windowsType: props.towerProps.windowsType
	// 		} )
	// 	}
	// } );
	//
	// return (
	// 	<g id="building" stroke={ props.stroke } strokeWidth="0.1">
	//
	//     { towers.map( ( t, tt ) => (
	//       <Structure
	//         key={ tt }
	//         id={ `tower-${ tt + 1 }` }
	//         unit={ props.unit }
	//         wall={ props.wall }
	//         decoration={ props.decoration }
	//         stroke={ props.stroke }
	//         width={ 1 }
	//         stairs={ t.stairs }
	//         roof={ t.roof }
	//         floors={ t.floors }
	//       />
	//     ) ) }
	//
	//     <Structure
	//       id="building"
	//       unit={ props.unit }
	//       wall={ props.wall }
	//       decoration={ props.decoration }
	//       stroke={ props.stroke }
	//       width={ width }
	//       stairs={ props.stairs }
	//       roof={ props.roof }
	//       floors={ props.floors }
	//       windows={ props.floorWindows }
	//     />
	//
	//     { props.facade > 0 && (
	//       <Structure
	//         id="facade"
	//         unit={ props.unit }
	//         wall={ props.decoration }
	//         decoration={ props.decoration }
	//         stroke={ props.stroke }
	//         width={ facade }
	//         stairs={ true }
	//         roof={ 3 }
	//         floors={ props.facadeFloors }
	//         windows={ props.facadeWindows }
	//       />
	//     ) }
	//
	//   </g>
	// );
}

export default Building;