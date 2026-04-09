import React, { useState } from 'react';
import { User, CalendarDays, Bell, TrendingUp, Plus } from 'lucide-react';

const pacientesEmConsulta = [
  { nome: 'João Silva', idade: 65, ultimaVisita: '04/11/2025', status: 'Estável' },
  { nome: 'Maria Santos', idade: 58, ultimaVisita: '03/11/2025', status: 'Atenção' },
  { nome: 'Pedro Costa', idade: 72, ultimaVisita: '02/11/2025', status: 'Estável' },
  { nome: 'Ana Carolina', idade: 62, ultimaVisita: '04/11/2025', status: 'Atenção' },
  { nome: 'Lucas Pereira', idade: 55, ultimaVisita: '05/11/2025', status: 'Estável' },
];

const statusClasses = {
  Estável: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Atenção: 'bg-amber-100 text-amber-700 border-amber-200',
  Crítico: 'bg-red-100 text-red-700 border-red-200',
};

const Dashboard = () => {
  const [selectedPatients, setSelectedPatients] = useState([]);

  const togglePatient = (nome) => {
    setSelectedPatients((prev) =>
      prev.includes(nome)
        ? prev.filter((item) => item !== nome)
        : [...prev, nome]
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Bem-vindo ao Sistema de Anamnese LVAD</h2>
        <p className="text-sm text-gray-500">Sistema integrado para registro e acompanhamento clínico de pacientes com Dispositivos de Assistência Ventricular Esquerda.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-center gap-3">
          <div className="p-3 rounded-full bg-green-50 text-green-600"><User size={20} /></div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Pacientes Ativos</p>
            <p className="text-2xl font-bold text-[#327933]">24</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-center gap-3">
          <div className="p-3 rounded-full bg-blue-50 text-blue-600"><CalendarDays size={20} /></div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Consultas Hoje</p>
            <p className="text-2xl font-bold text-[#327933]">8</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-center gap-3">
          <div className="p-3 rounded-full bg-amber-50 text-amber-600"><Bell size={20} /></div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Alertas Ativos</p>
            <p className="text-2xl font-bold text-[#327933]">3</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-center gap-3">
          <div className="p-3 rounded-full bg-teal-50 text-teal-600"><TrendingUp size={20} /></div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Taxa de Adesão</p>
            <p className="text-2xl font-bold text-[#327933]">94%</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Pacientes em consulta</h3>
        <div className="mb-4 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] px-4 py-3 text-sm text-[#065f46]">
          {selectedPatients.length > 0 ? (
            <span>{selectedPatients.length} paciente{selectedPatients.length > 1 ? 's' : ''} incluído{selectedPatients.length > 1 ? 's' : ''} no atendimento.</span>
          ) : (
            <span>Nenhum paciente incluído ainda. Clique no botão <strong>Incluir</strong> para adicionar ao atendimento.</span>
          )}
        </div>
        <div className="space-y-3">
          {pacientesEmConsulta.map((paciente) => {
            const isSelected = selectedPatients.includes(paciente.nome);

            return (
              <div
                key={paciente.nome}
                className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-xl border transition-all ${
                  isSelected ? 'border-[#327933] bg-green-50' : 'border-gray-100 bg-gray-50'
                }`}
              >
                <div>
                  <p className="font-semibold text-gray-800">{paciente.nome}</p>
                  <p className="text-sm text-gray-500">{paciente.idade} anos</p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-sm text-gray-500">Última visita</p>
                  <p className="font-semibold text-gray-700">{paciente.ultimaVisita}</p>
                </div>

                <div className="flex flex-col sm:items-end gap-3">
                  <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${statusClasses[paciente.status]}`}>
                    {paciente.status}
                  </span>
                  <button
                    onClick={() => togglePatient(paciente.nome)}
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold transition ${
                      isSelected
                        ? 'bg-[#327933] text-white border border-[#327933]'
                        : 'bg-white text-[#327933] border border-green-200 hover:border-[#327933] hover:text-[#327933]'
                    }`}
                  >
                    <Plus size={14} />
                    {isSelected ? 'Incluído' : 'Incluir'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;