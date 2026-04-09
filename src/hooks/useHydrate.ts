import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "@/store/hooks";
import {
  setCredentials,
  clearCredentials,
  setHydrated,
} from "@/store/slices/authSlice";
import { setFirstLaunch } from "@/store/slices/appSlice";
import { storage } from "@/utils/storage";
import { APP_INITIALIZED } from "@/constants/config";
import {
  hydrateTheme,
  THEME_STORAGE_KEY,
  type ThemeMode,
} from "@/store/slices/themeSlice";

export const useHydrate = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const hydrate = async () => {
      try {
        // 1. Check if first launch
        const introFlag = await AsyncStorage.getItem(APP_INITIALIZED);
        dispatch(setFirstLaunch(introFlag === null));

        // 2. Hydrate auth state from secure storage
        const token = await storage.getToken();
        if (token) {
          const user = await storage.getUser();
          dispatch(setCredentials({ user: user || {}, token }));
        } else {
          dispatch(clearCredentials());
        }

        // 3. Hydrate Theme
        const savedTheme = (await AsyncStorage.getItem(
          THEME_STORAGE_KEY,
        )) as ThemeMode | null;
        if (savedTheme) {
          dispatch(hydrateTheme(savedTheme));
        }
      } catch (error) {
        console.error("Hydration failed", error);
        dispatch(setHydrated());
      }
    };

    hydrate();
  }, [dispatch]);
};
