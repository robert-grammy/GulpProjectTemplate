import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import cleancss from "gulp-clean-css";
import webpcss from "gulp-webpcss";
import autoprefixer from "gulp-autoprefixer";
import groupcss from "gulp-group-css-media-queries";

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, {sourcemaps: app.isDev})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "CSCC",
                message: "Error: <%=error.message %>"
            })
        ))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(
            app.plugins.if(
                app.isBuild,
                groupcss()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpcss({
                    webpClass: ".webp",
                    noWebpClass: ".no-webp"
                })
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoprefixer({
                    grid: true,
                    overrideBrowserlist: ["last 3 versions"],
                    cascade: true
                })
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleancss({
                    level: 2,
                    format: 'beautify'
                })
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                app.gulp.dest(app.path.build.css)
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleancss({
                    level: 2,
                    format: false
                })
            )
        )
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browser.stream());
}