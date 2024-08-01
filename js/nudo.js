class Nudo{
    constructor(obj1, obj2){
        this.union = Constraint.create({
            bodyA: obj1,
            pointA: {x:0, y:0},
            bodyB: obj2,
            pointA: {x:0, y:0},
            length : -10,
            stiffness:0.2
        })
        World.add(mundo, this.union)
    }
    romper(){
    World.remove(mundo,this.union)
    }
}