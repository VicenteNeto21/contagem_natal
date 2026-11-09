/**
 * CONTAGEM DE NATAL 2.0 - SHARING & FEEDBACK MODULE
 * Web Share API nativa com fallback para cópia e notificações Toast.
 * Autor: Vicente Neto
 */

/**
 * Exibe notificação temporária acessível (Toast).
 * @param {string} message
 * @param {number} [duration=3000]
 */
export function showToast(message, duration = 3000) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => {
      toast.remove();
    }, { once: true });
  }, duration);
}

/**
 * Compartilha conteúdo via Web Share API ou cópia para área de transferência.
 * @param {object} shareData { title, text, url }
 */
export async function shareContent(shareData) {
  const data = {
    title: shareData.title || 'Contagem de Natal 2.0',
    text: shareData.text || 'Venha acompanhar a contagem regressiva para o Natal!',
    url: shareData.url || window.location.href
  };

  if (navigator.share && navigator.canShare && navigator.canShare(data)) {
    try {
      await navigator.share(data);
      return { success: true, method: 'share' };
    } catch (err) {
      if (err.name !== 'AbortError') {
        return fallbackCopy(data.url);
      }
      return { success: false, method: 'canceled' };
    }
  } else {
    return fallbackCopy(data.url);
  }
}

/**
 * Fallback para cópia usando Clipboard API.
 * @param {string} textToCopy
 */
export async function fallbackCopy(textToCopy) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(textToCopy);
      showToast('Link copiado para a área de transferência! ✨');
      return { success: true, method: 'clipboard' };
    } else {
      // Fallback para navegadores muito antigos
      const tempInput = document.createElement('textarea');
      tempInput.value = textToCopy;
      tempInput.style.position = 'fixed';
      tempInput.style.opacity = '0';
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      showToast('Link copiado! ✨');
      return { success: true, method: 'fallback-execCommand' };
    }
  } catch (err) {
    showToast('Não foi possível copiar o link.');
    return { success: false, method: 'error' };
  }
}

