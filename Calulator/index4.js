const canvas = document.getElementById('app');
const ctx = canvas.getContext('2d');
var window_width =window.innerWidth;
var window_height=window.innerHeight;
canvas.width=window_width;
canvas.height=window_height;
canvas.style.background="#dedfe4";

    // a cube
    ctx.fillStyle="red";
    ctx.fillRect(100,200,100,100); //x y w h
    // a bigger cube
    ctx.strokeStyle="green";
    ctx.lineWidth=1;
    ctx.strokeRect(100,400,100,100);
    // a circle
    ctx.beginPath();
    ctx.fillStyle="red";
    ctx.arc(150,600,50,0,2*Math.PI); //x y r start->end of circle
    ctx.fill();
    ctx.lineWidth=7;
    ctx.strokeStyle="yellow";
    ctx.stroke();
    // a half circle 

    ctx.beginPath()
    ctx.arc(150,70,50,0,Math.PI);
    ctx.fillStyle="white";
    ctx.fill();
    ctx.lineWidth=6;
    ctx.strokeStyle="blue"
    ctx.stroke();
    

    ctx.fillStyle = "pink";
    ctx.fillRect(220,49,150,100);
    ctx.clearRect(240,70,50,50)

    //How quadraticCurveTo works

    ctx.beginPath();
    ctx.moveTo(50,20);
    ctx.quadraticCurveTo(230,30,50,100);
    ctx.stroke();

    // Start and end points
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(50, 20, 5, 0, 2 * Math.PI); // Start point
    ctx.arc(50, 100, 5, 0, 2 * Math.PI); // End point
    ctx.fill();

    // Control point
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(230, 30, 5, 0, 2 * Math.PI);
    ctx.fill();


    // create a game space with a cube
    // Create a game space with a cube
var gameArea = {
    canvas: document.getElementById('gameArea'),
    start: function() {
        this.canvas.width = 400;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        this.canvas.style.background = 'red';
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
gameArea.start();

// Define the cubeComponent constructor function
function cubeComponent(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speedX = 0;
    this.speedY = 0;
    // Method to draw the cube
    this.draw = function() {
        var ctx = gameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    // Method to update the cube's position
//     this.update = function(newX, newY) {
//         // Ensure the cube stays within the game area
//         if (newX >= 0 && newX + this.width <= gameArea.canvas.width) {
//             this.x = newX;
//         }
//         if (newY >= 0 && newY + this.height <= gameArea.canvas.height) {
//             this.y = newY;
//         }
//         this.draw();
//     }
this.update = function(){
    this.x+=this.speedX;
    this.y+=this.speedY;
   
    // ensure yellow cube inside red cube.
    // if(this.x<0){
    //     this.x=0;
    //     this.speedX=-this.speedX;
    // }
    // if(this.x + this.width > gameArea.canvas.width){
    //     this.x=gameArea.canvas.width -this.width;
    //     // this.speedX=-this.speedX;
    //     // this.speedX=0;
    //     // this.speedX=this.speedX;
    // }
    // if(this.y<0){
    //     this.y=0;
    //     this.speedY=-this.speedY;
    // }
    // if(this.y+this.height> gameArea.canvas.height){
    //     this.y=gameArea.canvas.height-this.height;
    //     // this.speedY=-this.speedY;
    //     // this.speedY=0;
    //     // this.speedY=this.speedY;
    // }
    if(this.x < 0 || this.x+this.width > gameArea.canvas.width){
        this.reset();
    }
    if(this.y < 0 || this.y+this.height > gameArea.canvas.height){
        this.reset();
    }
    this.draw();
}
    this.reset=function(){
        this.x=0;
        this.y=0;
        this.speedX=this.speedX;
        this.speedY=this.speedY;
    }
}

// Create a new cube instance and draw it
var cube1 = new cubeComponent(80, 80, "yellow", 0, 0);
cube1.speedX=0;
cube1.speedY=4;

function animation(){
    gameArea.clear();
    cube1.update();
    requestAnimationFrame(animation)
}

animation();
// cube1.draw();
// var cube2=new cubeComponent(80,80,"blue",80,80);
// cube2.draw();
// animation
// animation of cube1
// animation of cube2

/*Example of updating the cube's position
setTimeout(function() {
    cube1.update(100, 100);
}, 2000);

// Example of trying to move the cube outside the game area
setTimeout(function() {
    cube1.update(350, 350); // This will be adjusted to stay within bounds
}, 4000);
    keep cube inside gameArea
*/
