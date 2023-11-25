const { src, dest, series, parallel, watch }  = require( 'gulp' );
const include = require( 'gulp-include' );
const config = require( '../config' );
const notify = require( 'gulp-notify' );
const browserSync = require( "browser-sync" );

// copy all html files form /src directory
function html() {
	return src( config.src.root + '*.html' )
		.pipe( include() )
		.on( 'error', () => {
			notify( 'HTML include error' );
		})
		.pipe( dest( config.dest.root ) );
}

// watch *.html files and copy when changed
function htmlWatch() {
	return watch([
		config.src.root + '*.html',
		config.src.root + 'partials/*.html',
		config.src.root + 'partials/*/*.html'
	], series( html ))
		.on( 'change', browserSync.reload );
}

module.exports = { html, htmlWatch };
