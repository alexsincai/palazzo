import React from 'react';
import util from '../../util';

const Range = ( props ) => {
	let label = props.name.replace( /([A-Z]+)/g, ' $1' ).split( ' ' ).map( t => util.upper( t ) ).join( ' ' );

	return (
		<label>
      <span>{ label }: { props.value }</span>
      <input type="range" data-set={ props.set } data-name={ props.name } data-index={ props.index } min={ props.min } max={ props.max } defaultValue={ props.value } onChange={ props.func } />
    </label>
	);
}

export default Range;