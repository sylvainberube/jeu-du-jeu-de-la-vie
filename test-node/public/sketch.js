let socket;

function setup() {
  createCanvas(400, 400);
  background(51);

  socket = io.connect('http://localhost:3000');
  socket.on('mouse', newDrawing);
}

function newDrawing(data) {
  noStroke();
  fill(100, 100, 255);
  ellipse(data.x, data.y, 30, 30);
}

function mouseDragged() {
  console.log('Envoyer : ' + mouseX + ',' + mouseY);

  let data = {
    x: mouseX,
    y: mouseY
  }

  socket.emit('mouse', data);

  noStroke();
  fill(255, 100, 200);
  ellipse(mouseX, mouseY, 30, 30);
}

function draw() {
}
