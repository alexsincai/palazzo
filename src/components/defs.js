import React from 'react';

const Defs = ( props ) => {
	let u = props.unit;

	return (
		<defs>

      <g id="column">
        <rect x={ u * -0.2 } y={ u * -2 } width={ u * 0.4 } height={ u * 0.1 } />
        <rect x={ u * -0.2 } y={ u * -0.1 } width={ u * 0.4 } height={ u * 0.1 } />
        <rect x={ u * -0.1 } y={ u * -1.9 } width={ u * 0.2 } height={ u * 1.8 } />
      </g>

      <g id="rail">
        <rect x={ u * -0.05 } y={ u * -0.3 } width={ u * 0.1 } height={ u * 0.3 } />
      </g>

      <g id="window-1">
        <rect x={ u * -0.2 } y={ u * -1.2 } width={ u * 0.4 } height={ u * 1.2 } />
      </g>

      <g id="window-2">
        <circle r={ u * 0.2 } cx="0" cy={ u * -1 } />
        <rect x={ u * -0.2 } y={ u * -1 } width={ u * 0.4 } height={ u * 1 } />
      </g>

      <g id="window-3">
        <rect x={ u * -0.2 } y={ u * -1.2 } width={ u * 0.4 } height={ u * 0.6 } />
      </g>

      <g id="window-4">
        <circle r={ u * 0.2 } cx="0" cy={ u * -1 } />
        <rect x={ u * -0.2 } y={ u * -1 } width={ u * 0.4 } height={ u * 0.4 } />
      </g>

      <g id="window-5">
        <circle r={ u * 0.2 } cx="0" cy={ u * -1 } />
      </g>

    </defs>
	)
}

export default Defs;