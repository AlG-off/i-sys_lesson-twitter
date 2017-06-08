const
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    rimraf = require('gulp-rimraf');

gulp.task('default', () => gutil.log('Gulp is running!'));

gulp.task('rm', () => {
    gulp.src('public/*.js')
       .pipe(rimraf());
});
