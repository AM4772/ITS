export const SEVERITIES = {
  Select: 7,
  Critical: 1,
  Major: 2,
  Normal: 3,
  Minor: 4,
  Trivial: 5,
  Enhancement: 6,
};

export function severityName(severityV) {
  for (const [k, v] of Object.entries(SEVERITIES)) {
    if (Number(severityV) === v) {
      return k;
    }
  }
}
