import * as nodePath from "path";

const rootFolder = nodePath.basename(nodePath.resolve());
const buildFolder = "./dist";
const srcFolder = "./src";

export const path = {
    build: {
        files: `${buildFolder}/files/`,
        html: `${buildFolder}/`,
        css: `${buildFolder}/css/`,
        js: `${buildFolder}/js/`,
        img: `${buildFolder}/img/`,
        fonts: `${buildFolder}/fonts/`
    },
    src: {
        files: `${srcFolder}/files/**/*.*`,
        html: `${srcFolder}/*.html`,
        pug: `${srcFolder}/*.pug`,
        scss: `${srcFolder}/scss/style.scss`,
        js: `${srcFolder}/js/app.js`,
        img: `${srcFolder}/img/**/*.{png,jpg,jpeg,gif,webp}`,
        svg: `${srcFolder}/img/**/*.svg`,
        svgicons: `${srcFolder}/svgicons/*.svg`
    },
    watch: {
        files: `${srcFolder}/files/**/*.*`,
        html: `${srcFolder}/**/*.html`,
        pug: `${srcFolder}/**/*.pug`,
        scss: `${srcFolder}/scss/**/*.scss`,
        js: `${srcFolder}/**/*.js`,
        img: `${srcFolder}/img/**/*.{png,jpg,jpeg,gif,webp,ico,svg}`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: "dest"
}