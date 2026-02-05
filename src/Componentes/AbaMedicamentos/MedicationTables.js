import React, { useState } from 'react';
import { Pill, Plus, X, Calendar, Clock, ClipboardList } from 'lucide-react';

const MedicationTables = () => {
  // Estados independentes para controlar cada modal
  const [showPrescribedModal, setShowPrescribedModal] = useState(false);
  const [showAdministeredModal, setShowAdministeredModal] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      
      {/* SEÇÃO 1: HISTÓRICO DE MEDICAMENTOS PRESCRITOS */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-700 flex items-center gap-2">
            <ClipboardList className="text-[#327933]" size={20} />
            Histórico de Medicamentos Prescritos
          </h3>
          <button 
            onClick={() => setShowPrescribedModal(true)}
            className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Plus size={16} className="text-[#327933]" /> {/* Verde mantido no ícone */}
            Adicionar
          </button>
        </div>

        {/* Layout da Tabela de Prescritos */}
        <div className="grid grid-cols-4 gap-4 bg-gray-50 p-3 rounded-t-xl border-b text-xs font-bold text-gray-500 uppercase">
          <div>Data da Prescrição</div>
          <div>Medicação</div>
          <div>Dosagem/Frequência</div>
          <div>Notas Clínicas</div>
        </div>
        <div className="grid grid-cols-4 gap-4 p-4 border border-t-0 rounded-b-xl items-center text-sm text-gray-600">
          <div className="flex items-center gap-2 bg-gray-50 p-2 rounded border">
            <Calendar size={14} /> dd/mm/aaaa
          </div>
          <div className="bg-gray-50 p-2 rounded border italic text-gray-400">Nome do medicamento</div>
          <div className="bg-gray-50 p-2 rounded border italic text-gray-400">Ex: 100mg, 2x ao dia</div>
          <div className="bg-gray-50 p-2 rounded border italic text-gray-400">Observações</div>
        </div>
      </section>

      {/* SEÇÃO 2: MEDICAMENTOS ADMINISTRADOS */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-700 flex items-center gap-2">
            <Pill className="text-[#327933]" size={20} />
            Medicamentos Administrados
          </h3>
          <button 
            onClick={() => setShowAdministeredModal(true)}
            className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Plus size={16} className="text-[#327933]" />
            Adicionar
          </button>
        </div>

        {/* Layout da Tabela de Administrados */}
        <div className="grid grid-cols-4 gap-4 bg-gray-50 p-3 rounded-t-xl border-b text-xs font-bold text-gray-500 uppercase">
          <div>Data</div>
          <div>Horário</div>
          <div>Medicação</div>
          <div>Dosagem</div>
        </div>
        <div className="grid grid-cols-4 gap-4 p-4 border border-t-0 rounded-b-xl items-center text-sm text-gray-600">
          <div className="flex items-center gap-2 bg-gray-50 p-2 rounded border"><Calendar size={14} /> dd/mm/aaaa</div>
          <div className="flex items-center gap-2 bg-gray-50 p-2 rounded border"><Clock size={14} /> --:--</div>
          <div className="bg-gray-50 p-2 rounded border italic text-gray-400">Nome do medicamento</div>
          <div className="bg-gray-50 p-2 rounded border italic text-gray-400">Ex: 100mg</div>
        </div>
      </section>

      {/* RENDERIZAÇÃO DOS MODAIS */}
      {showPrescribedModal && <Modal title="Nova Prescrição" onClose={() => setShowPrescribedModal(false)} type="prescribed" />}
      {showAdministeredModal && <Modal title="Registrar Administração" onClose={() => setShowAdministeredModal(false)} type="admin" />}
    </div>
  );
};

// Componente Interno de Modal para evitar repetição de código
const Modal = ({ title, onClose, type }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-300">
      <div className="bg-[#327933] p-4 flex justify-between items-center text-white">
        <h3 className="font-bold flex items-center gap-2">{title}</h3>
        <button onClick={onClose} className="hover:bg-white/20 rounded-full p-1"><X size={20} /></button>
      </div>
      <form className="p-6 space-y-4">
        {/* Inputs dinâmicos baseados no tipo */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Medicação</label>
          <input type="text" className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#327933]" placeholder="Nome do medicamento" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Data</label>
            <input type="date" className="w-full border p-3 rounded-lg outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{type === 'admin' ? 'Horário' : 'Dosagem'}</label>
            <input type={type === 'admin' ? 'time' : 'text'} className="w-full border p-3 rounded-lg outline-none" />
          </div>
        </div>
        <button type="button" onClick={onClose} className="w-full py-3 bg-[#327933] text-white font-bold rounded-lg hover:bg-green-800 transition-all shadow-lg shadow-green-900/20">
          SALVAR REGISTRO
        </button>
      </form>
    </div>
  </div>
);

export default MedicationTables;