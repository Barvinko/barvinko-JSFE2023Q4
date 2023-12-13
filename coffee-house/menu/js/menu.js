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
const buttonOpen = document.querySelector('.menu_open-all-priviews');
buttonOpen.addEventListener('click', openAllProducts)

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

    menuGrid.innerHTML = dataUse[nameCategoryClick].map((product, i) =>
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

    const previewItems = menuGrid.querySelectorAll('.menu_grid_priview');
    previewItems.forEach((product, index) => {
        product.addEventListener('click', () => openModel(nameCategoryClick, index));
    });
    
    if (dataUse[nameCategoryClick].length > 4) {
        console.log(dataUse[nameCategoryClick].length)
        buttonOpen.classList.add('active');
        menuGrid.classList.add('active');
    }else{
        buttonOpen.classList.remove('active');
    }
}

const menuDialog = document.querySelector('#menu_dialog');

function openModel(category, index) {
    document.body.classList.add('hidden');
    console.log(category, index);
    let dataCard = dataUse[category][index];
    menuDialog.innerHTML = `<div class="menu_dialog_around medium">
        <div class="menu_dialog_priview-value">
            <div class="menu_grid_priview-about-img">
                <img class="reduce-img" src="./img/${category}/${category}-${index + 1}.jpg" alt="${dataCard.name}">
            </div>
            <div class="menu_dialog_priview-value_info">
                <div class = "menu_dialog_priview-value_info_head">
                    <h3 class = "heading-3">${dataCard.name}</h3>
                    <span>${dataCard.description}</span>
                </div>
                <div class = "menu_dialog_priview-value_info_choose-component" id="menu_dialog_priview-value_info_choose-size">
                    <span>Size</span>
                    <div class = "menu_dialog_priview-value_info_tabs link-button">
                        <div class = "tab-item active">
                            <span class = "icon">S</span>${dataCard.sizes.s.size}
                        </div>
                        <div class = "tab-item">
                            <span class = "icon">M</span>${dataCard.sizes.m.size}
                        </div>
                        <div class = "tab-item">
                            <span class = "icon">L</span>${dataCard.sizes.l.size}
                        </div>
                    </div>
                </div>
                <div class = "menu_dialog_priview-value_info_choose-component" id = "menu_dialog_priview-value_info_choose-additives">
                    <span>Additives</span>
                    <div class = "menu_dialog_priview-value_info_tabs link-button">
                        <div class = "tab-item">
                            <span class = "icon">1</span>${dataCard.additives[0].name}
                        </div>
                        <div class = "tab-item">
                            <span class = "icon">2</span>${dataCard.additives[1].name}
                        </div>
                        <div class = "tab-item">
                            <span class = "icon">3</span>${dataCard.additives[2].name}
                        </div>
                    </div>
                </div>
                <div class = "menu_dialog_priview-value_info_price">
                    <h3 class = "heading-3">Total:</h3>
                    <h3 class = "heading-3">$<span id = "fullPrice">${dataCard.price}</span></h3>
                </div>
                <div class = "menu_dialog_priview-value_info_warning">
                    <img src="./img/info-empty.png" alt="info-empty">
                    <span class = "caption">
                        The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.
                    </span>
                </div>
                <button class = "dialogClose link-button">Close</button>
            </div>
        </div>
    </div>`;

    const buttonDialogClose = menuDialog.querySelector('.dialogClose');
    buttonDialogClose.addEventListener('click', () => {
        document.body.classList.remove('hidden');
        menuDialog.close();
    })

    const dialogAround = menuDialog.querySelector('.menu_dialog_around');
    dialogAround.addEventListener('click', (event) => {
        if (event.target.classList.contains('menu_dialog_around')) {
            document.body.classList.remove('hidden');
            menuDialog.close();
        }
    })
    

    const menuDialogSizeTabs = menuDialog.querySelectorAll('#menu_dialog_priview-value_info_choose-size .tab-item');
    menuDialogSizeTabs.forEach((tabSize, indexTab) => {
        tabSize.addEventListener('click',() => changeSize(tabSize, indexTab, index, category))
        console.log(tabSize)
    })
    const menuDialogAdditivesTabs = menuDialog.querySelectorAll('#menu_dialog_priview-value_info_choose-additives .tab-item');
    console.log(menuDialogAdditivesTabs)
    menuDialogAdditivesTabs.forEach((tabAdditives, indexTab) => {
        tabAdditives.addEventListener('click',() => changeAdditives(tabAdditives, indexTab, index, category))
    })
    menuDialog.show()
}

function changeAdditives(block, indexTab, index, category) {
    console.log(block, index, category);

    const dataCard = dataUse[category][index];
    const fullPrice = document.querySelector('#fullPrice');
    let price = Number(fullPrice.innerText);

    console.log(dataCard.additives[indexTab])

    if (block.classList.contains("active")) {
        block.classList.remove('active');
        price -= Number(dataCard.additives[indexTab]['add-price']);
    }else{
        block.classList.add('active');
        price += Number(dataCard.additives[indexTab]['add-price']);
    }

    fullPrice.innerText = price.toFixed(2);
}


function changeSize (block, indexTab, index, category) {
    console.log(block, index, category)
    if (block.classList.contains("active")) {
        console.log("change no need")
        return;
    }
    const dataCard = dataUse[category][index];
    const fullPrice = document.querySelector('#fullPrice');
    const activeTab = document.querySelectorAll('#menu_dialog_priview-value_info_choose-size .tab-item');
    // console.log(activeTab)
    let indexTabOld
    for (let i = 0; i < activeTab.length; i++) {
        if (activeTab[i].classList.contains("active")) {
            activeTab[i].classList.remove('active');

            switch (i) {
                case 0:
                    indexTabOld = 's'
                    break;
                case 1:
                    indexTabOld = 'm'
                    break;
                case 2:
                    indexTabOld = 'l'
                    break;
            
                default:
                    break;
            }
            break
        }
    }

    switch (indexTab) {
        case 0:
            indexTab = 's'
            break;
        case 1:
            indexTab = 'm'
            break;
        case 2:
            indexTab = 'l'
            break;
    
        default:
            break;
    }

    let price = Number(fullPrice.innerText);

    // console.log(price)

    price -= Number(dataCard.sizes[indexTabOld]['add-price']);

    price += Number(dataCard.sizes[indexTab]['add-price']);

    fullPrice.innerText = price.toFixed(2);

    block.classList.add('active');
}

function openAllProducts() {
    menuGrid.classList.remove('active');
    buttonOpen.classList.remove('active');
}

menuDialog.close()
showProducts()