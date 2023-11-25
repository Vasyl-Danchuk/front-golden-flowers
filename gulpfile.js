'use strict';
const { src, dest, series, parallel, watch }  = require( 'gulp' );

// tasks
const clean = require( './gulp/tasks/helper' );
const { html, htmlWatch } = require( './gulp/tasks/html' );
const { sass, scssLint, sassWatch } = require( './gulp/tasks/sass' );
const { svgFont, svgFontWatch } = require( './gulp/tasks/iconfont' );
const { js, jsWatch, jsLint, jsLintWatch } = require( './gulp/tasks/js' );
const { copy, copyWatch } = require( './gulp/tasks/copy' );
const { sprite, spriteWatch } = require( './gulp/tasks/spritesmith' );

const server = require( './gulp/tasks/server' );

exports.clean = clean;
exports.html = html;
exports.htmlWatch = htmlWatch;
exports.sass = sass;
exports.scssLint = scssLint;
exports.sassWatch = sassWatch;
exports.svgFont = svgFont;
exports.svgFontWatch = svgFontWatch;
exports.js = js;
exports.jsWatch = jsWatch;
exports.jsLint = jsLint;
exports.jsLintWatch = jsLintWatch;
exports.copy = copy;
exports.copyWatch = copyWatch;
exports.sprite = sprite;
exports.spriteWatch = spriteWatch;

exports.server = server;

const watcher = parallel( spriteWatch, sassWatch, copyWatch, htmlWatch, svgFontWatch, jsWatch );
exports.watcher = watcher;

exports.default = series(
	clean,
	parallel( html, svgFont, sprite, copy, sass, js ),
	parallel( server, watcher )
);

exports.build = series(
	clean,
	parallel( html, svgFont, sprite, copy, sass, js )
);
