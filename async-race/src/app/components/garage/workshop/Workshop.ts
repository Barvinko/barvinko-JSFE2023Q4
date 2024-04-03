import { Component } from '@components/Component/Component';
import { CarTypeApi } from '@app/types/type';
import { createDiv, createElement, createSpans, createInput, createButton } from '@utils/createElement';
import { setDisabled } from '@utils/setDisabled';
import { Spans, TypeInput, ApiUrls } from '@type/enums';
import { createData, putData } from '@utils/api-functions';
import { carMarks, carModelNames } from '@utils/carsData';
import { CarFleet } from '@components/garage/carFleet/CarFleet';

export class Workshop extends Component {
  private _carFlee: CarFleet;

  constructor(carFleet: CarFleet) {
    super('section', 'workshop');

    this._carFlee = carFleet;

    this.createform('create', false);
    this.createform('update', true);

    const generateCar = createButton('button workshop__generate-car', 'Cenerate Cars'.toUpperCase(), this._container);
    generateCar.addEventListener('click', () => this.randomCar());
  }

  private createform(func: 'create' | 'update', disabled: boolean): void {
    const title: string = func[0].toUpperCase() + func.slice(1);
    const containerForm = createDiv(`workshop__container workshop__${func}`, this._container);
    createSpans(`workshop__title`, `${title} Car`, containerForm, Spans.H3);

    const form = createElement('form', 'workshop__form', containerForm);
    const inputName = createInput(`workshop__name workshop__name-${func}`, TypeInput.TEXT, form);
    inputName.placeholder = 'Car name';

    const inputColor = createInput(`workshop__color workshop__color-${func}`, TypeInput.COLOR, form);

    const button = createButton(`button workshop__button workshop__button-${func}`, title, form);
    button.type = 'submit';
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (func === 'create') {
        this.createCar(inputName.value, inputColor.value);
      } else {
        this.updateCar(inputName.value, inputColor.value, Number(button.dataset.value));
        setDisabled([inputName, inputColor, button], disabled);
      }

      inputName.value = '';
      inputColor.value = '#000000';
    });

    setDisabled([inputName, inputColor, button], disabled);
  }

  private randomCar() {
    for (let i = 0; i < 100; i += 1) {
      const markRandom = this.getRandomNumber(carMarks.length);
      const modelRandom = this.getRandomNumber(carModelNames.length);

      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 256);
      const blue = Math.floor(Math.random() * 256);

      const hexColor = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;

      this.createCar(`${carMarks[markRandom]} ${carModelNames[modelRandom]}`, hexColor);
    }
  }

  private getRandomNumber(max: number) {
    return Math.floor(Math.random() * (max + 1));
  }

  private async createCar(name: string, color: string) {
    const car: CarTypeApi = {
      name,
      color,
    };
    await createData(ApiUrls.GARAGE, car);
    this._carFlee.updateCarage();
  }

  private async updateCar(name: string, color: string, id: number) {
    const car: CarTypeApi = {
      name,
      color,
    };

    await putData(`${ApiUrls.GARAGE}/${id}`, car);
    this._carFlee.updateCarage();
  }
}
