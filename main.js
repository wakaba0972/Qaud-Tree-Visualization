var canvas = document.getElementById('c')
var ctx = c.getContext('2d')

canvas.height = 800//window.innerHeight;
canvas.width = 1000//window.innerWidth;

function rand(min, max){
    return Math.random()*(max-min+1)+min
}

function explore(x, y){
    for(let i = 0; i < 100; ++i){
        object.push(new ball(x, y))
    }
}

var object = []

let mouse = {
    x : 0,
    y : 0,
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
})
window.addEventListener('mousedown', (event) => {
    explore(mouse.x, mouse.y)
})

class ball{
    constructor(x, y){
        this.x = x
        this.y = y
        this.r = 5

        this.speed = rand(1, 3)
        let angle = rand(0, Math.PI * 2)

        this.vx = Math.cos(angle) * this.speed
        this.vy = Math.sin(angle) * this.speed
    }

    move(){
        this.x += this.vx
        this.y += this.vy
        this.collision()
    }

    collision(){
        if(this.x - this.r < 0 && this.vx < 0 || 
            this.x + this.r > canvas.width && this.vx > 0){
            this.vx *= -1
        }
        if(this.y - this.r < 0 && this.vy < 0 || 
            this.y + this.r > canvas.height && this.vy > 0){
            this.vy *= -1
        }
    }

    render(){
        this.move()
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        //ctx.fill()
        ctx.stroke()
    }
}

function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    object.forEach(obj =>{
        obj.render()
    })
    requestAnimationFrame(loop)
}
explore()
loop()