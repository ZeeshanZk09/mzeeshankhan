// utils/helpers.ts
export const isLocalStorageAvailable = (): boolean => {
  try {
    const test = 'test';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Add other helper functions as needed
