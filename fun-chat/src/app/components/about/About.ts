import { Component } from '@components/Component/Component';
import { Spans } from '@type/enums';
import { createSpans, createElement, createDiv, createButton, createLink } from '@utils/createElement';

export class About extends Component {
  private _dialog: HTMLDialogElement;

  constructor() {
    super('dialog', 'about');
    this._dialog = this._container as HTMLDialogElement;
    this.createDialog();
  }

  private createDialog() {
    const containerDialog = createDiv('about__container', this._dialog);

    createSpans('about__title', 'Fun Chat', containerDialog, Spans.H3);
    const text = createElement('p', 'about__text', containerDialog);
    text.innerText = `The application is designed to demonstrate the Fun Chat assignment in the RSSchool JS`;

    createLink('footer__autor-git', '@Barvinko', 'https://github.com/Barvinko', containerDialog);

    const aboutButton = createButton('button about__exit', 'Return', containerDialog);
    aboutButton.addEventListener('click', () => this._dialog.close());
  }

  public getContainer(): HTMLDialogElement {
    return this._dialog;
  }
}

export const AboutEl = new About();
