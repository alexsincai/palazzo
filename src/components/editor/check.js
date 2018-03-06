import React from 'react';
import util from '../../util';

const Check = ( props ) => {
	let label = props.name.replace( /([A-Z]+)/g, ' $1' ).split( ' ' ).map( t => util.upper( t ) ).join( ' ' );

	return (
		<label>
      <span>{ label }: { props.value ? 'Yes' : 'No' }</span>
      <input type="checkbox" data-set={ props.set } data-name={ props.name } data-index={ props.index } checked={ props.value } onChange={ props.func } />
    </label>
	);
}

export default Check;