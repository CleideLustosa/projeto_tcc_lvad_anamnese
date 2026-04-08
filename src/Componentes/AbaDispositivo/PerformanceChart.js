// import React from 'react';
// import { TrendingUp, LayoutList } from 'lucide-react';

// const PerformanceChart = () => (
//   <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
//     <div className="flex justify-between items-center mb-8">
//       <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 uppercase tracking-tight">
//         <TrendingUp size={18} className="text-[#327933]" />
//         Performance do LVAD nas Últimas 24h
//       </h3>
//       <button className="flex items-center gap-2 bg-[#327933] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-green-800 transition-all shadow-md">
//         <LayoutList size={14} /> Histórico Detalhado
//       </button>
//     </div>
    
//     {/* Representação Visual do Gráfico do Protótipo */}
//     <div className="relative h-64 w-full bg-gray-50/50 rounded-xl border border-gray-100 flex items-end p-4 gap-2">
//       <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-10">
//         {[...Array(24)].map((_, i) => <div key={i} className="border border-gray-400"></div>)}
//       </div>
//       <p className="absolute inset-0 flex items-center justify-center text-gray-300 text-xs italic font-medium uppercase tracking-widest">
//         Área do Gráfico de Monitoramento
//       </p>
//     </div>
//   </div>
// );

// export default PerformanceChart;

import React, { useState } from 'react';
import { TrendingUp, LayoutList } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const periodOptions = [
  { key: '24h', label: 'Últimas 24 horas' },
  { key: '7dias', label: 'Últimos 7 dias' },
  { key: '15dias', label: 'Últimos 15 dias' },
  { key: '30dias', label: 'Últimos 30 dias' },
];

const periodData = {
  '24h': [
    { label: '00h', rpm: 9100 },
    { label: '04h', rpm: 9150 },
    { label: '08h', rpm: 9250 },
    { label: '12h', rpm: 9200 },
    { label: '16h', rpm: 9180 },
    { label: '20h', rpm: 9220 },
    { label: '24h', rpm: 9200 },
  ],
  '7dias': [
    { label: 'Dia 1', rpm: 9100 },
    { label: 'Dia 2', rpm: 9150 },
    { label: 'Dia 3', rpm: 9200 },
    { label: 'Dia 4', rpm: 9180 },
    { label: 'Dia 5', rpm: 9220 },
    { label: 'Dia 6', rpm: 9210 },
    { label: 'Dia 7', rpm: 9190 },
  ],
  '15dias': [
    { label: '1', rpm: 9100 }, { label: '2', rpm: 9130 }, { label: '3', rpm: 9150 },
    { label: '4', rpm: 9170 }, { label: '5', rpm: 9200 }, { label: '6', rpm: 9180 },
    { label: '7', rpm: 9195 }, { label: '8', rpm: 9210 }, { label: '9', rpm: 9200 },
    { label: '10', rpm: 9225 }, { label: '11', rpm: 9230 }, { label: '12', rpm: 9210 },
    { label: '13', rpm: 9190 }, { label: '14', rpm: 9185 }, { label: '15', rpm: 9200 },
  ],
  '30dias': [
    { label: '1', rpm: 9100 }, { label: '3', rpm: 9125 }, { label: '5', rpm: 9140 },
    { label: '7', rpm: 9155 }, { label: '9', rpm: 9165 }, { label: '11', rpm: 9180 },
    { label: '13', rpm: 9190 }, { label: '15', rpm: 9200 }, { label: '17', rpm: 9195 },
    { label: '19', rpm: 9180 }, { label: '21', rpm: 9170 }, { label: '23', rpm: 9165 },
    { label: '25', rpm: 9180 }, { label: '27', rpm: 9195 }, { label: '30', rpm: 9205 },
  ],
};

// Dados simulados apenas para teste
const data = [
  { hora: '00:00', rpm: 9100 },
  { hora: '04:00', rpm: 9150 },
  { hora: '08:00', rpm: 9250 },
  { hora: '12:00', rpm: 9200 },
  { hora: '16:00', rpm: 9180 },
  { hora: '20:00', rpm: 9220 },
  { hora: '24:00', rpm: 9200 },
];

const PerformanceChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7dias');
  const [showPeriodMenu, setShowPeriodMenu] = useState(false);
  const data = periodData[selectedPeriod];
  const selectedLabel = periodOptions.find((option) => option.key === selectedPeriod)?.label;

  const handlePeriodSelect = (key) => {
    setSelectedPeriod(key);
    setShowPeriodMenu(false);
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 uppercase tracking-tight">
            <TrendingUp size={18} className="text-[#327933]" />
            Performance do LVAD em {selectedLabel}
          </h3>
          <p className="text-xs text-gray-500 mt-1">Relatório de desempenho para médio e longo prazo.</p>
        </div>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowPeriodMenu((prev) => !prev)}
            className="flex items-center gap-2 bg-[#327933] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-green-800 transition-all shadow-md active:scale-95"
          >
            <LayoutList size={14} /> Histórico Detalhado
          </button>

          {showPeriodMenu && (
            <div className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
              <div className="px-4 py-3 border-b border-gray-100 text-xs uppercase tracking-[0.2em] text-gray-500">Escolha o período</div>
              {periodOptions.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => handlePeriodSelect(option.key)}
                  className={`w-full px-4 py-3 text-sm text-left transition ${
                    selectedPeriod === option.key ? 'bg-[#ecfdf5] text-[#065f46]' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              domain={[8500, 9500]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Line
              type="monotone"
              dataKey="rpm"
              stroke="#327933"
              strokeWidth={3}
              dot={{ r: 6, fill: '#327933', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 8, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;