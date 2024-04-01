import { Component } from '@components/Component/Component';
import { Spans, ApiUrls } from '@type/enums';
import { CarType, WinnerData } from '@type/type';
import { createSpans } from '@app/utils/createElement';
import { getData } from '@utils/getData';

export class ComponentMain extends Component {
  protected static _carsData: CarType[];

  protected static _winnersData: WinnerData[];

  private _numberPage!: HTMLSpanElement;

  protected async createTitle(container: HTMLElement = this._container) {
    const flag: boolean = this._container.classList.contains('winners');

    const textTitle: string = flag ? 'Winners ' : 'Garage ';

    const title = createSpans(`${container.className}__title`, textTitle, container, Spans.H2);

    const { WINNERS, GARAGE } = ApiUrls;
    const url = flag ? WINNERS : GARAGE;
    const { data } = await getData<CarType[] | WinnerData[]>(url);

    if (flag) {
      ComponentMain._winnersData = data as WinnerData[];
    } else {
      ComponentMain._carsData = data as CarType[];
    }

    const carsNumber: string = data.length.toString();
    createSpans(`${container.className}__number`, `(${carsNumber})`, title, Spans.SPAN);

    this.createNumberPage(container);
  }

  protected setNumberPage(number: number): void {
    this._numberPage.innerText = `${number}`;
  }

  protected getNumberPage(): number {
    return parseInt(this._numberPage.innerText || '0', 10);
  }

  private createNumberPage(container: HTMLElement = this._container) {
    const pageTitle = createSpans(`${container.className}__page-title`, 'Page #', container, Spans.H3);
    this._numberPage = createSpans(`${container.className}__page-number`, `1`, pageTitle, Spans.SPAN);
  }
}
