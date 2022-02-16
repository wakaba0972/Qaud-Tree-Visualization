class ball{
    constructor(x, y){
        this.x = x
        this.y = y
        this.r = 5
        this.color = 'white'
        //this.color = 'rgba(' + rand(0, 255) +', ' + rand(0, 255) +', ' + rand(0, 255) + ', ' + 0.3 +')'

        this.speed = rand(1, 2)
        let angle = rand(0, Math.PI * 2)

        this.vx = Math.cos(angle) * this.speed
        this.vy = Math.sin(angle) * this.speed
    }

    move(){
        this.x += this.vx
        this.y += this.vy
        
        //ball to wall
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
        ctx.fillStyle = this.color
        //ctx.strokeStyle = this.color
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        this.color = 'white'
    }

    coloring(){
        this.color = 'yellow'
    }
}