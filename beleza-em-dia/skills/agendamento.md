# Skill de Agendamento

Regras para implementar, revisar ou alterar qualquer fluxo de agendamento do Beleza em Dia, incluindo calendário público, painel do profissional, confirmações, cancelamentos e sincronização.

## 1. Objetivo do Fluxo

O cliente deve conseguir encontrar um serviço, escolher um horário realmente disponível e enviar seus dados com o mínimo de etapas. O profissional deve visualizar a agenda com clareza e nunca receber dois agendamentos confirmados para o mesmo horário.

O fluxo deve ser mobile first, acessível e compatível com as regras de [responsividade](responsividade.md).

## 2. Fluxo Público do Cliente

A ordem padrão é:

1. Acessar o link público do profissional.
2. Visualizar nome, categoria, localização ou indicação de atendimento em domicílio.
3. Selecionar um serviço ativo.
4. Consultar a duração, o preço e os horários disponíveis.
5. Selecionar data e horário.
6. Informar nome, telefone e endereço quando necessário para o tipo de atendimento.
7. Revisar os dados do agendamento.
8. Pagar o sinal via Pix, quando exigido pelo profissional.
9. Receber a confirmação somente após a validação necessária.

Não exigir criação de conta do cliente para concluir um agendamento público.

## 3. Serviços

- Exibir apenas serviços ativos e disponíveis para agendamento.
- Mostrar nome, descrição, duração estimada e preço antes da seleção do horário.
- Usar a duração do serviço para reservar todos os intervalos necessários, não apenas o horário inicial.
- Impedir o agendamento quando o serviço estiver inativo, sem preço válido ou sem configuração de duração.
- Se o preço ou a duração mudar durante o fluxo, solicitar revisão antes de confirmar.

## 4. Disponibilidade e Calendário

- Exibir somente horários dentro dos dias e períodos de trabalho configurados.
- Respeitar horários bloqueados para almoço, pausa, manutenção, folga ou indisponibilidade.
- Considerar a duração completa do serviço ao calcular a disponibilidade.
- Não exibir como disponível um horário já reservado, cancelado sob regra que ainda mantenha bloqueio ou em processamento de confirmação.
- Mostrar a data e o fuso horário relevantes ao profissional e ao cliente.
- Impedir seleção de datas passadas.
- Informar claramente quando não houver horários disponíveis e oferecer outra data ou serviço quando aplicável.
- Atualizar a disponibilidade ao entrar na etapa de revisão e imediatamente antes da confirmação.

## 5. Prevenção de Dupla Marcação

A interface não é suficiente para garantir disponibilidade. A validação final deve ocorrer no servidor ou na transação responsável pela persistência.

- Revalidar o horário no momento da confirmação.
- Criar a reserva de forma atômica, com proteção contra duas requisições simultâneas.
- Usar identificador idempotente para impedir duplicidade causada por duplo clique, refresh ou retry.
- Se outro cliente reservar primeiro, rejeitar a operação atual e pedir que o cliente escolha outro horário.
- Nunca mostrar confirmação definitiva antes da resposta de sucesso da operação no servidor.
- Registrar data, horário, serviço e profissional usados na decisão de disponibilidade.

Mensagem sugerida quando o horário deixar de estar disponível:

> Esse horário acabou de ser reservado. Escolha outra opção disponível.

## 6. Estados do Agendamento

Todo agendamento deve ter um estado visível e uma transição controlada:

- `Pendente`: dados recebidos, aguardando validação ou pagamento do sinal.
- `Confirmado`: horário reservado com sucesso e requisitos atendidos.
- `Cancelado`: agendamento desfeito conforme as regras de cancelamento.
- `Concluído`: atendimento realizado pelo profissional.
- `Não compareceu`: atendimento não realizado por ausência do cliente.

- Exibir o estado com texto, ícone e cor; nunca depender apenas da cor.
- Não permitir transições inválidas, como `Cancelado` para `Confirmado` sem um novo fluxo de reserva.
- Informar ao cliente quando o agendamento estiver apenas pendente.
- Manter histórico de alterações de estado, autor, data e motivo quando houver.

## 7. Confirmação e Pagamento

- Exibir uma revisão final com profissional, serviço, data, horário, duração, preço, local e política de sinal.
- Suportar três modalidades: sinal antecipado com restante presencial, sem sinal com pagamento integral presencial e pagamento integral antecipado.
- Se houver cobrança Pix, manter o agendamento com `pendente_sinal` até a confirmação do pagamento pelo provedor.
- Dar ao cliente 30 minutos para concluir a cobrança Pix e exibir um cronômetro regressivo contínuo.
- Não considerar a abertura de um QR Code ou o redirecionamento ao pagamento como pagamento aprovado.
- Evitar criar múltiplas reservas quando o cliente retornar do provedor de Pix.
- Exibir confirmação do agendamento e instruções de cancelamento após a conclusão.
- Se o pagamento falhar ou expirar, informar o problema sem declarar o horário como confirmado.
- Ao expirar sem pagamento, alterar a cobrança para `expired`, cancelar a reserva pendente e liberar o horário.

## 8. Cancelamento e Alterações

- Permitir cancelamento conforme a política definida pelo profissional.
- Exigir confirmação antes de cancelar um agendamento confirmado.
- Exibir as consequências relevantes, como perda ou retenção do sinal, quando aplicável.
- Liberar o horário somente depois que o cancelamento for persistido com sucesso.
- Notificar o cliente e o profissional após cancelamentos confirmados.
- Não permitir alteração silenciosa de serviço, data, horário ou preço; tratar a mudança como revisão do agendamento.
- Registrar motivo de cancelamento quando fornecido, sem tornar o campo obrigatório para o cliente salvo regra de negócio explícita.

## 9. Painel do Profissional

- Oferecer visualização diária como padrão operacional.
- Permitir visualização semanal e mensal sem perder o acesso às ações principais.
- Destacar horário, cliente, serviço, duração, telefone e estado.
- Permitir confirmar, cancelar, concluir e marcar não comparecimento conforme permissões.
- Permitir bloquear horários com motivo opcional e período definido.
- Separar agendamentos cancelados e concluídos dos horários ativos.
- Atualizar a agenda após cada ação, preservando filtros e data selecionados.
- Restringir dados de clientes ao profissional ou usuário autorizado.

## 10. Offline e Falhas de Conexão

- Mostrar uma tela ou estado de offline quando a conexão cair.
- Permitir apenas a consulta de agendamentos previamente sincronizados.
- Não confirmar novos agendamentos, pagamentos, cancelamentos ou alterações críticas offline.
- Permitir rascunhos locais somente para informações não críticas, deixando claro que ainda não foram enviados.
- Ao reconectar, revalidar horários e permissões antes de sincronizar qualquer operação.
- Em caso de conflito, preservar o dado do servidor e informar o usuário com uma ação clara.
- Nunca exibir um rascunho local como agendamento confirmado.

## 11. Acessibilidade e Responsividade

- Projetar primeiro para telas de 320px a 412px.
- Manter botões, horários selecionáveis e ações com pelo menos 44px de altura.
- Organizar horários em uma lista ou grid que não exija zoom horizontal.
- Usar cards empilhados para agendamentos no mobile.
- Garantir foco visível e navegação por teclado no calendário, formulários e modais.
- Informar estados com texto além de `success`, `warning` ou `danger`.
- Associar mensagens de validação aos campos correspondentes.
- Manter ações de confirmação e cancelamento claramente distintas.

## 12. Checklist de Implementação

- [ ] O cliente consegue agendar sem criar conta.
- [ ] Serviços inativos não aparecem no catálogo.
- [ ] A duração completa do serviço é considerada.
- [ ] Horários bloqueados e já reservados não podem ser selecionados.
- [ ] A disponibilidade é revalidada no servidor antes da confirmação.
- [ ] Duplo clique, refresh e retry não criam duplicidades.
- [ ] O pagamento pendente não é tratado como confirmado.
- [ ] Todos os estados têm texto e transições válidas.
- [ ] Cancelamentos liberam o horário somente após persistência.
- [ ] Operações críticas são bloqueadas offline.
- [ ] A agenda permanece utilizável em telas pequenas e com teclado.
- [ ] O fluxo informa sucesso, falha, conflito e indisponibilidade de forma clara.
