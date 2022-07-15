const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

class Sprite {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        this.velocity.y += 0.2

        this.draw()
    }
}

const player = new Sprite({
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
        key: 'd',
        pressed: false
    },
    left: {
        key: 'a',
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
    switch (event.key) {
        case keys.right.key:
            keys.right = true
            break
        case keys.left.key:
            keys.left = true
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case keys.right.key:
            keys.right = false
            break
        case keys.left.key:
            keys.left = false
            break
    }
})

"asd"