import React from 'react';
import util from '../../util';

const Color = ( props ) => {
	let {
		light,
		mid,
		dark,
		color
	} = props.color;

	return (
		<label>
      <span className="boxes">
        <span className="box" style={{ backgroundColor: light }}></span>
        <span className="box" style={{ backgroundColor: mid }}></span>
        <span className="box" style={{ backgroundColor: dark }}></span>
        <input type="color" defaultValue={ color } onChange={ props.func }/>
      </span>
    </label>
	);
}

export default Color;