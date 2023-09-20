import {render} from '../framework/render.js';
import EventsList from '../view/events-list-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #eventsListComponent = new EventsList();

  #points = [];

  constructor({ eventsContainer, pointsModel, offersModel, destinationsModel }) {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];

    render(new SortView(), this.#eventsContainer);
    render(this.#eventsListComponent, this.#eventsContainer);
    for (let i = 0; i < this.#points.length; i++) {
      new PointPresenter({
        index: i,
        pointContainer: this.#eventsListComponent,
        point: this.#points[i],
        offersModel: this.#offersModel,
        destinationsModel: this.#destinationsModel
      }).init();
    }
  }
}
