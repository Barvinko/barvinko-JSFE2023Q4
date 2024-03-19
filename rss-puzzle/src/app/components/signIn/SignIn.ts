import '@components/signIn/signIn-style';
import { LocalStorage } from '@utils/LocalStorage';
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

  private _localStorage: LocalStorage;

  private _form: HTMLFormElement;

  constructor(storage: LocalStorage) {
    this._localStorage = storage;

    this._patternName = '[A-Z][a-zA-Z-]{2,}';
    this._patternSurname = '[A-Z][a-zA-Z-]{3,}';

    this._formContainer = createElement('div', 'container  sign-in') as HTMLDivElement;
    this._form = createElement('form', 'sign-in__form', this._formContainer) as HTMLFormElement;
    createLabel('sign-in__label', 'sign-in__name', 'Name:', this._form) as HTMLLabelElement;
    this._inputName = createInput('sign-in__name', 'Enter name', this._form) as HTMLInputElement;
    this._errorName = createElement('span', 'sign-in__error', this._form);

    createLabel('sign-in__label', 'sign-in__surname', 'Surname:', this._form) as HTMLLabelElement;
    this._inputSurname = createInput('sign-in__name', 'Enter surname', this._form) as HTMLInputElement;
    this._errorSurname = createElement('span', 'sign-in__error', this._form);

    this._buttonForm = createElement('button', 'button sign-in__send', this._form) as HTMLButtonElement;

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

    this._buttonForm.innerText = 'Login';
    this._buttonForm.disabled = true;
  }

  public enter(): void {
    this._localStorage.setFullName({
      name: this._inputName.value,
      surname: this._inputSurname.value,
    });
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

  public getForm(): HTMLFormElement {
    return this._form;
  }

  public getFormContainer(): HTMLDivElement {
    return this._formContainer;
  }
}
