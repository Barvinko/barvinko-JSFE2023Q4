import '@components/game-page/game-components/field-game';
import { createElement } from '@utils/createElement';

type Rows = {
  rowCurrent: HTMLDivElement;
  rows: HTMLDivElement[];
};

export class FieldGame {
  private _fieldGame: HTMLDivElement;

  private _rows!: Rows;

  private _rowNumber: number;

  constructor() {
    this._fieldGame = createElement('div', 'game__field-game game__container') as HTMLDivElement;
    this._rowNumber = 0;
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

  public getRows(): HTMLDivElement[] {
    return this._rows.rows;
  }

  public getCurrentRow(): HTMLDivElement {
    return this._rows.rowCurrent;
  }

  public getNumberCurrent(): number {
    return this._rowNumber;
  }

  public incrementCurrent() {
    this._rowNumber += 1;
    this._rows.rowCurrent = this._rows.rows[this._rowNumber];
  }
}
