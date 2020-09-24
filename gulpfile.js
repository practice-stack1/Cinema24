let source_folder = 'src';
let project_folder = 'dist';

let fs = require('fs');

//! об'єкт із шляхами до разних файлів
let path = {
    build: {
        html: project_folder + '/',
        css: project_folder + '/css/',
        js: project_folder + '/js/',
        img: project_folder + '/img/',
    },
    src: {
        html: source_folder + '/*.html',
        css: source_folder + '/scss/style.scss',
        js: source_folder + '/js/script.js',
        js_film: source_folder + '/js/film.js',
        img: source_folder + '/img/**/*.{png,jpg,svg,gif,ico,webp}',
    },

    watch: {
        html: source_folder + '/**/*.html',
        css: source_folder + '/scss/**/*.scss',
        js: source_folder + '/js/**/*.js',
        img: source_folder + '/img/**/*.{png,jpg,svg,gif,ico,webp}',
    },

    clean: './' + project_folder + '/'
}


let { src, dest } = require('gulp'),
gulp = require('gulp'),
browsersync = require('browser-sync').create(),
del = require('del'),
scss = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
group_media = require('gulp-group-css-media-queries'),
clean_css = require('gulp-clean-css'),
rename = require('gulp-rename'),
uglify = require('gulp-uglify'),
fileinclude = require('gulp-file-include')



function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: './' + project_folder + '/'
        },
        port: 3000,
        notify: false
    });
}


function html() {
    return src(path.src.html)
        .pipe(dest(path.build.html))
}
//**метод для обробки css файлів */
function css() {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: 'expanded'
            }).on('error', scss.logError)
        )
        .pipe(
            group_media()
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 5 versions', '>1%', 'ie 8', 'ie 7'],
                cascade: true
            }))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: '.min.css'
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.reload({stream: true}));
}

function js() {
    src(path.src.js_film)
    .pipe(dest(path.build.js))
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(uglify())
        .pipe(
            rename({
                extname: '.min.js'
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.reload({stream: true}));
}


function images() {
    return src(path.src.img)
        .pipe(dest(path.build.img))
        .pipe(browsersync.reload({stream: true}))
}


function watchFile() {
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.css, css);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.img, images);
};


function clean(params) {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(html, css, images, js));
let watch = gulp.parallel(build, watchFile, browserSync);

exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;