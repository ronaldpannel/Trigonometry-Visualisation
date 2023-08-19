/**@type{HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;

const A = { x: 0, y: 0 };
const B = { x: 90, y: 120 };
const C = { x: B.x, y: 0 };

const offset = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};

ctx.translate(offset.x, offset.y);
const bOffset = canvas.getBoundingClientRect();

document.onpointermove = (e) => {
  B.x = e.x - offset.x - bOffset.left;
  B.y = e.y - offset.y - bOffset.top;

  C.x = B.x;
  update();
};

update();
function update() {
  ctx.clearRect(-offset.x, -offset.y, canvas.width, canvas.height);
  const c = distance(A, B);
  const a = distance(B, C);
  const b = distance(A, C);

  const sin = a / c;
  const cos = b / c;
  const tan = sin / cos; // a/b
  const theta = Math.asin(sin);

  drawLine(A, B);
  drawText("c", average(A, B));
  drawLine(A, C, 'blue');
  drawText("b", average(A, C), 'blue');
  drawLine(B, C, 'red');
  drawText("a", average(C, B), 'red');

  drawText("0", A);

  drawText("sin = a/c =" + sin.toFixed(2), {
    x: -offset.x / 2,
    y: offset.y * 0.7
  }, 'red');

  drawText("cos = b/c =" + cos.toFixed(2), {
    x: -offset.x / 2,
    y: offset.y * 0.8,
  }, 'blue');

  drawText("tan = a/b =" + tan.toFixed(2), {
    x: -offset.x / 2,
    y: offset.y * 0.9
  }, 'magenta');
  drawText(
    "0 = " +
      theta.toFixed(2) +
      " rad (" +
      Math.round(toDeg(theta)).toString().padStart(2, " ") +
      " deg)",
    { x: offset.x / 2, y: offset.y * 0.7 }
  );

  drawText('a = opposite',{x:-offset.x/2, y:-offset.y*0.9})
  drawText('b = adjacent',{x:-offset.x/2, y:-offset.y*0.8})
  drawText('c = hypotenuse',{x:-offset.x/2 + 10, y:-offset.y*0.7})
  drawText('0 = theta',{x:-offset.x/2 -18, y:-offset.y*0.6})

  // drawPoint(A);
  // drawText("A", A);
  // drawPoint(B);
  // drawText("B", B);
  // drawPoint(C);
  // drawText("C", C);

  drawCoordinates(offset);
  ctx.beginPath();
  ctx.strokeStyle = " black";
  ctx.lineWidth = 2;
  const start = B.x > A.x ? 0 : Math.PI;
  const clockwise = (B.y < C.y) ^ (B.x > A.x);
  let end = B.y < C.y ? -theta : theta;
  if (B.x < A.x) {
    end = Math.PI - end;
  }
  ctx.arc(0, 0, 20, start, end, !clockwise);
  ctx.stroke();
}

function average(p1, p2) {
  return {
    x: (p1.x + p2.x) / 2,
    y: p1.y + p2.y / 2,
  };
}

function distance(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

function toDeg(rad) {
  return (rad * 180) / Math.PI;
}

function drawText(text, loc, color = "black") {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 18px Courier";
  ctx.strokeStyle = "white";
  ctx.lineWidth = 10;
  ctx.strokeText(text, loc.x, loc.y);
  ctx.fillText(text, loc.x, loc.y);
}

function drawPoint(loc, size = 20, color = "black") {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(loc.x, loc.y, size / 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawLine(p1, p2, color = "black") {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}

function drawCoordinates(offset) {
  ctx.beginPath();
  ctx.moveTo(-offset.x, 0);
  ctx.lineTo(canvas.width - offset.x, 0);
  ctx.moveTo(0, -offset.y);
  ctx.lineTo(0, canvas.height - offset.y);
  ctx.setLineDash([4, 2]);
  ctx.strokeStyle = "grey";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.setLineDash([]);
}
drawCoordinates(offset);
drawLine(A, B);
drawLine(A, C);
drawLine(B, C);
