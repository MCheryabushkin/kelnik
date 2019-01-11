'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    rigger = require('gulp-rigger'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    gcmq = require('gulp-group-css-media-queries'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    cru = require('gulp-css-rework-url'),
    imageminPngquant = require('imagemin-pngquant'),
    imageminJpegRecompress = require('imagemin-jpeg-recompress'),
    modifyCssUrls = require('gulp-modify-css-urls'),
    path = require('path'),
    filter = require('gulp-filter'),
    flatten = require('gulp-flatten'),
    mainBowerFiles = require('main-bower-files'),
    browserSync = require('browser-sync').create(),
    browserSyncReload = browserSync.reload,
    rename = require("gulp-rename");

var custom_path = {
    src: {
        style: 'css/src/style.scss',
        js: 'js/src/scripts.js',
        img: 'images_prebuild/**/*.*',
        img_import: 'import_prebuild/**/*.*',
        font: 'css/fonts/**/*.css',
        html: 'html/*.html'
    },
    build: {
        js: 'js/',
        style: 'css/',
        img: 'images/',
        img_import: 'import/',
        font: 'css/',
        html: ''
    },
    watch: {
        style: 'css/src/**/*.scss',
        js: 'js/src/partials/*.js',
        html: 'html/*.html'
    },
    root: {
        src: '/'
    }
};

gulp.task('html:build', function () {
    return gulp.src(custom_path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(custom_path.build.html));
});

gulp.task('style:build', function () {
    gulp.src(custom_path.src.style)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gcmq())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(custom_path.build.style));

});

gulp.task('font:build', function () {
    gulp.src(custom_path.src.font)
        .pipe(cleanCSS({
            rebaseTo: '.',
        }))
        .pipe(modifyCssUrls({
            modify: function (url, filePath) {
                return url;
            },
            prepend: '/',
        }))
        .pipe(concat('fonts.min.css'))
        .pipe(gulp.dest(custom_path.build.font));

});

gulp.task('js:build', function () {
    gulp.src(custom_path.src.js) //Найдем наш main файл
        .pipe(plumber())
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(custom_path.build.js)) //Выплюнем готовый файл в build
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(uglify()) //Сожмем наш js
        .pipe(rename({suffix: ".min"}))
        .pipe(sourcemaps.write('.')) //Пропишем карты
        .pipe(gulp.dest(custom_path.build.js)) //Выплюнем готовый файл в build


});

gulp.task('image:build', function () {
    return gulp.src(custom_path.src.img) //Выберем наши картинки
        .pipe(gulp.dest(custom_path.build.img)) //Копируем изображения заранее, imagemin может пропустить парочку )
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imageminJpegRecompress({
                progressive: true,
                max: 80,
                min: 70
            }),
            imageminPngquant({quality: '80'}),
            imagemin.svgo({
                plugins: [{removeViewBox: true}, {removeXMLProcInst: true}, {removeTitle: true}, {removeDesc: true}, {removeUselessDefs: true}, {convertTransform: true}, {collapseGroups: true}, {cleanupIDs: true}, {removeUnusedNS: true}]
            })
        ]))
        .pipe(gulp.dest(custom_path.build.img)); //И бросим в prod оптимизированные изображения
});

gulp.task('image:build_import', function () {
    return gulp.src(custom_path.src.img_import) //Выберем наши картинки
        .pipe(gulp.dest(custom_path.build.img_import)) //Копируем изображения заранее, imagemin может пропустить парочку )
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imageminJpegRecompress({
                progressive: true,
                max: 80,
                min: 70
            }),
            imageminPngquant({quality: '80'}),
            imagemin.svgo({plugins: [{removeViewBox: true}]})
        ]))
        .pipe(gulp.dest(custom_path.build.img_import)); //И бросим в prod оптимизированные изображения
});

gulp.task('watch', function () {
    gulp.watch([custom_path.watch.html], ['html:build']).on('change', browserSyncReload);
    gulp.watch([custom_path.watch.js], ['js:build']).on('change', browserSyncReload);
    gulp.watch([custom_path.watch.style], ['style:build']).on('change', browserSyncReload);
});


gulp.task('get_components', function () {
    var filter_js = filter(['**/*.js','**/*.js.map'], {restore: true,dot:true});
    var filter_css = filter(['**/*.css','**/*.css.map'], {restore: true,dot:true});
    var bowerFiles = mainBowerFiles({
            "overrides": {
                "bootstrap": {
                    main: [
                        './dist/css/bootstrap.css',
                        './dist/css/bootstrap.min.css',
                        './dist/css/bootstrap.css.map',
                        './dist/js/bootstrap.js',
                        './dist/js/bootstrap.min.js',
                        './dist/js/bootstrap.bundle.js',
                        './dist/js/bootstrap.bundle.min.js',
                    ]
                },
                "jquery": {
                    "main": "dist/jquery.min.js"
                }
            }
        }
    );
    return gulp.src(bowerFiles)
        .pipe(filter_css)
        .pipe(gulp.dest('css/libs/'))
        .pipe(filter_css.restore)
        .pipe(filter_js)
        .pipe(gulp.dest('js/libs/'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    // gulp.watch("*.html").on("change", browserSyncReload);
    gulp.watch("/css/src/**/*.scss").on("change", browserSyncReload);
    gulp.watch("/js/src/**/*.js").on("change", browserSyncReload);
});

gulp.task('default', ['watch', 'browser-sync']);