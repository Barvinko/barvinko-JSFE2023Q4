import { Component } from '@components/Component/Component';
import { Spans, ApiUrls } from '@type/enums';
import { CarType, WinnerData } from '@type/type';
import { createSpans } from '@app/utils/createElement';
import { getData } from '@utils/api-functions';

export class ComponentMain extends Component {
  public static _carsData: CarType[];

  public static _winnersData: WinnerData[];

  private _numberPage!: HTMLSpanElement;

  protected replaceElement(newElement: HTMLElement) {
    const oldElement = this._container.querySelector(`.${newElement.className}`);
    if (oldElement) {
      this._container.replaceChild(newElement, oldElement);
      oldElement.remove();
    } else {
      this._container.appendChild(newElement);
    }
  }

  protected async createTitle(container: HTMLElement = this._container): Promise<void> {
    const flag: boolean = this._container.classList.contains('winners');

    const textTitle: string = flag ? 'Winners ' : 'Garage ';

    const title = createSpans(`${container.className}__title`, textTitle, undefined, Spans.H2);

    this.replaceElement(title);

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
  }

  protected setNumberPage(number: number): void {
    this._numberPage.innerText = `${number}`;
  }

  protected getNumberPage(): number {
    return parseInt(this._numberPage.innerText || '0', 10);
  }

  protected createNumberPage(container: HTMLElement = this._container) {
    const pageTitle = createSpans(`${container.className}__page-title`, 'Page #', container, Spans.H3);
    this._numberPage = createSpans(`${container.className}__page-number`, `1`, pageTitle, Spans.SPAN);
  }
}
