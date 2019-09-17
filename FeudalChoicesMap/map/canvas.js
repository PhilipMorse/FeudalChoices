
var ctx = null;
var tileW = 40, tileH = 40;
var mapW = 5, mapH = 5;
var currentTick = 0;
var worker;
var socket;

var gameMap = [
    0,0,0,0,1,1,0,0,0
];

window.onload = function(){
    ctx = this.document.getElementById('map').getContext('2d');
    peasant = new Peasant("blue");
    this.requestAnimationFrame(function(){colorTiles(gameMap);});
    this.requestAnimationFrame(this.drawLoop);
    this.ctx.font = 'bold 10pt sans-sherif';
    socket = io.connect('http://localhost:5000');
    socket.on('grid', function(msg){
        requestAnimationFrame(function(){colorTiles(msg);});
    });
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

function drawLoop(){
    if (ctx==null) {return;}
    peasant.draw(ctx,40,80);
    requestAnimationFrame(drawLoop);
}

document.getElementById("sendButton").addEventListener('click', function(){
    var grid_text = document.getElementById("grid_text").value;
    grid_text = grid_text.split(" ");
    console.log(grid_text);
    grid_text = grid_text.map(Number);
    console.log(grid_text);
    socket.emit('grid', grid_text);
});