/**
 * 画板
 */
export default class Draw {
    constructor() {
        this.painting = false;
        // this.canvas = wx.createCanvas()
        this.canvas = document.querySelector('#draw-container');
        this.ctx = this.canvas.getContext("2d");
        this.addEvent('touchstart', this.touchStart.bind(this));
        this.addEvent('touchmove', this.touchMove.bind(this));
        this.addEvent('touchend', this.touchEnd.bind(this));
    }
    addEvent(event, callback) {
        this.canvas.addEventListener(event, callback);
    }
    /**
     * 接触屏幕
     * @param e
     */
    touchStart(e) {
        this.painting = true;
        this.startPoint = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
    }
    /**
     * 开始画线
     * @param e
     */
    touchMove(e) {
        const point = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
        if (this.painting) {
            this.drawLine(this.startPoint, point);
            this.startPoint = point
        }
    }
    /**
     * 离开屏幕
     * @param e
     */
    touchEnd(e) {
        this.painting = false;
        this.startPoint = undefined;
    }
    /**
     * 画线方法
     * @param startPoint
     * @param point
     */
    drawLine(startPoint, point) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        //起始位置
        this.ctx.moveTo(startPoint.x, startPoint.y);
        //停止位置
        this.ctx.lineTo(point.x, point.y);
        //描绘线路
        this.ctx.stroke();
        //结束绘制
        this.ctx.closePath();
    }
}
