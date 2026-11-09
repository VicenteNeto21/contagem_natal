import test from 'node:test';
import assert from 'node:assert/strict';
import { getNextChristmas, calculateTimeRemaining, calculateProgressPercentage, padZero } from '../js/countdown.js';

test('Countdown - Antes de Dezembro (ex: 8 de Novembro de 2026)', () => {
  const mockNow = new Date(2026, 10, 8, 12, 0, 0); // 8 Nov 2026
  const { targetDate, isChristmasDay, currentChristmasYear } = getNextChristmas(mockNow);

  assert.equal(isChristmasDay, false);
  assert.equal(currentChristmasYear, 2026);
  assert.equal(targetDate.getFullYear(), 2026);
  assert.equal(targetDate.getMonth(), 11);
  assert.equal(targetDate.getDate(), 25);

  const remaining = calculateTimeRemaining(mockNow, targetDate);
  assert.ok(remaining.days > 0);
  assert.ok(remaining.totalMs > 0);
});

test('Countdown - Durante Dezembro (ex: 15 de Dezembro de 2026)', () => {
  const mockNow = new Date(2026, 11, 15, 10, 0, 0); // 15 Dez 2026
  const { targetDate, isChristmasDay, currentChristmasYear } = getNextChristmas(mockNow);

  assert.equal(isChristmasDay, false);
  assert.equal(currentChristmasYear, 2026);
  const remaining = calculateTimeRemaining(mockNow, targetDate);
  assert.equal(remaining.days, 9); // 15 a 24 = 9 dias e 14 horas
});

test('Countdown - Véspera de Natal (24 de Dezembro às 23:00:00)', () => {
  const mockNow = new Date(2026, 11, 24, 23, 0, 0);
  const { targetDate, isChristmasDay } = getNextChristmas(mockNow);

  assert.equal(isChristmasDay, false);
  const remaining = calculateTimeRemaining(mockNow, targetDate);
  assert.equal(remaining.days, 0);
  assert.equal(remaining.hours, 1);
});

test('Countdown - Dia de Natal (25 de Dezembro)', () => {
  const mockNow = new Date(2026, 11, 25, 14, 30, 0);
  const { isChristmasDay, currentChristmasYear } = getNextChristmas(mockNow);

  assert.equal(isChristmasDay, true);
  assert.equal(currentChristmasYear, 2026);
});

test('Countdown - Após o Natal (26 de Dezembro de 2026)', () => {
  const mockNow = new Date(2026, 11, 26, 10, 0, 0);
  const { targetDate, isChristmasDay, currentChristmasYear } = getNextChristmas(mockNow);

  assert.equal(isChristmasDay, false);
  assert.equal(currentChristmasYear, 2027); // Deve calcular para 2027
  assert.equal(targetDate.getFullYear(), 2027);

  const remaining = calculateTimeRemaining(mockNow, targetDate);
  assert.ok(remaining.days >= 363);
});

test('Countdown - Virada de Ano (1 de Janeiro de 2027)', () => {
  const mockNow = new Date(2027, 0, 1, 0, 1, 0);
  const { targetDate, currentChristmasYear } = getNextChristmas(mockNow);

  assert.equal(currentChristmasYear, 2027);
  assert.equal(targetDate.getFullYear(), 2027);

  const remaining = calculateTimeRemaining(mockNow, targetDate);
  assert.ok(remaining.days > 350);
});

test('Countdown - Ano Bissexto (2028 tem 366 dias)', () => {
  const leapNow = new Date(2028, 1, 28, 0, 0, 0); // 28 Fev 2028
  const { targetDate } = getNextChristmas(leapNow);

  assert.equal(targetDate.getFullYear(), 2028);
  const remaining = calculateTimeRemaining(leapNow, targetDate);
  assert.ok(remaining.totalMs > 0);
  assert.ok(!isNaN(remaining.days));
});

test('Countdown - Nunca retorna valores negativos', () => {
  const pastTarget = new Date(2020, 11, 25);
  const futureDate = new Date(2026, 11, 25);
  const remaining = calculateTimeRemaining(futureDate, pastTarget);

  assert.equal(remaining.days, 0);
  assert.equal(remaining.hours, 0);
  assert.equal(remaining.minutes, 0);
  assert.equal(remaining.seconds, 0);
  assert.equal(remaining.totalMs, 0);
});

test('Countdown - padZero formata corretamente', () => {
  assert.equal(padZero(5), '05');
  assert.equal(padZero(0), '00');
  assert.equal(padZero(12), '12');
});

