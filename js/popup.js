'use strict';

/**
 * export : 외부에서 클래스를 사용가능하도록 하는 키워드
 * 외부에서는 import PopUp from 'PopUp 클래스 파일 경로' 를 선언하여 사용
 *  => import PopUp from '../js/popup.js';
 */
export default class PopUp {

    constructor() {

        this.popUp = document.querySelector('.pop-up');
        this.popUpRefresh = document.querySelector('.pop-up__refresh');
        this.popUpMsg = document.querySelector('.pop-up__message');

        this.popUpRefresh.addEventListener('click', () => {
            this.onClick && this.onClick();
            this.hide();
        });
    }

    setClickListener(onClick) {
        this.onClick = onClick;
    }

    showUpWithText(message) {
        this.popUp.classList.remove('pop-up--hide');
        this.popUpMsg.innerText = message;
    }

    hide() {
        this.popUp.classList.add('pop-up--hide');
    }




}