const gulp = require('gulp');
const path = require('path');
const del = require('del');

const targetBasePath = path.join(__dirname, '../client_packages/deft/apps/background');

gulp.task('clean-target', function() {
    const folderBlob = path.join(targetBasePath, '**');
    const exclude = '!' + targetBasePath;
    return del([folderBlob, exclude], { force: true });
});

gulp.task('move-dist', [], function() {
    console.log("Moving dist folder to Deft client_packages");
    return gulp.src("dist/**.*")
        .pipe(gulp.dest(targetBasePath));
});

gulp.task('default', ['clean-target', 'move-dist']);