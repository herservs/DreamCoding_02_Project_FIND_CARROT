'use strict';

import PopUp from '../js/popup.js';
import Field from '../js/field.js';

const CARROT_SIZE = 150;
const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_DURATION_SEC = 15;

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');



const carrotSound = new Audio('../sound/carrot_pull.mp3');
const alertSound = new Audio('../sound/alert.wav');
const bugSound = new Audio('../sound/bug_pull.mp3');
const winSound = new Audio('../sound/game_win.mp3');
const bgSound = new Audio('../sound/bg.mp3');


let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
    startGame();
});



function onItemClick(item) {

    if (!started) {
        return;
    }

    if (item === 'carrot') {
        score++;
        updateScoreBoard();

        if (score === CARROT_COUNT) {
            finishGame(true);
        }

    } else if (target.matches('.bug')) {
        finishGame(false);
    }

}


const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

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
    gameField.init();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    playSound(bgSound);

}

function stopGame() {
    started = false;
    stopGameTimer();
    hideGameButton();
    gameFinishBanner.showUpWithText('REPLAY?');
    stopSound(bgSound);
    playSound(alertSound);
}

function finishGame(win) {
    started = false;
    hideGameButton();
    if (win) {
        playSound(winSound);
    } else {
        playSound(bugSound);
    }
    stopSound(bgSound);
    stopGameTimer();
    gameFinishBanner.showUpWithText(win ? 'YOU WON!' : 'YOU LOST!');
}


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

        if (remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(CARROT_COUNT === score);
            return;
        }

        updateTimerText(--remainingTimeSec);
    }, 1000);
}

function updateTimerText(time) {
    /* Math.floor : 인자 값에 소수점이 있으면 버림을 해주는 함수 */
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    gameTimer.innerText = `${minutes}:${seconds}`;
}



function stopGameTimer() {
    clearInterval(timer);
}

function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
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


function randomNumber(min, max) {
    const random = Math.random();
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