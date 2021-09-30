export const sToM = (seconds: number): number => seconds * 1000;
export const getTime = (time: number): string =>
  new Date(time * 1000).toISOString().substr(11, 8);
