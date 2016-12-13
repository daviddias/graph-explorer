'use strict'

const IPFS = require('./ipfs')
const visualizer = require('./visualizer')
const ipldDagPb = require('ipld-dag-pb')

document.addEventListener('DOMContentLoaded', () => {
  IPFS.create((err, node) => {
    if (err) { throw err }

    const resolver = (hash, callback) => {
      node.block.get(hash, (err, blockRes) => {
        if (err) { callback(err) }
        ipldDagPb.resolver.tree(blockRes, (err, resolverRes) => {
          if (err) { callback(err) }
          callback(null, resolverRes.map((child) => {
            return {
              name: child.path,
              value: child.value,
              _children: child.path.indexOf('.') !== -1 ? undefined : []
            }
          }))
        })
      })
    }

    const $source = document.getElementById('source')

    resolver('QmSiwkG4LxQcXKTfEgc8XcNXpq1krzXXF2afdiC3Lduhjb', (err, res) => {
      if (err) { throw err }
      const rootBlock = {name: 'Root', children: res}
      visualizer(node, resolver, rootBlock)
    })

    document.getElementById('visualize').onclick = () => {
      console.log($source.value)
      resolver($source.value, (err, res) => {
        if (err) { throw err }
        const rootBlock = {name: 'Root', children: res}
        visualizer(node, resolver, rootBlock)
      })
    }

    $source.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        console.log(e.target.value)
        resolver(e.target.value, (err, res) => {
          if (err) { throw err }
          const rootBlock = {name: 'Root', children: res}
          visualizer(node, resolver, rootBlock)
        })
      }
    })
  })
})
