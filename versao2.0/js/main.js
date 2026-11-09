/**
 * CONTAGEM DE NATAL 2.0 - MAIN ORCHESTRATOR
 * Inicialização e ligação de todos os módulos da aplicação com Lucide Icons.
 * Autor: Vicente Neto
 */

import { getNextChristmas, calculateTimeRemaining, calculateProgressPercentage, padZero } from './countdown.js';
import { getRandomMessage, CHRISTMAS_MESSAGES } from './messages.js';
import { ADVENT_DAYS, checkDayStatus, getOpenedDays, markDayAsOpened } from './advent-calendar.js';
import { MusicPlayer, formatTime } from './music-player.js';
import { CARD_TEMPLATES, renderGreetingCard, downloadCardImage } from './greeting-cards.js';
import { loadPreferences, savePreferences } from './preferences.js';
import { shareContent, showToast } from './sharing.js';
import { SnowEngine } from './snow.js';

// Função auxiliar para re-renderizar ícones Lucide dinamicamente
function refreshIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Carrega preferências
  const prefs = loadPreferences();

  // 2. Inicializa o motor de neve
  const snowCanvas = document.getElementById('snow-canvas');
  let snowEngine = null;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (snowCanvas && !prefersReducedMotion) {
    snowEngine = new SnowEngine(snowCanvas);
    if (prefs.snowEnabled) {
      snowEngine.start();
    }
  }

  // Toggle de Neve na barra superior
  const snowToggleBtn = document.getElementById('toggle-snow-btn');
  if (snowToggleBtn) {
    snowToggleBtn.setAttribute('aria-pressed', String(prefs.snowEnabled));
    snowToggleBtn.addEventListener('click', () => {
      const currentState = snowToggleBtn.getAttribute('aria-pressed') === 'true';
      const newState = !currentState;
      snowToggleBtn.setAttribute('aria-pressed', String(newState));
      savePreferences({ snowEnabled: newState });

      if (snowEngine) {
        if (newState) {
          snowEngine.start();
          showToast('Efeito de neve ativado.');
        } else {
          snowEngine.stop();
          showToast('Efeito de neve desativado.');
        }
      }
    });
  }

  // 3. Inicializa o Countdown Loop
  initCountdown();

  // 4. Inicializa Seção de Mensagens
  initMessages();

  // 5. Inicializa Calendário do Advento
  initAdventCalendar();

  // 6. Inicializa Player de Música
  initMusicPlayer(prefs);

  // 7. Inicializa Gerador de Cartões Digitais
  initGreetingCards();

  // 8. Botão Voltar ao Topo
  initScrollTop();

  // 9. Registro de PWA (Service Worker)
  registerServiceWorker();

  // 10. Renderização inicial dos ícones Lucide
  refreshIcons();
});

/* --------------------------------------------------------------------------
   CONTAGEM REGRESSIVA
   -------------------------------------------------------------------------- */
function initCountdown() {
  const daysEl = document.getElementById('days-val');
  const hoursEl = document.getElementById('hours-val');
  const minutesEl = document.getElementById('minutes-val');
  const secondsEl = document.getElementById('seconds-val');
  const progressFill = document.getElementById('progress-fill');
  const progressPercentText = document.getElementById('progress-percent');
  const christmasYearBadge = document.getElementById('target-year-badge');
  const arrivalBanner = document.getElementById('christmas-arrival-banner');
  const countdownDashboard = document.getElementById('countdown-dashboard');
  const shareHeroBtn = document.getElementById('share-hero-btn');

  function tick() {
    const now = new Date();
    const { targetDate, isChristmasDay, currentChristmasYear } = getNextChristmas(now);

    if (christmasYearBadge) {
      christmasYearBadge.textContent = currentChristmasYear;
    }

    if (isChristmasDay) {
      if (arrivalBanner) arrivalBanner.classList.add('active');
      if (countdownDashboard) countdownDashboard.style.display = 'none';
      if (progressFill) progressFill.style.width = '100%';
      if (progressPercentText) progressPercentText.textContent = '100%';
      return;
    } else {
      if (arrivalBanner) arrivalBanner.classList.remove('active');
      if (countdownDashboard) countdownDashboard.style.display = 'flex';
    }

    const { days, hours, minutes, seconds } = calculateTimeRemaining(now, targetDate);

    if (daysEl) daysEl.textContent = padZero(days);
    if (hoursEl) hoursEl.textContent = padZero(hours);
    if (minutesEl) minutesEl.textContent = padZero(minutes);
    if (secondsEl) secondsEl.textContent = padZero(seconds);

    const progress = calculateProgressPercentage(now, targetDate);
    if (progressFill) progressFill.style.width = `${progress}%`;
    if (progressPercentText) progressPercentText.textContent = `${progress}%`;
  }

  tick();
  setInterval(tick, 1000);

  if (shareHeroBtn) {
    shareHeroBtn.addEventListener('click', () => {
      const now = new Date();
      const { targetDate, currentChristmasYear } = getNextChristmas(now);
      const { days } = calculateTimeRemaining(now, targetDate);
      shareContent({
        title: `Contagem para o Natal ${currentChristmasYear}`,
        text: `Faltam apenas ${days} dias para o Natal! Acompanhe a contagem regressiva em tempo real:`,
        url: window.location.href
      });
    });
  }
}

/* --------------------------------------------------------------------------
   MENSAGENS NATALINAS
   -------------------------------------------------------------------------- */
function initMessages() {
  const quoteText = document.getElementById('message-quote-text');
  const categoryLabel = document.getElementById('message-category-label');
  const nextMsgBtn = document.getElementById('next-message-btn');
  const copyMsgBtn = document.getElementById('copy-message-btn');
  const categoryButtons = document.querySelectorAll('.category-btn');

  let currentCategory = 'all';

  function displayNewMessage() {
    const msg = getRandomMessage(currentCategory);
    if (quoteText) quoteText.textContent = `"${msg.text}"`;
    if (categoryLabel) categoryLabel.textContent = msg.categoryName;
  }

  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category || 'all';
      displayNewMessage();
    });
  });

  if (nextMsgBtn) {
    nextMsgBtn.addEventListener('click', displayNewMessage);
  }

  if (copyMsgBtn) {
    copyMsgBtn.addEventListener('click', () => {
      const text = quoteText ? quoteText.textContent : '';
      if (text) {
        navigator.clipboard.writeText(`${text} — Contagem de Natal 2.0\n${window.location.href}`);
        showToast('Mensagem copiada para a área de transferência.');
      }
    });
  }

  displayNewMessage();
}

/* --------------------------------------------------------------------------
   CALENDÁRIO DO ADVENTO
   -------------------------------------------------------------------------- */
function initAdventCalendar() {
  const grid = document.getElementById('advent-grid');
  const modal = document.getElementById('advent-modal');
  const modalClose = document.getElementById('modal-close-btn');
  const modalDay = document.getElementById('modal-day-badge');
  const modalTitle = document.getElementById('modal-surprise-title');
  const modalBody = document.getElementById('modal-surprise-body');
  const modalIcon = document.getElementById('modal-icon-badge');

  if (!grid) return;

  grid.innerHTML = '';
  const now = new Date();
  const openedDays = getOpenedDays();

  // Mapeamento de categorias/ícones para nomes do Lucide
  const lucideIconMap = {
    star: 'star',
    music: 'music',
    gift: 'gift',
    heart: 'heart',
    tree: 'trees',
    sparkle: 'sparkles'
  };

  ADVENT_DAYS.forEach(item => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'advent-card';
    card.dataset.day = item.day;

    const { isUnlocked, isToday, reason } = checkDayStatus(item.day, now);
    const hasOpened = openedDays.includes(item.day);

    let iconName = 'lock';
    if (isUnlocked) {
      card.classList.add('unlocked');
      if (hasOpened) card.classList.add('opened');
      if (isToday) card.classList.add('today');
      card.setAttribute('aria-label', `Dia ${item.day} do Advento: Liberado.`);
      iconName = hasOpened ? 'star' : (lucideIconMap[item.icon] || 'gift');
    } else {
      card.classList.add('locked');
      card.setAttribute('aria-label', `Dia ${item.day} do Advento: Bloqueado. ${reason}`);
    }

    card.innerHTML = `
      <span class="advent-day-num">${item.day}</span>
      <span class="advent-icon" aria-hidden="true"><i data-lucide="${iconName}"></i></span>
    `;

    card.addEventListener('click', () => {
      if (!isUnlocked) {
        showToast(reason);
        return;
      }

      markDayAsOpened(item.day);
      card.classList.add('opened');
      const iconSpan = card.querySelector('.advent-icon');
      if (iconSpan) {
        iconSpan.innerHTML = '<i data-lucide="star"></i>';
        refreshIcons();
      }

      if (modalDay) modalDay.textContent = `Dia ${item.day} de Dezembro`;
      if (modalIcon) {
        const modalIconName = lucideIconMap[item.icon] || 'gift';
        modalIcon.innerHTML = `<i data-lucide="${modalIconName}" style="width: 44px; height: 44px;"></i>`;
        refreshIcons();
      }
      if (modalTitle) modalTitle.textContent = item.title;
      if (modalBody) modalBody.textContent = item.surprise;
      if (modal) modal.classList.add('open');
    });

    grid.appendChild(card);
  });

  refreshIcons();

  if (modalClose && modal) {
    modalClose.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }
}

/* --------------------------------------------------------------------------
   PLAYER DE MÚSICA NATALINA
   -------------------------------------------------------------------------- */
function initMusicPlayer(prefs) {
  const playPauseBtn = document.getElementById('player-play-btn');
  const prevBtn = document.getElementById('player-prev-btn');
  const nextBtn = document.getElementById('player-next-btn');
  const progressRange = document.getElementById('player-range');
  const currentTimeEl = document.getElementById('current-time-txt');
  const totalDurationEl = document.getElementById('total-duration-txt');
  const trackTitleEl = document.getElementById('track-title-txt');
  const trackArtistEl = document.getElementById('track-artist-txt');
  const volumeSlider = document.getElementById('volume-range');
  const playlistItemsContainer = document.getElementById('playlist-items');

  const player = new MusicPlayer({
    onStateChange: (state) => {
      if (playPauseBtn) {
        playPauseBtn.innerHTML = state.isPlaying
          ? '<i data-lucide="pause"></i>'
          : '<i data-lucide="play"></i>';
        playPauseBtn.setAttribute('aria-label', state.isPlaying ? 'Pausar música' : 'Reproduzir música');
        refreshIcons();
      }

      if (trackTitleEl) trackTitleEl.textContent = state.currentTrack.title;
      if (trackArtistEl) trackArtistEl.textContent = state.currentTrack.artist;
      if (currentTimeEl) currentTimeEl.textContent = formatTime(state.currentTime);
      if (totalDurationEl) totalDurationEl.textContent = formatTime(state.duration);

      if (progressRange && !progressRange.matches(':active')) {
        progressRange.value = state.progress || 0;
      }

      // Atualiza destaque na playlist
      document.querySelectorAll('.playlist-item').forEach((el, idx) => {
        el.classList.toggle('active', idx === state.currentIndex);
      });
    },
    onError: () => {
      showToast('Não foi possível carregar o arquivo de áudio.');
    }
  });

  if (volumeSlider) {
    volumeSlider.value = prefs.savedVolume || 0.8;
    player.setVolume(prefs.savedVolume || 0.8);
    volumeSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      player.setVolume(val);
      savePreferences({ savedVolume: val });
    });
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => player.togglePlay());
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', () => player.prev());
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => player.next());
  }

  if (progressRange) {
    progressRange.addEventListener('change', (e) => {
      player.seek(parseFloat(e.target.value));
    });
  }

  // Renderizar Playlist no HTML
  if (playlistItemsContainer) {
    playlistItemsContainer.innerHTML = '';
    player.playlist.forEach((track, index) => {
      const li = document.createElement('li');
      li.className = `playlist-item ${index === 0 ? 'active' : ''}`;
      li.innerHTML = `
        <span>${index + 1}. ${track.title}</span>
        <small style="opacity: 0.7;">${track.artist}</small>
      `;
      li.addEventListener('click', () => {
        player.loadTrack(index, true);
      });
      playlistItemsContainer.appendChild(li);
    });
  }
}

/* --------------------------------------------------------------------------
   GERADOR DE CARTÕES DIGITAIS (CANVAS)
   -------------------------------------------------------------------------- */
function initGreetingCards() {
  const canvas = document.getElementById('card-canvas');
  if (!canvas) return;

  const toInput = document.getElementById('card-to-input');
  const fromInput = document.getElementById('card-from-input');
  const messageInput = document.getElementById('card-message-input');
  const downloadBtn = document.getElementById('card-download-btn');
  const templateBtns = document.querySelectorAll('.template-thumb');

  let currentTemplate = 'classic-red';

  function updateCard() {
    renderGreetingCard(canvas, {
      toName: toInput ? toInput.value.trim() || 'Querido(a) Amigo(a)' : 'Amigo(a)',
      fromName: fromInput ? fromInput.value.trim() || 'Com carinho' : 'Com carinho',
      message: messageInput ? messageInput.value.trim() || 'Que seu Natal seja abençoado!' : 'Feliz Natal!',
      templateId: currentTemplate
    });
  }

  [toInput, fromInput, messageInput].forEach(inp => {
    if (inp) inp.addEventListener('input', updateCard);
  });

  templateBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      templateBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTemplate = btn.dataset.template || 'classic-red';
      updateCard();
    });
  });

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      downloadCardImage(canvas, `cartao-natal-${Date.now()}.png`);
      showToast('Download do cartão iniciado.');
    });
  }

  // Primeira renderização
  updateCard();
}

/* --------------------------------------------------------------------------
   UTILITÁRIOS: SCROLL TOP & PWA SERVICE WORKER
   -------------------------------------------------------------------------- */
function initScrollTop() {
  const scrollBtn = document.getElementById('scroll-top-btn');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(err => {
        console.info('PWA offline pronto.');
      });
    });
  }
}
