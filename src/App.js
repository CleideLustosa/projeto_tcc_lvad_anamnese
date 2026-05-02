import React, { useState } from 'react';
import { User, Heart, Activity, Pill, ClipboardList, Stethoscope } from 'lucide-react';
import { AnamneseProvider } from './AnamneseContext';

// Importações de componentes de tela
import Login from './Componentes/Login/Login'; 
import PinVerification from './Componentes/Login/PinVerification';

// Importes Componentes de Abas
import DadosPessoais from './Componentes/AbaPaciente/DadosPessoais';
import EmergencyContacts from './Componentes/AbaPaciente/EmergencyContacts';
import ConsultationHistory from './Componentes/AbaPaciente/ConsultationHistory';
import FotoPaciente from './Componentes/AbaPaciente/FotoPaciente';
import InformacoesClinicas from './Componentes/AbaClinica/InformacoesClinicas';
import MedicationTables from './Componentes/AbaMedicamentos/MedicationTables';
import LVADDashboard from './Componentes/AbaDispositivo/LVADDashboard';
import ResumoConsulta from './Componentes/AbaConsulta/ResumoConsulta';
import Triagem from './Componentes/AbaGerais/Triagem';
import EstatisticasAdesao from './Componentes/AbaGerais/EstatisticasAdesao';

function App() {
  // Controle de Fluxo: 'login', 'pin' ou 'dashboard'
  const [etapa, setEtapa] = useState('login');
  const [abaAtiva, setAbaAtiva] = useState('dashboard');

  // Funções de transição
  const irParaPin = () => setEtapa('pin');
  const irParaDashboard = () => setEtapa('dashboard');

  const handleCancelarAtendimento = () => {
    if (window.confirm('Tem certeza que deseja cancelar o atendimento? Todos os dados não salvos serão perdidos.')) {
      setAbaAtiva('dashboard');
    }
  };

  // --- TELA DE LOGIN ---
  if (etapa === 'login') {
    return <Login onLoginSuccess={irParaPin} />;
  }

  // --- TELA DE PIN (2FA) ---
  if (etapa === 'pin') {
    return <PinVerification onConfirm={irParaDashboard} onBack={() => setEtapa('login')} />;
  }

  // --- INTERFACE PRINCIPAL (SÓ APARECE APÓS O PIN) ---
  return (
    <AnamneseProvider>
      <div className="min-h-screen bg-gray-100 font-sans">
        {/* Cabeçalho */}
        <header className="bg-[#327933] text-white p-5 shadow-lg">
          <div className="flex items-center gap-3">
            <Activity size={28} />
            <div>
              <h1 className="text-2xl font-bold uppercase tracking-tight">Anamnese LVAD</h1>
              <p className="text-xs opacity-80 uppercase font-bold">Ficha de Anamnese para Paciente com Dispositivo de Assistência Ventricular Esquerda</p>
            </div>
          </div>
        </header>

        {/* Navegação Superior */}
        <nav className="flex bg-white border-b sticky top-0 z-10 overflow-x-auto">
          {[
            { id: 'dashboard', label: 'Triagem', icon: <Stethoscope size={18} /> },
            { id: 'paciente', label: 'Paciente', icon: <User size={18} /> },
            { id: 'clinica', label: 'Informações Clínicas', icon: <Heart size={18} /> },
            { id: 'medicamentos', label: 'Medicamentos', icon: <Pill size={18} /> },
            { id: 'dispositivo', label: 'Dispositivo', icon: <Activity size={18} /> },
            { id: 'consulta', label: 'Conclusões', icon: <ClipboardList size={18} /> },
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

        <main className="p-6 flex gap-6" style={{ alignItems: 'flex-start' }}>
          {/* Barra Lateral - Condicional (só aparece se não for dashboard ou estatisticas) */}
          {abaAtiva !== 'dashboard' && abaAtiva !== 'estatisticas' && (
            <div className="flex-shrink-0 space-y-6" style={{ width: '300px' }}>
              <FotoPaciente />
              <ConsultationHistory />
            </div>
          )}

          {/* Conteúdo Principal */}
          <div className="flex-1">
            {abaAtiva === 'paciente' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <DadosPessoais />
                <EmergencyContacts />
                <div className="flex justify-end gap-4 pt-4">
                  <button onClick={handleCancelarAtendimento} className="border-2 border-gray-400 text-gray-700 px-12 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all uppercase text-sm">
                    CANCELAR ATENDIMENTO
                  </button>
                  <button onClick={() => setAbaAtiva('clinica')} className="bg-[#327933] text-white px-12 py-4 rounded-xl font-bold shadow-md hover:bg-green-800">
                    PRÓXIMO: INFORMAÇÕES CLÍNICAS →
                  </button>
                </div>
              </div>
            )}

            {abaAtiva === 'dashboard' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <Triagem setAbaAtiva={setAbaAtiva} />
              </div>
            )}

            {abaAtiva === 'estatisticas' && (
              <div className="space-y-6 animate-in fade-in duration-500 w-full">
                <EstatisticasAdesao />
                <div className="flex justify-start pt-4">
                  <button onClick={() => setAbaAtiva('dashboard')} className="text-gray-400 font-bold uppercase text-sm">← Voltar para Triagem</button>
                </div>
              </div>
            )}

            {abaAtiva === 'clinica' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <InformacoesClinicas />
                <div className="flex justify-between pt-4">
                  <button onClick={() => setAbaAtiva('paciente')} className="text-gray-400 font-bold uppercase text-sm">← Voltar</button>
                  <button onClick={() => setAbaAtiva('medicamentos')} className="bg-[#327933] text-white px-12 py-4 rounded-xl font-bold">
                    PRÓXIMO: MEDICAMENTOS →
                  </button>
                </div>
              </div>
            )}

            {abaAtiva === 'medicamentos' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <MedicationTables />
                <div className="flex justify-between pt-4">
                  <button onClick={() => setAbaAtiva('clinica')} className="text-gray-400 font-bold uppercase text-sm">← Voltar</button>
                  <button onClick={() => setAbaAtiva('dispositivo')} className="bg-[#327933] text-white px-12 py-4 rounded-xl font-bold">
                    PRÓXIMO: DISPOSITIVO →
                  </button>
                </div>
              </div>
            )}

            {abaAtiva === 'dispositivo' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <LVADDashboard />
                <div className="flex justify-between pt-4">
                  <button onClick={() => setAbaAtiva('medicamentos')} className="text-gray-400 font-bold uppercase text-sm">← Voltar</button>
                  <button onClick={() => setAbaAtiva('consulta')} className="bg-[#327933] text-white px-12 py-4 rounded-xl font-bold">
                    PRÓXIMO: CONCLUSÕES →
                  </button>
                </div>
              </div>
            )}

            {abaAtiva === 'consulta' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <ResumoConsulta setAbaAtiva={setAbaAtiva} />
                <div className="flex justify-start pt-4">
                  <button onClick={() => setAbaAtiva('dispositivo')} className="text-gray-400 font-bold uppercase text-sm">← Voltar</button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </AnamneseProvider>
  );
}

export default App;