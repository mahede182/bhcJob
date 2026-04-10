/**
 * AppLogger Utility
 * Safe for production (no-op when not in __DEV__).
 */

export class AppLogger {
  private name: string;

  private static readonly isDev = process.env.NODE_ENV !== "production";

  constructor(name: string) {
    this.name = name;
  }

  static d = (message: string, ...args: unknown[]) => {
    if (AppLogger.isDev) {
      console.log(`(DEBUG) ~ ${message}`, ...args);
    }
  };

  static warn = (message: string, ...args: unknown[]) => {
    if (AppLogger.isDev) {
      console.warn(`(WARN) ~ ${message}`, ...args);
    }
  };

  static info = (message: string, ...args: unknown[]) => {
    if (AppLogger.isDev) {
      console.log(`(INFO) ~ ${message}`, ...args);
    }
  };

  static error = (message: string, ...args: unknown[]) => {
    if (AppLogger.isDev) {
      console.error(`(ERROR) ~ ${message}`, ...args);
    }
  };

  /**
   * Static log for quick one-off logging
   */
  static log = (message: string, ...args: unknown[]) => {
    if (AppLogger.isDev) {
      console.log(`(LOG) ~ ${message}`, ...args);
    }
  };

  /**
   * Debug log (🪲)
   */
  d = (message: string, ...args: unknown[]) => {
    if (AppLogger.isDev) {
      const tag = `${this.name} (DEBUG)`;
      console.log(`${tag} ~ ${message}`, ...args);
    }
  };

  /**
   * Warning log (⚠️)
   */
  warn = (message: string, ...args: unknown[]) => {
    if (AppLogger.isDev) {
      const tag = `${this.name} (WARN)`;
      console.warn(`${tag} ~ ${message}`, ...args);
    }
  };

  /**
   * Info log (ℹ)
   */
  info = (message: string, ...args: unknown[]) => {
    if (AppLogger.isDev) {
      const tag = `${this.name} (INFO)`;
      console.log(`${tag} ~ ${message}`, ...args);
    }
  };

  /**
   * Error log (❌)
   */
  error = (message: string, ...args: unknown[]) => {
    if (AppLogger.isDev) {
      const tag = `${this.name} (ERROR)`;
      console.error(`${tag} ~ ${message}`, ...args);
    }
  };
}
