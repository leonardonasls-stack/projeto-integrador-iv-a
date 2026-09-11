import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { Mail, Send, CheckCircle2, MessageSquare, User, AtSign, FileText } from 'lucide-react';
import { EmailService } from '../../services/emailService';

export const ContactSection: React.FC = () => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      addToast('error', 'Campos Obrigatórios', 'Por favor, preencha nome, e-mail e a mensagem.');
      return;
    }

    setLoading(true);

    const result = await EmailService.sendContactMessage(formData);

    setLoading(false);

    if (result.success) {
      setSubmitted(true);
      addToast(
        'success',
        'Mensagem Enviada!',
        `Obrigado ${formData.name}, sua mensagem foi recebida com sucesso.`
      );
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      addToast('error', 'Erro no Formulário', result.error || 'Não foi possível enviar sua mensagem.');
    }
  };

  return (
    <section id="contato" className="py-20 bg-slate-950/60 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Mail className="w-3.5 h-3.5" />
            <span>Fale Conosco</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Entre em Contato
          </h2>
          <p className="text-slate-400 text-base">
            Tem alguma proposta, dúvida ou quer apenas trocar uma ideia? Envie uma mensagem e responderei em breve.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Info (5 cols) */}
          <div className="lg:col-span-5 glass-panel p-8 rounded-2xl border border-slate-800 space-y-6 text-left">
            <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
              Informações de Contato
            </h3>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="p-2 rounded-lg bg-indigo-950 text-indigo-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">E-mail</h4>
                  <p className="text-slate-400">leonardonasls@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="p-2 rounded-lg bg-purple-950 text-purple-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Redes Sociais &amp; Portfólio</h4>
                  <p className="text-slate-400">
                    GitHub:{' '}
                    <a
                      href="https://github.com/leonardonasls-stack"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline"
                    >
                      github.com/leonardonasls-stack
                    </a>
                  </p>
                  <p className="text-slate-400">LinkedIn: linkedin.com/in/leodev</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 space-y-2">
              <h4 className="font-bold text-indigo-300">💡 UX &amp; Acessibilidade</h4>
              <p>
                Este formulário conta com feedback visual de validação em tempo real, prevenção de campos nulos e confirmação de envio ao usuário.
              </p>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 glass-panel p-8 rounded-2xl border border-slate-800 text-left">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
                <h3 className="text-2xl font-bold text-white">Mensagem Enviada!</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
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
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-indigo-400" />
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 placeholder:text-slate-500"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <AtSign className="w-3.5 h-3.5 text-indigo-400" />
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 placeholder:text-slate-500"
                    />
                  </div>

                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Assunto</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Ex: Proposta de Colaboração"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 placeholder:text-slate-500"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Sua Mensagem *</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Escreva sua mensagem ou comentários sobre a aplicação..."
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 placeholder:text-slate-500 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
