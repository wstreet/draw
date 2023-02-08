import { Point } from "./type"
/**
 * 画板
 */
export default class Draw {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private startPoint: Point | undefined
    private painting: Boolean = false
    
    constructor() {
        // this.canvas = wx.createCanvas()
        this.canvas = document.querySelector('#draw-container') as HTMLCanvasElement
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

        this.addEvent('touchstart', this.touchStart.bind(this))
        this.addEvent('touchmove', this.touchMove.bind(this))
        this.addEvent('touchend', this.touchEnd.bind(this))
    }

    private addEvent(event: string, callback: any) {
        this.canvas.addEventListener(event, callback)
    }
    /**
     * 接触屏幕
     * @param e 
     */
    private touchStart(e: TouchEvent) {
        this.painting = true
        this.startPoint = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        }
    }
    /**
     * 开始画线
     * @param e 
     */
    private touchMove(e: TouchEvent) {
        const point = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        }
        if (this.painting) {
            this.drawLine(this.startPoint!, point)
        }
       
    }
    /**
     * 离开屏幕
     * @param e 
     */
    private touchEnd(e: TouchEvent) {
        this.painting = false
        this.startPoint = undefined
    }
    /**
     * 画线方法
     * @param startPoint 
     * @param point 
     */
    private drawLine(startPoint: Point, point: Point) {
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
    /**
     * 清除画布
     */
    public clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
    
}