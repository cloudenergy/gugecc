// 引入gulp
var gulp = require('gulp'),
    // 引入组件
    browerSync = require('browser-sync'), // browser-sync
    pkg = require('gulp-packages')(gulp, [
        'concat',
        'rename',
        'image',
        'sass',
        'imagemin',
        'jshint'
    ]),
    path = {
        src: {
            html: './src/*.html',
            sass: './src/assets/css/*.scss',
            js: './src/assets/js/*.js',
            img: './src/assets/img/*.png'
        },
        dest: {
            html: './public',
            css: './public',
            js: './public',
            img: './public/img'
        }
    };
gulp.task('html', function() {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.dest.html));
});

gulp.task('sass', function() {
    gulp.src(path.src.sass)
        .pipe(pkg.sass())
        .pipe(pkg.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.dest.css));
});
gulp.task('js', function() {
    gulp.src(path.src.js)
        .pipe(pkg.jshint())
        .pipe(pkg.jshint.reporter('default'))
        .pipe(pkg.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.dest.js));
});
gulp.task('image', function() {
    gulp.src(path.src.img)
        .pipe(pkg.image())
        .pipe(gulp.dest(path.dest.img));
});
gulp.task('browserSync', function() {
    var files = [
        path.dest.html,
        path.dest.css,
        path.dest.js,
        path.dest.img
    ];
    browerSync.init(files, {
        server: {
            baseDir: './',
            directory: true
        }
    });
});


gulp.task('default', function() {
    gulp.start('html', 'sass', 'js', 'image', 'browserSync');
    gulp.watch(path.src.html, function() {
        gulp.run('browserSync');
    });
    //监听SASS
    gulp.watch(path.src.sass, function() {
        gulp.run('sass');
    });
    //监听JS
    gulp.watch(path.src.js, function() {
        gulp.run('js');
    });
});

gulp.task('watch', function() {
    //监听HTML
    gulp.watch(path.src.html, function() {
        gulp.run('html');
    });
    //监听SASS
    gulp.watch(path.src.sass, function() {
        gulp.run('sass');
    });
    //监听JS
    gulp.watch(path.src.js, function() {
        gulp.run('js');
    });
    gulp.watch(path.src.img, function() {
        gulp.run('image');
    });
});