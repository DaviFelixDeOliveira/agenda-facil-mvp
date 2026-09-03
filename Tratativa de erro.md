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
* **O que acontece:** O sistema envia um código de 6 dígitos para o e-mail informado e solicita a digitação para validar o cadastro. O código pode ser solicitado no máximo 3 vezes consecutivas. Após o limite, o envio fica bloqueado por 5 minutos.
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
  * **Marcar os checkboxes + Botão "Continuar":** Confirma o aceite e direciona para a Tela 5 *(O botão só é liberado após rolar a caixa de texto até o fim)*.
* **Mensagens de Erro / Validadores:**
  * *"Você precisa aceitar os Termos de Uso e a Política de Privacidade para continuar."*

---

### **Etapas do Onboarding (5 Passos no Total)**

#### **Tela 5: Passo 1 — Configure seu Perfil**
![Tela 5: Configure seu Perfil](C:/Users/Davi/RepositoriosGit/agenda-facil-mvp/Print%20das%20Telas/Telas%20de%20Configurar%20conta/8.1_Tela%20Configure%20seu%20perfil%20-%20Configure%20seu%20Perfil.png)
* **O que é:** Primeiras informações do estabelecimento.
* **O que acontece:** A profissional cadastra o Nome Completo, Foto de Perfil, Nome do Estúdio/Salão, Bio Profissional e WhatsApp.
* **Ajuste:** Não exibe opção de atendimento a domicílio nesta etapa. Ao preencher o nome do estúdio (ex: "Studio Bella"), gera o link da vitrine (`app.com/studio-bella`).
* **Ações do Usuário:**
  * **Preencher campos + Botão "Avançar":** Salva na tabela `tenants` e direciona para a Tela 6.
* **Mensagens de Erro / Validadores:**
  * *"O nome do estabelecimento é obrigatório."*
  * *"Número de WhatsApp inválido."*
  * *"Número de WhatsApp já cadastrado."*

---

#### **Tela 6: Passo 2 — Configure sua Agenda**
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

#### **Tela 7: Passo 3 — Locais de Atendimento**
*(Nova Etapa Dedicada - Passo 3 de 5)*
* **O que é:** Definição da modalidade e endereço de atendimento.
* **O que acontece:** Escolha da modalidade: **"Apenas no Salão"**, **"Apenas a Domicílio"** ou **"Ambos"**.
* **Ações do Usuário:**
  * **Se selecionar Salão (ou Ambos):** Exibe campos de Rua/Logradouro, Número, Complemento (Opcional), Bairro, Cidade (input de texto), Estado (`<select>`) e CEP.
  * **Se selecionar Domicílio (ou Ambos):** Exibe campos opcionais para Taxa de Deslocamento (R$) e Regiões/Bairros Atendidos (área de texto).
  * **Botão "Avançar":** Salva os dados na tabela `tenants` e direciona para a Tela 8.
* **Mensagens de Erro / Validadores:**
  * *"Preencha o endereço completo do salão."*

---

#### **Tela 8: Passo 4 — Cadastre seus Serviços**
![Tela 8: Cadastre seus Serviços](C:/Users/Davi/RepositoriosGit/agenda-facil-mvp/Print%20das%20Telas/Telas%20de%20Configurar%20conta/8.3_Tela%20Configure%20seu%20Perfil%20-%20Seus%20Serviços.png)
* **O que é:** Montagem do catálogo de serviços.
* **O que acontece:** Seleção da categoria (Unhas, Cabelo, Sobrancelhas, Depilação/Estética e Maquiagem). Permite selecionar pré-existentes ou criar do zero (Nome, Observação, Preço e Duração).
* **Regras de Negócio de Serviços:**
  * Cada serviço traz uma **imagem pré-selecionada ilustrativa** da sua categoria.
  * Contém a chave seletora (*toggle/checkbox*) **"Visível na Vitrine Pública"**.
  * Todos os serviços criados iniciam **PRÉ-SELECIONADOS COMO ATIVADOS** (`ativo = true`).
* **Ações do Usuário:**
  * **Selecionar/Criar serviços + Botão "Confirmar":** Salva na tabela `services` e direciona para a Tela 9.
* **Mensagens de Erro / Validadores:**
  * *"Informe o preço e a duração de todos os serviços selecionados."*
  * *"Cadastre pelo menos 1 serviço para continuar."*

---

#### **Tela 9: Passo 5 — Aparência do Sistema**
![Tela 9: Aparência do Sistema](C:/Users/Davi/RepositoriosGit/agenda-facil-mvp/Print%20das%20Telas/Telas%20de%20Configurar%20conta/8.4_Tela%20Configure%20seu%20Perfil%20-%20Tema.png)
* **O que é:** Escolha do tema visual da interface.
* **O que acontece:** Escolha entre Modo Claro, Modo Escuro ou Padrão do Sistema.
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
* Preencher e-mail e clicar em "Enviar código" para ir à Tela 13.

---

### **Tela 13: Verificar Código de Recuperação**
![Tela 13: Verificar Código](C:/Users/Davi/RepositoriosGit/agenda-facil-mvp/Print%20das%20Telas/Telas%20Iniciais/5_Tela%20de%20Verificar%20codigo.png)
* Digitar o código OTP de 6 dígitos enviado por e-mail para ir à Tela 14.

---

### **Tela 14: Criar Nova Senha**
![Tela 14: Criar Nova Senha](C:/Users/Davi/RepositoriosGit/agenda-facil-mvp/Print%20das%20Telas/Telas%20Iniciais/6_Tela%20de%20Criar%20nova%20senha.png)
* Digitar e confirmar a nova senha respeitando o validador dinâmico de segurança.

---

### **Tela 15: Dashboard Principal**
![Tela 15: Dashboard](C:/Users/Davi/RepositoriosGit/agenda-facil-mvp/Print%20das%20Telas/telas%20principais/Tela%20Dashboard/9_Tela%20Dashboard.png)
* **O que é:** Painel geral de operações.
* **O que acontece:**
  * Exibe os agendamentos do dia agrupados por status: **Confirmado**, **Pendente**, **Finalizado** e **Cancelado**.
  * **Botão "Compartilhar Link de Agenda":** Abre modal com QR Code, link por escrito e atalho de envio via WhatsApp.
  * **Botão "Novo Agendamento":** Abre modal para pré-reserva manual (Nome, WhatsApp, Serviços, Data/Hora, Sinal Pix e o campo opcional **`observacao`** [ex: *"Avisou que vai atrasar 10 min"*]). Ao salvar, gera o link único e a mensagem pronta para envio.

---

## 2. Fluxos nas Outras Telas do Sistema

### **Tela de Agenda (`/agenda`)**
* **Visualização Sem Mocks:** Renderização corrigida. Dias sem agendamentos exibem a tela limpa/vazia (removidos dados mockados).
* **Cabeçalho:** Botão **`+ Bloquear Horário`** que abre o modal de Bloqueio Manual para salvar na Tabela 5 (`blocked_times`). Campos: *Título/Motivo*, *Data/Hora Início*, *Data/Hora Fim* e chave *'Bloquear o dia todo / Resto do dia'*.
* **Padronização de Clique nos Cards:**
  * **Sem links diretos no card:** Removida qualquer navegação direta para `/clientes` ao clicar no nome do card da agenda.
  * **Card de Agendamento:** Qualquer clique abre **unicamente** o modal **'Detalhes do Agendamento'**.
  * **Card de Bloqueio/Saída (Tabela 5):** Clique abre modal do impedimento com botão **'Remover Bloqueio'**.
  * **Card de Pausa (Tabela 4):** Clique abre modal explicativo com link para `/configuracoes`.
* **Modal 'Detalhes do Agendamento':**
  * **Navegação Segura:** Contém o link/botão *'Ver perfil da cliente'*, que é a **única forma** de ser redirecionado para `/clientes?cliente=ID`.
  * **Exibição de Observações:** Bloco que exibe o texto da **`observacao`** específica daquele atendimento, se preenchido. Se estiver em branco, exibe opção *'Adicionar observação'*.
  * **Ações do Ciclo de Vida:** Botões de transição para **Confirmar**, **Concluir (Finalizado)**, **Cancelar** (com popup sobre devolução de sinal) e **Marcar No-Show**.

---

### **Tela de Clientes (`/clientes`) — CRM Simplificado**
* **Consolidação por WhatsApp:** O backend agrupa o histórico e as visitas do cliente pelo número de telefone (`clienteTelefone`).
* **Métricas Automáticas:**
  * **Total de Visitas:** Soma de atendimentos com `status = finalizado` associados ao telefone.
  * **Ticket Médio:** Valor total gasto dividido pelo número de visitas concluídas.
* **Notas Internas Fixas:** Campo de anotações permanentes da cliente (ex: *"Alérgica a esmalte X"*). As notas persistem e ficam acessíveis para todos os atendimentos futuros daquele telefone.

---

### **Tela de Financeiro (`/financeiro`)**
* **Recursos do MVP:** Exibição do faturamento total, ticket médio e gráfico de crescimento semanal.

---

### **Tela de Perfil (`/perfil`) & Portfólio**
* **Galeria de Trabalhos:** Campo `portfolioUrls` (`JSON/Array`) na Tabela 2 (`tenants`) armazenando mídias (Cloudflare R2 / AWS S3).
* **Validação de Limite:** Uploads validados pela API para respeitar o limite máximo de `20` arquivos (`limitePortfolioArquivos`). Exibição do carrossel/grade na vitrine pública.

---

### **Tela de Configurações (`/configuracoes`)**
* **Dados do Negócio:** Alteração de Foto, Nome do Negócio, Nome da Profissional, WhatsApp e Bio.
* **Local de Atendimento:** Permite editar a qualquer momento a modalidade (**"Apenas no Salão"**, **"Apenas a Domicílio"** ou **"Ambos"**), os dados de endereço do salão ou taxa/regiões de domicílio.
* **Meus Serviços:**
  * Gestão completa (CRUD: Criar, Editar, Excluir).
  * Lista de serviços com *toggle/checkbox* para visibilidade na vitrine pública.
  * Botão **"Selecionar Todos"** no topo para ativar ou desativar a visibilidade de todos os serviços simultaneamente.
* **Minha Agenda:** Gerenciamento das janelas de expedição semanal (`availability`).
* **Pagamento e Sinal Pix:** Regras do sinal e limite de cancelamento sem perda.
* **Sessão:** Botão **"Sair da Conta" (Logout)** que limpa a sessão/JWT e redireciona para a Tela 1.

---

## 3. Algoritmo de Busca de Horários Livres (Backend)

* **Local do Código:** `getAvailableSlots.ts` / `agendaController.js`
* **Regra do Intervalo (Passo Fixo de 30 min):** O cálculo **não deve saltar pela duração do serviço** (ex: de 60 em 60 min). O laço de verificação avança em um **passo fixo de 30 em 30 minutos** a partir do horário inicial do expediente, garantindo que os horários intermediários não desapareçam.
* **Fluxo de Execução:**
  1. A cliente seleciona o serviço na vitrine pública (ex: *Alongamento*, duração de 60 min).
  2. O backend busca na **Tabela 4 (`availability`)** as janelas de expediente para a data (ex: `09:00` às `19:00`).
  3. O backend executa o laço testando o início a cada 30 minutos (`09:00`, `09:30`, `10:00`, `10:30`...) e valida se a janela contínua atende à duração do serviço (60 min).
  4. **Cruzamento de Conflitos:** O algoritmo descarta qualquer slot que coincida com:
     * Agendamentos ativos na **Tabela 6 (`appointments`)** (desconsidera os cancelados).
     * Bloqueios manuais na **Tabela 5 (`blocked_times`)**.
  5. Retorna à vitrine pública apenas os horários livres validados.

---

## 4. Sinal Pix e Status Financeiro

* **Criação do Agendamento (Vitrine):** Ao solicitar uma reserva com taxa de sinal:
  1. O backend salva no campo `precoCobrado` o **valor total original do serviço**.
  2. O status inicial grava obrigatoriamente como `pendente`.
* **Confirmação:** Após a confirmação/validação do Pix, o status avança para `confirmado`.

---

## 5. Divisão de Tarefas de Desenvolvimento

### **1. O QUE DÁ PRA FAZER AGORA (Front-end, Layout e UX)**
* **Tela 2:** Adicionar ícone de olho (exibir/ocultar senha), campo Confirmar Senha e sanitização de e-mail (`.trim().toLowerCase()`).
* **Telas 3.1 e 13 (OTP):** Auto-tab nos inputs, suporte a `Ctrl+V` e cronômetro de 60s no reenviar.
* **Tela 5 (Passo 1):** Máscara de WhatsApp `(00) 00000-0000` e preview/validação da foto.
* **Tela 7 (Passo 3 - Locais):** Alternância dinâmica de formulário (Salão vs. Domicílio) e máscara de CEP `00000-000`.
* **Tela 8 (Passo 4 - Serviços):** Máscaras de moeda (`R$ 0,00`), seletor de duração, toggle "Visível na Vitrine" e imagens padrão por categoria.
* **Tela de Agenda (`/agenda`):**
  * Remover renderização de mocks em dias vazios.
  * Implementar o botão **`+ Bloquear Horário`** no topo.
  * Garantir clique único no card abrindo apenas o modal "Detalhes do Agendamento".
  * Adicionar bloco de exibição/edição do campo `observacao` dentro do modal.
* **Tela de Configurações -> Serviços:** Implementar botão **"Selecionar Todos"** para controle em lote da chave de visibilidade na vitrine.

---

### **2. O QUE NÃO DÁ PRA FAZER AGORA (Aguardando Backend e APIs)**
* **API ViaCEP:** Autopreenchimento de endereço pelo CEP.
* **Serviço de E-mail (SMTP/Resend):** Envio real de códigos OTP e e-mails de confirmação.
* **Banco de Dados & Regras de Negócio:**
  * Checagem de e-mail/WhatsApp único.
  * Trava de segurança OTP (bloqueio de 5 min após 3 erros).
  * Algoritmo `getAvailableSlots.ts` com o laço de teste a cada 30 min.
  * Upload de imagens para bucket S3/R2 com validação da trava de até 20 fotos no portfólio.
  * Cálculo dinâmico das métricas do CRM (total de visitas e ticket médio agrupados por WhatsApp).