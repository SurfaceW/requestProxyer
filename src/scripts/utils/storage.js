export function getLocalRules() {
  try {
    return JSON.parse(localStorage['rules']);
  } catch (e) {
    throw new Error(e.message);
    return [];
  }
}

export function setLocalRules(str = '') {
  try {
    localStorage['rules'] = JSON.stringify(str);
  } catch (e) {
    throw new Error(e.message);
  }
}
