import { createElement } from '@utils/createElement';

export class StartPage {
  private _startContainer: HTMLDivElement;

  private _buttonStart: HTMLButtonElement;

  constructor() {
    this._startContainer = createElement('div', 'container start') as HTMLDivElement;

    const containerElement = createElement('div', 'start__container', this._startContainer) as HTMLDivElement;

    const title = createElement('h1', 'start__game-name', containerElement) as HTMLHeadingElement;
    title.innerText = 'english puzzle'.toUpperCase();

    const textAbout = createElement('span', 'start__text', containerElement) as HTMLSpanElement;
    textAbout.innerText = 'Click on words, collect phrases\nWords can be drag and drop. Select toolips in the menu';

    this._buttonStart = createElement('button', 'start__button', containerElement) as HTMLButtonElement;
    this._buttonStart.innerText = 'Start';
  }

  public getButton(): HTMLButtonElement {
    return this._buttonStart;
  }

  public getStart() {
    return this._startContainer;
  }
}
