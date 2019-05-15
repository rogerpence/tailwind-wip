const gulp = require('gulp');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');


// Global constants for all tasks to use.  
const sourceDir = 'src';
const targetDir = 'build';

// Tailwind extractor that causes PurgeCSS to include class names
// with the special characters that Tailwind uses.
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g);
  }
};

gulp.task('copy', () => {
  return gulp
  // Look for *.ccs files the current or any child directory. 
  .src(`${sourceDir}/**/*.html`)
  .pipe(gulp.dest(`${targetDir}/`));
})

// Task: `purgecss` - remove all unused CSS selectors. 
gulp.task('purgecss', () => {  
  const purgecss = require('gulp-purgecss');
  // Array of class names to always include. 
  const whitelist = [];
  // Array of class patterns to always include. 
  const whitelistPatterns = [/^js/, /^dy/];

  return gulp
      // Look for *.ccs files the current or any child directory. 
      .src(`${sourceDir}/**/*.css`)
      // Call purgecss. 
      .pipe(purgecss({
          // Look in files for class names.
          content: [`${sourceDir}/**/*.html`,
                    `${sourceDir}/**/*.php`,                   
                    `${sourceDir}/**/*.vue`],
          //
          whitelist: whitelist,
          whitelistPatterns: whitelistPatterns,
          extractors: [
            {
              // TailwindExtractor as defined above. 
              extractor: TailwindExtractor,
              // File extensions for which to search for 
              // class names with the extractor. 
              extensions: ['html', 'vue', 'js', 'php']
            },
          ],          
       }))
      .pipe(gulp.dest(`${targetDir}/`));
});

gulp.task('buildcss', () => {
  return gulp
    .src('build/**/*.css')
    .pipe(concat('main.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/public'));
}); 

gulp.task('css', () => {
    const postcss = require('gulp-postcss');
    const tailwindcss = require('tailwindcss');
  
    return gulp
      .src('style.css')
      .pipe(postcss([
        tailwindcss('./tailwind.config.js'),
        require('autoprefixer'),
      ]))
      .pipe(rename('tailwind.css'))
      .pipe(gulp.dest('src/'));
});

gulp.task('fonts', () => {
  return gulp
        .src('src/fonts/**/*')
        .pipe(gulp.dest('dist'))
});
  
function watchFiles() {
  gulp.watch(['./style.css', './tailwind.config.js'], {}, gulp.series(['css']));
} 



gulp.task('default', gulp.series(['css', watchFiles]));  

gulp.task('build', gulp.series(['purgecss']));
