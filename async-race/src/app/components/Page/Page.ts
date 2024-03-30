import { Spans, ApiUrls } from '@type/enums';
import { Car, WinnerData } from '@type/type';
import { createElement, createSpans } from '@app/utils/createElement';
import { getData } from '@utils/getData';

export class Page {
  protected readonly _container: HTMLElement;

  protected _pageData!: Car[] | WinnerData[];

  constructor(tag: string, className: string, containerTitle?: HTMLElement) {
    this._container = createElement(tag, className);
    this.createTitle(containerTitle);
    this.createNumberPage(containerTitle);
  }

  public getContainer(): HTMLElement {
    return this._container;
  }

  private async createTitle(container: HTMLElement = this._container) {
    const flag: boolean = this._container.classList.contains('winners');

    const textTitle: string = flag ? 'Winners ' : 'Garage ';

    const title = createSpans(`${container.className}__title`, textTitle, container, Spans.H2);

    const { WINNERS, GARAGE } = ApiUrls;
    const url = flag ? WINNERS : GARAGE;
    const { data } = await getData<Car[] | WinnerData[]>(url);

    this._pageData = flag ? (data as Car[]) : (data as WinnerData[]);

    const carsNumber: string = data.length.toString();
    createSpans(`${container.className}__number`, `(${carsNumber})`, title, Spans.SPAN);
  }

  private createNumberPage(container: HTMLElement = this._container) {
    const pageTitle = createSpans(`${container.className}__page-title`, 'Page #', container, Spans.H3);
    createSpans(`${container.className}__page-number`, `1`, pageTitle, Spans.SPAN);
  }
}
