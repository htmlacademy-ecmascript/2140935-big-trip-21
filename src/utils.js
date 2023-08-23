function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInteger(min, max) {
  if (min > max) {
    [min, max] = [max, min]; // Swap min and max if necessary
  }

  const range = Math.floor((max - min) / 10) + 1;
  const randomIndex = Math.floor(Math.random() * range);
  const randomMultipleOf10 = randomIndex * 10;

  return randomMultipleOf10 + min;
}

export {getRandomArrayElement, getRandomInteger};
