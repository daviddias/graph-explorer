'use strict'

const IPFS = require('./ipfs')
// const visualizer = require('./visualizer')
const concat = require('concat-stream')

document.addEventListener('DOMContentLoaded', () => {
  IPFS.create((err, node) => {
    if (err) { throw err }

    document.getElementById('visualize')
      .onclick = () => { // visualizer(node)
        const hash = document.getElementById('source').value
        node.files.cat(hash, function (err, res) {
          if (err || !res) {
            return console.error('ipfs cat error', err, res)
          }

          res.pipe(concat(function (data) {
            document.getElementById('content').innerText = data
          }))
        })
      }
  })
})
