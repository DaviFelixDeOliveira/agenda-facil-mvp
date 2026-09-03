# 🛠️ Documentação de Especificação e Fluxos — Beleza em Dia

---

## 1. Visão Geral das Telas e Fluxos de Acesso

### **Tela 1: Boas-Vindas**
![Tela 1: Boas-Vindas](C:/Users/Davi/RepositoriosGit/agenda-facil-mvp/Print%20das%20Telas/Telas%20Iniciais/1_Tela%20de%20Boas%20Vindas.png)
* **O que é:** Tela de apresentação do sistema Beleza em Dia.
* **O que acontece:** Apresenta os dois pontos de entrada principais da plataforma através de botões de ação.
* **Ações do Usuário:**
  * **Botão "Criar minha conta":** Direciona para a Tela 2.
  * **Botão "Já tenho uma conta / Entrar":** Direciona para a Tela 11.
* **Mensagens de Erro / Validadores:** Não aplicável.

---

### **Tela 2: Criar Minha Conta**
![Tela 2: Criar Minha Conta](C:/Users/Davi/RepositoriosGit/agenda-facil-mvp/Print%20das%20Telas/Telas%20Iniciais/2_Tela%20de%20Criar%20Minha%20Conta.png)
* **O que é:** Tela inicial do formulário de cadastro de novos usuários.
* **O que acontece:** A profissional escolhe criar a conta inserindo e-mail e senha ou autenticar via Google.
* **Ações do Usuário:**
  * **Preencher e-mail e senha + Botão "Criar minha conta":** Envia o código de verificação para o e-mail e direciona para a Tela 3.1.
  * **Botão "Entrar com Google":** Abre o fluxo OAuth do Google e direciona para a Tela 3.2.
  * **Link "Já tem uma conta? Entrar":** Direciona para a Tela 11.
* **Mensagens de Erro / Validadores:**
  * *"Formato de e-mail inválido."* (Exibido ao digitar um e-mail fora do padrão sem `@` ou domínio).
  * *"Este e-mail já está cadastrado."* (Verificação na tabela `users`).
  * **Validador Dinâmico de Senha** (Exibido em tempo real abaixo do campo):
    * [ ] Senha precisa ter letras *(Vermelho $\rightarrow$ Verde ao incluir pelo menos 1 letra)*
    * [ ] Senha precisa ter números *(Vermelho $\rightarrow$ Verde ao incluir pelo menos 1 número)*
    * [ ] Senha precisa ter 8 caracteres *(Vermelho $\rightarrow$ Verde ao atingir 8+ caracteres)*
    * *Nota: O botão de cadastro só é ativado quando todos os requisitos ficarem verdes e o campo "Confirmar Senha" coincidir.*

---

### **Tela 3.1: Envio do Código de Verificação (OTP)**
*(Imagem pendente de criação)*
* **O que é:** Tela de confirmação de segurança para cadastro via e-mail.
* **O que acontece:** O sistema envia um código de 6 dígitos para o e-mail informado e solicita a digitação para validar o cadastro. O código pode ser solicitado no máximo 3 vezes consecutivas. Após o limite, o envio fica blocked por 5 minutos.
* **Ações do Usuário:**
  * **Digitar o código de 6 dígitos:** Valida o e-mail e direciona para a Tela 4.
  * **Botão "Reenviar código":** Dispara um novo código OTP para o e-mail (liberado após cronômetro regressivo de 60 segundos).
* **Mensagens de Erro / Validadores:**
  * *"Código de verificação incorreto."*
  * *"O código expirou. Clique em reenviar para receber um novo."*
  * *"Muitas tentativas. Tente novamente após 4:59."*

---

### **Tela 3.2: Autenticação Google**
*(Janela nativa do Google)*
* **O que é:** Interface nativa da conta Google (OAuth 2.0).
* **O que acontece:** A profissional autoriza o acesso. O sistema resgata e-mail, ID do Google, nome e foto de perfil, direcionando para a Tela 4.
* **Ações do Usuário:**
  * **Selecionar conta do Google:** Autentica e avança para a Tela 4.
* **Mensagens de Erro / Validadores:**
  * *"Falha ao conectar com o Google. Tente novamente ou use e-mail e senha."*

---

### **Tela 4: Termos de Uso**
![Tela 4: Termos de Uso](C:/Users/Davi/RepositoriosGit/agenda-facil-mvp/Print%20das%20Telas/Telas%20Iniciais/7_Tela%20de%20Termos%20de%20Uso.png)
* **O que é:** Etapa de aceite legal obrigatório antes da criação da conta.
* **O que acontece:** A profissional lê e aceita os Termos de Serviço e a Política de Privacidade.
* **Ações do Usuário:**
  * **Marcar os checkboxes + Botão "Continuar":** Confirma o aceite e direciona para a Tela 5. *(O botão só é liberado após a rolar a caixa de texto até o fim)*.
* **Mensagens de Erro / Validadores:**
  * *"Você precisa aceitar os Termos de Uso e a Política de Privacidade para continuar."*

---

### **Tela 5: Passo 1 — Configure seu Perfil**
![Tela 5: Configure seu Perfil](C:/Users/Davi/RepositoriosGit/agenda-facil-mvp/Print%20das%20Telas/Telas%20de%20Configurar%20conta/8.1_Tela%20Configure%20seu%20perfil%20-%20Configure%20seu%20Perfil.png)
* **O que é:** Primeira etapa do assistente de configuração (Onboarding).
* **O que acontece:** A profissional cadastra o Nome Completo, Foto de Perfil, Nome do Estúdio/Salão, Bio Profissional e WhatsApp. Ao preencher o nome do estúdio (ex: "Studio Bella"), o sistema gera automaticamente o link da vitrine (ex: `app.com/studio-bella`).
* **Ações do Usuário:**
  * **Preencher campos + Botão "Avançar":** Salva na tabela `tenants` e direciona para a Tela 6.
* **Mensagens de Erro / Validadores:**
  * *"O nome do estabelecimento é obrigatório."*
  * *"Número de WhatsApp inválido."*
  * *"Número de WhatsApp já cadastrado."*

---

### **Tela 6: Passo 2 — Configure sua Agenda**
![Tela 6: Configure sua Agenda](C:/Users/Davi/RepositoriosGit/agenda-facil-mvp/Print%20das%20Telas/Telas%20de%20Configurar%20conta/8.2_Tela%20Configure%20seu%20Perfil%20-%20Agenda%20Fixa.png)
* **O que é:** Definição da rotina de trabalho.
* **O que acontece:** Escolha entre **Agenda Fixa** (Expediente contínuo ou Horários pontuais) e **Agenda Flexível** (Faixas de horário ou Combinar no WhatsApp).
* **Ações do Usuário:**
  * **Configurar horários + Botão "Avançar":** Salva na tabela `availability` e direciona para a Tela 7.
  * **Botão "Pular esta etapa":** Exibe aviso de que a agenda ficará fechada até ser configurada e avança para a Tela 7.
* **Mensagens de Erro / Validadores:**
  * *"O horário de término não pode ser anterior ao horário de início."*
  * *"Atenção: Sua agenda ficará fechada para clientes e você não poderá gerar agendamentos até configurar seus horários de trabalho."*

---

### **Tela 7: Passo 3 — Cadastre seus Serviços**
![Tela 7: Cadastre seus Serviços](C:/Users/Davi/RepositoriosGit/agenda-facil-mvp/Print%20das%20Telas/Telas%20de%20Configurar%20conta/8.3_Tela%20Configure%20seu%20Perfil%20-%20Seus%20Serviços.png)
* **O que é:** Montagem do catálogo de serviços prestados.
* **O que acontece:** Seleção da categoria (Unhas, Cabelo, Sobrancelhas, Depilação/Estética e Maquiagem). Permite selecionar serviços pré-existentes ou criar do zero (Nome, Observação, Preço e Duração em minutos). Cada serviço vem acompanhado de uma imagem ilustrativa padrão e ativado por padrão na vitrine (`ativo = true`).
* **Ações do Usuário:**
  * **Selecionar/Criar serviços + Botão "Confirmar":** Salva na tabela `services` e direciona para a Tela 8.
* **Mensagens de Erro / Validadores:**
  * *"Informe o preço e a duração de todos os serviços selecionados."*
  * *"Cadastre pelo menos 1 serviço para continuar."*

---

### **Tela 8: Passo 4 — Locais de Atendimento**
*(Imagem pendente de criação)*
* **O que é:** Definição da modalidade de atendimento.
* **O que acontece:** Escolha entre **"Apenas no Salão"**, **"Apenas a Domicílio"** ou **"Ambos"**.
* **Ações do Usuário:**
  * **Se selecionar Salão (ou Ambos):** Preencher Rua, Número, Complemento (Opcional), Bairro, Cidade, Estado e CEP.
  * **Se selecionar Domicílio (ou Ambos):** Preencher Taxa de Deslocamento (R$) opcional e Regiões/Bairros Atendidos.
  * **Botão "Avançar":** Salva os dados na tabela `tenants` e direciona para a Tela 9.
* **Mensagens de Erro / Validadores:**
  * *"Preencha o endereço completo do salão."*

---

### **Tela 9: Passo 5 — Aparência do Sistema**
![Tela 9: Aparência do Sistema](C:/Users/Davi/RepositoriosGit/agenda-facil-mvp/Print%20das%20Telas/Telas%20de%20Configurar%20conta/8.4_Tela%20Configure%20seu%20Perfil%20-%20Tema.png)
* **O que é:** Escolha do tema visual da interface.
* **O que acontece:** A profissional escolhe entre Modo Claro, Modo Escuro ou Padrão do Sistema.
* **Ações do Usuário:**
  * **Selecionar opção + Botão "Concluir":** Salva a preferência e direciona para a Tela 10.

---

### **Tela 10: Fim do Setup**
*(Imagem pendente de criação)*
* **O que é:** Confirmação de encerramento do Onboarding.
* **Ações do Usuário:**
  * **Botão "Ir para a Dashboard":** Redireciona para a Tela 15.

---

### **Tela 11: Já tenho uma conta (Login)**
![Tela 11: Já tenho uma conta](C:/Users/Davi/RepositoriosGit/agenda-facil-mvp/Print%20das%20Telas/Telas%20Iniciais/3_Tela%20de%20J%C3%A1%20tenho%20uma%20conta.png)
* **O que é:** Tela de autenticação para usuários cadastrados.
* **Ações do Usuário:**
  * **Preencher E-mail/Senha + Botão "Entrar":** Direciona para a Tela 15 (Dashboard).
  * **Botão "Entrar com Google":** Autentica via Google e direciona para a Tela 15.
  * **Link "Esqueci minha senha":** Direciona para a Tela 12.
* **Mensagens de Erro / Validadores:**
  * *"E-mail ou senha incorretos."*
  * *"Esta conta utiliza o login com o Google. Clique no botão 'Entrar com Google'."*

---

### **Tela 12: Esqueceu a Senha**
![Tela 12: Esqueceu a Senha](C:/Users/Davi/RepositoriosGit/agenda-facil-mvp/Print%20das%20Telas/Telas%20Iniciais/4_Tela%20de%20esqueceu%20a%20senha.png)
* **Ações do Usuário:** Preencher e-mail e clicar em "Enviar código" para ir à Tela 13.

---

### **Tela 13: Verificar Código de Recuperação**
![Tela 13: Verificar Código](C:/Users/Davi/RepositoriosGit/agenda-facil-mvp/Print%20das%20Telas/Telas%20Iniciais/5_Tela%20de%20Verificar%20codigo.png)
* **Ações do Usuário:** Digitar o código OTP de 6 dígitos enviado por e-mail para ser redirecionado à Tela 14.

---

### **Tela 14: Criar Nova Senha**
![Tela 14: Criar Nova Senha](C:/Users/Davi/RepositoriosGit/agenda-facil-mvp/Print%20das%20Telas/Telas%20Iniciais/6_Tela%20de%20Criar%20nova%20senha.png)
* **Ações do Usuário:** Digitar e confirmar a nova senha respeitando as validações dinâmicas de segurança.

---

## 2. Fluxos nas Outras Telas do Sistema

### **Dashboard Principal**
![Tela 15: Dashboard](C:/Users/Davi/RepositoriosGit/agenda-facil-mvp/Print%20das%20Telas/telas%20principais/Tela%20Dashboard/9_Tela%20Dashboard.png)
* **O que é:** Painel geral de operações.
* **O que acontece:**
  * Exibe os agendamentos do dia agrupados pelos status: **Confirmado**, **Pendente**, **Finalizado** e **Cancelado**.
  * **Botão "Compartilhar Link de Agenda":** Abre modal com QR Code, link por escrito e atalho de envio via WhatsApp com mensagem padrão.
  * **Botão "Novo Agendamento":** Abre modal para pré-reserva manual (Nome, WhatsApp, Serviços, Data/Hora e Valor do Sinal Pix). Ao salvar, gera o link único e o botão com o texto pronto para envio à cliente.

---


### **Tela de Agenda (`/agenda`)**
* **Visualização:** Calendário interativo com filtro por dia. Não exibe dados fakes/mockados em dias sem registros.
* **Botão `+ Bloquear Horário`:** Localizado no topo para registrar impedimentos (Tabela `blocked_times`).
* **Comportamento de Clique em Cards:**
  * **Clique no Card de Agendamento:** Abre o modal **"Detalhes do Agendamento"** (dados do atendimento e campo `observacao`).
    * **Ações do Modal (Ciclo de Vida):**
      * **Confirmar Agendamento:** Altera status de `Pendente` para `Confirmado`.
      * **Concluir Atendimento:** Altera status de `Confirmado` para `Finalizado`.
      * **Cancelar Agendamento:** Altera status para `Cancelado` (pergunta se haverá devolução de sinal).
      * **Marcar No-Show:** Registra o não comparecimento da cliente.
      * **Link "Ver perfil da cliente":** Redireciona para a ficha correspondente na tela `/clientes`.
  * **Clique no Card de Bloqueio:** Abre modal com opção de desativar/remover o bloqueio.
  * **Clique no Card de Pausa:** Exibe aviso explicativo com atalho para `/configuracoes`.

---

### **Tela de Clientes (`/clientes`)**
* **Recursos:**
  * Busca em tempo real por nome ou telefone/WhatsApp.
  * **Ficha da Cliente:** Exibe histórico agrupado de agendamentos (realizados, cancelados e no-shows).
  * **Edição de Perfil:** Permite alterar nome ou número do WhatsApp diretamente na ficha.
  * **Métricas da Cliente:** Exibe ticket médio total e data da última visita.
  * **Notas Internas:** Área de texto livre para anotações fixas que persistem em atendimentos futuros (ex: "Alérgica a esmalte X", "Gosta de café sem açúcar").

---

### **Tela de Financeiro (`/financeiro`)**
* **Recursos do MVP:** Exibição do faturamento total, ticket médio e gráfico de crescimento semanal.
* *(Nota: O histórico de transações recentes e filtro por tipo de pagamento foram postergados para versões futuras).*

---

### **Tela de Perfil (`/perfil`)**
* **Recursos:** Exibição de dados profissionais, gerenciamento de portfólio (limite de até 20 fotos hospedadas no Cloudflare R2 / AWS S3) e botão **"Ver Perfil Público"** (modo visualização).

---

### **Tela de Configurações (`/configuracoes`)**
* **Dados do Negócio:** Foto, Nome do Negócio, Nome da Profissional, Telefone/WhatsApp e Bio Profissional.
* **Pagamento e Sinal Pix:** Ativação/desativação da taxa de reserva antecipada, definição de cobrança (% ou valor fixo) e prazo limite de cancelamento sem perda.
* **Meus Serviços (CRUD Completo):**
  * **Editar:** Alterar preço, duração, observação e foto do serviço existente.
  * **Inativar/Ativar:** Toggle de visibilidade na vitrine pública (*toggle* individual e seletor "Selecionar Todos").
  * **Excluir:** Remover serviço do catálogo.
* **Agenda e Expediente / Minha Agenda:**
  * **Edição de Expediente:** Gerenciamento das janelas de disponibilidade semanal e alteração de rotinas de trabalho após o onboarding.
* **Local de Atendimento:** Configuração de Salão (com CEP), Domicílio e Taxa de Deslocamento.
* **Notificações:** Chaves para e-mails de novos agendamentos, cancelamentos e lembretes In-App/WhatsApp.
* **Segurança, Conta e Sessão:**
  * Método de acesso, redefinição de senha e Excluir Conta.
  * **Botão "Sair da Conta" (Logout):** Invalida o token JWT/sessão atual e redireciona o usuário para a **Tela 1 (Boas-Vindas)**.
* **Aparência do Painel:** Seleção de Tema (Claro, Escuro ou Padrão do Sistema).
* **Compartilhamento e QR Code:** Link público de agendamento e download do QR Code em PNG.

---

## 3. Algoritmo de Busca de Horários Livres (Backend)

* **Arquivo:** `getAvailableSlots.ts` / `agendaController.js`
* **Regra de Intervalo:** O laço de verificação deve avançar em um **passo fixo de 30 em 30 minutos** a partir do horário inicial do expediente, e não pelo tempo de duração do serviço.
* **Fluxo de Execução:**
  1. Cliente seleciona o serviço desejado na vitrine pública (ex: duração de 60 minutos).
  2. Backend obtém as janelas de trabalho cadastradas na Tabela `availability` para a data escolhida.
  3. Backend gera a grade de testes a cada 30 minutos (`09:00`, `09:30`, `10:00`, `10:30`...) e valida se cabe a duração total (60 min) do serviço selecionado.
  4. Backend descarta slots que colidam com agendamentos ativos na Tabela `appointments` ou bloqueios na Tabela `blocked_times`.
  5. Retorna à vitrine apenas os horários livres validados.

---

## 4. Divisão de Tarefas de Desenvolvimento

### **1. O QUE DÁ PRA FAZER AGORA (Front-end, Layout e UX)**

* **Tela 2 (Criar Minha Conta):**
  * Ícone de Olho: Adicionar o botão "exibir/ocultar senha".
  * Campo "Confirmar Senha": Incluir a confirmação de senha.
  * Sanitização de E-mail: Aplicar `.trim().toLowerCase()` no input.
* **Tela 3.1 e Tela 13 (Validação OTP):**
  * Auto-Tab: Foco automático para o próximo quadrado ao digitar um dígito.
  * Suporte a `Ctrl+V`: Permitir colar o código de 6 dígitos de uma vez só.
  * Cronômetro Regressivo: Desabilitar o botão "Reenviar código" por 60 segundos.
* **Tela 5 (Configure seu Perfil):**
  * Máscara de WhatsApp: Aplicar a máscara `(00) 00000-0000`.
  * Preview de Foto: Exibir prévia da imagem antes do envio.
  * Validação de Imagem: Alerta visual para imagens maiores que 5MB ou formatos incompatíveis.
* **Tela 6 (Configure sua Agenda):**
  * Aviso do botão "Pular": Exibir o modal/toast explicativo ao optar por pular a configuração.
* **Tela 7 (Cadastre seus Serviços):**
  * Máscara de Moeda: Formatação dinâmica para `R$ 0,00`.
  * Campo de Duração: Restringir a números inteiros com seletor/incremento de tempo.
* **Tela 8 (Locais de Atendimento):**
  * Máscara de CEP: Aplicar a máscara `00000-000`.
  * Campos Dinâmicos: Exibir formulário de Salão apenas se selecionar "Salão" ou "Ambos", e campos de Domicílio apenas se selecionar "Domicílio" ou "Ambos".
* **Tela 11 (Login):**
  * Desenhar e implementar o botão **"Entrar com Google"**.
* **Tela 14 (Criar Nova Senha):**
  * Reutilizar o componente visual do Validador Dinâmico de Senha.
* **Modais da Agenda e Clientes:**
  * Desenhar componentes visuais de transição de status (Confirmar, Concluir, Cancelar, No-Show) e formulário de edição da ficha do cliente.

---

### **2. O QUE NÃO DÁ PRA FAZER AGORA (Aguardando Backend e APIs)**

* **API de CEP (ViaCEP):** Preenchimento automático de endereço ao digitar o CEP.
* **Serviço de E-mail (SMTP / Resend):** Disparo real de e-mails transacionais e códigos OTP.
* **Validações no Banco de Dados:** Checagem de unicidade para e-mail (`users`) e WhatsApp (`tenants`).
* **Autenticação OAuth Google:** Janela de autenticação e retorno de tokens/dados do Google.
* **Trava de Segurança OTP:** Bloqueio de 5 minutos após 3 tentativas malsucedidas de envio.
* **Upload de Mídias:** Integração com bucket de armazenamento (S3 / R2 / Supabase Storage) para fotos de perfil e portfólio.
* **Persistência do Estado do Onboarding:** Salvamento do rascunho de progresso do usuário caso ele interrompa a configuração da conta.
* **Rotas de Invalidação de JWT / Logout:** Destruição do token de autenticação no servidor.