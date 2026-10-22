/**
 * Email Service - External API Service
 * Encapsulates Formspree integration and direct mailto fallback.
 */

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export class EmailService {
  /**
   * Sends contact form data directly to Formspree endpoint or triggers mailto fallback.
   */
  static async sendContactMessage(formData: ContactFormData): Promise<{ success: boolean; error?: string; mailtoFallback?: boolean }> {
    let formspreeId = import.meta.env.VITE_FORMSPREE_ID;

    if (!formspreeId) {
      // Fallback para envio direto via cliente de email padrão (mailto)
      return { success: true, mailtoFallback: true };
    }

    // Sanitize in case full URL was passed
    if (formspreeId.includes('formspree.io/f/')) {
      formspreeId = formspreeId.split('formspree.io/f/').pop()?.trim() || formspreeId;
    }

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        return { success: false, error: 'Falha no servidor ao enviar a mensagem.' };
      }

      return { success: true };
    } catch (error) {
      console.error('[EmailService] Error sending email:', error);
      return { success: false, error: 'Não foi possível enviar sua mensagem. Tente novamente mais tarde.' };
    }
  }
}
