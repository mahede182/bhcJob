import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";
const USER_DATA = "user_data";

export const storage = {
  saveToken: async (token: string) => {
    await SecureStore.setItemAsync(ACCESS_TOKEN, token);
  },

  getToken: async () => {
    return await SecureStore.getItemAsync(ACCESS_TOKEN);
  },

  saveRefreshToken: async (refreshToken: string) => {
    await SecureStore.setItemAsync(REFRESH_TOKEN, refreshToken);
  },

  getRefreshToken: async () => {
    return await SecureStore.getItemAsync(REFRESH_TOKEN);
  },

  saveUser: async (user: any) => {
    await SecureStore.setItemAsync(USER_DATA, JSON.stringify(user));
  },

  getUser: async () => {
    const raw = await SecureStore.getItemAsync(USER_DATA);
    return raw ? JSON.parse(raw) : null;
  },

  clearAll: async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN);
    await SecureStore.deleteItemAsync(USER_DATA);
  },
};

// Keep legacy exports for backward compatibility
export const saveTokens = storage.saveToken;
export const getTokens = async () => {
  const accessToken = await storage.getToken();
  const refreshToken = await storage.getRefreshToken();
  return { accessToken, refreshToken };
};
export const clearTokens = storage.clearAll;
