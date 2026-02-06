import React from 'react';
import { BatteryMedium } from 'lucide-react';

const BatteryStatus = ({ charge, voltage }) => {
  // Lógica centralizada para cores e mensagens de status
  const getBatteryInfo = (percent) => {
    if (percent >= 70) {
      return { 
        colorClass: 'text-green-500', 
        badgeClass: 'bg-green-100 text-green-700 border-green-200',
        text: 'Normal' 
      };
    }
    if (percent >= 30) {
      return { 
        colorClass: 'text-yellow-500', 
        badgeClass: 'bg-yellow-50 text-yellow-700 border-yellow-200',
        text: 'Atenção' 
      };
    }
    return { 
      colorClass: 'text-red-500', 
      badgeClass: 'bg-red-50 text-red-700 border-red-200',
      text: 'Crítico' 
    };
  };

  const { colorClass, badgeClass, text } = getBatteryInfo(charge);

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center flex flex-col items-center">
      <div className={`mb-4 ${colorClass} transition-colors duration-500`}>
        <BatteryMedium size={48} />
      </div>
      
      <h4 className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">
        Status da Bateria
      </h4>
      
      <div className="text-4xl font-black text-gray-800 tracking-tight">
        {charge}%
      </div>
      
      <div className="text-xs font-semibold text-gray-400 mt-1 uppercase">
        Voltagem: {voltage}
      </div>
      
      {/* O badge agora muda o texto e a cor automaticamente */}
      <span className={`mt-4 inline-block px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${badgeClass}`}>
        {text}
      </span>
    </div>
  );
};

export default BatteryStatus;