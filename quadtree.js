class rectangle{
    constructor(x, y, w, h){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }

    intersectRect(rect){
        return !(this.x + this.w < rect.x || this.x > rect.x + rect.w ||
                this.y + this.h < rect.y || this.y > rect.y + rect.h);
    }

    intersectBall(ball){
        //Rect中心座標
        let rx = this.x + this.w / 2
        let ry = this.y + this.h / 2

        //以Rect中心為原點，將圓心映射至第一象限
        let cx = Math.abs(ball.x - rx) + rx
        let cy = Math.abs(ball.y - ry) + ry

        //Rect中心至圓心的向量
        let vx = cx - rx
        let vy = cy - ry

        //計算圓心至矩形的最短距離
        let ax = vx - this.w / 2
        ax = (ax > 0 ? ax : 0)
        let ay = vy - this.h / 2
        ay = (ay > 0 ? ay : 0)
        
        return Math.sqrt(ax ** 2 + ay ** 2) < ball.r
    }
}

class quadtree{
    constructor(rect){
        this.region = rect
        this.childs = []
        this.data = []
        this.show()
    }

    insert(ball){
        if(!this.region.intersectBall(ball)) return false
        if(this.data.length < 4){
            this.data.push(ball)
            return true
        }
        else{
            if(this.childs.length < 1) {
                this.subdivide()
            }
            for(let c of this.childs){
                if(c.insert(ball)) return true
            }
        }
    }

    subdivide(){
        this.childs.push(new quadtree(new rectangle(this.region.x + this.region.w / 2, this.region.y, this.region.w / 2, this.region.h / 2)))
        this.childs.push(new quadtree(new rectangle(this.region.x, this.region.y, this.region.w / 2, this.region.h / 2)))
        this.childs.push(new quadtree(new rectangle(this.region.x, this.region.y + this.region.h / 2, this.region.w / 2, this.region.h / 2)))
        this.childs.push(new quadtree(new rectangle(this.region.x + this.region.w / 2, this.region.y + this.region.h / 2, this.region.w / 2, this.region.h / 2)))
    }

    query(rect){
        if(!this.region.intersectRect(rect)) return
        for(let d of this.data){
            if(rect.intersectBall(d)){
                d.coloring()
            }
        }
        for(let c of this.childs){
            c.query(rect)
        }
    }

    show(){
        ctx.beginPath()
        //ctx.moveTo(this.region.x, this.region.y)
        ctx.rect(this.region.x, this.region.y, this.region.w, this.region.h)
        ctx.stroke()
    }
}