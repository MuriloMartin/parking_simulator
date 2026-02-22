export default class Wheel{
    constructor(ctx) {
        this.ctx = ctx
        this.x = 480
        this.y = 615
        this.absVelocity = 0
        this.pixelToMetersRatio = 10
        this.lastUpdateTime = new Date().getTime()
        this.steeringAngle = 0
        this.heading = 0
        this.wheelbase = 2.5
        this.scalarSpeed = 0

    }

    update(time, keys) {
        //seconds
        const step = (time - this.lastUpdateTime) / 1000
        let engineAcceleration = 0
        let brakeAcceleration = 0
        let steeringRate = 0
        let dragCoeficient = 0.2

        if (keys.includes('w')) {
            engineAcceleration = 10 // m/s²
        }

        if (keys.includes('k')) {
            brakeAcceleration = this.scalarSpeed > 0 ? 20 : 0 
        }

        if (keys.includes('ArrowLeft')) {
            steeringRate = Math.PI / 10
        }
        if (keys.includes('ArrowRight')) {
            steeringRate = -Math.PI / 10
        }

        this.steeringAngle += steeringRate * step

        if (this.steeringAngle > Math.PI / 6){
            this.steeringAngle = Math.PI / 6
        }

         if (this.steeringAngle < -Math.PI / 6){
            this.steeringAngle = -Math.PI / 6
        }

        let dragAcceleration = dragCoeficient * this.scalarSpeed

        let resultingAcceleration = engineAcceleration - brakeAcceleration - dragAcceleration
        this.scalarSpeed = this.scalarSpeed + resultingAcceleration * step

        let deltaHeading = this.scalarSpeed / this.wheelbase *  Math.tan(this.steeringAngle)
        
        this.heading += deltaHeading * step

        let vX = Math.cos(this.heading) * this.scalarSpeed
        let vY = Math.sin(this.heading) * this.scalarSpeed

        this.x = this.x + (vX * step) * this.pixelToMetersRatio
        this.y = this.y + (vY * step) * this.pixelToMetersRatio

        this.lastUpdateTime = time
    }

    render() {
        this.ctx.fillStyle = "red";
        
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 25, 0, Math.PI * 2, true)
        this.ctx.fill()
    }
}