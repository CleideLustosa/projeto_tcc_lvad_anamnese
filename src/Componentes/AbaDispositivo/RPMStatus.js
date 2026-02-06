import React from 'react';
import { Activity } from 'lucide-react';

const RPMStatus = ({ value }) => {
  // Lógica de saúde para RPM (Exemplo: Normal entre 8800 e 9500)
  const getRPMStatus = (val) => {
    if (val >= 8800 && val <= 9500) {
      return { color: 'text-green-500', bg: 'bg-green-100 text-green-700 border-green-200', label: 'Normal' };
    }
    if (val > 9500 || (val >= 8500 && val < 8800)) {
      return { color: 'text-yellow-500', bg: 'bg-yellow-50 text-yellow-700 border-yellow-200', label: 'Atenção' };
    }
    return { color: 'text-red-500', bg: 'bg-red-50 text-red-700 border-red-200', label: 'Crítico' };
  };

  const status = getRPMStatus(value);

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center flex flex-col items-center">
      <div className={`mb-4 ${status.color} bg-opacity-10 p-3 rounded-full`}>
        <Activity size={24} />
      </div>
      <h4 className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">Rotação (RPM)</h4>
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-4xl font-black text-gray-800 tracking-tight">{value}</span>
        <span className="text-sm font-semibold text-gray-400">RPM</span>
      </div>
      <span className={`mt-4 inline-block px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${status.bg}`}>
        {status.label}
      </span>
    </div>
  );
};

export default RPMStatus;