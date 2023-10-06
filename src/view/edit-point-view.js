import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { formattedDate, capitalizeFirstLetter } from '../utils/utils.js';
import { POINT_DEFAULT, EditMode } from '../const.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function createEventTypeListTemplate(id, allTypes, isDisabled) {
  let typeListTemplate = '';
  for (const type of allTypes) {
    typeListTemplate += `
    <div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isDisabled ? 'disabled' : ''}>
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-${id}">${capitalizeFirstLetter(type)}</label>
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

function createOffersListTemplate(id, offers, typeOffers, isDisabled) {
  let offersTemplate = '';
  typeOffers.sort((a, b) => a.title.localeCompare(b.title));

  for (const offer of typeOffers) {
    const isChecked = offers.some((pointOffer) => pointOffer.id === offer.id);
    offersTemplate += `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title.toLowerCase().replace(/ /g, '-')}-${id}" type="checkbox" name="${offer.title}" ${isChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
      <label class="event__offer-label" for="event-offer-${offer.title.toLowerCase().replace(/ /g, '-')}-${id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
  }

  return offersTemplate;
}

function createOffersTemplate(id, offers, typeOffers, isDisabled) {
  if (!typeOffers || typeOffers.length === 0) {
    return '';
  } else {
    const offersListTemplate = createOffersListTemplate(id, offers, typeOffers, isDisabled);
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
  if (!destination || !destination.description) {
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

function createEditPointTemplate(data, editMode) {
  const { id, basePrice, dateFrom, dateTo, type, destinationData, offersData, typeOffers, allTypes, allCities, isSaving, isDeleting, isDisabled } = data;
  const timeStart = (dateFrom === '') ? '' : formattedDate(dateFrom, 'DD/MM/YY HH:mm');
  const timeEnd = (dateTo === '') ? '' : formattedDate(dateTo, 'DD/MM/YY HH:mm');
  const typeImage = type.toLowerCase();
  const eventTypeListTemplate = createEventTypeListTemplate(id, allTypes, isDisabled);
  const citiesListTemplate = createCitiesListTemplate(allCities);
  const offersTemplate = createOffersTemplate(id, offersData, typeOffers, isDisabled);
  const destinationTemplate = createDestinationTemplate(destinationData);
  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post" ${isSaving ? 'disabled' : ''}>
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${typeImage}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox" ${isDisabled ? 'disabled' : ''}>

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
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destinationData && destinationData.name ? destinationData.name : ''}" list="destination-list-${id}" required ${isDisabled ? 'disabled' : ''}>
            <datalist id="destination-list-${id}">
              ${citiesListTemplate}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${timeStart}" ${isDisabled ? 'disabled' : ''}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-${id}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${timeEnd}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${id}" type="number" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving' : 'Save'}</button>
          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting' : editMode}</button>
          <button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
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

export default class EditPointView extends AbstractStatefulView {
  #handleCloseClick = null;
  #handleFormSubmit = null;
  #handleDeleteClick = null;
  #destinationsModel = null;
  #offersModel = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #editMode = EditMode.EDIT;

  constructor({ point, destinationsModel, offersModel, onArrowUpClick, onFormSubmit, onDeleteClick, editMode }) {
    super();
    this._setState(EditPointView.parsePointToState(point, destinationsModel, offersModel));
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleCloseClick = onArrowUpClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;
    this.#editMode = editMode;

    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#editMode);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset(point) {
    this.updateElement(
      EditPointView.parsePointToState(point, this.#destinationsModel, this.#offersModel),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#closeClickHandler);
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelectorAll('.event__type-input')
      .forEach((input) => input.addEventListener('change', this.#pointTypeHandler));
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);
    this.element.querySelectorAll('.event__offer-checkbox')
      .forEach((input) => input.addEventListener('change', this.#pointOffersHandler));
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteClickHandler);
    this.#setDatepicker();
  }

  #pointOffersHandler = (evt) => {
    const title = evt.target.name;
    const offerIndex = this._state.offersData.findIndex((item) => item.title === title);
    if (offerIndex > -1) {
      this._state.offersData.splice(offerIndex, 1);
    } else {
      const offer = this._state.typeOffers.find((item) => item.title === title);
      if (offer) {
        this._state.offersData.push({...offer});
      }
    }
  };

  #pointTypeHandler = (evt) => {
    this._state.type = evt.target.value.toLowerCase();
    this.updateElement({
      type: this._state.type,
      typeOffers: this.#offersModel.getOffersByType(this._state.type),
    });
    this._state.offersData = [];
  };

  #destinationHandler = (evt) => {
    this._state.destinationData = this.#destinationsModel.getDestinationByName(evt.target.value);
    this.updateElement({
      destinationData: this._state.destinationData,
    });
  };

  #priceChangeHandler = (evt) => {
    this._state.basePrice = parseInt(evt.target.value, 10);
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state, this.#destinationsModel));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditPointView.parseStateToPoint(this._state, this.#destinationsModel));
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDatepicker() {
    const dateElements = this.element.querySelectorAll('.event__input--time');
    this.#datepickerFrom = flatpickr(
      dateElements[0],
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        // eslint-disable-next-line camelcase
        time_24hr: true,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
      },
    );
    this.#datepickerTo = flatpickr(
      dateElements[1],
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        // eslint-disable-next-line camelcase
        time_24hr: true,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
      },
    );
  }

  static parsePointToState(point = POINT_DEFAULT, destinationsModel, offersModel) {
    return {...point,
      offersData: offersModel.getOffersById(point.offers),
      typeOffers: offersModel.getOffersByType(point.type),
      allTypes: offersModel.allTypes,
      destinationData: destinationsModel.getDestinationById(point.destination),
      allCities: destinationsModel.allCities,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state, destinationsModel) {
    const point = {...state};
    point.destination = destinationsModel.getDestinationByName(point.destinationData.name).id;
    point.offers = point.offersData.map((offer) => offer.id);

    delete point.offersData;
    delete point.typeOffers;
    delete point.allTypes;
    delete point.destinationData;
    delete point.allCities;
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;
    if (!point.id) {
      delete point.id;
    }

    return point;
  }
}
