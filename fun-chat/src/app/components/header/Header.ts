import { createButton } from '@utils/createElement';

export class Header {
  constructor(drawGarage: () => void, drawWinners: () => void) {
    const toGarage = createButton('button header__button', 'to garage'.toUpperCase(), document.body);
    const toWinners = createButton('button header__button', 'to winners'.toUpperCase(), document.body);

    toGarage.addEventListener('click', drawGarage);
    toWinners.addEventListener('click', drawWinners);
  }
}
