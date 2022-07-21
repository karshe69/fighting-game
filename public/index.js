const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

class Sprite {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.grounded = false
        this.height = 150
        this.width = 50
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.velocity.y += 0.2

        if (this.velocity.y + this.position.y >= canvas.height - this.height) {
            this.velocity.y = 0
            this.position.y = canvas.height - this.height
            this.grounded = true
        }
        else {
            this.grounded = false
        }

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x


        this.draw()
    }
}

class Player extends Sprite {
    constructor({ position, velocity }) {
        super({ position, velocity })
        this.lastPress = null
    }

    update() {

        if (keys.right.pressed && this.lastPress == "right") {
            this.velocity.x = 1
        }
        else if (keys.left.pressed && this.lastPress == "left") {
            this.velocity.x = -1
        }
        else
            this.velocity.x *= ((this.grounded) ? 0.9 : 0.99)
        if (keys.jump.pressed && this.grounded)
            this.velocity.y = -10
        if (keys.action.pressed)
            this.attack()
        super.update()
    }

    attack(){
        console.log("attacked!");
        keys.action.pressed = false
    }


}

const player = new Player({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})

const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    }
})


const keys = {
    right: {
        key: "d",
        pressed: false
    },
    left: {
        key: "a",
        pressed: false
    },
    down: {
        key: "s",
        pressed: false
    },
    jump: {
        key: ' ',
        pressed: false
    },
    action: {
        key: "f",
        pressed: false
    }
}


function gameloop() {
    window.requestAnimationFrame(gameloop)
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()
}

gameloop()

window.addEventListener('keydown', (event) => {
    for (const key in keys) {
        if (Object.hasOwnProperty.call(keys, key)) {
            const element = keys[key];
            if (element.key == event.key) {
                if (key == "right" || key == "left") 
                    player.lastPress = key
                element.pressed = true
            }
        }
    }
})

window.addEventListener('keyup', (event) => {
    for (const key in keys) {
        if (Object.hasOwnProperty.call(keys, key)) {
            const element = keys[key];
            if (element.key == event.key) 
                element.pressed = false
        }
    }
})