-- 1. Tabela de Usuários
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  senhaHash VARCHAR(255) NULL,
  googleId VARCHAR(255) NULL UNIQUE,
  criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabela de Estabelecimentos (Tenants)
CREATE TABLE IF NOT EXISTS tenants (
  id VARCHAR(36) PRIMARY KEY,
  userId VARCHAR(36) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  nomeProfissional VARCHAR(150) NOT NULL,
  nomeEstabelecimento VARCHAR(150) NOT NULL,
  whatsapp VARCHAR(20) NOT NULL UNIQUE,
  fotoPerfilUrl TEXT NULL,
  tipoAtendimento ENUM('salao', 'domiciliar', 'ambos') NOT NULL DEFAULT 'salao',
  taxaDeslocamentoPadrao DECIMAL(10,2) NULL,
  regioesAtendidas TEXT NULL,
  enderecoSalao JSON NULL,
  /*
  {
  Exemplo do JSON
  "rua": "Rua das Flores",
  "numero": "123",
  "complemento": "Sala 4B", // Opcional (pode ir null ou string vazia)
  "bairro": "Centro",
  "cidade": "São Paulo",
  "estado": "SP",
  "cep": "01000-000"
}
*/
  modeloCobrancaSinal ENUM('sinal_antecipado', 'sem_sinal_presencial', 'pagamento_integral_antecipado') NOT NULL DEFAULT 'sem_sinal_presencial',
  tipoValorSinal ENUM('fixo', 'porcentagem') NULL,
  valorSinal DECIMAL(10,2) NULL,
  chavePix VARCHAR(255) NULL,
  prazoCancelamentoSemPerdaHoras INT DEFAULT 24,
  toleranciaAtrasoMinutos INT DEFAULT 15,
  limitePortfolioArquivos INT DEFAULT 20,
  criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Tabela de Serviços
CREATE TABLE IF NOT EXISTS services (
  id VARCHAR(36) PRIMARY KEY,
  tenantId VARCHAR(36) NOT NULL ,
  nome VARCHAR(150) NOT NULL,
  descricao TEXT NULL,
  preco DECIMAL(10,2) NOT NULL,
  duracaoMinutos INT NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  imagemPadraoUrl TEXT NULL,
  imagemUrl TEXT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  ordemExibicao INT DEFAULT 0,
  criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenantId) REFERENCES tenants(id) ON DELETE CASCADE
);

-- 4. Tabela de Disponibilidade
CREATE TABLE IF NOT EXISTS availability (
  id VARCHAR(36) PRIMARY KEY,
  tenantId VARCHAR(36) NOT NULL,
  diaSemana TINYINT NOT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  janelas JSON NOT NULL,
  criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenantId) REFERENCES tenants(id) ON DELETE CASCADE
);

-- 5. Tabela de Bloqueios de Horário
CREATE TABLE IF NOT EXISTS blocked_times (
  id VARCHAR(36) PRIMARY KEY,
  tenantId VARCHAR(36) NOT NULL,
  titulo VARCHAR(150) NOT NULL,
  dataInicio DATETIME NOT NULL,
  dataFim DATETIME NOT NULL,
  diaTodo BOOLEAN DEFAULT FALSE,
  criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenantId) REFERENCES tenants(id) ON DELETE CASCADE
);

-- 6. Tabela de Agendamentos
CREATE TABLE IF NOT EXISTS appointments (
  id VARCHAR(36) PRIMARY KEY,
  tenantId VARCHAR(36) NOT NULL,
  servicoId VARCHAR(36) NOT NULL,
  clienteNome VARCHAR(150) NOT NULL,
  clienteTelefone VARCHAR(20) NOT NULL,
  enderecoCliente JSON NULL,
  precoCobrado DECIMAL(10,2) NOT NULL,
  valorSinalPago DECIMAL(10,2) DEFAULT 0.00,
  dataInicio DATETIME NOT NULL,
  dataFim DATETIME NOT NULL,
  status ENUM('pendente', 'confirmado', 'finalizado', 'cancelado') DEFAULT 'pendente',
  motivoCancelamento TEXT NULL,
  observacao TEXT NULL,
  criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenantId) REFERENCES tenants(id) ON DELETE CASCADE,
  FOREIGN KEY (servicoId) REFERENCES services(id) ON DELETE RESTRICT
);



/*
================================================================================
                    RELACIONAMENTOS DAS TABELAS
================================================================================

1. USERS <-> TENANTS
   - Tipo: 1 para 1 (1:1)
   - Chave Estrangeira: tenants.userId -> users.id
   - Regra ON DELETE: CASCADE
   - Descrição: Cada usuário possui apenas um estabelecimento/perfil profissional.
     Se o usuário for excluído, o perfil do estabelecimento também é apagado.

2. TENANTS <-> SERVICES
   - Tipo: 1 para Muitos (1:N)
   - Chave Estrangeira: services.tenantId -> tenants.id
   - Regra ON DELETE: CASCADE
   - Descrição: Um estabelecimento pode oferecer vários serviços cadastrados.
     Se o estabelecimento for excluído, todos os seus serviços são apagados.

3. TENANTS <-> AVAILABILITY
   - Tipo: 1 para Muitos (1:N)
   - Chave Estrangeira: availability.tenantId -> tenants.id
   - Regra ON DELETE: CASCADE
   - Descrição: Um estabelecimento possui múltiplos registros de disponibilidade
     de dias/horários de funcionamento.
     Se o estabelecimento for excluído, sua configuração de horários é apagada.

4. TENANTS <-> BLOCKED_TIMES
   - Tipo: 1 para Muitos (1:N)
   - Chave Estrangeira: blocked_times.tenantId -> tenants.id
   - Regra ON DELETE: CASCADE
   - Descrição: Um estabelecimento pode registrar diversos bloqueios temporários de agenda.
     Se o estabelecimento for excluído, seus bloqueios de agenda são apagados.

5. TENANTS <-> APPOINTMENTS
   - Tipo: 1 para Muitos (1:N)
   - Chave Estrangeira: appointments.tenantId -> tenants.id
   - Regra ON DELETE: CASCADE
   - Descrição: Um estabelecimento possui o histórico de vários agendamentos efetuados.
     Se o estabelecimento for excluído, todos os seus agendamentos são apagados.

6. SERVICES <-> APPOINTMENTS
   - Tipo: 1 para Muitos (1:N)
   - Chave Estrangeira: appointments.servicoId -> services.id
   - Regra ON DELETE: RESTRICT
   - Descrição: Um mesmo serviço pode estar atrelado a múltiplos agendamentos.
     A regra RESTRICT impede que um serviço seja apagado do sistema caso ele já
     possua agendamentos registrados no histórico.
================================================================================
*/