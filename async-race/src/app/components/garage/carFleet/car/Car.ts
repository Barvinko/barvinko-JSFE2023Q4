import { Component } from '@components/Component/Component';
import { CarType } from '@type/type';
import { Spans } from '@type/enums';
import svgCarImport from '@components/garage/carFleet/car/car-svg.svg';
import { setDisabled } from '@utils/setDisabled';
import { createDiv, createButton, createSpans } from '@app/utils/createElement';

export class Car extends Component {
  private _carData: CarType;

  private _removeButton!: HTMLButtonElement;

  private _selectButton!: HTMLButtonElement;

  constructor(data: CarType) {
    super('div', 'garage__car');
    this._carData = data;
    this.createCarLayout();
  }

  private createCarLayout() {
    const headerButtons = createDiv('garage__car-header-buttons', this._container);
    this._selectButton = createButton('button garage__car-select', 'select'.toUpperCase(), headerButtons);
    this._selectButton.addEventListener('click', () => this.selectUpdate());
    this._removeButton = createButton('button garage__car-remove', 'remove'.toUpperCase(), headerButtons);
    createSpans('garage__car-name', this._carData.name, headerButtons, Spans.H3);

    const race = createDiv('garage__car-race', this._container);

    const pedalButtons = createDiv('garage__car-pedal-buttons', race);
    createButton('garage__car-pedal garage__car-start', 'A', pedalButtons);
    createButton('garage__car-pedal garage__car-stop', 'B', pedalButtons);

    const fieldRace = createDiv('garage__car-field', race);

    fieldRace.innerHTML += svgCarImport;
    const svgCar = fieldRace.querySelector('svg') as SVGElement;

    svgCar.classList.add('garage__car-svg');
    svgCar.setAttribute('fill', this._carData.color);
  }

  public selectUpdate() {
    const name = document.querySelector('.workshop__name-update') as HTMLInputElement;
    const color = document.querySelector('.workshop__color-update') as HTMLInputElement;
    const button = document.querySelector('.workshop__button-update') as HTMLButtonElement;

    setDisabled([name, color, button], false);

    name.value = this._carData.name;
    color.value = this._carData.color;
    button.setAttribute('data-value', this._carData.id.toString());
  }

  public getRemove(): HTMLButtonElement {
    return this._removeButton;
  }

  public getSelect(): HTMLButtonElement {
    return this._selectButton;
  }
}
