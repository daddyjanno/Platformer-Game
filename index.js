const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.1;

const collisionBlocks = [];
const platformCollisionBlocks = [];

const player = new Player({
  position: { x: 100, y: 300 },
  collisionBlocks,
  platformCollisionBlocks,
  imageSrc: "./img/warrior/Idle.png",
  frameRate: 8,
  animations: animations,
});

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
          height: 4,
        })
      );
    }
  });
});

const backgroundImageHeight = 432;

const camera = {
  position: {
    x: 0,
    y: -backgroundImageHeight + scaledCanvas.height,
  },
};

function animate() {
  window.requestAnimationFrame(animate);
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.save();
  context.scale(4, 4);
  context.translate(camera.position.x, camera.position.y);
  background.update();
  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.update();
  });
  platformCollisionBlocks.forEach((collisionBlock) => {
    collisionBlock.update();
  });
  player.checkForHorizontalCanvasCollision();
  player.checkForVerticalCanvasCollision();
  player.update();

  player.velocity.x = 0;
  if (keys.q.pressed) {
    player.switchSprite("Attack1");
  } else if (keys.s.pressed) {
    player.switchSprite("Attack2");
  } else if (keys.d.pressed) {
    player.switchSprite("Attack3");
  } else if (keys.right.pressed) {
    player.lastDirection = "right";
    player.switchSprite("Run");
    player.velocity.x = 2;
    player.shouldPanCameraToTheLeft({ canvas, camera });
  } else if (keys.left.pressed) {
    player.lastDirection = "left";
    player.switchSprite("RunLeft");
    player.velocity.x = -2;
    player.shouldPanCameraToTheRight({ canvas, camera });
  } else if (player.velocity.y === 0) {
    if (player.lastDirection === "right") {
      player.switchSprite("Idle");
    } else {
      player.switchSprite("IdleLeft");
    }
  }

  if (player.velocity.y < 0) {
    player.shouldPanCameraDown({ canvas, camera });
    if (keys.q.pressed) {
      player.switchSprite("Attack1");
    } else if (keys.s.pressed) {
      player.switchSprite("Attack2");
    } else if (keys.d.pressed) {
      player.switchSprite("Attack3");
    } else if (player.lastDirection === "right") {
      player.switchSprite("Jump");
    } else {
      player.switchSprite("JumpLeft");
    }
  } else if (player.velocity.y > 0) {
    player.shouldPanCameraUp({ canvas, camera });
    if (keys.q.pressed) {
      player.switchSprite("Attack1");
    } else if (keys.s.pressed) {
      player.switchSprite("Attack2");
    } else if (keys.d.pressed) {
      player.switchSprite("Attack3");
    } else if (player.lastDirection === "right") {
      player.switchSprite("Fall");
    } else {
      player.switchSprite("FallLeft");
    }
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
      player.velocity.y = -4;
      break;
    case "q":
      keys.q.pressed = true;
      break;
    case "s":
      keys.s.pressed = true;
      break;
    case "d":
      keys.d.pressed = true;
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
    case "q":
      keys.q.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
    default:
      break;
  }
});
