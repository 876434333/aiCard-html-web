'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // api: '"http://popular.dev.deecard.net:9001/push"'
  api: '"http://192.168.3.96:9001/push"'
})
