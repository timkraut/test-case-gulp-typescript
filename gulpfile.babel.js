const gulp = require('gulp')
const typeScript = require('gulp-typescript')
const rename = require('gulp-rename');
const rollup = require('gulp-rollup');

function compileTypeScript() {
  const typeScriptProject = typeScript.createProject('tsconfig.extending.json')

  const typeScriptResult = gulp
    .src('src/**/*.ts')
    .pipe(typeScriptProject())

  typeScriptResult.dts.pipe(gulp.dest('bundles/'))
  typeScriptResult.js.pipe(gulp.dest('bundles/'))

  return typeScriptResult.js
}

const rollupConfig = {
  entry: './bundles/index.js',
  format: 'umd',
  sourceMap: true,
}

function build() {
  const compiledJsFiles = compileTypeScript(false)

  return compiledJsFiles
    .pipe(rollup(rollupConfig))
    .pipe(rename('bundle.umd.js'))
    .pipe(gulp.dest('bundles/'))
}

gulp.task(build)
