import svg from "gulp-svg-sprite";

export const svgicons = () => {
    return app.gulp.src(app.path.src.svgicons)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SVG",
                message: "Error: <%=error.message %>"
            })
        ))
        .pipe(svg({
            mode: {
                stack: {
                    sprite: `../icons/icons.svg`,
                    example: true
                }
            }
        }))
        .pipe(app.gulp.dest(app.path.build.img))
}