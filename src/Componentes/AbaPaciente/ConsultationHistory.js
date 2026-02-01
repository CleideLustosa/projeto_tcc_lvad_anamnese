import React from 'react';

const ConsultationHistory = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <h3 className="font-bold text-sm border-b pb-2 mb-3 text-gray-700 uppercase">Histórico Recente</h3>
      <ul className="text-xs space-y-2 text-gray-600">
        <li className="flex justify-between">15/10/2024 <span className="text-blue-600 font-bold">Ver</span></li>
        <li className="flex justify-between">15/09/2024 <span className="text-blue-600 font-bold">Ver</span></li>
      </ul>
    </div>
  );
};

export default ConsultationHistory;