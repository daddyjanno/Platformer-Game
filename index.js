const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
console.log(context);

canvas.width = 1024;
canvas.height = 576;

let y = 100;
let y2 = 100;

function animate() {
  window.requestAnimationFrame(animate);

  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "red";
  context.fillRect(200, y, 100, 100);
  y += 1;
  context.fillStyle = "red";
  context.fillRect(400, y2, 100, 100);
  y2 += 1;
}
animate();
