import React from 'react';
import { Mail, Copy, ArrowUpRight } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import { useToast } from '../../context/ToastContext';
import { WhatsappIcon, GithubIcon, LinkedinIcon } from '../ui/SocialIcons';

export const ContactSection: React.FC = () => {
  const { profile } = useProfile();
  const { addToast } = useToast();

  const email = profile.email || 'leonardonasls@gmail.com';
  const whatsappUrl = `https://wa.me/5582999974649?text=${encodeURIComponent('Olá Leonardo! Vim através do seu portfólio e gostaria de conversar.')}`;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      addToast('success', 'E-mail copiado', `${email} foi copiado para a área de transferência.`);
    } catch {
      addToast('info', 'E-mail', email);
    }
  };

  const channels = [
    {
      name: 'WhatsApp',
      handle: 'Conversa direta',
      href: whatsappUrl,
      icon: <WhatsappIcon className="w-4 h-4 text-emerald-400" />,
    },
    {
      name: 'LinkedIn',
      handle: 'Perfil profissional',
      href: profile.linkedinUrl || 'https://linkedin.com',
      icon: <LinkedinIcon className="w-4 h-4 text-cyan-400" />,
    },
    {
      name: 'GitHub',
      handle: '@leonardonasls-stack',
      href: profile.githubUrl || 'https://github.com/leonardonasls-stack',
      icon: <GithubIcon className="w-4 h-4 text-gray-300" />,
    },
  ];

  return (
    <section id="contato" className="py-24 border-t border-white/8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline + Featured Email */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-widest text-emerald-400">
                // 04. contato
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {profile.contactTitle || 'Vamos Conversar?'}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl">
                {profile.contactSubtitle || 'Aberto a novas oportunidades de desenvolvimento backend e full stack, colaborações em projetos e troca de ideias sobre engenharia de software.'}
              </p>
            </div>

            {/* Featured Email Row */}
            <div className="pt-4 border-t border-white/8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-wider">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>E-mail Principal</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg sm:text-xl font-mono font-semibold text-white hover:text-emerald-400 transition-colors break-all"
                >
                  {email}
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={`mailto:${email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-canvas font-semibold text-xs inline-flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <span>Enviar E-mail</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-elevated text-gray-200 font-mono text-xs border border-white/10 inline-flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <Copy className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copiar</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Direct Channels List */}
          <div className="lg:col-span-5 space-y-3">
            <p className="font-mono text-xs uppercase tracking-wider text-gray-500 pb-2 border-b border-white/10">
              Canais Diretos
            </p>
            <div className="divide-y divide-white/8">
              {channels.map((ch) => (
                <a
                  key={ch.name}
                  href={ch.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-4 px-2 -mx-2 rounded-lg hover:bg-white/[0.025] transition-colors flex items-center justify-between gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <div className="flex items-center gap-3">
                    {ch.icon}
                    <div>
                      <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                        {ch.name}
                      </p>
                      <p className="text-xs font-mono text-gray-500">{ch.handle}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
