import './index.scss';
import './index.html';
import squareImg from './assets/img/cell/square.svg';
import crossImg from './assets/img/cell/cross.svg';

const container = document.createElement('div');
container.className = 'container';

document.body.appendChild(container);

const header = document.createElement('header');
header.className = 'header';
const main = document.createElement('main');
main.className = 'main';

container.appendChild(header);
container.appendChild(main);

const nonogram1 = {
  picture: [
    ['T', 'F', 'T', 'F', 'T'],
    ['F', 'T', 'F', 'T', 'F'],
    ['T', 'F', 'T', 'F', 'T'],
    ['F', 'T', 'F', 'T', 'F'],
    ['T', 'F', 'T', 'F', 'T'],
  ],
  helpHead: [[2], [1, 1], [3], [1, 1], [2]],
  helpSied: [[1, 1], [1, 1], [3], [1, 1], [2]],
};

function createNonogram(nonogram) {
  const nonogramTable = document.createElement('table');
  nonogramTable.className = 'nonogram';
  main.appendChild(nonogramTable);

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
        cell.innerText = j > 0 ? nonogram.helpHead[j - 1].join('') : '';
      } else if (j == 0 && i > 0) {
        cell.className = 'nonogram__side-help';
        cell.innerText = nonogram.helpSied[i - 1].join(' ');
      } else {
        cell.className = 'nonogram__cell';
        cell.addEventListener("click", clickCell.bind(null, nonogram.picture, cell));
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
  elementImg.src = elementImg.src != squareImg ? squareImg : "";
  checkNonogram(nonogramPicture);
}

function checkNonogram(nonogramPicture) {
  const cellArr = document.querySelectorAll(".nonogram__img");
  const nonogramAnswer = nonogramPicture.flat();
  let flagWin = true;
  for (let i = 0; i < nonogramAnswer.length; i++) {
    if (nonogramAnswer[i] == "T" && cellArr[i].src != squareImg || nonogramAnswer[i] == "F" && cellArr[i].src == squareImg) {
      flagWin = false;
    }
  }
  console.log(flagWin)
}

createNonogram(nonogram1);
