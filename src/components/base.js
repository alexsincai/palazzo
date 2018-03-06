import React from 'react';

const Base = ( props ) => {

	let width = props.width * props.unit;
	let x = 50 - ( width / 2 );
	let y = 100 - props.unit;

	if ( props.stairs ) {
		let levels = Array( 4 ).fill( null ).map( ( _, l ) => {
			let s = props.unit / 4;

			return {
				k: l,
				x: x - ( s * ( 3 - l ) ),
				y: y + ( s * ( 3 - l ) ),
				w: width + ( s * ( 3 - l ) ) * 2,
				h: s
			}
		} );

		return (
			<g id={ props.id } fill={ props.fill }>
        { levels.map( l => (
          <rect key={ l.k } x={ l.x } y={ l.y } width={ l.w } height={ l.h }></rect>
        ) ) }
      </g>
		)
	}

	return (
		<g id={ props.id } fill={ props.fill }>
      <rect x={ x } y={ y } width={ width } height={ props.unit }></rect>
    </g>
	);
}

export default Base;