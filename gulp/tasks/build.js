const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const del = require('del');
const usemin = require('gulp-usemin');
const rev = require('gulp-rev');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

gulp.task('previewDist', () => {

    browserSync.init({
        notify:false,
        server:{
            baseDir: 'docs'
        }
    });

}); 

gulp.task('deleteDistFolder', ['icons'], () => {
    return del('./docs');
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], () => {
    const panthsToCopy = [
        './app/**/*',
        '!./app/index.html',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/temp',
        '!./app/temp/**'
    ];


    return gulp.src(panthsToCopy)
        .pipe(gulp.dest('./docs'));
})

gulp.task('optimizeImages', ['deleteDistFolder'], () => {
    return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
        .pipe(imagemin({
            progressive:true,
            interlaces:true,
            multipass:true
        }))
        .pipe(gulp.dest('./docs/assets/images'));
});

gulp.task('useminTrigger', ['deleteDistFolder'], () => {
    gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], () => {
    return gulp.src('./app/index.html')
        .pipe(usemin({
            css: [function(){return rev()}, function(){return cssnano()}],
            js: [function(){return rev()}, function(){return uglify()}]
        }))
        .pipe(gulp.dest('./docs'));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);
