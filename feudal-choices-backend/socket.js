var active_players = {};

module.exports = function (server) {
    var io = require('socket.io')(server);
    io.on("connection", function (socket) {
        // player has connected
        console.log("Player connected");
        active_players[socket.id] = {
            'player_name':'Player',
            'pos_x':100,
            'pos_y':100,
            'color':'black'
            };
        io.emit("active_players", active_players);
        socket.on("disconnect", function () {
            console.log("Player disconnected");
            delete active_players[socket.id];
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
        socket.on("name_change", function (data) {
            active_players[socket.id]['player_name'] = data;
            console.log(socket.id + " has changed name to " + active_players[socket.id]['player_name']);
            io.emit("active_players", active_players);
        });
    });
};

