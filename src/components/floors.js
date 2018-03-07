import React from 'react';
import util from '../util';

import Windows from './windows';

const Floors = ( props ) => {

	let width = props.width * props.unit;
	let height = ( props.unit * 2 );
	let x = width * -0.5;
	let y = height * props.floor + props.unit;
	let floor = props.floors[ props.floor - 1 ];

	// let columns = Array( props.floors.length ).fill( null ).map( ( _, f ) => Array( props.width + 1 ).fill( null ).map( ( _, c ) => {
	// 	if ( props.floors[ f ].columns )
	// 		return {
	// 			// x: ( props.unit * c ) - ( width / 2 ),
	// 			x: util.map( props.unit * c, 0, width, width * -0.5, width * 0.5 ),
	// 			y: -props.unit * ( 1 + f * 2 )
	// 		}
	// 	return null;
	// } ) ).reduce( ( a, v ) => a.concat( v ), [] ).filter( v => v );
	let columns = util.place( floor, props.width + 1, floor.columns, props.unit, width, 1, 0.2 );
	let balcony = util.place( floor, props.width + 1, floor.balcony, props.unit, width, 3, 0.1 );
	console.log( balcony )


	// let balcony = Array( props.floors.length ).fill( null ).map( ( _, f ) => Array( ( props.width * 3 ) + 1 ).fill( null ).map( ( _, c ) => {
	// 	if ( props.floors[ f ].balcony )
	// 		return {
	// 			x: ( props.unit * c / 3 ) - ( ( width - 0.6 ) / 2 ),
	// 			y: -props.unit * ( 1 + f * 2 )
	// 		}
	// 	return null;
	// } ) ).reduce( ( a, v ) => a.concat( v ), [] ).filter( v => v );

	return (
		<g id={ props.id }>
      <rect x={ x } y={ -y } width={ width } height={ height } fill={ props.fill } />

      { balcony.map( ( f, ff ) => (
        <use key={ ff } href="#rail" x={ f.x } y={ f.y } />
      ) ) }

      { columns.map( ( f, ff ) => (
        <use key={ ff } href="#column" x={ f.x } y={ f.y } />
      ) ) }
    </g>
	)

	return null;
	// let width = props.width * props.unit;
	// let height = props.unit * ( props.floors.length * 2 );
	// let x = 50 - ( width / 2 );
	// let y = 100 - ( props.unit * ( 1 + props.floors.length * 2 ) );
	//
	// let columns = Array( props.floors.length ).fill( null ).map( ( _, f ) => {
	// 	let colgroup = {
	// 		key: f,
	// 		id: `${ props.id }-floor-${ f + 1 }-columns`,
	// 		y: 100 - ( props.unit * ( 1 + f * 2 ) )
	// 	};
	//
	// 	return props.floors[ f ].columns ? colgroup : null;
	// } ).filter( c => c );
	//
	// let balconies = Array( props.floors.length ).fill( null ).map( ( _, f ) => {
	// 	let colgroup = {
	// 		key: f,
	// 		id: `${ props.id }-floor-${ f + 1 }-balcony`,
	// 		y: 100 - ( props.unit * ( 1 + f * 2 ) )
	// 	};
	//
	// 	return props.floors[ f ].balcony ? colgroup : null;
	// } ).filter( c => c );
	//
	// let windows = Array( props.floors.length ).fill( null ).map( ( _, f ) => {
	// 	return {
	// 		// count: props.windows[ props.floors[ f ].windows ],
	// 		count: props.floors[ f ].windows,
	// 		type: props.floors[ f ].windowsType
	// 	}
	// } );
	//
	// return (
	// 	<g id={ props.id } fill={ props.fill }>
	//     <rect x={ x } y={ y } width={ width } height={ height } />
	//
	//     { windows.map( ( w, ww ) => (
	//       <Windows
	//         id={ `#${ props.id }-floor-${ ww + 1 }-windows` }
	//         key={ ww }
	//         count={ w.count }
	//         type={ w.type }
	//         width={ props.width }
	//         unit={ props.unit }
	//         floor={ ww }
	//       />
	//     ) ) }
	//
	//     { balconies.map(c => (
	//       <g key={ c.key } id={ c.id }>
	//         <use href={ `#${ props.id }-balcony` } y={ c.y } />
	//       </g>
	//     )) }
	//
	//     { columns.map(c => (
	//       <g key={ c.key } id={ c.id }>
	//         <use href={ `#${ props.id }-columns` } y={ c.y } />
	//       </g>
	//     )) }
	//
	//   </g>
	// );
}

export default Floors;