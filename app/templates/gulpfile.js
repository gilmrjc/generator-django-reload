var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var spawn = require('child_process').spawn;

function inc(importance) {
  return gulp.src(['./package.json', './bower.json'])
    .pipe(plugins.bump({type: importance}))
    .pipe(gulp.dest('./'))
    .pipe(plugins.git.commit('bumps package version'))
    .pipe(plugins.filter('package.json'))
    .pipe(plugins.tagVersion());
};

gulp.task('patch', function() { return inc('patch'); });
gulp.task('feature', function() { return inc('feature'); });
gulp.task('release', function() { return inc('release'); });

gulp.task('styles-dev', function() {
  return plugins.rubySass('static/scss/*.scss',
    {
      style: 'expanded', sourcemap: true
    })
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions', 'not ie <= 8']
    }))
    .pipe(plugins.addSrc.prepend('static/libs/**/*.css'))
    .pipe(plugins.order(['**/normalize.css', '*']))
    .pipe(plugins.concat('style.css'))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('static/css'))
});

gulp.task('styles', function() {
  return plugins.rubySass('static/scss/*.scss',
    {
      style: 'expanded', sourcemap: false
    })
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions', 'not ie <= 8']
    }))
    .pipe(plugins.addSrc.prepend('static/libs/**/*.css'))
    .pipe(plugins.order(['**/normalize.css', '*']))
    .pipe(plugins.concat('style.css'))
    .pipe(gulp.dest('static/css'));
});

gulp.task('minify-css', ['styles'], function() {
  return gulp.src('static/css/style.css')
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(plugins.csso())
    .pipe(gulp.dest('static/css'));
});

gulp.task('eslint-dev', function() {
  gulp.src(['static/js/**/*.js', '*/static/js/**/*.js'])
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.livereload());
});

gulp.task('eslint', function() {
  return gulp.src(['static/js/*', '*/static/js/*'])
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError());
});

gulp.task('uglify', ['eslint'], function() {
  return gulp.src(['static/js/**/*.js', '*/static/js/**/*.js'])
    .pipe(plugins.uglify())
    .pipe(gulp.dest('assets/js'));
});

gulp.task('watch', function() {

  gulp.watch('static/scss/**/*.scss', ['styles-dev']);
  gulp.watch(['static/js/*', '*/static/js/*'], ['eslint-dev']);
});

gulp.task('clean', function(callback) {
  del(['static/css/*', 'assets/*/*']).then(function(paths) {
    callback();
  });
});

gulp.task('shell', function(){
  spawn('python', ['manage.py', 'shell'], {
    stdio: 'inherit'
  });
});

gulp.task('migrate', function(){
  spawn('python', ['manage.py', 'migrate', '--noinput'], {
    stdio: 'inherit'
  });
});

gulp.task('collectstatic', function(){
  spawn('python', [
      'manage.py',
      'collectstatic',
      '--noinput',
      '-i',
      'scss'
    ], {
    stdio: 'inherit'
  });
});

gulp.task('makemigrations', function(){
  spawn('python', ['manage.py', 'makemigrations', '--noinput'], {
    stdio: 'inherit'
  });
});

gulp.task('runserver', function(){
spawn('python', ['manage.py', 'livereload'], {
    stdio: 'inherit'
  });
});

gulp.task('build', plugins.sequence(
    'clean',
    'minify-css',
    'uglify',
    'collectstatic'
    )
);

gulp.task('default', plugins.sequence('clean', 'styles-dev', 'eslint-dev', 'watch', 'runserver'));
