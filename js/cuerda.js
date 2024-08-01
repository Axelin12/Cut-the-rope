class Cuerda {
    constructor(nlink, pointA) {
        this.nlink = nlink;
        this.pointA = pointA;
        const group = Body.nextGroup(true);
        const rects = Composites.stack(100, 100, this.nlink, 1, 5, 5, function (x, y) {
            return Bodies.rectangle(x, y, 30, 5, { collisionFilter: { group: group } })
        });
        this.body = Composites.chain(rects, 0.1, 0, -0.6, 0, { stiffness: 0.2, length: 0.3, render: { type: "line" } });
        World.add(mundo, this.body)
        Composite.add(rects, Constraint.create({
            pointA: this.pointA,
            bodyB: rects.bodies[0],
            pointB: { x: -25, y: 0 },
            length: -10,
            stiffness: 0.1
        }));
    }
    drawVertices(vertices) {
        beginShape();
        fill("#FFF717");
        noStroke();
        for (let i = 0; i < vertices.length; i++) {
            vertex(vertices[i].x, vertices[i].y);
        }
        endShape(CLOSE);
    }
    dibujar(){
        if(this.body){
           this.body.bodies.forEach(element => {
                this.drawVertices(element.vertices)
            });
        }
    }
}