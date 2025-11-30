
const game = document.getElementById("game-layer")

const ctx_game = game.getContext("2d");



function draw() {
    ctx_game.globalCompositeOperation = "destination-over";

    ctx_game.fillRect(0,0,25,40)

    window.requestAnimationFrame(draw);
  }


function main() {
    window.requestAnimationFrame(draw);
}

document.addEventListener("keydown", (key)=>{
    new_y = 0
    new_heading = 0

    if (key.key == 'ArrowRight'){
        new_heading += 25
    }
    
    if (key.key == 'ArrowDown'){
        new_y += 10
    }
    
    if (key.key == 'ArrowLeft'){
        new_heading -= 25
    }
    
    if (key.key == 'ArrowUp'){
            new_y -= 10
    }
    
    ctx_game.clearRect(-10,-20,100,100)
    ctx_game.rotate((Math.PI / 180) * new_heading);
    ctx_game.translate(0, new_y)
})

main()


