import React, { useState } from 'react';
import { AlertCircle, ChevronDown, Lock, User, Heart } from 'lucide-react';

const Login = ({ onLoginSuccess }) => {
  const [crm, setCrm] = useState('');
  const [uf, setUf] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const ufs = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!uf) { setError('Selecione a UF do seu CRM.'); return; }
    if (password.length < 8) { setError('A senha deve conter no mínimo 8 dígitos.'); return; }
    setError('');
    onLoginSuccess('pin'); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans p-4">
      <div className="w-full max-w-[480px] bg-white rounded-[3rem] p-12 shadow-2xl shadow-slate-200/60 border border-white animate-in fade-in zoom-in duration-1000 text-center">
        
        <div className="flex flex-col items-center mb-12">
          <div className="w-20 h-20 bg-[#327933] rounded-full flex items-center justify-center shadow-lg shadow-green-900/10 mb-8 border-[6px] border-green-50">
            <Heart size={36} color="white" fill="none" strokeWidth={1.5} />
          </div>
          
          {/* Títulos em duas linhas sem quebras órfãs */}
          <h1 className="text-[26px] font-black tracking-tight text-slate-800 whitespace-nowrap">
            Sistema de Anamnese LVAD
          </h1>
          <p className="text-[11px] font-bold uppercase text-slate-400 mt-4 tracking-[0.2em] whitespace-nowrap">
            Portal de Acesso para Profissionais de Saúde
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 text-left">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 tracking-widest">Número CRM</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#327933] transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="000000"
                  className="w-full p-4 pl-12 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:bg-white focus:ring-4 focus:ring-green-500/5 focus:border-[#327933] transition-all text-slate-600 placeholder:text-slate-300"
                  onChange={(e) => setCrm(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-span-1 space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 tracking-widest">UF</label>
              <div className="relative">
                <select 
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:bg-white focus:border-[#327933] transition-all cursor-pointer appearance-none font-bold text-slate-600"
                  value={uf}
                  onChange={(e) => setUf(e.target.value)}
                  required
                >
                  <option value="">--</option>
                  {ufs.map(sigla => <option key={sigla} value={sigla}>{sigla}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 tracking-widest">Senha de Acesso</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#327933] transition-colors" size={18} />
              <input 
                type="password" 
                placeholder="••••••••"
                className={`w-full p-4 pl-12 bg-slate-50 border rounded-2xl text-sm outline-none transition-all ${error ? 'border-red-200 ring-4 ring-red-500/5' : 'border-slate-100 focus:bg-white focus:ring-4 focus:ring-green-500/5 focus:border-[#327933]'}`}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-[10px] mt-2 font-bold uppercase ml-1 flex items-center gap-2">
                <AlertCircle size={12} /> {error}
              </p>
            )}
          </div>

          <button className="w-full bg-[#327933] hover:bg-[#2a662b] text-white font-bold py-5 rounded-2xl shadow-xl shadow-green-900/20 transition-all active:scale-[0.98] uppercase tracking-[0.2em] text-xs mt-4">
            Entrar no Sistema
          </button>
        </form>

        <p className="mt-12 text-slate-300 text-[9px] font-bold tracking-[0.3em] uppercase">
          Technology for Life Support
        </p>
      </div>
    </div>
  );
};

export default Login;