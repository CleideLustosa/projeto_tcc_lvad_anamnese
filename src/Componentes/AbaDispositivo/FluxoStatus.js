import React from 'react';
import { Droplet } from 'lucide-react';

const FluxoStatus = ({ value }) => {
  // Lógica de saúde para Fluxo (Exemplo: Normal entre 4.0 e 6.0 L/min)
  const getFluxoStatus = (val) => {
    if (val >= 4.0 && val <= 6.0) {
      return { color: 'text-red-500', bg: 'bg-green-100 text-green-700 border-green-200', label: 'Normal' };
    }
    if (val >= 3.0 && val < 4.0) {
      return { color: 'text-red-500', bg: 'bg-yellow-50 text-yellow-700 border-yellow-200', label: 'Baixo Fluxo' };
    }
    return { color: 'text-red-500', bg: 'bg-red-50 text-red-700 border-red-200', label: 'Crítico' };
  };

  const status = getFluxoStatus(value);

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center flex flex-col items-center">
      <div className={`mb-4 ${status.color} p-3 rounded-full`}>
        <Droplet size={24} className="fill-current" />
      </div>
      <h4 className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">Fluxo Sanguíneo</h4>
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-4xl font-black text-gray-800 tracking-tight">{value}</span>
        <span className="text-sm font-semibold text-gray-400">L/min</span>
      </div>
      <span className={`mt-4 inline-block px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${status.bg}`}>
        {status.label}
      </span>
    </div>
  );
};

export default FluxoStatus;