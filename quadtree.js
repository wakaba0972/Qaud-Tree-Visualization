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
        
        let cx = this.x + this.w / 2;
        let cy = this.y + this.h / 2;

        let xDist = Math.abs(cx - ball.x);
        let yDist = Math.abs(cy - ball.y);

        // 塞選掉所有矩形外部
        if (xDist > this.w / 2 + ball.r || yDist > this.h / 2 + ball.r) return false;

        // 有在方形內的都算碰撞
        if (xDist <= this.w / 2 || yDist <= this.h / 2) return true;

        // 但還是會漏掉四個角的外側，所以再檢查四個角是否與圓發生碰撞
        let edges = Math.pow(xDist - this.w / 2, 2) + Math.pow(yDist - this.h / 2, 2);
        return edges <= ball.r * ball.r;
        
        /*
        return !(this.x + this.w < ball.x - ball.r || this.x > ball.x + ball.r ||
                this.y + this.h < ball.y - ball.r || this.y > ball.y + ball.r)*/
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
        ctx.rect(this.region.x, this.region.y, this.region.w, this.region.h)
        ctx.stroke()
    }
}