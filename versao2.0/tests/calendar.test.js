import test from 'node:test';
import assert from 'node:assert/strict';
import { ADVENT_DAYS, checkDayStatus } from '../js/advent-calendar.js';

test('Advent Calendar - Contém exatamente 24 dias de surpresas', () => {
  assert.equal(ADVENT_DAYS.length, 24);
  ADVENT_DAYS.forEach((item, index) => {
    assert.equal(item.day, index + 1);
    assert.ok(item.title && item.title.length > 0);
    assert.ok(item.surprise && item.surprise.length > 0);
    assert.ok(item.icon && item.icon.length > 0);
  });
});

test('Advent Calendar - Antes de Dezembro (ex: 8 de Novembro)', () => {
  const novemberDate = new Date(2026, 10, 8); // Mês 10 = Novembro
  for (let day = 1; day <= 24; day++) {
    const status = checkDayStatus(day, novemberDate);
    assert.equal(status.isUnlocked, false, `Dia ${day} deveria estar bloqueado em novembro`);
    assert.equal(status.isToday, false);
  }
});

test('Advent Calendar - Durante o Advento (ex: 12 de Dezembro)', () => {
  const midDecember = new Date(2026, 11, 12); // 12 de Dezembro

  // Dias 1 a 11 devem estar desbloqueados
  for (let day = 1; day <= 11; day++) {
    const status = checkDayStatus(day, midDecember);
    assert.equal(status.isUnlocked, true, `Dia ${day} deveria estar desbloqueado`);
    assert.equal(status.isToday, false);
  }

  // Dia 12 deve estar desbloqueado E ser marcado como hoje
  const todayStatus = checkDayStatus(12, midDecember);
  assert.equal(todayStatus.isUnlocked, true);
  assert.equal(todayStatus.isToday, true);

  // Dias 13 a 24 devem estar bloqueados
  for (let day = 13; day <= 24; day++) {
    const status = checkDayStatus(day, midDecember);
    assert.equal(status.isUnlocked, false, `Dia ${day} deveria estar bloqueado`);
  }
});

test('Advent Calendar - No Natal ou pós-Natal (25 de Dezembro em diante)', () => {
  const christmasDay = new Date(2026, 11, 25);
  for (let day = 1; day <= 24; day++) {
    const status = checkDayStatus(day, christmasDay);
    assert.equal(status.isUnlocked, true, `Dia ${day} deveria estar liberado no Natal`);
  }
});

