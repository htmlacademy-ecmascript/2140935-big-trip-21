export const POINTS_COUNT = 20;

export const DAY_FORMAT = 'MMM DD';

export const TIME_FORMAT = 'HH:mm';

export const POINT_DEFAULT = {
  id: '0',
  basePrice: 0,
  dateFrom: '2023-01-01T00:00:00.000Z',
  dateTo: '2023-01-01T00:00:00.000Z',
  destination: 3,
  isFavorite: false,
  offers: [],
  type: 'Flight'
};

export const FILTER_TYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};
