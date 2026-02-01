import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const EmergencyContacts = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Contatos de Emergência</h2>
        <button className="flex items-center gap-2 text-xs font-bold border border-gray-300 px-3 py-1 rounded-lg hover:bg-gray-50">
          <Plus size={14} /> ADICIONAR
        </button>
      </div>

      <div className="p-5 border border-gray-100 bg-gray-50 rounded-xl space-y-4">
        <p className="text-xs font-bold text-[#327933] uppercase">Contato 1</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600">NOME</label>
            <input type="text" placeholder="Nome completo" className="w-full p-2 bg-white border rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#327933]" />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600">TIPO DE RELAÇÃO</label>
            <select className="w-full p-2 bg-white border rounded-lg text-sm outline-none">
              <option>Selecione</option>
              <option>Cônjuge</option>
              <option>Filho(a)</option>
              <option>Pai/Mãe</option>
              <option>Irmão(ã)</option>
              <option>Outro</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600">TELEFONE</label>
            <input type="text" placeholder="(00) 00000-0000" className="w-full p-2 bg-white border rounded-lg text-sm outline-none" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600">E-MAIL</label>
            <input type="email" placeholder="email@exemplo.com" className="w-full p-2 bg-white border rounded-lg text-sm outline-none" />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input type="checkbox" id="auth" className="rounded border-gray-300" />
          <label htmlFor="auth" className="text-xs text-gray-600 font-medium">Autorizado para decisões médicas</label>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;