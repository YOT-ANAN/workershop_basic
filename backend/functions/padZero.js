module.exports = function genProductCode(num = "0", size = 5) {
  num = parseInt(num);
  num += 1;
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
};
