import dayjs from 'dayjs';
import {FILTER_TYPE} from '../const';

export const filter = {
  [FILTER_TYPE.EVERYTHING]: (points) => points,
  [FILTER_TYPE.FUTURE]: (points) => points.filter((point) => new Date(point.dateFrom) > new Date()),
  [FILTER_TYPE.PRESENT]: (points) => points.filter((point) => new Date(point.dateFrom) <= new Date() && new Date(point.dateTo) >= new Date()),
  [FILTER_TYPE.PAST]: (points) => points.filter((point) => new Date(point.dateTo) < new Date()),
};

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
