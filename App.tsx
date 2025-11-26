import React, { useState, useEffect } from 'react';
import { BeforeAfterVisual } from './components/BeforeAfterVisual';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { AdminPanel } from './components/AdminPanel';
import { Button } from './components/ui/Button';
import { 
  ArrowRight, 
  Bot, 
  BrainCircuit, 
  LineChart, 
  Menu, 
  X,
  Workflow,
  MessageCircle,
  Instagram,
  Send,
  CheckCircle2,
  Loader2,
  Linkedin,
  Mail,
  Globe,
  Code
} from 'lucide-react';
import { ServiceItem, CaseStudy, ProcessStep, SiteConfig } from './types';

const services: ServiceItem[] = [
  {
    title: "Automação de Processos",
    description: "Otimizamos fluxos no Financeiro, Comercial, RH e Operações. Conectamos seus sistemas para eliminar trabalho manual repetitivo.",
    icon: Workflow
  },
  {
    title: "Agentes de IA Por Setor",
    description: "Funcionários digitais especialistas para cada departamento (Vendas, Suporte, RH ou Financeiro). Atuam 24/7 seguindo rigorosamente as regras de negócio de cada área.",
    icon: Bot
  },
  {
    title: "Análise de Dados com IA",
    description: "Inteligência de negócios baseada em dados reais e constantes. Dashboards preditivos que transformam números brutos em estratégias claras para tomada de decisão.",
    icon: LineChart
  },
  {
    title: "Automação de Instagram",
    description: "Transforme seguidores em clientes. Respostas automáticas a DMs, comentários e menções em stories para conversão instantânea.",
    icon: Instagram
  },
  {
    title: "Criação de Sites com IA",
    description: "Landing pages de alta conversão e design premium. Estruturas velozes, otimizadas para SEO e vendas, integradas nativamente com nossas ferramentas de IA.",
    icon: Globe
  },
  {
    title: "Sistemas Inteligentes",
    description: "Desenvolvimento de softwares web personalizados e painéis administrativos sob medida. Soluções robustas para gerenciar processos complexos da sua empresa.",
    icon: Code
  }
];

const cases: CaseStudy[] = [
  {
    client: "Psicóloga Amanda Soares",
    sector: "Saúde & Bem-estar",
    metric: "+45% Agendamentos",
    description: "Antes eu tinha dificuldade para atrair pacientes e isso afetava meus resultados. Depois da Automação de Engajamento, comecei a receber contatos realmente interessados e ainda passei a distribuir meu e-book automaticamente. Hoje meu Instagram gera oportunidades todos os dias — sem a automação, eu não teria alcançado esse crescimento."
  },
  {
    client: "E-commerce de Importados",
    sector: "Varejo Online",
    metric: "3x Mais Recuperação",
    description: "Com o aumento das vendas, não conseguíamos responder todos os clientes e perdíamos pedidos. Após implementar a Automação de Recuperação de Vendas, aumentamos o faturamento e melhoramos a experiência do cliente. A automação pagou-se rapidamente — foi um divisor de águas para nosso e-commerce."
  },
  {
    client: "Loja de Carros Multimarcas",
    sector: "Varejo Automotivo",
    metric: "Atendimento 24/7",
    description: "Recebíamos muitos leads dos anúncios, mas não conseguíamos atender todos, principalmente à noite. Com o Agente de IA de pré-atendimento, nenhuma oportunidade é perdida, o atendimento ficou mais rápido e as vendas aumentaram. Hoje temos um agente 24 horas qualificando leads e entregando oportunidades prontas para o vendedor."
  },
  {
    client: "Agência de Marketing Digital",
    sector: "Serviços B2B",
    metric: "-15h Semanais",
    description: "Nossos clientes queriam relatórios rápidos e atualizados, mas o processo manual atrasava as entregas. Com a automação, os relatórios são gerados e enviados a cada 7 dias automaticamente, trazendo transparência, agilidade e satisfação para os clientes. Ganhamos tempo e aumentamos a percepção de profissionalismo."
  }
];

const steps: ProcessStep[] = [
  { number: "01", title: "Diagnóstico 360º", description: "Analisamos gargalos em atendimento, vendas, financeiro e operações." },
  { number: "02", title: "Arquitetura Triad", description: "Desenhamos a solução ideal integrando IA e ferramentas de automação." },
  { number: "03", title: "Implementação Ágil", description: "Entregas rápidas. Você vê o sistema rodando e gerando valor em poucas semanas." },
  { number: "04", title: "Escala & Suporte", description: "Acompanhamento contínuo para garantir que a automação evolua com sua empresa." }
];

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Site Config State for Admin Panel
  const [siteConfig, setSiteConfig] = useState<SiteConfig>({
    showHero: true,
    showMethodology: true,
    showServices: true,
    showCases: true,
    showContact: true
  });

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    message: ''
  });

  // Notification State
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Play Sound (Simple 'pop' sound effect)
    const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=notification-sound-7062.mp3'); 
    audio.volume = 0.5;
    audio.play().catch(err => console.log("Audio play blocked", err));

    // 2. Show Visual Notification
    setShowSuccessNotification(true);

    const phone = "5581999644682";
    const text = `Olá, vim pelo site da Triad.\n\nNome: ${formData.name}\nEmpresa: ${formData.company}\n\nInteresse: ${formData.message || "Gostaria de saber mais sobre automação."}`;
    
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

    // 3. Delay Redirect slightly for UX
    setTimeout(() => {
        window.open(url, '_blank');
        // Reset form and notification after a bit
        setTimeout(() => {
            setShowSuccessNotification(false);
            setFormData({ name: '', company: '', message: '' });
        }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen font-sans text-text-main bg-page selection:bg-primary selection:text-white overflow-x-hidden pb-20 md:pb-0">
      
      {/* Success Notification Toast */}
      {showSuccessNotification && (
        <div className="fixed top-24 right-6 z-50 animate-in slide-in-from-right-10 fade-in duration-300">
          <div className="bg-surface border border-primary/50 text-white px-6 py-4 rounded-lg shadow-2xl shadow-primary/20 flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-full">
                <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <div>
                <h4 className="font-semibold text-sm">Mensagem Preparada!</h4>
                <p className="text-xs text-slate-400">Redirecionando para o WhatsApp...</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-page/90 backdrop-blur-md py-4 border-b border-slate-800' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <BrainCircuit className="text-white w-5 h-5" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-white">
              TRIAD
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Metodologia', 'Serviços', 'Casos', 'Contato'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-medium text-text-muted hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all bg-transparent border-none cursor-pointer"
              >
                {item}
              </button>
            ))}
            <Button 
              variant="primary" 
              className="ml-4 !py-2 hover:scale-105 transition-transform duration-300"
              onClick={() => scrollToSection('contato')}
            >
              Falar no WhatsApp
            </Button>
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-surface border-t border-slate-800 p-6 flex flex-col gap-4 md:hidden shadow-xl">
             {['Metodologia', 'Serviços', 'Casos', 'Contato'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-slate-300 text-lg py-2 border-b border-slate-800 hover:text-primary text-left bg-transparent"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      {siteConfig.showHero && (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
          {/* Background Gradient Mesh */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
             <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"></div>
             <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900/50 rounded-full border border-slate-700 backdrop-blur-sm">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                <span className="text-xs font-semibold tracking-wider uppercase text-primary-glow">Triad Consultoria</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-[1.1] text-white">
                Sua empresa no <br/> 
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-glow to-accent">
                  piloto automático.
                </span>
              </h1>
              
              <p className="text-lg text-text-muted max-w-md leading-relaxed">
                Do atendimento comercial ao fechamento financeiro. Construímos a inteligência que elimina gargalos operacionais.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button variant="primary" onClick={() => scrollToSection('contato')}>
                  Consultoria Gratuita
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="outline" onClick={() => scrollToSection('casos')}>
                  Ver Resultados
                </Button>
              </div>
            </div>

            <div className="relative z-10">
              <BeforeAfterVisual />
            </div>
          </div>
        </section>
      )}

      {/* Methodology / Process Section */}
      {siteConfig.showMethodology && (
        <section id="metodologia" className="py-24 bg-surface border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-serif mb-4 text-white">Não é sobre planilhas.<br/>É sobre <span className="text-primary">eficiência global.</span></h2>
                <p className="text-text-muted">
                  Seja no comercial, financeiro ou suporte: se o processo é repetitivo, nós automatizamos. Liberte seu time para pensar e agir com estratégia, enquanto nossas soluções realizam o trabalho pesado.
                </p>
              </div>
              <Button variant="outline" className="border-slate-600 text-white hover:border-primary">
                Veja como trabalhamos
              </Button>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step, idx) => (
                <div key={idx} className="group relative p-6 border border-slate-800 bg-page/50 hover:bg-slate-800/50 transition-all duration-300 rounded-lg overflow-hidden hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full group-hover:bg-primary/10 transition-colors"></div>
                  <div className="text-6xl font-serif text-slate-800 group-hover:text-primary/20 absolute top-2 right-2 transition-colors font-bold select-none">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 relative z-10 text-white">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed relative z-10">{step.description}</p>
                  <div className="w-full h-0.5 bg-slate-800 absolute bottom-0 left-0">
                     <div className="w-0 group-hover:w-full h-full bg-gradient-to-r from-primary to-accent transition-all duration-700 ease-out"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {siteConfig.showServices && (
        <section id="serviços" className="py-24 bg-page relative">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-serif mb-6 text-white">O que oferecemos para sua empresa</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {services.map((service, idx) => (
                <div key={idx} className="space-y-4 group p-8 rounded-xl bg-page hover:bg-surface transition-all duration-300 border border-slate-800 hover:border-primary/30 shadow-lg hover:shadow-primary/5">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-surface flex-shrink-0 flex items-center justify-center rounded-lg border border-slate-800 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-lg group-hover:shadow-primary/30 group-hover:-translate-y-1">
                      <service.icon className="w-7 h-7" />
                    </div>
                    <div>
                       <h3 className="text-xl font-medium text-white mb-2 group-hover:text-primary-glow transition-colors">{service.title}</h3>
                       <p className="text-slate-400 leading-relaxed text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case Studies Section */}
      {siteConfig.showCases && (
        <section id="casos" className="py-24 bg-surface border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-serif mb-12 text-center text-white">Veja o impacto em algumas empresas</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {cases.map((item, idx) => (
                <div key={idx} className="bg-page p-8 rounded-xl border border-slate-800 hover:border-primary/50 transition-colors group relative overflow-hidden">
                  {/* Hover Glow */}
                  <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors"></div>
                  
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div>
                      <h3 className="font-bold text-lg text-white">{item.client}</h3>
                      <span className="text-xs uppercase tracking-widest text-slate-500">{item.sector}</span>
                    </div>
                    <div className="bg-primary/10 text-primary-glow px-3 py-1 text-sm font-semibold rounded-full border border-primary/20 whitespace-nowrap">
                      {item.metric}
                    </div>
                  </div>
                  <p className="text-slate-300 text-base leading-relaxed relative z-10">"{item.description}"</p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-slate-400 font-medium relative z-10">
                      <LineChart className="w-4 h-4 text-primary" /> Resultado validado
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Form / Footer */}
      {siteConfig.showContact && (
        <section id="contato" className="bg-page py-20 border-t border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] transform translate-x-1/2 translate-y-1/2"></div>
              <div className="absolute left-0 top-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
            
            {/* Text Side */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                  <BrainCircuit className="w-6 h-6 text-white" />
                </div>
                <span className="font-serif text-2xl font-bold text-white">TRIAD</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight text-white">
                Vamos automatizar sua empresa?
              </h2>
              <p className="text-slate-400 mb-8 text-lg">
                Preencha o formulário e fale diretamente conosco pelo WhatsApp. Entenderemos seu cenário e mostraremos onde a IA pode atuar hoje.
              </p>
              
              <div className="space-y-4 text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface border border-slate-700 flex items-center justify-center text-primary">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <span>Atendimento direto via WhatsApp</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface border border-slate-700 flex items-center justify-center text-primary">
                    <Bot className="w-4 h-4" />
                  </div>
                  <span>Diagnóstico preliminar sem custo</span>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="bg-surface border border-slate-800 text-white p-8 rounded-2xl shadow-2xl relative">
              <h3 className="text-2xl font-serif mb-6 text-white">Fale com um Especialista</h3>
              <form onSubmit={handleWhatsAppSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Seu Nome</label>
                  <input 
                    required
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full p-3 bg-page border border-slate-700 rounded-lg focus:outline-none focus:border-primary transition-colors text-white placeholder-slate-600"
                    placeholder="João Silva"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Nome da Empresa</label>
                  <input 
                    required
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleFormChange}
                    className="w-full p-3 bg-page border border-slate-700 rounded-lg focus:outline-none focus:border-primary transition-colors text-white placeholder-slate-600"
                    placeholder="Sua Empresa Ltda"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Onde precisa de ajuda?</label>
                  <select 
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    className="w-full p-3 bg-page border border-slate-700 rounded-lg focus:outline-none focus:border-primary transition-colors text-slate-300"
                  >
                    <option value="" disabled>Selecione uma área...</option>
                    <option value="Quero automatizar meu Atendimento/Vendas">Atendimento & Vendas (IA)</option>
                    <option value="Quero otimizar processos Financeiros/Adm">Financeiro & Administrativo</option>
                    <option value="Quero automatizar meu Instagram">Instagram & Redes Sociais</option>
                    <option value="Quero criar um Site ou Landing Page">Criação de Sites & Landing Pages</option>
                    <option value="Preciso de um Sistema Inteligente Personalizado">Sistemas Inteligentes & Software</option>
                    <option value="Tenho uma demanda específica">Outra demanda específica</option>
                  </select>
                </div>
                
                <Button className="w-full text-lg py-4 justify-center mt-4 shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed" disabled={showSuccessNotification}>
                  {showSuccessNotification ? (
                     <span className="flex items-center gap-2"><Loader2 className="animate-spin w-5 h-5" /> Redirecionando...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar para WhatsApp
                    </>
                  )}
                </Button>
                <p className="text-xs text-slate-500 text-center mt-4">
                  Ao clicar, você será redirecionado para o WhatsApp da Triad.
                </p>
              </form>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="max-w-7xl mx-auto px-6 mt-20 border-t border-slate-800 pt-8 flex justify-center items-center text-slate-500 text-sm">
            <div className="text-center">
              © 2025 Triad Consultoria de Automação, Dados e IA.
            </div>
          </div>
        </section>
      )}

      {/* Fixed Components */}
      <WhatsAppFloat />
      <AdminPanel config={siteConfig} setConfig={setSiteConfig} />
    </div>
  );
}

export default App;