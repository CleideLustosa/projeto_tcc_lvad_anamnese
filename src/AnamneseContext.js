import React, { createContext, useState, useContext } from 'react';

const AnamneseContext = createContext();

export const AnamneseProvider = ({ children }) => {
  // Estado único que guarda todas as abas
  const [formData, setFormData] = useState({
    paciente: { nome: '', nacionalidade: '', cpf: '', endereco: '', telefone: '', profissao: '', estadoCivil: '', contatos: [] },
    clinica: { prontuario: '', tipoSanguineo: '', dataImplante: '', motivoImplante: '', observacoes: [] },
    medicamentos: { prescritos: [], administrados: [] },
    consulta: { queixa: '', tratamentos: '', conduta: '' }
  });

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

  return (
    <AnamneseContext.Provider value={{ formData, updateFormData }}>
      {children}
    </AnamneseContext.Provider>
  );
};

export const useAnamnese = () => useContext(AnamneseContext);