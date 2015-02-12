# gulker

gulker is a mediocre starting build for building Jekyll with Gulp.js.

## How it works (see gulpfile.js)
- Gulp compiles style in main.scss
- Gulp compiles js in main.js
- Gulp minifies main.js
- Gulp builds Jekyll
- Gulp watches for changes

## How it doesn't work
You're going to need node modules. You may install them with this nifty command: 

	npm install gulp-browser-sync gulp-rename gulp-notify gulp-ruby-sass gulp-minify-css gulp-postcss autoprefixer-core gulp-jshint gulp-concat gulp-uglify

For gulp-jshint, gekulp prefers jshint-stylish. It's pretty.
