const STATUS = {
  Open: false,
  Closed: true,
};

function statusValue(statK) {
  for (const [k, v] of Object.entries(STATUS)) {
    if (statK === k) {
      return v;
    }
  }
}

module.exports = { STATUS, statusValue };
