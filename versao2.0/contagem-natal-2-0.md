# Plano de Execução: Contagem de Natal 2.0

> **Branch de Trabalho:** `feature/contagem-natal-2.0`  
> **Autor Original:** Vicente Neto  
> **Status:** Em Planejamento / Fase 1 & 2  

---

## 1. Diagnóstico Técnico Inicial (Fase 1)

### Problemas Identificados no Código Atual
1. **SEO e Metadados:**
   - Tag `<meta name="robots" content="noindex">` ativa, bloqueando indexação no Google.
   - Título desatualizado: `<title>Cronomento Natal 2022</title>`.
   - Falta de Open Graph, Twitter Cards, Canonical URL e Schema.org.
2. **Lógica da Contagem (`script.js`):**
   - Data estática chumbada: `new Date("Dec 25, 2024 00:00:00")`.
   - Bug no temporizador: usa `setTimeout(contagem, 1000)` mas tenta parar com `clearInterval(contagem)`.
   - Manipulação de DOM redundante (`textContent` + `innerText`).
   - Sem tratamento para cálculo automático de anos subsequentes nem virada de ano.
3. **Estilos e UX (`style.css`):**
   - Imagem de fundo externa sujeita a quebra (`xtrafondos.com`).
   - Ausência de design tokens (variáveis CSS) e paleta natalina sofisticada.
   - Sem suporte a `@media (prefers-reduced-motion)` para acessibilidade.
   - Falta de responsividade mobile-first e layout moderno de cartões.
4. **Recursos de Mídia:**
   - Pasta `"Musicas e Capas"` com espaços e caracteres acentuados (risco no GitHub Pages/Linux).
   - Quatro músicas MP3 presentes e de ótima qualidade, porém sem player de áudio para executá-las.
5. **Arquitetura e Recursos Faltantes:**
   - Falta de modularização (código todo misturado em 1 arquivo).
   - Ausência de PWA (manifest, service worker para cache offline).
   - Ausência das novas features: Calendário do Advento, Mensagens Natalinas, Gerador de Cartões via Canvas nativo e Controles de preferências.

---

## 2. Nova Arquitetura do Projeto

```
contagem_natal/
├── index.html                  # HTML5 semântico, acessível e otimizado para SEO
├── manifest.json               # Web App Manifest (PWA)
├── sw.js                       # Service Worker (Cache offline inteligente)
├── robots.txt                  # Liberação para mecanismos de busca
├── sitemap.xml                 # Sitemap indexável
├── README.md                   # Documentação completa v2.0.0
├── assets/
│   ├── images/                 # Favicon, capas geradas/otimizadas, og-image
│   │   ├── favicon.png
│   │   └── default-cover.svg
│   └── music/                  # Músicas renomeadas em kebab-case limpo
│       ├── daniel-a-paz.mp3
│       ├── marcas-do-que-se-foi.mp3
│       ├── music-fundo.mp3
│       └── roupa-nova-natal-todo-dia.mp3
├── css/
│   ├── main.css                # Variáveis, reset e layout global
│   ├── components.css          # Countdown, player, advent, cartões, mensagens
│   ├── animations.css          # Neve, brilhos, transições (com prefers-reduced-motion)
│   └── responsive.css          # Breakpoints mobile, tablet e desktop
├── js/
│   ├── main.js                 # Inicialização e orquestração dos módulos
│   ├── countdown.js            # Cálculo preciso e perpétuo do Natal (qualquer ano)
│   ├── messages.js             # Banco e gerador de mensagens natalinas por categoria
│   ├── advent-calendar.js      # Calendário do Advento (1-24 dez) com travas e surpresas
│   ├── music-player.js         # Player de áudio moderno, volume, playlist e sem autoplay
│   ├── greeting-cards.js       # Gerador de cartões com Canvas API nativo e download PNG
│   ├── preferences.js          # Persistência de tema/neve/áudio via LocalStorage
│   └── sharing.js              # Web Share API com fallback para cópia
└── tests/
    ├── countdown.test.js       # Testes unitários para datas, viradas e bissextos
    └── calendar.test.js        # Testes de bloqueio/desbloqueio do Advento
```

---

## 3. Roteiro de Implementação por Etapas

- [x] **Fase 0: Preparação**
  - [x] Criação da branch dedicada `feature/contagem-natal-2.0`.
  - [x] Diagnóstico completo do código legado.
  - [x] Criação do plano de execução.
- [x] **Fase 1: Reestruturação de Assets e Mídia**
  - [x] Organizar pastas `assets/music/` e `assets/images/` preservando os arquivos originais.
  - [x] Criar ícones PWA e elementos visuais necessários em SVG (`default-cover.svg`).
- [x] **Fase 2: Identidade Visual e CSS Modular**
  - [x] Definir paleta de cores natalinas `#123B2A`, `#071E17`, `#C62828`, `#D9B76E`.
  - [x] Criar `main.css`, `components.css`, `animations.css` e `responsive.css`.
  - [x] Efeito de neve leve em Canvas/CSS com alternador de ativação.
- [x] **Fase 3: Estrutura HTML Semântica e Hero do Contador**
  - [x] Criar `index.html` com tags semânticas, metadados Open Graph, Twitter e JSON-LD.
  - [x] Implementar Hero Section com destaque para a contagem e indicador de progresso.
- [x] **Fase 4: Motor de Contagem Perpétua (`countdown.js`)**
  - [x] Cálculo dinâmico para o próximo 25/12 considerando horário local.
  - [x] Atualização por segundo sem travamentos e com ARIA live polido.
  - [x] Mensagem especial no dia de Natal e avanço automático pós-Natal.
- [x] **Fase 5: Módulos de Experiência Natalina**
  - [x] `messages.js`: Mensagens categorizadas com cópia/compartilhamento.
  - [x] `advent-calendar.js`: 24 janelas interativas com surpresas e persistência.
  - [x] `music-player.js`: Player de áudio com as 4 faixas locais, capa e volume.
  - [x] `greeting-cards.js`: 3 modelos elegantes, edição de texto e exportação Canvas PNG.
  - [x] `preferences.js` e `sharing.js`: Configurações salvas e Web Share API.
- [x] **Fase 6: PWA, Cache Offline e SEO**
  - [x] Implementar `manifest.json` e `sw.js` com estratégia de cache adequada.
  - [x] Gerar `robots.txt` e `sitemap.xml`.
- [x] **Fase 7: Testes Unitários e Validação**
  - [x] Criar suíte de testes em `tests/` para validação de lógica de datas (13/13 aprovados).
  - [x] Verificar responsividade mobile-first e contraste de acessibilidade.
- [x] **Fase 8: Documentação Final**
  - [x] Atualizar `README.md` com instruções de execução local e deploy no GitHub Pages.
