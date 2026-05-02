import React from 'react';
import { useAnamnese } from '../../AnamneseContext'; // Importando a conexão com a nuvem

const DadosPessoais = () => {
  // Extraindo os dados e a função de atualização do contexto
  const { formData, updateFormData } = useAnamnese();

  // Função auxiliar para facilitar a atualização dos campos desta aba
  const handleChange = (campo, valor) => {
    updateFormData('paciente', { [campo]: valor });
  };

  // Função para calcular idade automaticamente a partir da data de nascimento
  const calcularIdade = (dataNascimento) => {
    if (!dataNascimento) return '';
    
    // Converte string DD/MM/YYYY para Date
    const [dia, mes, ano] = dataNascimento.split('/');
    const dataAtual = new Date();
    const dataNasc = new Date(ano, mes - 1, dia);
    
    // Calcula a diferença em anos
    let idade = dataAtual.getFullYear() - dataNasc.getFullYear();
    const mesAtual = dataAtual.getMonth();
    const diaAtual = dataAtual.getDate();
    
    // Ajusta se o aniversário ainda não ocorreu este ano
    if (mesAtual < (mes - 1) || (mesAtual === (mes - 1) && diaAtual < dia)) {
      idade--;
    }
    
    return idade >= 0 ? idade : '';
  };

  // Função para formatar data no padrão DD/MM/YYYY
  const formatarDataNascimento = (valor) => {
    const apenasNumeros = valor.replace(/\D/g, '');
    if (apenasNumeros.length <= 2) return apenasNumeros;
    if (apenasNumeros.length <= 4) return `${apenasNumeros.slice(0, 2)}/${apenasNumeros.slice(2)}`;
    return `${apenasNumeros.slice(0, 2)}/${apenasNumeros.slice(2, 4)}/${apenasNumeros.slice(4, 8)}`;
  };

  // Handler para data de nascimento com formatação automática
  const handleDataNascimento = (e) => {
    const valor = formatarDataNascimento(e.target.value);
    handleChange('dataNascimento', valor);
    
    // Calcula idade quando a data está completa
    if (valor.length === 10) {
      const idade = calcularIdade(valor);
      handleChange('idade', idade.toString());
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* NOME COMPLETO */}
        <div className="md:col-span-2">
          <label className="text-xs font-bold text-gray-600 uppercase mb-2 block">Nome Completo</label>
          <input 
            type="text" 
            value={formData.paciente.nome || ''} 
            onChange={(e) => handleChange('nome', e.target.value)}
            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#327933] transition-all"
            placeholder="Digite o nome completo do paciente"
          />
        </div>

        {/* NACIONALIDADE */}
        <div>
          <label className="text-xs font-bold text-gray-600 uppercase mb-2 block">Nacionalidade</label>
          <input 
            type="text" 
            value={formData.paciente.nacionalidade || ''} 
            onChange={(e) => handleChange('nacionalidade', e.target.value)}
            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#327933]"
            placeholder="Ex: Brasileira"
          />
        </div>

        {/* CPF */}
        <div>
          <label className="text-xs font-bold text-gray-600 uppercase mb-2 block">CPF *</label>
          <input 
            type="text" 
            value={formData.paciente.cpf || ''} 
            onChange={(e) => handleChange('cpf', e.target.value)}
            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#327933]"
            placeholder="000.000.000-00"
          />
        </div>

        {/* DATA DE NASCIMENTO */}
        <div>
          <label className="text-xs font-bold text-gray-600 uppercase mb-2 block">Data de Nascimento</label>
          <input 
            type="text" 
            value={formData.paciente.dataNascimento || ''} 
            onChange={handleDataNascimento}
            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#327933]"
            placeholder="DD/MM/YYYY"
            maxLength="10"
          />
        </div>

        {/* IDADE */}
        <div>
          <label className="text-xs font-bold text-gray-600 uppercase mb-2 block">Idade</label>
          <input 
            type="text" 
            value={formData.paciente.idade || ''} 
            onChange={(e) => handleChange('idade', e.target.value)}
            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#327933]"
            placeholder="Calculado automaticamente"
            disabled
          />
        </div>

        {/* SEXO */}
        <div>
          <label className="text-xs font-bold text-gray-600 uppercase mb-2 block">Sexo</label>
          <select 
            // O segredo está aqui: forçamos a leitura de 'F' como 'feminino' e 'M' como 'masculino'
            value={formData.paciente.sexo === 'F' ? 'feminino' : formData.paciente.sexo === 'M' ? 'masculino' : formData.paciente.sexo || ''} 
            onChange={(e) => handleChange('sexo', e.target.value)}
            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#327933] appearance-none"
          >
            <option value="">Selecione</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="outro">Outro</option>
          </select>
        </div>

        {/* ENDEREÇO */}
        <div className="md:col-span-2">
          <label className="text-xs font-bold text-gray-600 uppercase mb-2 block">Endereço Residencial</label>
          <input 
            type="text" 
            value={formData.paciente.endereco || ''} 
            onChange={(e) => handleChange('endereco', e.target.value)}
            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#327933]"
            placeholder="Rua, número, complemento, bairro, cidade - UF"
          />
        </div>

        {/* TELEFONE */}
        <div>
          <label className="text-xs font-bold text-gray-600 uppercase mb-2 block">Telefone / WhatsApp *</label>
          <input 
            type="text" 
            value={formData.paciente.telefone || ''} 
            onChange={(e) => handleChange('telefone', e.target.value)}
            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#327933]"
            placeholder="(00) 00000-0000"
          />
        </div>

        {/* PROFISSÃO */}
        <div>
          <label className="text-xs font-bold text-gray-600 uppercase mb-2 block">Profissão</label>
          <input 
            type="text" 
            value={formData.paciente.profissao || ''} 
            onChange={(e) => handleChange('profissao', e.target.value)}
            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#327933]"
            placeholder="Informe a profissão"
          />
        </div>

    {/* ESTADO CIVIL */}
      <div className="md:col-span-2">
        <label className="text-xs font-bold text-gray-600 uppercase mb-2 block">Estado Civil</label>
        <select 
          // Remova o .toLowerCase() e use o valor vindo do Firebase diretamente
          value={formData.paciente.estadoCivil || ''} 
          onChange={(e) => handleChange('estadoCivil', e.target.value)}
          className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#327933] appearance-none"
        >
          <option value="">Selecione</option>
          {/* Ajuste os valores para baterem com o que você salvou no Firebase (ex: "Casada") */}
          <option value="Solteiro">Solteiro(a)</option>
          <option value="Casado">Casado(a)</option>
          <option value="Casada">Casada</option>
          <option value="Divorciado">Divorciado(a)</option>
          <option value="Viúvo">Viúvo(a)</option>
        </select>
      </div>
      </div>
    </div>
  );
};

export default DadosPessoais;