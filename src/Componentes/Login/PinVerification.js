import React, { useState } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';

const PinVerification = ({ onConfirm, onBack }) => {
  const [pin, setPin] = useState(['', '', '', '']);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setPin([...pin.map((d, idx) => (idx === index ? element.value : d))]);
    
    // Foco automático no próximo campo
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans p-4">
      <div className="w-full max-w-[460px] bg-white rounded-[3rem] p-12 shadow-2xl shadow-slate-200/60 border border-white animate-in fade-in zoom-in duration-1000 text-center">
        
        {/* Botão Voltar */}
        <button 
          onClick={onBack} 
          className="group flex items-center gap-2 text-[10px] font-bold uppercase text-slate-400 hover:text-[#327933] transition-colors mb-8"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          Voltar ao Login
        </button>

        {/* Cabeçalho com Coração Minimalista */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-[#327933] rounded-full flex items-center justify-center shadow-lg shadow-green-900/10 mb-8 border-[6px] border-green-50">
            {/* Coração apenas com contorno fino, sem preenchimento */}
            <Heart size={36} color="white" fill="none" strokeWidth={1.5} />
          </div>
          
          <h1 className="text-[28px] font-black tracking-tight text-slate-800 leading-none">
            Verificação de Acesso
          </h1>
          <p className="text-[11px] font-bold uppercase text-slate-400 mt-4 tracking-[0.2em] px-4">
            Insira o código de segurança enviado ao seu dispositivo
          </p>
        </div>

        {/* Campos de PIN */}
        <div className="flex justify-center gap-4 mb-10">
          {pin.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="w-16 h-20 bg-slate-100 border border-slate-200 rounded-2xl text-center text-3xl font-black text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-green-500/5 focus:border-[#327933] transition-all"
              value={data}
              onChange={e => handleChange(e.target, index)}
              onFocus={e => e.target.select()}
            />
          ))}
        </div>

        {/* Botão de Autenticação */}
        <button 
          onClick={onConfirm}
          className="w-full bg-[#327933] hover:bg-[#2a662b] text-white font-bold py-5 rounded-2xl shadow-xl shadow-green-900/20 transition-all active:scale-[0.98] uppercase tracking-[0.2em] text-xs"
        >
          Confirmar Autenticação
        </button>

        <div className="mt-4 text-center text-sm">
          <p className="text-slate-500 font-medium">Não recebeu o código?</p>
          <button onClick={onBack} className="text-[#327933] font-bold hover:underline">Reenviar código</button>
        </div>

        <p className="mt-8 text-slate-300 text-[9px] font-bold tracking-[0.3em] uppercase">
          Technology for Life Support
        </p>
      </div>
    </div>
  );
};

export default PinVerification;