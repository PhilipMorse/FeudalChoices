

module.exports = function(server){
    var io = require('socket.io')(server);
    io.on("connection", function(socket) {
        // player has connected
        console.log("Player connected");

        socket.on("disconnect", function() {
            console.log("Player disconnected");
        });

        socket.on("send message", function(data) {
            io.emit("new message", data);
        });
    });
};