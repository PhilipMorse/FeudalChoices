var active_players = [];

module.exports = function (server) {
    var io = require('socket.io')(server);
    io.on("connection", function (socket) {
        // player has connected
        console.log("Player connected");
        active_players.push(socket.id);
        io.emit("active_players", active_players);
        socket.on("disconnect", function () {
            console.log("Player disconnected");
            var index = active_players.indexOf(socket.id);
            if (index > -1) {
                active_players.splice(index, 1);
            }
            io.emit("active_players", active_players);
        });
        socket.on("send message", function (data) {
            io.emit("new message", data);
        });
        socket.on("grid", function (data) {
            io.emit("grid", data);
        });
        socket.on("units", function (data) {
            io.emit("units", socket.id);
        });
        socket.on("active_players", function (data) {
            io.emit("active_players", active_players);
        });
    });
};