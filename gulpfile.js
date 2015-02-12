var gulp = require('gulp'),
    
    // jekyll plugins
    cp = require('child_process'),

    // other plugins
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    
    // css plugins
    sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer-core'),

    // js plugins
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');
 

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};





// Build Jekyll _site
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});


// Rebuild Jekyll and do page reload
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});


// Wait for jekyll-build, then launch server
gulp.task('browser-sync', ['styles', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});
 



// Compile SASS
gulp.task('styles', function() {
  return sass('development/scss/main.scss', {
    require: "susy",
    style: "expanded"
  })
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
    .pipe(reload({stream:true}))
    .pipe(gulp.dest('_site/site_assets/css'))
    .pipe(gulp.dest('site_assets/css'))
    .pipe(notify({ message: 'Styles done' }));
});




// Scripts
gulp.task('scripts', function() {
  return gulp.src('development/js/main.js')
    .pipe(concat('main.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(reload({stream:true}))
    .pipe(gulp.dest('_site/site_assets/js'))
    .pipe(gulp.dest('site_assets/js/'))
    .pipe(notify({ message: 'Scripts done mayne' }));
});


// Min Scripts
gulp.task('minscripts', function() {
  return gulp.src('development/js/main.js')
    .pipe(concat('main.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('site_assets/js/'))
    .pipe(notify({ message: 'Minscripts done mayne' }));
});
 
 



// Watch for changes
gulp.task('watch', function () {
    // Watch .scss files
    gulp.watch('development/scss/**/*.scss', ['styles']);
    
    // Watch .js files
    gulp.watch('development/js/main.js', ['scripts']);

    // Watch .html files or .md files
    gulp.watch(['_layouts/**', '_includes/**', '_posts/**', 'index.html'], ['jekyll-rebuild']);
})
 
 



gulp.task('default', ['browser-sync', 'watch']);






