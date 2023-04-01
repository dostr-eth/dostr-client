const replace = require('replace-in-file')
const options = {
  files: './dist/spa/css/app.*.css',
  from: [/background_alpha/g],
  to: ['dostr-client/background_alpha'],
};
(async function () {
  try {
    const results = await replace(options)
    console.log('Replacement results:', results)
  } catch (error) {
    console.error('Error occurred:', error)
  }
})()
