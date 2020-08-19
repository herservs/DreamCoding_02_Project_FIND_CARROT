'use strict';

import PopUp from '../js/popup.js';
import Field from '../js/field.js';
import * as sound from '../js/sound.js';

const CARROT_SIZE = 150;
const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_DURATION_SEC = 15;

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');






let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
    startGame();
});



// function onItemClick(item) {

//     if (!started) {
//         return;
//     }

//     if (item === 'carrot') {
//         score++;
//         updateScoreBoard();

//         if (score === CARROT_COUNT) {
//             finishGame(true);
//         }

//     } else if (item === 'bug') {
//         finishGame(false);
//     }

// }

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

    } else if (item === 'bug') {
        finishGame(false);
    }

}


const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

gameBtn.addEventListener('click', () => {

    if (started) {
        sound.playAlert();
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
    sound.playBackground();

}

function stopGame() {
    started = false;
    stopGameTimer();
    hideGameButton();
    gameFinishBanner.showUpWithText('REPLAY?');
    sound.stopBackground();
    sound.playAlert();
}

function finishGame(win) {
    started = false;
    hideGameButton();
    if (win) {
        sound.playWin();
    } else {
        sound.playBug();
    }
    sound.stopBackground();
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