import { Component } from '@components/Component/Component';
import { CarTypeApi } from '@app/types/type';
import { createDiv, createElement, createSpans, createInput, createButton } from '@utils/createElement';
import { setDisabled } from '@utils/setDisabled';
import { Spans, TypeInput, ApiUrls } from '@type/enums';
import { createData, putData } from '@utils/api-functions';
import { carMarks, carModelNames } from '@utils/carsData';
import { CarFleet } from '@components/garage/carFleet/CarFleet';

export class Workshop extends Component {
  private _carFlet: CarFleet;

  private _race!: HTMLButtonElement;

  private _reset!: HTMLButtonElement;

  constructor(carFleet: CarFleet) {
    super('section', 'workshop');

    this._carFlet = carFleet;

    this.createform('create', false);
    this.createform('update', true);
    this.createGlobalFun();
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

  private createGlobalFun() {
    const containerGlobal = createDiv('workshop__global', this._container);

    this._race = createButton('button workshop__race', 'Race'.toUpperCase(), containerGlobal);
    this._reset = createButton('button workshop__reset', 'Reset'.toUpperCase(), containerGlobal);
    const generateCar = createButton('button workshop__generate-car', 'Cenerate Cars'.toUpperCase(), containerGlobal);

    this._reset.disabled = true;

    this._race.addEventListener('click', () => {
      this.startRace();
    });
    this._reset.addEventListener('click', () => {
      this.resetCar();
    });
    generateCar.addEventListener('click', () => this.randomCar());
  }

  private async startRace() {
    this._race.disabled = true;
    let flafWin: boolean = false;
    await this.stopAllCars();

    this._carFlet._carsPage.forEach(async (car) => {
      car.carToStart();
      const status: number = await car.startEngine();
      if (flafWin || status !== 200) {
        return;
      }
      flafWin = true;

      const winner = this._carFlet._dialog.querySelector('.dialog__winner') as HTMLHeadingElement;
      if (!winner) return;
      winner.innerText = car._carData.name;
      this._carFlet._dialog.show();
      this._reset.disabled = false;
    });
  }

  private async stopAllCars() {
    const stopPromises: Promise<void>[] = this._carFlet._carsPage.map(async (car) => {
      await car.stopEngine();
    });
    await Promise.all(stopPromises);
  }

  private async resetCar() {
    this._reset.disabled = true;
    await this.stopAllCars();
    this._carFlet._dialog.close();
    this._race.disabled = false;
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
    this._carFlet.updateCarage();
  }

  private async updateCar(name: string, color: string, id: number) {
    const car: CarTypeApi = {
      name,
      color,
    };

    await putData(`${ApiUrls.GARAGE}/${id}`, car);
    this._carFlet.updateCarage();
  }
}
