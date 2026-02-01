import React from 'react';
import { ClipboardList, CheckCircle2, AlertCircle } from 'lucide-react';

const ResumoConsulta = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-sm font-black text-[#327933] uppercase tracking-widest border-b pb-4 mb-6 flex items-center gap-2">
          <ClipboardList size={20} /> Conclusão do Atendimento
        </h2>

        <div className="space-y-6">
          {/* Queixa Principal */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Queixa Principal *</label>
            <textarea 
              placeholder="Descreva o motivo principal da consulta hoje..." 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm h-32 resize-none focus:ring-2 focus:ring-[#327933] outline-none transition-all"
            ></textarea>
          </div>

          {/* Intensidade e Duração */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Intensidade dos Sintomas</label>
              <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none">
                <option>Selecione a intensidade</option>
                <option>1 - Muito Leve</option>
                <option>2 - Leve</option>
                <option>3 - Moderado</option>
                <option>4 - Intenso</option>
                <option>5 - Muito Intenso</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Duração</label>
              <input 
                type="text" 
                placeholder="Ex: Há 3 dias" 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none"
              />
            </div>
          </div>

          {/* Observações Adicionais */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Conduta e Observações</label>
            <textarea 
              placeholder="Plano terapêutico, orientações dadas ao paciente ou alterações na medicação..." 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm h-32 resize-none focus:ring-2 focus:ring-[#327933] outline-none transition-all"
            ></textarea>
          </div>
        </div>

        {/* Botão Finalizar - Simulação de Envio */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <button 
            onClick={() => alert("Anamnese enviada com sucesso para o banco de dados do Mackenzie!")}
            className="w-full bg-[#327933] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-800 shadow-lg transition-all transform hover:scale-[1.01]"
          >
            <CheckCircle2 size={20} /> FINALIZAR E SALVAR ANAMNESE
          </button>
          <p className="text-[10px] text-gray-400 text-center mt-3 flex items-center justify-center gap-1 uppercase font-bold">
            <AlertCircle size={12} /> Verifique todos os campos antes de confirmar
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumoConsulta;