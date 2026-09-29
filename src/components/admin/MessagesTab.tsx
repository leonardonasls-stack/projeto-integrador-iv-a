import React, { useState, useEffect } from 'react';
import { EmailService } from '../../services/emailService';
import { Mail, Trash2, Calendar, User, AtSign, Loader2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export const MessagesTab: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await EmailService.getMessages();
      setMessages(data || []);
    } catch (error: any) {
      addToast('error', 'Erro', 'Não foi possível carregar as mensagens.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Deseja excluir esta mensagem permanentemente?')) return;
    
    try {
      await EmailService.deleteMessage(id);
      setMessages(messages.filter(m => m.id !== id));
      addToast('success', 'Sucesso', 'Mensagem excluída.');
    } catch (error: any) {
      addToast('error', 'Erro', 'Falha ao excluir mensagem.');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <p className="text-xs">Carregando mensagens...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <h4 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <span>Mensagens de Contato ({messages.length})</span>
        </h4>
        <button 
          onClick={fetchMessages}
          className="text-xs font-semibold text-slate-400 hover:text-white"
        >
          Atualizar Lista
        </button>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-12 text-slate-500 text-xs">
          Nenhuma mensagem recebida ainda.
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 text-left">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-bold text-white">{msg.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AtSign className="w-4 h-4 text-slate-400" />
                    <a href={`mailto:${msg.email}`} className="text-xs text-indigo-400 hover:underline">
                      {msg.email}
                    </a>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(msg.created_at).toLocaleString('pt-BR')}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 transition-colors bg-rose-950/30 px-2 py-1 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Excluir
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Assunto: {msg.subject || 'Sem Assunto'}
                </h5>
                <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-wrap">
                  {msg.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
