const LOCAL_STORAGE_KEY = 'yato';

const persistState = (state) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // just ignore it
  }
};

const loadState = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
  } catch (e) {
    return {};
  }
};

export { persistState, loadState };
