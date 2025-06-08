const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = 0;
let dy = 0;
let score = 0;

function drawGame() {
  moveSnake();
  if (checkCollision()) {
    alert("Game Over! Your score: " + score);
    document.location.reload();
  }

  if (snake[0].x === food.x && snake[0].y === food.y) {
    snake.push({ ...snake[snake.length - 1] });
    score++;
    placeFood();
  }

  drawBackground();
  drawFood();
  drawSnake();
  setTimeout(drawGame, 200);
}

function drawBackground() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "#0f0";
  for (let i = 0; i < snake.length; i++) {
    let part = snake[i];
    ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);

    // Draw face on the head
    if (i === 0) {
      ctx.fillStyle = "black";
      let eyeSize = 3;
      ctx.beginPath();
      ctx.arc(part.x * gridSize + 5, part.y * gridSize + 5, eyeSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(part.x * gridSize + 13, part.y * gridSize + 5, eyeSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#0f0";
    }
  }
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  snake.pop();
}

function checkCollision() {
  const head = snake[0];
  if (head.x < 0 || head.y < 0 || head.x >= tileCount || head.y >= tileCount) return true;
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) return true;
  }
  return false;
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount),
  };
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && dy === 0) {
    dx = 0; dy = -1;
  } else if (e.key === "ArrowDown" && dy === 0) {
    dx = 0; dy = 1;
  } else if (e.key === "ArrowLeft" && dx === 0) {
    dx = -1; dy = 0;
  } else if (e.key === "ArrowRight" && dx === 0) {
    dx = 1; dy = 0;
  }
});

drawGame();
