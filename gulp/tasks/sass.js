const { src, dest, series, parallel, watch }  = require( 'gulp' );
const config = require( '../config' );
const autoprefixer = require( 'autoprefixer' );
const cleanCSS = require( 'gulp-clean-css' );
const cssimport = require( 'gulp-cssimport' );
const gulpIf = require( 'gulp-if' );
const notify = require( 'gulp-notify' );
const postcss = require( 'gulp-postcss' );
// const sass = require( 'gulp-ruby-sass' );
const gulpSass = require( 'gulp-sass' )(require( 'sass' ));
const scsslint = require( 'gulp-scss-lint' );
const sourcemaps = require( 'gulp-sourcemaps' );
const browserSync = require( "browser-sync" );

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV  === 'prod';

// build scss files
function sass() {
	const processors = [
		autoprefixer({
			cascade: false
		})
	];

	return src( config.src.sass + '*.scss' )
		.pipe( sourcemaps.init() )
		.pipe( gulpSass({
			outputStyle: 'compressed' // expanded or compressed
		})
			.on( 'error', function( error ) {
				console.log( error.message );
				notify.onError({
					title: 'Sass Error!',
					message: error.message
				});
				this.emit( 'end' );
			}))
		.pipe( cssimport() )
		.pipe( postcss( processors ) )
		.pipe( gulpIf( isDev, sourcemaps.write( './' ) ) )
		.pipe( gulpIf( isProd, cleanCSS({ debug: true }, ( details ) => {
			const name = details.name;
			const originalSize = details.stats.originalSize;
			const minifiedSize = details.stats.minifiedSize;
			notify( `Original size of ${name}: ${originalSize}` );
			notify( `Minified size ${name}: ${minifiedSize}` );
		}) ) )
		.pipe( dest( config.dest.css ) );
}

// lint all scss files
function scssLint() {
	return src( [
		config.src.sass + '**/*.scss',
		'!' + config.src.sass + '_bootstrap-config.scss',
		'!' + config.src.sass + 'lib/*.*'
	] )
		.pipe( scsslint({
			options: {
				formatter: 'stylish',
				'merge-default-rules': false
			},
			config: '.scss-lint.yml'
		}) );
}

// watch scss files and run [sass] task after file changed
function sassWatch() {
	return watch( config.src.sass + '**/*', series( sass ))
		.on( 'change', browserSync.reload );
}

module.exports = { sass, scssLint, sassWatch };
