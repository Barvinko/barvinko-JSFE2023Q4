import { Component } from '@components/Component/Component';
import { CarType } from '@app/types/type';
import svgCarImport from '@components/garage/carFleet/car/car-svg.svg';
import { createDiv, createButton } from '@app/utils/createElement';

export class Car extends Component {
  private _carData: CarType;

  constructor(data: CarType) {
    super('div', 'garage__car');
    this._carData = data;
    this.createCarLayout();
  }

  private createCarLayout() {
    const headerButtons = createDiv('garage__car-header-buttons', this._container);
    createButton('button garage__car-select', 'select'.toUpperCase(), headerButtons);
    createButton('button garage__car-remove', 'remove'.toUpperCase(), headerButtons);

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
}
