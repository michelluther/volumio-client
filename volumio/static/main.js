var socket = io('http://192.168.56.47');

socket.on('connect', function(){
    alert('hey there');
});

socket.on('connect_error', (error) => {
    alert('neeeiiin')
})

socket.emit('listPlaylist')
socket.on('pushListPlaylist', playLists => {
    
})