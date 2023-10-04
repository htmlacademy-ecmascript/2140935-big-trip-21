export default class DestinationsModel {
  #projectApiService = null;
  #destinations = [];

  constructor({projectApiService}) {
    this.#projectApiService = projectApiService;
  }

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

  async init() {
    try {
      this.#destinations = await this.#projectApiService.destinations;
    } catch(err) {
      this.#destinations = [];
    }
  }
}
