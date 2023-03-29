const DotenvWebpackPlugin = require('dotenv-webpack')

module.exports = {
  mode: 'production',
  plugins: [
    new DotenvWebpackPlugin()
  ]
}
