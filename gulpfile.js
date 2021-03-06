'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

// sass file watcher
gulp.task('sass:watch', () => {
    gulp.watch('./assets/scss/*.scss', ['sass']);
});

// preprocess scss to css
gulp.task('sass', () => {
    return gulp.src('./assets/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))

        // post-process css with prefixes
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./assets/css/'));
});

// concatenate js
gulp.task('js:concat', () => {
    return gulp.src(['./public/ammo.js', './public/app.js'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(concat('main.js', {
            newLine: '\n;'
        }))
        .pipe(gulp.dest('./public/'));
});

// minify js
gulp.task('js:minify', () => {
    gulp.src('./dist/ammo.js')
        .pipe(minify({
            ext: {
                src: '.js',
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest('./dist/'));
});
