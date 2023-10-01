import Observable from '../framework/observable.js';
import { getRandomPoint } from '../mocks/points.js';
import { POINTS_COUNT } from '../const.js';
import { filter, updateItem } from '../utils/point.js';

export default class PointsModel extends Observable {
  #points = Array.from({length: POINTS_COUNT}, getRandomPoint);

  get points() {
    return this.#points;
  }

  getFilteredPoints(filterType) {
    return filter[filterType](this.#points);
  }

  updatePoints(updatedPoint) {
    this.#points = updateItem(this.#points, updatedPoint);
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
