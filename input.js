export default class Input {
    constructor() {
        this.keys = []  
        window.addEventListener('keydown', e => {
            if (
                (e.key == 'w' ||
                e.key == 's') &&
                this.keys.indexOf(e.key) == -1
            ) {
                this.keys.push(e.key)
            }
        })

        window.addEventListener('keyup', e => {
            if (
                (e.key == 'w' ||
                e.key == 's')
            ) {
                this.keys.splice(this.keys.indexOf(e.key), 1)
            }
        })
    }
}