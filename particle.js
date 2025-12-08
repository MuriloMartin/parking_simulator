export default class Particle{
    constructor(ctx) {
        this.ctx = ctx
        this.x = 480
        this.y = 615
        this.vX = 0 // m/s
        this.vY = 0
        this.rollingEficiency = 0.98
        this.pixelToMetersRatio = 10
        this.last_update_time = new Date().getTime()
    }

    update(time, keys) {
        //seconds
        const step = (time - this.last_update_time) / 1000
        this.x = this.x + (this.vX * step) * this.pixelToMetersRatio
        this.vX = this.rollingEficiency*this.vX

        if (keys.includes('w')) {
            this.vX += 2.5
        }
        if (keys.includes('s')) {
            this.vX -= 2.5    
        }

        this.last_update_time = time
    }

    render() {
        this.ctx.fillStyle = "red";
        
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 25, 0, Math.PI * 2, true)
        this.ctx.fill()
    }
}