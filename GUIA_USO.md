# Guia de Uso - Beleza em Dia

## Sobre este guia

Este documento explica como utilizar o Beleza em Dia, desde a criação da conta da profissional até o agendamento realizado pela cliente.

As telas descritas ainda estão em fase de protótipo. Quando o design visual estiver finalizado, as marcações de imagem deste guia poderão ser substituídas por capturas reais das telas.

> **Imagem futura:** inserir captura da tela correspondente aqui.

## 1. O que é o Beleza em Dia

O Beleza em Dia é uma plataforma de agendamento para profissionais autônomas, salões, espaços de beleza e atendimento domiciliar.

A profissional configura seus serviços e horários, divulga um link público e recebe agendamentos sem precisar negociar cada horário pelo WhatsApp. A cliente consulta a disponibilidade, escolhe o serviço e recebe a confirmação do atendimento.

O sistema também oferece portfólio, notificações, sinal Pix, histórico de clientes, relatórios, controle de atrasos, reagendamento, modo offline e modo de manutenção.

## 2. Perfis de Usuário

### Profissional

A profissional ou proprietária utiliza uma área administrativa protegida por login para:

- Configurar o perfil e o estabelecimento.
- Cadastrar categorias e serviços.
- Escolher agenda fixa ou flexível.
- Liberar e bloquear horários.
- Definir atendimento no salão, domiciliar ou ambos.
- Configurar sinal Pix, cancelamento e tolerância de atraso.
- Gerenciar portfólio de fotos e vídeos.
- Acompanhar agendamentos e clientes.
- Consultar relatórios financeiros e de desempenho.

### Cliente

A cliente acessa o perfil público por um link, sem precisar criar conta, para:

- Conhecer a profissional.
- Visualizar serviços e portfólio.
- Consultar datas e horários.
- Escolher um atendimento.
- Informar seus dados.
- Pagar o sinal Pix, quando exigido.
- Receber confirmação e lembretes.
- Cancelar ou solicitar reagendamento conforme a política definida.

## 3. Primeiro Acesso da Profissional

### 3.1 Criar uma conta

1. Acesse a tela inicial do Beleza em Dia.
2. Selecione `Criar minha conta`.
3. Informe nome, e-mail, telefone/WhatsApp e senha.
4. Aceite os termos necessários.
5. Confirme o e-mail ou telefone, quando solicitado.
6. Entre no painel administrativo.

A senha deve ser mantida em segurança. Nunca compartilhe credenciais ou chaves de integração.

> **Imagem futura:** inserir captura da tela de criação de conta.

### 3.2 Preencher os dados profissionais

Informe os dados que serão exibidos para as clientes:

- Nome profissional.
- Nome do salão, espaço ou marca.
- Foto de perfil.
- Número de WhatsApp.
- Categorias de atuação.
- Local de atendimento.

As categorias podem incluir manicure, pedicure, unhas, Fibra de Vidro, Gel, cabelos, sobrancelhas, estética, depilação e outras especialidades.

> **Imagem futura:** inserir captura da tela de dados profissionais e categorias.

### 3.3 Escolher o local de atendimento

Selecione uma das opções:

- `No Salão/Espaço`: informe o endereço do estabelecimento.
- `Atendimento Domiciliar`: informe que a profissional se desloca até a cliente.
- `Ambos`: ofereça as duas modalidades.

Quando necessário, o sistema solicitará o endereço da cliente durante o agendamento domiciliar.

### 3.4 Cadastrar serviços

Para cada serviço, informe:

- Nome do procedimento.
- Categoria.
- Descrição.
- Observações e restrições.
- Preço.
- Duração em minutos.
- Imagem do serviço.
- Status ativo ou inativo.
- Ordem de exibição.

A duração é importante porque determina quanto tempo será bloqueado na agenda. Um serviço de 90 minutos não deve ocupar apenas o horário inicial.

Serviços inativos ficam ocultos do perfil público, mas continuam preservados no histórico.

> **Imagem futura:** inserir captura da tela de cadastro de serviço.

### 3.5 Configurar a agenda

Escolha o modelo que combina com sua rotina:

#### Agenda fixa

Use uma grade semanal para repetir dias, horários e pausas. É indicada para profissionais que trabalham em horários regulares.

Configure:

- Dias de atendimento.
- Hora de início e fim.
- Intervalos de almoço ou descanso.
- Bloqueios recorrentes.

#### Agenda flexível

Abra horários pontuais apenas quando estiver disponível. É indicada para freelancers, profissionais domiciliares ou pessoas que conciliam os atendimentos com outras atividades.

Configure:

- Data específica.
- Horários disponíveis.
- Bloqueios para compromissos ou deslocamentos.
- Motivo do bloqueio, quando necessário.

> **Imagem futura:** inserir captura da configuração de agenda fixa e flexível.

### 3.6 Configurar cobrança

Escolha uma modalidade de cobrança:

- **Sinal antecipado:** a cliente paga uma parte via Pix e o restante presencialmente.
- **Sem sinal:** a cliente agenda sem pagamento online e paga tudo presencialmente.
- **Pagamento integral antecipado:** a cliente paga 100% do serviço via Pix.

Quando houver cobrança Pix, informe o valor aplicável e a chave Pix. A cobrança possui validade padrão de 30 minutos.

Também configure:

- Prazo para cancelamento sem perda do sinal. O padrão sugerido é 24 horas.
- Tolerância de atraso. O padrão sugerido é 15 minutos.
- Preferências de lembretes e notificações.

## 4. Telas da Profissional

O painel administrativo é organizado em cinco áreas principais.

### 4.1 Dashboard - `/dashboard`

É a tela usada no dia a dia para acompanhar a agenda.

Exibe:

- Agenda do dia e da semana.
- Dias passados bloqueados para seleção.
- Horários ocupados, disponíveis, pendentes e bloqueados.
- Nome da cliente.
- Serviço e duração.
- Status do atendimento.
- Indicadores de pendências e sinais.

Ações disponíveis:

- Confirmar agendamento.
- Cancelar agendamento.
- Marcar como concluído.
- Marcar como não compareceu.
- Registrar chegada.
- Identificar atraso acima da tolerância.
- Reagendar.
- Bloquear ou liberar horário.

> **Imagem futura:** inserir captura do dashboard e da agenda.

### 4.2 Agenda - `/agenda`

Use esta tela para acompanhar disponibilidade, horários, blocos, atrasos e status dos agendamentos.

É possível:
- visualizar a agenda por dia/semana
- confirmar, reagendar e cancelar agendamentos
- bloquear horários e pausas
- filtrar por status, cliente ou serviço

### 4.3 Clientes - `/clientes`

Use esta tela para consultar o histórico de clientes, contatos e recorrência.

É possível:
- ver clientes cadastrados
- acessar histórico de agendamentos
- registrar observações
- identificar clientes frequentes

### 4.4 Financeiro - `/financeiro`

Use esta tela para acompanhar receitas, pagamentos e faturamento do negócio.

É possível:
- visualizar receitas por período
- consultar sinais e pagamentos
- acompanhar cancelamentos e atrasos
- monitorar fluxo de caixa

### 4.5 Perfil e Portfólio - `/perfil`

Use esta tela para controlar a vitrine pública.

É possível:

- Alterar nome, foto e descrição.
- Editar categorias.
- Definir local de atendimento.
- Adicionar fotos e vídeos.
- Associar uma foto a um serviço.
- Reordenar a galeria.
- Excluir mídias.
- Visualizar uma prévia do perfil público.
- Copiar o link para divulgação.

Limites planejados:

- Máximo de 20 arquivos por profissional.
- Fotos com até 5 MB.
- Conversão de fotos para WebP antes do upload.
- Vídeos com até 30 MB.
- Vídeos com até 60 segundos.
- Resolução recomendada de 1080p.

> **Imagem futura:** inserir captura da galeria e da pré-visualização pública.

### 4.3 Relatórios - `/relatorios`

Use esta tela para acompanhar o desempenho do negócio.

Filtros:

- Semana.
- Mês.
- Período de referência.

Indicadores:

- Lucro total.
- Total de atendimentos.
- Cancelamentos.
- Desistências.
- Faltas e `No-Show`.
- Sinais recebidos.
- Sinais retidos por falta.
- Sinais reembolsados.

O sinal retido por `No-Show` deve aparecer como receita sem execução de serviço, separado dos atendimentos concluídos.

> **Imagem futura:** inserir captura da tela de relatórios.

### 4.4 Configurações - `/configuracoes`

Concentre nesta tela as regras do negócio:

- Dados do estabelecimento.
- Nome, foto, WhatsApp e endereço.
- Categorias profissionais.
- Serviços e procedimentos.
- Tipo de agenda.
- Grade semanal.
- Horários flexíveis.
- Pausas e bloqueios.
- Modalidade de cobrança.
- Valor e chave Pix.
- Prazo de cancelamento.
- Tolerância de atraso.
- Notificações.
- Ativação do PDV.
- Modo de manutenção.

Alterações importantes devem exibir confirmação e informar quando passam a valer.

> **Imagem futura:** inserir captura da tela de configurações.

## 5. Como a Cliente Faz um Agendamento

### 5.1 Acessar o perfil público

A cliente recebe o link da profissional por WhatsApp, Instagram, Google ou outro canal.

No perfil público, ela visualiza:

- Nome e foto da profissional.
- Categorias e especialidades.
- Portfólio.
- Local de atendimento.
- Serviços disponíveis.
- Botão de contato.
- Botão `Agendar horário`.

### 5.2 Escolher o serviço

A cliente seleciona um serviço ativo e consulta:

- Descrição.
- Observações.
- Duração.
- Preço.
- Imagem.

### 5.3 Escolher data e horário

O calendário mostra apenas horários compatíveis com:

- Tipo de agenda.
- Dia e expediente.
- Duração do serviço.
- Pausas e bloqueios.
- Outros agendamentos.
- Local de atendimento e deslocamento, quando aplicável.

O sistema revalida o horário antes da confirmação para impedir dupla marcação.

### 5.4 Informar os dados

A cliente informa:

- Nome.
- WhatsApp.
- Endereço, se o atendimento for domiciliar.
- Observações.
- Foto de referência opcional.

### 5.5 Revisar e pagar

Antes de confirmar, a cliente revisa serviço, horário, local, preço, política de cancelamento e tolerância de atraso.

Se houver Pix:

1. O sistema reserva temporariamente o horário.
2. O status fica `pendente_sinal`.
3. A cliente recebe QR Code e código Copia e Cola.
4. O cronômetro mostra 30 minutos restantes.
5. O status muda para confirmado após validação do pagamento.
6. Se o tempo acabar sem pagamento, a cobrança expira e o horário é liberado.

### 5.6 Receber a confirmação

Após a confirmação, a cliente visualiza os dados do atendimento e recebe a notificação pelo WhatsApp, conforme a integração disponível.

A confirmação deve informar:

- Serviço.
- Data e horário.
- Local.
- Valor e status do sinal.
- Política de cancelamento.
- Tolerância de atraso.
- Link para cancelar ou reagendar.

## 6. Cancelamento, Atraso e Reagendamento

### Cancelamento

A cliente ou a profissional pode cancelar conforme a política configurada. O sistema deve informar se haverá perda, retenção ou reembolso do sinal.

A regra padrão sugerida é permitir cancelamento sem perda do sinal até 24 horas antes do atendimento.

### Atraso

A tolerância padrão sugerida é de 15 minutos. A profissional registra a chegada e o sistema calcula o atraso.

Depois da tolerância, a profissional pode:

- Continuar o atendimento, se não houver impacto na agenda.
- Marcar atraso acima da tolerância.
- Reagendar.
- Marcar `No-Show`.

O sistema não deve encaixar automaticamente um atendimento atrasado se isso causar sobreposição ou atraso em cadeia.

### Reagendamento

O reagendamento deve:

- Verificar outro horário disponível.
- Preservar o histórico do horário original.
- Relacionar a nova reserva à anterior.
- Registrar motivo, autor e impacto no sinal.
- Nunca criar duas reservas para o mesmo atendimento.

## 7. WhatsApp e Notificações

O sistema pode usar `wa.me` para abrir uma conversa com mensagem preparada. Para envio automático em segundo plano, será necessária a WhatsApp Business Platform ou um provedor compatível.

As notificações podem incluir:

- Novo agendamento.
- Confirmação de pagamento.
- Confirmação do atendimento.
- Lembrete.
- Cancelamento.
- Reagendamento.

A profissional deve ter consentimento e configurações adequadas para o envio de mensagens.

## 8. Portfólio e Uploads

Antes do upload, as imagens devem ser compactadas e convertidas para WebP. O sistema deve mostrar o contador de uso, como `12/20 arquivos utilizados`.

Regras:

- Total de 20 arquivos por profissional, somando fotos e vídeos.
- Foto de até 5 MB.
- Vídeo de até 30 MB.
- Vídeo de até 60 segundos.
- Resolução recomendada de 1080p.
- Formato, tamanho e dimensões validados antes do envio.

## 9. Offline

Quando não houver internet:

- Mostrar o aviso `Você está sem conexão`.
- Permitir tentar novamente.
- Consultar dados previamente sincronizados.
- Mostrar a agenda do dia em modo somente leitura.
- Permitir rascunhos não críticos, deixando claro que não foram enviados.
- Bloquear novos agendamentos, pagamentos, cancelamentos e alterações críticas.

Quando a conexão voltar, alterações permitidas podem ser sincronizadas após nova validação. Conflitos devem ser informados ao usuário.

## 10. Modo de Manutenção

O modo de manutenção é usado para atualizações, falhas críticas, problemas técnicos ou incidentes de segurança.

### Ativar pelo painel

1. Acesse o painel com uma conta administrativa autorizada.
2. Abra `Configurações > Manutenção`.
3. Clique em `Ativar manutenção`.
4. Escolha o tipo da manutenção.
5. Informe o motivo e a previsão de retorno.
6. Confirme a ação.
7. Verifique a tela pública e os bloqueios.

Durante a manutenção:

- A cliente verá uma tela informando que o sistema está temporariamente indisponível.
- Novos agendamentos e pagamentos ficarão bloqueados.
- Alterações críticas ficarão bloqueadas.
- O administrador poderá acompanhar o status pela área restrita.

### Desativar

Depois de corrigir o problema:

1. Teste o login, agenda, pagamentos e notificações.
2. Confirme a integridade dos dados.
3. Acesse a área restrita de manutenção.
4. Clique em `Desativar manutenção`.
5. Verifique novamente o fluxo público.

Se o painel estiver indisponível, a equipe técnica poderá usar o mecanismo emergencial protegido definido na infraestrutura.

## 11. Estados do Sistema

Os principais estados são:

- `Pendente`: aguardando pagamento ou validação.
- `Confirmado`: reserva garantida.
- `Concluído`: atendimento realizado.
- `Cancelado`: reserva desfeita.
- `Não compareceu`: cliente não compareceu.
- `Atraso acima da tolerância`: chegada após o limite configurado.
- `Reagendamento`: atendimento transferido para outro horário.
- `Offline`: sem conexão com a internet.
- `Manutenção`: sistema temporariamente bloqueado para operação.

Cada estado deve aparecer com texto, ícone e cor. A cor nunca deve ser o único indicador.

## 12. Dúvidas Frequentes

### A cliente precisa criar uma conta?

Não. O agendamento público foi planejado para funcionar sem login da cliente.

### A profissional pode trabalhar sem salão?

Sim. Ela pode usar atendimento domiciliar e agenda flexível.

### O sistema impede duas clientes no mesmo horário?

Sim. A interface bloqueia horários ocupados e o servidor deve fazer uma validação atômica antes da confirmação.

### O Pix é obrigatório?

Não. A profissional pode escolher sinal antecipado, pagamento integral antecipado ou pagamento presencial sem sinal.

### O que acontece se o Pix não for pago em 30 minutos?

A cobrança expira, a reserva pendente é cancelada e o horário volta a ficar disponível.

### O que acontece quando a internet cai?

A aplicação exibe uma tela ou aviso offline. Dados previamente sincronizados podem ser consultados, mas operações críticas ficam bloqueadas.

### Quando usar o modo de manutenção?

Quando for necessário interromper o sistema para corrigir uma falha, realizar uma atualização ou conter um incidente de segurança.

## 13. Referências

- [README.md](README.md): visão geral do produto.
- [PROJECT_DETAILS.md](PROJECT_DETAILS.md): escopo e requisitos completos.
- [PROTOTYPE_PROMPT.md](PROTOTYPE_PROMPT.md): prompt para criação do protótipo.
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md): cores, componentes e estados visuais.
- [ENV_SETUP.md](ENV_SETUP.md): integrações e variáveis de ambiente.
- [DIAGRAM_DATABASE](DIAGRAM_DATABASE): referência da modelagem de dados.
- [skills/agendamento.md](skills/agendamento.md): regras do fluxo de agendamento.
- [skills/responsividade.md](skills/responsividade.md): regras de layout responsivo.
