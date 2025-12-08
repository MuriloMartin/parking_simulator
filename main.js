import Car from './car.js'
import Input from './input.js';
import Particle from './particle.js';



function main() {
    let time = new Date().getTime()
    ctx_game.clearRect(0,0,game.width, game.height)
    particle.update(time, input.keys)
    particle.render()
    window.requestAnimationFrame(main);
}



const game = document.getElementById("game-layer")
const ctx_game = game.getContext("2d");
const particle = new Particle(ctx_game);
const input = new Input()
main()


