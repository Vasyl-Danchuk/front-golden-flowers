const { src, dest, series, parallel, watch }  = require( 'gulp' );
const notify = require( 'gulp-notify' );
const spritesmith = require( 'gulp.spritesmith' );
const config = require( '../config' );
const browserSync = require( "browser-sync" );

// generate image sprite from images from /src/img/icons directory
function sprite() {
	const spriteData = src( config.src.img + 'icons/*.png' )
		.on("error", function () {
			console.log('error');
			notify("Sprite include error");
		})
		.pipe( spritesmith({
			imgName: 'sprite.png',
			cssName: '_sprite.sass',
			imgPath: '../img/sprite.png',
			cssFormat: 'sass',
			padding: 10,
			cssTemplate: config.src.helpers + 'sprite.template.mustache'
		}) );

	// create sprite image
	const imgStream = spriteData.img
		.pipe( dest( config.dest.img ) );

	// create sprite scss file
	const cssStream = spriteData.css
		.pipe( dest( config.src.sass + 'lib/' ) )
		.pipe( notify( 'New sprite created!' ) );
	return ( imgStream, cssStream );
}

// watch image files and run [sprite] task after file changed
function spriteWatch() {
	return watch( config.src.img + 'icons/*.png', series( sprite ) )
		.on( 'change', browserSync.reload );
}

module.exports = { sprite, spriteWatch };
