'use strict';

import {
    Field,
    ItemType
} from '../js/field.js';
import * as sound from '../js/sound.js';

export const Reason = Object.freeze({
    win: 'win',
    lose: 'lose',
    cancel: 'cancel',
});

// Builder Pattern
export class GameBuiler {

    gameDuration(duration) {
        this.gameDuration = duration;
        return this;
    }

    carrotCount(count) {
        this.carrotCount = count;
        return this;
    }

    bugCount(count) {
        this.bugCount = count;
        return this;
    }

    build() {
        return new Game(
            this.gameDuration, //
            this.carrotCount,
            this.bugCount
        );
    }

}

class Game {

    constructor(gameDuration, carrotCount, bugCount) {

        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;


        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        this.gameBtn = document.querySelector('.game__button');

        this.gameBtn.addEventListener('click', () => {

            if (this.started) {
                this.stop(Reason.cancel);
            } else {
                this.start();
            }

        });

        this.gameField = new Field(carrotCount, bugCount);
        this.gameField.setClickListener(this.onItemClick);
        this.started = false;
        this.timer = undefined;
    }


    setGameStopListener(onGameStop) {
        this.onGameStop = onGameStop;
    }

    start() {
        this.score = 0;
        this.started = true;
        this.gameField.init();
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBackground();

    }

    stop(Reason) {
        this.started = false;
        this.stopGameTimer();
        this.hideGameButton();
        sound.stopBackground();
        this.onGameStop && this.onGameStop(Reason);
    }

    onItemClick = (item) => {

        if (!this.started) {
            return;
        }

        if (item === ItemType.carrot) {
            this.score++;
            this.updateScoreBoard();

            if (this.score === this.carrotCount) {
                this.stop(Reason.win);
            }

        } else if (item === ItemType.bug) {
            this.stop(Reason.lose);
        }
    }


    showStopButton() {
        const icon = document.querySelector('.fas');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameBtn.style.visibility = 'visible';
    }

    showTimerAndScore() {
        this.gameTimer.style.visibility = 'visible';
        this.gameTimer.innerText = '0:0';
        this.gameScore.style.visibility = 'visible';
        this.gameScore.innerText = this.carrotCount;
    }

    startGameTimer() {

        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec);

        this.timer = setInterval(() => {

            if (remainingTimeSec <= 0) {
                clearInterval(this.timer);
                this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose);
                return;
            }

            this.updateTimerText(--remainingTimeSec);
        }, 1000);
    }

    updateTimerText(time) {
        /* Math.floor : 인자 값에 소수점이 있으면 버림을 해주는 함수 */
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        this.gameTimer.innerText = `${minutes}:${seconds}`;
    }

    stopGameTimer() {
        clearInterval(this.timer);
    }

    hideGameButton() {
        this.gameBtn.style.visibility = 'hidden';
    }


    updateScoreBoard() {
        this.gameScore.innerText = this.carrotCount - this.score;
    }


}