import dayjs from 'dayjs';
import {FilterType} from '../const';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => new Date(point.dateFrom) > new Date()),
  [FilterType.PRESENT]: (points) => points.filter((point) => new Date(point.dateFrom) <= new Date() && new Date(point.dateTo) >= new Date()),
  [FilterType.PAST]: (points) => points.filter((point) => new Date(point.dateTo) < new Date()),
};

export function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export function sortDay(pointA, pointB) {
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

export function sortTime(pointA, pointB) {
  const durationA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const durationB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return durationB - durationA;
}

export function sortPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

export function formattedDate(inputDate, format) {
  return dayjs(inputDate).format(format);
}

export function getTimeInterval(start, finish) {
  const startDate = new Date(start);
  const finishDate = new Date(finish);
  const interval = (finishDate - startDate) / (1000 * 60);
  return interval;
}

export function formatTimeInterval(intervalMinutes) {
  const days = Math.floor(intervalMinutes / (60 * 24));
  const hours = Math.floor((intervalMinutes % (60 * 24)) / 60);
  const minutes = intervalMinutes % 60;

  if (days > 0) {
    return `${days.toString()}D ${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  } else if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  } else {
    return `${minutes.toString()}M`;
  }
}
