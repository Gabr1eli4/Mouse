export function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomWithExclusion(
  min: number,
  max: number,
  excludeMin: number,
  excludeMax: number,
) {
  let randomNum = getRandom(min, max);
  while (randomNum >= excludeMin && randomNum <= excludeMax) {
    randomNum = getRandom(min, max);
  }
  return randomNum;
}
