import EventsList from '../view/events-list-view.js';
import NewPointView from '../view/new-point-form-view.js';
import EditPointView from '../view/edit-point-form-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import {render} from '../render.js';

export default class EventsPresenter {
  eventsListComponent = new EventsList();

  constructor({eventsContainer, pointsModel, offersModel}) {
    this.eventsContainer = eventsContainer;
    this.pointsModel = pointsModel;
    this.offersModel = offersModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    this.offers = [...this.offersModel.getOffers()];
    render(new SortView(), this.eventsContainer);
    render(this.eventsListComponent, this.eventsContainer);
    render(new NewPointView(0), this.eventsListComponent.getElement());
    render(new PointView({point: this.points[1], allOffers: this.offers}), this.eventsListComponent.getElement());
    render(new EditPointView({point: this.points[2], allOffers: this.offers}), this.eventsListComponent.getElement());

    for (let i = 3; i < this.points.length; i++) {
      render(new PointView({point: this.points[i], allOffers: this.offers}), this.eventsListComponent.getElement());
    }
  }
}
