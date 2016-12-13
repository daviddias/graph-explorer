'use strict'

const IPFS = require('./ipfs')
const visualizer = require('./visualizer')

document.addEventListener('DOMContentLoaded', () => {
  IPFS.create((err, node) => {
    if (err) { throw err }

    document.getElementById('visualize')
      .onclick = visualizer(node)
  })
})
