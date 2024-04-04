import { ComponentMain } from '@components/ComponentMain/ComponentMain';
import { createElement, createTableRow } from '@app/utils/createElement';
import { TypeTableRow } from '@type/enums';
import svgCarImport from '@utils/img/car-svg.svg';

export class Winners extends ComponentMain {
  private _headers!: HTMLTableRowElement;

  private _table!: HTMLTableElement;

  constructor() {
    super('article', 'article winners');

    this.createTitle().then(() => {
      this.createNumberPage();
      this._table = createElement('table', 'winners__table', this._container) as HTMLTableElement;
      this.createTableHeader();
      this.createTableRow();
    });
  }

  private createTableHeader() {
    this._headers = createTableRow('winners__headers', this._table, TypeTableRow.TH);
    const cellsHeader = this._headers.querySelectorAll('th');
    cellsHeader[0].innerText = '#';
    cellsHeader[1].innerText = 'Car';
    cellsHeader[2].innerText = 'Name';
    cellsHeader[3].innerText = 'Wins';
    cellsHeader[4].innerText = 'Best time (s)';
  }

  private createTableRow() {
    let i: number = (this.getNumberPage() - 1) * 10;
    let endIndex: number = i + 10;
    if (endIndex > ComponentMain._winnersData.length) endIndex += ComponentMain._winnersData.length - endIndex;

    for (i; i < endIndex; i += 1) {
      const { id } = Winners._winnersData[i];
      const index: number = Winners._carsData.findIndex((car) => car.id === id);

      this._headers = createTableRow('winners__row', this._table);
      const cellsRow = this._headers.querySelectorAll('td');
      cellsRow[0].innerText = `${i + 1}`;

      cellsRow[1].innerHTML = svgCarImport;
      const carSvg = cellsRow[1].querySelector('svg') as SVGElement;
      carSvg.classList.add('winners__car-svg');
      carSvg.setAttribute('fill', Winners._carsData[index].color);

      cellsRow[2].innerText = Winners._carsData[index].name;
      cellsRow[3].innerText = `${Winners._winnersData[i].wins}`;
      cellsRow[4].innerText = `${Winners._winnersData[i].time}`;
    }
  }
}
