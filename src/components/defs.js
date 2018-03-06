import React from 'react';
import util from '../util';

const Defs = ( props ) => {
	let u = props.unit;

	let floorWidth = 2 + Number( props.floorWidth ) * 2;
	let floorLeft = 50 - ( ( floorWidth - 1 ) * u / 2 );
	let floorRight = 50 + ( ( floorWidth - 1 ) * u / 2 );

	let floorColumns = Array( floorWidth ).fill( null ).map( ( _, c ) => {
		let left = floorLeft + ( u * 0.1 );
		let right = floorRight - ( u * 0.1 );
		return {
			key: c,
			x: util.map( c, 0, floorWidth - 1, left, right )
		}
	} );
	let floorBalcony = Array( Number( props.floorWidth ) * 6 + 1 ).fill( null ).map( ( _, c ) => {
		let left = floorLeft + ( u * 0.1 );
		let right = floorRight - ( u * 0.1 );
		return {
			key: c,
			x: util.map( c, 0, Number( props.floorWidth ) * 6, left, right )
		}
	} );

	return (
		<defs>

      <g id="column">
        <rect x={ u * -0.2 } y={ u * -2 } width={ u * 0.4 } height={ u * 0.1 } />
        <rect x={ u * -0.2 } y={ u * -0.1 } width={ u * 0.4 } height={ u * 0.1 } />
        <rect x={ u * -0.1 } y={ u * -1.9 } width={ u * 0.2 } height={ u * 1.8 } />
      </g>

      <rect id="pillar" x={ u * -0.05 } y={ u * -0.3 } width={ u * 0.1 } height={ u * 0.3 } />

      <g id={ `columns-${ props.floorWidth }` } fill={ props.light } stroke={ props.dark }>
        <line x1={ floorLeft } y1={ u * -2 } x2={ floorRight } y2={ u * -2 } />
        { floorColumns.map( c => (
          <use key={ c.key } href="#column" x={ c.x } />
        ) ) }
        <line x1={ floorLeft } y1="0" x2={ floorRight } y2="0" />
      </g>

      <g id={ `balcony-${ props.floorWidth }` } fill={ props.light } stroke={ props.dark }>
        { floorBalcony.map( b => (
          <use key={ b.key } href="#pillar" x={ b.x } />
        ) ) }
        <rect x={ floorLeft - u * 0.1 } y={ u * -0.4 } width={ u * ( floorWidth - 0.8 ) } height={ u * 0.1 } />
        <line x1={ floorLeft } y1="0" x2={ floorRight } y2="0" />
      </g>

    </defs>
	)
}

export default Defs;