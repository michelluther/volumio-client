
const socket = require('socket.io-client')

const webSocket =  socket('http://192.168.56.47');

webSocket.on('connect', () => {
    console.log('hjeeeeey')
});
webSocket.emit('getState', '')
webSocket.on('pushState', (data) => {
    console.log(data);
})

webSocket.emit('listPlaylist')
webSocket.on('pushListPlaylist', playLists => {
    webSocket.emit('clearQueue')
    webSocket.emit('playPlaylist', {
        name: playLists[0]
    });
    webSocket.on('pushPlayPlaylist', result => {
        console.log(result)
    })
    // webSocket.emit('play')
})