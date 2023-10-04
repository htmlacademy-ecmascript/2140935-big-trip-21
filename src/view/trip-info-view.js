import AbstractView from '../framework/view/abstract-view.js';
import { formatTripDates } from '../utils/utils.js';

function createTripRoute(tripRoute, destinationsModel) {
  const destinationNames = tripRoute.map((id) => destinationsModel.getDestinationById(id).name);

  if (destinationNames.length === 3) {
    return `${destinationNames[0]} &mdash; ${destinationNames[1]} &mdash; ${destinationNames[2]}`;
  }
  return `${destinationNames[0]} &mdash; ... &mdash; ${destinationNames[1]}`;
}

function createTripInfoTemplate(tripDates, tripRoute, tripCost, destinationsModel) {
  const tripRouteTemplate = createTripRoute(tripRoute, destinationsModel);
  return (
    `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${tripRouteTemplate}</h1>

      <p class="trip-info__dates">${formatTripDates(tripDates[0], tripDates[1])}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripCost}</span>
    </p>
  </section>`
  );
}

export default class TripInfoView extends AbstractView {
  #tripDates = null;
  #tripRoute = null;
  #tripCost = null;
  #destinationsModel = null;

  constructor({tripDates, tripRoute, tripCost, destinationsModel}) {
    super();
    this.#tripDates = tripDates;
    this.#tripRoute = tripRoute;
    this.#tripCost = tripCost;
    this.#destinationsModel = destinationsModel;
  }

  get template() {
    return createTripInfoTemplate(this.#tripDates, this.#tripRoute, this.#tripCost, this.#destinationsModel);
  }
}
