import EventsList from '../view/events-list-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import EditPointPresenter from './edit-point-presenter.js';
import { POINT_DEFAULT } from '../const.js';
import { render } from '../render.js';

export default class EventsPresenter {
  eventsListComponent = new EventsList();

  constructor({ eventsContainer, pointsModel, offersModel, destinationsModel }) {
    this.eventsContainer = eventsContainer;
    this.pointsModel = pointsModel;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    const newPoint = new EditPointPresenter({
      editPointContainer: this.eventsListComponent,
      point: POINT_DEFAULT,
      offersModel: this.offersModel,
      destinationsModel: this.destinationsModel
    });
    const editPoint = new EditPointPresenter({
      editPointContainer: this.eventsListComponent,
      point: this.points[1],
      offersModel: this.offersModel,
      destinationsModel: this.destinationsModel
    });

    render(new SortView(), this.eventsContainer);
    render(this.eventsListComponent, this.eventsContainer);
    newPoint.init();
    render(new PointView({ point: this.points[0], destination: this.destinationsModel.getDestination(this.points[0].destination), offers: [...this.offersModel.getOffersById(this.points[0].offers)] }), this.eventsListComponent.getElement());
    editPoint.init();

    for (let i = 2; i < this.points.length; i++) {
      render(new PointView({ point: this.points[i], destination: this.destinationsModel.getDestination(this.points[i].destination), offers: [...this.offersModel.getOffersById(this.points[i].offers)] }), this.eventsListComponent.getElement());
    }
  }
}
