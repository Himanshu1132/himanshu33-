export const getItem = (target) => {
  return window.localStorage.getItem(target);
};

export const saveItem = (target, item) => {
  window.localStorage.setItem(target, item);
};

export const destroyItem = (target) => {
  window.localStorage.removeItem(target);
};

export default { getItem, saveItem, destroyItem };
