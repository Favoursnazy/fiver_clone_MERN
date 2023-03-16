export const slideWord = (str, length) => {
  var dots = str.length > length ? "..." : "";
  return str.substring(0, length) + dots;
};
