/**
 * CONTAGEM DE NATAL 2.0 - SNOW ENGINE
 * Animação de neve leve e performática em Canvas com controle de pausa.
 * Autor: Vicente Neto
 */

export class SnowEngine {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.flakes = [];
    this.isRunning = false;
    this.animationFrameId = null;
    this.flakeCount = 65; // Equilíbrio perfeito entre beleza e 60fps constante

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });

    // Inicializa flocos de neve com posições aleatórias
    this.flakes = [];
    for (let i = 0; i < this.flakeCount; i++) {
      this.flakes.push(this.createFlake(true));
    }
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createFlake(randomY = false) {
    return {
      x: Math.random() * this.canvas.width,
      y: randomY ? Math.random() * this.canvas.height : -10,
      radius: Math.random() * 2.8 + 1,
      density: Math.random() * this.flakeCount,
      speedY: Math.random() * 1.4 + 0.6,
      speedX: Math.random() * 0.8 - 0.4,
      opacity: Math.random() * 0.7 + 0.3
    };
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.loop();
  }

  stop() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  loop() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.flakes.length; i++) {
      const f = this.flakes[i];

      this.ctx.beginPath();
      this.ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
      this.ctx.fill();

      // Atualiza posições
      f.y += f.speedY;
      f.x += f.speedX + Math.sin(f.density) * 0.4;

      // Reseta floco se saiu da tela
      if (f.y > this.canvas.height + 10 || f.x < -15 || f.x > this.canvas.width + 15) {
        this.flakes[i] = this.createFlake(false);
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.loop());
  }
}

