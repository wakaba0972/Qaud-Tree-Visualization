
let canvas = document.getElementById('c')
let ctx = c.getContext('2d')

canvas.height = 800//window.innerHeight - 50;
canvas.width = 800//window.innerWidth - 50;

let outerX = canvas.getBoundingClientRect().x
let outerY = canvas.getBoundingClientRect().y

let object = []
let ROI = new rectangle(0, 0, 100, 100)

let fpshow = document.getElementById('fps')
let lastCallTime = 0
let fps = 0

let ballNumShow = document.getElementById('ballNum')
let ballNum = 0

function explore(x, y){
    if(x > 0 && x < canvas.width && y > 0 && y < canvas.height){
        for(let i = 0; i < 50; ++i) object.push(new ball(x, y))
    }
}

function update(){
    canvas.width = canvas.width
    tree = new quadtree(new rectangle(0, 0, canvas.width, canvas.height))

    for(obj of object){
        tree.insert(obj)
        obj.render()
    }

    ctx.beginPath()
    ctx.rect(ROI.x, ROI.y, ROI.w, ROI.h)
    ctx.stroke()

    tree.query(ROI)
}

function loop(){
    fps = Math.floor(1000 / (performance.now() - lastCallTime))
    fpshow.innerText = 'fps: ' + fps
    lastCallTime = performance.now()
    update()
    requestAnimationFrame(loop)
}

window.addEventListener('resize', ()=>{
    outerX = canvas.getBoundingClientRect().x
    outerY = canvas.getBoundingClientRect().y
})

window.addEventListener('mousedown', event => {
    ballNum += 50
    ballNumShow.innerText = 'Number of Particle: ' + ballNum
    explore(event.pageX - outerX, event.pageY - outerY)
})

window.addEventListener('mousemove', (event) => {
    if(event.pageX > canvas.width + outerX || event.pageY > canvas.height + outerY || event.pageX < outerX || event.pageY < outerY) return
    ROI.x = (event.pageX - outerX) - ROI.w / 2
    ROI.y = (event.pageY - outerY) - ROI.h / 2
})

window.addEventListener('wheel', event=> {
    if(event.deltaY > 0) ROI.w = ROI.h -= 25
    else ROI.w = ROI.h += 25
})

loop()