# Prompt para Prototipagem do Beleza em Dia

> Copie o conteúdo abaixo para a ferramenta de prototipagem.

Crie um protótipo navegável, responsivo e visualmente refinado para o sistema **Beleza em Dia**, uma plataforma de agendamento online para profissionais autônomas, salões, espaços de beleza e atendimento domiciliar.

## Objetivo desta etapa

Esta etapa é **somente um protótipo visual e funcional para testar o design das telas e os fluxos de navegação**.

Não implemente ainda:

- Banco de dados real.
- Backend ou API real.
- Autenticação real.
- Integração real com Next.js, Convex, Convex Auth, Pix, WhatsApp, Resend, Cloudflare R2, Vercel ou Convex Cloud.
- Pagamentos reais.
- Webhooks reais.
- Upload real de arquivos.
- Sincronização offline real.
- Regras de produção.

Use dados fictícios, estados simulados e interações locais apenas para demonstrar a experiência. O banco de dados descrito neste prompt serve exclusivamente como referência para organizar os conteúdos das telas e os estados da interface. **Não crie nem conecte o banco de dados nesta fase.**

O protótipo deve permitir avaliar:

- Clareza da navegação.
- Facilidade para a profissional configurar seu perfil.
- Facilidade para a cliente realizar um agendamento.
- Visualização da agenda.
- Compreensão dos estados de pagamento e agendamento.
- Uso em celulares pequenos, tablets e desktop.

## Identidade do produto

Nome: **Beleza em Dia**.

Proposta: permitir que clientes encontrem serviços, consultem horários e agendem sem precisar trocar várias mensagens no WhatsApp, enquanto a profissional gerencia agenda, serviços, portfólio, clientes e recebimentos em um único lugar.

Públicos:

- Profissional com salão e agenda fixa.
- Profissional freelancer sem salão.
- Profissional que atende em domicílio.
- Salões e espaços de beleza.
- Cliente final que deseja agendar rapidamente.

Problemas que o sistema resolve:

- Tempo perdido respondendo WhatsApp durante atendimentos.
- Dupla marcação de clientes no mesmo horário.
- Faltas e cancelamentos de última hora.
- Dificuldade para controlar horários disponíveis.
- Falta de um portfólio profissional.
- Falta de visibilidade sobre receitas e sinais.

## Direção visual

Crie uma interface minimalista, elegante, refinada e operacional. O sistema deve parecer confiável para uma profissional que usa a agenda todos os dias, sem aparência de landing page ou dashboard genérico.

### Ativos visuais e logo

A imagem da logo do produto foi anexada e deve ser usada como identidade visual principal do protótipo. A logo deve aparecer em:

- splash screen inicial de carregamento
- cabeçalho da página pública da cliente
- cabeçalho do painel administrativo
- elementos de identidade visual em onboarding e confirmação

A logo deve ser utilizada com boa proporção, sem distorção, sempre em fundo neutro e com contraste adequado. Se a composição exigir, use a marca em destaque na cor `brand` e mantenha o restante do layout em `background` e `surface` com visual limpo e premium.

### Estrutura das páginas

Estruture as telas de forma consistente e previsível, respeitando o contexto do usuário:

- Página pública da cliente: visual de app mobile, fluxo de aquisição e agendamento em ordem linear, com foco na conversão e leitura rápida.
- Onboarding da profissional: fluxo de cadastro em etapas sequenciais com progresso visual, campos claros e salvamento local entre etapas.
- Dashboard da profissional: layout de gestão com topbar, filtros, cards de resumo, lista de agenda e ações rápidas.
- Perfil e configurações: listas ou seções agrupadas por assunto, com formulário em blocos organizados e ações em contexto.
- Relatórios: cards de KPI, filtros temporais, gráficos simples e estados sem dados.
- Manutenção e offline: telas de estado com mensagem clara, CTA de ação ou leitura, sem esconder contexto crítico.

Cada página deve seguir uma base visual consistente:

1. Cabeçalho/Topbar com marca, ação principal e contexto da página.
2. Conteúdo principal em blocos organizados (cards, listas, formulários, agenda, galerias, resumo).
3. CTA ou ação principal na parte inferior ou no canto relevante, dependendo da tela.
4. Mensagens de status, alertas e toasts quando houver ação do usuário.
5. Estados vazios, carregamento, erro e confirmação sempre visíveis.

Prioridades visuais:

- Conteúdo escaneável.
- Hierarquia clara.
- Poucos elementos decorativos.
- Ações principais sempre fáceis de encontrar.
- Cards e superfícies organizados, sem excesso de sombras ou elementos flutuantes.
- Layout mobile first.
- Componentes consistentes entre área pública e painel administrativo.
- Ícones de ação usando Lucide Icons ou biblioteca equivalente.
- Não use roxo como cor dominante.
- Não use gradientes exagerados, blobs decorativos ou fundos carregados.
- Não faça uma página de marketing; o primeiro contato deve mostrar o produto funcionando.

## Diretrizes de layout por contexto

### Página pública da cliente (`/[slug]`)

A página pública da cliente deve ser desenvolvida com abordagem estritamente Mobile-First, priorizando a navegação em smartphones e o comportamento de um web app leve e direto, como se a pessoa chegasse via Instagram ou WhatsApp.

Regras específicas:

- Priorizar layout vertical em uma coluna, com leitura fluida e rápida em telas pequenas.
- Tratar a experiência como versão mobile-first para dispositivos com 320px a 412px, com foco em facilidade de leitura, clique e agendamento rápido.
- Usar espaçamentos compactos e densidade visual adequada ao uso em app web mobile, como `p-3`, `p-4`, `gap-2` e áreas de toque com altura mínima de 44px.
- Manter CTAs e ações principais sempre visíveis e acessíveis, sem depender de hover ou elementos escondidos por padrão.
- Organizar o fluxo em ordem natural: profissional, serviços, disponibilidade, dados do cliente, revisão e confirmação.
- Evitar excesso de blocos, painéis laterais ou páginas com muitos campos simultâneos em mobile.
- Em telas maiores, expandir para layout mais confortável sem perder a lógica da versão mobile.
- Ensinar o usuário de forma clara em poucos passos, com foco em conversão e agendamento sem fricção.
- Usar sticky sections ou botões de ação quando fizer sentido para manter contexto do agendamento, sem incomodar a leitura.
- Observar que o tráfego pode vir de Instagram/WhatsApp, então a experiência deve parecer imediata, direta e confiável em aparelho móvel.

### Painel da profissional (`/dashboard`, `/agenda`, `/clientes`, `/financeiro`, `/perfil`)

O painel da profissional deve ser totalmente responsivo e adaptar-se ao espaço disponível sem perder funcionalidade.

A navegação principal da profissional deve conter cinco áreas: Dashboard, Agenda, Clientes, Financeiro e Perfil.

Regras específicas:

- Em desktop, utilizar barra lateral fixa para navegação principal, com conteúdo principal ao lado.
- Em mobile, converter a navegação principal para menu inferior fixo (Bottom Navigation Bar) ou para menu hambúrguer, mantendo acesso rápido às áreas do sistema.
- A sidebar em desktop deve ser visualmente estável e fácil de navegar, com nome da área, ícones e destaque para a página ativa.
- No mobile, priorizar navegação por abas ou menu compacto, sem esconder ações importantes do fluxo principal.
- O layout deve quebrar em coluna única em telas pequenas e evoluir para grids mais amplos em tablets e desktop.
- Manter consistência visual entre as páginas do painel, usando cards, tabelas em formato de lista ou cards responsivos, e ações por contexto.
- Preservar leitura, foco e acessibilidade em todos os tamanhos de tela, incluindo teclado e navegação por foco visível.
- Em desktop, a composição deve explorar espaço lateral e visual de gestão, enquanto em mobile os blocos devem empilhar de forma natural e legível.

### Diretrizes de implementação em Next.js, Tailwind CSS e shadcn/ui

- Utilizar componentes reutilizáveis em Next.js App Router, com estrutura clara por rota e por estado visual.
- Construir interfaces com Tailwind CSS seguindo tokens definidos de design e escalas responsivas consistentes.
- Usar shadcn/ui como base para formulários, cards, diálogos, menus, toasts e componentes de navegação.
- Garantir que os componentes se adaptem ao contexto: mobile-first para a área pública e responsivo para o painel administrativo.
- Respeitar hierarquia visual, legibilidade e espaços mínimos de toque.
- Não criar layouts que dependam de hover para ações principais.
- Priorizar acessibilidade em todos os componentes, com foco visível, contraste adequado e labels claros.

## Paleta oficial

Use exatamente estes tokens de design:

- `primary`: `#111827` - preto charcoal para textos, títulos, navegação e ações neutras.
- `brand`: `#E11D48` - vermelho rose/batom para marca, ações principais, seleção e destaque.
- `background`: `#FAFAFA` - fundo geral off-white.
- `surface`: `#FFFFFF` - cards, formulários, menus e modais.
- `success`: `#10B981` - confirmado, concluído e pagamento aprovado.
- `warning`: `#F59E0B` - pendente, atenção e offline.
- `danger`: `#DC2626` - cancelamento, exclusão, falha e ação destrutiva.
- `loading`: `#E11D48` - carregamento, progresso e sincronização.

Regras de cor:

- Use `brand` para a ação primária de cada contexto, sem transformar todos os botões em destaque.
- Use `primary` para textos principais e controles neutros.
- Use `surface` sobre `background` para separar conteúdos.
- Use `success`, `warning` e `danger` com texto e ícone; nunca dependa somente da cor.
- Em fundos amarelos, use texto `primary` para manter boa legibilidade.
- Garanta contraste compatível com WCAG 2.1 AA.
- Use `danger` somente em ações destrutivas ou falhas reais.

## Tecnologias de referência

O protótipo deve simular a experiência que será implementada posteriormente com:

- Next.js com App Router.
- React.js.
- TypeScript.
- Tailwind CSS.
- Shadcn UI.
- Lucide React.
- React Hook Form.
- Zod.
- Browser Image Compression.
- Convex com Queries, Mutations e Cron Jobs.
- Convex Auth com verificação OTP por código de 6 dígitos via e-mail.
- Cloudflare R2.
- Mercado Pago API para Pix.
- WhatsApp Business Platform ou BSP compatível.
- Resend para e-mails transacionais.
- Vercel.
- Convex Cloud.
- GitHub e CI/CD.

Nesta etapa, essas tecnologias são apenas referências visuais e arquiteturais. Use mocks locais no protótipo.

## Fluxo da profissional: primeiro acesso

Crie um onboarding completo para a profissional:

1. Tela de boas-vindas com a marca Beleza em Dia e ação `Criar minha conta`.
2. Cadastro com nome, e-mail, telefone/WhatsApp e senha.
3. Tela simulada de confirmação de e-mail ou WhatsApp.
4. Dados profissionais:
   - Nome que será exibido.
   - Nome do salão, espaço ou marca.
   - Foto de perfil.
   - Categoria principal de atuação.
5. Seleção de categorias e áreas de trabalho:
   - Unhas.
   - Manicure.
   - Pedicure.
   - Alongamento em Fibra de Vidro.
   - Alongamento em Gel.
   - Cabelos.
   - Sobrancelhas.
   - Estética e Depilação.
   - Outras categorias.
6. Escolha do local de atendimento:
   - `No Salão/Espaço`.
   - `Atendimento Domiciliar`.
   - `Ambos`.
7. Caso use salão, formulário de endereço com rua, número, bairro, cidade e CEP.
8. Cadastro dos primeiros serviços:
   - Nome.
   - Categoria.
   - Descrição.
   - Observações e restrições.
   - Preço.
   - Duração em minutos.
   - Imagem do serviço.
   - Status ativo/inativo.
   - Ordem de exibição.
9. Configuração do tipo de agenda:
   - `Agenda fixa`: grade semanal com dias e horários recorrentes.
   - `Agenda flexível`: a profissional abre horários pontuais conforme seu tempo livre.
10. Configuração da grade semanal, expedientes, pausas e bloqueios.
11. Configuração do sinal:
   - Sinal antecipado.
   - Sem sinal, pagamento presencial.
   - Pagamento integral antecipado.
   - Valor do sinal.
   - Chave Pix.
   - Prazo de cancelamento sem perda do sinal.
   - Tolerância de atraso.
12. Upload simulado do portfólio.
13. Pré-visualização do perfil público.
14. Tela de conclusão com link público e botão `Copiar link do perfil`.

Exiba progresso do onboarding, validação de campos, estados de erro e possibilidade de voltar sem perder os dados preenchidos.

## Área pública da cliente

Crie uma experiência pública acessível por uma URL como `/studio-bia-nails`:

### Perfil público

- Foto e nome da profissional.
- Nome do salão ou marca.
- Categorias de atuação.
- Local de atendimento.
- Endereço do salão, quando aplicável.
- Botão de contato pelo WhatsApp.
- Galeria de portfólio.
- Serviços disponíveis.
- CTA `Agendar horário`.

### Catálogo de serviços

Cada serviço deve apresentar:

- Nome.
- Categoria.
- Imagem.
- Descrição.
- Observações.
- Duração.
- Preço.
- Botão de seleção.

Mostrar apenas serviços ativos.

### Escolha de data e horário

- Calendário com dias passados bloqueados.
- Agenda fixa ou horários flexíveis, conforme a configuração da profissional.
- Horários ocupados e bloqueados indisponíveis.
- Considerar a duração completa do serviço.
- Mostrar mensagem quando não houver horários.
- Atualizar a disponibilidade antes da confirmação.
- Mostrar horário selecionado com borda `brand`.

### Dados da cliente

Solicitar:

- Nome.
- WhatsApp.
- Endereço quando o atendimento for domiciliar.
- Observações do atendimento.
- Foto de referência opcional.

### Revisão e pagamento

Mostrar resumo com:

- Profissional.
- Serviço.
- Duração.
- Data.
- Horário.
- Local.
- Preço total.
- Modalidade de pagamento.
- Política de cancelamento.
- Tolerância de atraso.

Se houver cobrança Pix:

- Mostrar QR Code fictício.
- Mostrar código Copia e Cola fictício.
- Exibir cronômetro regressivo simulado de 30 minutos.
- Mostrar estado `Pendente`.
- Criar uma interação simulada de pagamento aprovado.
- Mostrar estado `Confirmado` após a aprovação simulada.
- Simular expiração com estado `expired`, cancelamento e liberação do horário.

Nunca exibir uma operação pendente como confirmada.

### Confirmação

Criar uma tela de sucesso com:

- Número ou identificador fictício do agendamento.
- Serviço, data, horário e local.
- Status do pagamento.
- Política de atraso e cancelamento.
- Botão de contato pelo WhatsApp.
- Ações simuladas de cancelar ou reagendar.

## Painel da profissional

A navegação principal deve ter quatro áreas:

### `/dashboard` - Dashboard e agenda

- Resumo da agenda do dia.
- Alternância entre dia e semana.
- Calendário com dias passados bloqueados.
- Lista de horários ocupados, disponíveis, bloqueados e pendentes.
- Cards de agendamento contendo horário, cliente, serviço, duração e status.
- Ações rápidas:
  - Confirmar.
  - Cancelar.
  - Marcar não compareceu.
  - Marcar concluído.
  - Registrar chegada.
  - Reagendar.
- Atalho para bloquear ou liberar data e horário.
- Indicadores de atendimentos, pendências e sinais.
- Estado vazio quando não houver atendimento.
- Estado offline e estado de manutenção.

### `/perfil` - Perfil público e portfólio

- Dados do perfil.
- Foto de perfil.
- Categorias profissionais.
- Local de atendimento.
- Galeria com contador, por exemplo `12/20 arquivos utilizados`.
- Limite total de 20 arquivos por profissional.
- Fotos de até 5 MB, convertidas para WebP no fluxo simulado.
- Vídeos de até 30 MB e 60 segundos.
- Resolução recomendada de vídeo: 1080p.
- Associação opcional de fotos a serviços.
- Reordenação da galeria.
- Exclusão com modal de confirmação.
- Pré-visualização da vitrine pública.
- Botão `Copiar link do perfil`.

### `/relatorios` - Relatórios e desempenho

- Filtro por semana ou mês.
- Exemplo de período: `Setembro de 2026`.
- Card `Lucro total`.
- Card `Total de atendimentos`.
- Card `Desistências e faltas`.
- Receita de atendimentos concluídos.
- Sinais recebidos.
- Sinais retidos por `No-Show`, identificados como receita sem execução de serviço.
- Sinais reembolsados.
- Cancelamentos prévios.
- Gráficos simples e fáceis de ler.
- Estados sem dados e filtros vazios.

### `/configuracoes` - Configurações

Organize as configurações em seções:

- Dados do estabelecimento.
- Nome, foto, WhatsApp e endereço.
- Categorias e procedimentos.
- Inclusão, edição, remoção e ordenação de serviços.
- Tipo de agenda fixa ou flexível.
- Grade semanal, expedientes e pausas.
- Bloqueios e liberações pontuais.
- Modalidade de cobrança:
  - Sinal antecipado.
  - Sem sinal presencial.
  - Pagamento integral antecipado.
- Valor do sinal.
- Chave Pix.
- Cancelamento sem perda do sinal, padrão sugerido de 24 horas.
- Tolerância de atraso, padrão sugerido de 15 minutos.
- Preferências de notificações.
- Ativação ou desativação do módulo PDV.

## Telas de manutenção e offline

Crie estados simulados para:

### Manutenção

- Tela pública informando que o sistema está temporariamente em manutenção.
- Motivo opcional.
- Previsão de retorno.
- Canal de contato.
- Área restrita para o administrador ativar e desativar o modo em `Configurações > Manutenção`.
- Modal de ativação solicitando tipo, motivo e previsão de retorno.
- Confirmação visual de que a manutenção foi ativada globalmente.
- Tela administrativa com status atual, horário de início, duração, responsável e botão de encerramento.
- Simulação de ativação emergencial para falha crítica ou incidente de segurança.
- Mensagem específica para falha crítica, atualização ou incidente de segurança.
- Bloqueio visual de agendamentos, pagamentos e alterações críticas.
- Simulação da validação final antes de desativar a manutenção.

### Offline

- Banner ou tela informando `Você está sem conexão`.
- Botão `Tentar novamente`.
- Atualização visual quando a conexão retornar.
- Consulta simulada da agenda do dia e dados previamente sincronizados.
- Estado somente leitura.
- Rascunho local simulado para observações não críticas.
- Aviso claro de que o rascunho ainda não foi enviado.
- Não permitir confirmar agendamento, pagamento ou cancelamento offline.

## Referência do banco de dados

O arquivo `DIAGRAM_DATABASE` descreve a modelagem planejada, mas não deve ser implementado agora. Use os dados abaixo apenas para criar conteúdos e estados coerentes no protótipo.

### `tenants`

Representa a profissional ou estabelecimento:

- Identificador.
- Slug público.
- Nome profissional.
- Nome do estabelecimento.
- WhatsApp.
- Verificação do WhatsApp.
- Tipo de atendimento: salão, domiciliar ou ambos.
- Endereço do salão.
- Tipo de agenda: fixa ou flexível.
- Modelo de cobrança.
- Valor do sinal e chave Pix.
- Prazo de cancelamento.
- Tolerância de atraso.
- Limite de portfólio.
- Foto de perfil.
- Módulo PDV ativo ou inativo.

### `services`

Representa os serviços:

- Profissional proprietária.
- Nome, descrição e observações.
- Preço.
- Duração.
- Categoria.
- Imagem padrão ou autoral.
- Status ativo/inativo.
- Ordem de exibição.

### `availability`

Representa a disponibilidade:

- Regra semanal.
- Data específica.
- Bloqueio.
- Janela contínua.
- Horários pontuais.
- Dia da semana.
- Data específica.
- Início, fim e pausas.
- Horários avulsos.
- Motivo do bloqueio.
- Origem padrão, manual ou sistema.

### `appointments`

Representa os agendamentos:

- Profissional.
- Serviço.
- Nome, WhatsApp e endereço da cliente.
- Observações e foto de referência.
- Data e hora inicial/final.
- Fuso horário.
- Status: pendente de sinal, confirmado, concluído, cancelado, não compareceu, atraso acima da tolerância ou reagendamento.
- Sinal pago.
- Modalidade de cobrança e valor preservados no momento da reserva.
- Chegada, minutos de atraso e horário original.
- Relação com reagendamento.
- Motivo.
- Chave idempotente contra duplicidade.

### `payments`

Representa cobranças Pix:

- Agendamento e profissional.
- Valor.
- ID do gateway.
- QR Code e Copia e Cola fictícios.
- Validade de 30 minutos.
- Status: pending, approved, rejected, expired ou refunded.
- Motivo do status.
- Datas de aprovação, expiração e webhook.
- ID do evento de webhook.

### `portfolio_media`

Representa fotos e vídeos:

- Profissional.
- Tipo.
- URL fictícia.
- Tamanho.
- Tipo MIME.
- Dimensões.
- Duração do vídeo.
- Legenda.
- Ordem.
- Serviço associado opcional.
- Data de criação.
- Limite total de 20 arquivos.

### `financial_events`

Representa eventos financeiros:

- Serviço.
- Produto.
- Sinal recebido.
- Sinal retido por no-show.
- Sinal reembolsado.
- Reembolso de pagamento integral.
- Valor, status, data e descrição.

## Regras de responsividade

Implemente Mobile First conforme `skills/responsividade.md`:

- Suporte prioritário para telas de 320px a 412px.
- Considerar aparelhos como Poco X6 de 6,67 polegadas e iPhones compactos.
- Espaçamentos compactos no mobile, como `p-3`, `p-4` e `gap-2`.
- Altura mínima de 44px para botões e controles clicáveis.
- Tabelas devem virar cards ou usar rolagem horizontal suave.
- Começar layouts com uma coluna.
- Usar grids progressivos em tablet e desktop.
- Em telas grandes, centralizar e limitar com `max-w-7xl`.
- Evitar larguras fixas em pixels.
- Preferir `w-full`, `max-w-*` e `min-w-0`.
- Usar tipografia adaptável como `text-sm sm:text-base`.
- Modais e drawers devem ocupar aproximadamente 90% da largura no mobile.
- Modais e drawers devem usar `max-h-[90vh] overflow-y-auto`.
- Não permitir sobreposição de textos, botões ou campos.
- Preservar navegação por teclado e foco visível.

## Regras de interação do protótipo

- Use dados fictícios realistas em português do Brasil.
- Simule loading, sucesso, erro, pendência, cancelamento, offline e manutenção.
- Use modais para ações destrutivas.
- Use toasts ou alertas claros após ações.
- Mostre estados vazios, estados de erro e estados de carregamento.
- Simule filtros de período e navegação de calendário.
- Simule troca entre agenda fixa e flexível.
- Simule aprovação e expiração do Pix sem chamar serviços externos.
- Simule upload e compressão sem enviar arquivos reais.
- Não esconda informações importantes apenas por falta de espaço.
- Use textos claros, curtos e não técnicos para clientes.

## Entregáveis do protótipo

Entregue:

1. Fluxo navegável de criação de conta e onboarding da profissional.
2. Perfil público da profissional.
3. Fluxo completo de agendamento da cliente.
4. Fluxo simulado de Pix pendente, aprovado e expirado.
5. Dashboard da profissional.
6. Perfil e portfólio.
7. Relatórios.
8. Configurações.
9. Estados offline e manutenção.
10. Versões responsivas para mobile e desktop.
11. Dados fictícios e interações locais.
12. Nenhum banco de dados ou integração real nesta fase.

O resultado deve servir como referência visual para que, posteriormente, o aplicativo real seja desenvolvido com a arquitetura, banco de dados, integrações e tecnologias descritas na documentação do projeto.
