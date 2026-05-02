import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Função assíncrona para converter URL de imagem para Base64 (Data URL)
 * Essencial para permitir que imagens externas (como Unsplash) sejam renderizadas no PDF[cite: 3].
 */
const convertImageToBase64 = async (imageUrlOrDataUrl) => {
  if (!imageUrlOrDataUrl) {
    return null;
  }

  if (typeof imageUrlOrDataUrl === 'string' && imageUrlOrDataUrl.startsWith('data:image/')) {
    const mimeMatch = imageUrlOrDataUrl.match(/^data:(image\/[^;]+);/);
    const imageType = mimeMatch ? mimeMatch[1].split('/')[1].toUpperCase() : 'JPEG';
    return { dataUrl: imageUrlOrDataUrl, imageType };
  }

  const convertBlobToDataUrl = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        if (typeof dataUrl !== 'string') {
          reject(new Error('Resultado inválido ao converter imagem para Data URL'));
          return;
        }
        const mimeMatch = dataUrl.match(/^data:(image\/[^;]+);/);
        const imageType = mimeMatch ? mimeMatch[1].split('/')[1].toUpperCase() : 'JPEG';
        resolve({ dataUrl, imageType });
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  const convertImageElementToDataUrl = (url) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL('image/jpeg');
          resolve({ dataUrl, imageType: 'JPEG' });
        } catch (err) {
          reject(err);
        }
      };
      img.onerror = (err) => reject(new Error(`Erro ao carregar imagem via elemento HTML: ${err?.message || err}`));
      img.src = url;
    });

  try {
    const response = await fetch(imageUrlOrDataUrl, { mode: 'cors' });
    if (!response.ok) {
      throw new Error(`Erro ao buscar imagem: ${response.statusText}`);
    }
    const blob = await response.blob();
    return await convertBlobToDataUrl(blob);
  } catch (error) {
    console.warn('Falha no fetch, tentando carregar via elemento HTML:', error);
    try {
      return await convertImageElementToDataUrl(imageUrlOrDataUrl);
    } catch (errorHtml) {
      console.error('Erro ao converter imagem para Base64:', errorHtml);
      return null;
    }
  }
};

/**
 * Função principal para gerar o relatório em PDF[cite: 2].
 * Alterada para 'async' para suportar o carregamento da imagem antes de salvar o arquivo[cite: 3].
 */
const gerarRelatorioPDF = async ({ formData, listaPrescritos, listaAdministrados, fotoUrlOuBase64 = '' }) => {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  const lineHeight = 18;

  // Função auxiliar para desenhar blocos de texto com quebra de linha
  const drawTextBlock = (text, x, y, maxWidth) => {
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + lines.length * lineHeight;
  };

  // Função auxiliar para desenhar o quadrado cinza caso a foto falhe[cite: 3]
  const desenharPlaceholderFoto = (doc, x, y, size) => {
    doc.setDrawColor('#cccccc');
    doc.rect(x, y, size, size);
    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');
    doc.setTextColor('#999999');
    doc.text('Foto do Paciente', x + size / 2, y + size / 2, {
      align: 'center',
      baseline: 'middle',
    });
  };

  const paciente = formData.paciente || {};
  const clinica = formData.clinica || {};
  const consulta = formData.consulta || {};
  
  // AJUSTE: usa a imagem passada explicitamente ou a foto do paciente armazenada
  const URL_FOTO = fotoUrlOuBase64 || paciente.foto || paciente.fotoPaciente || ''; 
  
  const { queixa, intensidadeSintomas, duracaoSintomas, tratamentos, conduta } = consulta;

  // CABEÇALHO DO RELATÓRIO
  doc.setFontSize(14);
  doc.setTextColor('#327933');
  doc.setFont(undefined, 'bold');
  doc.text('RELATÓRIO DE ANAMNESE - MONITORAMENTO LVAD', pageWidth / 2, 50, {
    align: 'center',
  });

  doc.setDrawColor('#327933');
  doc.setLineWidth(1.5);
  doc.line(margin, 60, pageWidth - margin, 60);

  const headerY = 80;
  const photoSize = 90;
  const photoX = pageWidth - margin - photoSize;

  // RENDERIZAÇÃO DA FOTO COM TRATAMENTO ASSÍNCRONO[cite: 3]
  let imageDataUrl = null;
  if (URL_FOTO && URL_FOTO.startsWith('http')) {
    imageDataUrl = await convertImageToBase64(URL_FOTO);
  }

  if (imageDataUrl) {
    try {
      const imageFormat = imageDataUrl.imageType || 'JPEG';
      doc.addImage(imageDataUrl.dataUrl, imageFormat, photoX, headerY, photoSize, photoSize);
    } catch (error) {
      console.error("Erro ao incluir foto no PDF:", error);
      desenharPlaceholderFoto(doc, photoX, headerY, photoSize);
    }
  } else {
    desenharPlaceholderFoto(doc, photoX, headerY, photoSize);
  }

  // DADOS DE IDENTIFICAÇÃO
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor('#000');

  let currentY = headerY;
  currentY = drawTextBlock(`Nome do Paciente: ${paciente.nome || '-'}`, margin, currentY, contentWidth - photoSize);
  currentY = drawTextBlock(`Número do Prontuário: ${clinica.prontuario || '-'}`, margin, currentY, contentWidth - photoSize);
  currentY = drawTextBlock(`Data do Implante: ${clinica.dataImplante || '-'}`, margin, currentY, contentWidth - photoSize);
  currentY = drawTextBlock(`Motivo do Implante: ${clinica.motivoImplante || '-'}`, margin, currentY, contentWidth - photoSize);
  currentY = drawTextBlock(`Tipo Sanguíneo: ${clinica.tipoSanguineo || '-'}`, margin, currentY, contentWidth - photoSize);

  currentY = Math.max(currentY, headerY + photoSize) + 30;

  // SEÇÃO: INFORMAÇÕES CLÍNICAS
  doc.setFont(undefined, 'bold');
  doc.setFontSize(12);
  doc.setTextColor('#327933');
  doc.text('Informações Clínicas', margin, currentY);
  currentY += 20;

  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  doc.setTextColor('#000');

  const observacoesText = Array.isArray(clinica.observacoes)
    ? clinica.observacoes.join(', ')
    : clinica.observacoes || '-';

  currentY = drawTextBlock(`Observações Clínicas: ${observacoesText}`, margin, currentY, contentWidth);
  currentY = drawTextBlock(`Considerações do Paciente: ${clinica.consideracoes || '-'}`, margin, currentY, contentWidth);
  currentY = drawTextBlock(`Alergias: ${clinica.alergias || '-'}`, margin, currentY, contentWidth);
  currentY = drawTextBlock(`Histórico Clínico: ${clinica.historicoClinco || '-'}`, margin, currentY, contentWidth);

  currentY += 20;

  // TABELA: MEDICAMENTOS PRESCRITOS
  doc.setFont(undefined, 'bold');
  doc.setFontSize(12);
  doc.setTextColor('#327933');
  doc.text('Medicamentos Prescritos', margin, currentY);
  currentY += 10;

  const prescritos = Array.isArray(listaPrescritos)
    ? listaPrescritos.map((item, index) => [
        index + 1,
        item.dataPrescricao || '-',
        item.medicacao || '-',
        item.dosagem || '-',
      ])
    : [];

  autoTable(doc, {
    startY: currentY,
    head: [['#', 'Data da Prescrição', 'Medicação', 'Dosagem / Frequência']],
    body: prescritos.length ? prescritos : [[1, '-', 'Nenhum medicamento prescrito', '-']],
    theme: 'striped',
    headStyles: { fillColor: '#327933', textColor: '#ffffff' },
    styles: { fontSize: 9, cellPadding: 4 },
    margin: { left: margin, right: margin },
  });

  // TABELA: MEDICAMENTOS ADMINISTRADOS
  currentY = doc.lastAutoTable.finalY + 20;
  doc.setFont(undefined, 'bold');
  doc.text('Medicamentos Administrados (Urgência/Emergência)', margin, currentY);
  currentY += 10;

  const administrados = Array.isArray(listaAdministrados)
    ? listaAdministrados.map((item, index) => [
        index + 1,
        item.data || '-',
        item.horario || '-',
        item.medicacao || '-',
      ])
    : [];

  autoTable(doc, {
    startY: currentY,
    head: [['#', 'Data', 'Horário', 'Medicamento Administrado']],
    body: administrados.length ? administrados : [[1, '-', '-', 'Nenhum medicamento administrado']],
    theme: 'striped',
    headStyles: { fillColor: '#327933', textColor: '#ffffff' },
    styles: { fontSize: 9, cellPadding: 4 },
    margin: { left: margin, right: margin },
  });

  // CONCLUSÃO E CONDUTA
  currentY = doc.lastAutoTable.finalY + 30;
  doc.setFont(undefined, 'bold');
  doc.setFontSize(12);
  doc.setTextColor('#327933');
  doc.text('Conclusão e Conduta Médica', margin, currentY);
  currentY += 20;

  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  doc.setTextColor('#000');
  currentY = drawTextBlock(`Queixa Principal: ${queixa || '-'}`, margin, currentY, contentWidth);
  currentY = drawTextBlock(`Intensidade/Duração: ${intensidadeSintomas || '-'} / ${duracaoSintomas || '-'}`, margin, currentY, contentWidth);
  currentY = drawTextBlock(`Tratamentos e Observações: ${tratamentos || '-'}`, margin, currentY, contentWidth);
  currentY = drawTextBlock(`Conduta Médica Sugerida: ${conduta || '-'}`, margin, currentY, contentWidth);

  // RODAPÉ COM ASSINATURA E TIMESTAMP[cite: 3]
  currentY += 40;
  doc.setDrawColor('#cccccc');
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 15;
  const timestamp = new Date().toLocaleString('pt-BR');
  doc.setFontSize(9);
  doc.text('Assinatura do Médico Responsável:', margin, currentY);
  doc.text(`Documento gerado em: ${timestamp}`, pageWidth - margin, currentY, { align: 'right' });

  // SALVAMENTO DO ARQUIVO COM NOME SANITIZADO[cite: 2]
  const nomeArquivo = paciente.nome ? paciente.nome.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '') : 'Relatorio';
  doc.save(`Relatorio_${nomeArquivo}.pdf`);
};

export default gerarRelatorioPDF;