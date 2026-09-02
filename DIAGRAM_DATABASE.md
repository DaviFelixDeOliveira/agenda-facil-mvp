Visualização dos Campos (tenants)
_id (string): Identificador único gerado automaticamente pelo banco.

slug (string | Único): URL personalizada para divulgação (ex: [belezaemdia.com/studio-bia-nails](https://belezaemdia.com/studio-bia-nails)).

nomeProfissional (string): Nome completo ou como a profissional gosta de ser chamada (ex: "Beatriz Silva").

nomeEstabelecimento (string): Nome comercial do espaço ou marca (ex: "Studio Bia Nails").

whatsapp (string | Único): Número de telefone principal com DDD (usado para login, notificações e trava contra duplicidade).

whatsappVerificado (boolean): Define se o número passou pela confirmação via código.

tipoAtendimento (enum): "salao" | "domiciliar" | "ambos".

enderecoSalao (object | Opcional): Obrigatório se o atendimento for no salão.

rua: string

numero: string

bairro: string

cidade: string

cep: string

tipoAgenda (enum): "fixa" (dias/horários da semana) | "flexivel" (abertura manual no tempo livre).

cobrarSinal (boolean): Chave liga/desliga para exigência do Pix de garantia.

modeloCobrancaSinal (enum): "sinal_antecipado" | "sem_sinal_presencial" | "pagamento_integral_antecipado".

Regra: modeloCobrancaSinal é a fonte de verdade. cobrarSinal deve ser derivado como true para "sinal_antecipado" ou "pagamento_integral_antecipado" e false para "sem_sinal_presencial".

valorSinal (number | Opcional): Valor em reais cobrado na reserva (ex: 30.00); obrigatório quando o modelo for "sinal_antecipado" e ignorado nos demais modelos.

chavePix (string | Opcional): Chave Pix para onde o valor do sinal é direcionado.

prazoCancelamentoSemPerdaHoras (number): Prazo mínimo para cancelar sem perda do sinal (padrão: 24).

toleranciaAtrasoMinutos (number): Tempo de tolerância para atraso da cliente (padrão: 15).

limitePortfolioArquivos (number): Limite total de fotos e vídeos do portfólio (padrão: 20).

limiteFotosPorServico (number | Opcional): Limite de fotos autorais associadas a cada serviço.

fotoPerfilUrl (string | Opcional): URL da foto de perfil exibida no perfil público.

moduloPdvAtivo (boolean): Libera ou oculta as abas de fluxo de caixa e venda presencial de produtos.

---

Visualização dos Campos (system_settings)

_id (string): Identificador único das configurações globais do sistema.

maintenanceEnabled (boolean): Define se o sistema está em modo de manutenção global.

maintenanceType (enum | Opcional): "programada" | "falha_critica" | "seguranca".

maintenanceMessage (string | Opcional): Mensagem exibida na tela pública de manutenção.

maintenanceReason (string | Opcional): Motivo interno ou público da manutenção.

maintenanceExpectedReturn (string | ISO Timestamp | Opcional): Previsão de retorno informada aos usuários.

maintenanceActivatedBy (string | Opcional): Identificador do administrador ou mecanismo de infraestrutura que ativou o modo.

maintenanceActivatedAt (string | ISO Timestamp | Opcional): Data e hora de ativação.

maintenanceDeactivatedAt (string | ISO Timestamp | Opcional): Data e hora de desativação.

maintenanceIncidentId (string | Opcional): Identificador do incidente relacionado para auditoria.

Regra: maintenanceEnabled bloqueia operações críticas em todo o sistema. A rota administrativa de recuperação deve exigir autenticação forte, autorização específica e auditoria.

---


Visualização dos Campos (services)
_id (string): Identificador único gerado automaticamente pelo banco de dados.

userId (string | Chave Estrangeira): Identificador do usuário/proprietário (vinculado à tabela users).

nome (string): Nome do procedimento. Originado do template predefinido ou criado/editado do zero pela profissional (ex: "Manicure Simples", "Alongamento em Fibra de Vidro").

descricao (string | Opcional): Detalhamento do que está incluso no procedimento (ex: "Inclui cutilagem e esmaltação simples").

observacoes (string | Opcional): Avisos, regras e restrições específicas da profissional (ex: "Não faço desenhos/nail art; trabalho apenas com cores uniformes; não removo material de outro salão").

preco (number): Valor total cobrado em reais (ex: 150.00).

duracaoMinutos (number): Tempo estimado do atendimento em minutos (ex: 40, 60, 90, 120). Utilizado pelo algoritmo da agenda para bloquear o período e impedir agendamento duplo.

categoria (string): Grupo de organização do serviço na interface (ex: "Unhas", "Cabelos", "Sobrancelhas", "Estética & Depilação").

imagemPadraoUrl (string): URL da foto ilustrativa de exemplo pré-fornecida pelo sistema para o card do template.

imagemUrl (string | Opcional): URL da foto autoral enviada pela própria profissional (substitui a imagem padrão no perfil público caso informada).

limiteUploadMb (number | Opcional): Limite aplicado ao arquivo da imagem do serviço após validação (padrão: 5 MB).

ativo (boolean): Define se o serviço está visível para agendamento no link público (true) ou oculto temporariamente (false) sem perder o histórico.

ordemExibicao (number): Posição numérica para ordenação da lista de exibição para a cliente.


---
Visualização dos Campos (availability)
_id (string): Identificador único do registro gerado pelo banco.

userId (string | Chave Estrangeira): Identificador do usuário proprietário da agenda (vinculado à tabela users).

tipo (enum):

"padrao_semanal": Regra que se repete toda semana.

"data_especifica": Abertura para um dia avulso no tempo livre.

"bloqueio": Fechamento total da agenda em um dia específico.

modoHorario (enum):

"janela_continua": Para quem trabalha em período (ex: 09h às 18h com ou sem almoço).

"horarios_pontuais": Para quem quer selecionar horários cravados (ex: 10h, 12h, 14h, 16h, 18h).

diaSemana (number | Opcional): Usado no modo semanal (0 para Domingo até 6 para Sábado).

dataEspecifica (string | Opcional): Usado em dias avulsos ou bloqueios (YYYY-MM-DD).

horaInicio (string | Opcional): Usado na janela_continua (ex: "09:00").

horaFim (string | Opcional): Usado na janela_continua (ex: "18:00").

pausaInicio (string | Opcional): Início do almoço/descanso (ex: "12:00").

pausaFim (string | Opcional): Fim do almoço/descanso (ex: "13:00").

horariosAvulsos (array de strings | Opcional): Usado no modo horarios_pontuais (ex: ["10:00", "12:00", "14:00", "16:00", "18:00"]).

motivoBloqueio (string | Opcional): Anotação em caso de fechamento de agenda (ex: "Consulta médica").

origem (enum): "padrao" | "manual" | "sistema". Identifica se a disponibilidade veio da grade, foi aberta pela profissional ou foi criada automaticamente.



---


Visualização dos Campos (appointments)
_id (string): Identificador único do agendamento gerado automaticamente pelo banco de dados.

userId (string | Chave Estrangeira): Identificador do usuário/salão onde a vaga foi reservada (vinculado à tabela users).

serviceId (string | Chave Estrangeira): Identificador do procedimento contratado (vinculado à tabela services).

clientId (string | Opcional | Chave Estrangeira): Identificador da cliente vinculada (vinculado à tabela clients). Pode ser nulo em registros legados ou reservas sem cliente cadastrada.

clienteNome (string): Nome completo da cliente que fez o agendamento.

clienteWhatsapp (string): Telefone/WhatsApp da cliente com DDD (usado para envio de lembretes e confirmação).

clienteEndereco (object | Opcional): Endereço da cliente (obrigatório apenas se o tipo de atendimento for domiciliar).

rua: string

numero: string

bairro: string

complemento: string | Opcional

observacoesCliente (string | Opcional): Espaço para a cliente descrever como deseja o atendimento (ex: "Quero esmalte vermelho fechado", "Tenho alergia a esmalte com formol", "Gostaria do cabelo com ondulação no final").

fotoReferenciaUrl (string | Opcional): Link de imagem enviada pela cliente como inspiração (ex: foto tirada do Pinterest ou Instagram).

dataHoraInicio (string | ISO Timestamp): Data e horário exatos em que o atendimento começa (ex: "2026-08-28T14:00:00Z").

dataHoraFim (string | ISO Timestamp): Data e horário exatos do término (calculado automaticamente: Inicio + duracaoMinutos).

fusoHorario (string): Fuso usado para exibição e cálculo do horário local do atendimento (ex: "America/Sao_Paulo").

status (enum): Estado atual da reserva:

"pendente_sinal": Aguardando a transferência Pix da taxa de reserva ou do pagamento integral, conforme a modalidade configurada.

"confirmado": Reserva confirmada e garantida na agenda.

"concluido": Atendimento finalizado com sucesso.

"cancelado": Horário liberado na agenda (cancelamento feito por cliente ou profissional).

"nao_compareceu": Registro de falta/no-show da cliente.

"atraso_acima_tolerancia": Cliente chegou após o limite de tolerância.

"reagendamento": Atendimento transferido para outro horário, mantendo o histórico da reserva original.

sinalPago (boolean): Confirmação visual se o valor de garantia Pix foi quitado (true) ou está pendente (false).

modeloCobrancaSnapshot (enum): Modelo de cobrança aplicado no momento da reserva: "sinal_antecipado" | "sem_sinal_presencial" | "pagamento_integral_antecipado".

valorSinal (number): Valor do sinal aplicado no momento da reserva, preservado para histórico.

valorTotal (number): Preço em reais do serviço no instante da compra (garante a integridade histórica caso o valor do catálogo mude no futuro).

chegadaEm (string | ISO Timestamp | Opcional): Momento em que a cliente chegou, usado para calcular atraso.

minutosAtraso (number | Opcional): Diferença calculada entre chegadaEm e dataHoraInicio.

dataHoraOriginal (string | ISO Timestamp | Opcional): Horário original antes de um reagendamento.

reagendadoParaAppointmentId (string | Opcional): Identificador do novo agendamento relacionado.

motivoCancelamento (string | Opcional): Motivo informado para cancelamento, no-show ou reagendamento.

idempotencyKey (string | Único): Chave usada para impedir reservas duplicadas por duplo clique, refresh ou retry.


---


Visualização dos Campos (payments) Atualizada
_id (string): Identificador único da cobrança gerado pelo banco.

appointmentId (string | Chave Estrangeira): Identificador do agendamento vinculado (da tabela appointments).

tenantId (string | Chave Estrangeira): Identificador da profissional/salão proprietário (da tabela tenants).

valor (number): Valor em reais cobrado no Pix (ex: 30.00).

gatewayPaymentId (string): ID único da transação gerado pela API do gateway de pagamento.

pixCopiaECola (string): Código alfanumerico Copia e Cola gerado para pagamento no app do banco.

qrCodeBase64 (string): Imagem do QR Code em texto base64 para exibição na tela.

tempoValidadeMinutos (number): Tempo limite em minutos configurado para a expiração do QR Code (padrão: 30).

status (enum): Estado atual da cobrança ("pending", "approved", "rejected", "expired", "refunded").

motivoStatus (string | Opcional): Motivo da rejeição, expiração, devolução ou alteração de status.

aprovadoEm (string | ISO Timestamp | Opcional): Momento em que o gateway confirmou o pagamento.

expiraEm (string | ISO Timestamp): Timestamp exato de quando o Pix expirará (gerado como dataCriacao + 30 minutos).

dataCriacao (string | ISO Timestamp): Momento de criação da cobrança.

webhookRecebidoEm (string | ISO Timestamp | Opcional): Momento do recebimento do evento do gateway.

webhookEventId (string | Único | Opcional): Identificador do evento processado para garantir idempotência.

---

Visualização dos Campos (clients / clientes)
_id (string): Identificador único do cliente gerado automaticamente pelo banco de dados.

userId (string | Chave Estrangeira): Identificador do usuário/salão proprietário (vinculado à tabela users).

nome (string): Nome completo da cliente cadastrada.

whatsapp (string | Opcional): Telefone e WhatsApp com DDD (ex: "(11) 98888-7777").

email (string | Opcional): E-mail de contato da cliente.

notas_internas (string / TEXT | Opcional / Nullable): Anotações internas e confidenciais registradas pela profissional sobre a cliente (preferências de esmalte, histórico de alergias, sensibilidade de cutícula, formatos favoritos, observações de atendimento). Campo do tipo TEXT sem limitação rígida de caracteres.

totalVisitas (number): Quantidade total de atendimentos realizados pela cliente (padrão: 0).

ticketMedio (number): Valor médio em reais gasto pela cliente por visita (padrão: 0.00).

ultimaVisita (string | ISO Timestamp | Opcional): Data e horário do último agendamento finalizado.

criadoEm (string | ISO Timestamp): Data de cadastro da cliente no sistema.

---


Visualização dos Campos (portfolio_media)
_id (string): Identificador único da mídia gerado pelo banco.

userId (string | Chave Estrangeira): Identificador do usuário proprietário do arquivo (vinculado à tabela users).

tipo (enum): "foto" | "video".

url (string): Link público de acesso do arquivo no Cloudflare R2 / Supabase Storage.

tamanhoBytes (number): Peso do arquivo em bytes (usado para validar os limites de 5MB para fotos e 30MB para vídeos).

mimeType (string): Tipo MIME final do arquivo (fotos devem ser convertidas para "image/webp").

larguraPixels (number | Opcional): Largura da mídia após otimização.

alturaPixels (number | Opcional): Altura da mídia após otimização.

duracaoSegundos (number | Opcional): Duração do vídeo em segundos (obrigatório se tipo === "video", limitado a no máximo 60 segundos).

legenda (string | Opcional): Breve descrição do trabalho (ex: "Alongamento em Fibra de Vidro - Formato Mandorla").

ordemExibicao (number): Posição de ordenação dos arquivos no carrossel/vitrine do perfil (ex: 1, 2, 3...).

servicoId (string | Opcional | Chave Estrangeira): Serviço ao qual a foto está associada; nulo para mídia geral do portfólio.

criadoEm (string | ISO Timestamp): Momento de criação do registro.

Regra de validação: cada profissional pode possuir no máximo 20 registros em portfolio_media, somando fotos e vídeos. Fotos devem ter no máximo 5 MB por arquivo e ser comprimidas/convertidas para WebP no frontend antes do upload. Vídeos devem ter no máximo 30 MB por arquivo, duração máxima de 60 segundos e resolução recomendada de 1080p.

---

Visualização dos Campos (financial_events)

_id (string): Identificador único do evento financeiro.

userId (string | Chave Estrangeira): Usuário ou salão proprietário.

appointmentId (string | Opcional | Chave Estrangeira): Agendamento relacionado, quando aplicável.

paymentId (string | Opcional | Chave Estrangeira): Cobrança relacionada, quando aplicável.

tipo (enum): "servico" | "produto" | "sinal_recebido" | "sinal_retido_no_show" | "sinal_reembolsado" | "reembolso_pagamento_integral".

valor (number): Valor em reais do evento.

status (enum): "pendente" | "confirmado" | "estornado".

ocorreuEm (string | ISO Timestamp): Momento do evento financeiro.

descricao (string | Opcional): Descrição para exibição no fluxo de caixa.

Regra de negócio: sinal_retido_no_show é contabilizado como receita sem execução de serviço; sinal_reembolsado e reembolso_pagamento_integral devem reduzir ou estornar a receita correspondente.

---
