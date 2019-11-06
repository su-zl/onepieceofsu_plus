class Ball {
    constructor(x, y, radius, color) {
        this.x = x || 0;
        this.y = y || 0;
        this.vx = 0;
        this.vy = 0;
        this.sx = 1;
        this.sy = 1;
        this.radius = radius || 10;
        this.color = color || 'black';
    }
    draw(ctx,type) {
        if (['fill', 'stroke'].indexOf(type) == -1) {
            throw ('ball.draw need a right type');
        }
        ctx.save();
        // ctx.translate(this.x, this.y);
        // ctx.scale(this.sx, this.sy);
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 360 * Math.PI / 180);
        ctx.closePath();
        type === 'fill' ? ctx.fill() : ctx.stroke();
        ctx.restore();
    }
}
export default  Ball;