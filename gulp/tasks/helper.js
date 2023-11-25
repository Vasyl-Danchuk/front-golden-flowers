const del = require( 'del' );
const config = require( '../config' );

// clean build directory
function clean() {
	return del( config.dest.root );
}
module.exports = clean;
