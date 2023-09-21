import { destinations } from '../mocks/destinations.js';

export default class DestinationsModel {
  #destinations = destinations;

  getDestination(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }

  get allCities() {
    const citiesSet = new Set();
    for (const destination of this.#destinations) {
      citiesSet.add(destination.name);
    }
    return Array.from(citiesSet);
  }

}
