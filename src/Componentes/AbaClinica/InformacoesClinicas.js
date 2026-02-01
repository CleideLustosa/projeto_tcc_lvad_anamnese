import React from 'react';

const InformacoesClinicas = () => {
  const observacoesClinicas = [
    "Tolerância ao Exercício", "Fadiga/Fraqueza", "Tontura", 
    "Falta de Ar", "Melhoria de Qualidade de Vida", 
    "Desconforto no Peito", "Distúrbio do Sono"
  ];

  return (
    <div className="space-y-6">
      {/* Dados do Implante */}
      <div className="bg-gray-50 rounded-xl border p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Número de Prontuário</label>
            <input type="text" placeholder="Ex: 123456" className="w-full p-3 bg-white border rounded-lg text-sm" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Tipo Sanguíneo</label>
            <select className="w-full p-3 bg-white border rounded-lg text-sm">
              <option>Selecione</option>
              <option>A+</option><option>A-</option>
              <option>O+</option><option>O-</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Data do Implante</label>
            <input type="date" className="w-full p-3 bg-white border rounded-lg text-sm" />
          </div>
          <div className="md:col-span-3 space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Motivo do Implante</label>
            <textarea placeholder="Descreva o motivo do implante do LVAD" className="w-full p-3 bg-white border rounded-lg text-sm h-20 resize-none"></textarea>
          </div>
        </div>
      </div>

      {/* Checkboxes de Observações */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase">Observações Clínicas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {observacoesClinicas.map((obs) => (
            <div key={obs} className="flex items-center gap-2">
              <input type="checkbox" id={obs} className="rounded border-gray-300 text-[#327933]" />
              <label htmlFor={obs} className="text-sm text-gray-600">{obs}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Áreas de Texto para Histórico */}
      <div className="space-y-4">
        {[
          { id: "cons", label: "Considerações do Paciente", placeholder: "Observações relatadas pelo paciente" },
          { id: "aler", label: "Alergias", placeholder: "Medicamentos, alimentos ou substâncias" },
          { id: "hist", label: "Histórico Clínico", placeholder: "Cirurgias anteriores e tratamentos" },
          { id: "fam", label: "Histórico Familiar", placeholder: "Doenças de familiares próximos" }
        ].map((item) => (
          <div key={item.id} className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">{item.label}</label>
            <textarea placeholder={item.placeholder} className="w-full p-3 bg-gray-50 border rounded-lg text-sm h-24 resize-none"></textarea>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InformacoesClinicas;