
var ctx = null;
var tileW = 40, tileH = 40;
var mapW = 10, mapH = 10;
var currentTick = 0;

var gameMap = [
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,1,0,0,0,0,0,
    0,0,0,0,1,0,0,0,0,0,
    0,0,0,0,1,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0
];

window.onload = function(){
    ctx = this.document.getElementById('map').getContext('2d');
    this.requestAnimationFrame(colorTiles);
    this.requestAnimationFrame(this.drawGrid);
    this.ctx.font = 'bold 10pt sans-sherif';
};

function drawGrid(){
    if (ctx==null) {return;}
    
    for (var x = tileW; x < (tileW*mapW) ; x += tileW) {
        ctx.moveTo(0.5 + x, 0);
        ctx.lineTo(0.5 + x, (tileW*mapW));
    }

    for (var x = tileH; x < (tileH*mapH); x += tileH) {
        ctx.moveTo(0, 0.5 + x);
        ctx.lineTo((tileH*mapH), 0.5 + x);
    }

    ctx.strokeStyle = "black";
    ctx.stroke();
    requestAnimationFrame(drawGrid);
}

function colorTiles(){
    if (ctx==null) {return;}
    
    var sec = Math.floor(Date.now()/1000);
    if (sec!=currentTick){
        currentTick = sec;
        document.getElementById('currentTick').innerHTML = String(currentTick);
    }
    
    for(var y = 0; y <mapH; y++){
        for (var x = 0; x < mapW; x++) {
            switch (gameMap[((y*mapW)+x)]) {
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

    requestAnimationFrame(colorTiles);
}