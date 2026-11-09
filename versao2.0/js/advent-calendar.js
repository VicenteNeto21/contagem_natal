/**
 * CONTAGEM DE NATAL 2.0 - ADVENT CALENDAR MODULE
 * Calendário do Advento interativo de 1 a 24 de dezembro com travas de data.
 * Autor: Vicente Neto
 */

export const ADVENT_DAYS = [
  { day: 1, icon: 'star', title: 'A Luz da Esperança', surprise: 'Comece dezembro acendendo uma luz ou vela e fazendo um pedido silencioso de paz para o mundo.' },
  { day: 2, icon: 'music', title: 'Canções de Natal', surprise: 'Coloque uma playlist natalina para tocar e sinta a atmosfera das festas entrar na sua casa.' },
  { day: 3, icon: 'gift', title: 'Receita com Afeto', surprise: 'Que tal preparar biscoitos de canela ou seu doce preferido para compartilhar?' },
  { day: 4, icon: 'heart', title: 'Palavra de Carinho', surprise: 'Envie uma mensagem carinhosa para alguém que você não vê há muito tempo.' },
  { day: 5, icon: 'tree', title: 'Enfeite de Amor', surprise: 'Coloque um enfeite especial na árvore ou na janela representando sua maior conquista do ano.' },
  { day: 6, icon: 'sparkle', title: 'Momento de Aconchego', surprise: 'Tome um chocolate quente ou chá enquanto assiste a um filme natalino clássico.' },
  { day: 7, icon: 'gift', title: 'Gesto Solidário', surprise: 'Separe roupas ou brinquedos para doar a quem precisa. Fazer o bem transforma o Natal.' },
  { day: 8, icon: 'star', title: 'Curiosidade Natalina', surprise: 'Você sabia que a tradição do pinheiro de Natal começou na Europa no século XVI?' },
  { day: 9, icon: 'heart', title: 'Paz no Coração', surprise: 'Perdoe quem te magoou e deixe o peso das desavenças para trás neste final de ano.' },
  { day: 10, icon: 'music', title: 'Canção dos Sinos', surprise: 'Os sinos de Natal simbolizam a celebração da vida e as boas notícias que estão por vir.' },
  { day: 11, icon: 'sparkle', title: 'Lembranças Felizes', surprise: 'Abra um álbum antigo de fotos de Natais passados e compartilhe uma risada em família.' },
  { day: 12, icon: 'star', title: 'Uma História de Natal', surprise: 'Leia um conto de Natal ou a narrativa do nascimento de Jesus antes de dormir.' },
  { day: 13, icon: 'sparkle', title: 'Santa Luzia', surprise: 'Dia de celebrar a luz que vence as trevas e nos orienta com sabedoria e clareza.' },
  { day: 14, icon: 'heart', title: 'Elogio Sincero', surprise: 'Elogie o trabalho ou dedicação de um colega ou familiar. Palavras gentis têm poder.' },
  { day: 15, icon: 'gift', title: 'Aroma Festivo', surprise: 'O aroma de canela, maçã e noz-moscada traz a nostalgia e o conforto dos melhores Natais.' },
  { day: 16, icon: 'tree', title: 'Cartão Feito com Afeto', surprise: 'Crie um cartão virtual ou físico para desejar coisas boas a quem você ama.' },
  { day: 17, icon: 'star', title: 'A Guirlanda', surprise: 'O formato circular da guirlanda na porta representa a eternidade e as boas-vindas calorosas.' },
  { day: 18, icon: 'sparkle', title: 'Noite Estrelada', surprise: 'Olhe para o céu à noite e agradeça pelas bênçãos invisíveis que você recebeu este ano.' },
  { day: 19, icon: 'heart', title: 'Alegria e Simplicidade', surprise: 'Relembre qual era seu brinquedo ou tradição favorita na sua infância.' },
  { day: 20, icon: 'star', title: 'Gratidão Profunda', surprise: 'Escreva três coisas pelas quais você é imensamente grato em sua vida hoje.' },
  { day: 21, icon: 'sparkle', title: 'Solstício & Renovação', surprise: 'Um ciclo se fecha para que um novo capítulo cheio de oportunidades floresça.' },
  { day: 22, icon: 'heart', title: 'Mesa da União', surprise: 'Planeje os preparativos da ceia com leveza, lembrando que a melhor receita é a união.' },
  { day: 23, icon: 'star', title: 'A Véspera da Véspera', surprise: 'O coração já bate mais forte. Respire fundo e absorva a harmonia no ar.' },
  { day: 24, icon: 'gift', title: 'A Grande Noite de Paz', surprise: 'A véspera de Natal chegou! Que a paz reine em seu lar e o amor transborde em cada abraço.' }
];

const STORAGE_KEY = 'contagem_natal_advent_opened';

/**
 * Retorna lista de IDs de dias já abertos pelo usuário.
 * @returns {number[]}
 */
export function getOpenedDays() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Salva um dia como aberto no LocalStorage.
 * @param {number} day
 */
export function markDayAsOpened(day) {
  try {
    const opened = getOpenedDays();
    if (!opened.includes(day)) {
      opened.push(day);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(opened));
    }
  } catch (e) {
    console.warn('Erro ao salvar no LocalStorage', e);
  }
}

/**
 * Verifica se um dia específico do Advento está desbloqueado para visualização.
 * @param {number} day Dia de 1 a 24
 * @param {Date} [currentDate=new Date()]
 * @returns {{ isUnlocked: boolean, isToday: boolean, reason: string }}
 */
export function checkDayStatus(day, currentDate = new Date()) {
  const currentMonth = currentDate.getMonth(); // 11 = Dezembro
  const currentDay = currentDate.getDate();

  // Se o mês for depois de dezembro (ex: virou o ano) ou dia de Natal/pós-Natal
  if (currentMonth === 11 && currentDay >= 25) {
    return { isUnlocked: true, isToday: false, reason: 'Natal já começou! Todos os dias liberados.' };
  }

  // Se for antes de dezembro
  if (currentMonth < 11) {
    return {
      isUnlocked: false,
      isToday: false,
      reason: `Este cartão só poderá ser aberto no dia ${day} de dezembro!`
    };
  }

  // Se estamos em dezembro
  if (currentMonth === 11) {
    if (currentDay > day) {
      return { isUnlocked: true, isToday: false, reason: 'Disponível' };
    }
    if (currentDay === day) {
      return { isUnlocked: true, isToday: true, reason: 'Hoje!' };
    }
    return {
      isUnlocked: false,
      isToday: false,
      reason: `Aguarde o dia ${day} de dezembro para desbloquear!`
    };
  }

  return { isUnlocked: false, isToday: false, reason: 'Bloqueado' };
}

