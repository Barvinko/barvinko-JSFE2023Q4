import { SignIn } from '@components/signIn/SignIn';
import { Messenger } from '@components/messenger/Messenger';
import { UserStorage } from '@utils/LocalStorage';

export class Layout {
  private _signIn: SignIn;

  private _messenger: Messenger;

  constructor() {
    this._signIn = new SignIn();
    this._messenger = new Messenger();

    if (UserStorage.getData()) {
      console.log(Boolean(UserStorage.getData()));
      this.drawMessager();
    }

    this._signIn.getForm().addEventListener('submit', (event: Event) => {
      event.preventDefault();
      this.drawMessager();
    });

    document.addEventListener('keypress', this.handleKeyPress);
  }

  private draw(layout: HTMLElement): void {
    const haveContainer: HTMLDivElement | null = document.querySelector('.article');
    if (haveContainer && haveContainer.parentElement) haveContainer.parentElement.replaceChild(layout, haveContainer);
  }

  public firstDraw(): void {
    document.body.appendChild(this._signIn.getContainer());
  }

  private drawMessager() {
    this._signIn.enter(() => this.draw(this._messenger.getContainer()));
  }

  handleKeyPress(event: KeyboardEvent) {
    const login: HTMLButtonElement | null = document.querySelector('.sign-in__send');
    if (event.key === 'Enter' && login && login.disabled === false) {
      console.log('work');
      this.drawMessager();
    }
  }
}
