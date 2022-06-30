import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";

global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    gulp: gulp,
    path: path,
    plugins: plugins
}

import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { pug } from "./gulp/tasks/pug.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { img } from "./gulp/tasks/img.js";
import * as fonts from "./gulp/tasks/fonts.js";
import { svgicons } from "./gulp/tasks/svgicons.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftb.js";

export { svgicons }

const watcher = () => {
    gulp.watch(path.watch.files, copy);
    //gulp.watch(path.watch.html, gulp.series(html, ftp)); -> загрузка на FTP сразу
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.pug, pug);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.img, img);
}

const generalTasks = gulp.parallel(copy, scss, img, html, pug, js);
const fontsTasks = gulp.series(fonts.convertOtf2Ttf, fonts.convertTtf2Woff, fonts.createFontsCSSFile);
const primaryTasks = gulp.series(fontsTasks, generalTasks);
const secondaryTasks = gulp.parallel(watcher, server);

const dev = gulp.series(reset, primaryTasks, secondaryTasks);
const build = gulp.series(reset, primaryTasks);

const deployZip = gulp.series(build, zip);
const deployFtp = gulp.series(build, ftp);

export { dev }
export { build }
export { deployZip }
export { deployFtp }

gulp.task('default', dev);

