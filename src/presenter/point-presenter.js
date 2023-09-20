import { render, replace } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import EditPointFormView from '../view/edit-point-view-form.js';
import EditPointHeaderView from '../view/edit-point-header-view.js';
import EditPointDetailsView from '../view/edit-point-details-view.js';
//import EditPointOffersView from '../view/edit-point-offers-view.js';
//import EditPointDestinationView from '../view/edit-point-destination-view.js';
import PointView from '../view/point-view.js';

export default class PointPresenter {
  #pointContainer = null;
  #point = null;
  #offersModel = null;
  #destinationsModel = null;

  #editPointComponent = new EditPointView();
  #editPointFormComponent = new EditPointFormView();
  #editPointDetailsComponent = new EditPointDetailsView();

  #offers = [];
  #typeOffers = [];
  #allTypes = [];
  #destination = [];
  #allCities = [];

  constructor({pointContainer, point, offersModel, destinationsModel}) {
    this.#pointContainer = pointContainer;
    this.#point = point;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#offers = [...this.#offersModel.getOffersById(this.#point.offers)];
    this.#typeOffers = [...this.#offersModel.getOffersByType(this.#point.type)];
    this.#allTypes = [...this.#offersModel.allTypes];
    this.#destination = this.#destinationsModel.getDestination(this.#point.destination);
    this.#allCities = [...this.#destinationsModel.allCities];

    this.#renderPoint(this.#point, this.#destinationsModel.getDestination(this.#point.destination), this.#offersModel.getOffersById(this.#point.offers), this.#allTypes, this.#allCities);
  }

  #renderPoint(point, destination, offers, allTypes, allCities) {

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      destination,
      offers,
      onArrowDownClick: () => {
        replacePointToEdit();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editComponent = new EditPointHeaderView({
      point,
      destination,
      allTypes,
      allCities,
      onArrowUpClick: () => {
        replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToEdit() {
      replace(editComponent, pointComponent);
    }

    function replaceEditToPoint() {
      replace(pointComponent, editComponent);
    }

    render(pointComponent, this.#pointContainer.element);
  }
}

/*
    render(this.#editPointComponent, this.#pointContainer.element);
    render(this.#editPointFormComponent, this.#editPointComponent.element);
    render(new EditPointHeaderView({ point: this.#point, destination: this.#destination, allTypes: this.#allTypes, allCities: this.#allCities }), this.#editPointFormComponent.element);
    render(this.#editPointDetailsComponent, this.#editPointFormComponent.element);
    if ((this.#typeOffers.length > 0)) {
      render(new EditPointOffersView({ offers: this.#offers, typeOffers: this.#typeOffers }), this.#editPointDetailsComponent.element);
    }
    if (this.#destination.description) {
      render(new EditPointDestinationView({ destination: this.#destination }), this.#editPointDetailsComponent.element);
    }
*/
