# PROJETO: CONTAGEM DE NATAL 2.0
## Reformulação completa, modernização e evolução do sistema

Você é uma equipe sênior de desenvolvimento de software composta por:
- Engenheiro de Software.
- Desenvolvedor Frontend.
- UI/UX Designer.
- Especialista em JavaScript.
- Especialista em acessibilidade e SEO.
- Engenheiro de testes.

Sua missão é realizar uma reformulação profunda do projeto Contagem de Natal, transformando a aplicação atual em uma experiência natalina moderna, interativa, responsiva e visualmente impressionante.

**REPOSITÓRIO ORIGINAL:**
https://github.com/VicenteNeto21/contagem_natal

**NOME DO PROJETO:** Contagem de Natal 2.0

**AUTOR:** Vicente Neto

---

# 1. PRIMEIRA ETAPA: AUDITORIA COMPLETA

Antes de modificar qualquer arquivo:

1. Analise toda a estrutura do repositório.
2. Leia os arquivos HTML, CSS e JavaScript.
3. Inspecione as pastas de imagens, músicas e capas.
4. Identifique recursos existentes que possam ser reutilizados.
5. Identifique bugs, problemas de responsividade e falhas de implementação.
6. Verifique dependências externas e recursos que possam estar indisponíveis.
7. Analise o funcionamento da aplicação atual.

Não exclua arquivos, imagens, músicas ou recursos existentes sem verificar sua utilidade.

Crie um diagnóstico técnico com os problemas identificados e as soluções propostas.

Depois, execute a implementação. Não se limite a apresentar recomendações.

# 2. IDENTIDADE VISUAL E DESIGN

Crie uma interface completamente renovada.

Referência estética:
- Sites natalinos premium.
- Interfaces modernas com inspiração em experiências digitais imersivas.
- Design elegante, minimalista e acolhedor.
- Atmosfera noturna de Natal.

Paleta de cores sugerida:
- Verde escuro: #123B2A
- Verde profundo: #071E17
- Vermelho natalino: #C62828
- Dourado: #D9B76E
- Branco: #FFFFFF
- Fundo escuro: #081A16

Elementos visuais:
- Fundo com gradientes.
- Céu estrelado.
- Neve animada.
- Iluminação suave.
- Elementos decorativos natalinos.
- Árvore de Natal com iluminação.
- Efeitos de profundidade.
- Animações suaves nas transições.

Evite excesso de elementos, poluição visual e animações que prejudiquem o desempenho.

# 3. HERO SECTION — TELA PRINCIPAL

Desenvolva uma seção principal impactante.

Elementos obrigatórios:

- Logotipo ou identidade visual Contagem de Natal.
- Título: "O Natal está chegando!"
- Subtítulo com uma mensagem acolhedora.
- Contagem regressiva centralizada.
- Indicadores de dias, horas, minutos e segundos.
- Elementos decorativos natalinos.
- Botão para compartilhar a contagem.
- Indicador de progresso até o Natal.

A contagem deve possuir destaque visual absoluto.

Utilize animações discretas nos números e transições.

# 4. SISTEMA DE CONTAGEM REGRESSIVA

Reconstrua completamente a lógica do contador.

Requisitos:

1. Identificar automaticamente a data atual.
2. Calcular o próximo dia 25 de dezembro.
3. Funcionar automaticamente em todos os anos, sem alteração manual.
4. Exibir dias, horas, minutos e segundos.
5. Atualizar a cada segundo.
6. Considerar o horário local do visitante.
7. Tratar corretamente anos bissextos.
8. Não apresentar valores negativos.
9. Evitar múltiplos temporizadores desnecessários.
10. Tratar corretamente o momento em que o Natal chega.

Quando o Natal chegar, apresentar:

"Feliz Natal! Que esta data seja repleta de amor, paz, esperança e momentos especiais."

Após o Natal, a aplicação deverá preparar automaticamente a contagem para o próximo ano.

Utilize uma arquitetura organizada, com funções independentes e código reutilizável.

# 5. SEÇÃO DE EXPERIÊNCIA NATALINA

Crie novas áreas abaixo da contagem principal.

## 5.1 Mensagens de Natal

Desenvolva um sistema de mensagens natalinas aleatórias.

Categorias:
- Amor e família.
- Amizade.
- Esperança.
- Reflexão.
- Gratidão.
- Mensagens cristãs.
- Mensagens de celebração.

Disponibilize um botão "Nova mensagem".

Permita copiar e compartilhar a mensagem.

Não utilize APIs pagas ou dependências de serviços externos.

## 5.2 Calendário do Advento

Implemente um calendário interativo de 1 a 24 de dezembro.

Características:
- 24 cartões numerados.
- Cada cartão representa um dia de dezembro.
- Um cartão só pode ser desbloqueado quando sua data chegar.
- Cada cartão contém uma surpresa.
- Surpresas podem ser mensagens, curiosidades, desafios ou atividades natalinas.
- Animação de abertura dos cartões.
- Interface responsiva.

O calendário deve funcionar com base na data local do visitante.

Não permita desbloqueio antecipado pela interface normal.

## 5.3 Música de Natal

Recupere e avalie os arquivos existentes na pasta "Musicas e Capas".

Implemente um player de áudio moderno.

Recursos:
- Reproduzir e pausar.
- Próxima música.
- Música anterior.
- Controle de volume.
- Nome da música.
- Capa do álbum.
- Barra de progresso.
- Lista de reprodução.

Requisitos:
- Utilizar os arquivos locais existentes.
- Não iniciar reprodução automática com áudio.
- Respeitar as políticas de autoplay dos navegadores.
- Tratar erros de carregamento.
- Permitir desligar completamente a música.

Se não existirem arquivos adequados, preparar uma estrutura para inclusão posterior, sem inventar músicas ou utilizar arquivos protegidos indevidamente.

## 5.4 Cartões Digitais

Crie uma funcionalidade para gerar cartões de Natal.

O visitante poderá:
- Escolher um modelo.
- Digitar o nome do destinatário.
- Escrever uma mensagem personalizada.
- Visualizar o cartão.
- Compartilhar o resultado.
- Baixar o cartão como imagem, quando possível.

Crie pelo menos três modelos visuais diferentes.

# 6. INTERATIVIDADE E PERSONALIZAÇÃO

Implemente:

- Controle para ativar/desativar neve.
- Controle de música.
- Alternância de efeitos visuais.
- Preferências salvas no LocalStorage.
- Botão de compartilhamento usando Web Share API.
- Fallback para copiar o link.
- Botão para retornar ao topo.

Não solicite cadastro ou informações pessoais dos visitantes.

# 7. RESPONSIVIDADE

A aplicação deverá funcionar perfeitamente em:

- Smartphones.
- Tablets.
- Notebooks.
- Desktops.
- Monitores de diferentes resoluções.

Priorize o desenvolvimento mobile-first.

Verifique especialmente:
- Legibilidade dos números.
- Tamanho dos botões.
- Espaçamento entre elementos.
- Navegação por toque.
- Player de áudio em telas pequenas.
- Calendário do Advento.
- Cartões digitais.

Não permita rolagem horizontal indevida.

# 8. ACESSIBILIDADE

Implemente boas práticas:

- HTML semântico.
- Contraste adequado.
- Navegação por teclado.
- Estados de foco visíveis.
- Descrições para imagens.
- Botões com nomes acessíveis.
- Respeito à configuração prefers-reduced-motion.
- Alternativa visual para animações.
- Regiões de atualização acessíveis para o contador, sem anunciar cada segundo desnecessariamente.

# 9. SEO E COMPARTILHAMENTO

Modernize completamente os metadados.

Implementar:
- Title atualizado.
- Meta description.
- Open Graph.
- Twitter Cards.
- Favicon.
- Imagem de compartilhamento.
- URLs canônicas, quando aplicável.
- Dados estruturados apropriados.

Remover a configuração noindex existente, permitindo indexação pelos mecanismos de busca.

Não inventar informações ou dados estruturados.

# 10. PERFORMANCE

O site deverá ser leve e rápido.

Implementar:
- Carregamento otimizado de imagens.
- Lazy loading quando apropriado.
- CSS organizado.
- JavaScript modular.
- Redução de dependências externas.
- Animações com bom desempenho.
- Tratamento de erros.
- Evitar operações desnecessárias no DOM.

Não adicionar frameworks pesados sem justificativa técnica.

# 11. ARQUITETURA DO PROJETO

Organize o código em uma estrutura semelhante a:

contagem_natal/
│
├── index.html
├── README.md
├── manifest.json
├── robots.txt
├── sitemap.xml
│
├── assets/
│   ├── images/
│   ├── icons/
│   ├── music/
│   └── cards/
│
├── css/
│   ├── main.css
│   ├── components.css
│   ├── animations.css
│   └── responsive.css
│
├── js/
│   ├── main.js
│   ├── countdown.js
│   ├── messages.js
│   ├── advent-calendar.js
│   ├── music-player.js
│   ├── greeting-cards.js
│   ├── preferences.js
│   └── sharing.js
│
└── tests/
    ├── countdown.test.js
    └── calendar.test.js

A estrutura poderá ser ajustada conforme a necessidade, desde que mantenha boa organização e simplicidade.

Utilize JavaScript ES Modules.

Não introduza backend ou banco de dados sem necessidade.

Mantenha compatibilidade com hospedagem estática no GitHub Pages.

# 12. PWA — APLICAÇÃO INSTALÁVEL

Prepare o projeto para funcionar como PWA.

Implementar:
- Web App Manifest.
- Ícones adequados.
- Service Worker.
- Cache dos recursos essenciais.
- Página de fallback offline.
- Instalação em dispositivos compatíveis.

O funcionamento offline não deve comprometer a atualização da contagem regressiva.

# 13. TESTES E VALIDAÇÃO

Realize testes em todos os módulos.

Contagem:
- Antes de dezembro.
- Durante dezembro.
- Dia 24 de dezembro.
- Dia 25 de dezembro.
- Após o Natal.
- Virada do ano.
- Ano bissexto.

Calendário:
- Antes de dezembro.
- Durante o Advento.
- Dias desbloqueados.
- Dias bloqueados.
- Após 24 de dezembro.

Player:
- Reprodução.
- Pausa.
- Mudança de faixa.
- Volume.
- Arquivo indisponível.

Interface:
- Smartphone.
- Tablet.
- Desktop.
- Navegação por teclado.
- Preferência por movimento reduzido.

Corrija os problemas encontrados antes de considerar a implementação concluída.

# 14. DOCUMENTAÇÃO

Atualize o README.md com:

- Apresentação do projeto.
- Objetivo.
- Funcionalidades.
- Tecnologias.
- Estrutura de diretórios.
- Como executar localmente.
- Como realizar a publicação.
- Informações sobre hospedagem no GitHub Pages.
- Licença.
- Créditos.

Atualize a versão para 2.0.0.

# 15. DIRETRIZES DE EXECUÇÃO

Siga esta ordem:

FASE 1 — Auditoria e diagnóstico.

FASE 2 — Planejamento da nova arquitetura.

FASE 3 — Desenvolvimento da identidade visual.

FASE 4 — Implementação da contagem regressiva.

FASE 5 — Implementação das funcionalidades adicionais.

FASE 6 — Responsividade e acessibilidade.

FASE 7 — Otimização e testes.

FASE 8 — Documentação e preparação para publicação.

IMPORTANTE:

- Não entregue apenas protótipos.
- Não deixe botões sem funcionalidade.
- Não utilize dados fictícios como se fossem reais.
- Não remova recursos existentes sem justificativa.
- Não utilize serviços pagos.
- Não introduza dependências desnecessárias.
- Não comprometa a compatibilidade com GitHub Pages.
- Preserve a autoria original de Vicente Neto.
- Implemente as funcionalidades de verdade.
- Verifique os caminhos dos arquivos e os recursos locais.

Ao finalizar, apresente um relatório contendo:

1. Problemas encontrados no projeto original.
2. Funcionalidades implementadas.
3. Arquivos criados e modificados.
4. Tecnologias utilizadas.
5. Testes realizados e seus resultados.
6. Instruções para execução local.
7. Instruções para publicação no GitHub Pages.
8. Melhorias que poderão ser desenvolvidas futuramente.

**OBJETIVO FINAL:**

Entregar uma aplicação Contagem de Natal 2.0 completa, moderna, elegante, interativa, rápida e preparada para continuar funcionando automaticamente nos próximos anos, sem precisar de atualizações manuais da data do Natal.