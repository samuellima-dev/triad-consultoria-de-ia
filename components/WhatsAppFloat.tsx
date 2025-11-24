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
          <img 
            src="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-whatsapp-icon-png-image_6315990.png" 
            alt="WhatsApp" 
            className="w-16 h-16 drop-shadow-[0_0_15px_rgba(37,211,102,0.6)]"
          />
        )}
      </button>
    </div>
  );
};