import React from 'react';

import Base from './base';
import Floors from './floors';
import Roof from './roof';

const Structure = ( props ) => {

	return (
		<g id={ props.id }>
      <Base
        id={ `${ props.id }-base` }
        unit={ props.unit }
        width={ props.width }
        stairs={ props.stairs }
        fill={ props.decoration }
      />
      <Floors
        id={ props.id }
        unit={ props.unit }
        width={ props.width }
        floors={ props.floors }
        windows={ props.windows }
        fill={ props.wall }
      />
      <Roof
        id={ props.id }
        unit={ props.unit }
        width={ props.width }
        floors={ props.floors.length }
        roof={ props.roof }
        light={ props.decoration }
        dark={ props.stroke }
      />
    </g>
	);
}

export default Structure;