'use strict';

// 1. 게임 필드 획득
const field = document.querySelector('.game__field');
// 2. 게임 필드의 전체 사이즈 정보 획득
const fieldRect = field.getBoundingClientRect();

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');


// 3. 초기화 함수 : 벌레와 당근 생성 & 필드에 추가
function initGame() {

    // 3-1. 벌레와 당근 생성 후 추가
    addItem('carrot', 5, '../img/carrot.png');
    addItem('bug', 5, '../img/bug.png');

    // 3-2. score 창 초기화
    initScore();

    // 3-3. timer 창 초기화 및 카운트 동작
    initTimer();


}

function initTimer() {
    let time = 10;
    let min = '';
    let sec = '';

    let itId = setInterval(() => {

        min = parseInt(time / 60);
        sec = time % 60;

        gameTimer.innerHTML = `${min}:${sec}`;
        time--;

        if (time < 0) {
            clearInterval(itId);
        }
    }, 1000);
}

// 4. 벌레와 당근 생성 후 추가해주는 함수
function addItem(className, count, imgPath) {

    // 4-1. 필드 요소의 좌표 기준 정하기 (game__field -> absolute, game -> relative)
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - imgOffset(imgPath, 'x');
    const y2 = fieldRect.height - imgOffset(imgPath, 'Y');

    console.log(`field x2 = ${x2}, field y2 = ${y2}`);

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
        console.log(`item x = ${x}, item y = ${y}`);
        field.appendChild(item);
    }

}

function initScore() {
    const carrotCnt = getCarrotCount();
    gameScore.innerHTML = `${carrotCnt}`
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function imgOffset(imgPath, axis) {
    const img = new Image();
    img.src = imgPath;

    if (axis === '' || axis === null) {
        alert('Function error : imgOffset() : Check parameter axis(1)');
        return 0;
    }
    if (axis === 'x' || axis === 'X') {
        return img.width;
    } else if (axis === 'y' || axis === 'Y') {
        return img.height;
    } else {
        alert('Function error : imgOffset() : Check parameter axis(2)');
        return 0;
    }
}

/**
 *  동작
 */




// 플레이 버튼 동작
gameBtn.addEventListener('click', () => {
    initGame();
    gameTimer.classList.remove('game__timer--hide');
    gameScore.classList.remove('game__score--hide');

});

function getCarrotCount() {
    const carrots = document.querySelectorAll('.carrot');
    return carrots.length;
}

// 당근 이미지 클릭 동작
field.addEventListener('click', (e) => {

    const childClassName = e.target.className;

    if (!(childClassName === 'carrot' || childClassName === 'bug')) {
        return;
    }

    if (childClassName === 'carrot') {
        field.removeChild(e.target);
        initScore();
        return;
    }

    if (childClassName === 'bug') {
        return;
    }
});