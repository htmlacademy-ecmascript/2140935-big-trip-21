export const POINTS_COUNT = 2;

export const DAY_FORMAT = 'MMM DD';

export const TIME_FORMAT = 'HH:mm';

export const POINT_DEFAULT = {
  id: null,
  basePrice: 0,
  dateFrom: '',
  dateTo: '',
  destination: null,
  isFavorite: false,
  offers: [],
  type: 'flight',
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const EditMode = {
  EDIT: 'Delete',
  NEW: 'Cancel',
};

export const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};
