# Pesquisas de Campo e Histórias de Usuários

Este registro reúne as pesquisas de campo que devem orientar a arquitetura das regras de negócio do Beleza em Dia. Os relatos representam dois modelos de operação distintos: uma profissional com salão e agenda fixa e uma profissional freelancer que atende sob demanda, inclusive em domicílio.

## Usuária 1 - Com Salão e Agenda Fixa

**Fonte:** Dados extraídos do PDF da pesquisa "Pesquisa sobre Rotina e Agendamento em Salão/Espaço de Beleza", realizada em 28/08/2026.

**Perfil:** Manicure, pedicure e especialista em alongamentos, incluindo Fibra de Vidro e Gel.

**Dores identificadas:**

- Perde tempo respondendo mensagens no WhatsApp enquanto está atendendo.
- Lida com cancelamentos, faltas e furos de clientes em horários aleatórios.
- Precisa interromper o atendimento para negociar horários.
- Utiliza cobrança de sinal para reduzir o risco de não comparecimento.

**Necessidades de negócio:**

- Agenda baseada em uma grade semanal fixa.
- Link público para que a cliente consulte horários e agende sozinha.
- Lembretes automáticos e confirmação via WhatsApp.
- Taxa de sinal configurável, com Pix antecipado de R$ 30,00 neste caso.

**Diretriz arquitetural:** A taxa de sinal deve ser uma configuração ativável no painel, com valor editável e status de pagamento separado do status do agendamento. O sistema não deve tratar uma intenção de pagamento como sinal confirmado.

## Usuária 2 - Sem Salão, Domiciliar e Freelancer

**Fonte:** Entrevista direta estruturada.

**Resumo das respostas:**

- Responde clientes apenas nos intervalos entre atendimentos.
- Já marcou duas clientes no mesmo horário por falha no controle manual.
- Conquista clientes 100% por indicação, no modelo boca a boca.
- Acredita que o agendamento automático ajuda bastante, embora tenha o hábito de controlar manualmente.
- Considera a solução especialmente útil para quem atende em salão ou vai até a casa da cliente.
- Pagaria R$ 50,00 por mês se o sistema for eficaz.
- Indicou intenção de uso entre 7 e 8 em uma escala de 1 a 10.
- O trabalho não é sua prioridade total: concilia os atendimentos com afazeres domésticos e abre horários sob demanda.

**Necessidades de negócio:**

- Impedir tecnicamente qualquer agendamento duplo, inclusive em requisições simultâneas.
- Permitir liberar horários específicos conforme o tempo livre da profissional.
- Permitir bloquear horários rapidamente quando surgirem compromissos pessoais ou deslocamentos.
- Suportar atendimento domiciliar com endereço ou local definido no agendamento.

**Diretriz arquitetural:** A agenda deve oferecer um modo flexível, no qual a profissional publica vagas pontuais em vez de depender de uma grade semanal completa. A validação final de disponibilidade deve ser atômica no servidor, com operação idempotente e proteção contra double booking.

## Implicações para o MVP

- O agendamento público, a prevenção de conflitos, as notificações via WhatsApp e o histórico de clientes são capacidades universais.
- Taxa de sinal, tipo de agenda e local de atendimento devem ser configurações por profissional.
- O cadastro deve representar tanto um estabelecimento fixo quanto uma profissional sem salão.
- O painel deve permitir alternar entre agenda fixa e agenda flexível sem duplicar as regras centrais de disponibilidade.
- Métricas do MVP devem acompanhar redução de mensagens, cancelamentos, faltas e conflitos de horário.