const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const agrandar_btn = document.getElementById('agrandar');
const achicar_btn = document.getElementById('achicar');
const tamaño = document.getElementById('size');
const colorElement = document.getElementById('color');
const clearElement = document.getElementById('borrar');

let size = 20;
let isPressed = false;
let color = 'teal';
let x = undefined;
let y = undefined;

achicar_btn.addEventListener('click', () => {
    size -= 2;
    if (size < 2) {
        size = 2;
    }
    updateNumberOfSize();
})

agrandar_btn.addEventListener('click', () => {
    size += 2;
    if (size > 50) {
        size = 50;
    }
    updateNumberOfSize();
})

canvas.addEventListener('mousedown', (e) => {
    isPressed = true;
    var pos = getMousePos(canvas, e);
    x = pos.x;
    y = pos.y;
});

canvas.addEventListener('mouseup', (e) => {
    isPressed = false;
    x = undefined;
    y = undefined;
});

canvas.addEventListener('mousemove', (e) => {
    if (isPressed) {
        var pos = getMousePos(canvas, e);
        const y2 = pos.y;
        const x2 = pos.x;

        drawCircle(x2, y2)
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    }

});

colorElement.addEventListener('change', (e) => {
    color = e.target.value;
})

clearElement.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

function updateNumberOfSize() {
     tamaño.innerHTML = size;
}

function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top)
    };
}

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}


function draw() {
    ctx.clearRect(0,0, canvas.clientWidth, canvas.height);
    drawCircle(50,50);

    requestAnimationFrame(draw);
}