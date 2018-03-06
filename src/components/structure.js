import React from 'react';

import Base from './base';
import Floors from './floors';

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
        id={ `${ props.id }-floors` }
        unit={ props.unit }
        width={ props.width }
        floors={ props.floors }
        fill={ props.wall }
      />
    </g>
	);
}

export default Structure;