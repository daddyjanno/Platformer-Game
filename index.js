const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.5;

const collisionBlocks = [];
const platformCollisionBlocks = [];

const player = new Player({
  position: { x: 100, y: 0 },
  collisionBlocks,
});

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

const floorCollisions2D = [];

for (let i = 0; i < floorCollisions.length; i += 36) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 36));
}

const platformCollisions2D = [];

for (let i = 0; i < platformCollisions.length; i += 36) {
  platformCollisions2D.push(platformCollisions.slice(i, i + 36));
}

floorCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      collisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
        })
      );
    }
  });
});
platformCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      platformCollisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
        })
      );
    }
  });
});

console.log(collisionBlocks);

function animate() {
  window.requestAnimationFrame(animate);
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.save();
  context.scale(4, 4);
  context.translate(0, -background.image.height + scaledCanvas.height);
  background.update();
  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.update();
  });
  platformCollisionBlocks.forEach((collisionBlock) => {
    collisionBlock.update();
  });
  player.update();

  player.velocity.x = 0;
  if (keys.right.pressed) {
    player.velocity.x = 3;
  } else if (keys.left.pressed) {
    player.velocity.x = -3;
  }
  context.restore();
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
      player.velocity.y = -8;
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
