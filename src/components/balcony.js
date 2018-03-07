import React from 'react';
import util from '../util';

const Balcony = ( props ) => {
	let width = props.width * props.unit;

	let balcony = util.place( props.width + 1, props.balcony, width, 3, props.unit * 0.1 );

	return (
		<g id={ props.id }>
      { props.balcony && (
        <rect x={ props.x - props.unit * 0.1 } y={ props.unit * -0.4 + props.y } width={ width + props.unit * 0.2 } height={ props.unit * 0.1 } />
      ) }
      { balcony.map( ( c, cc ) => (
        <use key={ cc } href="#rail" x={ c } y={ props.y } />
      ) ) }
    </g>
	)
}

export default Balcony;