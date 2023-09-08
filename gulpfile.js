const {series, watch} = require('gulp')
const gulp = require('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const image = require('gulp-imagemin')
const stripJs = require('gulp-strip-comments')
const stripCss = require('gulp-strip-css-comments')
const htmlmin = require('gulp-htmlmin')
const babel = require('gulp-babel')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
const sass = require ('gulp-sass')( require('node-sass'))
const { parallel } = require('gulp');

function tarefasCSS(cb) {

    return gulp.src([
            './node_modules/bootstrap/dist/css/bootstrap.css',
            './node_modules/@fortawesome/fontawesome-free/css/fontawesome.css',
            './vendor/owl/css/owl.css',
            './vendor/jquery-ui/jquery-ui.css',
        ])
        .pipe(stripCss())                   // remove comentários
        .pipe(concat('libs.css'))         // mescla arquivos
        .pipe(cssmin())                     // minifica css
        .pipe(rename({ suffix: '.min'}))    // styles.min.css
        .pipe(gulp.dest('./dist/css'))      // cria arquivo em novo diretório

}

function tarefasSASS(cb){

    gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'))

    cb()

}

function tarefasJS(){

    return gulp.src([
            './node_modules/jquery/dist/jquery.js',
            './node_modules/bootstrap/dist/js/bootstrap.js',
            './vendor/owl/js/owl.js',
            './vendor/jquery-mask/jquery.mask.js',
            //'./vendor/jquery-ui/jquery-ui.js',
            './src/js/custom.js'
        ])
        .pipe(babel({
            comments: false,
            presets: ['@babel/env']
        }))
        .pipe(stripJs())                    // remove comentários
        .pipe(concat('scripts.js'))         // mescla arquivos
        .pipe(uglify())                     // minifica js
        .pipe(rename({ suffix: '.min'}))    // scripts.min.js
        .pipe(gulp.dest('./dist/js'))       // cria arquivo em novo diretório
}


function tarefasImagem(){

    console.log()
    
    return gulp.src('./src/images/*')
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: true
        }))
        .pipe(gulp.dest('./dist/images'))
}

function tarefasHTML() {
    return gulp.src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist'));
}

//gulp.task('serve', function(){

  //  browserSync.init({
    //    server: {
      //      baseDir: "./dist"
        //}
    //})
    //gulp.watch('./src/**/*').on('change', process)
    //gulp.watch('./dist/**/*').on('change', process)

//})

//const process = series( tarefasHTML, tarefasJS, tarefasCSS, serve )


function serve(done) {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    watch('./src/**/*', series(tarefasHTML, tarefasImagem, tarefasJS, tarefasCSS)).on('change', reload);
    done();
}

function reloadBrowser(done) {
    browserSync.reload(); // Recarrega o navegador
    done();
}

function end(cb){
    console.log("tarefas concluídas")
    return cb()
}


function watchFiles() {
    watch('./src/**/*.html', series(tarefasHTML, reloadBrowser));
    watch('./src/js/**/*.js', series(tarefasJS, reloadBrowser));
    watch('./src/scss/**/*.scss', series(tarefasSASS, reloadBrowser));
    // Adicione qualquer outra tarefa que você deseja assistir e recarregar aqui
}


exports.default = series(tarefasHTML, tarefasJS, tarefasCSS, tarefasImagem, tarefasSASS, serve, end);

exports.scripts = tarefasJS
exports.styles = tarefasCSS
exports.images = tarefasImagem
exports.sass = tarefasSASS

//exports.default = process