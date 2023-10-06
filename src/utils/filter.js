import {FilterType} from '../const';

function getStartOfToday() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return start;
}

function getEndOfToday() {
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return end;
}

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => new Date(point.dateFrom) > new Date()),
  [FilterType.PRESENT]: (points) => points.filter((point) => new Date(point.dateFrom) <= getEndOfToday() && new Date(point.dateTo) >= getStartOfToday()),
  [FilterType.PAST]: (points) => points.filter((point) => new Date(point.dateTo) < new Date()),
};

export function getEmptyFilters (points) {
  const emptyFilters = [];
  for (const filterType in filter) {
    const filteredPoints = filter[filterType](points);
    if (filteredPoints.length === 0) {
      emptyFilters.push(filterType);
    }
  }
  return emptyFilters;
}
