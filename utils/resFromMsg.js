module.exports = (msg, isErr = false) => ({
  status: isErr ? 1 : 0,
  data: {
    message: msg,
  },
});
