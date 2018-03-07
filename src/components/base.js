import React from 'react';

const Base = ( props ) => {

	let width = props.width * props.unit;
	let height = props.unit;
	let x = width * -0.5;
	let y = -height;

	if ( props.stairs ) {
		let stairs = Array( 4 ).fill( null ).map( ( _, s ) => {
			let h = props.unit / 4;

			return {
				x: x - ( 3 - s ),
				y: y + h * ( 3 - s ),
				width: width + 2 * ( 3 - s ),
				height: height / 4
			}
		} );

		return (
			<g id={ props.id }>
        { stairs.map( ( s, ss ) => (
          <rect key={ ss } x={ s.x } y={ s.y } width={ s.width } height={ s.height } />
        ) ) }
      </g>
		)
	}

	return (
		<g id={ props.id }>
      <rect x={ x } y={ y } width={ width } height={ height } />
    </g>
	)
}

export default Base;