// Super basic implementation of a 2D vector
const vector = {
    x:0, 
    y:0, 
    addPosition: function(v) {
        this.x += Math.round(v.x)
        this.y += Math.round(v.y)
    }
}

// The star of the show, the "Duck"
const duck = {
    element: document.querySelector(".duck"),
    position: {...vector},
    speed: 6,
    isFacingRight: true, 
    currentAnimationState: "",
    changeAnimationState: function(newState) {

        // if the state is the same as the one already applied, do nothing
        if (this.currentAnimationState === newState) return

        // remove the current state
        this.element.removeAttribute(this.currentAnimationState)

        // set the new state
        this.element.setAttribute(newState, "")

        // update the current stored state
        this.currentAnimationState = newState
    }
}

// Basic input handling
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

// Main game loop
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