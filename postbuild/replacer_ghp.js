const replace = require('replace-in-file')
const options = {
  //you may need to modify the file address to suite your project
  files: './dist/spa/css/app.*.css',
  from: [/background_alpha/g],
  to: ['dostr-client/background_alpha'],
}
;(async function () {
  try {
    const results = await replace(options)
    console.log('Replacement results:', results)
  } catch (error) {
    console.error('Error occurred:', error)
  }
})()
