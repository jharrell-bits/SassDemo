/// <binding BeforeBuild='default' />
import gulp from "gulp";
import { deleteSync } from "del";

function clean() {
    return new Promise(function (resolve, reject) {
        try {
            deleteSync(['wwwroot/lib/**', '!wwwroot/lib'], { force: true });
            resolve();
        }
        catch (e) {
            console.log(e);
            reject();
        }
    });
}

function copyNodeModules() {
    var files = {
        "jquery": 'jquery/dist/**/*.{js,map,min.js,min.js.map}',
        "@popperjs": '@popperjs/core/dist/umd/**/*.js,map,min.js,min.js.map}',
        "bootstrap": 'bootstrap/dist/**/*.{js,map,min.js,min.js.map,css,min.css}'
    }

    return new Promise(function (resolve, reject) {
        try {
            for (var destinationDir in files) {
                gulp.src('node_modules/' + files[destinationDir])
                    .pipe(gulp.dest('wwwroot/lib/' + destinationDir));
            }

            resolve();
        }
        catch (e) {
            console.log(e);
            reject();
        }
    });
}

function defaultTask() {
    return new Promise(function (resolve, reject) {
        try {
            var tasks = gulp.series(clean, copyNodeModules);
            tasks();
            resolve();
        }
        catch (e) {
            console.log(e);
            reject();
        }
    });
}

export { clean, copyNodeModules, defaultTask as default }; 