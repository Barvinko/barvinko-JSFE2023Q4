const buttonHeader = document.querySelector('.header_menu_head_open');
buttonHeader.addEventListener('click', menu);

let selectorButtons = '.nav > .link-button, .header_menu_head_logo';
if (!window.location.href.includes('menu.html')) {
    selectorButtons += ', #header_menu_span-menu' 
}

let linkButtons = document.querySelectorAll(selectorButtons);

window.addEventListener('resize', () => {
    let windowWith = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(buttonHeader.classList.contains('active') && windowWith > 768) menu();
})

console.log(window)

function menu() {
    const menuBurger = document.querySelector('.header_menu_burger');
    const container = document.querySelector('.container');
    if (!buttonHeader.classList.contains('active')) {
        buttonHeader.classList.add('active');
        menuBurger.classList.add('active');
        container.classList.add('active');

        linkButtons.forEach(linlButton => {
            linlButton.addEventListener('click', menu)
        })
    }else{
        buttonHeader.classList.remove('active');
        menuBurger.classList.remove('active');
        container.classList.remove('active');

        linkButtons.forEach(linlButton => {
            linlButton.removeEventListener('click', menu)
        })
    }
}