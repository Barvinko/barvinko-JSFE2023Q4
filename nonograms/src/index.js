import './index.scss';
import './index.html';

import nonogramPaterns from './assets/js/nonogram-paterns';
console.log(nonogramPaterns);
import squareImg from './assets/img/cell/square.svg';
import squareImgWhite from './assets/img/cell/square-white.svg';
import crossImg from './assets/img/cell/cross.svg';

const squareImgCopy = squareImg;
let flagClick;
let flagSave;

function createHelps(nonogram) {
  const help = [];
  for (let i = 0; i < nonogram.length; i++) {
    const nonogramHelp = nonogram[i].join('').split(' ');
    help[i] = [];
    for (let j = 0; j < nonogramHelp.length; j++) {
      if (!nonogramHelp[j]) {
        continue;
      }
      help[i].push(nonogramHelp[j].length);
    }
  }
  return help;
}

function createNonogram(nonogram) {
  //Create Timer
  clearInterval(timer);
  const nonogramTimer = document.querySelector('.nonogram__timer');
  nonogramTimer.innerText = '00:00';
  startTime = false;
  flagSave = true;

  //Create TABLE
  console.log(nonogram);
  const nonogramTable = document.createElement('table');
  nonogramTable.className = 'nonogram';
  const containerOfNonogram = document.querySelector('.article-nonogram');
  containerOfNonogram.replaceChild(
    nonogramTable,
    document.querySelector('.nonogram'),
  );

  //Create helpSied and helpHead
  nonogram.helpSied = createHelps(nonogram.picture);

  const nonagramInvert = [];
  for (let i = 0; i < nonogram.picture.length; i++) {
    nonagramInvert[i] = [];
    for (let j = 0; j < nonogram.picture.length; j++) {
      nonagramInvert[i][j] = nonogram.picture[j][i];
    }
  }

  nonogram.helpHead = createHelps(nonagramInvert);

  //Create layout of nonogram
  let countBorderHead = 1;
  for (
    let i = 0;
    i < nonogram.picture.length + nonogram.picture.length / 5;
    i++
  ) {
    const row = document.createElement('tr');
    if (
      i == 5 * countBorderHead + countBorderHead &&
      countBorderHead < nonogram.picture.length / 5
    ) {
      row.className = 'nonogram__border-head';
      nonogramTable.appendChild(row);
      countBorderHead++;
      continue;
    }
    const helprRowClass = i == 0 ? ' nonogram__row-help' : '';
    row.className = 'nonogram__row' + helprRowClass;
    nonogramTable.appendChild(row);

    let countBorder = 1;
    for (
      let j = 0;
      j < nonogram.picture[0].length + nonogram.picture.length / 5;
      j++
    ) {
      const cell = document.createElement('td');
      //Filling row head-help
      if (i == 0 && j != 5 * countBorder + countBorder) {
        cell.className = 'nonogram__head-help';
        const headHelpContainer = document.createElement('div');
        headHelpContainer.className = 'nonogram__head-help-container';

        cell.appendChild(headHelpContainer);

        headHelpContainer.innerHTML =
          j > 0 ? nonogram.helpHead[j - countBorder].join('<br>') : '';
      } else if (j == 0 && i > 0) {
        cell.className = 'nonogram__side-help';
        cell.innerText = nonogram.helpSied[i - countBorderHead].join(' ');
      } else if (
        j == 5 * countBorder + countBorder &&
        countBorder < nonogram.picture.length / 5
      ) {
        countBorder++;
        cell.className = 'nonogram__border';
      } else {
        cell.className = 'nonogram__cell';
        flagClick = true;
        cell.addEventListener(
          'click',
          clickCell.bind(null, nonogram.picture, cell, nonogram),
        );
        cell.addEventListener('contextmenu', cellRightClick);
        const cellImg = new Image();
        cellImg.className = 'nonogram__img';
        cell.appendChild(cellImg);
      }
      row.appendChild(cell);
    }
  }

  //create buttons
  const nonogramConBut = document.createElement('section');
  nonogramConBut.className = 'nonogram__container-buttons';
  containerOfNonogram.replaceChild(
    nonogramConBut,
    document.querySelector('.nonogram__container-buttons'),
  );

  const nonogramButonsRandom = document.createElement('button');
  nonogramButonsRandom.className = 'nonogram__button nonogram__random-game';
  nonogramButonsRandom.innerText = 'Random';
  nonogramButonsRandom.addEventListener('click', () => {
    randomNonogram(nonogram);
  });
  nonogramConBut.appendChild(nonogramButonsRandom);

  const nonogramButtonRestart = document.createElement('button');
  nonogramButtonRestart.className = 'nonogram__button nonogram__restart';
  nonogramButtonRestart.innerText = 'Restart';
  nonogramButtonRestart.addEventListener('click', () =>
    createNonogram(nonogram),
  );
  nonogramConBut.appendChild(nonogramButtonRestart);

  const nonogramButtonSave = document.createElement('button');
  nonogramButtonSave.className = 'nonogram__button nonogram__save-game';
  nonogramButtonSave.innerText = 'Save';
  nonogramButtonSave.addEventListener('click', () => {
    if (!flagSave) {
      return;
    }
    flagSave = false;

    const imgArr = document.querySelectorAll('.nonogram__img');
    let srcArr = [];
    for (const img of imgArr) {
      srcArr.push(img.src.includes('assets') ? img.src : '');
    }
    const timeEnd = new Date().getTime();
    stopGame('.nonogram__img');
    localStorage.setItem(
      '@Barvinko-Nonograms__save-nonograms',
      JSON.stringify({
        nonogram: nonogram,
        timeText: nonogramTimer.innerHTML,
        time: timeEnd - startTime,
        progress: srcArr,
      }),
    );
  });
  nonogramConBut.appendChild(nonogramButtonSave);

  const nonogramButtonUpload = document.createElement('button');
  nonogramButtonUpload.className = 'nonogram__button nonogram__upload-game';
  nonogramButtonUpload.innerText = 'Upload';
  nonogramButtonUpload.addEventListener('click', uploadNonogram);
  nonogramConBut.appendChild(nonogramButtonUpload);

  const nonogramButtonSolution = document.createElement('button');
  nonogramButtonSolution.className = 'nonogram__button nonogram__solution-game';
  nonogramButtonSolution.innerText = 'Solution';
  nonogramButtonSolution.addEventListener('click', () => {
    stopGame('.nonogram__img');
    const cellArr = document.querySelectorAll('.nonogram__img');
    const nonogramAnswer = nonogram.picture.flat();

    for (let i = 0; i < nonogramAnswer.length; i++) {
      cellArr[i].src = nonogramAnswer[i] == 'X' ? squareImg : '';
    }
  });
  nonogramConBut.appendChild(nonogramButtonSolution);
}

function uploadNonogram() {
  const saveGame = JSON.parse(
    localStorage.getItem('@Barvinko-Nonograms__save-nonograms'),
  );
  const nonogramTimer = document.querySelector('.nonogram__timer');
  console.log(saveGame);
  createNonogram(saveGame.nonogram);
  const cellArr = document.querySelectorAll('.nonogram__img');
  for (let i = 0; i < cellArr.length; i++) {
    cellArr[i].src = saveGame.progress[i] != '' ? saveGame.progress[i] : '';
  }

  nonogramTimer.innerText = saveGame.timeText;
  startTimer(saveGame.time);
}

function clickCell(nonogramPicture, element, name) {
  if (!flagClick) {
    return;
  }

  startTimer();

  const elementImg = element.children[0];
  elementImg.src = elementImg.src != squareImg ? squareImg : '';
  checkNonogram(nonogramPicture, name);
}

function cellRightClick(event) {
  startTimer();
  event.preventDefault();
  const elementImg = event.currentTarget.children[0];
  elementImg.src = elementImg.src != crossImg ? crossImg : '';
}

function checkNonogram(nonogramPicture, nonogram) {
  const cellArr = document.querySelectorAll('.nonogram__img');
  const nonogramAnswer = nonogramPicture.flat();
  let flagWin = true;
  for (let i = 0; i < nonogramAnswer.length; i++) {
    if (
      (nonogramAnswer[i] == 'X' && cellArr[i].src != squareImg) ||
      (nonogramAnswer[i] == ' ' && cellArr[i].src == squareImg)
    ) {
      flagWin = false;
    }
  }

  if (flagWin) {
    const dialogWin = document.querySelector('.dialog-win');
    const nonogramTimer = document.querySelector('.nonogram__timer');
    const dialogWinAnswer = document.querySelector('.dialog-win__answer');
    dialogWin.showModal();

    dialogWinAnswer.innerText = `Great! You have solved the nonogram in ${nonogramTimer.innerText} seconds!`;

    stopGame('.nonogram__img');
    if (!localStorage.getItem('@Barvinko-Nonograms__wins')) {
      localStorage.setItem('@Barvinko-Nonograms__wins', JSON.stringify([]));
    }
    const winArr = JSON.parse(
      localStorage.getItem('@Barvinko-Nonograms__wins'),
    );
    if (winArr.length == 5) {
      winArr.shift();
    }
    winArr.push({
      name: nonogram.name,
      level: nonogram.helpHead.length,
      time: nonogramTimer.innerText,
    });
    localStorage.setItem('@Barvinko-Nonograms__wins', JSON.stringify(winArr));
    showHistory();
  }
}

function stopGame(classImgs = '.nonogram__img') {
  const cellArr = document.querySelectorAll(classImgs);
  cellArr.forEach((img) => {
    img.parentNode.removeEventListener('contextmenu', cellRightClick);
  });

  clearInterval(timer);
  flagClick = false;
}

function displaySwitch(button) {
  const aside = document.querySelector('.switch-nonogram');
  if (button.classList.contains('header__button-aside_active')) {
    button.classList.remove('header__button-aside_active');
    aside.classList.remove('switch-nonogram_active');
    return;
  }
  button.classList.add('header__button-aside_active');
  aside.classList.add('switch-nonogram_active');
}

let timer;
let startTime = false;

function startTimer(oldTime = 0) {
  const nonogramTimer = document.querySelector('.nonogram__timer');

  if (!startTime) {
    startTime = new Date().getTime() - oldTime;
    timer = setInterval(updateTimer, 1000);
  }

  function updateTimer() {
    function padZero(num) {
      return num < 10 ? `0${num}` : num;
    }

    let currentTime = new Date().getTime();
    let elapsedSeconds = Math.floor((currentTime - startTime) / 1000);

    let minutes = Math.floor(elapsedSeconds / 60);
    let seconds = elapsedSeconds % 60;

    // Форматирование времени в XX:XX
    nonogramTimer.innerText = `${padZero(minutes)}:${padZero(seconds)}`;
  }
}

function randomNonogram(nonogram) {
  const randomLevel = Math.floor(Math.random() * nonogramPaterns.length);
  let randomNonogram;
  do {
    console.log('ss');
    randomNonogram = Math.floor(
      Math.random() * nonogramPaterns[randomLevel].length,
    );
  } while (nonogram.name == nonogramPaterns[randomLevel][randomNonogram].name);
  createNonogram(nonogramPaterns[randomLevel][randomNonogram]);
}

function changeBackground(event) {
  const check = document.createElement('div');
  check.innerHTML = '&#9728';
  event.target.innerHTML =
    event.target.innerHTML == check.innerHTML ? '&#9789' : '&#9728';

  const header = document.querySelector('.header');
  const main = document.querySelector('.main');
  const articleNonogram = document.querySelector('.article-nonogram');
  const switchNonogram = document.querySelector('.switch-nonogram');
  const nonogram = document.querySelector('.nonogram');
  const nonogramButton = document.querySelector('.nonogram__button');

  const cellArr = document.querySelectorAll('.nonogram__img');
  if (event.target.innerHTML != check.innerHTML) {
    squareImg = squareImgWhite;
    header.classList.add('header_style-active');
    main.classList.add('main_style-active');
    articleNonogram.classList.add('article-nonogram_style-active');
    switchNonogram.classList.add('switch-nonogram_style-active');
    nonogram.classList.add('nonogram_style-active');
    nonogramButton.classList.add('nonogram__button_style-active');
  } else {
    console.log(squareImgCopy);
    squareImg = squareImgCopy;
    header.classList.remove('header_style-active');
    main.classList.remove('main_style-active');
    articleNonogram.classList.remove('article-nonogram_style-active');
    switchNonogram.classList.remove('switch-nonogram_style-active');
    nonogram.classList.remove('nonogram_style-active');
    nonogramButton.classList.remove('nonogram__button_style-active');
  }
  cellArr.forEach((img) => {
    if (img.src != '' && img.src != crossImg) {
      img.src = squareImg;
    }
  });
}

function showHistory() {
  const topSide = document.querySelector('.top-nonogram');

  const topTable = document.createElement('table');
  topTable.className = 'top-nonogram__table';
  topSide.replaceChild(
    topTable,
    document.querySelector('.top-nonogram__table'),
  );

  const topRowTitle = document.createElement('tr');
  topRowTitle.className = 'top-nonogram__title-row';
  topTable.appendChild(topRowTitle);

  const topNumber = document.createElement('th');
  topNumber.className = 'top-nonogram__number';
  topNumber.innerText = '#';
  topRowTitle.appendChild(topNumber);

  const topName = document.createElement('th');
  topName.className = 'top-nonogram__name';
  topName.innerText = 'Name';
  topRowTitle.appendChild(topName);

  const topLevel = document.createElement('th');
  topLevel.className = 'top-nonogram__level';
  topLevel.innerText = 'Level';
  topRowTitle.appendChild(topLevel);

  const topTime = document.createElement('th');
  topTime.className = 'top-nonogram__time';
  topTime.innerText = 'Time';
  topRowTitle.appendChild(topTime);

  let winArr = JSON.parse(localStorage.getItem('@Barvinko-Nonograms__wins'));

  winArr.sort((a, b) => {
    const timeA =
      parseInt(a.time.split(':')[0]) * 60 + parseInt(a.time.split(':')[1]);
    const timeB =
      parseInt(b.time.split(':')[0]) * 60 + parseInt(b.time.split(':')[1]);
    return timeA - timeB;
  });

  winArr.forEach((win, index) => {
    const row = document.createElement('tr');
    row.className = 'top-nonogram__row';
    topTable.appendChild(row);

    for (let i = 0; i < 4; i++) {
      const column = document.createElement('td');
      column.className = 'top-nonogram__column';
      row.appendChild(column);

      switch (i) {
        case 0:
          column.innerText = index + 1;
          break;
        case 1:
          column.innerText = win.name;
          break;
        case 2:
          column.innerText = `${win.level}x${win.level}`;
          break;
        case 3:
          column.innerText = win.time;
          break;
      }
    }
  });
}

function showTop(event) {
  const top = document.querySelector('.top-nonogram');
  const buttonAsideTop = event.target;

  if (buttonAsideTop.classList.contains('header__button-top_active')) {
    buttonAsideTop.classList.remove('header__button-top_active');
    top.classList.remove('top-nonogram_active');
  } else {
    buttonAsideTop.classList.add('header__button-top_active');
    top.classList.add('top-nonogram_active');
  }

  showHistory();
}

(() => {
  const container = document.createElement('div');
  container.className = 'container';

  document.body.appendChild(container);

  //HEADER
  const header = document.createElement('header');
  header.className = 'header';
  container.appendChild(header);

  const buttonHeadConLeft = document.createElement('div');
  buttonHeadConLeft.className = 'header__head-left';
  header.appendChild(buttonHeadConLeft);

  const buttonAside = document.createElement('button');
  buttonAside.className = 'header__button header__button-aside';
  buttonAside.innerText = 'Choose Nonogram';
  buttonAside.addEventListener('click', () => displaySwitch(buttonAside));
  buttonHeadConLeft.appendChild(buttonAside);

  const buttonAsideTop = document.createElement('button');
  buttonAsideTop.className = 'header__button header__history';
  buttonAsideTop.innerText = 'History';
  buttonAsideTop.addEventListener('click', showTop);
  buttonHeadConLeft.appendChild(buttonAsideTop);

  const buttonBackground = document.createElement('button');
  buttonBackground.className = 'header__button header__button-background';
  buttonBackground.innerHTML = '&#9728';
  buttonBackground.addEventListener('click', changeBackground);
  header.appendChild(buttonBackground);

  //MAIN
  const main = document.createElement('main');
  main.className = 'main';
  container.appendChild(main);

  const sideBar = document.createElement('aside');
  sideBar.className = 'switch-nonogram';
  main.appendChild(sideBar);

  //fill switch-nonogram
  nonogramPaterns.forEach((size, index) => {
    const sizeSector = document.createElement('section');
    sizeSector.className = 'switch-nonogram__section';
    sideBar.appendChild(sizeSector);

    const sizeName = document.createElement('h2');
    sizeName.className = 'switch-nonogram__title';
    sizeName.innerText = `${(index + 1) * 5}x${(index + 1) * 5}`;
    sizeSector.appendChild(sizeName);

    size.forEach((nonogram) => {
      const containerCanvas = document.createElement('div');
      containerCanvas.className = 'switch-nonogram__container';
      containerCanvas.addEventListener('click', () => createNonogram(nonogram));
      containerCanvas.addEventListener('click', () =>
        displaySwitch(buttonAside),
      );
      sizeSector.appendChild(containerCanvas);

      const nonogramCanvas = document.createElement('canvas');
      nonogramCanvas.width = 100;
      nonogramCanvas.height = 100;
      nonogramCanvas.className = 'switch-nonogram__canvas';
      containerCanvas.appendChild(nonogramCanvas);

      const nonogramName = document.createElement('h4');
      nonogramName.className = 'switch-nonogram__name';
      nonogramName.innerText = nonogram.name;
      containerCanvas.appendChild(nonogramName);

      //Paint nonogram
      const ctx = nonogramCanvas.getContext('2d');

      const cellSize = 20 / (index + 1);

      for (let i = 0; i < nonogram.picture.length; i++) {
        for (let j = 0; j < nonogram.picture[i].length; j++) {
          const x = j * cellSize;
          const y = i * cellSize;

          ctx.fillStyle =
            nonogram.picture[i][j] === 'X' ? 'black' : 'rgba(0, 0, 0, 0)';
          ctx.fillRect(x, y, cellSize, cellSize);
        }
      }
    });
  });

  //Top
  const topSide = document.createElement('aside');
  topSide.className = 'top-nonogram';
  main.appendChild(topSide);

  const topTitle = document.createElement('h2');
  topTitle.className = 'top-nonogram__title';
  topTitle.innerText = 'History of wins';
  topSide.appendChild(topTitle);

  const topTable = document.createElement('table');
  topTable.className = 'top-nonogram__table';
  topSide.appendChild(topTable);

  //TABLE
  const nonogramAeticle = document.createElement('article');
  nonogramAeticle.className = 'article-nonogram';
  main.appendChild(nonogramAeticle);

  const nonogramTable = document.createElement('table');
  nonogramTable.className = 'nonogram';
  nonogramAeticle.appendChild(nonogramTable);

  const nonogramTimer = document.createElement('div');
  nonogramTimer.className = 'nonogram__timer';
  nonogramAeticle.appendChild(nonogramTimer);

  // Container of buttons
  const nonogramConBut = document.createElement('section');
  nonogramConBut.className = 'nonogram__container-buttons';
  nonogramAeticle.appendChild(nonogramConBut);

  //DIALOG
  const dialogWin = document.createElement('dialog');
  dialogWin.className = 'dialog-win';
  container.appendChild(dialogWin);

  const dialogWinCasing = document.createElement('div');
  dialogWinCasing.className = 'dialog-win__casing';
  dialogWin.appendChild(dialogWinCasing);

  const dialogWinContainer = document.createElement('div');
  dialogWinContainer.className = 'dialog-win__container';
  dialogWinCasing.appendChild(dialogWinContainer);

  const dialogWinAnswe = document.createElement('h1');
  dialogWinAnswe.className = 'dialog-win__answer';
  dialogWinAnswe.innerHTML = 'Great! You have solved the nonogram!';
  dialogWinContainer.appendChild(dialogWinAnswe);

  const dialogWinButton = document.createElement('button');
  dialogWinButton.className = 'dialog-win__button';
  dialogWinButton.innerText = 'OK';
  dialogWinContainer.appendChild(dialogWinButton);
  dialogWinButton.addEventListener('click', () => dialogWin.close());

  //Output first nonogram
  const startPicture = Math.floor(Math.random() * nonogramPaterns[0].length);
  createNonogram(nonogramPaterns[0][startPicture]);
})();
