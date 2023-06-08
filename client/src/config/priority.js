export const PRIORITIES = {
  Select: 5,
  Low: 4,
  Medium: 3,
  High: 2,
  Urgent: 1,
};

export function priorityName(priorityV) {
  for (const [k, v] of Object.entries(PRIORITIES)) {
    if (Number(priorityV) === v) {
      return k;
    }
  }
}

export function priorityValue(priorityK) {
  for (const [k, v] of Object.entries(PRIORITIES)) {
    if (priorityK === k) {
      console.log(v);
      return v;
    }
  }
}
