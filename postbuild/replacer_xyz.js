const replace = require('replace-in-file')
const optionsCss = {
  //you may need to modify the file address to suite your project
  files: './dist/spa/css/app.*.css',
  from: [/background_alpha/g],
  to: ['app/background_alpha'],
}
const optionsJs = {
  files: './dist/spa/js/*.js',
  from: [/dostr-eth.github.io\/dostr-client/g],
  to: ['dostr.xyz/app'],
}
const optionsHtml = {
  files: '../homepage/index.html',
  from: [/dostr-eth.github.io\/dostr-client/g],
  to: ['dostr.xyz/app'],
}
const optionsHtml2 = {
  files: '../homepage/index.html',
  from: [/app.dostr.eth.limo/g],
  to: ['dostr.xyz/app'],
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
    const resultsHtml = await replace(optionsHtml)
    console.log('Replacement results in HTML:', resultsHtml)
  } catch (error) {
    console.error('Error occurred in HTML replacement:', error)
  }
  try {
    const resultsHtml2 = await replace(optionsHtml2)
    console.log('Replacement results in HTML:', resultsHtml2)
  } catch (error) {
    console.error('Error occurred in HTML replacement:', error)
  }
})()
