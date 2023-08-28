import { getRandomPoint } from '../mocks/points';
import { destinations } from '../mocks/destinations';

const POINTS_COUNT = 10;

export default class PointsModel {
  points = Array.from({length: POINTS_COUNT}, getRandomPoint);
  destinations = destinations;

  setDestinations() {
    this.points.forEach((point) => {
      const foundDestination = this.destinations.find((destination) => destination.id === point.destination);
      if (foundDestination) {
        point.destination = foundDestination;
      }
    });
  }

  getPoints() {
    this.setDestinations();
    return this.points;
  }
}
