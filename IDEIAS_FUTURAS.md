# 💡 Ideias Futuras — Beleza em Dia

Este documento reúne ideias de evolução do sistema que não fazem parte do escopo atual do MVP, mas que podem ser implementadas em versões futuras.

---

## 1. Internacionalização (i18n) — Suporte a múltiplos idiomas

Permitir que o painel e as páginas públicas sejam exibidos em mais de um idioma, além do português (por exemplo: inglês e espanhol).

### O que envolveria:

- Estruturar as strings da interface em arquivos de tradução (ex.: next-intl ou i18next).
- Detectar o idioma do navegador e permitir troca manual pelo usuário.
- Traduzir mensagens, e-mails transacionais e formatos de data/moeda por localidade.
- Suporte a fuso horário e formatação regional (R$, €, etc.).

### Benefício: ampliar o alcance do produto para profissionais e clientes de outros países.

---

## 2. Exportação de relatório financeiro (PDF / Excel)

Permitir que o profissional exporte seus relatórios financeiros em formatos prontos para contabilidade e arquivo.

### O que envolveria:

- Botão “Exportar” na tela Financeiro com opções PDF e Excel (.xlsx).
- Geração de PDF com resumo de receitas, despesas e período.
- Geração de planilha Excel com todas as transações detalhadas.
- Filtros por intervalo de datas, tipo (receita/despesa) e categoria antes de exportar.

### Benefício: facilitar o controle financeiro, a prestação de contas e o envio ao contador.

---

## 3. Comunicação e Notificações Avançadas

### 3.1 Disparo Automático via WhatsApp API (Oficial / Z-API)
- Envio automático de confirmação de agendamento e comprovante do Pix no WhatsApp da cliente assim que o pagamento for aprovado, sem exigir o clique manual da profissional.

### 3.2 Lembretes de Atendimento Automáticos (24h e 2h antes)
- Disparo automatizado no WhatsApp da cliente com botões interativos de [Confirmar Presença] ou [Solicitar Reagendamento], reduzindo o índice de faltas (no-show).

### 3.3 Notificações Push no Navegador / PWA
- Alertas sonoros e pop-ups diretos no celular/computador da profissional em tempo real quando uma nova cliente agendar ou cancelar.

### 3.4 Relatórios Periódicos Automáticos por E-mail/WhatsApp
- Envio semanal e mensal de um resumo executivo com métricas do negócio (faturamento total, quantidade de atendimentos e clientes sumidas) diretamente no WhatsApp da profissional.

---

## 4. Segurança Avançada: Autenticação em Duas Etapas (2FA via OTP)
- Permitir ativação de verificação em duas etapas via aplicativo autenticador (Google Authenticator / Authy) ou código SMS/WhatsApp para logins com e-mail e senha.

---

## 5. Validação de WhatsApp da Profissional (2FA / OTP no Onboarding)

### O que envolveria:
- Envio de código de verificação de 6 dígitos (OTP) via SMS ou WhatsApp durante o cadastro/onboarding da profissional.
- Tela de validação do código para confirmar a posse do número antes de liberar a criação do link público (`slug`).

### Benefício:
- Garantir que 100% dos números cadastrados no sistema pertençam às profissionais, evitando falhas de comunicação com clientes e perda de notificações.

### Status:
- Postergado pós-MVP para simplificar o fluxo inicial de cadastro e evitar custos com APIs de envio (Twilio/Z-API).