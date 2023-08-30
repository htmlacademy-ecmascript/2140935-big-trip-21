import EditPointView from '../view/edit-point-view.js';
import EditPointFormView from '../view/edit-point-view-form.js';
import EditPointHeaderView from '../view/edit-point-header-view.js';
import EditPointDetailsView from '../view/edit-point-details-view.js';
import EditPointOffersView from '../view/edit-point-offers-view.js';
import EditPointDestinationView from '../view/edit-point-destination-view.js';
import { render } from '../render.js';

export default class EditPointPresenter {
  editPointComponent = new EditPointView();
  editPointFormComponent = new EditPointFormView();
  editPointDetailsComponent = new EditPointDetailsView();

  constructor({editPointContainer, point, offersModel, destinationsModel}) {
    this.editPointContainer = editPointContainer;
    this.point = point;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
  }

  init() {
    this.offers = [...this.offersModel.getOffersById(this.point.offers)];
    this.typeOffers = [...this.offersModel.getOffersByType(this.point.type)];
    this.allTypes = [...this.offersModel.getAllTypes()];
    this.destination = this.destinationsModel.getDestination(this.point.destination);
    this.allCities = [...this.destinationsModel.getAllCities()];

    render(this.editPointComponent, this.editPointContainer.getElement());
    render(this.editPointFormComponent, this.editPointComponent.getElement());
    render(new EditPointHeaderView({ point: this.point, destination: this.destination, allTypes: this.allTypes, allCities: this.allCities }), this.editPointFormComponent.getElement());
    render(this.editPointDetailsComponent, this.editPointFormComponent.getElement());
    if ((this.typeOffers.length > 0)) {
      render(new EditPointOffersView({ offers: this.offers, typeOffers: this.typeOffers }), this.editPointDetailsComponent.getElement());
    }
    if (this.destination.description) {
      render(new EditPointDestinationView({ destination: this.destination }), this.editPointDetailsComponent.getElement());
    }
  }
}
