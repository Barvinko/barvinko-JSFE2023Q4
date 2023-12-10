const carouselSwap = document.querySelector('#slider_slider_carousel > .slider_slider_carousel_swap')
const controls = document.querySelectorAll('#controls > .control');
const arrows = document.querySelectorAll('.slider_arrow');

console.log(carouselSwap.style);
arrows[0].addEventListener('click', () => {swap('left')});
arrows[1].addEventListener('click', () => {swap('right')});

function swap(direction = 'right') {
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
            fromEnd = key === 2 ? -1 : key;
            break;

        case -1:
            fromEnd = key === 0 ? 3 : key;
            break;

        default:
            break;
    }

    //set rifht for carousel-swap
    carouselSwap.style.right = `${100 * (fromEnd + switchDirection)}%`
    //switch control
    controls[key].classList.remove('control_active');
    controls[fromEnd + switchDirection].classList.add('control_active');
}