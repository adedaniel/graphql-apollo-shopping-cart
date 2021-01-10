// Accept a number and return number separated by commas (,)
export const separateWithComma = (number) => {
  return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
};
