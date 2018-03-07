import React from 'react';
import util from '../util';

import Balcony from './balcony'

const Roof = ( props ) => {

	let width = props.width * props.unit;
	let horizontal = props.offset || 0;
	let x = ( width * -0.5 ) + horizontal;
	let y = -props.unit * props.vertical;

	if ( props.roof === 0 )
		return null;

	if ( props.roof === 1 )
		return (
			<Balcony
        id={ props.id }
        width={ props.width }
        balcony={ true }
        unit={ props.unit }
        x={ x }
        y={ y }
        offset={ horizontal }
   />
		);

	if ( props.roof === 2 )
		return (
			<g id={ props.id } fill={ props.stroke }>
        <path d={ util.clean(`
          M ${ ( width + props.unit ) * -0.5 + horizontal } ${ y }
          l ${ props.unit } -${ props.unit * 0.5 }
          h ${ width - props.unit }
          l ${ props.unit } ${ props.unit * 0.5 }
          z
        `) } />
      </g>
		);

	if ( props.roof === 3 )
		return (
			<g id={ props.id }>
        <path d={ util.clean(`
          M ${ ( width + props.unit ) * -0.5 + horizontal } ${ y }
          l ${ ( width + props.unit ) * 0.5 } -${ width * 0.25 }
          l ${ ( width + props.unit ) * 0.5 } ${ width * 0.25 }
          z
        `) } />
      </g>
		);

	return null;
}

export default Roof;