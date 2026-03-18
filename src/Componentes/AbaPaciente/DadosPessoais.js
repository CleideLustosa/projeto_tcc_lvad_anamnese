import React from 'react';
import { useAnamnese } from '../../AnamneseContext'; // Importando a conexão com a nuvem

const DadosPessoais = () => {
  // Extraindo os dados e a função de atualização do contexto
  const { formData, updateFormData } = useAnamnese();

  // Função auxiliar para facilitar a atualização dos campos desta aba
  const handleChange = (campo, valor) => {
    updateFormData('paciente', { [campo]: valor });
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* NOME COMPLETO */}
        <div className="md:col-span-2">
          <label className="text-xs font-bold text-gray-600 uppercase mb-2 block">Nome Completo</label>
          <input 
            type="text" 
            value={formData.paciente.nome || ''} 
            onChange={(e) => handleChange('nome', e.target.value)}
            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#327933] transition-all"
            placeholder="Digite o nome completo do paciente"
          />
        </div>

        {/* NACIONALIDADE */}
        <div>
          <label className="text-xs font-bold text-gray-600 uppercase mb-2 block">Nacionalidade</label>
          <input 
            type="text" 
            value={formData.paciente.nacionalidade || ''} 
            onChange={(e) => handleChange('nacionalidade', e.target.value)}
            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#327933]"
            placeholder="Ex: Brasileira"
          />
        </div>

        {/* CPF */}
        <div>
          <label className="text-xs font-bold text-gray-600 uppercase mb-2 block">CPF *</label>
          <input 
            type="text" 
            value={formData.paciente.cpf || ''} 
            onChange={(e) => handleChange('cpf', e.target.value)}
            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#327933]"
            placeholder="000.000.000-00"
          />
        </div>

        {/* ENDEREÇO */}
        <div className="md:col-span-2">
          <label className="text-xs font-bold text-gray-600 uppercase mb-2 block">Endereço Residencial</label>
          <input 
            type="text" 
            value={formData.paciente.endereco || ''} 
            onChange={(e) => handleChange('endereco', e.target.value)}
            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#327933]"
            placeholder="Rua, número, complemento, bairro, cidade - UF"
          />
        </div>

        {/* TELEFONE */}
        <div>
          <label className="text-xs font-bold text-gray-600 uppercase mb-2 block">Telefone / WhatsApp *</label>
          <input 
            type="text" 
            value={formData.paciente.telefone || ''} 
            onChange={(e) => handleChange('telefone', e.target.value)}
            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#327933]"
            placeholder="(00) 00000-0000"
          />
        </div>

        {/* PROFISSÃO */}
        <div>
          <label className="text-xs font-bold text-gray-600 uppercase mb-2 block">Profissão</label>
          <input 
            type="text" 
            value={formData.paciente.profissao || ''} 
            onChange={(e) => handleChange('profissao', e.target.value)}
            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#327933]"
            placeholder="Informe a profissão"
          />
        </div>

        {/* ESTADO CIVIL */}
        <div className="md:col-span-2">
          <label className="text-xs font-bold text-gray-600 uppercase mb-2 block">Estado Civil</label>
          <select 
            value={formData.paciente.estadoCivil || ''} 
            onChange={(e) => handleChange('estadoCivil', e.target.value)}
            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#327933] appearance-none"
          >
            <option value="">Selecione</option>
            <option value="solteiro">Solteiro(a)</option>
            <option value="casado">Casado(a)</option>
            <option value="divorciado">Divorciado(a)</option>
            <option value="viuvo">Viúvo(a)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DadosPessoais;