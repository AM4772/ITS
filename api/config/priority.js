const PRIORITIES = {
  Select: 5,
  Low: 4,
  Medium: 3,
  High: 2,
  Urgent: 1,
};

function priorityValue(priorityK) {
  for (const [k, v] of Object.entries(PRIORITIES)) {
    if (priorityK === k) {
      return v;
    }
  }
}

module.exports = { PRIORITIES, priorityValue };
