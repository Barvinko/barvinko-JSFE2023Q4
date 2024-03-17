import '@components/signIn/signIn-style';
import { createElement, createLabel, createInput } from '@utils/createElement';

export class SignIn {
  public _formContainer: HTMLDivElement;

  private _inputName: HTMLInputElement;

  private _inputSurname: HTMLInputElement;

  private _buttonForm: HTMLButtonElement;

  private _patternName: string;

  private _patternSurname: string;

  private _errorName: HTMLSpanElement;

  private _errorSurname: HTMLSpanElement;

  constructor() {
    this._patternName = '[A-Z][a-zA-Z-]{2,}';
    this._patternSurname = '[A-Z][a-zA-Z-]{3,}';

    this._formContainer = createElement('div', 'container  sign-in') as HTMLDivElement;
    const form = createElement('form', 'sign-in__form', this._formContainer) as HTMLFormElement;
    createLabel('sign-in__label', 'sign-in__name', 'Name:', form) as HTMLLabelElement;
    this._inputName = createInput('sign-in__name', 'Enter name', form) as HTMLInputElement;
    this._errorName = createElement('span', 'sign-in__error', form);

    createLabel('sign-in__label', 'sign-in__surname', 'Surname:', form) as HTMLLabelElement;
    this._inputSurname = createInput('sign-in__name', 'Enter surname', form) as HTMLInputElement;
    this._errorSurname = createElement('span', 'sign-in__error', form);

    this._buttonForm = createElement('button', 'sign-in__send', form) as HTMLButtonElement;

    this.setParameters();
  }

  private setParameters(): void {
    this._inputName.addEventListener('input', () => {
      this.checkInputs();
      this.checkLetter(this._inputName);
    });
    this._inputName.pattern = this._patternName;

    this._inputSurname.addEventListener('input', () => {
      this.checkInputs();
      this.checkLetter(this._inputSurname);
    });
    this._inputSurname.pattern = this._patternSurname;

    this._buttonForm.innerText = 'SignIn';
    this._buttonForm.disabled = true;
  }

  private checkLetter(input: HTMLInputElement): void {
    const regex = /[^A-Za-z-]/g;
    const newValue = input.value.replace(regex, '');
    input.value = newValue;
  }

  private checkInputs(): void {
    const nameValid = new RegExp(this._patternName).test(this._inputName.value);
    const surnameValid = new RegExp(this._patternSurname).test(this._inputSurname.value);

    this._buttonForm.disabled = !(nameValid && surnameValid);
    const erorrMessage: string = '* first letter must be capitalised, English letters and hyphens, minimum characters';
    this._errorName.innerText = nameValid ? ' ' : `${erorrMessage} 3`;
    this._errorSurname.innerText = surnameValid ? ' ' : `${erorrMessage} 4`;
  }

  public getFormContainer() {
    return this._formContainer;
  }
}
