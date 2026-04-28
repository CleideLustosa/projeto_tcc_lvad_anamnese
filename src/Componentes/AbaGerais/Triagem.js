import React, { useState } from 'react';
import { User, CalendarDays, Bell, TrendingUp, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useAnamnese } from '../../AnamneseContext';

const pacientesEmConsulta = [
  { nome: 'João Silva', idade: 65, sexo: 'M', tipoSanguineo: 'O+', ultimaVisita: '24/04/2026', dataAgendamento: '28/04/2026', status: 'Estável', foto: null },
  { nome: 'Maria Santos', idade: 58, sexo: 'F', tipoSanguineo: 'AB-', ultimaVisita: '24/04/2026', dataAgendamento: '28/04/2026', status: 'Atenção', foto: null },
  { nome: 'Pedro Costa', idade: 72, sexo: 'M', tipoSanguineo: 'A+', ultimaVisita: '24/04/2026', dataAgendamento: '28/04/2026', status: 'Estável', foto: null },
  { nome: 'Ana Carolina', idade: 62, sexo: 'F', tipoSanguineo: 'B+', ultimaVisita: '24/04/2026', dataAgendamento: '29/04/2026', status: 'Atenção', foto: null },
  { nome: 'Lucas Pereira', idade: 55, sexo: 'M', tipoSanguineo: 'O-', ultimaVisita: '24/04/2026', dataAgendamento: '28/04/2026', status: 'Risco', foto: null },
  { nome: 'Fernanda Oliveira', idade: 68, sexo: 'F', tipoSanguineo: 'A-', ultimaVisita: '24/04/2026', dataAgendamento: '30/04/2026', status: 'Estável', foto: null },
  { nome: 'Roberto Gomes', idade: 60, sexo: 'M', tipoSanguineo: 'B+', ultimaVisita: '24/04/2026', dataAgendamento: '28/04/2026', status: 'Estável', foto: null },
];

const statusClasses = {
  Estável: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Atenção: 'bg-amber-100 text-amber-700 border-amber-200',
  Risco: 'bg-red-100 text-red-700 border-red-200',
  Crítico: 'bg-red-100 text-red-700 border-red-200',
};

// Modal de Histórico de Consultas
const ModalHistorico = ({ paciente, consultas, isOpen, onClose, onSelectConsulta }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4">
        {/* Cabeçalho com fechar */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-800">Histórico de Consultas</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-all"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Informações do Paciente */}
        <p className="text-sm text-gray-600 mb-4">{paciente?.nome}</p>

        {/* Lista de Consultas */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {consultas.length > 0 ? (
            consultas.map((consulta, index) => (
              <button
                key={index}
                onClick={() => onSelectConsulta(consulta)}
                className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-green-50 hover:border-green-300 transition-all"
              >
                <p className="text-sm font-semibold text-gray-800">Consulta - {consulta.data}</p>
                <p className="text-xs text-gray-500 mt-1">{consulta.medico}</p>
                <p className="text-xs text-gray-600 mt-1">{consulta.motivo}</p>
              </button>
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">Nenhuma consulta anterior registrada</p>
          )}
        </div>

        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="w-full mt-6 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-all"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

// COMPONENTE TRIAGEM - Gestão de Triagem e Agenda de Consultas
const Triagem = ({ setAbaAtiva }) => {
  const { formData } = useAnamnese();
  const [modalAberto, setModalAberto] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);
  const [filtroTriagem, setFiltroTriagem] = useState(null); // Estado do filtro ativo
  
  const tipoSanguineo = formData?.clinica?.tipoSanguineo || '-';

  // Função para obter a data de hoje no formato DD/MM/YYYY
  const getDataHoje = () => {
    const hoje = new Date();
    return `${String(hoje.getDate()).padStart(2, '0')}/${String(hoje.getMonth() + 1).padStart(2, '0')}/${hoje.getFullYear()}`;
  };

  // Função para filtrar pacientes
  const getPacientesFiltrados = () => {
    if (!filtroTriagem) return pacientesEmConsulta;

    switch (filtroTriagem) {
      case 'consultas-hoje':
        // TODO: Filtrar por médicoLogado.crm para exibir apenas consultas do médico logado
        return pacientesEmConsulta.filter(p => p.dataAgendamento === getDataHoje());
      case 'alertas-ativos':
        // TODO: Filtrar por médicoLogado.crm para exibir alertas do médico logado
        return pacientesEmConsulta.filter(p => p.status === 'Atenção' || p.status === 'Risco');
      case 'pacientes-ativos':
        // TODO: Filtrar por médicoLogado.crm para exibir pacientes do médico logado
        return pacientesEmConsulta;
      default:
        return pacientesEmConsulta;
    }
  };

  // Funções de clique dos cards
  const handleClickCardEstatistico = (tipoFiltro) => {
    setFiltroTriagem(filtroTriagem === tipoFiltro ? null : tipoFiltro);
  };

  const handleClickTaxaAdesao = () => {
    // Navegar para aba de estatísticas (será implementada)
    if (setAbaAtiva) {
      setAbaAtiva('estatisticas');
    }
  };

  const historicoConsultas = {
    'João Silva': [
      { data: '04/11/2025', medico: 'Dr. Silva', motivo: 'Acompanhamento de rotina' },
      { data: '28/10/2025', medico: 'Dra. Maria', motivo: 'Avaliação pós-implante' },
      { data: '15/10/2025', medico: 'Dr. Silva', motivo: 'Exames de rotina' },
    ],
    'Maria Santos': [
      { data: '03/11/2025', medico: 'Dra. Maria', motivo: 'Revisão de medicamentos' },
      { data: '25/10/2025', medico: 'Dr. Silva', motivo: 'Acompanhamento' },
    ],
    'Pedro Costa': [
      { data: '02/11/2025', medico: 'Dr. Costa', motivo: 'Exame de rotina' },
      { data: '20/10/2025', medico: 'Dra. Maria', motivo: 'Avaliação clínica' },
      { data: '10/10/2025', medico: 'Dr. Silva', motivo: 'Acompanhamento pós-implante' },
    ],
    'Ana Carolina': [
      { data: '04/11/2025', medico: 'Dr. Silva', motivo: 'Acompanhamento' },
      { data: '30/10/2025', medico: 'Dra. Maria', motivo: 'Avaliação de marca-passo' },
    ],
    'Lucas Pereira': [
      { data: '05/11/2025', medico: 'Dr. Costa', motivo: 'Consulta de acompanhamento' },
      { data: '22/10/2025', medico: 'Dr. Silva', motivo: 'Revisão de exames' },
      { data: '08/10/2025', medico: 'Dra. Maria', motivo: 'Avaliação completa' },
    ],
    'Fernanda Oliveira': [
      { data: '18/11/2025', medico: 'Dra. Maria', motivo: 'Avaliação de adesão medicamentosa' },
      { data: '05/11/2025', medico: 'Dr. Silva', motivo: 'Revisão geral' },
      { data: '24/10/2025', medico: 'Dr. Costa', motivo: 'Monitoramento LVAD' },
    ],
    'Roberto Gomes': [
      { data: '12/11/2025', medico: 'Dr. Silva', motivo: 'Consulta de seguimento' },
      { data: '29/10/2025', medico: 'Dra. Maria', motivo: 'Avaliação clínica' },
    ],
  };

  const handleAbriirModal = (paciente) => {
    setPacienteSelecionado(paciente);
    setModalAberto(true);
  };

  const handleFecharModal = () => {
    setModalAberto(false);
    setPacienteSelecionado(null);
  };

  const handleSelecionarConsulta = (consulta) => {
    console.log('Consulta selecionada:', consulta);
    // Aqui você pode carregar os dados da consulta no contexto
    handleFecharModal();
  };

  const handleAtender = (paciente) => {
    if (setAbaAtiva) {
      setAbaAtiva('paciente');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Bem-vindo ao Sistema de Anamnese LVAD</h2>
        <p className="text-sm text-gray-500">Sistema integrado para registro e acompanhamento clínico de pacientes com Dispositivos de Assistência Ventricular Esquerda.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pacientes Ativos */}
        <button
          onClick={() => handleClickCardEstatistico('pacientes-ativos')}
          className={`p-5 rounded-xl shadow-sm border-2 flex items-center gap-3 transition-all cursor-pointer ${
            filtroTriagem === 'pacientes-ativos'
              ? 'border-[#327933] bg-green-50 shadow-md'
              : 'border-gray-200 bg-white hover:shadow-md hover:border-green-300'
          }`}
        >
          <div className="p-3 rounded-full bg-green-50 text-green-600"><User size={20} /></div>
          <div className="text-left">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Pacientes Ativos</p>
            <p className="text-2xl font-bold text-[#327933]">{pacientesEmConsulta.length}</p>
          </div>
        </button>

        {/* Consultas Hoje - Contagem dinâmica baseada em dataAgendamento */}
        <button
          onClick={() => handleClickCardEstatistico('consultas-hoje')}
          className={`p-5 rounded-xl shadow-sm border-2 flex items-center gap-3 transition-all cursor-pointer ${
            filtroTriagem === 'consultas-hoje'
              ? 'border-blue-600 bg-blue-50 shadow-md'
              : 'border-gray-200 bg-white hover:shadow-md hover:border-blue-300'
          }`}
        >
          <div className="p-3 rounded-full bg-blue-50 text-blue-600"><CalendarDays size={20} /></div>
          <div className="text-left">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Consultas Hoje</p>
            <p className="text-2xl font-bold text-[#327933]">{pacientesEmConsulta.filter(p => p.dataAgendamento === getDataHoje()).length}</p>
          </div>
        </button>

        {/* Alertas Ativos - Contagem dinâmica */}
        <button
          onClick={() => handleClickCardEstatistico('alertas-ativos')}
          className={`p-5 rounded-xl shadow-sm border-2 flex items-center gap-3 transition-all cursor-pointer ${
            filtroTriagem === 'alertas-ativos'
              ? 'border-amber-600 bg-amber-50 shadow-md'
              : 'border-gray-200 bg-white hover:shadow-md hover:border-amber-300'
          }`}
        >
          <div className="p-3 rounded-full bg-amber-50 text-amber-600"><Bell size={20} /></div>
          <div className="text-left">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Alertas Ativos</p>
            <p className="text-2xl font-bold text-[#327933]">{pacientesEmConsulta.filter(p => p.status === 'Atenção' || p.status === 'Risco').length}</p>
          </div>
        </button>

        {/* Taxa de Adesão */}
        <button
          onClick={handleClickTaxaAdesao}
          className="p-5 rounded-xl shadow-sm border-2 border-gray-200 bg-white flex items-center gap-3 transition-all cursor-pointer hover:shadow-md hover:border-teal-300"
        >
          <div className="p-3 rounded-full bg-teal-50 text-teal-600"><TrendingUp size={20} /></div>
          <div className="text-left">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Taxa de Adesão</p>
            <p className="text-2xl font-bold text-[#327933]">94%</p>
          </div>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">
            {filtroTriagem === 'consultas-hoje' && '📅 Consultas de Hoje'}
            {filtroTriagem === 'alertas-ativos' && '⚠️ Alertas Ativos'}
            {filtroTriagem === 'pacientes-ativos' && '👥 Todos os Pacientes'}
            {!filtroTriagem && '👥 Pacientes em Atendimento'}
          </h3>
          {filtroTriagem && (
            <button
              onClick={() => setFiltroTriagem(null)}
              className="text-sm text-gray-500 hover:text-gray-700 font-semibold"
            >
              ✕ Limpar Filtro
            </button>
          )}
        </div>
        <div className="space-y-4">
          {getPacientesFiltrados().length > 0 ? (
            getPacientesFiltrados().map((paciente) => {
              return (
                <div key={paciente.nome} className="rounded-xl border border-gray-200 overflow-hidden">
                  {/* Card Header com Info Principal */}
                  <div className="bg-white p-4 hover:bg-gray-50/50 transition-all">
                    <div className="flex items-center gap-4 mb-3">
                      {/* Foto do Paciente */}
                      <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
                        {paciente.foto ? (
                          <img src={paciente.foto} alt={paciente.nome} className="w-full h-full object-cover rounded-full" />
                        ) : (
                          <User size={28} className="text-gray-400" />
                        )}
                      </div>

                      {/* Info Principal - Reorganizado */}
                      <div className="flex-1">
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-5 mb-3">
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Nome</p>
                            <p className="font-semibold text-gray-800">{paciente.nome}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Idade</p>
                            <p className="font-semibold text-gray-800">{paciente.idade}a</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Sexo</p>
                            <p className="font-semibold text-gray-800">{paciente.sexo}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Tipo Sanguíneo</p>
                            <p className="font-semibold text-gray-800">{paciente.tipoSanguineo}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Última Visita</p>
                            <p className="font-semibold text-gray-800">{paciente.ultimaVisita}</p>
                            
                            {/* Histórico de Consultas - Abaixo de Última Visita */}
                            <button
                              onClick={() => handleAbriirModal(paciente)}
                              className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 font-semibold transition-all mt-2"
                            >
                              <ChevronDown size={14} /> Histórico
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status e Botão Atender */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${statusClasses[paciente.status]}`}>
                        {paciente.status}
                      </span>

                      <button
                        onClick={() => handleAtender(paciente)}
                        className="bg-[#327933] text-white px-3 py-1 rounded-lg font-bold text-xs hover:bg-green-800 transition-all whitespace-nowrap"
                      >
                        + Atender
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 font-semibold">Nenhum paciente encontrado com os filtros aplicados.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Histórico */}
      <ModalHistorico
        paciente={pacienteSelecionado}
        consultas={pacienteSelecionado ? historicoConsultas[pacienteSelecionado.nome] || [] : []}
        isOpen={modalAberto}
        onClose={handleFecharModal}
        onSelectConsulta={handleSelecionarConsulta}
      />
    </div>
  );
};

export default Triagem;
