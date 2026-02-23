import Car from './car.js'
import Input from './input.js';



function main() {
    let time = new Date().getTime()
    ctx_game.clearRect(0,0,game.width, game.height)
    car.update(time, input.keys)
    car.render()
    window.requestAnimationFrame(main);
}



const game = document.getElementById("game-layer")
const ctx_game = game.getContext("2d");
const car = new Car(ctx_game);
const input = new Input()
main()


