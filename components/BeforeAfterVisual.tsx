import React, { useEffect, useState } from 'react';
import { FileWarning, CheckCircle2, ArrowRight, Clock, Zap } from 'lucide-react';

export const BeforeAfterVisual: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Loop animation for the "Automation" side
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto lg:max-w-full bg-surface/50 backdrop-blur-sm rounded-xl p-6 border border-slate-800 shadow-2xl">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-slate-800 via-primary to-slate-800 opacity-50"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        {/* Divider */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-slate-800 transform -translate-x-1/2"></div>

        {/* Before Side */}
        <div className="space-y-4 opacity-80">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-text-muted font-serif italic">Manual & Lento</h4>
            <Clock className="w-4 h-4 text-red-400" />
          </div>
          
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-page/50 border border-red-900/20 rounded animate-pulse">
              <FileWarning className="w-5 h-5 text-slate-600" />
              <div className="space-y-2 w-full">
                <div className="h-2 w-3/4 bg-slate-800 rounded"></div>
                <div className="h-2 w-1/2 bg-slate-800 rounded"></div>
              </div>
            </div>
          ))}
          <p className="text-xs text-slate-600 mt-4 text-center font-mono">
            Erros Humanos • Gargalos
          </p>
        </div>

        {/* After Side */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-primary-glow font-serif">Triad Automação</h4>
            <Zap className="w-4 h-4 text-primary" />
          </div>

          {[0, 1, 2].map((i) => (
            <div 
              key={i} 
              className={`flex items-center gap-3 p-3 bg-surface rounded transition-all duration-500 ${
                activeStep === i 
                  ? 'border-l-2 border-primary bg-surface-hover translate-x-1 shadow-lg shadow-primary/10' 
                  : 'border-l-2 border-transparent opacity-40'
              }`}
            >
              <CheckCircle2 className={`w-5 h-5 ${activeStep === i ? 'text-primary' : 'text-slate-600'}`} />
              <div className="w-full">
                <div className={`h-2 rounded mb-2 transition-all duration-300 ${activeStep === i ? 'bg-primary/40 w-full' : 'bg-slate-800 w-3/4'}`}></div>
                <div className={`h-2 rounded transition-all duration-300 ${activeStep === i ? 'bg-primary/20 w-2/3' : 'bg-slate-800 w-1/2'}`}></div>
              </div>
            </div>
          ))}
           <p className="text-xs text-primary/60 mt-4 text-center font-mono">
            Automated • Scalable • ROI
          </p>
        </div>
      </div>

      {/* Overlay Label */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-surface border border-slate-700 rounded-full p-2 shadow-xl hidden md:block">
        <ArrowRight className="w-4 h-4 text-white" />
      </div>
    </div>
  );
};