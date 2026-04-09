import React, { useState, useRef } from 'react';
import { User } from 'lucide-react';

const FotoPaciente = () => {
  const [fotoPaciente, setFotoPaciente] = useState(null); // Estado para armazenar a foto (URL ou base64)
  const [isUploading, setIsUploading] = useState(false); // Estado para indicar upload em andamento
  const fileInputRef = useRef(null);

  const getPreview = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const uploadFoto = async (file) => {
    const formData = new FormData();
    formData.append('foto', file);

    // TODO: Ajustar a URL do endpoint para o back-end quando estiver disponível
    const uploadUrl = '/api/paciente/foto';

    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Falha no upload');
    }

    const result = await response.json();
    return result;
  };

  // Função para lidar com o upload da foto
  const handleFotoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validações básicas
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // Limite de 5MB
      alert('A imagem deve ter no máximo 5MB.');
      return;
    }

    setIsUploading(true);

    try {
      const preview = await getPreview(file);
      setFotoPaciente(preview);

      // Envia o arquivo para o back-end assim que o endpoint estiver disponível.
      const result = await uploadFoto(file);

      // Se o backend retornar URL da imagem, atualiza o preview para usar essa URL
      if (result?.photoUrl) {
        setFotoPaciente(result.photoUrl);
      }

      console.log('Foto enviada com sucesso:', result);
    } catch (error) {
      console.error('Erro ao enviar a foto:', error);
      alert('A foto foi pré-visualizada localmente. O upload de backend não está pronto ou falhou.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
      {/* Área da Foto */}
      <div className="w-32 h-32 bg-gray-50 rounded-full mx-auto border-2 border-dashed border-gray-300 flex items-center justify-center mb-4 text-gray-300 relative overflow-hidden">
        {fotoPaciente ? (
          <img
            src={fotoPaciente}
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

      {/* Botão de Upload */}
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