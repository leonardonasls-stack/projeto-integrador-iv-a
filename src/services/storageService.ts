/**
 * Storage Service - Infrastructure Layer
 * Isolates direct localStorage access and handles parsing errors or quota exceptions safely.
 */

export class StorageService {
  /**
   * Safe read from localStorage with JSON parsing and fallback.
   */
  static getItem<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(key);
      if (!item) return fallback;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`[StorageService] Error reading key "${key}":`, error);
      return fallback;
    }
  }

  /**
   * Safe write to localStorage.
   */
  static setItem<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`[StorageService] Error writing key "${key}":`, error);
      return false;
    }
  }

  /**
   * Safe remove item from localStorage.
   */
  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`[StorageService] Error removing key "${key}":`, error);
    }
  }
}
