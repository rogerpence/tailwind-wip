const extensions = ['html', 'vue', 'js', 'php'];
const sourceDir = 'src';

const contentExtensions = extensions.map((ele)=> `${sourceDir}/**/*.${ele}`);

console.log(contentExtensions);

// Generates this:
[ "src/**/*.html", "src/**/*.vue", "src/**/*.js", "src/**/*.php" ]



// // Look in files for class names.
//      content: [`${sourceDir}/**/*.html`,
//      `${sourceDir}/**/*.php`,                   
//      `${sourceDir}/**/*.vue`],
// //
// whitelist: whitelist,
// whitelistPatterns: whitelistPatterns,
// extractors: [
// {
// // TailwindExtractor as defined above. 
// extractor: TailwindExtractor,
// // File extensions for which to search for 
// // class names with the extractor. 
// extensions: ['html', 'vue', 'js', 'php']
// },