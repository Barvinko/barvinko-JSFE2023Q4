const carousel = document.querySelector('#slider_slider_carousel');
const carouselSwap = document.querySelector('#slider_slider_carousel > .slider_slider_carousel_swap')
const controls = document.querySelectorAll('#controls > .control');
const arrows = document.querySelectorAll('.slider_arrow');

arrows[0].addEventListener('click', () => {swap('left')});
arrows[1].addEventListener('click', () => {swap('right')});

let interval;
let startIntervalTime;
let timeLeft = 5000;
function startInterval(time = 5000) {
    clearTimeout(interval);
    startIntervalTime = Date.now()
    interval = setTimeout(() =>{
        swap();
    }, time);
}

function swap(direction = 'right') {
    clearTimeout(interval);
    let key;
    let fromEnd;
    // value for switch direction swap
    let switchDirection = direction === 'right' ? 1 : -1;
    for (let i = 0; i < controls.length; i++) {
        if (controls[i].classList.contains('control_active')) {
            key = i;
            break;
        }
    }

    //fromEnd for swap form start to end, or end to start
    switch (switchDirection) {
        case 1:
            fromEnd = key === controls.length - 1 ? -1 : key;
            break;

        case -1:
            fromEnd = key === 0 ? controls.length : key;
            break;

        default:
            break;
    }

    //set rifht for carousel-swap
    carouselSwap.style.right = `${100 * (fromEnd + switchDirection)}%`
    //switch control
 
    controls[key].classList.remove('control_active');
    controls[fromEnd + switchDirection].classList.add('control_active');
    timeLeft = 5000;
    startInterval();
}

carousel.addEventListener("mouseenter", () => {
    if (navigator.maxTouchPoints) return;

    let controlElement = document.querySelector('.control_active.control');
    controlElement.classList.add("pause");

    timeLeft = timeLeft - (Date.now() - startIntervalTime);
    clearTimeout(interval);
})
carousel.addEventListener("mouseleave", () => {
    if (navigator.maxTouchPoints) return;

    let controlElement = document.querySelector('.control_active.control');
    controlElement.classList.remove("pause");
    startInterval(timeLeft);
})


let isDragging = false;
let startPosX = 0;
let lastPosX = 0;
let currentTranslate = 0;
let prevTranslate = 0;

carousel.addEventListener('touchstart', (event) => {
    if (!navigator.maxTouchPoints) return;

    let controlElement = document.querySelector('.control_active.control');
    controlElement.classList.add("pause");

    timeLeft = timeLeft - (Date.now() - startIntervalTime);
    clearTimeout(interval);

    startPosX = event.touches[0].clientX;
    isDragging = true;

    console.log(startPosX)
});
carousel.addEventListener('touchmove', (event) => {
    lastPosX = event.touches[0].clientX;
});
carousel.addEventListener('touchend', () =>{
    if (!navigator.maxTouchPoints) return;

    let controlElement = document.querySelector('.control_active.control');
    controlElement.classList.remove("pause");
    startInterval(timeLeft);

    if (lastPosX == 0 || Math.abs(startPosX - lastPosX) < 100) return;
    console.log(startPosX,lastPosX)
    switch (lastPosX > startPosX) {
        case true:
            swap('left')
            break;
        case false:
            swap('right')
            break;
    
        default:
            break;
    }
    lastPosX = 0;
});

controls[0].classList.add('control_active')
startInterval()