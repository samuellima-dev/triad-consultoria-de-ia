import React, { useState } from 'react';
import { Button } from './ui/Button';
import { analyzeBottleneck } from '../services/geminiService';
import { Sparkles, ChevronRight, Loader2, BrainCircuit } from 'lucide-react';

export const DiagnosticDemo: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setLoading(true);
    try {
      const analysis = await analyzeBottleneck(input);
      setResult(analysis);
    } catch (error) {
      setResult("Ocorreu um erro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface py-24 border-y border-slate-800/50" id="demo">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
             <BrainCircuit className="w-4 h-4 text-primary" />
             <span className="text-primary font-mono text-xs uppercase tracking-widest">Demonstração Interativa</span>
          </div>
          <h2 className="text-3xl font-serif text-white mt-2">Qual é o seu maior gargalo hoje?</h2>
          <p className="text-text-muted mt-3 max-w-xl mx-auto">
            Descreva brevemente um processo manual e repetitivo. Nossa IA fará um pré-diagnóstico instantâneo de automação.
          </p>
        </div>

        <div className="bg-page/50 p-2 shadow-inner border border-slate-700 rounded-lg flex flex-col md:flex-row gap-2 relative overflow-hidden transition-all duration-300 focus-within:border-primary focus-within:shadow-[0_0_25px_rgba(59,130,246,0.4)] group">
          {/* Glow effect behind input */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-50 group-focus-within:opacity-100 group-focus-within:h-[2px] transition-all duration-500"></div>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ex: Minha equipe gasta 4 horas por dia copiando dados de PDFs para o Excel..."
            className="flex-1 p-4 outline-none text-white placeholder-slate-500 bg-transparent z-10"
          />
          <Button 
            onClick={handleAnalyze} 
            disabled={loading}
            className="md:w-auto w-full whitespace-nowrap z-10"
          >
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            {loading ? "Analisando..." : "Gerar Solução"}
          </Button>
        </div>

        {result && (
          <div className="mt-8 bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl border border-slate-700 shadow-2xl animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 bg-primary/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            <h4 className="font-serif text-xl mb-4 text-white flex items-center gap-2 relative z-10">
              <Sparkles className="w-5 h-5 text-accent" />
              Diagnóstico Preliminar
            </h4>
            <p className="leading-relaxed text-stone-200 text-base relative z-10">
              {result}
            </p>
            <div className="mt-6 pt-6 border-t border-slate-700 flex justify-between items-center relative z-10">
              <span className="text-xs text-slate-500 font-mono">Powered by Gemini 2.5 Flash</span>
              <button className="text-primary-glow text-sm flex items-center hover:text-white transition-colors font-medium">
                Implementar essa solução <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};