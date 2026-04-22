import React from 'react';
import { TrendingUp, Calendar, Heart, CheckCircle, AlertCircle } from 'lucide-react';

const EstatisticasAdesao = () => {
  // Dados simulados de adesão dos pacientes
  const pacientesAdesao = [
    {
      nome: 'João Silva',
      idade: 65,
      adesao: 94,
      ultimaConsulta: '22/04/2026',
      status: 'Excelente',
      consultasAgendadas: 12,
      consultasRealizadas: 11,
      statusGeral: 'Estável'
    },
    {
      nome: 'Maria Santos',
      idade: 58,
      adesao: 78,
      ultimaConsulta: '22/04/2026',
      status: 'Bom',
      consultasAgendadas: 10,
      consultasRealizadas: 8,
      statusGeral: 'Atenção'
    },
    {
      nome: 'Pedro Costa',
      idade: 72,
      adesao: 89,
      ultimaConsulta: '22/04/2026',
      status: 'Bom',
      consultasAgendadas: 11,
      consultasRealizadas: 10,
      statusGeral: 'Estável'
    },
    {
      nome: 'Ana Carolina',
      idade: 62,
      adesao: 85,
      ultimaConsulta: '21/04/2026',
      status: 'Bom',
      consultasAgendadas: 9,
      consultasRealizadas: 8,
      statusGeral: 'Atenção'
    },
    {
      nome: 'Lucas Pereira',
      idade: 55,
      adesao: 91,
      ultimaConsulta: '20/04/2026',
      status: 'Excelente',
      consultasAgendadas: 11,
      consultasRealizadas: 10,
      statusGeral: 'Estável'
    },
  ];

  // Calcular média geral de adesão
  const mediaAdesao = Math.round(
    pacientesAdesao.reduce((sum, p) => sum + p.adesao, 0) / pacientesAdesao.length
  );

  // Contadores
  const totalPacientes = pacientesAdesao.length;
  const pacientesExcelente = pacientesAdesao.filter(p => p.adesao >= 90).length;
  const pacientesComRisco = pacientesAdesao.filter(p => p.adesao < 75).length;

  const getCorAdesao = (adesao) => {
    if (adesao >= 90) return 'text-emerald-600';
    if (adesao >= 80) return 'text-blue-600';
    if (adesao >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  const getBgAdesao = (adesao) => {
    if (adesao >= 90) return 'bg-emerald-50';
    if (adesao >= 80) return 'bg-blue-50';
    if (adesao >= 70) return 'bg-amber-50';
    return 'bg-red-50';
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp size={28} className="text-[#327933]" />
          <h1 className="text-2xl font-bold text-gray-800">Taxa de Adesão dos Pacientes</h1>
        </div>
        <p className="text-sm text-gray-500">Acompanhamento de adesão às consultas e compromissos terapêuticos</p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Adesão Média</p>
            <TrendingUp size={18} className="text-[#327933]" />
          </div>
          <p className="text-3xl font-bold text-[#327933]">{mediaAdesao}%</p>
          <p className="text-xs text-gray-500 mt-1">De {totalPacientes} pacientes</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Adesão Excelente</p>
            <CheckCircle size={18} className="text-emerald-600" />
          </div>
          <p className="text-3xl font-bold text-emerald-600">{pacientesExcelente}</p>
          <p className="text-xs text-gray-500 mt-1">≥ 90% de adesão</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Pacientes em Risco</p>
            <AlertCircle size={18} className="text-red-600" />
          </div>
          <p className="text-3xl font-bold text-red-600">{pacientesComRisco}</p>
          <p className="text-xs text-gray-500 mt-1">&lt; 75% de adesão</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Total de Pacientes</p>
            <Heart size={18} className="text-pink-600" />
          </div>
          <p className="text-3xl font-bold text-pink-600">{totalPacientes}</p>
          <p className="text-xs text-gray-500 mt-1">Em acompanhamento</p>
        </div>
      </div>

      {/* Tabela de Pacientes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Detalhes de Adesão por Paciente</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-bold text-gray-600 uppercase tracking-wide">Paciente</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-gray-600 uppercase tracking-wide">Idade</th>
                <th className="text-center py-3 px-4 text-xs font-bold text-gray-600 uppercase tracking-wide">Taxa de Adesão</th>
                <th className="text-center py-3 px-4 text-xs font-bold text-gray-600 uppercase tracking-wide">Consultas</th>
                <th className="text-center py-3 px-4 text-xs font-bold text-gray-600 uppercase tracking-wide">Última Consulta</th>
                <th className="text-center py-3 px-4 text-xs font-bold text-gray-600 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody>
              {pacientesAdesao.map((paciente) => (
                <tr key={paciente.nome} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                  <td className="py-4 px-4">
                    <p className="font-semibold text-gray-800">{paciente.nome}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-700">{paciente.idade} anos</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-full max-w-xs bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            paciente.adesao >= 90
                              ? 'bg-emerald-500'
                              : paciente.adesao >= 80
                              ? 'bg-blue-500'
                              : paciente.adesao >= 70
                              ? 'bg-amber-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${paciente.adesao}%` }}
                        />
                      </div>
                      <span className={`font-bold text-sm min-w-12 ${getCorAdesao(paciente.adesao)}`}>
                        {paciente.adesao}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <p className="text-gray-700 text-sm">
                      <span className="font-semibold text-green-600">{paciente.consultasRealizadas}</span>
                      {' / '}
                      <span className="text-gray-500">{paciente.consultasAgendadas}</span>
                    </p>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <p className="text-gray-700 text-sm flex items-center justify-center gap-1">
                      <Calendar size={14} className="text-gray-400" />
                      {paciente.ultimaConsulta}
                    </p>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        paciente.adesao >= 90
                          ? 'bg-emerald-100 text-emerald-700'
                          : paciente.adesao >= 80
                          ? 'bg-blue-100 text-blue-700'
                          : paciente.adesao >= 70
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {paciente.adesao >= 90 ? 'Excelente' : paciente.adesao >= 80 ? 'Bom' : 'Atenção'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cards detalhados por paciente */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pacientesAdesao.map((paciente) => (
          <div
            key={paciente.nome}
            className={`rounded-xl p-5 shadow-sm border-2 ${getBgAdesao(paciente.adesao)} border-gray-200 hover:shadow-md transition-all`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-gray-800">{paciente.nome}</h3>
                <p className="text-xs text-gray-500">{paciente.idade} anos</p>
              </div>
              <span
                className={`text-2xl font-bold ${getCorAdesao(paciente.adesao)}`}
              >
                {paciente.adesao}%
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Consultas Realizadas:</span>
                <span className="font-semibold text-gray-800">
                  {paciente.consultasRealizadas}/{paciente.consultasAgendadas}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Última Consulta:</span>
                <span className="font-semibold text-gray-800">{paciente.ultimaConsulta}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status Geral:</span>
                <span
                  className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                    paciente.statusGeral === 'Estável'
                      ? 'bg-emerald-200 text-emerald-800'
                      : 'bg-amber-200 text-amber-800'
                  }`}
                >
                  {paciente.statusGeral}
                </span>
              </div>
            </div>

            {/* Barra de progresso */}
            <div className="mt-4 pt-4 border-t border-gray-300">
              <div className="w-full bg-gray-300 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${getCorAdesao(paciente.adesao).replace('text', 'bg')}`}
                  style={{ width: `${paciente.adesao}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EstatisticasAdesao;
