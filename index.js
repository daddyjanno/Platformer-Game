const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
console.log(context);

canvas.width = 1024;
canvas.height = 576;

class Player {
  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };
  }
  draw() {
    context.fillStyle = "red";
    context.fillRect(this.position.x, this.position.y, 100, 100);
  }

  update() {
    this.position.y += 1;
  }
}

const player = new Player();

function animate() {
  window.requestAnimationFrame(animate);
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
  player.draw();
  player.update();
}
animate();
