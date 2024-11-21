import AsyncStorage from '@react-native-async-storage/async-storage';

// Cache API Response
export const cacheData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Error saving data", e);
  }
};

// Get Cached API Response
export const getCachedData = async (key) => {
  try {
    const cachedData = await AsyncStorage.getItem(key);
    return cachedData != null ? JSON.parse(cachedData) : null;
  } catch (e) {
    console.error("Error fetching cached data", e);
    return null;
  }
};
