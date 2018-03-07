import React from 'react';
import util from '../util';

import Balcony from './balcony';

const Floor = ( props ) => {

	let width = props.width * props.unit;
	let height = ( props.unit * 2 );

	let horizontal = props.offset || 0;
	let x = ( width * -0.5 ) + horizontal;

	let wy = height * ( props.index + 1 ) + props.unit;
	let y = props.unit + ( props.unit * 2 ) * props.index;


	let columns = util.place( props.width + 1, props.floor.columns, width, 1, props.unit * 0.2 );
	let windows = util.windows( props.width, props.floor.windows, props.unit ).map( w => props.unit * w + x + ( props.unit * 0.5 ) );

	return (
		<g id={ props.id }>
      <rect x={ x } y={ -wy } width={ width } height={ height } fill={ props.fill } />

      { windows.length > 0 && (
        <g id={ `${ props.id }-windows` }>
          { windows.map( ( w, ww ) => (
            <use key={ ww } href={ `#window-${ props.floor.windowsType }` } x={ w } y={ -y } fill={ props.stroke } />
          ) ) }
        </g>
      ) }

      <Balcony
        id={ `${ props.id }-balcony` }
        width={ props.width }
        balcony={ props.floor.balcony }
        unit={ props.unit }
        x={ x }
        y={ -y }
        offset={ horizontal }
      />

      { props.floor.columns && (
        <g id={ `${ props.id }-columns` }>
          { columns.map( ( c, cc ) => (
            <use key={ cc } href="#column" x={ c + horizontal } y={ -y } />
          ) ) }
        </g>
      ) }
    </g>
	);
}

export default Floor;