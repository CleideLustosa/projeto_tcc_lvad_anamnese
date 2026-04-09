import React, { createContext, useState, useContext } from 'react';

const AnamneseContext = createContext();

export const AnamneseProvider = ({ children }) => {
  // Estado único que guarda todas as abas
  const [formData, setFormData] = useState({
    paciente: { nome: '', nacionalidade: '', cpf: '', endereco: '', telefone: '', profissao: '', estadoCivil: '', contatos: [] },
    clinica: { 
      prontuario: '', 
      tipoSanguineo: '', 
      dataImplante: '', 
      motivoImplante: '', 
      observacoes: [],
      consideracoes: '',
      alergias: '',
      historicoClinco: ''
    },
    consulta: { queixa: '', tratamentos: '', conduta: '' }
  });

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

  // Função para adicionar medicamento prescrito
  const adicionarPrescrito = (dados) => {
    setListaPrescritos([...listaPrescritos, { ...dados, id: Date.now() }]);
  };

  // Função para remover medicamento prescrito
  const removerPrescrito = (id) => {
    setListaPrescritos(listaPrescritos.filter(med => med.id !== id));
  };

  // Função para adicionar medicamento administrado
  const adicionarAdministrado = (dados) => {
    setListaAdministrados([...listaAdministrados, { ...dados, id: Date.now() }]);
  };

  // Função para remover medicamento administrado
  const removerAdministrado = (id) => {
    setListaAdministrados(listaAdministrados.filter(med => med.id !== id));
  };

  return (
    <AnamneseContext.Provider value={{ 
      formData, 
      updateFormData,
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