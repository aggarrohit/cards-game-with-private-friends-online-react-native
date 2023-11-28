export const getRawArray = size => {
  let arr = [];
  for (let index = 0; index < size; index++) {
    arr.push({srno: index + 1});
  }
  return arr;
};
