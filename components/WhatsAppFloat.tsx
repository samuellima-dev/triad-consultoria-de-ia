import React, { useState } from 'react';
import { MessageCircle, X, Send, Loader2, User, Mail, Phone, Briefcase } from 'lucide-react';

export const WhatsAppFloat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    segment: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Play sound
    const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=notification-sound-7062.mp3'); 
    audio.volume = 0.5;
    audio.play().catch(err => console.log("Audio play blocked", err));

    const phone = "5581999644682";
    const text = `*Contato via Site (Triad)*\n\n*Nome:* ${formData.name}\n*Email:* ${formData.email}\n*WhatsApp:* ${formData.whatsapp}\n*Segmento:* ${formData.segment}`;
    
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

    setTimeout(() => {
      window.open(url, '_blank');
      setLoading(false);
      setIsOpen(false);
      setFormData({ name: '', email: '', whatsapp: '', segment: '' });
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Form Modal */}
      {isOpen && (
        <div className="bg-surface w-80 md:w-96 rounded-xl shadow-2xl flex flex-col border border-slate-700 mb-4 animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden">
          
          {/* Header */}
          <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#25D366] rounded-lg flex items-center justify-center shadow-lg">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-serif font-medium text-white">Fale Conosco</h3>
                <p className="text-xs text-slate-400">Preencha para iniciar a conversa</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 bg-page">
            <form onSubmit={handleSend} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400 ml-1">Seu Nome</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input 
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text" 
                    placeholder="Digite seu nome"
                    className="w-full bg-surface border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder-slate-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400 ml-1">E-mail Corporativo</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input 
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email" 
                    placeholder="seu@email.com"
                    className="w-full bg-surface border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder-slate-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400 ml-1">WhatsApp</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input 
                    required
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    type="tel" 
                    placeholder="(00) 00000-0000"
                    className="w-full bg-surface border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder-slate-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400 ml-1">Segmento da Empresa</label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <select 
                    required
                    name="segment"
                    value={formData.segment}
                    onChange={handleChange}
                    className="w-full bg-surface border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-300 focus:outline-none focus:border-primary transition-colors appearance-none"
                  >
                    <option value="" disabled>Selecione...</option>
                    <option value="Varejo">Varejo</option>
                    <option value="Serviços">Serviços</option>
                    <option value="Saúde">Saúde</option>
                    <option value="Indústria">Indústria</option>
                    <option value="Tecnologia">Tecnologia</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#25D366] hover:bg-[#20b858] text-white font-medium py-3 rounded-lg shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 transition-all mt-2 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Iniciando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Iniciar Conversa
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group relative z-50 transition-transform duration-300 hover:scale-110 focus:outline-none"
        title="Falar no WhatsApp"
      >
        {isOpen ? (
          <div className="w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center shadow-lg border border-slate-700">
             <X className="w-6 h-6 text-white" />
          </div>
        ) : (
          <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.6)] border-2 border-white/10">
            <svg 
              viewBox="0 0 24 24" 
              className="w-9 h-9 text-white fill-current" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </div>
        )}
      </button>
    </div>
  );
};
