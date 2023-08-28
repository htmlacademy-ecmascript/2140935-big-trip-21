import { destinations } from '../mocks/destinations.js';

export default class DestinationsModel {
  destinations = destinations;

  getDestinations() {
    return this.destinations;
  }

}
