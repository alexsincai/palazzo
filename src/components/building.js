import React from 'react';
import util from '../util';

import Structure from './structure';

const Building = ( props ) => {

	let groupProps = {
		id: props.id,
		fill: props.color.light,
		stroke: props.color.dark,
		strokeWidth: 0.2,
	}

	let commonProps = {
		unit: props.unit,
		width: props.width,
	}

	let buildingProps = Object.assign( {}, commonProps, {
		id: 'body',
		light: props.color.light,
		mid: props.color.mid,
		dark: props.color.dark,
		stairs: props.stairs,
		floors: props.floors,
		roof: props.roof,
	} );

	let facadeProps = Object.assign( {}, buildingProps, {
		id: 'facade',
		width: props.facadeWidth,
		mid: props.color.light,
		stairs: true,
		floors: props.facadeFloors,
		roof: 3,
	} );

	let towerProps = Object.assign( {}, buildingProps, {
		width: 3,
		mid: props.color.light,
		floors: Array( props.floors.length + props.towerProps.floors ).fill( {
			balcony: props.towerProps.balcony,
			columns: props.towerProps.columns,
			windows: props.towerProps.windows,
			windowsType: props.towerProps.windowsType
		} ),
		stairs: true,
		roof: props.towerProps.roof
	} );

	let towers = Array( props.towers ).fill( null ).map( ( _, tt ) => Object.assign( {}, towerProps, {
		id: `tower-${ tt + 1 }`,
		offset: util.map( tt, 0, props.towers - 1, ( -0.5 * props.width ), ( 0.5 * props.width ) ) || 0,
	} ) );

	return (
		<g { ...groupProps }>
      { props.towers > 0 && towers.map( ( t, tt ) => (
        <Structure key={ tt } { ...t } />
      ) ) }
      <Structure { ...buildingProps } />
      { props.facadeWidth > 0 && (
        <Structure { ...facadeProps } />
      ) }
    </g>
	);
}

export default Building;