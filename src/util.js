const util = {
	upper: ( text ) => text.substr( 0, 1 ).toUpperCase() + text.substr( 1 ),
	map: ( v, im = 0, ix = 1, om = 1, ox = 100 ) => ( v - im ) * ( ox - om ) / ( ix - im ) + om,
	round: ( v, d = 3 ) => Math.floor( v * Math.pow( 10, d ) ) / Math.pow( 10, d ),
	clean: ( text ) => text.replace( /\s+/g, ' ' ).trim(),
	uniq: ( arr ) => [ ...new Set( arr ) ],
	random: ( min = 0, max = 1 ) => Math.floor( Math.random() * ( max - min + 1 ) + min ),
	minmax: ( x ) => util.uniq( [ 0, 1, Math.floor( x / 2 ), Math.ceil( x / 2 ), x ] ),
	generateRandomColor: ( color ) => {
		let out = {
			light: [],
			mid: [],
			dark: []
		}

		let values = {
			light: Array( 3 ).fill( 255 ),
			mid: Array( 3 ).fill( 180 ),
			dark: Array( 3 ).fill( 105 ),
		}

		if ( !color )
			color = [ util.random( 0, 255 ), util.random( 0, 255 ), util.random( 0, 255 ) ];
		else
			color = color.replace( /[^0-9a-f]/gi, '' ).match( /.{1,2}/g ).map( c => parseInt( c, 16 ) );

		for ( let i = 0; i < 3; i++ ) {
			out.light.push( Math.round( ( color[ i ] + values.light[ i ] ) / 2 ) );
			out.mid.push( Math.round( ( color[ i ] + values.mid[ i ] ) / 2 ) );
			out.dark.push( Math.round( ( color[ i ] + values.dark[ i ] ) / 2 ) );
		}

		out.light = '#' + out.light.map( c => `00${ c.toString( 16 ) }`.substr( -2 ) ).join( '' );
		out.mid = '#' + out.mid.map( c => `00${ c.toString( 16 ) }`.substr( -2 ) ).join( '' );
		out.dark = '#' + out.dark.map( c => `00${ c.toString( 16 ) }`.substr( -2 ) ).join( '' );
		out.color = '#' + color.map( c => `00${ c.toString( 16 ) }`.substr( -2 ) ).join( '' );

		return out;
	}
}

export default util;