// ===================================

            // First
    
// ==================================
const canvas = document.getElementById('app');
const context = canvas.getContext('2d');
const window_height = window.innerHeight;
const window_width = window.innerWidth;

// Set canvas dimensions to match the window size
canvas.height = window_height;
canvas.width = window_width;
// Set the background color of the canvas
canvas.style.background = "red";
let sizeX=30;
let sizeY=30;
let step=20;
let cubePositionX=0;
let cubePositionY=0;
let clones=[]
let animationFrameId = null; 
 let bounceActive = false;
 // let speedX=2;
// let speedY=2; 
function DrawCubeWith_rect(cubePositionX,cubePositionY,sizeX,sizeY){
    // context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.rect(cubePositionX,cubePositionY,sizeX,sizeY);
    context.strokeStyle= "white"; 
    context.lineWidth=4;
    context.stroke();
  
    // random position
    // cubePositionX.Math.random();
}
DrawCubeWith_rect(cubePositionX,cubePositionY,sizeX,sizeY);
document.getElementById('right').addEventListener('click',()=>{
    context.clearRect(0, 0, canvas.width, canvas.height);
    // cubePositionX += step;
    if (cubePositionX + sizeX < canvas.width) {
        cubePositionX += step;
        DrawCubeWith_rect(cubePositionX, cubePositionY, sizeX, sizeY);
    }
    // DrawCubeWith_rect(cubePositionX,cubePositionY,sizeX,sizeY);
})
document.getElementById('top').addEventListener('click',()=>{
    context.clearRect(0, 0, canvas.width, canvas.height);
    // cubePositionY -= step;
    // DrawCubeWith_rect(cubePositionX,cubePositionY,sizeX,sizeY);
    if (cubePositionY > 0) {
        cubePositionY -= step;
        DrawCubeWith_rect(cubePositionX, cubePositionY, sizeX, sizeY);
    }
})
document.getElementById('left').addEventListener('click',()=>{
    context.clearRect(0, 0, canvas.width, canvas.height);
    // cubePositionX -= step;
    // DrawCubeWith_rect(cubePositionX,cubePositionY,sizeX,sizeY);
    if (cubePositionX > 0) {
        cubePositionX -= step;
        DrawCubeWith_rect(cubePositionX, cubePositionY, sizeX, sizeY);
    }
})
document.getElementById('bottom').addEventListener('click',()=>{
    // cubePositionY += step;
    // DrawCubeWith_rect(cubePositionX,cubePositionY,sizeX,sizeY);
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (cubePositionY + sizeY < canvas.height) {
        cubePositionY += step;
        DrawCubeWith_rect(cubePositionX, cubePositionY, sizeX, sizeY);
    }
})
function TeleportCube() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    cubePositionX = (canvas.width - sizeX) / 2;
    cubePositionY = (canvas.height - sizeY) / 2;
    DrawCubeWith_rect(cubePositionX, cubePositionY, sizeX, sizeY);
}

// 2️⃣ Bounce: Animate the cube bouncing inside the canvas
function BounceCube() {
    if (bounceActive) return; // Prevent multiple bounce loops
    context.clearRect(0, 0, canvas.width, canvas.height);
    let speedX = 3;
    let speedY = 4;
    bounceActive = true;

    function animate() {
        if (!bounceActive) return; // Stop animation when needed

        cubePositionX += speedX;
        cubePositionY += speedY;

        // Handle bouncing on walls
        const hitLeft = cubePositionX <= 0;
        const hitRight = cubePositionX + sizeX >= canvas.width;
        const hitTop = cubePositionY <= 0;
        const hitBottom = cubePositionY + sizeY >= canvas.height;

        // If hitting a corner, reverse both directions
        if ((hitLeft && hitTop) || (hitRight && hitTop) || (hitLeft && hitBottom) || (hitRight && hitBottom)) {
            speedX *= -1;
            speedY *= -1;
        } 
        // If hitting left or right walls, reverse X direction
        else if (hitLeft || hitRight) {
            speedX *= -1;
        } 
        // If hitting top or bottom walls, reverse Y direction
        else if (hitTop || hitBottom) {
            speedY *= -1;
        }

        DrawCubeWith_rect(cubePositionX, cubePositionY, sizeX, sizeY);
        requestAnimationFrame(animate);
    }
    animate();
}


// 3️⃣ Move cube to a random position instantly
// function MoveCubeToRandomPosition() {
//     cubePositionX = Math.floor(Math.random() * (canvas.width - sizeX));
//     cubePositionY = Math.floor(Math.random() * (canvas.height - sizeY));
//     DrawCubeWith_rect(cubePositionX, cubePositionY, sizeX, sizeY);
// }
function MoveCubeToRandomPosition() {
    return {
        px: Math.floor(Math.random() * (canvas.width - sizeX)),
        py: Math.floor(Math.random() * (canvas.height - sizeY)),
    };
}

// Function to stop the bounce animation
function stopBounce() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    bounceActive = false;  // Set to false to stop the animation
    cancelAnimationFrame(animationFrameId);  // Cancel the ongoing animation frame
    DrawCubeWith_rect(cubePositionX, cubePositionY, sizeX, sizeY);  // Redraw the cube at its current position
}
// Function to clone the cube at random positions
function MultiClone() {
    // Clear existing clones (optional)
    clones = [];

    // Create 5 clones
    for (let i = 0; i < 5; i++) {
        let position = MoveCubeToRandomPosition();
        clones.push(position);  // Store position of the clone
        console.log(`Cloning cube. Clone ${i + 1} at X: ${position.px}, Y: ${position.py}`);
        DrawCubeWith_rect(position.px, position.py, sizeX, sizeY);  // Draw the clone at the new position
    }
}

// Function to reset the cube and clones to a random position
function ResetClone() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Clear existing clones
    clones = [];

    // Reset the original cube to a random position
    let newPosition = MoveCubeToRandomPosition();
    cubePositionX = newPosition.px;
    cubePositionY = newPosition.py;

    // Draw the original cube at the new random position
    DrawCubeWith_rect(cubePositionX, cubePositionY, sizeX, sizeY);
}

// Event Listeners
document.getElementById('teleport').addEventListener('click', TeleportCube);
document.getElementById('bounce').addEventListener('click', BounceCube);
document.getElementById('randomPostion').addEventListener('click', ()=>{
    cubePositionX = Math.floor(Math.random() * (canvas.width - sizeX));
    cubePositionY = Math.floor(Math.random() * (canvas.height - sizeY));
    context.clearRect(0, 0, canvas.width, canvas.height);
    DrawCubeWith_rect(cubePositionX, cubePositionY, sizeX, sizeY);
   
});
document.getElementById('stopBounce').addEventListener('click', stopBounce);
document.getElementById('cubeClone').addEventListener('click', MultiClone);
document.getElementById('resetClone').addEventListener('click', ResetClone);
// ===================================

            // Seconds
    
// // ==================================
// const canvas = document.getElementById('app');
// const context = canvas.getContext('2d');
// // canvas.style.background = "red";
// // Function to resize the canvas to match window size
// function resizeCanvas() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     drawCube();
// }

// // Square properties
// let size = 20;
// let x = window.innerWidth / 2 - size / 2;
// let y = window.innerHeight / 2 - size / 2;
// let speed = 2; // Speed of movement

// let move = { left: false, right: false, up: false, down: false };

// // Function to draw the square
// function drawCube() {
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     context.beginPath();
//     context.rect(x, y, size, size);
//     context.strokeStyle = "black";
//     context.lineWidth = 4;
//     context.stroke();
// }

// // Animation loop
// function update() {
//     if (move.left && x > 0) x -= speed;
//     if (move.right && x + size < canvas.width) x += speed;
//     if (move.up && y > 0) y -= speed;
//     if (move.down && y + size < canvas.height) y += speed;

//     drawCube();
//     requestAnimationFrame(update);
// }

// // Set initial canvas size
// resizeCanvas();
// window.addEventListener('resize', resizeCanvas);

// // Event listeners for button press and release
// document.getElementById('top').addEventListener('mousedown', () => move.up = true);
// document.getElementById('right').addEventListener('mousedown', () => move.right = true);
// document.getElementById('bottom').addEventListener('mousedown', () => move.down = true);
// document.getElementById('left').addEventListener('mousedown', () => move.left = true);

// document.getElementById('top').addEventListener('mouseup', () => move.up = false);
// document.getElementById('right').addEventListener('mouseup', () => move.right = false);
// document.getElementById('bottom').addEventListener('mouseup', () => move.down = false);
// document.getElementById('left').addEventListener('mouseup', () => move.left = false);

// // Start animation loop
// update();
