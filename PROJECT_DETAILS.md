# **Beleza em Dia - Documento de Visão e Especificação do Sistema**

## **Resumo Executivo**

**Nome do Sistema:** Beleza em Dia

**Tipo de Sistema:** Plataforma Web/Mobile para Agendamento Online, Gestão Financeira e PDV voltada para profissionais e estabelecimentos de beleza.

**Público-Alvo:** Profissionais autônomos (manicures, cabelereiras, etc.), donos de salões de beleza e clientes finais que buscam agendar serviços.

**Problemas Resolvidos:**
- Perda de tempo em gerenciamento de agendamentos via WhatsApp
- Conflito de horários (dupla marcação no mesmo período)
- Cancelamentos sem aviso prévio (absenteísmo)
- Falta de controle financeiro e visibilidade de lucro
- Ausência de portfólio digital para divulgação de trabalhos
- Dificuldade na gestão de estoque de produtos

**Principais Funcionalidades:**
- Agendamento 24/7 sem necessidade de login obrigatório
- Notificações automáticas via WhatsApp
- Cobrança de sinal de confirmação via Pix
- Dashboard de Fluxo de Caixa
- Cadastro de Produtos e Controle de Estoque
- Pagamento antecipado (reduzindo riscos de cancelamento)


## **1. Visão Geral do Projeto**

### **1.1 Contexto**


O Beleza em Dia é uma plataforma digital multi-dispositivo (Web e Mobile) desenvolvida para otimizar a gestão de agendamentos em estabelecimentos de beleza. A solução permite que profissionais autônomos e proprietários de salões gerenciem sua agenda de forma centralizada, além de oferecer um portfólio digital para divulgação de serviços e trabalhos realizados através de fotos antes/depois e vídeos demonstrativos.

### **1.2 Problema**

Profissionais do segmento de beleza enfrentam desafios operacionais significativos:
- Gerenciamento manual de agendamentos via WhatsApp, consumindo tempo precioso
- Conflitos de horários causados por erros humanos (dupla marcação)
- Taxa elevada de cancelamentos sem aviso (absenteísmo), impactando a receita
- Falta de sistematização no controle financeiro e cálculo de lucro
- Ausência de ferramentas para divulgação profissional de trabalhos

### **1.3 Solução Proposta**

O Beleza em Dia oferece uma plataforma integrada que simplifica todo o fluxo de agendamento e gestão financeira:

**Para Clientes:**
- Acesso a um portfólio digital do profissional com fotos e vídeos de trabalhos anteriores
- Visualização de disponibilidade em tempo real
- Agendamento rápido sem necessidade de criar conta
- Confirmação de presença com pagamento de sinal via Pix
- Notificação automática de confirmação no WhatsApp

**Para Profissionais:**
- Gestão centralizada de agenda com bloqueio automático de horários ocupados
- Recebimento de notificações com dados completos do cliente
- Dashboard financeiro com histórico de receitas
- Controle de estoque para produtos vendidos
- Gestão de cancelamentos e confirmações

### **1.4 Tecnologias Utilizadas**

**Front-end & Interface**
- **Next.js (App Router):** Framework principal para rotas e renderização da aplicação
- **React.js:** Biblioteca JavaScript para construção de interfaces dinâmicas e responsivas
- **TypeScript:** Tipagem estática para componentes, dados e regras de negócio
- **Tailwind CSS:** Framework de estilização com abordagem Mobile First
- **Shadcn UI & Lucide React:** Biblioteca de componentes modernos (cards, modais, formulários) com ícones vetoriais
- **React Hook Form + Zod:** Gerenciamento eficiente de formulários com validação de dados em tempo real
- **Browser Image Compression:** Compressão e conversão automática de fotos para WebP no navegador antes do upload

**Back-end & Tempo Real**
- **Convex:** Banco de dados em tempo real com Queries, Mutations e Cron Jobs para funções de negócio, expiração de cobranças e tarefas agendadas

**Armazenamento de Mídia**
- **Cloudflare R2:** Armazenamento seguro de fotos de perfil, imagens de serviços, fotos de inspiração e vídeos do portfólio

**Comunicação & Integração**
- **WhatsApp Business API (wa.me):** Notificações automáticas de confirmação sem custo de API adicional
- **Resend:** Envio de e-mails transacionais (códigos de verificação e notificações)

**Pagamentos**
- **Mercado Pago:** Processamento de pagamento de sinal via Pix 

**Autenticação & Segurança**
- **Convex Auth:** Login e verificação OTP por código de 6 dígitos enviado por e-mail
- **Resend:** Serviço de e-mail transacional para códigos de verificação e notificações

**Formulários & Validação**
- **React Hook Form:** Gerenciamento eficiente de estados e performance em formulários
- **Zod:** Validação de schemas e regras de entrada de dados no front-end (ex: formato de e-mail e força da senha)


**Infraestrutura & DevOps**
- **Vercel:** Hospedagem do frontend e deployment contínuo integrado com GitHub
- **Convex Cloud:** Hospedagem do backend, banco de dados e funções Convex
- **GitHub:** Controle de versão e CI/CD


## **2. Perfil dos Usuários e Atores do Sistema**

A plataforma suporta dois perfis de usuários principais com fluxos de acesso e permissões distintos:

### **2.1 Profissional / Proprietário**

**Acesso:** Autenticado via login e senha

**Dados Cadastrais:**
- Nome e contato de acesso
- Telefone comercial (para contato de clientes)
- Endereço do estabelecimento ou indicação se atende em domicílio
- Categoria de serviços (manicure, pedicure, cabelo, etc.)

**Funcionalidades:**
- Upload de portfolio (fotos antes/depois e vídeos de trabalhos)
- Configuração da agenda com horários disponíveis
- Gerenciamento de horários bloqueados (almoço, pausa, manutenção)
- Recebimento de notificações no WhatsApp com dados do cliente agendado
- Confirmação ou cancelamento de agendamentos
- Acesso ao dashboard financeiro e histórico de atendimentos
- Gestão de produtos e estoque (opcional)

### **2.2 Cliente**

**Acesso:** Sem login obrigatório

**Fluxo de Navegação:**
1. Acessa a página do profissional através de link personalizado
2. Visualiza portfolio (fotos, vídeos e descrição de serviços)
3. Consulta agenda em tempo real
4. Seleciona data e horário disponível
5. Insere dados de contato (nome, telefone, endereço)
6. Realiza pagamento do sinal via Pix (opcional conforme política do profissional)
7. Recebe confirmação no WhatsApp com dados do profissional e informações necessárias (endereço do salão ou indicação de que será atendido em domicílio)




## **3. Escopo Funcional**

A plataforma é organizada em módulos funcionais independentes, permitindo configuração flexível conforme as necessidades do profissional:

### **Módulos Universais**

As capacidades abaixo são obrigatórias para todos os perfis de profissional:

- Agendamento público por link personalizado, sem login obrigatório para a cliente.
- Bloqueio automático e validação no servidor para impedir horários duplicados.
- Notificações e confirmações via WhatsApp usando `wa.me`.
- Histórico de clientes e atendimentos, independentemente do local ou tipo de agenda.

### **Módulos Configuráveis**

As opções abaixo devem ser ativadas, desativadas ou configuradas no painel do profissional:

- **Taxa de Sinal (Pix):** chave liga/desliga para exigir valor antecipado de reserva, com valor configurável. O padrão de referência da pesquisa é R$ 30,00.
- **Tipo de Agenda:** agenda fixa, baseada em grade semanal, ou agenda flexível, baseada na abertura de vagas conforme o tempo livre da profissional.
- **Local de Atendimento:** `No Salão/Espaço` ou `Atendimento Domiciliar`, com coleta de endereço quando necessário.

### **Módulos de Infraestrutura**

- **Manutenção Global:** tela e modo de manutenção acionáveis para contenção de erros críticos, atualizações ou falhas de segurança.
- **Offline/PWA:** alerta visual de falta de internet e cache local para consulta da agenda do dia e dados previamente sincronizados da cliente, sem confirmar operações críticas offline.

### **Módulo 1: Interface de Agendamento (Público)**

**Acesso Público via Link Personalizado**
- Cada profissional possui URL única (ex: sistema.com/nome-estabelecimento)
- Acesso via Web e Mobile sem necessidade de aplicativo ou login
- PWA (Progressive Web App) para instalação opcional na tela inicial

**Catálogo de Serviços**
- Listagem de serviços com preço, descrição e duração estimada
- Visualização de fotos e vídeos do portfolio
- Avaliações e histórico de clientes (opcional)

**Calendário Interativo**
- Exibição dinâmica de horários disponíveis
- Bloqueio automático de horários já agendados, com validação atômica no servidor para impedir double booking
- Visualização de horários bloqueados (pausa, almoço, indisponibilidade)
- Suporte a agenda fixa (grade semanal) e agenda flexível (vagas liberadas sob demanda)

**Agendamento Sem Fricção**
- Coleta mínima de dados (nome, telefone, endereço)
- Sem necessidade de criar conta ou login
- Confirmação de presença no ato do agendamento

**Pagamento do Sinal de Confirmação**
- Chave liga/desliga no painel para exigir ou dispensar o sinal
- Exibição de QR Code ou chave Pix para pagamento quando a cobrança estiver ativada
- Redução de taxa de cancelamento (absenteísmo)
- Valor configurável pelo profissional
- Cobrança com prazo de validade padrão de 30 minutos e cronômetro regressivo na interface
- Reserva temporária do horário com status `pendente_sinal` enquanto o pagamento aguarda confirmação
- Confirmação via webhook validado do gateway, alterando o agendamento para `confirmado`
- Expiração automática sem pagamento, alterando a cobrança para `expired` e liberando o horário

**Notificação Automática**
- Envio imediato de confirmação no WhatsApp do cliente via `wa.me`
- Dados do profissional e informações de localização

---

### **Módulo 2: Painel Administrativo (Profissional)**

**Autenticação Segura**
- Login com e-mail e senha
- Recuperação de senha via e-mail
- Suporte a autenticação de dois fatores (futuro)

**Gestão de Agenda**
- Visualização diária, semanal e mensal
- Confirmação/cancelamento de agendamentos
- Bloqueio de horários (almoço, pausa, manutenção)
- Liberação e bloqueio de vagas individuais para profissionais com agenda flexível
- Histórico de atendimentos e cancelamentos

**Cadastro e Gestão de Serviços**
- Adicionar, editar e remover serviços
- Definir duração, preço e descrição
- Categoria de serviço (manicure, pedicure, cabelo, etc.)
- Status de serviço ativo/inativo

**Gestão de Perfil e Portfolio**
- Upload de fotos antes/depois
- Upload de vídeos de demonstração
- Compressão e otimização de imagens no client-side antes do upload
- Limite total de 20 arquivos por profissional, somando fotos e vídeos
- Limite máximo de 5 MB por foto, com conversão automática para WebP antes do upload
- Limite máximo de 30 MB e 60 segundos por vídeo, com resolução recomendada de 1080p
- Limite configurável de fotos associadas a cada serviço
- Validação de formato, tamanho e dimensões antes do envio para o storage
- Edição de informações de contato
- Definição do local de atendimento: no salão/espaço ou domiciliar

**Dashboard de Desempenho**
- Total de agendamentos do período
- Taxa de comparecimento vs. cancelamento
- Receita total (atendimentos + produtos)
- Clientes recorrentes

**Telas Principais do Painel**
- `/dashboard`: visão geral da operação, agenda do dia e da semana, indicadores de desempenho e ações rápidas
- `/agenda`: gestão de disponibilidade, blocos de horários, agendamentos confirmados, pendentes e cancelados
- `/clientes`: histórico de clientes, recorrência, contatos, notas e ações de atendimento
- `/financeiro`: receitas, sinais, pagamentos, faturamento e relatórios financeiros
- `/perfil`: galeria de mídia, perfil público, informações da profissional e configurações de apresentação

**Configurações e Ajustes Complementares**
- `/configuracoes`: dados do estabelecimento, serviços, regras do sinal Pix, tipo de agenda, local de atendimento e grade horária padrão
- `/relatorios`: filtro semanal ou mensal, lucro total, atendimentos, desistências, cancelamentos e faltas

---

### **Módulo 3: Gestão Financeira & PDV (Opcional)**

**Nota de Escopo:** Este módulo é opcional e pode ser ativado/desativado nas configurações, adaptando a interface para diferentes modelos de negócio.

**Fluxo de Caixa**
- Dashboard com resumo de receitas do dia/semana/mês
- Detalhamento por tipo de receita (agendamentos, produtos, sinais)
- Relatório separado de taxas de sinal retidas por `No-Show` (cliente não compareceu) e taxas de sinal reembolsadas
- Identificação do sinal retido como receita sem execução de serviço, sem contabilizá-lo como atendimento concluído
- Histórico de transações com datas e valores

**Modalidades de Cobrança de Sinal**
- **Sinal antecipado:** cliente paga parte do valor via Pix; o restante é pago presencialmente após o serviço
- **Sem sinal:** agendamento sem cobrança online; pagamento integral presencial ao final
- **Pagamento integral antecipado:** cliente paga 100% do procedimento via Pix no momento da reserva
- A modalidade selecionada deve ser salva no agendamento para preservar o histórico mesmo que a configuração mude depois

**Registro de Vendas de Produtos**
- Faturamento rápido de produtos vendidos no balcão
- Integração com agendamentos existentes
- Aplicação de descontos e promoções

**Controle de Estoque**
- Cadastro de produtos com custo e preço de venda
- Atualização automática de quantidade após venda
- Alertas de baixo estoque
- Cálculo de margem de lucro por produto

**Relatórios de Lucro**
- Visualização de lucro líquido (receita - custo de produtos)
- Análise de produtos mais vendidos
- Rentabilidade por serviço/produto

---

### **Módulo 4: Gestão de Clientes & Histórico**

**Base de Dados de Clientes**
- Registro automático de clientes que agendaram
- Histórico completo de atendimentos
- Anotações sobre preferências e observações
- Identificação de clientes recorrentes

**Agendamentos Recorrentes**
- Opção de agendar clientes regulares automaticamente
- Lembrete de clientes que não agendaram há tempo

**Controle de Cancelamentos**
- Histórico de cancelamentos por cliente
- Motivos registrados (quando fornecidos)
- Sinais recebidos vs. atendimentos concluídos
- Política de cancelamento configurável, incluindo prazo mínimo para cancelamento sem perda do sinal
- Regra padrão sugerida: cancelamento sem perda do sinal até 24 horas antes do atendimento
- Reembolso, retenção ou perda do sinal registrados como eventos financeiros auditáveis

**Tolerância, Atrasos e Reagendamento**
- Configurar tolerância padrão de atraso de 15 minutos, com possibilidade de ajuste pelo profissional
- Exibir a política de atraso antes da confirmação do agendamento
- Permitir registrar a chegada da cliente e calcular o atraso em relação ao horário marcado
- Após o limite de tolerância, permitir marcar como `Atraso acima da tolerância`, `No-Show` ou `Reagendamento`, conforme a decisão do profissional
- Permitir reagendamento para outro horário disponível sem criar uma segunda reserva para o mesmo atendimento
- Manter o histórico do horário original, novo horário, motivo, autor e impacto sobre o sinal
- Evitar encaixar automaticamente atendimentos atrasados quando isso causar sobreposição ou atraso em cadeia

---

### **Módulo 5: Continuidade, Manutenção & Operação Offline**

**Modo de Manutenção**
- Permitir que administradores autorizados ativem e desativem o modo de manutenção manualmente
- Disponibilizar no painel administrativo um controle global `Ativar manutenção`, protegido por autenticação, autorização RBAC e confirmação da ação
- Solicitar motivo, tipo do incidente (`programada`, `falha crítica` ou `segurança`) e previsão de retorno antes da ativação
- Ao ativar, aplicar a flag global em todas as rotas públicas e administrativas, exceto a rota restrita de recuperação do administrador
- Exibir uma tela pública de manutenção com mensagem amigável, motivo opcional, previsão de retorno e canal de contato
- Permitir a ativação emergencial quando houver falha crítica, necessidade de correção imediata, atualização programada, incidente de segurança ou suspeita de tentativa de invasão
- Bloquear novos agendamentos, pagamentos e alterações de dados durante a manutenção, preservando apenas as operações explicitamente autorizadas
- Manter uma área administrativa restrita para consulta do status, acionamento emergencial e acompanhamento da recuperação
- Registrar em log quem ativou ou desativou o modo, quando ocorreu, motivo informado e duração do incidente
- Se o painel estiver indisponível, permitir acionamento emergencial por mecanismo de infraestrutura protegido, como variável de ambiente ou comando administrativo seguro
- Desativar somente após verificar integridade, segurança, disponibilidade das integrações e processamento de reservas pendentes

**Procedimento de Ativação**
1. Acessar a área administrativa com uma conta autorizada.
2. Abrir `Configurações > Manutenção`.
3. Clicar em `Ativar manutenção`.
4. Selecionar o tipo, informar o motivo e a previsão de retorno.
5. Confirmar a ativação.
6. Verificar se a tela pública está sendo exibida e se operações críticas foram bloqueadas.
7. Corrigir o problema, registrar as ações realizadas e testar o sistema em ambiente controlado.
8. Clicar em `Desativar manutenção` somente após a validação da recuperação.

**Tela de Offline**
- Detectar a indisponibilidade de internet ao abrir o aplicativo ou durante a navegação
- Exibir uma tela de offline com estado da conexão, instruções para tentar novamente e atualização automática quando a conexão retornar
- Disponibilizar, quando já estiverem armazenados no dispositivo, o perfil e os serviços consultados recentemente
- Exibir a agenda do profissional e os próximos agendamentos previamente sincronizados em modo somente leitura
- Permitir consultar dados essenciais do dia, como horários, nomes e telefones dos clientes já carregados
- Permitir registrar rascunhos locais de observações e alterações não críticas para sincronização posterior, informando claramente que ainda não foram enviados ao servidor
- Enfileirar operações compatíveis com segurança para sincronização automática após o retorno da conexão, com confirmação de sucesso ou indicação de conflito
- Não confirmar novos agendamentos, pagamentos Pix, cancelamentos ou alterações críticas enquanto o sistema estiver offline

---

### **Fluxo de Dados do Agendamento à Notificação**

1. A cliente acessa o link público e seleciona profissional, serviço, data e horário.
2. O sistema calcula a disponibilidade considerando duração do serviço, agenda fixa ou flexível, bloqueios, deslocamento domiciliar e tolerância configurada.
3. A cliente informa os dados mínimos e revisa preço, local, política de sinal, cancelamento e atraso.
4. O servidor revalida a disponibilidade e cria uma reserva atômica com chave idempotente.
5. Se a taxa de sinal estiver ativa, o sistema cria a cobrança Pix e mantém o agendamento como `Pendente` até receber confirmação do provedor.
6. Após a confirmação do agendamento, o sistema registra o evento, salva o histórico e dispara a notificação via WhatsApp.
7. O sistema agenda lembretes, quando configurados, e disponibiliza o link de cancelamento ou reagendamento conforme a política.
8. Falhas de pagamento ou notificação devem ser registradas sem apagar a reserva nem declarar uma operação não concluída como sucesso.

---

## **4. Requisitos Não-Funcionais**

### **4.1 Desempenho**

- **Tempo de Resposta:** Páginas devem carregar em menos de 3 segundos em conexão 4G
- **Disponibilidade:** Meta de 99.5% uptime em ambientes de produção
- **Modo de Manutenção:** O sistema deve permitir manutenção programada ou emergencial, com bloqueio controlado das operações e tela pública de status
- **Recuperação:** Após uma falha, o sistema deve permitir retorno seguro, validar a integridade dos dados e informar o restabelecimento do serviço
- **Escalabilidade:** Plataforma deve suportar crescimento de 10x em número de usuários sem degradação de performance
- **Otimização de Imagens:** Compressão automática de fotos e vídeos para reduzir consumo de banda

### **4.2 Usabilidade & Design**

- **Mobile First:** Interface otimizada primariamente para smartphones (telas de 5" a 6.5")
- **Acessibilidade:** Conformidade com WCAG 2.1 nível AA
- **Responsividade:** Suporte total para tablets e desktops
- **Simplicidade:** Fluxo de agendamento em máximo 3 cliques
- **Design System:** Uso consistente de componentes e padrão visual em toda plataforma

### **4.3 Segurança de Dados**

- **Criptografia de Dados em Trânsito:** Uso obrigatório de HTTPS/TLS 1.2+
- **Criptografia de Dados em Repouso:** Dados sensíveis (telefone, endereço) criptografados no banco de dados
- **Autenticação:** Implementação de autenticação segura com password hashing (bcrypt ou argon2)
- **Autorização:** Controle de acesso baseado em papéis (RBAC)
- **Conformidade:** Adequação às normas LGPD (Lei Geral de Proteção de Dados)
- **Backups:** Backup automático diário com retenção de 30 dias
- **Auditoria:** Log de todas as transações financeiras e alterações críticas

### **4.4 Confiabilidade**

- **Tratamento de Erros:** Mensagens de erro claras e não técnicas para usuários
- **Recuperação de Falhas:** Mecanismo automático de retry para operações críticas
- **Validação de Dados:** Validação em client-side e server-side
- **Integridade Referencial:** Impossibilidade de deletar dados com dependências
- **Operação Offline:** O PWA deve armazenar localmente apenas dados previamente sincronizados e não deve declarar como concluídas operações que dependam do servidor
- **Sincronização:** Alterações locais permitidas devem ser sincronizadas após o retorno da conexão, com tratamento de conflitos e indicação de falhas

### **4.5 Manutenibilidade**

- **Código Limpo:** Seguimento de padrões de código e convenções do projeto
- **Testes:** Cobertura mínima de 70% de testes unitários e de integração
- **Documentação:** Documentação técnica atualizada e README com instruções de setup
- **Versionamento:** Uso de semantic versioning para releases

### **4.6 Gestão de Mídia e Storage**

- **Otimização no Cliente:** Imagens devem ser redimensionadas e comprimidas antes do upload.
- **Limites:** O painel deve informar e aplicar limites de tamanho, formato, dimensões e quantidade de fotos por serviço e portfólio.
- **Storage:** Uploads devem usar URLs assinadas ou mecanismo equivalente; credenciais administrativas nunca podem chegar ao navegador.
- **Performance:** O sistema deve gerar ou solicitar versões adequadas para miniaturas, cards e visualização ampliada.

### **4.7 Critérios de Pronto para Demonstração do MVP**

- [ ] Profissional consegue criar perfil, serviço e configuração de agenda.
- [ ] Cliente agenda por link público sem criar conta.
- [ ] Agenda fixa e agenda flexível funcionam sem double booking.
- [ ] Taxa de sinal pode ser ativada, paga e validada antes da confirmação.
- [ ] Cancelamento, tolerância de 15 minutos e reagendamento estão funcionando.
- [ ] Cliente e profissional recebem confirmação ou erro compreensível.
- [ ] Histórico registra agendamento, pagamento, cancelamento, no-show e reagendamento.
- [ ] Fotos são comprimidas antes do upload e respeitam os limites configurados.
- [ ] Tela offline e modo de manutenção bloqueiam operações críticas corretamente.
- [ ] Fluxos principais foram testados em celular entre 320px e 412px.

---

## **5. Fluxo Principal de Uso**

### **5.1 Jornada do Cliente (Agendamento)**

```
1. DESCOBERTA
   ↓
   Cliente recebe link do profissional (WhatsApp, Instagram, Google)
   Acessa: https://sistema.com/nome-da-profissional
   
2. EXPLORAÇÃO
   ↓
   Visualiza portfolio (fotos antes/depois, vídeos)
   Consulta disponibilidade da agenda
   Verifica preços dos serviços
   
3. SELEÇÃO
   ↓
   Escolhe o serviço desejado (ex: Manicure Gel)
   Seleciona data e horário preferido
   Sistema confirma disponibilidade em tempo real
   
4. CONFIRMAÇÃO
   ↓
   Insere dados de contato (Nome, Telefone, Endereço)
   Opcionalmente realiza pagamento de sinal via Pix
   Confirma presença
   
5. NOTIFICAÇÃO
   ↓
   Sistema envia confirmação no WhatsApp do cliente
   Inclui dados do profissional, endereço e horário
   Opção de cancelamento com botão direto
   
6. EXECUÇÃO
   ↓
   Cliente comparece no horário agendado
   Serviço é realizado
   
7. PÓS-ATENDIMENTO
   ↓
   Profissional marca atendimento como concluído
   Cliente pode ser convidado a retornar
```

### **5.2 Jornada do Profissional (Gestão)**

```
1. PRIMEIRO ACESSO
   ↓
   Profissional acessa dashboard de admin
   Faz login com e-mail e senha
   Completa setup inicial (dados pessoais, serviços, agenda)
   
2. CONFIGURAÇÃO INICIAL
   ↓
   Cadastra serviços oferecidos (nome, preço, duração)
   Upload de portfolio (fotos, vídeos)
   Configura horários de disponibilidade
   Define dias de trabalho (seg-dom)
   
3. OPERAÇÃO DIÁRIA
   ↓
   Recebe notificação no WhatsApp de novos agendamentos
   Visualiza agenda do dia no painel
   Confirma ou cancela agendamentos conforme necessário
   Bloqueia horários para pausa/almoço
   
4. GESTÃO FINANCEIRA
   ↓
   Acessa dashboard de receitas
   Visualiza total do dia/semana/mês
   Acompanha sinais recebidos (Pix confirmados)
   
5. CONTROLE DE ESTOQUE (Opcional)
   ↓
   Registra venda de produtos no balcão
   Sistema atualiza estoque automaticamente
   Acompanha lucro (receita - custo)
   
6. RELACIONAMENTO
   ↓
   Consulta histórico de clientes
   Identifica clientes recorrentes
   Agendar clientes regulares automaticamente
```

---

## **6. Estratégia de Testes e Validação Piloto**

### **6.1 Fases de Teste**

#### **Fase 1: Testes Internos (Semana 1-2)**
- Testes de funcionalidade em todos os módulos
- Testes de usabilidade com pequeno grupo (5-10 pessoas)
- Validação de integração com WhatsApp e Pix
- Testes de performance e carga
- Verificação de segurança e LGPD

#### **Fase 2: Beta Piloto Aberto (Semana 3-4)**
- Recrutamento de 20-30 profissionais (manicures, cabelereiras, barbearias)
- Profissionais reais agendando clientes reais
- Coleta de feedback via Google Forms e entrevistas
- Monitoramento de bugs e crashes
- Análise de taxa de conclusão de agendamentos

#### **Fase 3: Refinamento (Semana 5-6)**
- Correção de bugs críticos
- Implementação de feedback prioritário
- Otimização de performance baseada em dados reais
- Preparação para lançamento público

### **6.2 Critérios de Sucesso (MVP)**

✅ **Funcional:**
- Agendamento completo sem erros em 95% das tentativas
- Notificação no WhatsApp recebida em menos de 5 segundos
- Pagamento de Pix processado corretamente

✅ **Usabilidade:**
- 80% dos clientes completam agendamento na primeira tentativa
- Profissionais conseguem usar painel sem treinamento
- Tempo médio de agendamento < 2 minutos

✅ **Negócio:**
- Taxa de comparecimento aumenta em pelo menos 20% (com sinal)
- Redução de tempo de gerenciamento de agenda em 80%
- Zero erros de dupla marcação

### **6.3 Métricas de Acompanhamento**

| Métrica | Meta | Ferramenta |
|---------|------|-----------|
| Tempo de carregamento | < 3s | Vercel Analytics |
| Taxa de erro | < 0.1% | Sentry |
| Taxa de conclusão de agendamento | > 80% | Google Analytics |
| NPS (Net Promoter Score) | > 50 | Feedback manual |
| Disponibilidade | > 99.5% | Uptime monitoring |
| Tempo suporte | < 24h | Ticket system |

### **6.4 Plano de Comunicação com Usuários Piloto**

- **Comunicação Pre-Launch:** E-mail com guia de uso, vídeo tutorial
- **Comunicação Durante:** Whatsapp group para dúvidas e feedback rápido
- **Comunicação Post:** Entrevista de feedback, questionário NPS
- **Iteração:** Atualizações semanais com correções baseadas em feedback

### **6.5 Plano de Migração para Produção**

1. **Aprovação:** Validação de todos os critérios de sucesso
2. **Infra:** Deploy em ambiente de produção com CDN global
3. **Preparação:** Documentação final, FAQ, suporte ativo
4. **Lançamento:** Abertura para novos usuários com capacidade graduada
5. **Monitoramento:** Alertas de erro, performance 24/7

---

## **Próximas Etapas**

1. ✅ Documento de Visão aprovado
2. ✅ Modelagem inicial do banco documentada
3. ⏳ Design de wireframes e protótipos
4. ⏳ Desenvolvimento do MVP (Sprint Planning)
5. ⏳ Testes e validação piloto
6. ⏳ Lançamento em produção

---

**Documento versão 1.0 | Data: 2026-08-27**