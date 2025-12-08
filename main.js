import Car from './car.js'
import Input from './input.js';
import Particle from './particle.js';
import Wheel from './wheel.js';



function main() {
    let time = new Date().getTime()
    ctx_game.clearRect(0,0,game.width, game.height)
    wheel.update(time, input.keys)
    wheel.render()
    window.requestAnimationFrame(main);
}



const game = document.getElementById("game-layer")
const ctx_game = game.getContext("2d");
const wheel = new Wheel(ctx_game);
const input = new Input()
main()


