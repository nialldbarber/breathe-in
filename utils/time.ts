export const sToM = (seconds: number): number => seconds * 1000;

export const getTime = (time: number): string => {
  if (time > 3600) {
    return new Date(time * 1000).toISOString().substr(11, 8);
  } else {
    return new Date(time * 1000).toISOString().substring(14, 19);
  }
};
