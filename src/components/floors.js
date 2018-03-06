import React from 'react';
// import util from '../util';

const Floors = ( props ) => {

	let width = props.width * props.unit;
	let height = props.unit * ( props.floors.length * 2 );
	let x = 50 - ( width / 2 );
	let y = 100 - ( props.unit * ( 1 + props.floors.length * 2 ) );

	let decId = Math.floor( props.width / 2 );

	let columns = Array( props.floors.length ).fill( null ).map( ( _, f ) => {
		let colgroup = {
			key: f,
			id: `${ props.id }-floor-${ f + 1}-columns`,
			y: 100 - ( props.unit * ( 1 + f * 2 ) )
		};

		return props.floors[ f ].columns ? colgroup : null;
	} ).filter( c => c );

	let balconies = Array( props.floors.length ).fill( null ).map( ( _, f ) => {
		let colgroup = {
			key: f,
			id: `${ props.id }-floor-${ f + 1}-balcony`,
			y: 100 - ( props.unit * ( 1 + f * 2 ) )
		};

		return props.floors[ f ].balcony ? colgroup : null;
	} ).filter( c => c );

	return (
		<g id={ props.id } fill={ props.fill }>
      <rect x={ x } y={ y } width={ width } height={ height } />

      { balconies.map(c => (
        <g key={ c.key } id={ c.id }>
          <use href={ `#balcony-${ decId }` } y={ c.y } />
        </g>
      )) }

      { columns.map(c => (
        <g key={ c.key } id={ c.id }>
          <use href={ `#columns-${ decId }` } y={ c.y } />
        </g>
      )) }

    </g>
	);
}

export default Floors;