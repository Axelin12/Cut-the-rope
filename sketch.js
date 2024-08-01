const World = Matter.World
const Engine = Matter.Engine
const Bodies = Matter.Bodies
const Body = Matter.Body
const Composite = Matter.Composite
const Composites = Matter.Composites
const Constraint = Matter.Constraint
var end = false;
function preload() {
    bg = loadImage("./assets/background.png")
    blink_animation = loadAnimation("assets/blink_1.png", "assets/blink_2.png", "assets/blink_3.png")
    triste_animacion = loadAnimation("./assets/sad_1.png", "./assets/sad_2.png")
    comer_animacion = loadAnimation("./assets/eat_0.png", "./assets/eat_1.png", "./assets/eat_2.png", "./assets/eat_3.png", "./assets/eat_4.png")
    frutaImg = loadImage("./assets/melon.png")
    bg_sound = loadSound("./assets/sound_background.mp3")
    eat_sound = loadSound("./assets/sound_eating.mp3")
    sad_sound = loadSound("./assets/sound_sad.wav")
}
function setup() {
    createCanvas(windowWidth, windowHeight)
    conejo = createSprite(width * 0.5, height * 0.8)
    conejo.addAnimation("blinking", blink_animation)
    conejo.addAnimation("triste", triste_animacion)
    conejo.addAnimation("comer", comer_animacion)
    conejo.scale = 0.35
    engine = Engine.create()
    mundo = engine.world
    cuerda = new Cuerda(7, { x: width * 0.5, y: 20 })
    fruta = new Fruta(100, 100, 36)
    nudo = new Nudo(fruta.body, cuerda.body.bodies[6])

    cut = createImg("./assets/cut_button.png")
    cut.position(width * 0.3, 20)
    cut.size(60, 60)
    cut.mouseClicked(cortar)

    sound = createImg("./assets/sound.png")
    sound.position(width * 0.8, 20)
    sound.size(50, 50)
    sound.mouseClicked(mute)

    air =createImg("./assets/balloon.png")
    air.position(width*0.3, height*0.3)
    air.size(100,70)
    air.mouseClicked(()=>{
        Body.applyForce(fruta.body,{x:fruta.body.position.x,y:fruta.body.position.y},{x:0.05,y:0})
    })
}
function draw() {
    image(bg, 0, 0, width, height)
    drawSprites()
    Engine.update(engine)
    cuerda.dibujar()
    fruta.mostrar()
    if (colision(fruta.body, conejo)) {
        conejo.changeAnimation("comer")
        win()
    }
    if (fruta.body.position.y > height) {
        conejo.changeAnimation("triste")
        gameover()
    }
}
function cortar() {
    nudo.romper()
}
function colision(fruta, conejo) {
    if (fruta) {
        distancia = dist(fruta.position.x, fruta.position.y, conejo.position.x, conejo.position.y)
        if (distancia < 100) {
            World.remove(mundo, fruta)
            return true;
        }
        return false;
    }
}
function gameover() {
    if (!end) {
        sad_sound.play()
        end = true
        Swal.fire({
            imageUrl: "./assets/sad_2.png",
            imageHeight: 200,
            title: "Upss..... Perdiste",
            confirmButtonText: "Volver a intentar"
        }).then((respuesta) => {
            if (respuesta.isConfirmed) {
                location.reload()
            }
        });
    }
}
function win() {
    if (!end) {
        eat_sound.play()
        end = true
        Swal.fire({
            imageUrl: "./assets/eat_1.png",
            imageHeight: 200,
            title: "¡Felicidade, Has ganando!",
            confirmButtonText: "Volver a jugar"
        }).then((respuesta) => {
            if (respuesta.isConfirmed) {
                location.reload()
            }
        });
    }
}
function mute() {
    if (bg_sound.isPlaying()) {
        bg_sound.stop()
        sound.attribute("src","./assets/sound.png")
    }else{
        bg_sound.play()
        bg_sound.setVolume(0.4)
        sound.attribute("src","./assets/mute.png")
    }
}