import React, { createContext, useState, useContext } from 'react';

const AnamneseContext = createContext();

export const AnamneseProvider = ({ children }) => {
  // Estado único que guarda todas as abas
  const [formData, setFormData] = useState({
    paciente: { 
      nome: '', 
      nacionalidade: '', 
      cpf: '', 
      endereco: '', 
      telefone: '', 
      profissao: '', 
      estadoCivil: '',
      dataNascimento: '',
      idade: '',
      sexo: '',
      contatos: [] 
    },
    clinica: { 
      prontuario: '', 
      tipoSanguineo: '', 
      dataImplante: '', 
      tipoDispositivo: '',
      instituicaoImplante: '',
      cirurgiaoResponsavel: '',
      motivoImplante: '', 
      observacoes: [],
      consideracoes: '',
      alergias: '',
      historicoClinco: ''
    },
    consulta: { 
      queixa: '', 
      intensidadeSintomas: '', 
      duracaoSintomas: '', 
      tratamentos: '', 
      conduta: '' 
    }
  });

  // Estado para armazenar paciente selecionado do Firebase
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

  // Estados para listas de medicamentos
  const [listaPrescritos, setListaPrescritos] = useState([]);
  const [listaAdministrados, setListaAdministrados] = useState([]);

  // Função para atualizar qualquer campo de qualquer aba preservando os dados anteriores
  const updateFormData = (aba, dados) => {
    setFormData(prev => ({
      ...prev,
      [aba]: { 
        ...prev[aba], 
        ...dados 
      }
    }));
  };

  // Função para adicionar medicamento prescrito crônico
  const adicionarPrescrito = (dados) => {
    setListaPrescritos([...listaPrescritos, { ...dados, id: Date.now() }]);
  };

  // Função para remover medicamento prescrito crônico
  const removerPrescrito = (id) => {
    setListaPrescritos(listaPrescritos.filter(med => med.id !== id));
  };

  // Função para adicionar medicamento administrado de Emergência ou urgência
  const adicionarAdministrado = (dados) => {
    setListaAdministrados([...listaAdministrados, { ...dados, id: Date.now() }]);
  };

  // Função para remover medicamento administrado de Emergência ou urgência
  const removerAdministrado = (id) => {
    setListaAdministrados(listaAdministrados.filter(med => med.id !== id));
  };

  // Função para selecionar paciente do Firebase e preencher formulário
  const selecionarPaciente = (pacienteFirebase) => {
    setPacienteSelecionado(pacienteFirebase);
    
    // Preenche dados do paciente em ambas as abas (paciente e clinica)
    // Distribui todas as informações disponíveis do paciente
    setFormData(prev => ({
      ...prev,
      paciente: {
        ...prev.paciente,
        nome: pacienteFirebase.nome || '',
        nacionalidade: pacienteFirebase.nacionalidade || '',
        cpf: pacienteFirebase.cpf || '',
        endereco: pacienteFirebase.endereco || '',
        telefone: pacienteFirebase.telefone || '',
        profissao: pacienteFirebase.profissao || '',
        estadoCivil: pacienteFirebase.estadoCivil || '',
        dataNascimento: pacienteFirebase.dataNascimento || '',
        idade: pacienteFirebase.idade ? String(pacienteFirebase.idade) : '',
        sexo: pacienteFirebase.sexo || ''
      },
      clinica: {
        ...prev.clinica,
        prontuario: pacienteFirebase.prontuario || '',
        tipoSanguineo: pacienteFirebase.tipoSanguineo || '',
        dataImplante: pacienteFirebase.dataImplante || '',
        tipoDispositivo: pacienteFirebase.tipoDispositivo || '',
        instituicaoImplante: pacienteFirebase.instituicaoImplante || '',
        cirurgiaoResponsavel: pacienteFirebase.cirurgiaoResponsavel || ''
      }
    }));
  };

  return (
    <AnamneseContext.Provider value={{ 
      formData, 
      updateFormData,
      pacienteSelecionado,
      selecionarPaciente,
      listaPrescritos,
      listaAdministrados,
      adicionarPrescrito,
      removerPrescrito,
      adicionarAdministrado,
      removerAdministrado
    }}>
      {children}
    </AnamneseContext.Provider>
  );
};

export const useAnamnese = () => useContext(AnamneseContext);