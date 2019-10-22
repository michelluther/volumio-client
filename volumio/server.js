const express = require('express')
const socket = require('socket.io-client')
const file = require('fs')

const app = express()
const webSocket = socket('http://192.168.56.47')

const mappingsFilePath = `${__dirname}/data/smartCardMappings.json`

app.use(express.static('volumio/static'))
app.use(express.static(`${__dirname}/../node_modules/socket.io-client/dist`))

app.get('/playLists', (req, res) => {
  webSocket.emit('listPlaylist')
  webSocket.on('pushListPlaylist', playLists => {
    res.send(playLists)
  // webSocket.emit('play')
  })
})

app.get('/smartCardMappings', (req, res) => {
  const smartCardMappings = require(mappingsFilePath)
  res.send(smartCardMappings)
})

app.delete('/smartCardMappings/:id', (req, res) => {
  let smartCardMappings = require(mappingsFilePath)
  smartCardMappings = smartCardMappings.filter(mapping => {
    return req.params.id === mapping.smartCardID
  })
  file.writeFileSync(mappingsFilePath, JSON.stringify(smartCardMappings))
})



app.listen('3000', () => console.log('application started'));