import React from 'react';
import { Activity, Zap, Wind, Gauge } from 'lucide-react';

const LVADDashboard = () => {
  const parametros = [
    { label: "Fluxo", valor: "4.5", unidade: "L/min", icon: <Wind className="text-blue-500" /> },
    { label: "Velocidade", valor: "2400", unidade: "RPM", icon: <Gauge className="text-purple-500" /> },
    { label: "Potência", valor: "5.2", unidade: "Watts", icon: <Zap className="text-yellow-500" /> },
    { label: "Pulsatilidade", valor: "3.1", unidade: "PI", icon: <Activity className="text-red-500" /> }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-sm font-black text-[#327933] uppercase tracking-widest border-b pb-2">Monitoramento do Dispositivo</h2>
      
      {/* Cards de Parâmetros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {parametros.map((p) => (
          <div key={p.label} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center">
            <div className="bg-gray-50 p-2 rounded-full mb-2">{p.icon}</div>
            <span className="text-[10px] font-bold text-gray-400 uppercase">{p.label}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-gray-800">{p.valor}</span>
              <span className="text-xs font-bold text-gray-500">{p.unidade}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Status do Sistema */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
        <h3 className="text-xs font-bold text-gray-500 uppercase mb-4">Integridade do Sistema</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center bg-white p-3 rounded-lg border">
            <span className="text-sm text-gray-700">Cabo de Linha (Driveline)</span>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">ÍNTEGRO</span>
          </div>
          <div className="flex justify-between items-center bg-white p-3 rounded-lg border">
            <span className="text-sm text-gray-700">Controlador Reserva</span>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">CONECTADO</span>
          </div>
          <div className="flex justify-between items-center bg-white p-3 rounded-lg border">
            <span className="text-sm text-gray-700">Carga da Bateria Principal</span>
            <div className="w-24 bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="bg-[#327933] h-full w-[85%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LVADDashboard;