'use strict';

/**
 * 게임 초기화
 */

// 1. 게임 필드 획득
// 2. 게임 필드의 전체 사이즈 정보 획득
const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();


// 3. 초기화 함수 : 벌레와 당근 생성 & 필드에 추가
function initGame() {
    // 3-1. 벌레와 당근 생성 후 추가
    addItem('carrot', 5, '../img/carrot.png');
    addItem('bug', 5, '../img/bug.png');

    // 3-2. 타이머 창, 점수 창 활성화
    const timer = document.querySelector('.game__timer');
    timer.classList.remove('game__timer--hide');

    const score = document.querySelector('.game__score');
    score.classList.remove('game__score--hide');

}

// 4. 벌레와 당근 생성 후 추가해주는 함수
function addItem(className, count, imgPath) {

    // 4-1. 필드 요소의 좌표 기준 정하기 (game__field -> absolute, game -> relative)
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - imgOffset(imgPath, 'x');
    const y2 = fieldRect.height - imgOffset(imgPath, 'Y');

    // 4-2. 벌레와 당근 생성 추가
    for (let i = 0; i < count; i++) {

        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';

        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);

        console.log(`x = ${x}, y = ${y}`);

        item.style.left = `${x}px`;
        item.style.top = `${y}px`;

        field.appendChild(item);
    }
}

function randomNumber(min, max) {
    console.log(`min = ${min}, mas = ${max}`);
    return Math.random() * (max - min) + min;
}

function imgOffset(imgPath, axis) {
    const img = new Image();
    img.src = imgPath;

    // console.log(img);

    if (axis === '' || axis === null) {
        alert('Function error : imgOffset() : Check parameter axis(1)');
        return 0;
    }
    if (axis === 'x' || axis === 'X') {
        console.log(img.width);
        return img.width;
    } else if (axis === 'y' || axis === 'Y') {
        console.log(img.height);
        return img.height;
    } else {
        alert('Function error : imgOffset() : Check parameter axis(2)');
        return 0;
    }
}


/**
 * 게임 동작
 */

// 1. 게임 버튼
const gameBtn = document.querySelector('.game__button');
gameBtn.addEventListener('click', () => {

    initGame();

});



// 자바스크립트 실행
initGame();