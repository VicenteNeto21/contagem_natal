# 🎄 Contagem de Natal 2.0

> Uma experiência web natalina moderna, imersiva e interativa com contagem regressiva perpétua, trilha sonora festiva, calendário do advento, mensagens inspiradoras e gerador de cartões virtuais.

![Versão](https://img.shields.io/badge/vers%C3%A3o-2.0.0-gold.svg)
![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-red.svg)
![Status](https://img.shields.io/badge/status-conclu%C3%ADdo-brightgreen.svg)
![PWA](https://img.shields.io/badge/PWA-pronto-blue.svg)

---

## 📖 Apresentação do Projeto

O **Contagem de Natal 2.0** é a evolução completa do projeto criado originalmente por **Vicente Neto**. A versão 2.0 transforma uma contagem de página única em uma plataforma festiva rica, acessível e visualmente elegante, inspirada no design acolhedor de noites natalinas com paleta de verde escuro, dourado, vermelho e flocos de neve em tempo real.

O projeto foi construído para funcionar 100% de forma estática no **GitHub Pages**, sem dependência de servidores, bancos de dados ou APIs pagas de terceiros.

---

## 🎯 Objetivo

Oferecer uma contagem regressiva automática e perpétua para o Natal que nunca quebre ou apresente valores negativos em anos futuros, proporcionando aos visitantes uma atmosfera mágica e interativa para celebrar o espírito natalino em qualquer dispositivo.

---

## ✨ Funcionalidades Principais

### 1. ⏱️ Contagem Regressiva Perpétua e Inteligente
- Cálculo dinâmico do próximo 25 de Dezembro com base no horário local do visitante.
- Suporte a anos bissextos e viradas de ano automáticas (ao terminar o dia 25/12, a contagem já prepara automaticamente o Natal do próximo ano).
- Mensagem especial festiva de celebração exibida durante todo o dia de Natal.
- Barra de progresso anual que indica a jornada percorrida ao longo do ano até a grande festa.
- Botão nativo de compartilhamento rápido via **Web Share API** (com fallback de cópia).

### 2. 💌 Mensagens de Natal Inspiradoras
- Acervo de mensagens organizadas por categorias: *Amor & Família, Amizade, Esperança, Reflexão, Gratidão, Cristãs e Celebração*.
- Filtro interativo por tags, botão para sortear nova mensagem e função de cópia rápida para redes sociais e WhatsApp.

### 3. 🎁 Calendário do Advento Interativo (1 a 24 de Dezembro)
- 24 portas numeradas com desafios, reflexões, curiosidades e atividades diárias de Natal.
- **Bloqueio por data:** só permite abrir os dias que já chegaram em dezembro.
- Salva os dias já abertos no `LocalStorage` do navegador para manter o progresso do usuário.

### 4. 🎶 Player de Música Natalina Integrado
- Reprodução de músicas natalinas locais em alta fidelidade.
- Controles completos: play/pause, avançar, retroceder, barra de progresso com busca, controle de volume e lista de reprodução (playlist).
- Totalmente em conformidade com as políticas de autoplay dos navegadores modernos (não dispara som de forma intrusiva sem ação do visitante).

### 5. 🎨 Gerador de Cartões de Natal (Canvas Nativo)
- Permite criar cartões digitais personalizados digitando o nome do destinatário, mensagem e remetente.
- 3 modelos visuais elegantes: *Vermelho Nobre*, *Floresta Encantada* e *Noite Dourada*.
- Renderização e exportação instantânea em imagem PNG de alta resolução via HTML5 Canvas, sem bibliotecas externas pesadas.

### 6. 📱 PWA (Progressive Web App) & Modo Offline
- Arquivo `manifest.json` com ícones para instalação em Android, iOS, Windows e Mac.
- `Service Worker` (`sw.js`) configurado com cache de recursos estáticos, permitindo que a aplicação e a contagem continuem funcionando mesmo sem conexão com a internet.

### 7. ♿ Acessibilidade e Performance
- Respeita rigorosamente a diretiva `@media (prefers-reduced-motion: reduce)`, desativando efeitos de neve para usuários sensíveis a movimento.
- Botão rápido para ligar/desligar a animação de neve no topo da página.
- Contraste visual dentro dos padrões WCAG AA/AAA.
- Navegação fluida por teclado e skip link para conteúdo principal.
- SEO completo com Open Graph, Twitter Cards, `robots.txt` e `sitemap.xml`.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Marcação semântica, acessível e otimizada com JSON-LD para motores de busca.
- **CSS3 Moderno:** Variáveis CSS (Design Tokens), Flexbox, CSS Grid, Glassmorphism e animações otimizadas para GPU.
- **JavaScript Moderno (ES Modules):** Código limpo, modular e desacoplado, sem frameworks pesados.
- **Lucide Icons:** Biblioteca profissional de ícones vetoriais modernos e consistentes.
- **HTML5 Canvas API:** Para efeito de neve leve a 60fps e renderização dinâmica dos cartões natalinos.
- **HTML5 Web Audio API:** Para o reprodutor de áudio nativo.
- **Web Share API & Clipboard API:** Para compartilhamento social simples e rápido.
- **Node.js Test Runner:** Testes unitários nativos para garantir a precisão matemática da contagem e regras do calendário.

---

## 📁 Estrutura de Diretórios

```
contagem_natal/
├── index.html                  # Interface principal da aplicação
├── manifest.json               # Configurações do PWA
├── sw.js                       # Service Worker com cache offline
├── robots.txt                  # Diretrizes para indexadores e buscadores
├── sitemap.xml                 # Mapeamento do site para SEO
├── README.md                   # Documentação do projeto
├── package.json                # Metadados e script de testes
│
├── assets/
│   ├── images/                 # Ícones, favicon e capas vetoriais
│   │   ├── favicon.png
│   │   └── default-cover.svg
│   └── music/                  # Músicas locais organizadas e padronizadas
│       ├── daniel-a-paz.mp3
│       ├── marcas-do-que-se-foi.mp3
│       ├── music-fundo.mp3
│       └── roupa-nova-natal-todo-dia.mp3
│
├── css/
│   ├── main.css                # Variáveis, reset e layout base
│   ├── components.css          # Estilos do contador, player, advento e cartões
│   ├── animations.css          # Animações e suporte a prefers-reduced-motion
│   └── responsive.css          # Breakpoints mobile, tablet e desktop
│
├── js/
│   ├── main.js                 # Orquestrador geral da aplicação
│   ├── countdown.js            # Motor de cálculo perpétuo da data de Natal
│   ├── messages.js             # Banco de mensagens natalinas por categoria
│   ├── advent-calendar.js      # Lógica e regras do Calendário do Advento
│   ├── music-player.js         # Reprodutor musical e gerenciamento de playlist
│   ├── greeting-cards.js       # Renderizador e gerador de imagem dos cartões
│   ├── preferences.js          # Persistência de preferências no LocalStorage
│   ├── sharing.js              # Utilitários de compartilhamento e notificações Toast
│   └── snow.js                 # Motor de neve performático em Canvas
│
└── tests/
    ├── countdown.test.js       # Testes unitários do contador
    └── calendar.test.js        # Testes unitários do calendário do advento
```

---

## 💻 Como Executar Localmente

Como o projeto utiliza **JavaScript ES Modules**, os navegadores exigem que os arquivos sejam servidos via protocolo HTTP/HTTPS (e não direto por `file://`):

### Opção 1: Com Python (já nativo no Windows, Linux ou Mac)
```bash
# Python 3
python -m http.server 8000
```
Depois, abra no navegador: `http://localhost:8000`

### Opção 2: Com Node.js (`npx serve`)
```bash
npx serve .
```

### Opção 3: Com extensão VS Code / Antigravity
Basta clicar com o botão direito em `index.html` e selecionar **"Open with Live Server"**.

---

## 🧪 Como Executar os Testes Unitários

O projeto possui suíte de testes automatizados com 100% de aprovação para a lógica temporal:

```bash
npm test
```

---

## 🚀 Como Publicar no GitHub Pages

1. Faça o commit e envie todas as alterações para o repositório no GitHub:
   ```bash
   git add .
   git commit -m "feat: lancamento do Contagem de Natal 2.0"
   git push origin feature/contagem-natal-2.0
   ```
2. No GitHub, abra o repositório e vá em:
   **Settings (Configurações) > Pages**.
3. Na seção **Build and deployment**:
   - Em **Source**, selecione **Deploy from a branch**.
   - Escolha a branch principal (`main` ou a branch desejada) e a pasta `/ (root)`.
   - Clique em **Save**.
4. Em poucos instantes, o seu site estará disponível publicamente em:
   `https://<seu-usuario>.github.io/contagem_natal/`

---

## 🔮 Futuras Melhorias Sugeridas

- Temas adicionais de cores (ex: Azul Polar, Prata Cristalino).
- Notificações push diárias para lembrar de abrir a surpresa do Calendário do Advento.
- Possibilidade de o visitante importar sua própria música via upload local.

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja os detalhes nos arquivos do repositório.

---

## 👤 Créditos e Autoria

- **Autor Original:** [Vicente Neto](https://github.com/VicenteNeto21)
- **Repositório:** [https://github.com/VicenteNeto21/contagem_natal](https://github.com/VicenteNeto21/contagem_natal)
- **Reformulação:** Versão 2.0.0
