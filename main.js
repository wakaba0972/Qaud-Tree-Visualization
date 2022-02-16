var canvas = document.getElementById('c')
var ctx = c.getContext('2d')

canvas.height = 800//window.innerHeight - 50;
canvas.width = 800//window.innerWidth - 50;
let outerX = canvas.getBoundingClientRect().x
let outerY = canvas.getBoundingClientRect().y

var object = []
function explore(x, y){
    if(x < canvas.width && y < canvas.height){
        for(let i = 0; i < 50; ++i) object.push(new ball(x, y))
    }
}

window.addEventListener('mousedown', (event) => {
    explore(event.pageX - outerX, event.pageY - outerY)
})


let ROI = new rectangle(0, 0, 100, 100)
window.addEventListener('mousemove', (event) => {
    if(event.pageX > canvas.width || event.pageY > canvas.height) return
    ROI.x = (event.pageX - outerX) - ROI.w / 2
    ROI.y = (event.pageY - outerY) - ROI.h / 2
})



function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    tree = new quadtree(new rectangle(0, 0, canvas.width, canvas.height))
    for(obj of object){
        tree.insert(obj)
        obj.render()
    }

    ctx.beginPath()
    ctx.rect(ROI.x, ROI.y, ROI.w, ROI.h)
    ctx.stroke()

    tree.query(ROI)

    requestAnimationFrame(loop)
}

loop()