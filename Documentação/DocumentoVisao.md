# Beleza em Dia - Documento de Visão e Especificação do Sistema

## Resumo Executivo

**Nome do Sistema:** Beleza em Dia

**Tipo de Sistema:** Plataforma Web/Mobile para Agendamento Online, Gestão Financeira e PDV voltada para profissionais e estabelecimentos de beleza.

**Público-Alvo:** Profissionais autônomos (manicures, cabelereiras, etc.), donos de salões de beleza e clientes finais que buscam agendar serviços.

### Problemas Resolvidos

- Perda de tempo em gerenciamento de agendamentos via WhatsApp
- Conflito de horários (dupla marcação no mesmo período)
- Cancelamentos sem aviso prévio (absenteísmo)
- Falta de controle financeiro e visibilidade de lucro
- Ausência de portfólio digital para divulgação de trabalhos
- Dificuldade na gestão de estoque de produtos

### Principais Funcionalidades

- Agendamento 24/7 sem necessidade de login obrigatório
- Contato e confirmações via WhatsApp com mensagens pré-preenchidas; envio totalmente automático só será considerado se houver integração oficial específica no futuro
- Cobrança de sinal de confirmação via Mercado Pago Checkout Pro
- Dashboard de Fluxo de Caixa
- Cadastro de Produtos e Controle de Estoque
- Pagamento antecipado (reduzindo riscos de cancelamento)

---

# 1. Visão Geral do Projeto

## 1.1 Contexto

O Beleza em Dia é uma plataforma digital multi-dispositivo (Web e Mobile) desenvolvida para otimizar a gestão de agendamentos em estabelecimentos de beleza. A solução permite que profissionais autônomos e proprietários de salões gerenciem sua agenda de forma centralizada, além de oferecer um portfólio digital para divulgação de serviços e trabalhos realizados através de fotos antes/depois e vídeos demonstrativos.

## 1.2 Problema

Profissionais do segmento de beleza enfrentam desafios operacionais significativos:

- Gerenciamento manual de agendamentos via WhatsApp, consumindo tempo precioso
- Conflitos de horários causados por erros humanos (dupla marcação)
- Taxa elevada de cancelamentos sem aviso (absenteísmo), impactando a receita
- Falta de sistematização no controle financeiro e cálculo de lucro
- Ausência de ferramentas para divulgação profissional de trabalhos

## 1.3 Solução Proposta

O Beleza em Dia oferece uma plataforma integrada que simplifica todo o fluxo de agendamento e gestão financeira:

### Para Clientes

- Acesso a um portfólio digital do profissional com fotos e vídeos de trabalhos anteriores
- Visualização de disponibilidade em tempo real
- Agendamento rápido sem necessidade de criar conta
- Confirmação da reserva com pagamento de sinal pelo Mercado Pago Checkout Pro, quando exigido
- Confirmação e contato via WhatsApp por mensagem pré-preenchida, sem prometer envio automático no fluxo básico atual

### Para Profissionais

- Gestão centralizada de agenda com bloqueio automático de horários ocupados
- Recebimento de notificações com dados completos do cliente
- Dashboard financeiro com histórico de receitas
- Controle de estoque para produtos vendidos
- Gestão de cancelamentos e confirmações

## 1.4 Tecnologias Utilizadas

### Front-end & Interface

- **Next.js (App Router):** Framework principal para rotas e renderização da aplicação
- **React.js:** Biblioteca JavaScript para construção de interfaces dinâmicas e responsivas
- **TypeScript:** Tipagem estática para componentes, dados e regras de negócio
- **Tailwind CSS:** Framework de estilização com abordagem Mobile First
- **Shadcn UI & Lucide React:** Biblioteca de componentes modernos (cards, modais, formulários) com ícones vetoriais
- **React Hook Form + Zod:** Gerenciamento eficiente de formulários com validação de dados em tempo real
- **Browser Image Compression:** Compressão e conversão automática de fotos para WebP no navegador antes do upload

### Back-end & Tempo Real

- **Convex:** Banco de dados em tempo real com Queries, Mutations e Cron Jobs para funções de negócio, expiração de cobranças e tarefas agendadas

### Armazenamento de Mídia

- **Cloudflare R2:** Armazenamento seguro de fotos de perfil, imagens de serviços, fotos de inspiração e vídeos do portfólio

### Comunicação & Integração

- **WhatsApp via wa.me:** abertura de conversa/mensagem pré-preenchida no WhatsApp da cliente ou profissional. wa.me não deve ser descrito como envio automático por API; o envio depende da interação do usuário, salvo se futuramente for integrada uma API oficial específica.
- **Resend:** Envio de e-mails transacionais (códigos de verificação e notificações)

### Pagamentos

- **Mercado Pago:** Checkout Pro + OAuth por profissional para pagamentos de sinal, confirmação de pagamento e reembolsos

### Autenticação & Segurança

- **Convex Auth:** autenticação da profissional por e-mail/senha e Google; código de 6 dígitos é usado para verificação de e-mail e recuperação quando aplicável, não como método principal de login
- **Resend:** Serviço de e-mail transacional para códigos de verificação e notificações

### Formulários & Validação

- **React Hook Form:** Gerenciamento eficiente de estados e performance em formulários
- **Zod:** Validação de schemas e regras de entrada de dados no front-end (ex: formato de e-mail e força da senha)

### Infraestrutura & DevOps

- **Vercel:** Hospedagem do frontend e deployment contínuo integrado com GitHub
- **Convex Cloud:** Hospedagem do backend, banco de dados e funções Convex
- **Modelagem SQL de Referência:** o arquivo SQL do projeto é usado como representação conceitual das entidades, campos, relacionamentos e restrições por ser uma sintaxe já conhecida pelo autor. Ele não é o banco oficial de produção e não implica uso de MySQL/Prisma. A implementação oficial deve traduzir essa modelagem para schemas, índices, queries e mutations do Convex.
- **GitHub:** Controle de versão e CI/CD

---

# 2. Perfil dos Usuários e Atores do Sistema

A plataforma suporta dois perfis de usuários principais com fluxos de acesso e permissões distintos:

## 2.1 Profissional / Proprietário

**Acesso:** Autenticado via login e senha

### Dados Cadastrais

- Nome e contato de acesso
- Telefone comercial (para contato de clientes)
- Endereço do estabelecimento ou indicação se atende em domicílio
- Categoria de serviços (manicure, pedicure, cabelo, etc.)

### Funcionalidades

- Upload de portfolio (fotos antes/depois e vídeos de trabalhos)
- Configuração da agenda com horários disponíveis
- Gerenciamento de horários bloqueados (almoço, pausa, manutenção)
- Recebimento de notificações no WhatsApp com dados do cliente agendado
- Confirmação ou cancelamento de agendamentos
- Acesso ao dashboard financeiro e histórico de atendimentos
- Gestão de produtos e estoque (opcional)

## 2.2 Cliente

**Acesso:** Sem login obrigatório

### Fluxo de Navegação

- Acessa a página do profissional através de link personalizado
- Visualiza portfolio (fotos, vídeos e descrição de serviços)
- Consulta agenda em tempo real
- Seleciona data e horário disponível
- Insere dados de contato (nome, telefone, endereço)
- Quando houver sinal, é direcionada ao Checkout Pro do Mercado Pago e realiza o pagamento; sem sinal, segue a confirmação simples
- Recebe confirmação no WhatsApp com dados do profissional e informações necessárias (endereço do salão ou indicação de que será atendido em domicílio)

---

# 3. Escopo Funcional

A plataforma é organizada em módulos funcionais independentes, permitindo configuração flexível conforme as necessidades do profissional:

## Módulos Universais

As capacidades abaixo são obrigatórias para todos os perfis de profissional:

- Agendamento público por link personalizado, sem login obrigatório para a cliente.
- Bloqueio automático e validação no servidor para impedir horários duplicados.
- Ações de contato e mensagens pré-preenchidas via WhatsApp usando wa.me, sem declarar envio automático por API.
- Histórico de clientes e atendimentos, independentemente do local ou tipo de agenda.

## Módulos Configuráveis

As opções abaixo devem ser ativadas, desativadas ou configuradas no painel do profissional:

- **Sinal antecipado via Mercado Pago:** chave liga/desliga para exigir valor antecipado de reserva, com valor fixo ou percentual configurável.
- **Tipo de Agenda:** agenda fixa, baseada em grade semanal, ou agenda flexível, baseada na abertura de vagas conforme o tempo livre da profissional.
- **Local de Atendimento:** No Salão/Espaço ou Atendimento Domiciliar, com coleta de endereço quando necessário.

## Módulos de Infraestrutura

- **Manutenção Global:** tela e modo de manutenção acionáveis para contenção de erros críticos, atualizações ou falhas de segurança.
- **Offline/PWA:** alerta visual de falta de internet e cache local para consulta da agenda do dia e dados previamente sincronizados da cliente, sem confirmar operações críticas offline.