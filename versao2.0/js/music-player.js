/**
 * CONTAGEM DE NATAL 2.0 - MUSIC PLAYER MODULE
 * Reprodutor de áudio nativo para as músicas da pasta assets/music.
 * Autor: Vicente Neto
 */

export const PLAYLIST = [
  {
    title: 'A Paz (Heal The World)',
    artist: 'Daniel (Estrelas do Natal)',
    src: 'assets/music/daniel-a-paz.mp3',
    cover: 'assets/images/default-cover.svg'
  },
  {
    title: 'Natal Todo Dia',
    artist: 'Roupa Nova',
    src: 'assets/music/roupa-nova-natal-todo-dia.mp3',
    cover: 'assets/images/default-cover.svg'
  },
  {
    title: 'Marcas Do Que Se Foi',
    artist: 'Projeto de Natal (Inova)',
    src: 'assets/music/marcas-do-que-se-foi.mp3',
    cover: 'assets/images/default-cover.svg'
  },
  {
    title: 'Canção de Natal Instrumental',
    artist: 'Fundo Festivo',
    src: 'assets/music/music-fundo.mp3',
    cover: 'assets/images/default-cover.svg'
  }
];

export class MusicPlayer {
  constructor(options = {}) {
    this.playlist = PLAYLIST;
    this.currentIndex = 0;
    this.audio = new Audio();
    this.audio.preload = 'metadata';
    this.isPlaying = false;
    this.onStateChange = options.onStateChange || (() => {});
    this.onError = options.onError || (() => {});

    this.initAudioListeners();
    this.loadTrack(this.currentIndex, false);
  }

  initAudioListeners() {
    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.onStateChange(this.getState());
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.onStateChange(this.getState());
    });

    this.audio.addEventListener('ended', () => {
      this.next();
    });

    this.audio.addEventListener('timeupdate', () => {
      this.onStateChange(this.getState());
    });

    this.audio.addEventListener('error', (e) => {
      this.isPlaying = false;
      this.onError(e);
      this.onStateChange(this.getState());
    });
  }

  loadTrack(index, autoPlay = false) {
    if (index < 0) index = this.playlist.length - 1;
    if (index >= this.playlist.length) index = 0;

    this.currentIndex = index;
    const track = this.playlist[this.currentIndex];
    this.audio.src = track.src;

    if (autoPlay) {
      this.audio.play().catch(err => {
        console.warn('Autoplay bloqueado pelo navegador:', err);
        this.isPlaying = false;
        this.onStateChange(this.getState());
      });
    } else {
      this.isPlaying = false;
      this.onStateChange(this.getState());
    }
  }

  togglePlay() {
    if (this.audio.paused) {
      this.audio.play().catch(err => {
        console.warn('Erro ao reproduzir áudio:', err);
      });
    } else {
      this.audio.pause();
    }
  }

  next() {
    this.loadTrack(this.currentIndex + 1, this.isPlaying);
  }

  prev() {
    this.loadTrack(this.currentIndex - 1, this.isPlaying);
  }

  seek(percentage) {
    if (!isNaN(this.audio.duration)) {
      this.audio.currentTime = (percentage / 100) * this.audio.duration;
    }
  }

  setVolume(val) {
    const v = Math.max(0, Math.min(1, val));
    this.audio.volume = v;
  }

  getCurrentTrack() {
    return this.playlist[this.currentIndex];
  }

  getState() {
    const duration = this.audio.duration || 0;
    const currentTime = this.audio.currentTime || 0;
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return {
      isPlaying: !this.audio.paused,
      currentIndex: this.currentIndex,
      currentTrack: this.getCurrentTrack(),
      currentTime,
      duration,
      progress,
      volume: this.audio.volume
    };
  }
}

/**
 * Formata segundos no formato mm:ss (ex: 125 -> "02:05").
 * @param {number} seconds
 * @returns {string}
 */
export function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

