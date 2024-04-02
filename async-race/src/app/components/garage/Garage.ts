import { Component } from '@components/Component/Component';
import { Workshop } from '@components/garage/workshop/Workshop';
import { CarFleet } from '@components/garage/carFleet/CarFleet';

export class Garage extends Component {
  private _carFleet: CarFleet;

  private _workshop: Workshop;

  constructor() {
    super('article', 'article garage-page');

    this._carFleet = new CarFleet();
    this._workshop = new Workshop(this._carFleet);

    this._container.appendChild(this._workshop.getContainer());
    this._container.appendChild(this._carFleet.getContainer());
  }
}
