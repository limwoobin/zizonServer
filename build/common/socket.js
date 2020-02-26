'use strict';

module.exports = function (io) {
    io.on('connection', function (socket) {
        console.log('Socket initiated!');
        socket.on('newScoreToServer', function (data) {
            console.log('Socket: newScore');
            io.emit('newScofeToClient', data);
        });
    });
};