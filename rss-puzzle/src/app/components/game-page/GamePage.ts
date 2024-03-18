import { createElement } from '@utils/createElement';
import { LocalStorage } from '@utils/LocalStorage';

export class GamePage {
  private _gameContainer: HTMLDivElement;

  private _closeButton: HTMLButtonElement;

  private _localStorage: LocalStorage;

  constructor(storage: LocalStorage) {
    this._localStorage = storage;

    this._gameContainer = createElement('div', 'container') as HTMLDivElement;

    this._closeButton = createElement('button', 'exit', this._gameContainer) as HTMLButtonElement;
    this._closeButton.innerText = 'Logout';
    this._closeButton.addEventListener('click', () => this._localStorage.deleteFullName());
  }

  public getButton(): HTMLButtonElement {
    return this._closeButton;
  }

  public getStart(): HTMLDivElement {
    return this._gameContainer;
  }
}
