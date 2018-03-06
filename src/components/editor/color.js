import React from 'react';

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
      </span>
      <input type="color" defaultValue={ color } onChange={ props.func }/>
    </label>
	);
}

export default Color;