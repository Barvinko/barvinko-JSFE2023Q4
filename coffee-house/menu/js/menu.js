import data from './data.js';

const dataJS = JSON.parse(data);

console.log(dataJS);

const dataUse = {
    coffee: [],
    tea: [],
    dessert: []
}

const dataKey = Object.keys(dataUse);

for (let i = 0; i < dataKey.length; i++) {
    dataUse[dataKey[i]] = dataJS.filter((product) => dataKey[i] == product.category)
}


const menuGrid = document.querySelector('#menu_grid');
const buttonsCategory = document.querySelectorAll('#menu_tab > .menu_tab_tab-item');
buttonsCategory.forEach((tab) => {
    tab.addEventListener('click', () =>{ showProducts(tab)})
})

function showProducts(block = buttonsCategory[0]) {

    //get need name category
    const nameCategoryClick = block.querySelector('span').innerText.toLowerCase();

    const categoryActive = document.querySelector('.menu_tab_tab-item.active');
    if(categoryActive) categoryActive.classList.remove('active');

    block.classList.add('active');

    menuGrid.innerHTML = dataUse[nameCategoryClick].map((product,i) =>
        `<div class="menu_grid_priview">
            <div class="menu_grid_priview-about-img">
                <img class="reduce-img" src="./img/${product.category}/${product.category}-${i + 1}.jpg" alt="${product.name}">
            </div>
            <div class="menu_grid_priview_description">
                <div class="menu_grid_priview_description_info">
                    <h3 class="heading-3">${product.name}</h3>
                    <span class="medium">${product.description}</span>
                </div>
                <h3 class="heading-3">$${product.price}</h3>
            </div>
        </div>`
    ).join('');
}

showProducts()