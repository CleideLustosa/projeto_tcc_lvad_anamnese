import React, { useState, useRef } from 'react';
import { User } from 'lucide-react';
// 1. Importamos o hook do contexto
import { useAnamnese } from '../../AnamneseContext';

const FotoPaciente = () => {
  // 2. Pegamos o pacienteSelecionado do contexto
  const { pacienteSelecionado } = useAnamnese();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // 3. A foto que será exibida agora prioriza o que vem do Firebase (pacienteSelecionado)
  const fotoExibicao = pacienteSelecionado?.foto || null;

  const handleFotoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido.');
      return;
    }

    setIsUploading(true);
    try {
      // Aqui você manteria sua lógica de upload se fosse salvar uma nova foto
      console.log('Simulando upload...');
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
      {/* Área da Foto */}
      <div className="w-32 h-32 bg-gray-50 rounded-full mx-auto border-2 border-dashed border-gray-300 flex items-center justify-center mb-4 text-gray-300 relative overflow-hidden">
        {/* 4. Mudamos para usar a variável fotoExibicao */}
        {fotoExibicao ? (
          <img
            src={fotoExibicao}
            alt="Foto do Paciente"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <User size={48} />
        )}
        
        {isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
            <div className="text-white text-sm">Carregando...</div>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFotoUpload}
        className="hidden"
        disabled={isUploading}
      />
      
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={`text-[10px] font-bold border-2 border-[#327933] px-4 py-2 rounded-full hover:bg-green-50 transition-all uppercase ${
          isUploading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={isUploading}
      >
        {isUploading ? 'Carregando...' : 'Carregar Foto'}
      </button>
    </div>
  );
};

export default FotoPaciente;