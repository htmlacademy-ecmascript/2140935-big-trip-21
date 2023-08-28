import { offers } from '../mocks/offers';

export default class OffersModel {
  offers = offers;

  getOffers() {
    return this.offers;
  }

}
