import React from 'react';
import util from '../util';

import Balcony from './balcony'

const Roof = ( props ) => {
	console.log( props )

	let width = props.width * props.unit;
	let height = ( props.unit * 2 );
	let x = width * -0.5;
	let y = -props.unit * props.vertical;

	if ( props.roof === 0 )
		return null;

	if ( props.roof === 1 )
		return (
			<Balcony id={ props.id } width={ props.width } balcony={ true } unit={ props.unit } x={ x } y={ y } />
		);

	if ( props.roof === 2 )
		return (
			<g id={ props.id } fill={ props.stroke }>
        <path d={ util.clean(`
          M -${ ( width + props.unit ) / 2 } ${ y }
          l ${ props.unit } -${ props.unit / 2 }
          h ${ width - props.unit }
          l ${ props.unit } ${ props.unit / 2 }
          z
        `) } />
      </g>
		);

	if ( props.roof === 3 )
		return (
			<g id={ props.id }>
        <path d={ util.clean(`
          M -${ ( width + props.unit ) / 2 } ${ y }
          l ${ ( width + props.unit ) / 2 } -${ width / 4 }
          l ${ ( width + props.unit ) / 2 } ${ width / 4 }
          z
        `) } />
      </g>
		);

	return null;
}

export default Roof;