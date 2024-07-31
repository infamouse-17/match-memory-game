const gameBoard = document.getElementById('game-board');
const message = document.getElementById('message');
const resetButton = document.getElementById('resetButton');

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
const totalPairs = 8;

const symbols = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍋', '🍍', '🍓'];

function initGame() {
  const shuffledSymbols = shuffle([...symbols, ...symbols]);
  gameBoard.innerHTML = '';
  cards = [];

  shuffledSymbols.forEach((symbol, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.symbol = symbol;
    cardElement.dataset.index = index;
    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
    cards.push(cardElement);
  });

  matchedPairs = 0;
  message.textContent = 'Find the matching pairs!';
  resetButton.classList.add('hidden');
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function flipCard() {
  if (flippedCards.length === 2) return;
  if (this.classList.contains('flipped') || this.classList.contains('matched')) return;

  this.classList.add('flipped');
  this.textContent = this.dataset.symbol;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkForMatch();
  }
}

function checkForMatch() {
  const [firstCard, secondCard] = flippedCards;

  if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedPairs++;


    if (matchedPairs === totalPairs) {
      message.textContent = 'Congratulations! You found all pairs!';
      resetButton.classList.remove('hidden');
      
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      firstCard.textContent = '';
      secondCard.classList.remove('flipped');
      secondCard.textContent = '';
    }, 1000);
  }

  flippedCards = [];
}

resetButton.addEventListener('click', initGame);

initGame();
