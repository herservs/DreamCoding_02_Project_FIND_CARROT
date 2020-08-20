'use strict';

import PopUp from '../js/popup.js';
import * as sound from '../js/sound.js';
import {
    GameBuiler,
    Reason
} from '../js/game.js';

const GAME_DURATION_SEC = 3;
const CARROT_COUNT = 3;
const BUG_COUNT = 10;


const game = new GameBuiler()
    .gameDuration(3)
    .carrotCount(3)
    .bugCount(3)
    .build();


game.setGameStopListener((reason) => {

    let message;

    switch (reason) {

        default:
            throw new Error('Not valid reason');
            break;

        case Reason.win:
            message = 'YOU WON!';
            sound.playWin();
            break;

        case Reason.lose:
            message = 'YOU LOST!';
            sound.playBug();
            break;

        case Reason.cancel:
            message = 'Replay?';
            sound.playAlert();
            break;
    }

    gameFinishBanner.showUpWithText(message);

});

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
    game.start();
});