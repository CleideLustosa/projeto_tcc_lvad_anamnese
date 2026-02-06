// import React from 'react';
// import { Activity, Droplet } from 'lucide-react';
// import BatteryStatus from './BatteryStatus';
// import StatusCard from './StatusCard';
// import PerformanceChart from './PerformanceChart';

// const LVADDashboard = () => {
//   return (
//     <div className="space-y-6 animate-in fade-in duration-500 pb-10">
//       {/* Grid Superior: Componentes Independentes */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <BatteryStatus charge={92} voltage="14.2V" />
        
//         <StatusCard 
//           icon={<Activity size={24} />} 
//           title="Dados do LVAD em Tempo Real" 
//           value="9200" 
//           unit="RPM" 
//           status="Normal" 
//         />
        
//         <StatusCard 
//           icon={<Droplet size={24} className="fill-red-500 text-red-500" />} // Gota vermelha e preenchida
//           title="Fluxo Sanguíneo" 
//           value="4.8" 
//           unit="L/min" 
//           status="Normal"
//         />
//       </div>

//       {/* Seção do Gráfico */}
//       <PerformanceChart />
//     </div>
//   );
// };

// export default LVADDashboard;

import React from 'react';
import BatteryStatus from './BatteryStatus';
import RPMStatus from './RPMStatus';
import FluxoStatus from './FluxoStatus';
import PerformanceChart from './PerformanceChart';

const LVADDashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Agora passamos apenas o valor, o componente decide a cor e o status */}
        <BatteryStatus charge={92} voltage="14.2V" />
        <RPMStatus value={8000} />
        <FluxoStatus value={3} />
      </div>

      <PerformanceChart />
    </div>
  );
};

export default LVADDashboard;