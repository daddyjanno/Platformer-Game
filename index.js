const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
console.log(context);

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.5;

class Sprite {
  constructor({ position, imageSrc }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  draw() {
    if (!this.image) {
      return;
    }
    context.drawImage(this.image, this.position.x, this.position.y);
  }
  update() {
    this.draw();
  }
}

class Player {
  constructor(position) {
    this.position = position;
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.height = 100;
  }
  draw() {
    context.fillStyle = "red";
    context.fillRect(this.position.x, this.position.y, 100, this.height);
  }

  update() {
    this.draw();

    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y < canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}

const player = new Player({ x: 0, y: 0 });
const player2 = new Player({ x: 200, y: 0 });

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
  up: {
    pressed: false,
  },
};

const background = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: "./img/background.png",
});

const scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4,
};

function animate() {
  window.requestAnimationFrame(animate);
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.save();
  context.scale(4, 4);
  context.translate(0, -background.image.height + scaledCanvas.height);
  background.update();
  context.restore();

  player.update();
  player2.update();

  player.velocity.x = 0;
  if (keys.right.pressed) {
    player.velocity.x = 5;
  } else if (keys.left.pressed) {
    player.velocity.x = -5;
  }
}
animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowRight":
      keys.right.pressed = true;
      break;
    case "ArrowLeft":
      keys.left.pressed = true;
      break;
    case "ArrowUp":
      player.velocity.y = -15;
      break;

    default:
      break;
  }
});
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowRight":
      keys.right.pressed = false;
      break;
    case "ArrowLeft":
      keys.left.pressed = false;
      break;

    default:
      break;
  }
});
