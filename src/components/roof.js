import React from 'react';
import util from '../util';

const Roof = ( props ) => {
	console.log( props )
	return null;
	// let y = 100 - ( props.floors * 2 + 1 ) * props.unit;
	//
	// if ( props.roof === 0 )
	// 	return null;
	//
	// if ( props.roof === 1 )
	// 	return (
	// 		<g id={ `${ props.id }-roof` } fill={ props.light }>
	//       <use href={ `#${ props.id }-balcony` } y={ y } />
	//     </g>
	// 	)
	//
	// if ( props.roof === 2 ) {
	// 	let w = props.unit * ( props.width + 2 );
	//
	// 	return (
	// 		<g id={ `${ props.id }-roof` } fill={ props.dark }>
	//       <path d={ util.clean(`
	//         M ${ 50 - ( w / 2 ) } ${ y }
	//         l ${ props.unit } -${ props.unit }
	//         h ${ props.unit * props.width }
	//         l ${ props.unit } ${ props.unit }
	//         z
	//       `) }></path>
	//     </g>
	// 	)
	// }
	//
	// if ( props.roof === 3 ) {
	// 	let w = props.unit * ( props.width + 1 );
	// 	let h = props.unit * ( props.width / 4 );
	//
	// 	return (
	// 		<g id={ `${ props.id }-roof` } fill={ props.light }>
	//       <path d={ util.clean(`
	//         M ${ 50 - ( w / 2 ) } ${ y }
	//         l ${ w / 2 } -${ h }
	//         l ${ w / 2 } ${ h }
	//         z
	//       `) }></path>
	//     </g>
	// 	)
	// }
}

export default Roof;