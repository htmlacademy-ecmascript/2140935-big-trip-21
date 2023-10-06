import dayjs from 'dayjs';

export function capitalizeFirstLetter(str) {
  return str.replace(/^\w/, (match) => match.toUpperCase());
}

export function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
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
  const minutes = Math.floor(intervalMinutes % 60);

  if (days > 0) {
    return `${days.toString()}D ${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  }
  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  }
  return `${minutes.toString()}M`;
}

export function findTripDates(points) {
  if (!points || points.length === 0) {
    return [null, null];
  }

  let earliestDate = new Date(points[0].dateFrom);
  let latestDate = new Date(points[0].dateTo);

  for (let i = 1; i < points.length; i++) {
    const currentDateFrom = new Date(points[i].dateFrom);
    const currentDateTo = new Date(points[i].dateTo);

    if (currentDateFrom < earliestDate) {
      earliestDate = currentDateFrom;
    }

    if (currentDateTo > latestDate) {
      latestDate = currentDateTo;
    }
  }

  return [earliestDate.toISOString(), latestDate.toISOString()];
}

export function formatTripDates(startDate, endDate) {
  const startMonth = dayjs(startDate).format('MMM');
  const endMonth = dayjs(endDate).format('MMM');
  const startDay = dayjs(startDate).format('DD');
  const endDay = dayjs(endDate).format('DD');

  return `${startMonth} ${startDay} — ${endMonth} ${endDay}`;
}

export function extractTripRoutes(points) {
  let earliestDateFrom = points[0].dateFrom;
  let earliestDestination = points[0].destination;
  let latestDateTo = points[0].dateTo;
  let latestDestination = points[0].destination;

  for (const point of points) {
    if (point.dateFrom < earliestDateFrom) {
      earliestDateFrom = point.dateFrom;
      earliestDestination = point.destination;
    }
  }

  for (const point of points) {
    if (point.dateTo > latestDateTo) {
      latestDateTo = point.dateTo;
      latestDestination = point.destination;
    }
  }

  return [earliestDestination, latestDestination];
}

export function calculateTripBaseCost(points) {
  return points.reduce((total, point) => total + point.basePrice, 0);
}

export function calculateOffersCost(allActiveOffersId, allOffers) {
  const prices = [];
  for (const id of allActiveOffersId) {
    for (const type of allOffers) {
      if (type.offers && Array.isArray(type.offers)) {
        const offer = type.offers.find((off) => off.id === id);
        if (offer) {
          prices.push(offer.price);
          break;
        }
      }
    }
  }
  return prices.reduce((acc, price) => acc + price, 0);
}
