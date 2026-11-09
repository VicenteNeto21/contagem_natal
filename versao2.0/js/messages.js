/**
 * CONTAGEM DE NATAL 2.0 - MESSAGES MODULE
 * Acervo e gerador de mensagens natalinas inspiradoras por categoria.
 * Autor: Vicente Neto
 */

export const CHRISTMAS_MESSAGES = [
  // Amor e família
  {
    category: 'familia',
    categoryName: 'Amor & Família',
    text: 'O verdadeiro presente de Natal é o calor dos abraços daqueles que amamos reunidos à mesa.'
  },
  {
    category: 'familia',
    categoryName: 'Amor & Família',
    text: 'Que o amor seja o principal enfeite da sua casa e da sua família neste Natal e em todos os dias que virão.'
  },
  {
    category: 'familia',
    categoryName: 'Amor & Família',
    text: 'Família é onde a magia do Natal começa e onde o amor nunca termina.'
  },

  // Amizade
  {
    category: 'amizade',
    categoryName: 'Amizade',
    text: 'A amizade verdadeira é como a luz do Natal: ilumina os caminhos e aquece a caminhada.'
  },
  {
    category: 'amizade',
    categoryName: 'Amizade',
    text: 'Neste Natal, celebro a bênção de ter amigos que tornam qualquer dia comum em um dia especial.'
  },

  // Esperança
  {
    category: 'esperanca',
    categoryName: 'Esperança',
    text: 'Que a noite de Natal renove a esperança em dias melhores, semeando paz e renovação em cada coração.'
  },
  {
    category: 'esperanca',
    categoryName: 'Esperança',
    text: 'O Natal nos lembra que mesmo na noite mais escura, uma estrela pode guiar um novo começo.'
  },

  // Reflexão
  {
    category: 'reflexao',
    categoryName: 'Reflexão',
    text: 'Mais do que trocar presentes, o Natal nos convida a ser presença e a praticar a empatia.'
  },
  {
    category: 'reflexao',
    categoryName: 'Reflexão',
    text: 'Que o espírito natalino nos ensine a desapegar do supérfluo e valorizar cada momento vivido.'
  },

  // Gratidão
  {
    category: 'gratidao',
    categoryName: 'Gratidão',
    text: 'Gratidão pelas lições do ano que se despede e pelos sorrisos que iluminaram nosso caminho.'
  },
  {
    category: 'gratidao',
    categoryName: 'Gratidão',
    text: 'Agradecer é abrir espaço no coração para que a alegria do Natal possa habitar.'
  },

  // Mensagens Cristãs
  {
    category: 'cristas',
    categoryName: 'Cristãs',
    text: 'Que o nascimento de Jesus traga luz divina, serenidade e infinitas bênçãos para o seu lar.'
  },
  {
    category: 'cristas',
    categoryName: 'Cristãs',
    text: 'Celebrar o Natal é recordar o maior gesto de amor já concedido à humanidade.'
  },

  // Mensagens de Celebração
  {
    category: 'celebracao',
    categoryName: 'Celebração',
    text: 'Que a sua ceia seja farta de sorrisos, brindes sinceros e celebrações inesquecíveis!'
  },
  {
    category: 'celebracao',
    categoryName: 'Celebração',
    text: 'Feliz Natal! Que as luzes e canções natalinas encham seus dias de magia e contentamento!'
  }
];

/**
 * Retorna uma mensagem aleatória, opcionalmente filtrada por categoria.
 * @param {string} [category='all']
 * @returns {{ category: string, categoryName: string, text: string }}
 */
export function getRandomMessage(category = 'all') {
  const pool = category === 'all'
    ? CHRISTMAS_MESSAGES
    : CHRISTMAS_MESSAGES.filter(m => m.category === category);

  if (pool.length === 0) return CHRISTMAS_MESSAGES[0];
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

