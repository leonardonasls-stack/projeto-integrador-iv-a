import { describe, it, expect, beforeEach } from 'vitest';
import { StorageService } from './storageService';

describe('StorageService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return fallback value if key does not exist', () => {
    const value = StorageService.getItem('non_existent', 'fallback');
    expect(value).toBe('fallback');
  });

  it('should set and get items correctly', () => {
    const data = { id: 1, name: 'Test' };
    const success = StorageService.setItem('test_key', data);
    expect(success).toBe(true);

    const retrieved = StorageService.getItem('test_key', null);
    expect(retrieved).toEqual(data);
  });

  it('should remove items correctly', () => {
    StorageService.setItem('to_remove', 'data');
    StorageService.removeItem('to_remove');

    const retrieved = StorageService.getItem('to_remove', null);
    expect(retrieved).toBeNull();
  });
});
