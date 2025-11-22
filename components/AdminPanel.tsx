import React, { useState } from 'react';
import { Settings, Check, EyeOff, Eye } from 'lucide-react';
import { SiteConfig } from '../types';

interface AdminPanelProps {
  config: SiteConfig;
  setConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ config, setConfig }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = (key: keyof SiteConfig) => {
    setConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const sectionLabels: Record<keyof SiteConfig, string> = {
    showHero: 'Seção Hero (Topo)',
    showMethodology: 'Metodologia',
    showServices: 'Serviços',
    showCases: 'Casos de Sucesso',
    showContact: 'Formulário de Contato'
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {isOpen && (
        <div className="bg-surface border border-slate-700 text-slate-200 mb-4 p-4 rounded-lg shadow-2xl w-64 animate-in slide-in-from-bottom-5 fade-in">
          <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
            <h3 className="font-serif text-primary font-medium">Editor do Site</h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white">
              <EyeOff className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-2">
            {(Object.keys(config) as Array<keyof SiteConfig>).map((key) => (
              <button
                key={key}
                onClick={() => toggleSection(key)}
                className={`w-full flex items-center justify-between p-2 rounded text-sm transition-colors ${
                  config[key] 
                    ? 'bg-slate-800 hover:bg-slate-700 text-white' 
                    : 'bg-slate-900/50 text-slate-500 hover:bg-slate-800'
                }`}
              >
                <span>{sectionLabels[key]}</span>
                {config[key] ? <Eye className="w-3 h-3 text-primary" /> : <EyeOff className="w-3 h-3" />}
              </button>
            ))}
          </div>
          <div className="mt-4 text-xs text-slate-600 text-center">
            *As alterações são locais (preview).
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 bg-surface hover:bg-surface-hover border border-slate-700 text-slate-400 hover:text-primary rounded-full shadow-lg flex items-center justify-center transition-all"
        title="Editar Seções do Site"
      >
        <Settings className="w-5 h-5" />
      </button>
    </div>
  );
};