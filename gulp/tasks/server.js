export const server = (done) => {
    app.plugins.browser.init({
        server: {
            baseDir: `${app.path.build.html}`
        },
        notify: false,
        port: 3000
    });
}