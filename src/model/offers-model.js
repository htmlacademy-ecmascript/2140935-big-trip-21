import { offers } from '../mocks/offers.js';

export default class OffersModel {
  #offers = offers;

  getOffersById(ids) {
    const offersById = [];
    for (const id of ids) {
      for (const offerGroup of this.#offers) {
        for (const offer of offerGroup.offers) {
          if (offer.id === id) {
            offersById.push(offer);
            break;
          }
        }
      }
    }
    return offersById;
  }

  getOffersByType(type) {
    const offersByType = [];
    for (const offerGroup of this.#offers) {
      if (offerGroup.type === type) {
        offersByType.push(...offerGroup.offers);
        break;
      }
    }
    return offersByType;
  }

  get allTypes() {
    const typesSet = new Set();
    for (const offer of this.#offers) {
      typesSet.add(offer.type);
    }
    return Array.from(typesSet);
  }

}
