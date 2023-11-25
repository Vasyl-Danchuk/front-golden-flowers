const { src, dest, series, parallel, watch }  = require( 'gulp' );
const config = require( '../config' );
const notify = require( 'gulp-notify' );
const iconfont = require( 'gulp-iconfont' );
const consolidate = require( 'gulp-consolidate' );
const browserSync = require( 'browser-sync' );

const fontname = 'svgfont';
const runTimestamp = Math.round( Date.now()/1000 );

// generate icon font from svg images from /src/img/svg directory
function svgFont() {
	return src( config.src.img + 'svg/*.svg' )
		.pipe( iconfont({
			fontName: fontname,
			prependUnicode: true,
			formats: [ 'ttf', 'woff' ],
			normalize: true,
			fontHeight: 1001,
			fontStyle: 'normal',
			fontWeight: 'normal',
			timestamp: runTimestamp
		}) )
		.on( 'error', function( error ) {
			// console.log( error.message );
			notify.onError({
				title: 'Iconfont Error!',
				message: error.message
			});
			this.emit( 'end' );
		})
		.on( 'glyphs', function( glyphs, options ) {
			// generate style for svg font
			src( config.src.helpers + '_svgfont.sass' )
				.pipe( consolidate( 'lodash', {
					glyphs: glyphs,
					fontName: fontname,
					fontPath: 'fonts/',
					className: 'icon'
				}) )
				.pipe( dest( config.src.sass + 'lib/' ) );

			// generate html file with whole bunch of icons in /build directory
			src( config.src.helpers + 'icons.html' )
				.pipe( consolidate( 'lodash', {
					glyphs: glyphs,
					fontName: fontname,
					fontPath: 'fonts/',
					className: 'icon',
					htmlBefore: '<i class="icon ',
					htmlAfter: '"></i>',
					htmlBr: ''
				}) )
				.pipe( dest( config.dest.root ) );
		})
		.pipe( dest( config.dest.css + 'fonts/' ) )
		.pipe( notify( 'Icon font updated!' ) );
}

// watch svg files and run [font] task after file changed
function svgFontWatch() {
	return watch( config.src.img + 'svg/*', series( svgFont ) )
		.on( 'change', browserSync.reload );
}

module.exports = { svgFont, svgFontWatch };
