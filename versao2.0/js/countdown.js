/**
 * CONTAGEM DE NATAL 2.0 - COUNTDOWN MODULE
 * Cálculo perpétuo e resiliente da contagem para o Natal.
 * Autor: Vicente Neto
 */

/**
 * Retorna o próximo Natal (25 de Dezembro às 00:00:00 no fuso local).
 * @param {Date} [currentDate=new Date()]
 * @returns {{ targetDate: Date, isChristmasDay: boolean, currentChristmasYear: number }}
 */
export function getNextChristmas(currentDate = new Date()) {
  const currentYear = currentDate.getFullYear();
  // 25 de Dezembro do ano atual (Mês 11 em JavaScript = Dezembro)
  const thisYearChristmasStart = new Date(currentYear, 11, 25, 0, 0, 0, 0);
  const thisYearChristmasEnd = new Date(currentYear, 11, 25, 23, 59, 59, 999);

  const currentTime = currentDate.getTime();

  // Verifica se hoje é exatamente o dia de Natal
  if (currentTime >= thisYearChristmasStart.getTime() && currentTime <= thisYearChristmasEnd.getTime()) {
    return {
      targetDate: thisYearChristmasStart,
      isChristmasDay: true,
      currentChristmasYear: currentYear
    };
  }

  // Se já passou do dia 25 de Dezembro deste ano, o próximo é no ano que vem
  if (currentTime > thisYearChristmasEnd.getTime()) {
    return {
      targetDate: new Date(currentYear + 1, 11, 25, 0, 0, 0, 0),
      isChristmasDay: false,
      currentChristmasYear: currentYear + 1
    };
  }

  // Caso padrão: Natal ainda vai acontecer neste ano
  return {
    targetDate: thisYearChristmasStart,
    isChristmasDay: false,
    currentChristmasYear: currentYear
  };
}

/**
 * Calcula os componentes de tempo restantes (dias, horas, minutos, segundos).
 * @param {Date} [currentDate=new Date()]
 * @param {Date} targetDate
 * @returns {{ days: number, hours: number, minutes: number, seconds: number, totalMs: number }}
 */
export function calculateTimeRemaining(currentDate = new Date(), targetDate) {
  const diff = targetDate.getTime() - currentDate.getTime();
  const totalMs = Math.max(0, diff);

  const seconds = Math.floor((totalMs / 1000) % 60);
  const minutes = Math.floor((totalMs / (1000 * 60)) % 60);
  const hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24);
  const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds, totalMs };
}

/**
 * Calcula a porcentagem do ano decorrida até o Natal (útil para barra de progresso).
 * @param {Date} [currentDate=new Date()]
 * @param {Date} targetDate
 * @returns {number} Valor entre 0 e 100
 */
export function calculateProgressPercentage(currentDate = new Date(), targetDate) {
  // Começo do ciclo: 26 de dezembro do ano anterior
  const previousChristmas = new Date(targetDate.getFullYear() - 1, 11, 26, 0, 0, 0, 0);
  const totalCycleMs = targetDate.getTime() - previousChristmas.getTime();
  const elapsedMs = currentDate.getTime() - previousChristmas.getTime();

  if (elapsedMs <= 0) return 0;
  if (elapsedMs >= totalCycleMs) return 100;

  const percentage = (elapsedMs / totalCycleMs) * 100;
  return Math.min(100, Math.max(0, Number(percentage.toFixed(1))));
}

/**
 * Formata números com dois dígitos (ex: 7 -> "07").
 * @param {number} num
 * @returns {string}
 */
export function padZero(num) {
  return String(num).padStart(2, '0');
}

