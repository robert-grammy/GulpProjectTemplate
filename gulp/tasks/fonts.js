import fs, { appendFile } from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const convertOtf2Ttf = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/**/*.otf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS (OTF -> TTF)",
                message: "Error: <%=error.message %>"
            })
        ))
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const convertTtf2Woff = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/**/*.ttf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS (TTF -> WOFF)",
                message: "Error: <%=error.message %>"
            })
        ))
        .pipe(fonter({
            formats: ['woff']
        }))
        .pipe(app.gulp.dest(app.path.build.fonts))
        .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/**/*.ttf`, {}))
        .pipe(ttf2woff2())
        .pipe(app.gulp.dest(app.path.build.fonts))
}

export const createFontsCSSFile = () => {
    let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
    let dir = app.path.build.fonts;
    fs.readdir(dir, function (err, fontsFiles) {
        if (!fs.existsSync(fontsFile)) {
            fs.writeFile(fontsFile, '', cb);
            write(fontsFiles, dir);
        } else {
            console.log("Файл scss/fonts.scss уже существует. Для обновления его нужно удалить!");
        }
    });
    
    return app.gulp.src(app.path.srcFolder);
    
    function cb() {}

    function write(fontsFiles, dir) {
        let newFileOnly;
        for (var i=0; i<fontsFiles.length; i++) {
            let path = dir + fontsFiles[i] + "/";
            if (!fontsFiles[i].toLowerCase().endsWith(".woff") && !fontsFiles[i].toLowerCase().endsWith(".woff2")) {
                fs.readdir(dir + fontsFiles[i], function (err, newFontsFiles) {
                    write(newFontsFiles, path);
                });
            } else {
                let fontFileName = fontsFiles[i].split('.')[0];
                if (newFileOnly !== fontFileName) {
                    let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                    let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                    let weight = 400;
                    let mode = "normal";
                    fontWeight = fontWeight.toLowerCase();
                    if (fontWeight.includes("italic")) {
                        mode = "italic";
                        fontWeight = fontWeight.replace("italic", '');
                    }
                    switch (fontWeight) {
                        case "thin": weight = 100; break;
                        case "extralight": weight = 200; break; 
                        case "light": weight = 300; break; 
                        case "medium": weight = 500; break; 
                        case "semibold": weight = 600; break; 
                        case "bold": weight = 700; break; 
                        case "extrabold": weight = 800; break; 
                        case "black": weight = 900; break;  
                    }
                    let fontDir = dir.length<=13 ? "" : dir.slice(13);
                    fs.appendFile(fontsFile, `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontDir}${fontFileName}.woff2") format("woff2"), url("../fonts/${fontDir}${fontFileName}.woff") format("woff");\n\tfont-weight: ${weight};\n\tfont-style: ${mode};\n}\r\n`, cb);
                    newFileOnly = fontFileName;
                }
            }
        }
    }

}