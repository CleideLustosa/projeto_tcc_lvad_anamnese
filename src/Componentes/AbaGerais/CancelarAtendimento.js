import React from 'react';

const CancelarAtendimento = ({ onCancel }) => {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="flex justify-center pt-6">
      <button
        onClick={handleCancel}
        className="bg-[#327933] text-white px-12 py-4 rounded-xl font-bold uppercase tracking-wide shadow-md hover:bg-green-800 transition-all"
      >
        Cancelar Atendimento
      </button>
    </div>
  );
};

export default CancelarAtendimento;
