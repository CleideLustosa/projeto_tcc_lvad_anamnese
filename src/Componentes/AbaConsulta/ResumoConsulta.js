import React from 'react';
import { ClipboardCheck, Send } from 'lucide-react';

const ResumoConsulta = () => {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in duration-500 pb-10">
      <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 uppercase tracking-wider mb-8">
        <ClipboardCheck size={20} className="text-[#327933]" />
        Conclusão do Atendimento
      </h3>

      <div className="space-y-6">
        {/* Queixa Principal */}
        <div>
          <label className="text-xs font-bold text-gray-600 uppercase mb-2 block">
            Queixa Principal *
          </label>
          <textarea 
            className="w-full p-4 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#327933] min-h-[100px]"
            placeholder="Descreva o motivo principal da consulta hoje..."
          />
        </div>

        {/* Intensidade e Duração */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold text-gray-600 uppercase mb-2 block">
              Intensidade dos Sintomas
            </label>
            <select className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none appearance-none">
              <option value="">Selecione a intensidade</option>
              <option value="1">1 - MUITO LEVE</option>
              <option value="2">2 - LEVE</option>
              <option value="3">3 - MODERADA</option>
              <option value="4">4 - INTENSA</option>
              <option value="5">5 - MUITO INTENSA</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 uppercase mb-2 block">
              Duração dos Sintomas
            </label>
            <input 
              type="text"
              placeholder="Ex: Há 3 dias"
              className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#327933]"
            />
          </div>
        </div>

        {/* Tratamentos Anteriores */}
        <div>
          <label className="text-xs font-bold text-gray-600 uppercase mb-2 block">
            Tratamentos Anteriores
          </label>
          <textarea 
            className="w-full p-4 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#327933] min-h-[100px]"
            placeholder="Descreva tratamentos já realizados para este problema..."
          />
        </div>

        {/* Conduta e Observações */}
        <div>
          <label className="text-xs font-bold text-gray-600 uppercase mb-2 block">
            Conduta e Observações
          </label>
          <textarea 
            className="w-full p-4 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#327933] min-h-[120px]"
            placeholder="Plano terapêutico, orientações dadas ao paciente ou alterações na medicação..."
          />
        </div>
      </div>

      <div className="mt-10">
        <button className="w-full py-4 bg-[#327933] text-white font-bold rounded-xl shadow-lg hover:bg-green-800 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
          <Send size={18} />
          Finalizar e Salvar Anamnese
        </button>
        <p className="text-center text-[10px] text-gray-400 mt-3 font-medium uppercase">
          ⚠️ Verifique todos os campos antes de confirmar
        </p>
      </div>
    </div>
  );
};

export default ResumoConsulta;