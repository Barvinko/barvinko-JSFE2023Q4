import './index.scss';
import './index.html';

import nonogramPaterns from './assets/js/nonogram-paterns';
console.log(nonogramPaterns);
import squareImg from './assets/img/cell/square.svg';
import crossImg from './assets/img/cell/cross.svg';

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
  console.log(nonogram);
  const nonogramTable = document.createElement('table');
  nonogramTable.className = 'nonogram';
  const containerOfNonogram = document.querySelector(".main");
  containerOfNonogram.appendChild(nonogramTable);

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
  for (let i = 0; i < nonogram.picture.length + 1; i++) {
    const row = document.createElement('tr');
    const helprRowClass = i == 0 ? ' nonogram__row-help' : '';
    row.className = 'nonogram__row' + helprRowClass;
    nonogramTable.appendChild(row);

    for (let j = 0; j < nonogram.picture[0].length + 1; j++) {
      const cell = document.createElement('td');
      //Filling row head-help
      if (i == 0) {
        cell.className = 'nonogram__head-help';
        const headHelpContainer = document.createElement('div');
        headHelpContainer.className = 'nonogram__head-help-container';

        cell.appendChild(headHelpContainer);

        headHelpContainer.innerHTML =
          j > 0 ? nonogram.helpHead[j - 1].join('<br>') : '';
      } else if (j == 0 && i > 0) {
        cell.className = 'nonogram__side-help';
        cell.innerText = nonogram.helpSied[i - 1].join(' ');
      } else {
        cell.className = 'nonogram__cell';
        cell.addEventListener(
          'click',
          clickCell.bind(null, nonogram.picture, cell),
        );
        const cellImg = new Image();
        cellImg.className = 'nonogram__img';
        cell.appendChild(cellImg);
      }
      row.appendChild(cell);
    }
  }
}

function clickCell(nonogramPicture, element) {
  const elementImg = element.children[0];
  elementImg.src = elementImg.src != squareImg ? squareImg : '';
  checkNonogram(nonogramPicture);
}

function checkNonogram(nonogramPicture) {
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
  console.log(flagWin);
}

(() => {
  const container = document.createElement('div');
  container.className = 'container';

  document.body.appendChild(container);

  const header = document.createElement('header');
  header.className = 'header';
  const main = document.createElement('main');
  main.className = 'main';

  container.appendChild(header);
  container.appendChild(main);

  //Output first nonogram
  const startPicture = Math.floor(Math.random() * 5);
  createNonogram(nonogramPaterns[0][startPicture]);
})()
