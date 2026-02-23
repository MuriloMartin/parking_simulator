export default class Car{
    constructor(ctx) {
        this.ctx = ctx
        this.x = 480
        this.y = 615
        this.pixelToMetersRatio = 10
        this.lastUpdateTime = new Date().getTime()
        this.steeringAngle = 0
        this.heading = 0
        this.wheelbase = 2.5
        this.scalarSpeed = 0
        this.betweenAxis = 3 * this.pixelToMetersRatio
    }

            // Self centering
    update(time, keys) {
        const step = (time - this.lastUpdateTime) / 1000
        if (step <= 0) return

        // --- CONSTANTS ---
        const engineForce = 20          // m/s²
        const brakeForce = 35          // m/s²
        const maxSteering = Math.PI/6
        const steeringSpeed = Math.PI  // how fast wheels turn
        const steeringReturn = Math.PI * 0.6
        const rollingResistance = 0.8
        const dragCoefficient = 0.2

        // --- INPUT ---
        let acceleration = 0

        if (keys.includes('w')) {
            acceleration += engineForce
        }

        if (keys.includes('s')) {
            acceleration -= engineForce
        }

        if (keys.includes('spacebar')) {
            if (this.scalarSpeed > 0) acceleration -= brakeForce
            if (this.scalarSpeed < 0) acceleration += brakeForce
        }

        // --- RESISTANCE ---
        const drag = dragCoefficient * this.scalarSpeed * Math.abs(this.scalarSpeed)
        const rolling = rollingResistance * this.scalarSpeed

        acceleration -= drag
        acceleration -= rolling

        // --- SPEED UPDATE ---
        this.scalarSpeed += acceleration * step



        if (keys.includes('ArrowLeft')) {
            this.steeringAngle += steeringSpeed * step
        } 
        else if (keys.includes('ArrowRight')) {
            this.steeringAngle -= steeringSpeed * step
        } 
        else {
            if (this.steeringAngle > 0) {
                this.steeringAngle -= steeringReturn * step
                if (this.steeringAngle < 0) this.steeringAngle = 0
            } else if (this.steeringAngle < 0) {
                this.steeringAngle += steeringReturn * step
                if (this.steeringAngle > 0) this.steeringAngle = 0
            }
        }

        this.steeringAngle = Math.max(
            -maxSteering,
            Math.min(maxSteering, this.steeringAngle)
        )

        if (Math.abs(this.scalarSpeed) > 0.1) {
            const angularVelocity =
                (this.scalarSpeed / this.wheelbase) *
                Math.tan(this.steeringAngle)

            this.heading += angularVelocity * step
        }

        // --- POSITION UPDATE ---
        const vX = Math.cos(this.heading) * this.scalarSpeed
        const vY = Math.sin(this.heading) * this.scalarSpeed

        this.x += vX * step 
        this.y += vY * step
        this.lastUpdateTime = time
    }

    render() {
    const rearAxisX = this.x
    const rearAxisY = this.y

    const frontAxisX = this.x + this.betweenAxis * Math.cos(this.heading)
    const frontAxisY = this.y + this.betweenAxis * Math.sin(this.heading)

    // --- draw axle points (debug) ---
    this.ctx.fillStyle = "black"
    this.ctx.beginPath()
    this.ctx.arc(rearAxisX, rearAxisY, 3, 0, Math.PI * 2)
    this.ctx.arc(frontAxisX, frontAxisY, 3, 0, Math.PI * 2)
    this.ctx.fill()

    const carLength = this.betweenAxis + 1 * this.pixelToMetersRatio

    const centerX = rearAxisX + (this.wheelbase * this.pixelToMetersRatio / 2) * Math.cos(this.heading)
    const centerY = rearAxisY + (this.wheelbase * this.pixelToMetersRatio / 2) * Math.sin(this.heading)

    this.ctx.arc(centerX, centerY, 3, 0, Math.PI * 2)
    this.ctx.fill()

    this.ctx.save()

    // // Move origin to car center
    // this.ctx.translate(centerX, centerY)

    // // Rotate canvas
    // this.ctx.rotate(this.heading)

    // // Draw rectangle centered at origin
    // this.ctx.fillStyle = "rgba(0, 0, 0, 0.4)"
    // this.ctx.fillRect(
    //     -carLength / 2,
    //     -carWidth / 2,
    //     carLength,
    //     carWidth
    // )

    // this.ctx.restore()
}
}