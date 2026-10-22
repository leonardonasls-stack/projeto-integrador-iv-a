import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { useProfile } from '../../context/ProfileContext';
import { Mail, Send, CheckCircle2, MessageSquare, User, AtSign, FileText } from 'lucide-react';
import { EmailService } from '../../services/emailService';
import { safeHostPath } from '../../utils/urlHelper';

export const ContactSection: React.FC = () => {
  const { profile } = useProfile();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    _gotcha: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check for bots
    if (formData._gotcha) {
      addToast('success', 'Mensagem Enviada!', 'Obrigado pelo contato.');
      setFormData({ name: '', email: '', subject: '', message: '', _gotcha: '' });
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      addToast('error', 'Campos Obrigatórios', 'Por favor, preencha nome, e-mail e a mensagem.');
      return;
    }

    // Cooldown check (30 seconds)
    const now = Date.now();
    if (now - lastSubmitTime < 30000) {
      addToast('error', 'Aguarde', 'Por favor, aguarde 30 segundos antes de enviar outra mensagem.');
      return;
    }

    setLoading(true);
    const result = await EmailService.sendContactMessage(formData);
    setLoading(false);

    if (result.mailtoFallback) {
      // Fallback for when Formspree is not configured
      const subject = encodeURIComponent(formData.subject || `Contato do Portfólio de ${formData.name}`);
      const body = encodeURIComponent(`Nome: ${formData.name}\nE-mail: ${formData.email}\n\nMensagem:\n${formData.message}`);
      window.location.href = `mailto:${profile.email || 'leonardonasls@gmail.com'}?subject=${subject}&body=${body}`;
      
      setSubmitted(true);
      setLastSubmitTime(now);
      addToast('info', 'Redirecionando...', 'O formulário será enviado através do seu cliente de e-mail.');
      setFormData({ name: '', email: '', subject: '', message: '', _gotcha: '' });
      return;
    }

    if (result.success) {
      setSubmitted(true);
      setLastSubmitTime(now);
      addToast(
        'success',
        'Mensagem Enviada!',
        `Obrigado ${formData.name}, sua mensagem foi recebida com sucesso.`
      );
      setFormData({ name: '', email: '', subject: '', message: '', _gotcha: '' });
    } else {
      addToast('error', 'Erro no Formulário', result.error || 'Não foi possível enviar sua mensagem.');
    }
  };

  return (
    <section id="contato" className="py-24 relative overflow-hidden">
      {/* Background Cyber Glow */}
      <div aria-hidden="true" className="absolute top-1/2 right-1/4 w-112.5 h-87.5 bg-violet-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-semibold">
            <Mail className="w-3.5 h-3.5 text-sky-400" />
            <span>Contato &amp; Oportunidades</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {profile.contactTitle || 'Vamos Conversar?'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {profile.contactSubtitle || 'Aberto a novas oportunidades de desenvolvimento backend e full stack, colaborações em projetos e troca de ideias sobre engenharia de software.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Contact Info Bento (5 cols) */}
          <div className="lg:col-span-5 bento-card p-8 rounded-3xl space-y-6 text-left flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white border-b border-white/5 pb-4">
                Canais Diretos
              </h3>

              <div className="space-y-4 text-xs font-mono text-slate-300 pt-4">
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-900/60 border border-white/5">
                  <div className="p-2.5 rounded-xl bg-violet-950 text-violet-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">E-mail Principal</h4>
                    <p className="text-slate-400 text-xs font-sans mt-0.5">{profile.email || 'leonardonasls@gmail.com'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-900/60 border border-white/5">
                  <div className="p-2.5 rounded-xl bg-sky-950 text-sky-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-white">Redes &amp; Conexões</h4>
                    <p className="text-slate-400">
                      GitHub:{' '}
                      <a
                        href={profile.githubUrl || "https://github.com/leonardonasls-stack"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-violet-300 hover:text-white underline"
                      >
                        {profile.githubUrl ? safeHostPath(profile.githubUrl) : 'github.com/leonardonasls-stack'}
                      </a>
                    </p>
                    <p className="text-slate-400">
                      LinkedIn:{' '}
                      <a 
                        href={profile.linkedinUrl || "https://linkedin.com"} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sky-300 hover:text-white underline"
                      >
                        {profile.linkedinUrl ? safeHostPath(profile.linkedinUrl) : 'linkedin.com'}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 text-xs text-slate-400 space-y-1.5 font-sans">
              <h4 className="font-bold text-violet-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Tempo Médio de Resposta
              </h4>
              <p className="text-[11px] leading-relaxed">
                Mensagens enviadas pelo formulário são processadas diretamente e respondidas geralmente em até 24 horas úteis.
              </p>
            </div>
          </div>

          {/* Contact Form Bento (7 cols) */}
          <div className="lg:col-span-7 bento-card p-8 rounded-3xl text-left">
            {submitted ? (
              <div className="py-14 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-sky-400 mx-auto" />
                <h3 className="text-2xl font-bold text-white">Mensagem Enviada com Sucesso!</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Obrigado pelo contato! Sua mensagem foi recebida e responderei o mais breve possível.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-colors"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-violet-400" />
                      <span>Seu Nome *</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ex: Maria Santos"
                      required
                      maxLength={80}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/60 border border-white/5 text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-violet-400 font-sans"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <AtSign className="w-3.5 h-3.5 text-sky-400" />
                      <span>Seu E-mail *</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu.email@exemplo.com"
                      required
                      maxLength={200}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/60 border border-white/5 text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-violet-400 font-sans"
                    />
                  </div>

                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-violet-400" />
                    <span>Assunto</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Ex: Proposta de Colaboração / Oportunidade"
                    maxLength={120}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/60 border border-white/5 text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-violet-400 font-sans"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
                    <span>Sua Mensagem *</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Escreva sua mensagem ou detalhes sobre o projeto..."
                    required
                    maxLength={2000}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/60 border border-white/5 text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-violet-400 resize-none font-sans"
                  />
                </div>

                {/* Honeypot field */}
                <input
                  type="text"
                  name="_gotcha"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData._gotcha}
                  onChange={handleChange}
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full min-h-11 py-3.5 px-6 rounded-2xl bg-linear-to-r from-violet-600 via-indigo-600 to-sky-500 hover:from-violet-500 hover:to-sky-400 text-white font-semibold text-xs shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-violet-400 tracking-wide"
                >
                  {loading ? (
                    <span>Enviando mensagem...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Enviar Mensagem</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
