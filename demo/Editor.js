class CanvasItem {
    /*
        parent: canvas parent : Canvas
        type: object type : String
        text: text to write in item : String
        style: canvas item style : String
        position: canvas style : Object
            position.x: x position : Int
            position.y: y position : Int
        return null
    */
    constructor(parent, {type, text, style}, key,  position) {
        this.parent = parent
        this.key = key
        this.type = type
        this.text = text
        this.style = style
        this.position = position
        this.MoveTo = 0
        this.defineOrUpdateRect()
    }

     /*
        Update the boundaries of our items
        return null
    */
    defineOrUpdateRect = () => {
        this.rect =  {
            top : this.position.y,
            bottom: this.position.y + this.style.height,
            left: this.position.x,
            right: this.position.x + this.style.width
        }
    }

    /*
        Display Canvas item
        return null
    */
    renderCanvasItem = () => {
        if(this.moveTo !== 0) {
            if(this.moveTo < this.position.y)
                this.position.y -= 1
            else if(this.moveTo > this.position.y)
                this.position.y += 1
            if(this.moveTo === this.position.y)
                this.moveTo = 0
        }
        const { context } = this.parent.canvas
        context.fillStyle = this.style.backgroundColor;
        context.fillRect(this.position.x, this.position.y, this.style.width, this.style.height);
        context.fillStyle = "black";
        context.font = "15px Arial";
        context.fillText(this.text , this.position.x + 20 , this.position.y + this.style.height / 2 + 5);
        this.defineOrUpdateRect()
    }
}

let canvasDefaultStyle = {
    width: "200px",
    height: "500px",
    border: "1px solid black"
}

class Canvas {
    /*
        style: canvas style : Object
        children: canvas children item : Object
            #TODO
        return null
    */
    constructor(childrens=[], style=canvasDefaultStyle) {
        let element = this.createCanvasDomElement()
        this.canvas = {
            element : element,
            context : element.getContext('2d'),
            width : style.width,
            height : style.height,
            style : style
        }
        this.clickedElement = undefined
        this.requestAnimationFrame = null
        this.childrens = childrens
        this.childrenById = {}
        this.setupCanvasStyle()
        this.createCanvasChildren()
        this.renderChildren()
        this.onMouseDoneHandle = this.onMouseDoneHandle()
        this.onMouseUpHandle = this.onMouseUpHandle()
        this.onMouseMove = this.onMouseMoveHandle()
    }

    /*
        Create canvas domelement
        return DomElement
    */
    createCanvasDomElement = () => {
        return document.createElement("canvas");
    }

    /*
        Setup the style of the canvas dom element
        return null
    */
    setupCanvasStyle = () => {
        for (const [key, value] of Object.entries(this.canvas.style)) {
            if(key === "width" || key === "height")
                this.canvas.element.setAttribute(key, value)
            else
                this.canvas.element.style[key] = value 
        }
    }

    /*
        Canvas DomElement getter
        return DomElement
    */
    getCanvasElement = () => {
        return this.canvas.element
    }

    /*
        Create canvas items
        return null
    */
    createCanvasChildren = () => {
        let minimumY = 50
        this.childrens.map((children, key) => {
            let id = this.generateId()
            let canvasItem = new CanvasItem(this, children, key + 1, {x: 20, y: minimumY})
            this.childrenById[id] = canvasItem
            minimumY += 50
        })
    }

    /*
        Generate random id
        return String
    */
    generateId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    /*
        Clear the canvas and render
        function requestAnimationFrame is here to make possible all the animation she is called every frame 
        if you want to know more check here : https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame
        return null
    */
    renderChildren = () => {
        const { context, width, height } = this.canvas
        context.clearRect(0, 0, 200, 500);
        Object.entries(this.childrenById).map((children) => {
            children[1].renderCanvasItem()
        })
        this.requestAnimationFrame = requestAnimationFrame(this.renderChildren);
    }

     /*
        Allows us to detect when someone click on the canvas 
        if a click is done on one of our children you will be abble to move him 
        return null
    */
    onMouseDoneHandle = () => {
        this.canvas.element.addEventListener('mousedown', (event) => {
            const { offsetX, offsetY } = event
            Object.entries(this.childrenById).map((children) => {
                let childrenItem = children[1]
                const { rect } = childrenItem
                if((rect.top < offsetY && rect.bottom > offsetY) && (rect.left < offsetX && rect.right > offsetX)){
                    this.clickedElement = childrenItem
                }
            })
        })
    }

     /*
        Allows us to detect when someone when someone drop the click down
        if we got an element who got clicked then it will check where the actual button is and he will go to his new "good" position 
        return null
    */
    onMouseUpHandle = () => {
        this.canvas.element.addEventListener('mouseup', (event) => {
            if(this.clickedElement !== undefined) {
                this.clickedElement.defineOrUpdateRect()
                this.clickedElement.position = {x: 20, y: this.clickedElement.key * 50}
                this.clickedElement = undefined
            }
        })
    }

     /*
        Allows us to detect when someone when someone drag an element 
        return null
    */
    onMouseMoveHandle = () => {
        this.canvas.element.addEventListener('mousemove', (event) => {
            if(this.clickedElement !== undefined) {
                const { offsetX, offsetY } = event
                this.clickedElement.position = { x : offsetX, y : offsetY }
                Object.entries(this.childrenById).map((children) => {
                    let childrenItem = children[1]
                    const { rect } = childrenItem
                    if(rect.top > offsetY && this.clickedElement.key !== childrenItem.key && this.clickedElement.key - 1 === childrenItem.key){
                        childrenItem.key++
                        this.clickedElement.key--
                        childrenItem.moveTo =  childrenItem.key * 50
                    }
                    if(rect.bottom < offsetY && this.clickedElement.key !== childrenItem.key && this.clickedElement.key + 1 === childrenItem.key){
                        childrenItem.key--
                        this.clickedElement.key++
                        childrenItem.moveTo =  childrenItem.key * 50
                    }
                })
            }
        })
    }

}


// Exemple of data we could get :)
let a = [{
    type : "rect", // rect / circle / image
    text : "WHILE",
    style: {
        width: 100,
        height: 40,
        color: "white",
        backgroundColor: "blue",
    }
},
{
    type : "rect", // rect / circle / image
    text : "ADD",
    style: {
        width: 100,
        height: 40,
        color: "white",
        backgroundColor: "yellow",
    }
},
{
    type : "rect", // rect / circle / image
    text : "SUB",
    style: {
        width: 100,
        height: 40,
        color: "white",
        backgroundColor: "green",
    }
}]

let canvas = new Canvas(a) 
document.getElementById("editor").appendChild(canvas.getCanvasElement())