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