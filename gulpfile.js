var gulp       = require('gulp'), // Подключаем Gulp
    sass       = require('gulp-sass'), // Подключаем Sass пакет
    concat     = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify     = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano    = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename     = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del        = require('del'); // Подключаем библиотеку для удаления файлов и папок

gulp.task('sass', function () { // Создаем таск Sass
    return gulp.src('app/sass/*.sass') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('app/css')); // Выгружаем результата в папку app/css
});

gulp.task('backgroundJs', function() {
    return gulp.src([ 'app/js_src/background.js' ]) // Берем все необходимые библиотеки
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

gulp.task('contentJs', function() {
    return gulp.src([ 'app/js_src/content.js' ]) // Берем все необходимые библиотеки
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

gulp.task('popupJs', function() {
    return gulp.src([ 'app/js_src/popup.js' ]) // Берем все необходимые библиотеки
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

gulp.task('scripts', ['backgroundJs', 'contentJs', 'popupJs'], function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'app/libs/jquery/dist/jquery.min.js', // Берем jQuery
        'app/libs/handlebars/handlebars.min.js' // Берем Handlebars
    ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});


gulp.task('watch', ['sass', 'scripts'], function () {
    gulp.watch('app/sass/*.sass', ['sass']); // Наблюдение за sass файлами
    gulp.watch('app/js_src/*.js', ['scripts']); // Наблюдение за JS файлами в папке js
});

gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('build', ['clean', 'sass', 'scripts'], function() {
    var buildFonts = gulp.src('app/**/*') // Переносим основные файлы в продакшен
        .pipe(gulp.dest('dist'));
    var buildCss = gulp.src(['app/css/*.*']) // Переносим CSS стили в продакшен
        .pipe(gulp.dest('dist/css'));
    var buildCss = gulp.src(['app/img/*.*']) // Переносим img в продакшен
        .pipe(gulp.dest('dist/img'));
    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
        .pipe(gulp.dest('dist/js'));
});