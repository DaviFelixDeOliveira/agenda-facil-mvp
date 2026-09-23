# Design System - Beleza em Dia

## 1. Objetivo

O design system do Beleza em Dia define uma interface minimalista, refinada e prática para profissionais de beleza e clientes. A prioridade é reduzir o tempo para agendar, facilitar a leitura da agenda e comunicar estados importantes sem ambiguidade.

A linguagem visual deve ser:

- Minimalista: poucos elementos decorativos e foco no conteúdo da tarefa.
- Refinada: tipografia consistente, espaçamento generoso e uso pontual do Rose/Batom.
- Operacional: informações escaneáveis, ações previsíveis e estados sempre visíveis.
- Mobile first: controles confortáveis para toque e layouts que funcionam em telas pequenas.

## 2. Tokens de Cor

Os tokens estão disponíveis no `tailwind.config.js` e como variáveis CSS em `globals.css`. A paleta foi definida a partir da identidade visual da logo [Logo App Salão.png](img/Logo%20App%20Salão.png), usando o preto/charcoal da marca e o vermelho/batom do detalhe da ilustração.

| Token | Hexadecimal | Uso principal |
|---|---|---|
| `primary` / `primary-dark` | `#111827` | Textos, títulos, navegação, bordas fortes e ações principais neutras |
| `brand` | `#E11D48` | Marca, CTA principal, seleção ativa e destaque visual |
| `background` | `#FAFAFA` | Fundo geral das páginas e áreas de navegação |
| `surface` | `#FFFFFF` | Cards, formulários, menus e modais |
| `success` | `#10B981` | Agendamento confirmado, pagamento aprovado e conclusão |
| `warning` | `#F59E0B` | Agendamento pendente, avisos e ações que exigem atenção |
| `danger` | `#DC2626` | Cancelamento, exclusão, falha e ações destrutivas |
| `loading` | `#E11D48` | Barra de carregamento, spinner e progresso |

### 2.1 Regras de aplicação

- Use `background` como base da aplicação; reserve `surface` para áreas com conteúdo agrupado.
- Use `primary` para texto principal e ícones essenciais. Evite texto longo em `brand`, `success`, `warning` ou `danger`.
- Use `brand` para uma ação primária por contexto. Não transforme todos os botões em destaque.
- Use `success`, `warning` e `danger` acompanhadas de texto ou ícone; a cor nunca deve ser o único indicador do estado.
- Use `warning` com texto `primary` quando houver texto sobre fundo âmbar para preservar legibilidade.
- Mantenha contraste compatível com WCAG 2.1 AA, especialmente em textos pequenos e controles desabilitados.

## 3. Botões

### Botão primário

Use `brand` com texto branco para confirmar uma intenção importante, como `Agendar horário`, `Salvar serviço` ou `Confirmar pagamento`.

- Fundo: `brand`
- Texto e ícone: `surface`
- Hover: escurecer o tom de `brand` sem trocar de família cromática
- Foco: anel visível usando `brand` com espaço em relação ao botão

### Botão neutro

Use `primary` para ações de navegação ou confirmação sem destaque comercial, como `Voltar`, `Ver agenda` e `Fechar`.

- Fundo: `primary`
- Texto e ícone: `surface`
- Alternativa secundária: fundo `surface`, texto `primary` e borda `primary`

### Botão de sucesso

Use `success` para confirmar uma ação já validada, como marcar atendimento como concluído ou indicar pagamento aprovado. Não use para ações que ainda exigem confirmação.

### Botão de perigo

Use `danger` apenas para cancelar, excluir ou desfazer algo com impacto. A ação deve ter confirmação em modal quando for irreversível.

## 4. Cards da Agenda

Os cards devem facilitar a leitura rápida do dia. Use `surface` como fundo, borda discreta e uma faixa ou marcador lateral para o status.

- Confirmado: marcador `success` e texto de status `success`.
- Pendente: marcador `warning` e texto de status `primary` ou `warning` com suporte textual.
- Cancelado: marcador `danger`, texto `danger` e conteúdo secundário com menor ênfase.
- Horário selecionado: borda `brand` e fundo `surface`; não aplique `brand` em toda a área se isso reduzir a legibilidade.
- Horário bloqueado: fundo `background`, texto secundário e ícone de bloqueio; não usar `danger` para pausas normais.

Cada card deve mostrar, nesta ordem, horário, nome do cliente, serviço e status. A ação principal deve ficar próxima do status e ter alvo de toque adequado.

## 5. Modais

Modais devem ser usados para confirmar decisões, editar dados curtos ou mostrar uma informação que não pode interromper a tarefa principal por muito tempo.

- Fundo do modal: `surface`.
- Fundo da página sob o modal: `primary` com opacidade, sem alterar a leitura do conteúdo do modal.
- Título e texto principal: `primary`.
- Confirmação comum: botão `brand`.
- Confirmação de sucesso: botão `success` quando a operação já estiver claramente validada.
- Ação destrutiva: botão `danger`, com título explícito e consequência descrita.
- Cancelar ou fechar: ação neutra, visualmente secundária.

O modal deve ter foco inicial acessível, fechar com `Esc` quando apropriado e devolver o foco ao elemento que o abriu.

## 6. Barra de Carregamento e Progresso

Use `loading` (`#E11D48`) para comunicar que uma operação está em andamento, como carregamento da agenda, envio de formulário ou sincronização após o retorno da conexão.

- Trilho: `background` ou uma variação neutra derivada de `primary`.
- Progresso: `loading`.
- Spinner: `loading`, com tamanho estável para não deslocar o layout.
- Não use `success` antes da operação terminar.
- Para carregamentos longos, informe o estado em texto, como `Carregando agenda` ou `Sincronizando alterações`.

## 7. Estados e Mensagens

Estados de agenda, pagamentos e conectividade devem combinar cor, texto e ícone. Exemplos:

- `Confirmado`: `success` + ícone de confirmação.
- `Pendente`: `warning` + ícone de atenção.
- `Cancelado`: `danger` + ícone de cancelamento.
- `Offline`: `warning` ou `primary` + mensagem clara e ação `Tentar novamente`.
- `Manutenção`: `primary` ou `brand` para destaque controlado, com previsão de retorno quando disponível.

Mensagens de erro devem ser objetivas, não técnicas e orientar a próxima ação. Nunca esconda uma falha apenas usando uma mudança de cor.

## 8. Layout e Componentes

- Fundo de aplicação: `background`.
- Superfícies: `surface`, com borda fina e raio discreto de até 8px.
- Espaçamento: usar uma escala consistente baseada em múltiplos de 4px.
- Tipografia: priorizar legibilidade, hierarquia clara e tamanho mínimo confortável em dispositivos móveis.
- Ícones: usar Lucide React; ícones de ação devem ter `aria-label` ou texto visível.
- Formulários: labels persistentes, mensagens de validação próximas ao campo e estados de foco visíveis.
- Sombras: leves e funcionais, apenas para separar uma superfície do fundo.

## 9. Exemplos de Classes Tailwind

```html
<button class="bg-brand text-surface hover:bg-rose-700 focus:ring-2 focus:ring-brand">
  Agendar horário
</button>

<article class="border-l-4 border-success bg-surface text-primary">
  <span class="text-success">Confirmado</span>
</article>

<div class="border-l-4 border-warning bg-surface text-primary">
  <span class="text-warning">Pendente</span>
</div>

<button class="bg-danger text-surface hover:bg-red-700">
  Cancelar agendamento
</button>

<div class="h-1 overflow-hidden bg-background">
  <div class="h-full w-2/3 bg-loading"></div>
</div>
```

## 10. Checklist de Implementação

- [ ] Toda ação crítica possui estado de foco e feedback após a execução.
- [ ] Estados não dependem apenas de cor.
- [ ] Cards da agenda diferenciam confirmado, pendente, cancelado e bloqueado.
- [ ] Modais destrutivos usam `danger` e explicam a consequência.
- [ ] Operações assíncronas usam `loading` e texto de status quando necessário.
- [ ] Conteúdo offline deixa claro o que está apenas sincronizado localmente.
- [ ] Contraste, teclado, leitura por leitor de tela e tamanho dos alvos de toque foram verificados.
