import React from 'react';
import util from '../util';

const Windows = ( props ) => {
	let floor = ( props.floor * 2 + 1 ) * props.unit;

	if ( props.count === 0 )
		return null;

	if ( props.count === 1 )
		return (
			<g id={ props.id }>
        <use href={ `#window-${ props.type }` } x="50" y={ 100 - floor }/>
      </g>
		);

	let width = props.width * props.unit;
	let windows = Array( Number( props.count ) ).fill( null ).map( ( _, w ) => util.map( w, -0.5, props.count - 0.5, 50 - width / 2, 50 + width / 2 ) );

	return (
		<g id={ props.id }>
      { windows.map( ( w, ww ) => (
        <use key={ ww } href={ `#window-${ props.type }` } x={ w } y={ 100 - floor }/>
      ) ) }
    </g>
	)
}

export default Windows;