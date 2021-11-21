const { src, dest, watch, parallel } = require("gulp");

// Sass
const sass = require("gulp-sass")(require("sass"));

//Imagen
const avif = require("gulp-avif");
const webp = require("gulp-webp");
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");

//Funciones
function compileSass(done) {
  src("./src/sass/**/*.scss").pipe(sass()).pipe(dest("build/css"));
  done();
}

function convertAvif(done) {
  const opciones = {
    quality: 50,
  };
  src("./src/img/**/*.{jpg,png}").pipe(avif(opciones)).pipe(dest("build/img"));
  done();
}

function convertWebp(done) {
  const opciones = {
    quality: 50,
  };
  src("./src/img/**/*.{jpg,png}").pipe(webp(opciones)).pipe(dest("build/img"));
  done();
}

function convertPng(done) {
  const opciones = {
    optimizationLevel: 3,
  };
  src("./src/img/**/*.{jpg,png}")
    .pipe(cache(imagemin(opciones)))
    .pipe(dest("build/img"));
  done();
}

function watchFiles() {
  watch("./src/sass/**/*.scss", compileSass);
}

exports.sass = parallel(compileSass, watchFiles);
exports.convert = parallel(convertAvif, convertWebp, convertPng);
