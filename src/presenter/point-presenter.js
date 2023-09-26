import { render, replace, remove } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #point = null;
  #offersModel = null;
  #destinationsModel = null;
  #offers = [];
  #typeOffers = [];
  #allTypes = [];
  #destination = [];
  #allCities = [];
  #pointComponent = null;
  #editComponent = null;
  #mode = Mode.DEFAULT;

  constructor({pointContainer, offersModel, destinationsModel, onDataChange, onModeChange}) {
    this.#pointContainer = pointContainer;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;
    this.#offers = this.#offersModel.getOffersById(this.#point.offers);
    this.#typeOffers = this.#offersModel.getOffersByType(this.#point.type);
    this.#allTypes = this.#offersModel.allTypes;
    this.#destination = this.#destinationsModel.getDestination(this.#point.destination);
    this.#allCities = this.#destinationsModel.allCities;

    this.#renderPoint(this.#point, this.#destination, this.#offers, this.#typeOffers, this.#allTypes, this.#allCities);
  }

  #renderPoint(point, destination, offers, typeOffers, allTypes, allCities) {

    const prevPointComponent = this.#pointComponent;
    const prevEditComponent = this.#editComponent;

    this.#pointComponent = new PointView({
      point,
      destination,
      offers,
      onArrowDownClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#editComponent = new EditPointView({
      point,
      destination,
      offers,
      typeOffers,
      allTypes,
      allCities,
      onArrowUpClick: this.#handleCloseClick,
      onFormSubmit: this.#handleFormSubmit,
    });

    if (prevPointComponent === null || prevEditComponent === null) {
      render(this.#pointComponent, this.#pointContainer.element);
      return;
    }

    //if (this.#pointContainer.element.contains(prevPointComponent.element)) {
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    //if (this.#pointContainer.element.contains(prevEditComponent.element)) {
    if (this.#mode === Mode.EDITING) {
      replace(this.#editComponent, prevEditComponent);
    }

    remove(prevPointComponent);
    remove(prevEditComponent);
  }

  #replacePointToEdit() {
    replace(this.#editComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditToPoint() {
    replace(this.#pointComponent, this.#editComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #handleEditClick = () => {
    this.#replacePointToEdit();
  };

  #handleCloseClick = () => {
    this.#replaceEditToPoint();
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(point);
    this.#replaceEditToPoint();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditToPoint();
    }
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditToPoint();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editComponent);
  }

}
