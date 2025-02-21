const canVas =document.getElementById("index5");
const context= canVas.getContext('2d');
const window_height=window.innerHeight;
const window_width=window.innerWidth;

canVas.width =window_width;
canVas.height=window_height;
canVas.style.background="red"

const r=50;
let speedY=4;
let speedX=4;
let x = window_width/2;
let y = window_height/2;

function drawClock() {
    context.fillStyle= "white";
    context.beginPath();
    // context.arc(100,100,radius,0,2*Math*PI);
    context.arc(x,y,r,0,2* Math.PI)
    context.fill();
}

function animation() {
    context.clearRect(0, 0, canVas.width, canVas.height); // Clear the canvas
    drawClock();

    // Update the position
    x += speedX;
    y += speedY;

    // Check for collision with the canvas boundaries
    if (x + r > canVas.width || x - r < 0) {
        speedX = -speedX; // Reverse direction on X axis
    }
    if (y + r > canVas.height || y - r < 0) {
        speedY = -speedY; // Reverse direction on Y axis
    }

    requestAnimationFrame(animation);
}

animation();
// drawClock();
