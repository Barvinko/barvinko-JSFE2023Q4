import { ComponentMain } from '@components/ComponentMain/ComponentMain';
import { createElement, createTableRow, createDiv, createButton } from '@app/utils/createElement';
import { TypeTableRow, TypeDataSort, ApiUrls, Order } from '@type/enums';
import { ChangeButtons, SortFlags, WinnerData } from '@type/type';
import { getData } from '@utils/api-functions';
import svgCarImport from '@utils/img/car-svg.svg';

export class Winners extends ComponentMain {
  private _headers!: HTMLTableRowElement;

  private _table!: HTMLTableElement;

  private _changeButtons!: ChangeButtons;

  private _sortFlags: SortFlags;

  constructor() {
    super('article', 'article winners');

    this._sortFlags = {
      wins: false,
      time: true,
    };

    this.createTitle().then(() => {
      this.sortWin(TypeDataSort.TIME);
      this.createNumberPage();
      this._table = createElement('table', 'winners__table', this._container) as HTMLTableElement;
      this.createTableHeader();
    });
  }

  private createTableHeader() {
    this._headers = createTableRow('winners__headers', this._table, TypeTableRow.TH);
    const cellsHeader = this._headers.querySelectorAll('th');
    cellsHeader[0].innerText = '#';
    cellsHeader[1].innerText = 'Car';
    cellsHeader[2].innerText = 'Name';

    cellsHeader[3].innerText = `Wins ↕`;
    cellsHeader[3].addEventListener('click', () => {
      this.sortWin(TypeDataSort.WINS);
    });
    cellsHeader[3].style.cursor = 'pointer';

    cellsHeader[4].innerText = 'Best time (s) ↕';
    cellsHeader[4].addEventListener('click', () => {
      this.sortWin(TypeDataSort.TIME);
    });
    cellsHeader[4].style.cursor = 'pointer';
  }

  public createTableRow() {
    const oldRows = this._table.querySelectorAll('.winners__row');
    oldRows.forEach((oldRow) => {
      oldRow.remove();
    });

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

  private async sortWin(typeData: TypeDataSort) {
    const order: Order = this._sortFlags[typeData] ? Order.ASC : Order.DESC;
    this._sortFlags[typeData] = !this._sortFlags[typeData];

    const url = `${ApiUrls.WINNERS}?_sort=${typeData}&_order=${order}`;
    const { data } = await getData<WinnerData[]>(url);

    ComponentMain._winnersData = data as WinnerData[];
    this.createTableRow();
  }

  public createChangeButton(): void {
    const buttonsPage = createDiv('garage__click-page', this._container);
    const pageBack = createButton('button garage__page-back', 'Back', buttonsPage);
    pageBack.addEventListener('click', () => this.changePage('back'));

    const pageNext = createButton('button garage__page-next', 'Next', buttonsPage);
    pageNext.addEventListener('click', () => this.changePage('next'));

    this._changeButtons = {
      back: pageBack,
      next: pageNext,
    };
  }

  private changePage(click: 'back' | 'next'): void {
    let change: number;
    switch (click) {
      case 'back':
        change = -1;
        break;
      case 'next':
        change = 1;
        break;

      default:
        return;
    }
    this.setNumberPage(this.getNumberPage() + change);
    this.createTableRow();
    this.blockChangePage();
  }

  private blockChangePage(): void {
    const page: number = this.getNumberPage();
    const numberCars: number = ComponentMain._winnersData.length;

    if (page === 1) {
      this._changeButtons.back.disabled = true;
    } else {
      this._changeButtons.back.disabled = false;
    }

    if (numberCars <= 7 * page) {
      this._changeButtons.next.disabled = true;
    } else {
      this._changeButtons.next.disabled = false;
    }
  }
}
