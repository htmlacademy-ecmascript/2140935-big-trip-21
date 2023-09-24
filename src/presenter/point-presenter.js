import { render, replace } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';

export default class PointPresenter {
  #pointContainer = null;
  #point = null;
  #offersModel = null;
  #destinationsModel = null;
  #returnPointElement = null;
  #offers = [];
  #typeOffers = [];
  #allTypes = [];
  #destination = [];
  #allCities = [];

  constructor({pointContainer, point, offersModel, destinationsModel, returnPointElement}) {
    this.#pointContainer = pointContainer;
    this.#point = point;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#returnPointElement = returnPointElement;
  }

  init() {
    this.#offers = this.#offersModel.getOffersById(this.#point.offers);
    this.#typeOffers = this.#offersModel.getOffersByType(this.#point.type);
    this.#allTypes = this.#offersModel.allTypes;
    this.#destination = this.#destinationsModel.getDestination(this.#point.destination);
    this.#allCities = this.#destinationsModel.allCities;
    this.#renderPoint(this.#point, this.#destination, this.#offers, this.#typeOffers, this.#allTypes, this.#allCities);
  }

  #renderPoint(point, destination, offers, typeOffers, allTypes, allCities) {

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

    this.#returnPointElement(pointComponent);

    const editComponent = new EditPointView({
      point,
      destination,
      offers,
      typeOffers,
      allTypes,
      allCities,
      onArrowUpClick: () => {
        replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onFormSubmit: () => {
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
