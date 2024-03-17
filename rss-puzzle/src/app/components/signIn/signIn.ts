import '@components/signIn/signIn-style';
import { createElement, createLabel, createInput } from '@utils/createElement';

export class SignIn {
  public _fromContainer: HTMLDivElement;

  private _inputName: HTMLInputElement;

  private _inputSurname: HTMLInputElement;

  private _buttonForm: HTMLButtonElement;

  constructor() {
    this._fromContainer = createElement('div', 'container  sign-in') as HTMLDivElement;
    const from = createElement('form', 'sign-in__form', this._fromContainer) as HTMLFormElement;
    createLabel('sign-in__label', 'sign-in__name', 'Name:', from) as HTMLLabelElement;
    this._inputName = createInput('sign-in__name', 'Enter name', from) as HTMLInputElement;
    this._inputName.addEventListener('input', () => this.checkInputs());

    createLabel('sign-in__label', 'sign-in__surname', 'Surname:', from) as HTMLLabelElement;
    this._inputSurname = createInput('sign-in__name', 'Enter surname', from) as HTMLInputElement;
    this._inputSurname.addEventListener('input', () => this.checkInputs());

    this._buttonForm = createElement('button', 'sign-in__send', from) as HTMLButtonElement;
    this._buttonForm.innerText = 'SignIn';
    this._buttonForm.disabled = true;
  }

  private checkInputs() {
    const pattern = /^[a-zA-Z]{2,}$/;
    const nameValid = pattern.test(this._inputName.value);
    const surnameValid = pattern.test(this._inputSurname.value);

    this._buttonForm.disabled = !(nameValid && surnameValid);
  }

  public getFromContainer() {
    return this._fromContainer;
  }
}
