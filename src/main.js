import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import EventsPresenter from './presenter/events-presenter.js';
import {render} from './render.js';

const siteTripInfoElement = document.querySelector('.trip-main');
const siteTripControlsElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');
const eventsPresenter = new EventsPresenter({eventsContainer: siteMainElement});

render(new TripInfoView(), siteTripInfoElement, 'AFTERBEGIN');
render(new FilterView(), siteTripControlsElement);

eventsPresenter.init();
