const replace = require('replace-in-file')
const optionsJs = {
  files: './dist/spa/js/*.js',
  from: [/dostr-eth.github.io\/dostr-client/g],
  to: ['app.dostr.eth.limo'],
}
const optionsHtml = {
  files: '../homepage/index.html',
  from: [/dostr-eth.github.io\/dostr-client/g],
  to: ['app.dostr.eth.limo'],
}
const optionsHtml2 = {
  files: '../homepage/index.html',
  from: [/dostr.xyz\/app/g],
  to: ['app.dostr.eth.limo'],
};
(async function () {
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
