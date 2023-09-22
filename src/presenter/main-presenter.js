import {render} from '../framework/render.js';
import PointsListView from '../view/points-list-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';

export default class MainPresenter {
  #pointsContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #pointsListComponent = new PointsListView();

  #points = [];

  constructor({ pointsContainer, pointsModel, offersModel, destinationsModel }) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#renderPoints();
  }

  #renderPoints() {
    render(new SortView(), this.#pointsContainer);
    render(this.#pointsListComponent, this.#pointsContainer);
    for (let i = 0; i < this.#points.length; i++) {
      new PointPresenter({
        index: i,
        pointContainer: this.#pointsListComponent,
        point: this.#points[i],
        offersModel: this.#offersModel,
        destinationsModel: this.#destinationsModel
      }).init();
    }
  }
}
