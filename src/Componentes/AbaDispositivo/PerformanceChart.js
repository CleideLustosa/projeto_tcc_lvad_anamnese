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

import React from 'react';
import { TrendingUp, LayoutList } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Dados simulados baseados no seu protótipo
const data = [
  { hora: '00:00', rpm: 9100 },
  { hora: '04:00', rpm: 9150 },
  { hora: '08:00', rpm: 9250 },
  { hora: '12:00', rpm: 9200 },
  { hora: '16:00', rpm: 9180 },
  { hora: '20:00', rpm: 9220 },
  { hora: '24:00', rpm: 9200 },
];

const PerformanceChart = () => (
  <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in duration-700">
    <div className="flex justify-between items-center mb-8">
      <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 uppercase tracking-tight">
        <TrendingUp size={18} className="text-[#327933]" />
        Performance do LVAD nas Últimas 24h
      </h3>
      <button className="flex items-center gap-2 bg-[#327933] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-green-800 transition-all shadow-md active:scale-95">
        <LayoutList size={14} /> Histórico Detalhado
      </button>
    </div>
    
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="hora" 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#9ca3af', fontSize: 12}}
            dy={10}
          />
          <YAxis 
            domain={[8500, 9500]} 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#9ca3af', fontSize: 12}}
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

export default PerformanceChart;