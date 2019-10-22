const socket = require('socket.io-client')

const createClient = () => {
  const volumioClient = {       
    connected: false,
    webSocket: undefined,

    connect: (volumioURL) => {
      return new Promise((resolve, reject) => {
        this.webSocket = socket('http://192.168.56.47')
        
        this.webSocket.on('connect', () => {
          this.connected = true
          this.webSocket.emit('getState')
          this.webSocket.on('pushState', (state) => {
            console.log(state)
            this.emit('statusUpdate', state)
          })
          resolve()
        })

        this.webSocket.on('connect_error', (error) => {
          this.connected = false
          reject(error)
        })
      })
    },

    start: () => {
      this.webSocket.emit('start')
    },
    stop: () => {
      this.webSocket.emit('stop')
    },

    getPlayLists: () => {
      return new Promise((resolve, reject) => {
        this.webSocket.emit('listPlaylist');
        this.webSocket.on('pushListPlaylist', playLists => {
          resolve(playLists)
        })
      })
    },

    playPlayList: playListName => {
      this.webSocket.emit('playPlaylist', {
        name: playListName
      })
    },

    playWebRadio: uri => {
      this.webSocket.emit('clearQueue')
      this.webSocket.emit('addPlay', {
        service: 'webradio', uri: uri
        // service: 'webradio', uri: 'http://streamtdy.ir-media-tec.com/live/mp3-128/tunein_web_mp3'
      })
      this.webSocket.emit('play')
    }
  }

  volumioClient.prototype = require('events').EventEmitter.prototype
}

module.exports = createClient
