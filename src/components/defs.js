import React from 'react';
import util from '../util';

const spacer = ( width, per, unit, fit = 0, offset = 0 ) => Array( width * per * 2 + 2 ).fill( null ).map( ( _, c ) => {
	let l = 50 + ( offset * unit ) - ( width + 0.5 ) * unit;
	let r = 50 + ( offset * unit ) + ( width + 0.5 ) * unit;
	return util.map( c, 0, width * per * 2 + 1, l + fit, r - fit );
} );

const Defs = ( props ) => {
	let u = props.unit;

	let floorColumns = spacer( props.floorWidth, 1, u, u * 0.1, props.offset );
	let floorBalcony = spacer( props.floorWidth, 3, u, u * 0.05, props.offset );
	let floorWidth = ( props.floorWidth * 2 + 1 ) * u;

	let facadeColumns = spacer( props.facadeWidth, 1, u, u * 0.1, props.offset );
	let facadeBalcony = spacer( props.facadeWidth, 3, u, u * 0.05, props.offset );
	let facadeWidth = ( props.facadeWidth * 2 + 1 ) * u;

	return (
		<defs>

      <g id="column">
        <rect x={ u * -0.2 } y={ u * -2 } width={ u * 0.4 } height={ u * 0.1 } />
        <rect x={ u * -0.2 } y={ u * -0.1 } width={ u * 0.4 } height={ u * 0.1 } />
        <rect x={ u * -0.1 } y={ u * -1.9 } width={ u * 0.2 } height={ u * 1.8 } />
      </g>

      <rect id="pillar" x={ u * -0.05 } y={ u * -0.3 } width={ u * 0.1 } height={ u * 0.3 } />

      <g id={ `${ props.floorId }-columns` } fill={ props.light } stroke={ props.dark }>
        <line x1={ floorColumns[ 0 ] } y1="0" x2={ floorColumns[ floorColumns.length - 1 ] } y2="0" />
        { floorColumns.map( ( f, ff ) => (
          <use key={ ff } href="#column" x={ f } />
        ) ) }
        <line x1={ floorColumns[ 0 ] } y1={ u * -2 } x2={ floorColumns[ floorColumns.length - 1 ] } y2={ u * -2 } />
      </g>

      <g id={ `${ props.floorId }-balcony` } fill={ props.light } stroke={ props.dark }>
        <line x1={ floorColumns[ 0 ] } y1="0" x2={ floorColumns[ floorColumns.length - 1 ] } y2="0" />
        { floorBalcony.map( ( f, ff ) => (
          <use key={ ff } href="#pillar" x={ f } />
        ) ) }
        <rect x={ floorBalcony[ 0 ] - u * 0.15 } y={ u * -0.4 } width={ floorWidth + u * 0.2 } height={ u * 0.1 } />
      </g>

      { props.facadeWidth > 0 && (
        <g id={ `${ props.facadeId }-columns` } fill={ props.light } stroke={ props.dark }>
          <line x1={ facadeColumns[ 0 ] } y1="0" x2={ facadeColumns[ facadeColumns.length - 1 ] } y2="0" />
          { facadeColumns.map( ( f, ff ) => (
            <use key={ ff } href="#column" x={ f } />
          ) ) }
          <line x1={ facadeColumns[ 0 ] } y1={ u * -2 } x2={ facadeColumns[ facadeColumns.length - 1 ] } y2={ u * -2 } />
        </g>
      ) }

      { props.facadeWidth > 0 && (
        <g id={ `${ props.facadeId }-balcony` } fill={ props.light } stroke={ props.dark }>
          <line x1={ facadeColumns[ 0 ] } y1="0" x2={ facadeColumns[ facadeColumns.length - 1 ] } y2="0" />
          { facadeBalcony.map( ( f, ff ) => (
            <use key={ ff } href="#pillar" x={ f } />
          ) ) }
          <rect x={ facadeBalcony[ 0 ] - u * 0.15 } y={ u * -0.4 } width={ facadeWidth + u * 0.2 } height={ u * 0.1 } />
        </g>
      ) }

      <g id="window-1" fill={ props.dark } stroke={ props.dark }>
        <rect x={ u * -0.2 } y={ u * -1.2 } width={ u * 0.4 } height={ u * 1.2 } />
      </g>

      <g id="window-2" fill={ props.dark } stroke={ props.dark }>
        <circle r={ u * 0.2 } cx="0" cy={ u * -1 } />
        <rect x={ u * -0.2 } y={ u * -1 } width={ u * 0.4 } height={ u * 1 } />
      </g>

      <g id="window-3" fill={ props.dark } stroke={ props.dark }>
        <rect x={ u * -0.2 } y={ u * -1.2 } width={ u * 0.4 } height={ u * 0.6 } />
      </g>

      <g id="window-4" fill={ props.dark } stroke={ props.dark }>
        <circle r={ u * 0.2 } cx="0" cy={ u * -1 } />
        <rect x={ u * -0.2 } y={ u * -1 } width={ u * 0.4 } height={ u * 0.4 } />
      </g>

      <g id="window-5" fill={ props.dark } stroke={ props.dark }>
        <circle r={ u * 0.2 } cx="0" cy={ u * -1 } />
      </g>

    </defs>
	);
}

export default Defs;