import * as math from 'https://cdn.jsdelivr.net/npm/mathjs@11.8.0/+esm';


class Car {

    constructor(center_mass_pos_x, center_mass_pos_y, heading, velocity_x, velocity_y, ctx) {
      this.ctx = ctx
      this.velocity_x = velocity_x 
      this.velocity_y = velocity_y
      this.width = 30
      this.length = 50
      this.heading = heading  
      this.center_mass_pos_x = center_mass_pos_x;
      this.center_mass_pos_y = center_mass_pos_y;
    }
  
    // throttle(throttle_percentage) {
    //     this.velocity_x = 
    // }

    steer(degrees) {
        const radians = (Math.PI / 180) * degrees
        this.heading += radians
    }

    render() {
        this.ctx.strokeStyle = "red";
        const main_vector =  math.matrix([this.length/2, 0]);
        const center_pos = math.matrix([this.center_mass_pos_x, this.center_mass_pos_y])
        
        const rotate_matrix = math.matrix([[math.cos(this.heading), -math.sin(this.heading)],[math.sin(this.heading), math.cos(this.heading)]])
        
        // Multiplication
        const productMatrix = math.multiply(rotate_matrix, main_vector);
        const result = math.add(center_pos, productMatrix)
        this.ctx.beginPath();
        this.ctx.moveTo(this.center_mass_pos_x, this.center_mass_pos_y);
        this.ctx.lineTo(result._data[0], result._data[1])
        this.ctx.stroke()
    }
  
  
  }
  



  
export default Car;