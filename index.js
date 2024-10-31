const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
console.log(context);

canvas.width = 1024;
canvas.height = 576;

context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

context.fillStyle = "red";
context.fillRect(200, 100, 100, 100);
