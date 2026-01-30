import React, { useState } from 'react'; // Passo 1: useState adicionado
import { User, Heart, Link, Activity, FileText, Pill } from 'lucide-react';

// Suas importações organizadas em subpastas
import DadosPessoais from './Componentes/AbaPaciente/DadosPessoais';
import EmergencyContacts from './Componentes/AbaPaciente/EmergencyContacts';
import ConsultationHistory from './Componentes/AbaPaciente/ConsultationHistory';
import InformacoesClinicas from './Componentes/AbaClinica/InformacoesClinicas';

function App() {
  // Passo 2: Definindo qual aba começa aberta
  const [abaAtiva, setAbaAtiva] = useState('paciente');

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Cabeçalho */}
      <header className="bg-[#327933] text-white p-5 shadow-lg">
        <div className="flex items-center gap-3">
          <Activity size={28} />
          <div>
            <h1 className="text-2xl font-bold">Anamnese LVAD</h1>
            <p className="text-sm opacity-90">Mackenzie - Sistema de Monitoramento</p>
          </div>
        </div>
      </header>

      {/* Passo 3: Navegação Dinâmica */}
      <nav className="flex bg-white border-b overflow-x-auto sticky top-0 z-10">
        <button 
          onClick={() => setAbaAtiva('paciente')}
          className={`px-8 py-4 font-bold flex items-center gap-2 transition-all ${
            abaAtiva === 'paciente' ? 'border-b-4 border-[#327933] text-[#327933]' : 'text-gray-400'
          }`}
        >
          <User size={18} /> Paciente
        </button>

        <button 
          onClick={() => setAbaAtiva('clinica')}
          className={`px-8 py-4 font-bold flex items-center gap-2 transition-all ${
            abaAtiva === 'clinica' ? 'border-b-4 border-[#327933] text-[#327933]' : 'text-gray-400'
          }`}
        >
          <Heart size={18} /> Informações Clínicas
        </button>

        {/* Abas futuras (desabilitadas por enquanto) */}
        <button className="px-8 py-4 text-gray-300 flex items-center gap-2 cursor-not-allowed"><Pill size={18} /> Medicamentos</button>
        <button className="px-8 py-4 text-gray-300 flex items-center gap-2 cursor-not-allowed"><Activity size={18} /> Dispositivo</button>
      </nav>

      <main className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Lado Esquerdo (Fixo) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="w-32 h-32 bg-gray-50 rounded-full mx-auto border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
               <User size={48} className="text-gray-300" />
            </div>
            <button className="text-sm text-[#327933] font-bold border border-[#327933] px-6 py-2 rounded-full hover:bg-green-50">
              CARREGAR FOTO
            </button>
          </div>
          <ConsultationHistory />
        </div>

        {/* Lado Direito - Passo 4: Conteúdo Condicional */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* RENDERIZAÇÃO DA ABA PACIENTE */}
          {abaAtiva === 'paciente' && (
            <div className="animate-in fade-in duration-500">
              <DadosPessoais />
              <div className="my-6"></div>
              <EmergencyContacts />
              <div className="flex justify-end pt-6">
                <button 
                  onClick={() => setAbaAtiva('clinica')}
                  className="bg-[#327933] text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:bg-green-800 transition-all"
                >
                  Próximo: Informações Clínicas →
                </button>
              </div>
            </div>
          )}

          {/* RENDERIZAÇÃO DA ABA CLÍNICA */}
          {abaAtiva === 'clinica' && (
            <div className="animate-in fade-in duration-500">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2 uppercase text-[#327933]">Informações Clínicas</h2>
                <InformacoesClinicas />
              </div>
              <div className="flex justify-between pt-6">
                <button 
                  onClick={() => setAbaAtiva('paciente')}
                  className="text-gray-500 font-bold px-6 py-4 hover:underline"
                >
                  ← Voltar para Paciente
                </button>
                <button className="bg-gray-200 text-gray-400 px-10 py-4 rounded-xl font-bold cursor-not-allowed">
                  Próximo: Medicamentos →
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default App;