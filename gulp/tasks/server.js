const gulp = require( 'gulp' );
const browserSync = require( 'browser-sync' );
const config = require( '../config' );


// run browser-sync server
function server() {
	return browserSync({
		server: {
			baseDir: config.dest.root
		},
		files: [
			config.dest.html + '*.html',
			config.dest.css + '*.css',
			config.dest.js + '*.js'
		],
		port: 8080,
		notify: false,
		ghostMode: false,
		online: false,
		open: true
	});
}

module.exports = server;
