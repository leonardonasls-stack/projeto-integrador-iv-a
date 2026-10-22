import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EmailService } from './emailService';

describe('EmailService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
    (globalThis as any).fetch = vi.fn();
  });

  it('should return mailtoFallback: true when VITE_FORMSPREE_ID is not configured', async () => {
    vi.stubEnv('VITE_FORMSPREE_ID', '');
    const result = await EmailService.sendContactMessage({
      name: 'Leonardo',
      email: 'leo@test.com',
      message: 'Hello'
    });

    expect(result.success).toBe(true);
    expect(result.mailtoFallback).toBe(true);
  });

  it('should call fetch with formspree URL and payload when ID is provided', async () => {
    vi.stubEnv('VITE_FORMSPREE_ID', 'test_id');
    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({})
    });

    const formData = {
      name: 'Leonardo',
      email: 'leo@test.com',
      subject: 'Orçamento',
      message: 'Olá, gostaria de conversar.'
    };

    const result = await EmailService.sendContactMessage(formData);

    expect(result.success).toBe(true);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://formspree.io/f/test_id',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
    );
  });
});
