import { destinations } from '../mocks/destinations.js';

export default class DestinationsModel {
  #destinations = destinations;

  getDestinationById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }

  getDestinationByName(name) {
    return this.#destinations.find((destination) => destination.name === name);
  }

  get allCities() {
    const citiesSet = new Set();
    for (const destination of this.#destinations) {
      citiesSet.add(destination.name);
    }
    return Array.from(citiesSet);
  }

}
