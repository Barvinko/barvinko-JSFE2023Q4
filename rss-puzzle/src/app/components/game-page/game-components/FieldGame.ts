import '@components/game-page/game-components/field-game';
import { createElement } from '@utils/createElement';

type Rows = {
  rowCurrent: HTMLDivElement;
  rows: HTMLDivElement[];
};

export class FieldGame {
  private _fieldGame: HTMLDivElement;

  private _rows!: Rows;

  constructor() {
    this._fieldGame = createElement('div', 'game__field-game game__container') as HTMLDivElement;
    this.createFieldGame();
  }

  public createFieldGame() {
    const rowsArr: HTMLDivElement[] = [];
    for (let i = 0; i < 10; i += 1) {
      const row = createElement('div', 'game__row', this._fieldGame) as HTMLDivElement;
      row.id = `game__row-${i}`;
      rowsArr.push(row);
    }

    this._rows = {
      rowCurrent: rowsArr[0],
      rows: rowsArr,
    };
  }

  public getFieldGame(): HTMLDivElement {
    return this._fieldGame;
  }

  public getRows(): Rows {
    return this._rows;
  }
}
