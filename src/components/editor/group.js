import React from 'react';
// import util from '../../util';

const Group = ( props ) => {
	return (
		<fieldset>
      <legend className={ props.on ? '' : 'collapse' } onClick={ (e) => e.target.classList.toggle('collapse') }>
        { props.name }
      </legend>
      { props.children }
    </fieldset>
	);
}

export default Group;