'use strict';

const CARROT_SIZE = 90;
const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_DURATION_SEC = 15;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popUp = document.querySelector('.pop-up');
const pupUpRefresh = document.querySelector('.pop-up__refresh');
const popUpMsg = document.querySelector('.pop-up__message');

const carrotSound = new Audio('../sound/carrot_pull.mp3');
const alertSound = new Audio('../sound/alert.wav');
const bugSound = new Audio('../sound/bug_pull.mp3');
const winSound = new Audio('../sound/game_win.mp3');
const bgSound = new Audio('../sound/bg.mp3');


let started = false;
let score = 0;
let timer = undefined;


field.addEventListener('click', onFiledClick);

gameBtn.addEventListener('click', () => {

    if (started) {
        playSound(alertSound);        
        stopGame();
    } else {
        startGame();
    }
    
});

function startGame() {
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();        
    playSound(bgSound);
    
}

function stopGame() {
    started = false;
    stopGameTimer(); 
    hideGameButton();   
    showPopUpWithText('REPLAY?');
    stopSound(bgSound);
    playSound(alertSound);        
}

function finishGame(win) {
    started = false;
    hideGameButton();
    if(win) {
        playSound(winSound);        
    }else {
        playSound(bugSound);
    }
    stopSound(bgSound);
    stopGameTimer(); 
    showPopUpWithText(win ? 'YOU WON!' : 'YOU LOST!');
}




pupUpRefresh.addEventListener('click', () => {
    startGame();
    hiedPopUp();    
});


function showStopButton() {
    const icon = document.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    gameBtn.style.visibility = 'visible';
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameTimer.innerText = '0:0';
    gameScore.style.visibility = 'visible';
    gameScore.innerText = CARROT_COUNT;
}

function startGameTimer() {
    
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);

    timer = setInterval(() => {
               
        if(remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(CARROT_COUNT === score);
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



function stopGameTimer() {
    clearInterval(timer);
}

function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
}

function showPopUpWithText(message) {
    popUp.classList.remove('pop-up--hide');
    popUpMsg.innerText = message;
}

function hiedPopUp() {
    popUp.classList.add('pop-up--hide');
}




// 3. 초기화 함수 : 벌레와 당근 생성 & 필드에 추가
function initGame() {

    score = 0;
    field.innerHTML = '';
    addItem('carrot', CARROT_COUNT, '../img/carrot.png');
    addItem('bug', BUG_COUNT, '../img/bug.png');


}

function onFiledClick(event) {
    const target = event.target;
    const targetClassName = target.className;

    if(!started) {
        return;
    }        

    // if(targetClassName === 'carrot') {        
    //     field.removeChild(target);
    // }

    if(target.matches('.carrot')) {
        
        target.remove();
        score++;
        updateScoreBoard();
        playSound(carrotSound);
        if(score === CARROT_COUNT) {
            finishGame(true);
        }
    }else if (target.matches('.bug')) {        
        finishGame(false);
    }
}

function updateScoreBoard() {
    gameScore.innerText = CARROT_COUNT - score;
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
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

    const fx = fieldRect.width;
    const fy = fieldRect.height;
    const x2 = fx - CARROT_SIZE;
    const y2 = fy - CARROT_SIZE;
    


    // 4-2. 벌레와 당근 생성 추가
    for (let i = 0; i < count; i++) {

        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';

        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);

        // console.log(`x(${x}, y(${y} / x1(${x1}, y1(${y1} / x2(${x2}, y2(${y2}) / fx(${fx}, fy(${fy}))`)

        item.style.left = `${x}px`;
        item.style.top = `${y}px`;

        field.appendChild(item);
    }

}

function randomNumber(min, max) {
    const random = Math.random();
    // console.log(`random(${random}) * (${max} - ${min}) + ${min}`)
    return random * (max - min) + min;
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