import { Component } from '@components/Component/Component';
import { Workshop } from '@components/garage/workshop/Workshop';
import { CarFleet } from '@components/garage/carFleet/CarFleet';
import { Winners } from '@components/winners/Winners';

export class Garage extends Component {
  private _carFleet: CarFleet;

  private _workshop: Workshop;

  constructor(winners: Winners) {
    super('article', 'article garage-page');

    this._carFleet = new CarFleet(winners);
    this._workshop = new Workshop(this._carFleet, winners);

    this._container.appendChild(this._workshop.getContainer());
    this._container.appendChild(this._carFleet.getContainer());
  }
}
