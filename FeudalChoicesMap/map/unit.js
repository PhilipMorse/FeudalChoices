
class Unit {
    constructor() {
        this.draw = function (ctx,owner,pos_x,pos_y,col) {
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = String(col); 
            ctx.arc(pos_x, pos_y, 10, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.closePath();
            ctx.font = "bold 10pt sans-sherif";
            ctx.textAlign = "center";
            ctx.fillText(owner, pos_x, pos_y-12);
            ctx.restore();
        };
    }
}
