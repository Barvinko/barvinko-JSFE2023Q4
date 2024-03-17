import { SignIn } from '@components/signIn/signIn';

export class Layout {
  private _bodyLink: HTMLBodyElement;

  private _signIn: SignIn;

  constructor() {
    this._bodyLink = document.body as HTMLBodyElement;
    this._signIn = new SignIn();
  }

  private draw(layout: HTMLDivElement): void {
    if (this._bodyLink.firstChild) this._bodyLink.removeChild(this._bodyLink.firstChild);
    this._bodyLink.appendChild(layout);
  }

  drawSignIn(): void {
    this.draw(this._signIn.getFromContainer());
  }
}
