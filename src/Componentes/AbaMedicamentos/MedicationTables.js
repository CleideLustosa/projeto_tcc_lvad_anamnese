import React from 'react';
import { Pill, Clock, Plus } from 'lucide-react';

const MedicationTables = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Tabela de Medicamentos Prescritos */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Pill className="text-[#327933]" size={20} />
            <h3 className="font-bold text-gray-700 uppercase text-sm">Medicamentos Prescritos</h3>
          </div>
          <button className="text-xs bg-[#327933] text-white px-3 py-1 rounded-full flex items-center gap-1 hover:bg-green-800 transition-colors">
            <Plus size={14} /> ADICIONAR
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 font-bold">Medicamento</th>
                <th className="px-6 py-3 font-bold">Dosagem</th>
                <th className="px-6 py-3 font-bold">Via</th>
                <th className="px-6 py-3 font-bold">Frequência</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Varfarina</td>
                <td className="px-6 py-4">5mg</td>
                <td className="px-6 py-4">Oral</td>
                <td className="px-6 py-4">1x ao dia</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Aspirina</td>
                <td className="px-6 py-4">100mg</td>
                <td className="px-6 py-4">Oral</td>
                <td className="px-6 py-4">Após o almoço</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabela de Medicamentos Administrados */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="bg-gray-50 p-4 border-b flex items-center gap-2">
          <Clock className="text-blue-600" size={20} />
          <h3 className="font-bold text-gray-700 uppercase text-sm">Controle de Administração</h3>
        </div>
        <div className="p-6 text-center text-gray-400 italic text-sm">
          Nenhum registro de administração nas últimas 24 horas.
        </div>
      </div>
    </div>
  );
};

export default MedicationTables;