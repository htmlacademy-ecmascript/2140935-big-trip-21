import { createElement } from '../render.js';

function createOffersTemplate(offers, typeOffers) {
  const notCheckedOffers = typeOffers.filter((offer) => !offers.some((pointOffer) => pointOffer.id === offer.id));
  let offersTemplate = '';

  for (const offer of offers) {
    offersTemplate += `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
      <label class="event__offer-label" for="event-offer-luggage-1">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
  }

  for (const offer of notCheckedOffers) {
    offersTemplate += `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage">
      <label class="event__offer-label" for="event-offer-luggage-1">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
  }
  return offersTemplate;

}

function createEditPointOffersTemplate(offers, typeOffers) {
  const offersTemplate = createOffersTemplate(offers, typeOffers);

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersTemplate}
      </div>
    </section>`
  );
}

export default class EditPointOffersView {
  constructor({ offers, typeOffers }) {
    this.offers = offers;
    this.typeOffers = typeOffers;
  }

  getTemplate() {
    return createEditPointOffersTemplate(this.offers, this.typeOffers);
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
