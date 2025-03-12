const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 22;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
let score = 0;
let current_state = Object.freeze({
  NORMAL: snake.fillStyle = "00ff00",
  GHOST: "Ghost",
  MURDER: "Murder",
  FASTER: "Faster"
});

function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100);
    
}

function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    // Controlla collisioni con i bordi
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        resetGame();
        return;
    }

    // Controlla collisioni con il corpo
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        resetGame();
        return;
    }

    snake.unshift(head);
    snake.current_state.NORMAL;
    // Controlla se il serpente mangia il cibo
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
    } else {
        snake.pop();
    }
    // Check if snake is not touch apple
    if (!head.x !== food.x || head.y !== food.y){
      score = 0;
      food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
    }
}

function draw() {
    // Sfondo
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Serpente
    ctx.fillStyle = '#00ff00';
    snake.forEach(segment => ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize));

    // Cibo
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    // Punteggio
    ctx.fillStyle = '#fff';
    ctx.font = '20px "Press Start 2P"';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
}

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            if (direction.x === 0) direction = { x: -0.99, y: 0 };
            break;
        case 'ArrowRight':
          case 'd':
          case 'D':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
        
    }
    
});
gameLoop(); 
