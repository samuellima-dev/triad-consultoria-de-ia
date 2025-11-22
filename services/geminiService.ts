import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;

export const analyzeBottleneck = async (bottleneckDescription: string): Promise<string> => {
  if (!apiKey) {
    return "Simulação: Identificamos que este processo manual consome tempo e gera riscos de erro. A implementação de uma automação segura organizaria esses dados instantaneamente, liberando sua equipe para tarefas mais importantes. (Configure sua API Key para uma análise real).";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: "Você é um consultor especialista da Triad Consultoria. O usuário descreverá um problema na empresa. Sua resposta deve ser curta, clara e objetiva (máximo 2 parágrafos). Explique como a Automação e a Inteligência Artificial podem resolver esse problema específico de forma rápida e segura. Evite termos técnicos complexos ou jargões de programação. Foque na solução prática, na segurança da informação e no ganho imediato de tempo e tranquilidade para o dono da empresa.",
        thinkingConfig: { thinkingBudget: 0 }
      },
      contents: bottleneckDescription,
    });

    return response.text || "Não foi possível gerar o diagnóstico no momento.";
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "Ocorreu um erro ao processar sua análise. Por favor, tente novamente.";
  }
};

export const chatWithAssistant = async (userMessage: string): Promise<string> => {
  if (!apiKey) {
    return "Olá! Sou o assistente virtual da Triad. Como posso ajudar a automatizar sua empresa hoje? (Simulação: Configure sua API Key)";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `Você é o assistente virtual da TRIAD CONSULTORIA DE IA. 
        
        Sobre a empresa:
        - Especialista em Automação de Processos (Financeiro, Comercial, RH, Operações).
        - Implementa Agentes de IA para Vendas, Atendimento e qualquer outra área que precise de resposta rápida (atendimento 24/7).
        - Automação de Instagram e redes sociais.
        - Foco em ROI, redução de trabalho manual e eficiência.
        
        Seu comportamento:
        - Responda de forma concisa, profissional e educada.
        - Se perguntarem preços, diga que depende do escopo e convide para preencher o formulário de contato ou clicar no botão de WhatsApp.
        - Seu objetivo é tirar dúvidas básicas e encaminhar o usuário para o contato humano.
        
        Contato:
        - WhatsApp: (81) 99964-4682
        `,
      },
      contents: userMessage,
    });

    return response.text || "Desculpe, não entendi. Poderia reformular?";
  } catch (error) {
    console.error("Error calling Gemini Chat:", error);
    return "Estou com dificuldades de conexão no momento. Por favor, use o WhatsApp.";
  }
};