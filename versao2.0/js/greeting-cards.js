/**
 * CONTAGEM DE NATAL 2.0 - GREETING CARDS MODULE
 * Gerador e renderizador de cartões de Natal em HTML5 Canvas nativo.
 * Autor: Vicente Neto
 */

export const CARD_TEMPLATES = [
  {
    id: 'classic-red',
    name: 'Vermelho Nobre',
    bgGradient: ['#8b0000', '#4a0000'],
    borderColor: '#d9b76e',
    textColor: '#ffffff',
    accentColor: '#f6e27a'
  },
  {
    id: 'forest-green',
    name: 'Floresta Encantada',
    bgGradient: ['#174d3b', '#071e17'],
    borderColor: '#d9b76e',
    textColor: '#ffffff',
    accentColor: '#e53935'
  },
  {
    id: 'midnight-gold',
    name: 'Noite Dourada',
    bgGradient: ['#16192b', '#0a0c16'],
    borderColor: '#d9b76e',
    textColor: '#ffffff',
    accentColor: '#d9b76e'
  }
];

/**
 * Renderiza o cartão de Natal no elemento <canvas>.
 * @param {HTMLCanvasElement} canvas
 * @param {object} options
 */
export function renderGreetingCard(canvas, options = {}) {
  const {
    toName = 'Querido(a) Amigo(a)',
    fromName = 'Com carinho',
    message = 'Que a paz, a alegria e a esperança do Natal iluminem todos os seus dias!',
    templateId = 'classic-red'
  } = options;

  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  const template = CARD_TEMPLATES.find(t => t.id === templateId) || CARD_TEMPLATES[0];

  // 1. Fundo Gradiente
  const grad = ctx.createRadialGradient(width / 2, height / 3, 50, width / 2, height / 2, width);
  grad.addColorStop(0, template.bgGradient[0]);
  grad.addColorStop(1, template.bgGradient[1]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // 2. Borda Decorativa Dupla Dourada
  ctx.strokeStyle = template.borderColor;
  ctx.lineWidth = 6;
  ctx.strokeRect(30, 30, width - 60, height - 60);

  ctx.lineWidth = 2;
  ctx.strokeRect(42, 42, width - 84, height - 84);

  // Cantoneiras nos 4 cantos
  drawCornerDecoration(ctx, 42, 42, template.borderColor);
  drawCornerDecoration(ctx, width - 42, 42, template.borderColor, true, false);
  drawCornerDecoration(ctx, 42, height - 42, template.borderColor, false, true);
  drawCornerDecoration(ctx, width - 42, height - 42, template.borderColor, true, true);

  // 3. Estrelas e Partículas Decorativas
  drawFestiveParticles(ctx, width, height, template.accentColor);

  // 4. Símbolo Vetorial Natalino no Topo (Estrela Dourada Elegante)
  drawOrnamentStar(ctx, width / 2, 120, 24, template.accentColor);

  // 5. Cabeçalho Festivo
  ctx.fillStyle = template.accentColor;
  ctx.font = 'bold 38px Georgia, serif';
  ctx.fillText('FELIZ NATAL', width / 2, 200);

  // Linha divisória sutil
  ctx.beginPath();
  ctx.moveTo(width / 2 - 140, 225);
  ctx.lineTo(width / 2 + 140, 225);
  ctx.strokeStyle = template.borderColor;
  ctx.lineWidth = 2;
  ctx.stroke();

  // 6. Destinatário ("Para: ...")
  ctx.fillStyle = template.textColor;
  ctx.font = 'italic 26px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`Para: ${toName}`, width / 2, 280);

  // 7. Mensagem Central (com quebra de linha automática)
  ctx.font = '22px Georgia, serif';
  ctx.fillStyle = '#f8f9fa';
  wrapText(ctx, `"${message}"`, width / 2, 360, width - 160, 34);

  // 8. Remetente no Rodapé
  ctx.font = 'italic 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = template.accentColor;
  ctx.fillText(`De: ${fromName}`, width / 2, height - 120);

  // Selo Contagem de Natal 2.0
  ctx.font = '13px sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.fillText('contagemdenatal.vicenteneto.com.br • Edição Especial 2.0', width / 2, height - 60);
}

/**
 * Desenha uma estrela natalina estilizada de 8 pontas.
 */
function drawOrnamentStar(ctx, cx, cy, radius, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  const spikes = 8;
  const innerRadius = radius / 2.6;
  let rot = (Math.PI / 2) * 3;
  const step = Math.PI / spikes;

  ctx.moveTo(cx, cy - radius);
  for (let i = 0; i < spikes; i++) {
    let x = cx + Math.cos(rot) * radius;
    let y = cy + Math.sin(rot) * radius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - radius);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/**
 * Desenha cantoneiras ornamentadas.
 */
function drawCornerDecoration(ctx, x, y, color, flipX = false, flipY = false) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 20);
  ctx.lineTo(0, 0);
  ctx.lineTo(20, 0);
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(8, 8, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/**
 * Desenha pequenos pontos e estrelas brilhantes no fundo.
 */
function drawFestiveParticles(ctx, width, height, color) {
  ctx.save();
  ctx.fillStyle = color;
  const positions = [
    [80, 90, 2], [140, 180, 1.5], [width - 90, 110, 2.5], [width - 150, 160, 1.5],
    [90, height - 180, 2], [160, height - 90, 1.5], [width - 100, height - 150, 2],
    [width / 4, height / 2, 1.5], [(width * 3) / 4, height / 2, 1.5]
  ];

  positions.forEach(([px, py, r]) => {
    ctx.globalAlpha = 0.45;
    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

/**
 * Quebra texto em múltiplas linhas para caber na largura especificada do Canvas.
 */
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let curY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, curY);
      line = words[n] + ' ';
      curY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, curY);
}

/**
 * Dispara o download da imagem do Canvas em PNG.
 * @param {HTMLCanvasElement} canvas
 * @param {string} [filename='cartao-natal-2.0.png']
 */
export function downloadCardImage(canvas, filename = 'cartao-natal-2.0.png') {
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 'image/png');
}

