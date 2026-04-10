import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
  mode: ThemeMode;
}

const initialState: ThemeState = {
  mode: "system",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
    hydrateTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
  },
});

export const { setTheme, hydrateTheme } = themeSlice.actions;

export const THEME_STORAGE_KEY = "bhcjobs_theme_mode";

export const selectThemeMode = (state: { theme: ThemeState }) =>
  state.theme.mode;

export default themeSlice.reducer;
