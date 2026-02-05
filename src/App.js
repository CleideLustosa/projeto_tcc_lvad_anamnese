import React, { useState } from 'react';
import { User, Heart, Activity, Pill, ClipboardList } from 'lucide-react';

// Importações conferidas com sua estrutura de pastas
import DadosPessoais from './Componentes/AbaPaciente/DadosPessoais';
import EmergencyContacts from './Componentes/AbaPaciente/EmergencyContacts';
import ConsultationHistory from './Componentes/AbaPaciente/ConsultationHistory';
import InformacoesClinicas from './Componentes/AbaClinica/InformacoesClinicas';
import MedicationTables from './Componentes/AbaMedicamentos/MedicationTables';
import LVADDashboard from './Componentes/AbaDispositivo/LVADDashboard';
import ResumoConsulta from './Componentes/AbaConsulta/ResumoConsulta';

function App() {
  // Estado inicializado corretamente
  const [abaAtiva, setAbaAtiva] = useState('paciente');

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Cabeçalho Mackenzie */}
      <header className="bg-[#327933] text-white p-5 shadow-lg">
        <div className="flex items-center gap-3">
          <Activity size={28} />
          <div>
            <h1 className="text-2xl font-bold uppercase tracking-tight">Anamnese LVAD</h1>
            <p className="text-xs opacity-80 uppercase font-bold">Ficha de Anamnese para Paciente com Dispositivo de Assistência Ventricular Esquerda</p>
          </div>
        </div>
      </header>

      {/* Navegação Superior - Nomes de IDs padronizados */}
      <nav className="flex bg-white border-b sticky top-0 z-10 overflow-x-auto">
        {[
          { id: 'paciente', label: 'Paciente', icon: <User size={18} /> },
          { id: 'clinica', label: 'Informações Clínicas', icon: <Heart size={18} /> }, // ID simplificado para evitar erro
          { id: 'medicamentos', label: 'Medicamentos', icon: <Pill size={18} /> },
          { id: 'dispositivo', label: 'Dispositivo', icon: <Activity size={18} /> },
          { id: 'consulta', label: 'Consulta', icon: <ClipboardList size={18} /> },
        ].map((aba) => (
          <button
            key={aba.id}
            onClick={() => setAbaAtiva(aba.id)}
            className={`px-8 py-5 font-bold flex items-center gap-2 transition-all border-b-4 ${
              abaAtiva === aba.id 
                ? 'border-[#327933] text-[#327933] bg-green-50/30' 
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {aba.icon} {aba.label}
          </button>
        ))}
      </nav>

      <main className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Barra Lateral */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="w-32 h-32 bg-gray-50 rounded-full mx-auto border-2 border-dashed border-gray-300 flex items-center justify-center mb-4 text-gray-300">
               <User size={48} />
            </div>
            <button className="text-[10px] text-[#327933] font-bold border-2 border-[#327933] px-4 py-2 rounded-full hover:bg-green-50 transition-all uppercase">
              Carregar Foto
            </button>
          </div>
          <ConsultationHistory />
        </div>

        {/* Conteúdo Principal */}
        <div className="lg:col-span-3">
          
          {/* TELA: PACIENTE */}
          {abaAtiva === 'paciente' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <DadosPessoais />
              <EmergencyContacts />
              <div className="flex justify-end pt-4">
                <button 
                  onClick={() => setAbaAtiva('clinica')}
                  className="bg-[#327933] text-white px-12 py-4 rounded-xl font-bold shadow-md hover:bg-green-800 transition-all"
                >
                  PRÓXIMO: INFORMAÇÕES CLÍNICAS →
                </button>
              </div>
            </div>
          )}

          {/* TELA: INFORMAÇÕES CLÍNICAS - Corrigido */}
          {abaAtiva === 'clinica' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <InformacoesClinicas />
              </div>
              <div className="flex justify-between pt-4">
                <button onClick={() => setAbaAtiva('paciente')} className="text-gray-400 font-bold hover:text-gray-600 uppercase text-sm">← Voltar</button>
                <button 
                  onClick={() => setAbaAtiva('medicamentos')}
                  className="bg-[#327933] text-white px-12 py-4 rounded-xl font-bold shadow-md hover:bg-green-800 transition-all"
                >
                  PRÓXIMO: MEDICAMENTOS →
                </button>
              </div>
            </div>
          )}

          {/* TELA: MEDICAMENTOS */}
          {abaAtiva === 'medicamentos' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <MedicationTables />
              <div className="flex justify-between pt-4">
                <button onClick={() => setAbaAtiva('clinica')} className="text-gray-400 font-bold hover:text-gray-600 uppercase text-sm">← Voltar</button>
                <button 
                  onClick={() => setAbaAtiva('dispositivo')}
                  className="bg-[#327933] text-white px-12 py-4 rounded-xl font-bold shadow-md hover:bg-green-800 transition-all"
                >
                  PRÓXIMO: DISPOSITIVO →
                </button>
              </div>
            </div>
          )}

          {/* TELA: DISPOSITIVO */}
          {abaAtiva === 'dispositivo' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <LVADDashboard />
              <div className="flex justify-between pt-4">
                <button onClick={() => setAbaAtiva('medicamentos')} className="text-gray-400 font-bold hover:text-gray-600 uppercase text-sm">← Voltar</button>
                <button 
                  onClick={() => setAbaAtiva('consulta')}
                  className="bg-[#327933] text-white px-12 py-4 rounded-xl font-bold shadow-md hover:bg-green-800 transition-all"
                >
                  PRÓXIMO: RESUMO DA CONSULTA →
                </button>
              </div>
            </div>
          )}

          {/* TELA: CONSULTA */}
          {abaAtiva === 'consulta' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <ResumoConsulta />
              <div className="flex justify-start pt-4">
                <button onClick={() => setAbaAtiva('dispositivo')} className="text-gray-400 font-bold hover:text-gray-600 uppercase text-sm">← Voltar</button>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default App;