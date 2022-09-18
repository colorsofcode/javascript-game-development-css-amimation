const vector = {
    x:0, 
    y:0, 
    addPosition: function(v) {
        this.x += Math.round(v.x)
        this.y += Math.round(v.y)
    }
}

const duck = {
    element: document.querySelector(".duck"),
    sprite: document.querySelector(".duck").querySelector("img"),
    position: {...vector},
    speed: 3,
    isFacingRight: true,
    currentAnimationState: "",
    animation: {
        state: {
            idle: [
                { objectPosition: "0 0" },
                { objectPosition: "-96px 0" }
            ],
            running: [
                { objectPosition: "0 -24px" },
                { objectPosition: "-96px -24px" }
            ]
        },
        timing: {
            duration: 400,
            iterations: Infinity,
            fill: "forwards",
            easing: "steps(4)"
        }
    },
    changeAnimationState: function(newState) {

        if (this.currentAnimationState === newState) return

        this.sprite.animate(this.animation.state[newState], this.animation.timing)

        this.currentAnimationState = newState

    }
}

const input = {
    axis: {
        horizontal: 0,
        vertical: 0
    },
    keyEvents: {},
    updateAxis: function() {

        this.axis = { 
            horizontal: 0, 
            vertical: 0 
        }

        if (this.keyEvents["KeyD"]) {
            this.axis.horizontal = 1
        }
        
        if (this.keyEvents["KeyA"]) {
            this.axis.horizontal = -1
        }

        if (this.keyEvents["KeyW"]) {
            this.axis.vertical = -1
        }

        if (this.keyEvents["KeyS"]) {
            this.axis.vertical = 1
        }
    }
}

document.addEventListener("keydown", (event) => {
    input.keyEvents[event.code] = true
})

document.addEventListener("keyup", (event) => {
    delete input.keyEvents[event.code]
})

const loop = () => {

    input.updateAxis()
    
    duck.position.addPosition({
        x: input.axis.horizontal * duck.speed,
        y: input.axis.vertical * duck.speed 
    })

    if ((input.axis.horizontal < 0 && duck.isFacingRight) || (input.axis.horizontal > 0 && !duck.isFacingRight)) {
        duck.isFacingRight = !duck.isFacingRight    
    }

    if (input.axis.horizontal || input.axis.vertical != 0) {
        duck.changeAnimationState("running")
    } else {
        duck.changeAnimationState("idle")
    }
    
    duck.element.style.transform = `matrix(${duck.isFacingRight ? 1 : -1 },0,0,1, ${ duck.position.x }, ${ duck.position.y })`

    requestAnimationFrame(loop)
}

loop()