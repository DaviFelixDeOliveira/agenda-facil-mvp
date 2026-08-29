# Beleza em Dia

O Beleza em Dia é uma plataforma web/mobile de agendamento online para profissionais autônomas, salões e espaços de beleza. O sistema permite que clientes consultem serviços e horários disponíveis por um link personalizado e façam agendamentos sem precisar criar uma conta.

O objetivo é reduzir o tempo gasto respondendo mensagens no WhatsApp, evitar conflitos de horários, diminuir faltas e cancelamentos e facilitar a gestão diária do negócio.

Pesquisa de campo de referência: 28/08/2026.

## Para Quem É

- Profissionais que atendem em salão ou espaço de beleza.
- Profissionais freelancers que trabalham sob demanda.
- Profissionais que realizam atendimento domiciliar.
- Salões que precisam organizar agenda, clientes, serviços e pagamentos.
- Clientes que desejam agendar de forma rápida, sem troca extensa de mensagens.

## Como Funciona

1. A profissional cria seu perfil, cadastra serviços e configura sua agenda.
2. O sistema gera um link público para divulgação no Instagram, WhatsApp ou outros canais.
3. A cliente acessa o link, escolhe um serviço, consulta a disponibilidade e seleciona um horário.
4. A cliente informa seus dados e revisa as informações do atendimento.
5. Se a taxa de sinal estiver ativa, realiza o pagamento antecipado via Pix.
6. O sistema valida a disponibilidade, confirma o agendamento e envia a notificação pelo WhatsApp.
7. A profissional acompanha a agenda, confirma atendimentos, registra cancelamentos e consulta o histórico.

## Principais Funcionalidades

### Agendamento Público

- Link personalizado para cada profissional ou estabelecimento.
- Agendamento 24/7 sem login obrigatório para a cliente.
- Catálogo de serviços com descrição, duração e preço.
- Calendário com horários disponíveis em tempo real.
- Bloqueio automático de horários ocupados.
- Proteção contra double booking, inclusive em acessos simultâneos.

### Tipos de Agenda

- **Agenda fixa:** grade semanal com dias e horários recorrentes.
- **Agenda flexível:** a profissional libera vagas específicas conforme seu tempo livre.
- Bloqueio rápido para pausas, compromissos, folgas, deslocamentos ou manutenção.

### Sinal via Pix

- Configuração liga/desliga no painel.
- Valor do sinal definido pela profissional, com referência de R$ 30,00 nas pesquisas.
- Agendamento permanece pendente até a confirmação real do pagamento.
- Registro de sinais recebidos, retidos e reembolsados.
- Relatório de sinal retido por `No-Show`, sem contabilizar como atendimento concluído.

### Cancelamento, Atraso e Reagendamento

- Política de cancelamento configurável.
- Regra padrão sugerida de cancelamento sem perda do sinal até 24 horas antes.
- Tolerância padrão de atraso de 15 minutos, ajustável pela profissional.
- Registro de atraso acima da tolerância, falta e reagendamento.
- Histórico da reserva original e do novo horário.

### Atendimento e Clientes

- Opção de atendimento `No Salão/Espaço` ou `Atendimento Domiciliar`.
- Coleta de endereço quando o atendimento exigir deslocamento.
- Histórico de clientes e atendimentos.
- Registro de preferências e observações.
- Identificação de clientes recorrentes.

### WhatsApp e Notificações

- Confirmações e lembretes para cliente e profissional.
- Links de contato usando `wa.me`.
- Para automação em segundo plano, integração planejada com a WhatsApp Business Platform ou um BSP compatível.

### Portfólio e Mídia

- Fotos de trabalhos, incluindo antes e depois.
- Vídeos demonstrativos.
- Compressão e redimensionamento de imagens antes do upload.
- Limites de tamanho, formato e quantidade de arquivos.
- Armazenamento em Cloudflare R2.

### Financeiro e PDV Opcional

- Fluxo de caixa por dia, semana e mês.
- Receitas de serviços, produtos e sinais.
- Registro de vendas no balcão.
- Controle de estoque e alertas de baixo estoque.
- Margem de lucro e relatórios de rentabilidade.

### Offline e Manutenção

- Tela de offline quando a internet cair.
- Cache local de dados previamente sincronizados, como agenda do dia e informações necessárias dos clientes.
- Consulta offline em modo somente leitura.
- Bloqueio de novos agendamentos, pagamentos e alterações críticas sem conexão.
- Modo de manutenção para correções urgentes, atualizações, falhas críticas ou incidentes de segurança.
- Tela pública de manutenção com status, motivo e previsão de retorno.
- Ativação administrativa em `Configurações > Manutenção`, com confirmação, motivo, previsão de retorno e registro de auditoria.
- Ativação emergencial por mecanismo protegido de infraestrutura caso o painel esteja indisponível.

## Regras Essenciais

- A confirmação final da disponibilidade acontece no servidor.
- Reservas são criadas de forma atômica e idempotente para impedir duplicidades.
- Pagamento iniciado não é considerado pagamento aprovado.
- Operações críticas não são confirmadas offline.
- Estados como pendente, confirmado, cancelado, concluído e não compareceu devem ficar visíveis.
- Estados da interface usam texto e ícones além das cores.
- Dados sensíveis e credenciais devem permanecer protegidos no servidor.

## Tecnologias Planejadas

- Next.js com App Router
- React.js
- TypeScript
- Tailwind CSS
- Shadcn UI e Lucide React
- React Hook Form e Zod
- Browser Image Compression para compressão e conversão WebP no frontend
- Convex com Queries, Mutations e Cron Jobs
- Convex Auth com verificação OTP por código de 6 dígitos via e-mail
- Cloudflare R2
- Mercado Pago API para Pix
- Resend para e-mails transacionais
- Vercel para frontend
- Convex Cloud para backend
- GitHub e CI/CD

## Documentação

- [PROJECT_DETAILS.md](PROJECT_DETAILS.md): visão completa, escopo, requisitos e estratégia de testes.
- [HISTORY_USER.md](HISTORY_USER.md): pesquisas de campo e decisões orientadas pelas usuárias.
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md): paleta, componentes, estados e regras visuais.
- [ENV_SETUP.md](ENV_SETUP.md): variáveis de ambiente, integrações, endpoints e webhooks.
- [skills/agendamento.md](skills/agendamento.md): regras do fluxo de agendamento.
- [skills/responsividade.md](skills/responsividade.md): regras Mobile First e layout responsivo.
- [DIAGRAM_DATABASE](DIAGRAM_DATABASE): modelagem inicial das entidades, campos e regras do banco.

## Estado Atual

O projeto está na fase de planejamento e documentação do MVP. As regras de negócio, os perfis de usuárias, o design system, as integrações previstas, a modelagem inicial e os critérios de aceite estão documentados. O próximo passo é criar e validar os wireframes, iniciar o protótipo visual e, depois, implementar a aplicação real.
