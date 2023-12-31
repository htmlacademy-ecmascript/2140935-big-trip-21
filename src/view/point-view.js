import AbstractView from '../framework/view/abstract-view.js';
import { formattedDate, getTimeInterval, formatTimeInterval } from '../utils/utils.js';
import { DAY_FORMAT, TIME_FORMAT } from '../const.js';

function createOffersTemplate(offers) {
  let offersTemplate = '';
  for (const offer of offers) {
    offersTemplate += `
    <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`;
  }
  return offersTemplate;
}

function createPointTemplate(point, destination, offers) {
  const { basePrice, dateFrom, dateTo, isFavorite, type } = point;
  const day = formattedDate(dateFrom, DAY_FORMAT);
  const timeStart = formattedDate(dateFrom, TIME_FORMAT);
  const timeEnd = formattedDate(dateTo, TIME_FORMAT);
  const intervalMm = getTimeInterval (dateFrom, dateTo);
  const intervalHhMm = formatTimeInterval (intervalMm);
  const typeImage = type.toLowerCase();
  const offersTemplate = createOffersTemplate(offers);

  return (
    `<li class="trip-events__item">
      <div class="event">
      <time class="event__date" datetime="${day}">${day}</time>
      <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${typeImage}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destination.name}</h3>
      <div class="event__schedule">
      <p class="event__time">
      <time class="event__start-time" datetime="${timeStart}">${timeStart}</time>
      &mdash;
      <time class="event__end-time" datetime="${timeEnd}">${timeEnd}</time>
      </p>
      <p class="event__duration">${intervalHhMm}</p>
      </div>
      <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${offersTemplate}
      </ul>
      <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
      </button>
      <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
      </button>
      </div>
    </li>`
  );
}

export default class PointView extends AbstractView {
  #point = null;
  #destinationsModel = null;
  #destination = null;
  #offersModel = null;
  #offers = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({ point, destinationsModel, offersModel, onArrowDownClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#destination = destinationsModel.getDestinationById(this.#point.destination);
    this.#offers = offersModel.getOffersById(point.offers);
    this.#handleEditClick = onArrowDownClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point, this.#destination, this.#offers);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
