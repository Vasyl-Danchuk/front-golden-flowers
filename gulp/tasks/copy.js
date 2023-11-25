const { src, dest, series, parallel, watch }  = require( 'gulp' );
const config = require( '../config' );
const imgIcons = config.src.img + 'icons/*.*';
const imgSvg = config.src.img + 'svg/*.*';
const newer = require( 'gulp-newer' );
const browserSync = require( "browser-sync" );

// copy static files
function copy ( done ) {
	// copy all files from /src/img directory
	src( [ config.src.img + '**/*.*', '!' + imgIcons, '!' + imgSvg ] )
		.pipe( newer( config.dest.img ) )
		.pipe( dest( config.dest.img ) );

	// copy all files from /src/fonts directory
	src( config.src.root + 'fonts/*.*' )
		.pipe( newer( config.dest.css + 'fonts/' ) )
		.pipe( dest( config.dest.css + 'fonts/' ) );

	// copy all roots files except *.html
	src( [ config.src.root + '*.*', '!' + config.src.root + '*.html' ] )
		.pipe( dest( config.dest.root ) );

	// copy all files from /src/video directory
	src( config.src.root + 'video/*.*' )
		.pipe( newer( config.dest.root + 'video/' ) )
		.pipe( dest( config.dest.root + 'video/' ) );

	done();
}

function copyWatch() {
	return watch([
		config.src.img + '*',
		config.src.root + 'fonts/*'
	], series( copy ))
		.on( 'change', browserSync.reload );
}

module.exports = { copy, copyWatch };
