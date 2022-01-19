export const bool = (val) => {
  if (typeof val === 'boolean') {
    return val;
  }
  let temp = { 1: true, 0: false };
  return temp[val];
};

export default { bool };
