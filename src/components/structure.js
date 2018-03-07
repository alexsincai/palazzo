import React from 'react';

import Base from './base';
import Floor from './floor';
import Roof from './roof';

const Structure = ( props ) => {

	let commonProps = {
		unit: props.unit,
		width: props.width,
		stroke: props.dark,
	}

	if ( props.offset ) {
		commonProps.offset = props.offset * props.unit;
	}

	let baseProps = Object.assign( {}, commonProps, {
		id: `${ props.id }-base`,
		stairs: props.stairs,
	} );

	let roofProps = Object.assign( {}, commonProps, {
		id: `${ props.id }-roof`,
		vertical: ( props.floors.length * 2 ) + 1,
		roof: props.roof,
	} );

	return (
		<g id={ props.id }>
      <Base { ...baseProps } />
      { props.floors.map( ( f, ff ) => (
        <Floor
          key={ ff }
          fill={ props.mid }
          stroke={ props.dark }
          id={ `${ props.id }-floor-${ ff + 1 }` }
          unit={ props.unit }
          width={ props.width }
          floor={ f }
          index={ ff }
          offset={ commonProps.offset }
        />
      ) ) }
      <Roof { ...roofProps } />
    </g>
	)
}

export default Structure;