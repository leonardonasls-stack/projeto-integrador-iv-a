import React from 'react';
import { Mail, Copy, ArrowUpRight } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import { useToast } from '../../context/ToastContext';
import { WhatsappIcon, GithubIcon, LinkedinIcon } from '../ui/SocialIcons';

export const ContactSection: React.FC = () => {
  const { profile } = useProfile();
  const { addToast } = useToast();

  const email = profile.email || 'contato@leonardonascimento.dev';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      addToast('success', 'E-mail copiado', `${email} foi copiado para a área de transferência.`);
    } catch {
      addToast('info', 'E-mail', email);
    }
  };

  return (
    <section id="contato" className="py-24 border-t border-white/8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3 mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-emerald-400">
            // 04. contato
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {profile.contactTitle || 'Vamos Conversar?'}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            {profile.contactSubtitle || 'Aberto a novas oportunidades de desenvolvimento backend e full stack, colaborações em projetos e troca de ideias sobre engenharia de software.'}
          </p>
        </div>

        {/* Direct Channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {/* Email Direct Channel */}
          <div className="p-6 rounded-2xl bg-surface/70 border border-white/10 flex flex-col justify-between gap-6">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-white">E-mail Principal</h3>
                <p className="text-xs font-mono text-gray-400 mt-1 break-all">{email}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-white/8">
              <a
                href={`mailto:${email}`}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-canvas font-semibold text-xs inline-flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <span>Enviar E-mail</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-4 py-2 rounded-xl bg-surface-elevated hover:bg-white/10 text-gray-200 font-mono text-xs border border-white/10 inline-flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <Copy className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copiar</span>
              </button>
            </div>
          </div>

          {/* WhatsApp & Socials Direct Channel */}
          <div className="p-6 rounded-2xl bg-surface/70 border border-white/10 flex flex-col justify-between gap-6">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                <WhatsappIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Redes &amp; Mensagem Direta</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Resposta rápida via WhatsApp, LinkedIn ou GitHub.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-white/8">
              <a
                href={profile.linkedinUrl || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-surface-elevated hover:bg-white/10 text-gray-200 font-medium text-xs border border-white/10 inline-flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href={profile.githubUrl || 'https://github.com/leonardonasls-stack'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-surface-elevated hover:bg-white/10 text-gray-200 font-medium text-xs border border-white/10 inline-flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <GithubIcon className="w-3.5 h-3.5 text-gray-300" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
