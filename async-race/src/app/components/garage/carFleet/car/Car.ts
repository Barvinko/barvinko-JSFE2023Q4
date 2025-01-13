import { Component } from '@components/Component/Component';
import { CarType, EngineAnswer } from '@type/type';
import { Spans, EngineStatus } from '@type/enums';
import svgCarImport from '@utils/img/car-svg.svg';
import { setDisabled } from '@utils/setDisabled';
import { createDiv, createButton, createSpans } from '@app/utils/createElement';
import { carEngine } from '@app/utils/api-functions/carEngine';

export class Car extends Component {
  public _carData: CarType;

  private _removeButton!: HTMLButtonElement;

  private _selectButton!: HTMLButtonElement;

  private _startEngine!: HTMLButtonElement;

  private _stopEngine!: HTMLButtonElement;

  private _carSvg!: SVGElement;

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
    this._startEngine = createButton('garage__car-pedal garage__car-start', 'A', pedalButtons);
    this._stopEngine = createButton('garage__car-pedal garage__car-stop', 'B', pedalButtons);
    this._stopEngine.disabled = true;

    const fieldRace = createDiv('garage__car-field', race);

    fieldRace.innerHTML += svgCarImport;
    this._carSvg = fieldRace.querySelector('svg') as SVGElement;

    this._carSvg.classList.add('garage__car-svg');
    this._carSvg.setAttribute('fill', this._carData.color);

    this._startEngine.addEventListener('click', () => this.startEngine());
    this._stopEngine.addEventListener('click', () => this.stopEngine());
  }

  public async startEngine(): Promise<number> {
    this._startEngine.disabled = true;
    this._stopEngine.disabled = false;

    const dataAnswer: EngineAnswer = await carEngine(this._carData.id, EngineStatus.STARTED);

    if (typeof dataAnswer.data === 'string') {
      return 0;
    }
    const { data } = dataAnswer;

    const duration = `${Math.round(data.distance / data.velocity)}ms`;
    if (!this._carSvg.parentElement) return 0;

    this._carSvg.style.transitionDuration = duration;
    const raceLength = this._carSvg.parentElement.offsetWidth - this._carSvg.clientWidth;
    this._carSvg.style.transform = `translateX(${raceLength}px)`;
    const result = await this.breakEngine();
    return result;
  }

  public async breakEngine(): Promise<number> {
    const data = await carEngine(this._carData.id, EngineStatus.DRIVE);
    if (data.status === 500) {
      const computedStyle = window.getComputedStyle(this._carSvg);
      const currentTransform = computedStyle.transform;
      const matrix = new DOMMatrix(currentTransform);

      const translateX = matrix.m41;

      this._carSvg.style.transitionDuration = '0ms';
      this._carSvg.style.transform = `translateX(${translateX}px)`;
    }
    return data.status;
  }

  public getTimeCar(): number {
    const time = this._carSvg.style.transitionDuration;
    return parseInt(time, 10) / 1000;
  }

  public async stopEngine() {
    this._startEngine.disabled = false;
    this._stopEngine.disabled = true;

    await carEngine(this._carData.id, EngineStatus.STOPPED);
    if (!this._carSvg.parentElement) return;
    this.carToStart();
  }

  public carToStart() {
    this._carSvg.style.transform = 'translateX(0)';
    this._carSvg.style.transitionDuration = '0s';
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
