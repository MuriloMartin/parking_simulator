export default class Wheel{
    constructor(ctx) {
        this.ctx = ctx
        this.x = 480
        this.y = 615
        this.absVelocity = 0
        this.vX = 0 // m/s
        this.vY = 0
        this.pixelToMetersRatio = 10
        this.lastUpdateTime = new Date().getTime()
        this.heading = 0
        this.steeringAngle = 0
        this.wheelbase = 0
        this.scalarSpeed = 0

    }

    update(time, keys) {
        //seconds
        const step = (time - this.lastUpdateTime) / 1000
        let engineAcceleration = 0
        let brakeAcceleration = 0
        let dragCoeficient = 0.2

        if (keys.includes('w')) {
            engineAcceleration = 10 // m/s²
        }

        if (keys.includes('k')) {
            brakeAcceleration = this.scalarSpeed > 0 ? 20 : 0 
        }


        let dragAcceleration = dragCoeficient * this.scalarSpeed

        let resultingAcceleration = engineAcceleration - brakeAcceleration - dragAcceleration
        this.scalarSpeed = this.scalarSpeed + resultingAcceleration * step

        // if (keys.includes('ArrowLeft')) {
        //     this.heading += Math.PI / 32
        // }
        // if (keys.includes('ArrowRight')) {
        //     this.heading -= Math.PI / 32  
        // }

        
        this.vX = Math.cos(this.heading) * this.scalarSpeed
        this.vY = Math.sin(this.heading) * this.scalarSpeed

        this.x = this.x + (this.vX * step) * this.pixelToMetersRatio
        this.y = this.y + (this.vY * step) * this.pixelToMetersRatio

        // this.absVelocity = this.rollingEficiency*this.absVelocity

        this.lastUpdateTime = time
    }

    render() {
        this.ctx.fillStyle = "red";
        
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 25, 0, Math.PI * 2, true)
        this.ctx.fill()
    }
}