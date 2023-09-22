import { getRandomPoint } from '../mocks/points.js';
import { POINTS_COUNT } from '../const.js';
import { filter } from '../utils/task.js';

export default class PointsModel {
  #points = Array.from({length: POINTS_COUNT}, getRandomPoint);

  get points() {
    return this.#points;
  }

  filteredPoints(filterType) {
    return filter[filterType](this.#points);
  }
}
