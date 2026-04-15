import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const gerarRelatorioPDF = ({ formData, listaPrescritos, listaAdministrados }) => {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  const lineHeight = 18;

  const drawTextBlock = (text, x, y, maxWidth) => {
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + lines.length * lineHeight;
  };

  const paciente = formData.paciente || {};
  const clinica = formData.clinica || {};
  const consulta = formData.consulta || {};
  const fotoPaciente = paciente.fotoPaciente || '';
  const { queixa, intensidadeSintomas, duracaoSintomas, tratamentos, conduta } = consulta;

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

  if (fotoPaciente) {
    try {
      doc.addImage(fotoPaciente, 'JPEG', photoX, headerY, photoSize, photoSize);
    } catch (error) {
      doc.setDrawColor('#cccccc');
      doc.rect(photoX, headerY, photoSize, photoSize);
      doc.setFontSize(8);
      doc.setFont(undefined, 'normal');
      doc.text('Foto do Paciente', photoX + photoSize / 2, headerY + photoSize / 2, {
        align: 'center',
        baseline: 'middle',
      });
    }
  } else {
    doc.setDrawColor('#cccccc');
    doc.rect(photoX, headerY, photoSize, photoSize);
    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');
    doc.text('Foto do Paciente', photoX + photoSize / 2, headerY + photoSize / 2, {
      align: 'center',
      baseline: 'middle',
    });
  }

  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor('#000');

  let currentY = headerY;
  currentY = drawTextBlock(`Nome do Paciente: ${paciente.nome || '-'}`, margin, currentY, contentWidth);
  currentY = drawTextBlock(`Número do Prontuário: ${clinica.prontuario || '-'}`, margin, currentY, contentWidth);
  currentY = drawTextBlock(`Data do Implante: ${clinica.dataImplante || '-'}`, margin, currentY, contentWidth);
  currentY = drawTextBlock(`Motivo do Implante: ${clinica.motivoImplante || '-'}`, margin, currentY, contentWidth);
  currentY = drawTextBlock(`Tipo Sanguíneo: ${clinica.tipoSanguineo || '-'}`, margin, currentY, contentWidth);

  currentY = Math.max(currentY, headerY + photoSize) + 36;

  doc.setFont(undefined, 'bold');
  doc.setFontSize(12);
  doc.setTextColor('#327933');
  doc.text('Informações Clínicas', margin, currentY);
  currentY += 24;

  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  doc.setTextColor('#000');

  const observacoesText = Array.isArray(clinica.observacoes)
    ? clinica.observacoes.join(', ')
    : clinica.observacoes || '-';
  currentY = drawTextBlock(`Observações Clínicas: ${observacoesText}`, margin, currentY, contentWidth);
  currentY += 6;
  currentY = drawTextBlock(`Considerações do Paciente: ${clinica.consideracoes || '-'}`, margin, currentY, contentWidth);
  currentY += 6;
  currentY = drawTextBlock(`Alergias: ${clinica.alergias || '-'}`, margin, currentY, contentWidth);
  currentY += 6;
  currentY = drawTextBlock(`Histórico Clínico: ${clinica.historicoClinco || '-'}`, margin, currentY, contentWidth);
  currentY += 28;

  doc.setFont(undefined, 'bold');
  doc.setFontSize(12);
  doc.setTextColor('#327933');
  doc.text('Medicamentos Prescritos', margin, currentY);
  currentY += 18;

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
    head: [[
      '#',
      'Data da Prescrição',
      'Medicação',
      'Dosagem / Frequência',
    ]],
    body: prescritos.length
      ? prescritos
      : [[1, '-', 'Nenhum medicamento prescrito', '-']],
    theme: 'striped',
    headStyles: { fillColor: '#327933', textColor: '#ffffff' },
    styles: { fontSize: 9, cellPadding: 4 },
    margin: { left: margin, right: margin },
  });

  currentY = doc.lastAutoTable.finalY + 20;
  doc.setFont(undefined, 'bold');
  doc.setFontSize(12);
  doc.setTextColor('#327933');
  doc.text('Medicamentos Administrados em Urgência e Emergências', margin, currentY);
  currentY += 18;

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
    head: [[
      '#',
      'Data',
      'Horário',
      'Medicamento Administrado',
    ]],
    body: administrados.length
      ? administrados
      : [[1, '-', '-', 'Nenhum medicamento administrado']],
    theme: 'striped',
    headStyles: { fillColor: '#327933', textColor: '#ffffff' },
    styles: { fontSize: 9, cellPadding: 4 },
    margin: { left: margin, right: margin },
  });

  currentY = doc.lastAutoTable.finalY + 30;
  doc.setFont(undefined, 'bold');
  doc.setFontSize(12);
  doc.setTextColor('#327933');
  doc.text('Conclusão', margin, currentY);
  currentY += 18;

  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  doc.setTextColor('#000');
  currentY = drawTextBlock(`Queixa Principal: ${queixa || '-'}`, margin, currentY, contentWidth);
  currentY = drawTextBlock(`Intensidade dos Sintomas: ${intensidadeSintomas || '-'}`, margin, currentY, contentWidth);
  currentY = drawTextBlock(`Duração dos Sintomas: ${duracaoSintomas || '-'}`, margin, currentY, contentWidth);
  currentY = drawTextBlock(`Tratamentos Anteriores: ${tratamentos || '-'}`, margin, currentY, contentWidth);
  currentY = drawTextBlock(`Conduta Médica e Observações: ${conduta || '-'}`, margin, currentY, contentWidth);

  currentY += 30;
  doc.setDrawColor('#cccccc');
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 14;
  const timestamp = new Date().toLocaleString();
  doc.text('Assinatura do Médico:', margin, currentY);
  doc.text(`Data/Hora: ${timestamp}`, pageWidth - margin, currentY, {
    align: 'right',
  });

  const sanitizedFileName = paciente.nome
    ? paciente.nome.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '')
    : 'paciente';
  doc.save(`Relatorio-Anamnese-${sanitizedFileName}.pdf`);
};

export default gerarRelatorioPDF;
