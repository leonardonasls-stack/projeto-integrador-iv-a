import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EmailService } from './emailService';

// Mock supabase client
vi.mock('./supabaseClient', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(() => Promise.resolve({ error: null })),
      select: vi.fn(() => ({
        order: vi.fn(() => Promise.resolve({ data: [], error: null }))
      })),
      delete: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ error: null }))
      }))
    }))
  }
}));

describe('EmailService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return mailtoFallback if VITE_FORMSPREE_ID is missing', async () => {
    // Vite env is mockable via import.meta.env, but it's read-only in some contexts.
    // Assuming it's missing in test environment by default.
    const result = await EmailService.sendContactMessage({
      name: 'Test',
      email: 'test@example.com',
      message: 'Hello'
    });
    
    expect(result.mailtoFallback).toBe(true);
    expect(result.success).toBe(true);
  });
});
