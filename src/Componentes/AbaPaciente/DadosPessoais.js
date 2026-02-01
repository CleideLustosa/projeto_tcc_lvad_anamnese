import React from 'react';

const DadosPessoais = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2 uppercase">Dados Pessoais</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nome */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Nome Completo *</label>
          <input type="text" placeholder="Digite o nome completo" className="w-full p-3 bg-gray-50 border rounded-lg outline-none focus:ring-1 focus:ring-[#327933]" />
        </div>
        
        {/* Data Nascimento e Gênero */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Nascimento *</label>
            <input type="date" className="w-full p-3 bg-gray-50 border rounded-lg text-sm" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Gênero *</label>
            <div className="flex gap-4 pt-3">
              <label className="text-sm flex items-center gap-1"><input type="radio" name="gen" /> Feminino</label>
              <label className="text-sm flex items-center gap-1"><input type="radio" name="gen" /> Masculino</label>
            </div>
          </div>
        </div>

        {/* Nacionalidade e CPF */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Nacionalidade</label>
          <input type="text" placeholder="Informe a nacionalidade" className="w-full p-3 bg-gray-50 border rounded-lg outline-none" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">CPF *</label>
          <input type="text" placeholder="000.000.000-00" className="w-full p-3 bg-gray-50 border rounded-lg outline-none" />
        </div>

        {/* Endereço - Ocupa a linha toda */}
        <div className="md:col-span-2 space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Endereço</label>
          <input type="text" placeholder="Rua, número, complemento, bairro, cidade - UF" className="w-full p-3 bg-gray-50 border rounded-lg outline-none" />
        </div>

        {/* Telefone e Profissão */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Telefone *</label>
          <input type="text" placeholder="(00) 00000-0000" className="w-full p-3 bg-gray-50 border rounded-lg outline-none" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Profissão</label>
          <input type="text" placeholder="Informe a profissão" className="w-full p-3 bg-gray-50 border rounded-lg outline-none" />
        </div>

        {/* Estado Civil */}
        <div className="md:col-span-2 space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Estado Civil</label>
          <select className="w-full p-3 bg-gray-50 border rounded-lg outline-none">
            <option>Selecione</option>
            <option>Solteiro(a)</option>
            <option>Casado(a)</option>
            <option>Divorciado(a)</option>
            <option>Viúvo(a)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DadosPessoais;