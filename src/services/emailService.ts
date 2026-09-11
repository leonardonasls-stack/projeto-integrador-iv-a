/**
 * Email Service - External API Service
 * Encapsulates Formspree integration logic out of UI components.
 */

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export class EmailService {
  /**
   * Sends contact form data to Formspree endpoint.
   */
  static async sendContactMessage(formData: ContactFormData): Promise<{ success: boolean; error?: string }> {
    let formspreeId = import.meta.env.VITE_FORMSPREE_ID;

    if (!formspreeId) {
      return {
        success: false,
        error: 'O formulário está em modo de demonstração. Por favor, envie sua mensagem diretamente para leonardonasls@gmail.com'
      };
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
