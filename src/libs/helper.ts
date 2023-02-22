/**
* Get random number between min and max
* @param min The minimum number (default to -1)
* @param max The maximum number (default to 1)
*/
export function genRandomNumber(min = -1, max = 1) {
  return (Math.random() * (max - min)) + min;
}
