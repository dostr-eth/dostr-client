const replace = require('replace-in-file')
const optionsCss = {
  files: './dist/spa/css/app.*.css',
  from: [/background_alpha/g],
  to: ['dostr-client/background_alpha'],
}
const optionsJs = {
  files: ['./dist/spa/js/399.*.js', './dist/spa/js/226.*.js'],
  from: [/js\/vendor/g],
  to: ['vendor'],
}
const optionsJs2 = {
  files: ['./dist/spa/js/176.*.js'],
  from: [/js\//g],
  to: [''],
};
(async function () {
  try {
    const resultsCss = await replace(optionsCss)
    console.log('Replacement results:', resultsCss)
  } catch (error) {
    console.error('Error occurred:', error)
  }
  try {
    const resultsJs = await replace(optionsJs)
    console.log('Replacement results in JS:', resultsJs)
  } catch (error) {
    console.error('Error occurred in JS replacement:', error)
  }
  try {
    const resultsJs2 = await replace(optionsJs2)
    console.log('Replacement results in JS2:', resultsJs2)
  } catch (error) {
    console.error('Error occurred in JS2 replacement:', error)
  }
})()
