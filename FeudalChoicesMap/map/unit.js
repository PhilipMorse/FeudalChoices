
class Unit {
    constructor(col) {
        this.col = col;
        this.draw = function (c,pos_x,pos_y) {
            c.save()
            c.beginPath()
            c.arc(pos_x, pos_y, 10, 0, Math.PI * 2, false)
            c.fillStyle = "red";
            c.fillStyle = col;
            c.fill()
            c.closePath()
            c.restore()
        };
    }
}
