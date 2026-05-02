import React from 'react';
import { useAnamnese } from '../../AnamneseContext';

const historicoConsultasDefault = {
  'João da Silva': [
    { data: '04/11/2025', medico: 'Dr. Silva', motivo: 'Acompanhamento de rotina' },
    { data: '28/10/2025', medico: 'Dra. Maria', motivo: 'Avaliação pós-implante' },
    { data: '15/10/2025', medico: 'Dr. Silva', motivo: 'Exames de rotina' },
  ],
  'Maria Luiza Amaral': [
    { data: '03/11/2025', medico: 'Dra. Maria', motivo: 'Revisão de medicamentos' },
    { data: '25/10/2025', medico: 'Dr. Silva', motivo: 'Acompanhamento' },
  ],
  'Maria Esteves': [
    { data: '02/11/2025', medico: 'Dr. Costa', motivo: 'Exame de rotina' },
    { data: '20/10/2025', medico: 'Dra. Maria', motivo: 'Avaliação clínica' },
    { data: '10/10/2025', medico: 'Dr. Silva', motivo: 'Acompanhamento pós-implante' },
  ],
  'Lucas Moreira': [
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

const ConsultationHistory = () => {
  const { pacienteSelecionado, historicoConsultas } = useAnamnese();

  const historicoConsultasParaExibir = pacienteSelecionado
    ? [
        ...(historicoConsultas[pacienteSelecionado.id] || []),
        ...(pacienteSelecionado.cpf ? historicoConsultas[pacienteSelecionado.cpf] || [] : []),
        ...(historicoConsultasDefault[pacienteSelecionado.nome] || []),
      ]
    : [];

  const handleVerConsulta = (consulta) => {
    console.log('Ver consulta:', consulta);
    // futura navegação ou abertura de resumo pode ser implementada aqui
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <h3 className="font-bold text-sm border-b pb-2 mb-3 text-gray-700 uppercase">Histórico de Consultas</h3>
      {historicoConsultasParaExibir.length > 0 ? (
        <ul className="text-xs space-y-2 text-gray-600">
          {historicoConsultasParaExibir.map((consulta, index) => (
            <li key={`${consulta.data}-${index}`} className="p-3 rounded-lg border border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center gap-2">
                <span className="font-semibold text-gray-800">{consulta.data}</span>
                <button
                  type="button"
                  onClick={() => handleVerConsulta(consulta)}
                  className="text-blue-600 font-bold text-[10px] uppercase hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Ver
                </button>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">{consulta.medico}</p>
              <p className="text-[11px] text-gray-500">{consulta.motivo}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-gray-500">Nenhuma consulta registrada.</p>
      )}
    </div>
  );
};

export default ConsultationHistory;