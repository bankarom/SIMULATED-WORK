document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        { name: 'fries', img: 'pic/fries.png' },
        { name: 'mole', img: 'pic/mole.jpg' },
        { name: 'hotdog', img: 'pic/hotdog.png' },
        { name: 'ice-cream', img: 'pic/ice-cream.png' },
        { name: 'pizza', img: 'pic/pizza.png' },
        { name: 'white', img: 'pic/white.png' },
        { name: 'milkshake', img: 'pic/milkshake.png' },
        { name: 'cheeseburger', img: 'pic/cheeseburger.png' },
        { name: 'fries', img: 'pic/fries.png' },
        { name: 'mole', img: 'pic/mole.jpg' },
        { name: 'hotdog', img: 'pic/hotdog.png' },
        { name: 'ice-cream', img: 'pic/ice-cream.png' },
        { name: 'pizza', img: 'pic/pizza.png' },
        { name: 'white', img: 'pic/white.png' },
        { name: 'milkshake', img: 'pic/milkshake.png' },
        { name: 'cheeseburger', img: 'pic/cheeseburger.png' }
    ];

    cardArray.sort(() => 0.5 - Math.random());

    const grid = document.querySelector('#grid');
    const resultDisplay = document.querySelector('#result');
    const movesDisplay = document.querySelector('#moves');
    const matchCountDisplay = document.querySelector('#match-count');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let moves = 0;
    let matches = 0;

    function createBoard() {
        cardArray.forEach((item, index) => {
            const goldenBox = document.createElement('div');
            goldenBox.classList.add('golden-box');
            goldenBox.setAttribute('data-id', index);

            const cardImage = document.createElement('img');
            cardImage.setAttribute('src', item.img);
            cardImage.setAttribute('data-id', index);
            goldenBox.appendChild(cardImage);

            goldenBox.addEventListener('click', flipCard);
            grid.appendChild(goldenBox);
        });
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('.golden-box img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        if (optionOneId === optionTwoId) {
            cards[optionOneId].style.display = 'none';
            cards[optionTwoId].style.display = 'none';
        } else if (cardsChosen[0] === cardsChosen[1]) {
            cards[optionOneId].style.display = 'block';
            cards[optionTwoId].style.display = 'block';
            cards[optionOneId].parentElement.removeEventListener('click', flipCard);
            cards[optionTwoId].parentElement.removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
            matches++;
            matchCountDisplay.textContent = `Matches: ${matches}/9`;
            resultDisplay.textContent = `Score: ${matches * 2}`;
        } else {
            setTimeout(() => {
                cards[optionOneId].style.display = 'none';
                cards[optionTwoId].style.display = 'none';
            }, 500);
        }

        cardsChosen = [];
        cardsChosenId = [];
        moves++;
        movesDisplay.textContent = `Moves: ${moves}`;

        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = 'Congratulations! You found them all!';
        }
    }

    function flipCard() {
        const cardId = this.getAttribute('data-id');
        const cardImage = this.querySelector('img');

        if (cardImage.style.display === 'block') {
            return;
        }

        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        cardImage.style.display = 'block';

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    createBoard();
});
