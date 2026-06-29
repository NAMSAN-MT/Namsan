export const serialize = <T>(v: T): T =>
  JSON.parse(JSON.stringify(v, (_k, val) => (val === undefined ? null : val)));
