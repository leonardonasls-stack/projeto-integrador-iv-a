import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from 'vitest';
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
  let globalFetchMock: Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    globalFetchMock = vi.fn();
    globalThis.fetch = globalFetchMock as any;
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('should return mailtoFallback if VITE_FORMSPREE_ID is missing', async () => {
    vi.stubEnv('VITE_FORMSPREE_ID', '');
    
    const result = await EmailService.sendContactMessage({
      name: 'Test',
      email: 'test@example.com',
      message: 'Hello'
    });
    
    expect(result.mailtoFallback).toBe(true);
    expect(result.success).toBe(true);
    expect(globalFetchMock).not.toHaveBeenCalled();
  });

  it('should send via Formspree if VITE_FORMSPREE_ID is present', async () => {
    vi.stubEnv('VITE_FORMSPREE_ID', 'test_id');
    globalFetchMock.mockResolvedValueOnce({ ok: true });
    
    const result = await EmailService.sendContactMessage({
      name: 'Test',
      email: 'test@example.com',
      message: 'Hello'
    });
    
    expect(result.mailtoFallback).toBeUndefined();
    expect(result.success).toBe(true);
    expect(globalFetchMock).toHaveBeenCalledWith('https://formspree.io/f/test_id', expect.any(Object));
  });

  it('should handle Formspree URL as ID', async () => {
    vi.stubEnv('VITE_FORMSPREE_ID', 'https://formspree.io/f/test_id');
    globalFetchMock.mockResolvedValueOnce({ ok: true });
    
    const result = await EmailService.sendContactMessage({
      name: 'Test',
      email: 'test@example.com',
      message: 'Hello'
    });
    
    expect(result.success).toBe(true);
    expect(globalFetchMock).toHaveBeenCalledWith('https://formspree.io/f/test_id', expect.any(Object));
  });

  it('should return error if Formspree request fails (HTTP error)', async () => {
    vi.stubEnv('VITE_FORMSPREE_ID', 'test_id');
    globalFetchMock.mockResolvedValueOnce({ ok: false });
    
    const result = await EmailService.sendContactMessage({
      name: 'Test',
      email: 'test@example.com',
      message: 'Hello'
    });
    
    expect(result.success).toBe(false);
    expect(result.error).toBe('Falha no servidor ao enviar a mensagem.');
  });
  
  it('should return error if fetch throws an exception', async () => {
    vi.stubEnv('VITE_FORMSPREE_ID', 'test_id');
    globalFetchMock.mockRejectedValueOnce(new Error('Network error'));
    
    const result = await EmailService.sendContactMessage({
      name: 'Test',
      email: 'test@example.com',
      message: 'Hello'
    });
    
    expect(result.success).toBe(false);
    expect(result.error).toBe('Não foi possível enviar sua mensagem. Tente novamente mais tarde.');
  });
});
