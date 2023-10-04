import Observable from '../framework/observable.js';
import { findTripDates, extractTripRoute, calculateTripBaseCost, getEmptyFilters } from '../utils/utils.js';
import { UpdateType } from '../const.js';

export default class PointsModel extends Observable {
  #projectApiService = null;
  #points = [];

  constructor({projectApiService}) {
    super();
    this.#projectApiService = projectApiService;
  }

  get points() {
    return this.#points;
  }

  async init() {
    try {
      const points = await this.#projectApiService.points;
      this.#points = points.map(this.#adaptToClient);
    } catch(err) {
      this.#points = [];
    }
    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#projectApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#projectApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    try {
      await this.#projectApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete point');
    }
  }

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }

  get tripDates() {
    return findTripDates(this.#points);
  }

  get tripRoute() {
    if (this.#points.length === 3) {
      return this.#points.slice(0, 3).map((point) => point.destination);
    }
    return extractTripRoute(this.#points);
  }

  get tripBaseCost() {
    return calculateTripBaseCost(this.#points);
  }

  get allActiveOffersId() {
    return this.#points.flatMap((point) => point.offers);
  }

  get filterDisabled() {
    return getEmptyFilters(this.#points);
  }
}
