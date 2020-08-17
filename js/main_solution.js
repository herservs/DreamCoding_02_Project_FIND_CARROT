'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 10;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

let started = false;
let score = 0;
let timer = undefined;


window.addEventListener('load', ()=> {   
    console.log('load');
});

gameBtn.addEventListener('click', () => {

    if (started) {
        stopGame();
    } else {
        startGame();
    }
    started = !started;
});

function startGame() {
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
}

function showStopButton() {
    const icon = document.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startGameTimer() {
    
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);

    timer = setInterval(() => {
               
        if(remainingTimeSec <= 0) {
            clearInterval(timer);
            return;
        }

        updateTimerText(--remainingTimeSec);        
    }, 1000);
}

function updateTimerText(time) {
    /* Math.floor : 인자 값에 소수점이 있으면 버림을 해주는 함수 */
    const minutes = Math.floor(time / 60) ;
    const seconds = Math.floor(time % 60) ;
    gameTimer.innerText = `${minutes}:${seconds}`;
}

function stopGame() {

}




// 3. 초기화 함수 : 벌레와 당근 생성 & 필드에 추가
function initGame() {


    field.innerHTML = '';
    addItem('carrot', CARROT_COUNT, '../img/carrot.png');
    addItem('bug', BUG_COUNT, '../img/bug.png');

}

// 4. 벌레와 당근 생성 후 추가해주는 함수
function addItem(className, count, imgPath) {

    // 4-1. 필드 요소의 좌표 기준 정하기 (game__field -> absolute, game -> relative)
    const x1 = 0;
    const y1 = 0;

    // const offsetX = imgOffset(imgPath, 'x');
    // const offsetY = imgOffset(imgPath, 'y');
    // const x2 = fieldRect.width - offsetX;
    // const y2 = fieldRect.height - offsetY;
    // console.log(`x = ${offsetX}, y = ${offsetY}`);

    // const img = new Image();
    // img.src = imgPath;
    
    // const x2 = fieldRect.width - img.width;
    // const y2 = fieldRect.height - img.height;

    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;
    


    // 4-2. 벌레와 당근 생성 추가
    for (let i = 0; i < count; i++) {

        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';

        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);

        item.style.left = `${x}px`;
        item.style.top = `${y}px`;

        field.appendChild(item);
    }

}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * DOM 트리에 등록되기까지 시간이 소요되는 작업
 * 
 * @param {*} imgPath 
 * @param {*} axis 
 * 
 */

// function imgOffset(imgPath, axis) {
//     const img = new Image();
//     img.src = imgPath;

//     if (axis === '' || axis === null) {
//         alert('Function error : imgOffset() : Check parameter axis(1)');
//         return 0;
//     }
//     if (axis === 'x' || axis === 'X') {
//         return img.width;
//     } else if (axis === 'y' || axis === 'Y') {
//         return img.height;
//     } else {
//         alert('Function error : imgOffset() : Check parameter axis(2)');
//         return 0;
//     }

// }