/**
 * Email Service - External API Service
 * Encapsulates Formspree integration logic and Supabase message saving.
 */

import { supabase } from './supabaseClient';

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export class EmailService {
  /**
   * Saves message to Supabase and sends contact form data to Formspree endpoint.
   */
  static async sendContactMessage(formData: ContactFormData): Promise<{ success: boolean; error?: string; mailtoFallback?: boolean }> {
    // 1. Save to Supabase (Database Backup / Admin Panel)
    try {
      const { error: dbError } = await supabase
        .from('messages')
        .insert({
          name: formData.name.substring(0, 80),
          email: formData.email.substring(0, 200),
          subject: (formData.subject || '').substring(0, 120),
          message: formData.message.substring(0, 2000)
        });

      if (dbError) {
        console.error('[EmailService] Error saving to Supabase:', dbError);
        // We continue even if DB fails, to try Formspree
      }
    } catch (e) {
      console.error('[EmailService] Supabase exception:', e);
    }

    // 2. Send via Formspree
    let formspreeId = import.meta.env.VITE_FORMSPREE_ID;

    if (!formspreeId) {
      // Return success but indicate that a mailto fallback should be triggered
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

  /**
   * Retrieves messages from Supabase (for admin panel)
   */
  static async getMessages() {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data;
  }

  /**
   * Deletes a message from Supabase
   */
  static async deleteMessage(id: string) {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);
    
    if (error) throw new Error(error.message);
  }
}
