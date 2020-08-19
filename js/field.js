'use strict';

const carrotSound = new Audio('../sound/carrot_pull.mp3');
const CARROT_SIZE = 150;


export default class Field {

    /**
     * 1. 목적 : 
     *  
     */
    constructor(carrotCount, bugCount) {

        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        this.field.addEventListener('click', this.onClick);
    }

    /**
     * 1. 목적 : 필드 부분에서 사용자에게 보여질 당근과 벌레 표시(초기화)     
     * 2. 접근 권한 : public
     * 
     */
    init() {
        this.field.innerHTML = '';
        this._addItem('carrot', this.carrotCount, '../img/carrot.png');
        this._addItem('bug', this.bugCount, '../img/bug.png');
    }

    /**
     * 1. 목적 : field 요소에 당근과 벌레 이미지 추가
     * 2. 접근 권한 : private 
     *  가. 함수명 앞에 _를 넣어 파일에서 사용하지 않는 함수임을 표시
     *      1) javaScript에서는 접근제어자(Access modifier)기능을 제공하지 않음  
     * 3. 사용 위치 : init()  
     */
    _addItem(className, count, imgPath) {

        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - CARROT_SIZE;
        const y2 = this.fieldRect.height - CARROT_SIZE;

        for (let i = 0; i < count; i++) {

            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';

            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);

            item.style.left = `${x}px`;
            item.style.top = `${y}px`;

            this.field.appendChild(item);
        }

    }

    /**
     * 1. 목적 : field 요소의 클릭 이벤트 처리     
     *  가. 처리 :
     *    1) 당근 클릭 : 
     *      가) 당근 이미지 제거
     *      나) 당근 사운드 재생
     */
    onClick(event) {
        const target = event.target;

        if (target.matches('.carrot')) {

            target.remove();
            playSound(carrotSound);
            this.onItemClick && this.onItemClick('carrot');
        } else if (target.matches('.bug')) {
            this.onItemClick && this.onItemClick('bug');
        }
    }
    /**
     * 1. 목적 : field 요소 클릭 시 사용될 콜백 함수 등록
     * 
     */

    setClickListener(onItemClick) {
        this.onItemClick = onItemClick;
    }
}

function randomNumber(min, max) {
    const random = Math.random();
    return random * (max - min) + min;
}


function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}