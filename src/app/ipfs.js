function create (callback) {
  const IPFS = require('ipfs')

  const repoPath = String(Math.random())
  const node = new IPFS(repoPath)

  node.init({ emptyRepo: true, bits: 2048 }, (err) => {
    if (err) { return callback(err) }

    node.config.get((err, config) => {
      if (err) {
        return callback(err)
      }

      config.Addresses = {
        Swarm: [
          `/libp2p-webrtc-star/ip4/188.166.203.82/tcp/20000/ws/ipfs/${config.Identity.PeerID}`
        ],
        API: '',
        Gateway: ''
      }

      config.Discovery.MDNS.Enabled = false

      node.config.replace(config, (err) => {
        if (err) { return callback(err) }

        node.load((err) => {
          if (err) { return callback(err) }
          node.goOnline((err) => {
            if (err) { return callback(err) }
            console.log('IPFS node is ready')
            callback(null, node)
          })
        })
      })
    })
  })
}

module.exports = {
  create: create
}
