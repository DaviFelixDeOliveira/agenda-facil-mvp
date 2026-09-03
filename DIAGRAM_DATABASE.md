# 🗄️ Modelagem de Banco de Dados — Beleza em Dia (MVP)

---

### **Tabela 1: `users`**
*Esta tabela guarda estritamente os dados de autenticação e login de quem gerencia o salão.*

* **`id`** (`string` | PK): Identificador único gerado automaticamente pelo banco de dados (ex: UUID ou ObjectId).
* **`email`** (`string` | Único): E-mail da profissional usado para autenticação, login e recuperação de senha.
* **`senhaHash`** (`string` | Opcional): Senha criptografada com algoritmo seguro (bcrypt ou argon2). Pode ser nula caso o cadastro seja realizado via Google.
* **`googleId`** (`string` | Único | Opcional): Identificador único do provedor de autenticação caso a profissional utilize o "Continuar com o Google".
* **`criadoEm`** (`ISO Timestamp`): Data e hora exatas em que a conta foi criada no sistema (`now()`).

---

### **Tabela 2: `tenants`**
*Centraliza as configurações da profissional, a identidade do salão, o link público (slug), as regras de atendimento e os parâmetros do sinal Pix.*

* **`id`** (`string` | PK): Identificador único do estabelecimento.
* **`userId`** (`string` | Único | FK -> `users.id`): Chave estrangeira ligada à conta da profissional (relação 1:1 com `users`).
* **`slug`** (`string` | Único): URL personalizada da vitrine pública (ex: `studio-bia-nails`).
* **`nomeProfissional`** (`string`): Nome de exibição da profissional (ex: *"Beatriz Silva"*).
* **`nomeEstabelecimento`** (`string`): Nome comercial do espaço ou marca (ex: *"Studio Bia Nails"*).
* **`whatsapp`** (`string` | Único): Número principal com DDD para recebimento de avisos e contato.
* **`fotoPerfilUrl`** (`string` | Opcional): URL da imagem de perfil hospedada.
* **`tipoAtendimento`** (`enum`): Modalidade oferecida (`salao` | `domiciliar` | `ambos`).
* **`taxaDeslocamentoPadrao`** (`number` | Opcional): Valor fixo em Reais para atendimento a domicílio.
* **`regioesAtendidas`** (`string` | Opcional): Texto descritivo dos bairros/regiões atendidos.
* **`enderecoSalao`** (`JSON / Embedded Object` | Opcional): Endereço físico do espaço:
  * **`rua`**: `string`
  * **`numero`**: `string`
  * **`bairro`**: `string`
  * **`cidade`**: `string`
  * **`cep`**: `string`
  * **`complemento`**: `string` (opcional)
* **`modeloCobrancaSinal`** (`enum`): Regra de cobrança (`sinal_antecipado` | `sem_sinal_presencial` | `pagamento_integral_antecipado`).
* **`tipoValorSinal`** (`enum` | Opcional): Tipo do valor (`fixo` | `porcentagem`).
* **`valorSinal`** (`number` | Opcional): Valor do sinal (ex: `30.00` para R$ 30,00 ou `30` para 30%).
* **`chavePix`** (`string` | Opcional): Chave Pix para recebimento de taxas de reserva.
* **`prazoCancelamentoSemPerdaHoras`** (`number`): Antecedência mínima em horas para cancelamento sem perda do sinal (padrão: `24`).
* **`toleranciaAtrasoMinutos`** (`number`): Tempo limite em minutos de tolerância para atrasos (padrão: `15`).
* **`limitePortfolioArquivos`** (`number`): Limite máximo de mídias no portfólio (padrão: `20`).
* **`criadoEm`** (`ISO Timestamp`): Data e hora em que a conta do estabelecimento foi ativada.

---

### **Tabela 3: `services`**
*Armazena o catálogo de procedimentos oferecidos pela profissional, definindo preços e durações.*

* **`id`** (`string` | PK): Identificador único do serviço.
* **`tenantId`** (`string` | FK -> `tenants.id`): Vínculo com o estabelecimento.
* **`userId`** (`string` | FK -> `users.id`): Vínculo com a profissional.
* **`nome`** (`string`): Nome do procedimento.
* **`descricao`** (`string` | Opcional): Detalhes ou regras do atendimento.
* **`preco`** (`number`): Valor total em Reais (ex: `150.00`).
* **`duracaoMinutos`** (`number`): Tempo em minutos para cálculo da agenda.
* **`categoria`** (`string`): Categoria do serviço (ex: *"Unhas"*, *"Cabelos"*).
* **`imagemPadraoUrl`** (`string` | Opcional): Imagem genérica do sistema.
* **`imagemUrl`** (`string` | Opcional): Imagem enviada pela profissional.
* **`ativo`** (`boolean`): Visibilidade na vitrine (padrão: `true`).
* **`ordemExibicao`** (`number`): Posição numérica de ordenação.
* **`criadoEm`** (`ISO Timestamp`): Data de criação.

---

### **Tabela 4: `availability`**
*Define a grade de atendimento padrão da profissional para cada dia da semana.*

* **`id`** (`string` | PK): Identificador único da regra de disponibilidade.
* **`tenantId`** (`string` | FK -> `tenants.id`): Vínculo com o estabelecimento.
* **`userId`** (`string` | FK -> `users.id`): Vínculo com a profissional.
* **`diaSemana`** (`number`): Índice do dia (0 = Domingo, 1 = Segunda-feira, ..., 6 = Sábado).
* **`ativo`** (`boolean`): Chave seletora que define se atende no dia (padrão: `true`).
* **`janelas`** (`JSON / Array`): Blocos de horário de trabalho do dia.
  * *Exemplo simples:* `[{"inicio": "09:00", "fim": "19:00"}]`
  * *Exemplo com pausa:* `[{"inicio": "09:00", "fim": "12:00"}, {"inicio": "13:00", "fim": "19:00"}]`
* **`criadoEm`** (`ISO Timestamp`): Data de criação.

---

### **Tabela 5: `blocked_times`**
*Gerencia as exceções do calendário, como folgas pontuais, feriados, consultas médicas ou bloqueios manuais.*

* **`id`** (`string` | PK): Identificador único do bloqueio.
* **`tenantId`** (`string` | FK -> `tenants.id`): Vínculo com o estabelecimento.
* **`userId`** (`string` | FK -> `users.id`): Vínculo com a profissional.
* **`titulo`** (`string`): Justificativa do bloqueio ou saída (ex: *"Saída pessoal"*, *"Dentista"*).
* **`dataInicio`** (`ISO Timestamp`): Data e hora exatas de início da indisponibilidade.
* **`dataFim`** (`ISO Timestamp`): Data e hora exatas de término da indisponibilidade.
* **`diaTodo`** (`boolean`): Flag que define se encerra todo o expediente da data (padrão: `false`).
* **`criadoEm`** (`ISO Timestamp`): Data de criação do registro.

---

### **Tabela 6: `appointments`**
*Armazena os agendamentos das clientes e o histórico das transações.*

* **`id`** (`string` | PK): Identificador do agendamento.
* **`tenantId`** (`string` | FK -> `tenants.id`): Vínculo com o estabelecimento.
* **`userId`** (`string` | FK -> `users.id`): Vínculo com a profissional.
* **`clienteNome`** (`string`): Nome da cliente.
* **`clienteTelefone`** (`string`): WhatsApp para contato.
* **`servicoId`** (`string` | FK -> `services.id`): Serviço contratado.
* **`precoCobrado`** (`number`): Histórico do valor na data do agendamento.
* **`dataInicio`** (`ISO Timestamp`): Hora de início do atendimento.
* **`dataFim`** (`ISO Timestamp`): Hora de término (calculada pela duração do serviço).
* **`status`** (`enum`): Status da reserva (`pendente`, `confirmado`, `finalizado`, `cancelado`).
* **`motivoCancelamento`** (`string` | Opcional): Justificativa em caso de cancelamento.
* **`observacao`** (`string` | Opcional): Nota pontual para este atendimento específico.
* **`criadoEm`** (`ISO Timestamp`): Data de criação do registro.