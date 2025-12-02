import Car from './car.js'

const game = document.getElementById("game-layer")

const ctx_game = game.getContext("2d");

const car = new Car(300, 300, 0, 0, 0, null);







function draw() {
    
    ctx_game.clearRect(0,0,game.width, game.height)
    
    car.render()

    window.requestAnimationFrame(draw);
  }


function main() {
    window.requestAnimationFrame(draw);
}

document.addEventListener("keydown", (key)=>{
    new_y = 0
    new_heading = 0

    if (key.key == 'ArrowRight'){
        car.steer(25)
    }
    if (key.key == 'ArrowLeft'){
        car.steer(-25)
    }
    
})

main()


