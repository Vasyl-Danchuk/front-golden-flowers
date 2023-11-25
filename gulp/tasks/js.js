const { task, src, dest, series, parallel, watch } = require( 'gulp' );
const babel = require( 'gulp-babel' );
const browserSync = require( 'browser-sync' );
const config = require( '../config' );
const eslint = require( 'gulp-eslint' );
const gulpIf = require( 'gulp-if' );
const uglify = require( 'gulp-uglify' );
const include = require( 'gulp-include' );
const notify = require( 'gulp-notify' );
const reload = browserSync.reload;
const sourcemaps = require( 'gulp-sourcemaps' );

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'prod';

// concat and trinspile all js
function js() {
	return src( config.src.js + '**/*.js' )
		.pipe( gulpIf( isDev, sourcemaps.init() ) )
		.pipe( include() )
		.on( 'error', function () {
			notify( 'Javascript include error' );
		})
		.pipe(
			babel({
				presets: [ '@babel/preset-env' ],
				minified: true,
			})
		)
		.on( 'error', function ( error ) {
			console.log( error );
			notify.onError({
				title: 'JS Babel Error!',
				message: error.message,
			});
			this.emit( 'end' );
		})
		.pipe( gulpIf( isDev, sourcemaps.write( './' ) ) )
		.pipe( gulpIf( isProd, uglify() ) )
		.pipe( dest( config.dest.js ) )
		.pipe( reload({ stream: true }) );
}

// watch js files and run [js] task after file changed
function jsWatch() {
	return watch( config.src.js + '*', series( js ) );
}

// lint js files
function jsLint() {
	return src([ config.src.js + '**/*.js' ])
		.pipe( eslint() )
		.pipe( eslint.format( 'codeframe' ) );
}

// watch js files and run [jslint] task after file changed
function jsLintWatch() {
	return watch( config.src.js + '*' );
}

module.exports = { js, jsWatch, jsLint, jsLintWatch };
