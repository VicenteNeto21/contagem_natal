/**
 * CONTAGEM DE NATAL 2.0 - PREFERENCES MODULE
 * Persistência e gerenciamento de preferências do visitante no LocalStorage.
 * Autor: Vicente Neto
 */

const STORAGE_KEY = 'contagem_natal_preferences';

const DEFAULT_PREFERENCES = {
  snowEnabled: true,
  musicMuted: false,
  savedVolume: 0.8
};

/**
 * Carrega as preferências salvas no LocalStorage.
 * @returns {typeof DEFAULT_PREFERENCES}
 */
export function loadPreferences() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PREFERENCES };
    return { ...DEFAULT_PREFERENCES, ...JSON.parse(raw) };
  } catch (e) {
    return { ...DEFAULT_PREFERENCES };
  }
}

/**
 * Salva ou atualiza preferências no LocalStorage.
 * @param {Partial<typeof DEFAULT_PREFERENCES>} newPrefs
 */
export function savePreferences(newPrefs) {
  try {
    const current = loadPreferences();
    const updated = { ...current, ...newPrefs };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.warn('Erro ao salvar preferências:', e);
    return DEFAULT_PREFERENCES;
  }
}

