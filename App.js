import React from 'react';
import { User, Heart, Link, Activity, FileText } from 'lucide-react';
import DadosPessoais from './Componentes/DadosPessoais';
import EmergencyContacts from './Componentes/EmergencyContacts';
import ConsultationHistory from './Componentes/ConsultationHistory';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Cabeçalho Verde Mackenzie */}
      <header className="bg-[#327933] text-white p-5 shadow-lg">
        <div className="flex items-center gap-3">
          <Activity size={28} />
          <div>
            <h1 className="text-2xl font-bold">Anamnese LVAD</h1>
            <p className="text-sm opacity-90">Ficha de Anamnese para Paciente com Dispositivo de Assistência Ventricular Esquerda</p>
          </div>
        </div>
      </header>

      {/* Navegação por Abas Horizontal conforme o Figma */}
      <nav className="flex bg-white border-b overflow-x-auto sticky top-0 z-10">
        <button className="px-8 py-4 border-b-4 border-[#327933] font-bold text-[#327933] flex items-center gap-2">
          <User size={18} /> Paciente
        </button>
        <button className="px-8 py-4 text-gray-500 hover:bg-gray-50 flex items-center gap-2">
          <Heart size={18} /> Informações Clínicas
        </button>
        <button className="px-8 py-4 text-gray-500 hover:bg-gray-50 flex items-center gap-2">
          <Link size={18} /> Medicamentos
        </button>
        <button className="px-8 py-4 text-gray-500 hover:bg-gray-50 flex items-center gap-2">
          <Activity size={18} /> Dispositivo LVAD
        </button>
        <button className="px-8 py-4 text-gray-500 hover:bg-gray-50 flex items-center gap-2">
          <FileText size={18} /> Consulta
        </button>
      </nav>

      {/* Conteúdo Principal em Grid */}
      <main className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Lado Esquerdo: Foto e Histórico (Sidebar) */}
        <div className="lg:col-span-1 space-y-6">
          {/* Card da Foto do Paciente */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <p className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">Foto do Paciente</p>
            <div className="w-32 h-32 bg-gray-50 rounded-full mx-auto border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
               <User size={48} className="text-gray-300" />
            </div>
            <button className="text-sm text-[#327933] font-bold border border-[#327933] px-6 py-2 rounded-full hover:bg-green-50 transition-colors">
              CARREGAR FOTO
            </button>
          </div>
          
          {/* Componente de Histórico Recente */}
          <ConsultationHistory />
        </div>

        {/* Lado Direito: Formulários e Dados Detalhados */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Componente de Dados Pessoais (Com Nacionalidade, Endereço e Estado Civil) */}
          <DadosPessoais />

          {/* Componente de Contatos de Emergência (Com E-mail e Relação) */}
          <EmergencyContacts />

          {/* Botão de Navegação para Próxima Aba */}
          <div className="flex justify-end pt-4">
            <button className="bg-[#327933] text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:bg-green-800 transition-all transform hover:scale-105">
              Próximo: Informações Clínicas →
            </button>
          </div>
        </div>
      </main>

      {/* Rodapé Institucional */}
      <footer className="p-8 text-center text-gray-400 text-xs">
        <p>© 2026 - Desenvolvimento TCC Mackenzie - Sistema de Monitoramento LVAD</p>
      </footer>
    </div>
  );
}

export default App;