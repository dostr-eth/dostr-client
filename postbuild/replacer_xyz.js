const replace = require('replace-in-file')
const optionsCss = {
  //you may need to modify the file address to suite your project
  files: './dist/spa/css/app.*.css',
  from: [/background_alpha/g],
  to: ['app/background_alpha'],
}
const optionsJs = {
  files: './dist/spa/js/*.js',
  from: [/dostr-eth.github.io\/dostr-client/g, /readme\//g],
  to: ['dostr.xyz/app', 'app/readme/'],
}
const optionsJs2 = {
  files: ['./dist/spa/js/399.*.js', './dist/spa/js/226.*.js'],
  from: [/js\/vendor/g],
  to: ['vendor'],
}
const optionsJs3 = {
  files: ['./dist/spa/js/176.*.js'],
  from: [/js\//g],
  to: [''],
}
const optionsHtml = {
  files: '../homepage/index.html',
  from: [/app.dostr.eth.limo/g, /dostr-eth.github.io\/dostr-client/g],
  to: ['dostr.xyz/app', 'dostr.xyz/app'],
};
(async function () {
  try {
    const resultsCss = await replace(optionsCss)
    console.log('Replacement results in CSS:', resultsCss)
  } catch (error) {
    console.error('Error occurred in CSS replacement:', error)
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
  try {
    const resultsJs3 = await replace(optionsJs3)
    console.log('Replacement results in JS3:', resultsJs3)
  } catch (error) {
    console.error('Error occurred in JS3 replacement:', error)
  }
  try {
    const resultsHtml = await replace(optionsHtml)
    console.log('Replacement results in HTML:', resultsHtml)
  } catch (error) {
    console.error('Error occurred in HTML replacement:', error)
  }
})()
