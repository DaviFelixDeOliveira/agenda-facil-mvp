# Regras de Responsividade e Layout (Mobile First)

Aplica-se a todas as telas, componentes, modais e formulários desenvolvidos no projeto Beleza em Dia.

## 1. Dispositivos e Telas Suportadas

### Celulares Pequenos e Médios

Abrange telas de 320px a 412px, incluindo aparelhos como o Poco X6 de 6,67 polegadas e iPhones compactos.

- Usar espaçamentos compactos, como `p-3`, `p-4` e `gap-2`.
- Garantir altura mínima de 44px para botões e demais elementos clicáveis, facilitando o toque.
- Converter tabelas em cards empilhados quando possível.
- Quando a conversão não for adequada, envolver tabelas com `overflow-x-auto` para permitir rolagem horizontal suave.
- Evitar que textos, botões ou campos ultrapassem a largura da tela.

### Tablets e Notebooks

Abrange telas de 768px a 1440px.

- Fazer a transição progressiva de uma coluna para layouts em grid.
- Usar breakpoints do Tailwind para distribuir o conteúdo, por exemplo:

```html
<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  <!-- conteúdo responsivo -->
</div>
```

- Aproveitar o espaço adicional sem deixar os campos, cards ou linhas da agenda excessivamente largos.
- Manter hierarquia visual e espaçamento consistentes entre os breakpoints.

### Monitores Grandes

Abrange telas a partir de 1440px.

- Manter os contêineres centralizados.
- Limitar a largura máxima do conteúdo com `max-w-7xl` para evitar que a interface fique esticada.
- Usar o espaço excedente para respiro visual, sem aumentar indefinidamente a largura de tabelas ou formulários.

## 2. Boas Práticas de Código com Tailwind CSS

### Larguras

É proibido usar larguras fixas em pixels, como `w-[500px]`. Preferir larguras relativas combinadas com limites responsivos:

```html
<div class="w-full max-w-md">
  <!-- formulário ou conteúdo limitado -->
</div>
```

Usar `w-full`, `max-w-*`, `min-w-0` e grids flexíveis conforme a necessidade do componente.

### Tipografia

A tipografia deve se ajustar progressivamente aos tamanhos de tela, sem causar overflow:

```html
<h1 class="text-sm sm:text-base">Título responsivo</h1>
```

- Preferir classes responsivas, como `text-sm sm:text-base`.
- Garantir que títulos, labels e mensagens de validação caibam em seus contêineres.
- Usar quebras de linha naturais; não esconder conteúdo importante para resolver overflow.

### Modais e Gavetas

Modais e drawers devem ocupar 90% da largura da tela em dispositivos móveis e manter a rolagem dentro da própria superfície:

```html
<div class="w-[90vw] max-w-lg max-h-[90vh] overflow-y-auto">
  <!-- conteúdo do modal -->
</div>
```

- Usar `max-h-[90vh]` e `overflow-y-auto` para conteúdos maiores que a altura disponível.
- Manter cabeçalho e ações compreensíveis quando o conteúdo rolar.
- Garantir que botões e campos tenham pelo menos 44px de altura.
- Em telas maiores, limitar a largura com `max-w-lg` ou outro limite adequado ao conteúdo.
- Evitar rolagem horizontal em modais e drawers.

## 3. Formulários e Controles

- Organizar formulários em uma coluna no mobile e usar grids a partir de `md` quando houver ganho real de usabilidade.
- Usar `w-full` nos campos em telas pequenas.
- Manter labels visíveis e mensagens de validação próximas aos campos.
- Garantir que foco, erro, sucesso e desabilitado sejam perceptíveis por texto, ícone ou estilo além da cor.
- Não colocar ações essenciais apenas em menus difíceis de alcançar no mobile.

## 4. Agenda, Tabelas e Conteúdo Denso

- Priorizar cards empilhados para informações de agenda e tabelas em telas pequenas.
- Quando a tabela for indispensável, usar um contêiner com `overflow-x-auto` e preservar a leitura das colunas.
- Não forçar células a uma largura fixa que cause quebra ou corte de conteúdo.
- Manter ações de agendamento acessíveis e com área de toque mínima de 44px.
- Usar `min-w-0`, `truncate` ou quebra de linha somente quando o conteúdo completo continuar acessível.

## 5. Checklist de Implementação

- [ ] A tela foi projetada primeiro para 320px de largura.
- [ ] Botões e elementos clicáveis têm pelo menos 44px de altura.
- [ ] Não há larguras fixas em pixels desnecessárias.
- [ ] Tabelas viram cards ou usam `overflow-x-auto` no mobile.
- [ ] O grid evolui progressivamente de uma coluna para múltiplas colunas.
- [ ] Contêineres usam `max-w-7xl` em monitores grandes.
- [ ] Modais e drawers usam 90% da largura no mobile e `overflow-y-auto`.
- [ ] Títulos, textos e mensagens não ultrapassam seus contêineres.
- [ ] A navegação por teclado e o foco visível foram preservados.
