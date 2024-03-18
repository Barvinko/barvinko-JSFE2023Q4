import '@components/start-page/start-style.scss';
import { createElement } from '@utils/createElement';
import { LocalStorage, FullName } from '@utils/LocalStorage';

export class StartPage {
  private _startContainer: HTMLDivElement;

  private _buttonStart: HTMLButtonElement;

  private _localStorage: LocalStorage;

  constructor(storage: LocalStorage) {
    this._localStorage = storage;
    this._startContainer = createElement('div', 'container start') as HTMLDivElement;

    const containerElement = createElement('div', 'start__container', this._startContainer) as HTMLDivElement;

    const title = createElement('h1', 'start__game-name', containerElement) as HTMLHeadingElement;
    title.innerText = 'english puzzle'.toUpperCase();

    const greeting = createElement('h2', 'start__greeting', containerElement) as HTMLHeadingElement;
    const fullName: FullName | null = this._localStorage.getFullName();
    greeting.innerText = `Hello ${fullName?.name} ${fullName?.surname}!`;

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
