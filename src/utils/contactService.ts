import { PERSONAL_INFO } from '../data/portfolioData';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactResult {
  method: 'formsubmit' | 'mailto';
}

const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${PERSONAL_INFO.email}`;

/**
 * Sends a contact inquiry via FormSubmit AJAX when running over HTTP(S),
 * falling back to a prefilled mailto: link when offline or opened via file://.
 */
export async function sendContactMessage(payload: ContactPayload): Promise<ContactResult> {
  const name = payload.name.trim();
  const email = payload.email.trim();
  const message = payload.message.trim();

  if (window.location.protocol !== 'file:') {
    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          _replyto: email,
          _subject: `[Portfolio] Mensaje de ${name}`,
          _template: 'table',
          message,
        }),
      });

      if (response.ok) {
        const data = (await response.json().catch(() => null)) as { success?: string | boolean } | null;
        if (!data || data.success === true || data.success === 'true') {
          return { method: 'formsubmit' };
        }
      }
    } catch {
      // Network/CORS error falls through to mailto fallback.
    }
  }

  const subject = encodeURIComponent(`[Portfolio] Mensaje de ${name}`);
  const body = encodeURIComponent(
    `Nombre / Empresa: ${name}\nCorreo de respuesta: ${email}\n\nMensaje:\n${message}`
  );
  window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  return { method: 'mailto' };
}

