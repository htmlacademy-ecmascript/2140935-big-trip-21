import AbstractView from '../framework/view/abstract-view.js';
import { formatTripDates } from '../utils/utils.js';

function createTripRoute(tripRoutes, destinationsModel) {
  const destinationNames = tripRoutes.map((id) => destinationsModel.getDestinationById(id).name);

  if (destinationNames.length === 3) {
    return `${destinationNames[0]} &mdash; ${destinationNames[1]} &mdash; ${destinationNames[2]}`;
  }
  return `${destinationNames[0]} &mdash; ... &mdash; ${destinationNames[1]}`;
}

function createTripInfoTemplate(tripDates, tripRoutes, tripCost, destinationsModel) {
  const tripRouteTemplate = createTripRoute(tripRoutes, destinationsModel);
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
  #tripRoutes = null;
  #tripCost = null;
  #destinationsModel = null;

  constructor({tripDates, tripRoutes, tripCost, destinationsModel}) {
    super();
    this.#tripDates = tripDates;
    this.#tripRoutes = tripRoutes;
    this.#tripCost = tripCost;
    this.#destinationsModel = destinationsModel;
  }

  get template() {
    return createTripInfoTemplate(this.#tripDates, this.#tripRoutes, this.#tripCost, this.#destinationsModel);
  }
}
