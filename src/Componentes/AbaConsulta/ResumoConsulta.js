import React, { useState } from 'react';
import { ClipboardCheck, Send, FileText } from 'lucide-react';
import { useAnamnese } from '../../AnamneseContext';
import { db } from '../../firebaseConfig';
import { doc, updateDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import gerarRelatorioPDF from './RelatórioConsultaPDF';

const ResumoConsulta = ({ setAbaAtiva }) => {
  // Pega pacienteSelecionado do contexto para garantir acesso à foto
  const { 
    formData, 
    updateFormData, 
    listaPrescritos, 
    listaAdministrados, 
    pacienteSelecionado,
    adicionarHistoricoConsulta
  } = useAnamnese();

  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const { queixa, intensidadeSintomas, duracaoSintomas, tratamentos, conduta } = formData.consulta;

  const handleSalvar = async () => {
    const errors = {};
    if (!queixa.trim()) errors.queixa = true;
    if (!intensidadeSintomas) errors.intensidadeSintomas = true;
    if (!duracaoSintomas.trim()) errors.duracaoSintomas = true;
    if (!conduta.trim()) errors.conduta = true;

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setErrorMessage('Preencha todos os campos obrigatórios da conclusão antes de salvar.');
      return;
    }

    if (!pacienteSelecionado?.id) {
      setErrorMessage('Paciente selecionado inválido. Não foi possível salvar a consulta.');
      return;
    }

    setErrorMessage('');
    setFieldErrors({});

    try {
      const pacienteId = pacienteSelecionado.id;
      const pacienteRef = doc(db, 'pacientes', pacienteId);

      const proximaConsulta =
        formData.clinica?.proximaConsulta ||
        formData.clinica?.dataProximaConsulta ||
        '';

      await updateDoc(pacienteRef, {
        status: 'Estável',
        dataAgendamento: proximaConsulta || '',
      });

      const consultasCollection = collection(pacienteRef, 'consultas');
      await addDoc(consultasCollection, {
        ...formData.consulta,
        criadoEm: serverTimestamp(),
        registradoPor: pacienteSelecionado?.nome || 'Equipe Clínica',
      });

      const novoHistorico = {
        data: new Date().toLocaleDateString('pt-BR'),
        medico: formData.clinica?.cirurgiaoResponsavel || 'Equipe Clínica',
        motivo: queixa || conduta || 'Consulta concluída',
        ...formData.consulta,
      };

      adicionarHistoricoConsulta(pacienteId, novoHistorico, pacienteSelecionado?.cpf || null);

      window.alert('Consulta salva com sucesso.');

      if (typeof setAbaAtiva === 'function') {
        setTimeout(() => {
          setAbaAtiva('dashboard');
        }, 2000);
      }

      // Atualização do histórico imediatamente no modal de Triagem,
     
    } catch (error) {
      console.error('Erro ao salvar consulta:', error);
      setErrorMessage('Houve um problema de sincronização com o banco de dados. Verifique sua conexão e tente novamente.');
    }
  };

  // Função alterada para enviar a foto que já está no sistema para o PDF
  const gerarPDF = async () => {
    // Foto do paciente selecionado (que veio do Firebase)
    const fotoParaOReport = pacienteSelecionado?.foto || formData.paciente?.foto || '';

    await gerarRelatorioPDF({ 
      formData, 
      listaPrescritos, 
      listaAdministrados,
      fotoUrlOuBase64: fotoParaOReport // Envio da URL ou Base64 da imagem para o relatório
    });
  };

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
            className={`w-full p-4 bg-white border rounded-xl text-sm outline-none focus:border-[#327933] min-h-[100px] ${fieldErrors.queixa ? 'border-red-500' : 'border-gray-200'}`}
            placeholder="Descreva o motivo principal da consulta hoje..."
            value={queixa}
            onChange={(e) => updateFormData('consulta', { queixa: e.target.value })}
          />
        </div>

        {/* Intensidade e Duração */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold text-gray-600 uppercase mb-2 block">
              Intensidade dos Sintomas *
              <span className="ml-1 text-gray-400 cursor-help" title="Avalie a gravidade dos sintomas relatados pelo paciente, considerando fatores como dor, desconforto e impacto na qualidade de vida. Use uma escala de 1 a 5 para padronizar a avaliação.">
                ?
              </span>
            </label>
            <select
              className={`w-full p-3 bg-white border rounded-xl text-sm outline-none appearance-none ${fieldErrors.intensidadeSintomas ? 'border-red-500' : 'border-gray-200'}`}
              value={intensidadeSintomas}
              onChange={(e) => updateFormData('consulta', { intensidadeSintomas: e.target.value })}
            >
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
              Duração dos Sintomas *
            </label>
            <input 
              type="text"
              placeholder="Ex: Há 3 dias"
              className={`w-full p-3 bg-white border rounded-xl text-sm outline-none focus:border-[#327933] ${fieldErrors.duracaoSintomas ? 'border-red-500' : 'border-gray-200'}`}
              value={duracaoSintomas}
              onChange={(e) => updateFormData('consulta', { duracaoSintomas: e.target.value })}
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
            value={tratamentos}
            onChange={(e) => updateFormData('consulta', { tratamentos: e.target.value })}
          />
        </div>

        {/* Conduta e Observações */}
        <div>
          <label className="text-xs font-bold text-gray-600 uppercase mb-2 block">
            Conduta e Observações *
            <span className="ml-1 text-gray-400 cursor-help" title="Descreva o plano terapêutico adotado, incluindo ajustes em medicações, orientações ao paciente, exames solicitados e próximos passos do tratamento. Foque em ações práticas e preventivas.">
              ?
            </span>
          </label>
          <textarea 
            className={`w-full p-4 bg-white border rounded-xl text-sm outline-none focus:border-[#327933] min-h-[120px] ${fieldErrors.conduta ? 'border-red-500' : 'border-gray-200'}`}
            placeholder="Plano terapêutico, orientações dadas ao paciente ou alterações na medicação..."
            value={conduta}
            onChange={(e) => updateFormData('consulta', { conduta: e.target.value })}
          />
        </div>
      </div>

      {errorMessage && (
        <p className="mb-4 text-sm text-red-600 font-semibold">{errorMessage}</p>
      )}

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={handleSalvar}
          className="w-full sm:w-auto flex-1 py-4 bg-[#327933] text-white font-bold rounded-xl shadow-lg hover:bg-green-800 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
        >
          <Send size={18} />
          Finalizar e Salvar Consulta
        </button>
        <button
          type="button"
          onClick={gerarPDF}
          className="w-full sm:w-auto flex-1 py-4 bg-white text-[#327933] border border-[#327933] font-bold rounded-xl shadow-sm hover:bg-green-50 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
        >
          <FileText size={18} />
          Gerar Relatório PDF
        </button>
      </div>
      <p className="text-center text-[10px] text-gray-400 mt-3 font-medium uppercase">
        ⚠️ Verifique todos os campos antes de confirmar
      </p>
    </div>
  );
};

export default ResumoConsulta;