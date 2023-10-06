import {FilterType} from '../const';

function startToday() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return start;
}

function endOfToday() {
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return end;
}

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => new Date(point.dateFrom) > new Date()),
  [FilterType.PRESENT]: (points) => points.filter((point) => new Date(point.dateFrom) <= endOfToday() && new Date(point.dateTo) >= startToday()),
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
