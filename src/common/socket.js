module.exports = (io) => {
    io.on('connection' , (socket) => {
        console.log('Socket initiated!');
        socket.on('newScoreToServer' , (data) => {
            console.log('Socket: newScore');
            io.emit('newScofeToClient' , data);
        })
    })    
}