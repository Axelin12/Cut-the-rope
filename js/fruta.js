class Fruta{
    constructor(x,y,r){
        this.r= r
        this.body = Bodies.circle(x,y,r, {density:0.001})
        World.add(mundo, this.body)
    }
    mostrar(){
        push()
        ellipseMode(RADIUS)
        ellipse(this.body.position.x,this.body.position.y,this.r)
        imageMode(CENTER)
        image(frutaImg,this.body.position.x,this.body.position.y,this.r*2,this.r*2)
        pop()
    }
}