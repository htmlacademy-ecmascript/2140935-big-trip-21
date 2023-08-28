/* eslint-disable no-console */
import {createElement} from '../render.js';
import { formattedDate, getTimeInterval, formatTimeInterval } from '../utils.js';

// Готовим офферы для вывода в блоке
function createOffersTemplate(pointOffers) {
  let offersTemplate = '';
  for (const offer of pointOffers) {
    offersTemplate += `
      <li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`;
  }
  return offersTemplate;
}

function createPointTemplate(point, allOffers) {
  const {basePrice, dateFrom, dateTo, isFavorite, type, destination, offers} = point;
  const day = formattedDate(dateFrom, 'MMM DD');
  const timeStart = formattedDate(dateFrom, 'HH:mm');
  const timeEnd = formattedDate(dateTo, 'HH:mm');
  const intervalMm = getTimeInterval (dateFrom, dateTo);
  const intervalHhMm = formatTimeInterval (intervalMm);
  const typeImage = type.toLowerCase();

  // Получаем офферы по id
  const pointOffers = [];
  for (const offerId of offers) {
    for (const offerGroup of allOffers) {
      for (const offer of offerGroup.offers) {
        if (offer.id === offerId) {
          pointOffers.push(offer);
          break;
        }
      }
    }
  }
  // Получаем шаблон с офферами
  const offersTemplate = createOffersTemplate(pointOffers);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">${day}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${typeImage}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T12:25">${timeStart}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T13:35">${timeEnd}</time>
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

export default class PointView {
  constructor({point, allOffers}) {
    this.point = point;
    this.allOffers = allOffers;
  }

  getTemplate() {
    return createPointTemplate(this.point, this.allOffers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
