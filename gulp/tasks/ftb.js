import { config } from '../config/ftp.js';
import vinylftp from "vinyl-ftp";
import util from 'gulp-util';

export const ftp = () => {
    config.log = util.log;
    const connection = vinylftp.create(config);
    return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FTP",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(connection.dest(`/${app.path.ftp}/${app.path.rootFolder}`));
}