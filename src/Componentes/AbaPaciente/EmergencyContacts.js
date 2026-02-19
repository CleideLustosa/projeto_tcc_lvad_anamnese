// import React from 'react';
// import { Plus, Trash2 } from 'lucide-react';

// const EmergencyContacts = () => {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-lg font-bold text-gray-800">Contatos de Emergência</h2>
//         <button className="flex items-center gap-2 text-xs font-bold border border-gray-300 px-3 py-1 rounded-lg hover:bg-gray-50">
//           <Plus size={14} /> ADICIONAR
//         </button>
//       </div>

//       <div className="p-5 border border-gray-100 bg-gray-50 rounded-xl space-y-4">
//         <p className="text-xs font-bold text-[#327933] uppercase">Contato 1</p>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-1">
//             <label className="text-xs font-bold text-gray-600">NOME</label>
//             <input type="text" placeholder="Nome completo" className="w-full p-2 bg-white border rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#327933]" />
//           </div>
          
//           <div className="space-y-1">
//             <label className="text-xs font-bold text-gray-600">TIPO DE RELAÇÃO</label>
//             <select className="w-full p-2 bg-white border rounded-lg text-sm outline-none">
//               <option>Selecione</option>
//               <option>Cônjuge</option>
//               <option>Filho(a)</option>
//               <option>Pai/Mãe</option>
//               <option>Irmão(ã)</option>
//               <option>Outro</option>
//             </select>
//           </div>

//           <div className="space-y-1">
//             <label className="text-xs font-bold text-gray-600">TELEFONE</label>
//             <input type="text" placeholder="(00) 00000-0000" className="w-full p-2 bg-white border rounded-lg text-sm outline-none" />
//           </div>

//           <div className="space-y-1">
//             <label className="text-xs font-bold text-gray-600">E-MAIL</label>
//             <input type="email" placeholder="email@exemplo.com" className="w-full p-2 bg-white border rounded-lg text-sm outline-none" />
//           </div>
//         </div>

//         <div className="flex items-center gap-2 pt-2">
//           <input type="checkbox" id="auth" className="rounded border-gray-300" />
//           <label htmlFor="auth" className="text-xs text-gray-600 font-medium">Autorizado para decisões médicas</label>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmergencyContacts;


import React, { useState } from 'react';
import { Plus, X, UserPlus, Phone, Mail, ShieldCheck, Trash2, Heart, CheckCircle2, AlertCircle } from 'lucide-react';

const EmergencyContacts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contatos, setContatos] = useState([
    { 
      id: 1, 
      nome: "Maria Silva", 
      relacao: "Esposa", 
      telefone: "(11) 98888-7777", 
      email: "maria@email.com", 
      autorizado: true 
    }
  ]);

  const [novoContato, setNovoContato] = useState({
    nome: '',
    relacao: '',
    telefone: '',
    email: '',
    autorizado: false
  });

  const tiposRelacao = ["Cônjuge", "Filho(a)", "Pai/Mãe", "Irmão(ã)", "Outro Familiar", "Amigo(a)", "Cuidador"];

  const handleSalvar = () => {
    if (novoContato.nome && novoContato.relacao) {
      setContatos([...contatos, { ...novoContato, id: Date.now() }]);
      setNovoContato({ nome: '', relacao: '', telefone: '', email: '', autorizado: false });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mt-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 uppercase tracking-wider">
          <UserPlus size={18} className="text-[#327933]" />
          Contatos de Emergência
        </h3>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
        >
          <Plus size={16} className="text-[#327933]" />
          Adicionar
        </button>
      </div>

      {/* CABEÇALHO DA TABELA ATUALIZADO (5 COLUNAS) */}
      <div className="grid grid-cols-5 gap-4 bg-gray-50 p-3 rounded-t-xl border-b text-[10px] font-bold text-gray-500 uppercase tracking-widest">
        <div>Nome</div>
        <div>Tipo de Relação</div>
        <div>Telefone</div>
        <div>E-mail</div>
        <div className="text-center">Autorização Médica</div>
      </div>

      <div className="border border-t-0 rounded-b-xl overflow-hidden">
        {contatos.map((contato) => (
          <div key={contato.id} className="grid grid-cols-5 gap-4 p-4 border-b last:border-b-0 items-center text-sm text-gray-600 hover:bg-gray-50 transition-colors group">
            <div className="font-bold text-gray-800">{contato.nome}</div>
            <div>
               <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase text-gray-500 italic">
                 {contato.relacao}
               </span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded border border-gray-100 w-fit text-[13px]">
               <Phone size={12} className="text-gray-400" /> {contato.telefone}
            </div>
            <div className="truncate italic text-gray-400">{contato.email || '---'}</div>
            
            {/* NOVA COLUNA DE AUTORIZAÇÃO */}
            <div className="flex justify-center items-center gap-4">
              {contato.autorizado ? (
                <div className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 text-[10px] font-bold uppercase">
                  <CheckCircle2 size={12} /> Autorizado
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100 text-[10px] font-bold uppercase">
                  <AlertCircle size={12} /> Não Consta
                </div>
              )}
              <button 
                onClick={() => setContatos(contatos.filter(c => c.id !== contato.id))}
                className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        
        {contatos.length === 0 && (
          <div className="p-8 text-center text-gray-400 italic text-sm">Nenhum contato adicionado.</div>
        )}
      </div>

      {/* MODAL (Mantido conforme image_d453fd.jpg) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in duration-300">
            <div className="bg-[#327933] p-4 flex justify-between items-center text-white shadow-lg">
              <h3 className="font-bold flex items-center gap-2 uppercase text-xs tracking-widest">
                <Heart size={16} /> Novo Contato de Emergência
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="hover:bg-white/20 rounded-full p-1"><X size={20} /></button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Nome Completo</label>
                <input 
                  type="text" 
                  className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#327933] text-sm" 
                  placeholder="Ex: João Silva"
                  value={novoContato.nome}
                  onChange={(e) => setNovoContato({...novoContato, nome: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Relação</label>
                  <select 
                    className="w-full border p-3 rounded-xl outline-none text-sm bg-white"
                    value={novoContato.relacao}
                    onChange={(e) => setNovoContato({...novoContato, relacao: e.target.value})}
                  >
                    <option value="">Selecione</option>
                    {tiposRelacao.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Telefone</label>
                  <input 
                    type="text" 
                    className="w-full border p-3 rounded-xl outline-none text-sm" 
                    placeholder="(00) 00000-0000"
                    value={novoContato.telefone}
                    onChange={(e) => setNovoContato({...novoContato, telefone: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">E-mail</label>
                <input 
                  type="email" 
                  className="w-full border p-3 rounded-xl outline-none text-sm" 
                  placeholder="email@exemplo.com"
                  value={novoContato.email}
                  onChange={(e) => setNovoContato({...novoContato, email: e.target.value})}
                />
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-dashed">
                <input 
                  type="checkbox" 
                  id="modal-autorizado" 
                  className="accent-[#327933] w-4 h-4"
                  checked={novoContato.autorizado}
                  onChange={(e) => setNovoContato({...novoContato, autorizado: e.target.checked})}
                />
                <label htmlFor="modal-autorizado" className="text-xs text-gray-600 font-bold uppercase tracking-tighter">
                  Autorizado para decisões médicas críticas
                </label>
              </div>

              <button 
                onClick={handleSalvar}
                className="w-full py-3 bg-[#327933] text-white font-bold rounded-xl hover:bg-green-800 transition-all shadow-lg text-xs uppercase tracking-widest"
              >
                CONFIRMAR REGISTRO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyContacts;