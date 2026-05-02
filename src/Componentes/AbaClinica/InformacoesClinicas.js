import React from 'react';
import { useAnamnese } from '../../AnamneseContext';

const InformacoesClinicas = () => {
  const { formData, updateFormData } = useAnamnese();
  const dadosClinicos = formData.clinica;

  const observacoesClinicas = [
    "Tolerância ao Exercício", "Fadiga/Fraqueza", "Tontura", 
    "Falta de Ar", "Arritmia", "Febre", "Sangramento",
    "Desconforto no Peito", "Distúrbio do Sono", "Infecções Frequentes"
  ];

  // Handler para atualizar campos simples
  const handleChange = (campo, valor) => {
    updateFormData('clinica', { [campo]: valor });
  };

  // Handler para marcar/desmarcar observações clínicas
  const handleObservacaoChange = (observacao) => {
    const observacoesAtualizadas = dadosClinicos.observacoes.includes(observacao)
      ? dadosClinicos.observacoes.filter(obs => obs !== observacao)
      : [...dadosClinicos.observacoes, observacao];
    
    updateFormData('clinica', { observacoes: observacoesAtualizadas });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-gray-50 rounded-xl border p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Número de Prontuário</label>
            <input 
              type="text" 
              placeholder="Ex: 123456" 
              value={dadosClinicos.prontuario || ''}
              onChange={(e) => handleChange('prontuario', e.target.value)}
              className="w-full p-3 bg-white border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#327933]" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Tipo Sanguíneo</label>
            <select 
              value={dadosClinicos.tipoSanguineo || ''}
              onChange={(e) => handleChange('tipoSanguineo', e.target.value)}
              className="w-full p-3 bg-white border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#327933]"
            >
              <option value="">Selecione</option>
              <option value="A+">A+</option><option value="A-">A-</option>
              <option value="B+">B+</option><option value="B-">B-</option>
              <option value="AB+">AB+</option><option value="AB-">AB-</option>
              <option value="O+">O+</option><option value="O-">O-</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Data do Implante</label>
            <input 
              type="date" 
              value={dadosClinicos.dataImplante || ''}
              onChange={(e) => handleChange('dataImplante', e.target.value)}
              className="w-full p-3 bg-white border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#327933]" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Tipo de Dispositivo</label>
            <input 
              type="text" 
              placeholder="Ex: HeartMate 3" 
              value={dadosClinicos.tipoDispositivo || ''}
              onChange={(e) => handleChange('tipoDispositivo', e.target.value)}
              className="w-full p-3 bg-white border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#327933]" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Instituição do Implante</label>
            <input 
              type="text" 
              placeholder="Ex: Hospital X" 
              value={dadosClinicos.instituicaoImplante || ''}
              onChange={(e) => handleChange('instituicaoImplante', e.target.value)}
              className="w-full p-3 bg-white border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#327933]" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Cirurgião Responsável</label>
            <input 
              type="text" 
              placeholder="Ex: Dr. João Silva" 
              value={dadosClinicos.cirurgiaoResponsavel || ''}
              onChange={(e) => handleChange('cirurgiaoResponsavel', e.target.value)}
              className="w-full p-3 bg-white border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#327933]" 
            />
          </div>
          <div className="md:col-span-3 space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Motivo do Implante</label>
            <textarea 
              placeholder="Descreva o motivo do implante do LVAD" 
              value={dadosClinicos.motivoImplante || ''}
              onChange={(e) => handleChange('motivoImplante', e.target.value)}
              className="w-full p-3 bg-white border rounded-lg text-sm h-20 resize-none outline-none focus:ring-2 focus:ring-[#327933]"
            ></textarea>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase">
          Observações Clínicas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {observacoesClinicas.map((obs) => (
            <div key={obs} className="flex items-center gap-2 hover:bg-gray-50 p-1 rounded transition-colors">
              <input 
                type="checkbox" 
                id={obs} 
                checked={dadosClinicos.observacoes.includes(obs)}
                onChange={() => handleObservacaoChange(obs)}
                className="rounded border-gray-300 text-[#327933] focus:ring-[#327933] cursor-pointer" 
              />
              <label htmlFor={obs} className="text-sm text-gray-600 cursor-pointer select-none">{obs}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Considerações do Paciente</label>
          <textarea 
            placeholder="Observações relatadas pelo paciente" 
            value={dadosClinicos.consideracoes || ''}
            onChange={(e) => handleChange('consideracoes', e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-100 rounded-lg text-sm h-28 resize-none outline-none focus:bg-white focus:ring-2 focus:ring-[#327933] transition-all"
          ></textarea>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Alergias</label>
          <textarea 
            placeholder="Medicamentos, alimentos ou substâncias" 
            value={dadosClinicos.alergias || ''}
            onChange={(e) => handleChange('alergias', e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-100 rounded-lg text-sm h-28 resize-none outline-none focus:bg-white focus:ring-2 focus:ring-[#327933] transition-all"
          ></textarea>
        </div>
        <div className="md:col-span-2 space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Histórico Clínico</label>
          <textarea 
            placeholder="Cirurgias anteriores e tratamentos" 
            value={dadosClinicos.historicoClinco || ''}
            onChange={(e) => handleChange('historicoClinco', e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-100 rounded-lg text-sm h-28 resize-none outline-none focus:bg-white focus:ring-2 focus:ring-[#327933] transition-all"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default InformacoesClinicas;