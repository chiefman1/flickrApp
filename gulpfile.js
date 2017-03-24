'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    cleanCSS = require('gulp-clean-css'),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        js: 'build/',
        json:'build/',
        import: 'build/',
        css: 'build/css/',
        img: 'build/img/'
    },
    src: {
        html: 'src/**/*.html',
        js: 'src/**/*.js',
        json: 'src/*.json',
        style: 'src/style.scss',
        img: 'src/img/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style.scss'
    },
    clear: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 5000,
    logPrefix: "chiefman"
};

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js)
            .on('error', function (err) {
                console.error('Error', err.message);
            })
            )
        .pipe(reload({stream: true}));
});

gulp.task('json:build', function () {
    gulp.src(path.src.json)
        .pipe(gulp.dest(path.build.json))
        .pipe(reload({stream: true}));
});

gulp.task('img:build', function () {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sass()
            .on('error', sass.logError)
        )
        .pipe(prefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('build', [
    'html:build',
    'js:build',
    'img:build',
    'json:build',
    'style:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });

});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clear', function (cb) {
    rimraf(path.clear, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);