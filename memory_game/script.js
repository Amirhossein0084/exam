const restartGame = () => {
    if ('caches' in window) {
        
        caches.keys().then(names => {
            names.forEach(name => caches.delete(name));
        });
    }
    
    window.location.reload();
}


document.querySelector('.restart').addEventListener('click', restartGame);

const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('button'),
    win: document.querySelector('.win')
}

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null,
    canFlip: true 
}

const shuffle = array => {
    const clonedArray = [...array];
    for (let i = clonedArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [clonedArray[i], clonedArray[randomIndex]] = [clonedArray[randomIndex], clonedArray[i]];
    }
    return clonedArray;
}

const pickRandom = (array, items) => {
    const clonedArray = [...array];
    return Array.from({ length: items }, () => clonedArray.splice(Math.floor(Math.random() * clonedArray.length), 1)[0]);
}

const generateGame = () => {
    const dimensions = selectors.board.getAttribute('data-dimension');
    if (dimensions % 2 !== 0) throw new Error("The dimension of the board must be an even number.");

    const emojis = ['😂', '😍', '🤡', '👻', '👺', '🎃', '☠️', '👾', '👽', '😈'];
    const picks = pickRandom(emojis, (dimensions * dimensions) / 2);
    const items = shuffle([...picks, ...picks]);

    const cards = `
        <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${items.map(item => `
                <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back">${item}</div>
                </div>
            `).join('')}
       </div>
    `;
    
    const parser = new DOMParser().parseFromString(cards, 'text/html');
    selectors.board.replaceWith(parser.querySelector('.board'));
}

const startGame = () => {
    state.gameStarted = true;
    selectors.start.classList.add('disabled');

   
    document.querySelectorAll('.card').forEach(card => card.classList.add('flipped'));

    setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => card.classList.remove('flipped'));
        
        state.loop = setInterval(() => {
            state.totalTime++;
            selectors.moves.innerText = `${state.totalFlips} moves`;
            selectors.timer.innerText = `Time: ${state.totalTime} sec`;
        }, 1000);
    }, 5000);
}

const flipCard = card => {
    if (!state.gameStarted || state.loop === null || !state.canFlip || card.classList.contains('flipped')) return;

    state.flippedCards++;
    state.totalFlips++;
    card.classList.add('flipped');

    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.card.flipped:not(.matched)');

        if (flippedCards[0].querySelector('.card-back').innerText === flippedCards[1].querySelector('.card-back').innerText) {
            
            flippedCards[0].classList.add('matched');
            flippedCards[1].classList.add('matched');
            state.flippedCards = 0;
        } else {
           
            state.canFlip = false;
            setTimeout(() => {
                flippedCards[0].classList.remove('flipped');
                flippedCards[1].classList.remove('flipped');
                state.flippedCards = 0;
                state.canFlip = true; 
            }, 1000);
        }
    }

    if (!document.querySelectorAll('.card:not(.matched)').length) {
        setTimeout(() => {
            selectors.boardContainer.classList.add('flipped');
            selectors.win.innerHTML = `
                <span class="win-text">
                    You won!<br />
                    with <span class="highlight">${state.totalFlips}</span> moves<br />
                    under <span class="highlight">${state.totalTime}</span> seconds
                </span>
            `;
            clearInterval(state.loop);
        }, 1000);
    }

    selectors.moves.innerText = `${state.totalFlips} moves`;
}

const attachEventListeners = () => {
    document.addEventListener('click', event => {
        const target = event.target;
        const card = target.parentElement;

        if (card && card.classList.contains('card') && !card.classList.contains('flipped')) {
            flipCard(card);
        } else if (target.nodeName === 'BUTTON' && !target.classList.contains('disabled')) {
            startGame();
        }
    });
}

generateGame();
attachEventListeners();
