-- ============================================================================
-- NOTA TÉCNICA
-- Este arquivo SQL é uma MODELAGEM CONCEITUAL DE REFERÊNCIA do Beleza em Dia.
-- O backend e banco oficial do projeto são Convex.
-- Regras SQL como FOREIGN KEY, UNIQUE, ON DELETE e INDEX devem ser traduzidas
-- para schema, índices, Queries, Mutations e validações da aplicação no Convex.
-- ============================================================================

  -- ============================================================================
  -- 1. Tabela de Usuários (Users)
  -- ============================================================================

  CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    senhaHash VARCHAR(255) NULL,
    googleId VARCHAR(255) NULL UNIQUE,
    emailVerificado BOOLEAN DEFAULT FALSE,

    -- Termos de Uso, Política de Privacidade e Onboarding
    termosVersaoAceita VARCHAR(20) NULL,
    termosAceitosEm DATETIME NULL,
    politicaPrivacidadeVersaoCiente VARCHAR(20) NULL,
    politicaPrivacidadeCienteEm DATETIME NULL,
    onboardingEtapaAtual INT NULL,
    onboardingConcluido BOOLEAN NOT NULL DEFAULT FALSE,

    criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP
  );


  -- ============================================================================
  -- 2. Tabela de Códigos de Verificação / Recuperação (Temporária)
  -- ============================================================================

  CREATE TABLE IF NOT EXISTS verification_codes (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    codigo VARCHAR(6) NOT NULL,

    tipo ENUM(
      'verificacao_email',
      'recuperacao_senha'
    ) NOT NULL DEFAULT 'verificacao_email',

    expiraEm DATETIME NOT NULL, -- Hora de criação + 15 minutos
    tentativas INT DEFAULT 0,   -- Controle de tentativas incorretas
    bloqueadoAte DATETIME NULL, -- Bloqueio temporário persistente após exceder tentativas
    criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_email_tipo (email, tipo)
  );


  -- ============================================================================
  -- 3. Tabela de Estabelecimentos (Tenants)
  -- ============================================================================

  CREATE TABLE IF NOT EXISTS tenants (
    id VARCHAR(36) PRIMARY KEY,
    userId VARCHAR(36) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,

    -- Informações de Perfil e Marca
    nomeProfissional VARCHAR(150) NOT NULL,
    bioProfissional VARCHAR(500) NULL,
    nomeEstabelecimento VARCHAR(150) NOT NULL,
    whatsapp VARCHAR(20) NOT NULL UNIQUE,
    fotoPerfilUrl TEXT NULL,
    limitePortfolioArquivos INT DEFAULT 20,

    -- Localização e Atendimento
    tipoAtendimento ENUM(
      'salao',
      'domiciliar',
      'ambos'
    ) NOT NULL DEFAULT 'salao',

    taxaDeslocamentoPadrao DECIMAL(10,2) NULL,
    regioesAtendidas TEXT NULL,
    enderecoSalao JSON NULL,

    -- Configuração da Agenda
    tipoAgenda ENUM(
      'fixa',
      'flexivel'
    ) NOT NULL DEFAULT 'fixa',

    -- Regras de Tempo e Pausas
    intervaloEntreAtendimentosMinutos INT NULL DEFAULT NULL,
    toleranciaAtrasoMinutos INT NULL DEFAULT NULL,
    antecedenciaMinimaAgendamentoHoras INT DEFAULT 1,

    -- Política de Cancelamento
    prazoCancelamentoSemPerdaHoras INT DEFAULT 24,

    -- Configurações Financeiras e Sinal
    modeloCobrancaSinal ENUM(
      'sinal_antecipado',
      'sem_sinal_presencial',
      'pagamento_integral_antecipado'
    ) NOT NULL DEFAULT 'sem_sinal_presencial',

    tipoValorSinal ENUM(
      'fixo',
      'porcentagem'
    ) NULL,

    valorSinal DECIMAL(10,2) NULL,

    -- Auditoria
    criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,

    -- Chaves Estrangeiras
    FOREIGN KEY (userId)
      REFERENCES users(id)
      ON DELETE CASCADE
      -- A aplicação só deve excluir fisicamente o usuário depois de validar
      -- que não existem agendamentos futuros, pagamentos ou reembolsos pendentes.
      -- Depois dessas pendências serem resolvidas, a regra do produto é remover
      -- os dados operacionais vinculados à conta, salvo retenção concreta exigida.
  );


  -- ============================================================================
  -- 4. Tabela de Disponibilidade / Horários da Agenda (Availability)
  -- ============================================================================

  CREATE TABLE IF NOT EXISTS availability (
    id VARCHAR(36) PRIMARY KEY,
    tenantId VARCHAR(36) NOT NULL,

    -- 0 (Domingo) a 6 (Sábado)
    diaSemana TINYINT NOT NULL,

    ativo BOOLEAN DEFAULT TRUE,
    janelas JSON NOT NULL,

    modoExpediente ENUM(
      'continuo',
      'pontuais',
      'faixas',
      'whatsapp'
    ) NULL,

    criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (tenantId)
      REFERENCES tenants(id)
      ON DELETE CASCADE,

    UNIQUE KEY unique_tenant_dia (tenantId, diaSemana)
  );


  -- ============================================================================
  -- 5. Tabela de Portfólio - Fotos e Vídeos (Tenant Portfolio)
  -- ============================================================================

  CREATE TABLE IF NOT EXISTS tenant_portfolio (
    id VARCHAR(36) PRIMARY KEY,
    tenantId VARCHAR(36) NOT NULL,

    tipo ENUM(
      'imagem',
      'video'
    ) NOT NULL DEFAULT 'imagem',

    midiaUrl TEXT NOT NULL,      -- URL do Cloudflare R2
    thumbnailUrl TEXT NULL,      -- URL da capa/thumb para vídeos
    duracaoSegundos INT NULL,
    tamanhoBytes BIGINT NULL,
    ordemExibicao INT DEFAULT 0,

    criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (tenantId)
      REFERENCES tenants(id)
      ON DELETE CASCADE
  );


  -- ============================================================================
  -- 6. Tabela de Serviços (Services)
  -- ============================================================================

  CREATE TABLE IF NOT EXISTS services (
    id VARCHAR(36) PRIMARY KEY,
    tenantId VARCHAR(36) NOT NULL,

    -- Informações Principais do Serviço
    categoria ENUM(
      'Unhas',
      'Cabelos',
      'Sobrancelhas e Cílios',
      'Depilação e Estética',
      'Maquiagem'
    ) NOT NULL,

    nome VARCHAR(150) NOT NULL,
    descricao TEXT NULL,

    -- Valores e Duração
    preco DECIMAL(10,2) NOT NULL,
    duracaoMinutos INT NOT NULL,

    -- Mídia e Exibição
    imagemPadraoUrl TEXT NULL,
    imagemUrl TEXT NULL, -- URL do Cloudflare R2 caso envie imagem própria
    ordemExibicao INT DEFAULT 0,
    ativo BOOLEAN DEFAULT TRUE,

    -- Auditoria
    criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,

    -- Chaves Estrangeiras e Índices
    FOREIGN KEY (tenantId)
      REFERENCES tenants(id)
      ON DELETE CASCADE,

    INDEX idx_tenant_categoria (tenantId, categoria)
  );


  -- ============================================================================
  -- 7. Tabela de Bloqueios de Horário (Blocked Times)
  -- ============================================================================

  CREATE TABLE IF NOT EXISTS blocked_times (
    id VARCHAR(36) PRIMARY KEY,
    tenantId VARCHAR(36) NOT NULL,

    titulo VARCHAR(150) NOT NULL,
    dataInicio DATETIME NOT NULL,
    dataFim DATETIME NOT NULL,
    diaTodo BOOLEAN DEFAULT FALSE,

    criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (tenantId)
      REFERENCES tenants(id)
      ON DELETE CASCADE
  );


  -- ============================================================================
  -- 8. Tabela de Agendamentos (Appointments)
  -- ============================================================================

  CREATE TABLE IF NOT EXISTS appointments (
    id VARCHAR(36) PRIMARY KEY,
    tenantId VARCHAR(36) NOT NULL,

    -- Dados da Cliente
    -- A cliente não possui conta própria no MVP. Nome e telefone são obrigatórios
    -- na criação do agendamento e o telefone deve ser armazenado normalizado para
    -- busca/contato. Solicitações amplas de privacidade exigem verificação segura
    -- de identidade antes de localizar/alterar/excluir registros.
    clienteNome VARCHAR(150) NOT NULL,
    clienteTelefone VARCHAR(20) NOT NULL,

    -- Modalidade do Atendimento
    tipoAtendimento ENUM(
      'salao',
      'domiciliar'
    ) NOT NULL,

    -- Obrigatório pela aplicação apenas para atendimento domiciliar
    enderecoCliente JSON NULL,

    -- Valores
    precoCobrado DECIMAL(10,2) NOT NULL,
    valorSinalPago DECIMAL(10,2) DEFAULT 0.00,

    -- Evidência do aviso de privacidade exibido à cliente
    avisoPrivacidadeVersao VARCHAR(20) NULL,
    avisoPrivacidadeExibidoEm DATETIME NULL,

    -- Data e Horário
    dataInicio DATETIME NOT NULL,
    dataFim DATETIME NOT NULL,

    -- Status do Agendamento
    status ENUM(
      'pendente',
      'confirmado',
      'finalizado',
      'cancelado',
      'expirado'
    ) DEFAULT 'pendente',

    -- Gateway de Pagamento Mercado Pago / Checkout Pro
    mercadoPagoPreferenceId VARCHAR(255) NULL,
    -- ID da preferência do Checkout Pro criada antes do pagamento.

    paymentId VARCHAR(255) NULL,
    -- ID do pagamento retornado pelo Mercado Pago.
    -- Permite relacionar o Webhook ao agendamento correspondente.

    -- Reembolso
    valorReembolsado DECIMAL(10,2) NOT NULL DEFAULT 0.00,

    reembolsoStatus ENUM(
      'pendente',
      'processando',
      'concluido',
      'falhou'
    ) NULL,

    reembolsoSolicitadoEm DATETIME NULL,
    reembolsadoEm DATETIME NULL,
    mercadoPagoRefundId VARCHAR(255) NULL,
    reembolsoIdempotencyKey VARCHAR(255) NULL,
    reembolsoFalhaCodigo VARCHAR(100) NULL,
    reembolsoFalhaMensagem VARCHAR(255) NULL,

    -- Informações Complementares
    motivoCancelamento TEXT NULL,
    observacao TEXT NULL,

    -- Link público seguro de gerenciamento do agendamento
    -- Deve ser token aleatório, suficientemente imprevisível e nunca sequencial.
    tokenPublico VARCHAR(255) NOT NULL UNIQUE,

    -- Cancelamento
    canceladoPor ENUM('cliente', 'profissional', 'sistema') NULL,
    canceladoEm DATETIME NULL,

    -- Auditoria
    criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,

    -- Chaves Estrangeiras e Índices
    FOREIGN KEY (tenantId)
      REFERENCES tenants(id)
      ON DELETE CASCADE,
      -- A aplicação deve impedir exclusão da conta enquanto houver reserva futura,
      -- pagamento ou reembolso que ainda precise ser resolvido. Depois de todas as
      -- pendências concluídas, a exclusão do tenant remove seus dados operacionais.

    INDEX idx_mp_preference_id (mercadoPagoPreferenceId),
    INDEX idx_payment_id (paymentId),
    INDEX idx_mp_refund_id (mercadoPagoRefundId),
    UNIQUE KEY unique_reembolso_idempotency (reembolsoIdempotencyKey),
    INDEX idx_cliente_telefone (clienteTelefone),
    INDEX idx_tenant_cliente_telefone (tenantId, clienteTelefone)
  );


  -- ============================================================================
  -- 9. Tabela de Relação Agendamento x Serviços (Appointment Services)
  -- ============================================================================

  CREATE TABLE IF NOT EXISTS appointment_services (
    id VARCHAR(36) PRIMARY KEY,

    appointmentId VARCHAR(36) NOT NULL,
    serviceId VARCHAR(36) NOT NULL,

    -- Snapshot do serviço no momento do agendamento
    precoCobrado DECIMAL(10,2) NOT NULL,
    duracaoMinutos INT NOT NULL,

    criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (appointmentId)
      REFERENCES appointments(id)
      ON DELETE CASCADE,

    FOREIGN KEY (serviceId)
      REFERENCES services(id)
      ON DELETE RESTRICT,

    INDEX idx_appointment_id (appointmentId),

    UNIQUE KEY unique_appointment_service (
      appointmentId,
      serviceId
    )
  );


  -- ============================================================================
  -- 10. Tabela de Integração Mercado Pago por Estabelecimento
  -- ============================================================================

  CREATE TABLE IF NOT EXISTS tenant_mercadopago (
    id VARCHAR(36) PRIMARY KEY,

    -- Cada estabelecimento possui no máximo uma conta Mercado Pago conectada
    tenantId VARCHAR(36) NOT NULL UNIQUE,

    -- ID da conta da profissional no Mercado Pago
    mercadoPagoUserId VARCHAR(255) NOT NULL,

    -- Credenciais OAuth da profissional
    -- Devem ser criptografadas pelo backend antes de serem gravadas no banco
    accessTokenCriptografado TEXT NOT NULL,
    refreshTokenCriptografado TEXT NULL,

    -- Momento em que o Access Token deixa de ser válido
    tokenExpiraEm DATETIME NOT NULL,

    -- Estado atual da integração
    conectado BOOLEAN NOT NULL DEFAULT TRUE,

    -- Auditoria
    conectadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,
    atualizadoEm DATETIME DEFAULT CURRENT_TIMESTAMP
      ON UPDATE CURRENT_TIMESTAMP,

    -- Chaves Estrangeiras e Índices
    FOREIGN KEY (tenantId)
      REFERENCES tenants(id)
      ON DELETE CASCADE,

    INDEX idx_mp_user_id (mercadoPagoUserId)
  );