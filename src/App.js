import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Cabeçalho Verde Mackenzie */}
      <header className="bg-[#327933] text-white p-5 shadow-lg">
        <h1 className="text-2xl font-bold">Anamnese LVAD</h1>
        <p className="text-sm opacity-90 text-white">Ficha de Anamnese para Paciente com Dispositivo de Assistência Ventricular Esquerda</p>
      </header>

      {/* Navegação por Abas Horizontal */}
      <nav className="flex bg-white border-b overflow-x-auto">
        <button className="px-6 py-3 border-b-4 border-[#327933] font-bold text-[#327933]">👤 Paciente</button>
        <button className="px-6 py-3 text-gray-500 hover:bg-gray-50">❤️ Informações Clínicas</button>
        <button className="px-6 py-3 text-gray-500 hover:bg-gray-50">💊 Medicamentos</button>
        <button className="px-6 py-3 text-gray-500 hover:bg-gray-50">⚡ Dispositivo LVAD</button>
        <button className="px-6 py-3 text-gray-500 hover:bg-gray-50">📋 Consulta</button>
      </nav>

      <main className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Lado Esquerdo: Foto e Histórico */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <p className="text-xs font-bold text-gray-400 uppercase mb-4">Foto do Paciente</p>
            <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto border-2 border-dashed border-gray-300 flex items-center justify-center">
               <span className="text-gray-400 text-4xl">👤</span>
            </div>
            <button className="mt-4 text-sm text-blue-600 font-semibold border border-blue-600 px-4 py-1 rounded-full hover:bg-blue-50">Carregar Foto</button>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-sm border-b pb-2 mb-3">Histórico Recente</h3>
            <ul className="text-xs space-y-2 text-gray-600">
              <li className="flex justify-between">15/10/2024 <span className="text-blue-600 cursor-pointer hover:underline">Ver</span></li>
              <li className="flex justify-between">15/09/2024 <span className="text-blue-600 cursor-pointer hover:underline">Ver</span></li>
            </ul>
          </div>
        </div>

        {/* Lado Direito: Formulário de Dados Pessoais */}
        <div className="md:col-span-3 space-y-6">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Dados Pessoais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600 uppercase">Nome Completo *</label>
                <input type="text" placeholder="Digite o nome completo" className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-[#327933] outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600 uppercase">CPF *</label>
                <input type="text" placeholder="000.000.000-00" className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-[#327933] outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-600 uppercase">Nascimento *</label>
                  <input type="date" className="w-full p-3 bg-gray-50 border rounded-lg" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-600 uppercase">Gênero</label>
                  <select className="w-full p-3 bg-gray-50 border rounded-lg outline-none">
                    <option>Feminino</option>
                    <option>Masculino</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600 uppercase">Profissão</label>
                <input type="text" placeholder="Informe a ocupação" className="w-full p-3 bg-gray-50 border rounded-lg outline-none" />
              </div>
            </div>
          </div>

          {/* Seção de Emergência */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Contatos de Emergência</h2>
            <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Nome do contato" className="p-3 bg-white border rounded-lg" />
              <input type="text" placeholder="(00) 00000-0000" className="p-3 bg-white border rounded-lg" />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-[#327933] text-white px-8 py-3 rounded-lg font-bold shadow-md hover:bg-green-800 transition-all">
              Próximo: Informações Clínicas →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;