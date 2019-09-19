
var ctx = null;
var tileW = 40, tileH = 40;
var mapW = 5, mapH = 5;
var currentTick = 0;
var socket;
var players = {};

var gameMap = [
    0,0,0,0,1,1,0,0,0
];

window.onload = function(){
    ctx = this.document.getElementById('map').getContext('2d');
    try{
        socket = io.connect('http://localhost:5000');
        socket.on('grid', function(msg){
            requestAnimationFrame(function(){colorTiles(msg);});
            this.requestAnimationFrame(this.drawUnits);
        });
        socket.on('active_players', function(msg){
            players = msg;
            var str = '<ul>';
            console.log(msg);
            for (var val in msg){
                str += '<li>' + msg[val]['player_name'] + '</li>';
            }

            str += '</ul>';
            document.getElementById("active_players_div").innerHTML = str;
            requestAnimationFrame(drawUnits);
        });
        socket.on('units', function(msg){
            requestAnimationFrame(drawUnits);
        });
    }
    catch(err){
        console.log(err);
    };
    this.requestAnimationFrame(function(){colorTiles(gameMap);});
    this.loadButtons();
};

function colorTiles(game_map){
    if (ctx==null) {return;}
    
    var sec = Math.floor(Date.now()/1000);
    if (sec!=currentTick){
        currentTick = sec;
        document.getElementById('currentTick').innerHTML = String(currentTick);
    }
    
    for(var y = 0; y <mapH; y++){
        for (var x = 0; x < mapW; x++) {
            switch (parseInt(game_map[((y*mapW)+x)])) {
                case 0:
                    ctx.fillStyle= "#999999";
                    break;
            
                default:
                    ctx.fillStyle= "#eeeeee";
                    break;
            }

            ctx.fillRect(x*tileW, y*tileH, tileW, tileH);
        }
    }

}

function drawUnits(){
    if (ctx==null) {return;}
    console.log('here');
    for (var val in players){
        console.log(players[val]);
        var temp_unit = new Unit();
        temp_unit.draw(ctx, players[val]['player_name'], players[val]['pos_x'], players[val]['pos_y'], players[val]['color']);
    }
}

function loadButtons(){
    document.getElementById("sendButton").addEventListener('click', function(){
        var grid_text = document.getElementById("grid_text").value;
        grid_text = grid_text.split(" ");
        console.log(grid_text);
        grid_text = grid_text.map(Number);
        console.log(grid_text);
        socket.emit('grid', grid_text);
    });

    document.getElementById("channel_send").addEventListener('click', function(){
        var channel = document.getElementById("channel").value;
        socket.on(channel, function(msg){
            document.getElementById('channel_return').innerHTML = msg;
        });
        var channel_input = document.getElementById("channel_input").value;
        socket.emit(channel, channel_input);
    });

}
