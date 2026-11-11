declare global {
  interface Window {
    goatcounter?: {
      count: (vars?: {
        path?: string;
        title?: string;
        referrer?: string;
        event?: boolean;
      }) => void;
    };
  }
}

export function isPublicAnalyticsHost(): boolean {
  if (typeof window === 'undefined') return false;
  const { protocol, hostname } = window.location;
  if (protocol !== 'http:' && protocol !== 'https:') return false;
  return !/^(localhost|127\.0\.0\.1|192\.168\.|10\.)/.test(hostname);
}

/**
 * Envía un evento discreto a GoatCounter (solo en entorno público online).
 */
export function trackEvent(path: string, title?: string): void {
  if (!isPublicAnalyticsHost()) return;
  try {
    window.goatcounter?.count({
      path,
      title,
      event: true,
    });
  } catch {
    // Nunca interrumpir la experiencia de usuario por analítica
  }
}

