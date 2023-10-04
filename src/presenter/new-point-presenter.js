import { remove, render, RenderPosition } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import { UserAction, UpdateType, EditMode, POINT_DEFAULT } from '../const.js';
import { nanoid } from 'nanoid';

export default class NewPointPresenter {
  #pointContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #editPointComponent = null;
  #offersModel = null;
  #destinationsModel = null;

  constructor({pointContainer, offersModel, destinationsModel, onDataChange, onDestroy}) {
    this.#pointContainer = pointContainer;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#editPointComponent !== null) {
      return;
    }

    const pointDefault = {
      ...POINT_DEFAULT,
      id: nanoid(),
    };

    this.#editPointComponent = new EditPointView({
      point: pointDefault,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onArrowUpClick: this.#handleDeleteClick,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      editMode: EditMode.NEW,
    });
    render(this.#editPointComponent, this.#pointContainer.element, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#editPointComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#editPointComponent);
    this.#editPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
