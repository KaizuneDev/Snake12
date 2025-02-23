const gameBoard = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
const boardSize = 300;  // dimensione del gioco
const unitSize = 10;  // dimensione di ogni unità

let snake = [{ x: 150, y: 150 }];
let direction = { x: 10, y: 0 };
let food = generateFood();
let score = 0;
let gameInterval;

function createSnake() {
    gameBoard.innerHTML = ''; // Pulisce la board
    snake.forEach(segment => {
        const snakeSegment = document.createElement('div');
        snakeSegment.classList.add('snake');
        snakeSegment.style.width = unitSize + 'px';
        snakeSegment.style.height = unitSize + 'px';
        snakeSegment.style.left = segment.x + 'px';
        snakeSegment.style.top = segment.y + 'px';
        gameBoard.appendChild(snakeSegment);
    });
}

function generateFood() {
    const x = Math.floor(Math.random() * (boardSize / unitSize)) * unitSize;
    const y = Math.floor(Math.random() * (boardSize / unitSize)) * unitSize;
    return { x, y };
}

function createFood() {
    const foodElement = document.createElement('div');
    foodElement.classList.add('food');
    foodElement.style.width = unitSize + 'px';
    foodElement.style.height = unitSize + 'px';
    foodElement.style.left = food.x + 'px';
    foodElement.style.top = food.y + 'px';
    gameBoard.appendChild(foodElement);
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    
    if (head.x >= boardSize) head.x = 0;
    if (head.y >= boardSize) head.y = 0;
    if (head.x < 0) head.x = boardSize - unitSize;
    if (head.y < 0) head.y = boardSize - unitSize;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        food = generateFood();
        createFood();
    } else {
        snake.pop();
    }

    createSnake();
    scoreElement.textContent = score;
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -unitSize };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: unitSize };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -unitSize, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: unitSize, y: 0 };
            break;
    }
}

function startGame() {
    gameInterval = setInterval(() => {
        moveSnake();
    }, 100);
}

function stopGame() {
    clearInterval(gameInterval);
}

document.addEventListener('keydown', changeDirection);
startGame();
