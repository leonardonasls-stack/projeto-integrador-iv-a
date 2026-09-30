export function safeHostPath(url: string | null | undefined): string {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    return parsed.hostname + (parsed.pathname === '/' ? '' : parsed.pathname);
  } catch {
    return url; // Return original if not a valid URL (fallback)
  }
}

export function validateHttpUrl(url: string): boolean {
  if (!url) return true; // empty is ok usually, handled elsewhere if required
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}
