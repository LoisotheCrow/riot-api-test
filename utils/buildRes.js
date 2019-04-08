module.exports = (data, isError = false) => ({
  status: isError ? 1 : 0,
  data,
});
