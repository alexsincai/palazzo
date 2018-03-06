import React from 'react';
// import util from '../util';

import Windows from './windows';

const Floors = ( props ) => {

	let width = props.width * props.unit;
	let height = props.unit * ( props.floors.length * 2 );
	let x = 50 - ( width / 2 );
	let y = 100 - ( props.unit * ( 1 + props.floors.length * 2 ) );

	let columns = Array( props.floors.length ).fill( null ).map( ( _, f ) => {
		let colgroup = {
			key: f,
			id: `${ props.id }-floor-${ f + 1 }-columns`,
			y: 100 - ( props.unit * ( 1 + f * 2 ) )
		};

		return props.floors[ f ].columns ? colgroup : null;
	} ).filter( c => c );

	let balconies = Array( props.floors.length ).fill( null ).map( ( _, f ) => {
		let colgroup = {
			key: f,
			id: `${ props.id }-floor-${ f + 1 }-balcony`,
			y: 100 - ( props.unit * ( 1 + f * 2 ) )
		};

		return props.floors[ f ].balcony ? colgroup : null;
	} ).filter( c => c );

	let windows = Array( props.floors.length ).fill( null ).map( ( _, f ) => {
		return {
			count: props.windows[ props.floors[ f ].windows ],
			type: props.floors[ f ].windowsType
		}
	} );

	return (
		<g id={ props.id } fill={ props.fill }>
      <rect x={ x } y={ y } width={ width } height={ height } />

      { windows.map( ( w, ww ) => (
        <Windows
          id={ `#${ props.id }-floor-${ ww + 1 }-windows` }
          key={ ww }
          count={ w.count }
          type={ w.type }
          width={ props.width }
          unit={ props.unit }
          floor={ ww }
        />
      ) ) }

      { balconies.map(c => (
        <g key={ c.key } id={ c.id }>
          <use href={ `#${ props.id }-balcony` } y={ c.y } />
        </g>
      )) }

      { columns.map(c => (
        <g key={ c.key } id={ c.id }>
          <use href={ `#${ props.id }-columns` } y={ c.y } />
        </g>
      )) }

    </g>
	);
}

export default Floors;