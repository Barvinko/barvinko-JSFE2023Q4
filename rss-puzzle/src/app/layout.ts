import { SignIn } from '@components/signIn/SignIn';
import { StartPage } from '@components/start-page/StartPage';
import { GamePage } from '@components/game-page/GamePage';
import { LocalStorage } from '@utils/LocalStorage';

export class Layout {
  private _bodyLink: HTMLBodyElement;

  private _signIn: SignIn;

  private _startPage: StartPage;

  private _gamePage: GamePage;

  private _localStorage: LocalStorage;

  constructor() {
    this._bodyLink = document.body as HTMLBodyElement;
    this._localStorage = new LocalStorage();

    this._signIn = new SignIn(this._localStorage);
    this._startPage = new StartPage(this._localStorage);
    this._gamePage = new GamePage(this._localStorage);

    this._signIn.getForm().addEventListener('submit', (event: Event) => {
      event.preventDefault();
      this._signIn.enter();
      this.draw(this._startPage.getStart());
    });

    this._startPage.getButton().addEventListener('click', () => this.draw(this._gamePage.getStart()));

    this._gamePage.getButton().addEventListener('click', () => this.draw(this._signIn.getFormContainer()));
  }

  private draw(layout: HTMLDivElement): void {
    const haveContainer: HTMLDivElement | null = document.querySelector('.container');
    if (haveContainer) {
      this._bodyLink.replaceChild(layout, haveContainer);
      return;
    }
    this._bodyLink.appendChild(layout);
  }

  public drawSignIn(): void {
    if (this._localStorage.getFullName()) {
      this.draw(this._startPage.getStart());
      return;
    }
    this.draw(this._signIn.getFormContainer());
  }
}
