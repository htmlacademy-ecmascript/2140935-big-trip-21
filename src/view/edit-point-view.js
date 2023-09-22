import AbstractView from '../framework/view/abstract-view.js';
import { formattedDate } from '../utils/task.js';

function createEventTypeListTemplate(id, allTypes) {
  let typeListTemplate = '';
  for (const type of allTypes) {
    typeListTemplate += `
    <div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-${id}">${type}</label>
    </div>`;
  }
  return typeListTemplate;
}

function createCitiesListTemplate(allCities) {
  let citiesListTemplate = '';
  for (const city of allCities) {
    citiesListTemplate += `<option value="${city}"></option>`;
  }
  return citiesListTemplate;
}

function createOffersListTemplate(id, offers, typeOffers) {
  let offersTemplate = '';
  typeOffers.sort((a, b) => a.title.localeCompare(b.title));

  for (const offer of typeOffers) {
    const isChecked = offers.some((pointOffer) => pointOffer.id === offer.id);
    offersTemplate += `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title.toLowerCase().replace(/ /g, '-')}-${id}" type="checkbox" name="event-offer-${offer.title.toLowerCase().replace(/ /g, '-')}" ${isChecked ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${offer.title.toLowerCase().replace(/ /g, '-')}-${id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
  }

  return offersTemplate;
}

function createOffersTemplate(id, offers, typeOffers) {
  if (!typeOffers || typeOffers.length === 0) {
    return '';
  } else {
    const offersListTemplate = createOffersListTemplate(id, offers, typeOffers);
    return (
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offersListTemplate}
        </div>
      </section>`
    );
  }
}

function createImageTemplate(pictures) {
  let imageTemplate = '';
  if (pictures) {
    for (const picture of pictures) {
      imageTemplate +=
      `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`;
    }
  }
  return imageTemplate;
}

function createDestinationTemplate(destination) {
  if (!destination.description) {
    return '';
  } else {
    const imageTemplate = createImageTemplate(destination.pictures);

    return (
      `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${imageTemplate}
          </div>
        </div>
      </section>`
    );
  }
}

function createEditPointTemplate(point, destination, offers, typeOffers, allTypes, allCities) {
  const { id, basePrice, dateFrom, dateTo, type } = point;
  const timeStart = formattedDate(dateFrom, 'DD/MM/YY HH:mm');
  const timeEnd = formattedDate(dateTo, 'DD/MM/YY HH:mm');
  const typeImage = type.toLowerCase();
  const eventTypeListTemplate = createEventTypeListTemplate(id, allTypes);
  const citiesListTemplate = createCitiesListTemplate(allCities);
  const offersTemplate = createOffersTemplate(id, offers, typeOffers);
  const destinationTemplate = createDestinationTemplate(destination);
  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${typeImage}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${eventTypeListTemplate}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${id}">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination.name}" list="destination-list-${id}">
            <datalist id="destination-list-${id}">
              ${citiesListTemplate}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${timeStart}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${id}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${timeEnd}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${offersTemplate}
          ${destinationTemplate}
        </section>
      </form>
    </li>`
  );
}

export default class EditPointView extends AbstractView {
  #point = null;
  #destination = null;
  #offers = null;
  #typeOffers = null;
  #allTypes = null;
  #allCities = null;
  #handleCloseClick = null;
  #handleFormSubmit = null;

  constructor({ point, destination, offers, typeOffers, allTypes, allCities, onArrowUpClick, onFormSubmit}) {
    super();
    this.#point = point;
    this.#destination = destination;
    this.#offers = offers;
    this.#typeOffers = typeOffers;
    this.#allTypes = allTypes;
    this.#allCities = allCities;
    this.#handleCloseClick = onArrowUpClick;
    this.#handleFormSubmit = onFormSubmit;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#closeClickHandler);
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
  }

  get template() {
    return createEditPointTemplate(this.#point, this.#destination, this.#offers, this.#typeOffers, this.#allTypes, this.#allCities);
  }

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

}
