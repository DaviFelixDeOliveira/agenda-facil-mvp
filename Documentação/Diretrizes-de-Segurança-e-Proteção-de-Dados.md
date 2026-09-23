# 🛡️ Diretrizes de Segurança e Proteção de Dados

## Beleza em Dia

**Tipo de documento:** Diretriz técnica interna  
**Sistema:** Beleza em Dia  
**Versão:** 1.0  
**Última atualização:** 06/09/2026

---

# 1. Objetivo

Este documento estabelece os requisitos mínimos de segurança, privacidade, proteção de dados e desenvolvimento seguro que devem ser observados durante:

- planejamento;
- desenvolvimento;
- testes;
- implantação;
- operação;
- manutenção;
- evolução do Beleza em Dia.

Este documento é voltado principalmente para desenvolvimento e operação técnica.

Ele não substitui:

- Termos de Uso;
- Política de Privacidade;
- contratos;
- avaliação jurídica;
- documentação funcional do sistema.

---

# 2. Arquitetura Oficial

A arquitetura oficial do Beleza em Dia utiliza:

- Next.js App Router;
- React;
- TypeScript;
- Tailwind CSS;
- Shadcn UI;
- Lucide React;
- React Hook Form;
- Zod;
- Convex;
- Convex Auth;
- Convex Cloud;
- Cloudflare R2;
- Resend;
- Mercado Pago Checkout Pro + OAuth;
- Vercel;
- GitHub.

O Convex é o backend e banco de dados oficial.

O arquivo SQL existente no projeto representa apenas uma modelagem conceitual utilizada como referência para:

- entidades;
- campos;
- relacionamentos;
- regras;
- índices;
- restrições.

Regras descritas no SQL devem possuir implementação equivalente no Convex por meio de:

- schema;
- validators;
- indexes;
- Queries;
- Mutations;
- Actions;
- Cron Jobs;
- validações explícitas de aplicação.

---

# 3. Princípios Gerais de Segurança

O sistema deve seguir os seguintes princípios:

- segurança por padrão;
- privacidade por padrão;
- minimização de dados;
- menor privilégio;
- defesa em profundidade;
- validação no backend;
- isolamento entre tenants;
- segregação de ambientes;
- proteção de segredos;
- rastreabilidade proporcional;
- confirmação real de operações críticas;
- não confiar no navegador como fonte de verdade.

Nenhuma validação existente apenas no frontend deve ser considerada mecanismo de segurança suficiente.

O frontend pode realizar validações para melhorar a experiência do usuário, porém o backend deve validar novamente todas as operações relevantes.

---

# 4. Autenticação

## 4.1 Profissional

A profissional possuirá conta autenticada.

Os métodos previstos são:

- e-mail e senha;
- Google.

A autenticação será realizada utilizando Convex Auth.

## 4.2 Código de 6 dígitos

O código enviado por e-mail poderá ser utilizado para:

- verificação de e-mail;
- recuperação de acesso.

O código não é o método principal de login.

## 4.3 Senhas

Nenhuma senha pode ser:

- armazenada em texto puro;
- adicionada aos logs;
- enviada para analytics;
- incluída em mensagens de erro;
- salva manualmente pela aplicação em campos próprios.

O sistema deve utilizar os mecanismos seguros da solução de autenticação adotada.

## 4.4 Sessões

Rotas privadas devem verificar a sessão no backend.

Uma interface aberta no navegador não constitui prova de autorização.

Sessões:

- inválidas;
- expiradas;
- revogadas;

não podem continuar permitindo acesso.

Cookies de autenticação, quando utilizados, devem adotar as proteções disponibilizadas pela solução de autenticação, incluindo atributos seguros quando aplicáveis.

---

# 5. Autorização

Autenticação identifica quem está utilizando o sistema.

Autorização determina o que essa pessoa pode fazer.

Toda operação privada deve verificar:

1. se existe usuário autenticado;
2. qual tenant pertence ao usuário;
3. se o recurso solicitado pertence ao tenant;
4. se aquela ação é permitida;
5. se as regras de negócio permitem a operação naquele momento.

Nunca confiar apenas em valores recebidos pelo frontend, incluindo:

- userId;
- tenantId;
- appointmentId;
- serviceId;
- paymentId;
- identificadores de arquivos.

Conhecer um identificador não significa possuir autorização para acessar seu recurso.

---

# 6. Multi-tenancy

O Beleza em Dia é uma aplicação multi-tenant.

Cada profissional ou estabelecimento deve possuir isolamento lógico dos próprios dados.

Isso inclui:

- perfil;
- serviços;
- agenda;
- disponibilidade;
- horários bloqueados;
- agendamentos;
- histórico de clientes;
- portfólio;
- configurações;
- integração Mercado Pago;
- dados financeiros;
- pagamentos;
- reembolsos.

Uma profissional não pode visualizar, alterar ou excluir informações pertencentes a outro tenant.

Toda Query, Mutation ou Action privada deve validar o tenant no backend.

Filtrar dados somente no frontend é proibido como mecanismo de autorização.

---

# 7. Proteção contra enumeração de dados

Identificadores internos não devem funcionar como credenciais.

Rotas públicas que concedem acesso a informações particulares não devem utilizar identificadores:

- sequenciais;
- previsíveis;
- facilmente enumeráveis.

Erros também não devem revelar desnecessariamente se determinado recurso privado existe.

---

# 8. Cliente sem conta

No MVP, a cliente não possui conta.

Não existe perfil global compartilhado de cliente entre estabelecimentos.

Não deve ser criada uma coleção global `clients` apenas para centralizar identidades.

O histórico exibido ao estabelecimento deve ser derivado dos agendamentos pertencentes ao próprio tenant.

Uma profissional não pode descobrir se determinada cliente possui reservas em outro estabelecimento.

---

# 9. Agendamento público

O agendamento público deve coletar apenas os dados necessários.

Podem ser solicitados:

- nome;
- telefone;
- serviço;
- data;
- horário;
- tipo de atendimento;
- endereço, quando o atendimento for domiciliar;
- observação, quando aplicável.

Antes de criar a reserva, o backend deve validar novamente:

- existência do estabelecimento;
- serviço;
- serviço ativo;
- preço;
- duração;
- tipo de atendimento;
- disponibilidade;
- bloqueios;
- antecedência mínima;
- conflitos;
- regras do sinal;
- regras da agenda.

O frontend não pode definir sozinho:

- preço;
- duração;
- valor do sinal;
- status;
- estado do pagamento.

---

# 10. Double Booking

A disponibilidade apresentada no navegador representa apenas o estado conhecido naquele momento.

Imediatamente antes da criação do agendamento, o backend deve revalidar o horário.

A operação deve impedir condições de corrida.

Se duas clientes tentarem reservar o mesmo período simultaneamente, somente uma reserva incompatível com aquele intervalo poderá ser aceita.

A proteção deve existir no backend.

---

# 11. Reserva temporária

Reservas pendentes possuem prazo operacional de 30 minutos.

Enquanto estiver válida:

- o horário permanece reservado;
- outro agendamento conflitante não pode utilizá-lo.

Quando o prazo terminar sem conclusão da condição necessária:

`pendente → expirado`

Depois disso, o horário é liberado.

A expiração deve ser controlada no backend.

O cronômetro exibido no frontend é apenas informativo.

---

# 12. Token público do agendamento

Cada reserva deve possuir um `tokenPublico`.

Rota:

`/agendamento/[token]`

O token deve ser:

- aleatório;
- imprevisível;
- suficientemente longo;
- exclusivo;
- não sequencial;
- gerado utilizando fonte criptograficamente segura.

O token funciona como credencial limitada exclusivamente àquela reserva.

Ele não concede acesso:

- ao painel administrativo;
- a outras reservas;
- a outros estabelecimentos;
- a outras clientes.

Pelo token, a cliente poderá, conforme permitido:

- visualizar a reserva;
- alterar o próprio nome daquela reserva;
- alterar o telefone daquela reserva;
- cancelar;
- acompanhar pagamento;
- acompanhar reembolso;
- obter informações para contato.

Alterar nome ou telefone por esse fluxo modifica apenas aquele agendamento.

---

# 13. Proteção do token na navegação

Páginas contendo `tokenPublico` devem evitar exposição desnecessária do token.

Não incluir o token em:

- analytics desnecessário;
- logs do frontend;
- mensagens públicas;
- parâmetros adicionais sem necessidade.

Evitar recursos de terceiros nessas páginas quando puderem provocar vazamento desnecessário do endereço completo.

Configurações de `Referrer-Policy` devem ser avaliadas para minimizar exposição do endereço contendo o token.

---

# 14. Proteção contra abuso

Rotas públicas sensíveis devem possuir proteção proporcional contra abuso.

Aplicar especialmente em:

- login;
- recuperação de senha;
- verificação de e-mail;
- envio de códigos;
- criação de agendamentos;
- consulta de token;
- solicitações de privacidade;
- OAuth;
- endpoints relacionados a pagamentos.

As proteções podem incluir:

- rate limiting;
- limite de tentativas;
- bloqueio temporário;
- detecção de comportamento anormal;
- validação adicional quando necessário.

---

# 15. Códigos temporários

Códigos de verificação devem:

- possuir validade limitada;
- possuir limite de tentativas;
- expirar após utilização;
- possuir bloqueio proporcional após abuso;
- não aparecer em logs.

Validade atual:

**15 minutos.**

Registros temporários devem ser removidos quando deixarem de possuir finalidade técnica.

---

# 16. Validação de entrada

Toda entrada do navegador deve ser considerada não confiável.

Validar:

- tipo;
- formato;
- tamanho;
- campos obrigatórios;
- limites;
- valores permitidos;
- relacionamento entre campos;
- regras do negócio.

Zod pode ser utilizado para validação estrutural.

Validação client-side não substitui validação server-side.

---

# 17. XSS e conteúdo inserido por usuários

Conteúdo inserido por profissionais ou clientes deve ser tratado como não confiável.

Não renderizar HTML fornecido pelo usuário diretamente.

Evitar `dangerouslySetInnerHTML`.

Caso seja realmente necessário renderizar HTML externo ou fornecido por usuário, o conteúdo deve passar por sanitização apropriada.

Campos como:

- descrição;
- observação;
- nome de serviço;
- nome de estabelecimento;

devem ser exibidos de forma segura.

---

# 18. CSRF, CORS e requisições

Operações que alteram estado devem utilizar mecanismos adequados de proteção contra requisições indevidas.

Quando autenticação utilizar cookies, devem ser consideradas proteções contra CSRF adequadas à arquitetura utilizada.

CORS não deve ser configurado como `*` para APIs privadas sem justificativa.

Origens autorizadas devem ser limitadas conforme necessário.

---

# 19. Headers de segurança

Em produção devem ser avaliados e configurados headers como:

- Content-Security-Policy;
- Strict-Transport-Security;
- X-Content-Type-Options;
- Referrer-Policy;
- frame-ancestors ou proteção equivalente contra framing indevido.

A política deve ser compatível com Next.js, Vercel e integrações utilizadas.

---

# 20. Tratamento de erros

Mensagens de erro públicas devem ser claras sem revelar detalhes internos.

Nunca retornar ao usuário:

- stack trace;
- variáveis de ambiente;
- tokens;
- segredos;
- credenciais;
- detalhes internos de banco;
- informações privadas de terceiros.

Informações técnicas necessárias para diagnóstico podem ser registradas em ambiente apropriado, respeitando minimização.

---

# 21. Segredos

Segredos devem existir exclusivamente em ambientes seguros do servidor.

Exemplos:

- credenciais do Mercado Pago;
- tokens OAuth;
- credenciais R2;
- credenciais Resend;
- segredos administrativos;
- chaves criptográficas;
- segredos de Webhook.

Nunca:

- enviar ao frontend;
- colocar no bundle público;
- commitar no GitHub;
- inserir em documentação pública;
- registrar em logs;
- incluir em screenshots públicas.

---

# 22. Ambientes

Desenvolvimento, testes e produção devem ser separados.

Quando possível, cada ambiente deve possuir:

- banco/configuração própria;
- credenciais próprias;
- URLs próprias;
- integrações próprias;
- Webhooks próprios.

Não utilizar dados pessoais reais em desenvolvimento quando dados fictícios forem suficientes.

---

# 23. Mercado Pago

## 23.1 Arquitetura

O modelo adotado é:

**Checkout Pro + OAuth por profissional.**

A profissional autoriza sua conta Mercado Pago.

O backend utiliza a autorização correspondente para criar operações vinculadas àquela profissional.

A comissão do Beleza em Dia no MVP é:

**0%.**

Taxas cobradas pelo próprio Mercado Pago permanecem independentes da comissão da plataforma.

---

# 24. OAuth do Mercado Pago

O fluxo OAuth deve:

- ocorrer pelo backend;
- utilizar redirect URI previamente cadastrada;
- validar estado da autorização quando aplicável;
- impedir associação da autorização ao tenant incorreto;
- armazenar tokens apenas no backend.

Devem ser protegidos:

- accessToken;
- refreshToken;
- identificadores da conta autorizada.

Os tokens devem possuir proteção adicional em repouso, como criptografia de aplicação adequada.

Credenciais nunca devem ser enviadas ao navegador.

Desconectar Mercado Pago deve revogar ou remover as credenciais conforme o fluxo suportado e remover o vínculo local de forma segura.

---

# 25. Checkout Pro

Quando houver sinal:

1. o backend calcula o valor;
2. o backend cria a preferência;
3. armazena `mercadoPagoPreferenceId`;
4. retorna somente as informações necessárias para redirecionamento;
5. a cliente realiza o pagamento no Mercado Pago;
6. o backend confirma posteriormente o resultado real.

O frontend não deve criar valores financeiros arbitrários.

---

# 26. Preference ID e Payment ID

`mercadoPagoPreferenceId` identifica a preferência do Checkout Pro.

`paymentId` identifica o pagamento real posteriormente criado.

São identificadores diferentes.

Nunca utilizar Preference ID como se fosse confirmação do pagamento.

---

# 27. Retorno do Mercado Pago

O simples retorno da cliente para o Beleza em Dia após a tela do Mercado Pago não comprova pagamento.

A interface pode informar:

**"Estamos verificando seu pagamento."**

Somente após confirmação confiável o sistema poderá informar que o pagamento foi aprovado.

---

# 28. Webhooks

Webhooks devem:

- utilizar HTTPS;
- validar a autenticidade da notificação;
- validar assinatura conforme o mecanismo do Mercado Pago;
- rejeitar notificações inválidas;
- suportar eventos duplicados;
- ser idempotentes;
- registrar erros de processamento de forma segura.

Receber duas vezes o mesmo evento não pode gerar duas alterações financeiras.

Quando necessário, consultar o provedor para confirmar o estado da operação.

---

# 29. Pagamentos

Nunca considerar pagamento concluído apenas porque:

- houve redirect;
- o frontend mostrou sucesso;
- houve timeout;
- a cliente fechou a tela;
- determinada requisição respondeu de forma incompleta.

O estado confirmado pelo backend/provedor é a fonte de verdade.

---

# 30. Reembolsos

O MVP suporta somente reembolso integral.

Estados internos:

- `pendente`;
- `processando`;
- `concluido`;
- `falhou`.

O reembolso somente pode aparecer como concluído após confirmação real do Mercado Pago.

Registrar quando aplicável:

- `valorSinalPago`;
- `valorReembolsado`;
- `reembolsoStatus`;
- `reembolsoSolicitadoEm`;
- `reembolsadoEm`;
- `mercadoPagoRefundId`;
- `reembolsoIdempotencyKey`;
- `reembolsoFalhaCodigo`;
- `reembolsoFalhaMensagem`.

`valorSinalPago` registra o valor originalmente pago e não deve ser zerado depois de um reembolso.

---

# 31. Idempotência financeira

Operações financeiras críticas devem utilizar idempotência quando o provedor oferecer suporte.

Reembolsos Mercado Pago devem utilizar:

`X-Idempotency-Key`

Enquanto uma tentativa possuir resultado desconhecido por:

- timeout;
- falha de rede;
- conexão interrompida;
- resposta inconclusiva;

deve ser reutilizada a mesma chave.

Um novo clique do usuário não deve gerar automaticamente uma nova chave.

Depois de uma falha confirmada e depois da correção da causa, uma nova tentativa deliberada poderá possuir uma nova chave.

---

# 32. Cancelamento

## Cliente

Com 24 horas ou mais de antecedência:

- cancelar;
- se houver sinal pago, solicitar reembolso integral.

Com menos de 24 horas:

- cancelar;
- não realizar reembolso automático do sinal.

Sem pagamento aprovado:

- não criar reembolso.

Registrar:

`canceladoPor = cliente`

e:

`canceladoEm`.

## Profissional

Quando a profissional cancelar:

- cancelar a reserva;
- registrar motivo;
- liberar o horário;
- se houver sinal pago, solicitar reembolso integral independentemente da antecedência.

Registrar:

`canceladoPor = profissional`

e:

`canceladoEm`.

---

# 33. Reagendamento

O reagendamento deve preservar a reserva original até que o novo horário esteja garantido.

Fluxo:

1. validar novo horário;
2. garantir disponibilidade;
3. atualizar a reserva;
4. somente depois liberar definitivamente o horário antigo.

Se o novo horário não puder ser reservado, o agendamento original deve permanecer inalterado.

---

# 34. Cloudflare R2

Credenciais administrativas do R2 nunca devem chegar ao navegador.

Uploads devem utilizar:

- URLs assinadas;
- mecanismo equivalente seguro.

Antes do armazenamento devem ser validados:

- tenant;
- autorização;
- formato;
- MIME type;
- tamanho;
- quantidade permitida.

O nome do arquivo não deve funcionar como mecanismo de autorização.

---

# 35. Limites de mídia

## Fotos

- máximo de 5 MB;
- compressão;
- conversão para WebP quando aplicável.

## Vídeos

- máximo de 30 MB;
- máximo de 60 segundos;
- resolução recomendada de até 1080p.

## Portfólio

Máximo atual:

**20 arquivos por profissional**, somando fotos e vídeos.

O backend deve validar limites críticos mesmo que o frontend já tenha feito a validação.

---

# 36. Exclusão de mídia

A remoção definitiva deve:

1. remover a referência correspondente;
2. remover o objeto do storage;
3. tratar falhas;
4. evitar arquivos órfãos.

Ao excluir completamente uma conta, as mídias operacionais correspondentes também devem ser removidas.

---

# 37. WhatsApp

O MVP utiliza:

`wa.me`

O sistema prepara a mensagem e abre o WhatsApp.

O envio depende da ação do usuário.

Não descrever `wa.me` como envio automático por API.

Evitar colocar dados pessoais desnecessários em URLs ou mensagens.

---

# 38. Resend

O Resend será utilizado para comunicações transacionais, incluindo:

- verificação;
- recuperação;
- notificações necessárias.

Nunca incluir em e-mails:

- senha;
- access token;
- refresh token;
- segredos internos.

Marketing deve permanecer separado de comunicação transacional.

---

# 39. Logs e auditoria

Operações críticas devem possuir rastreabilidade proporcional.

Exemplos:

- autenticação relevante;
- alterações críticas;
- mudanças em integrações;
- pagamento;
- reembolso;
- cancelamento;
- reagendamento;
- exclusão de conta;
- incidente de segurança;
- ações administrativas.

Não registrar desnecessariamente:

- senhas;
- tokens;
- códigos de autenticação;
- segredos;
- dados pessoais completos.

Logs não devem se transformar em uma cópia escondida da base de dados.

---

# 40. Operação offline

O modo offline pode permitir consulta de informações previamente armazenadas.

Operações críticas não podem ser consideradas concluídas offline.

Incluem:

- novo agendamento;
- pagamento;
- cancelamento crítico;
- reembolso;
- exclusão;
- alteração de segurança.

A interface deve indicar quando algo ainda não foi sincronizado.

Dados locais devem ser minimizados.

---

# 41. Modo de manutenção

Durante incidentes ou manutenção, o sistema deve poder bloquear:

- novos agendamentos;
- pagamentos;
- alterações críticas;
- operações administrativas específicas.

Ativação e desativação devem ser protegidas por autorização.

Registrar:

- responsável;
- data;
- horário;
- motivo;
- encerramento.

Contas administrativas dos provedores e infraestrutura devem utilizar MFA/2FA quando a funcionalidade estiver disponível.

---

# 42. LGPD e papéis de tratamento

A classificação entre controlador e operador depende da finalidade de cada tratamento.

Em determinadas operações, a profissional pode determinar finalidades relacionadas ao atendimento das próprias clientes.

O Beleza em Dia processa dados para fornecer a plataforma e também possui finalidades próprias relacionadas a:

- conta da profissional;
- autenticação;
- segurança;
- prevenção de fraude e abuso;
- operação da plataforma;
- cumprimento de obrigações próprias.

Os papéis jurídicos definitivos devem ser avaliados por finalidade e revisados juridicamente antes do lançamento comercial.

---

# 43. Termos e Política de Privacidade

Para a profissional devem existir ações separadas:

`☑ Li e aceito os Termos de Uso`

`☑ Li e declaro estar ciente da Política de Privacidade`

Registrar no backend:

- `termosVersaoAceita`;
- `termosAceitosEm`;
- `politicaPrivacidadeVersaoCiente`;
- `politicaPrivacidadeCienteEm`.

Esses registros não podem depender apenas de localStorage.

---

# 44. Aviso no agendamento público

Antes de criar a reserva, apresentar:

> **Ao agendar, seus dados serão utilizados pelo Beleza em Dia e compartilhados com este estabelecimento para administrar sua reserva e entrar em contato sobre o atendimento.**

Disponibilizar:

- Termos de Uso;
- Política de Privacidade.

Registrar:

- `avisoPrivacidadeVersao`;
- `avisoPrivacidadeExibidoEm`.

O aviso não deve ser tratado automaticamente como consentimento para marketing.

---

# 45. Marketing

Marketing deve possuir tratamento separado.

Se implementado:

`☐ Quero receber novidades e ofertas do Beleza em Dia.`

A recusa não pode impedir o uso normal da plataforma.

O usuário deve poder interromper futuras comunicações promocionais.

---

# 46. Dependências, repositório e CI/CD

Dependências devem ser mantidas atualizadas de maneira controlada.

Antes de atualizações relevantes:

- verificar mudanças incompatíveis;
- executar testes;
- analisar vulnerabilidades conhecidas.

Dependências abandonadas ou vulneráveis devem ser corrigidas ou substituídas.

No GitHub:

- segredos nunca devem ser commitados;
- arquivos `.env` sensíveis devem permanecer ignorados;
- permissões do repositório devem ser restritas;
- contas com acesso administrativo devem utilizar 2FA quando disponível;
- alterações críticas devem ser revisadas antes do deploy quando o projeto possuir equipe;
- credenciais expostas devem ser revogadas imediatamente, mesmo que o commit seja apagado.

CI/CD não deve imprimir segredos em logs.

---

# 47. Menor privilégio

Cada usuário, serviço e credencial deve possuir apenas as permissões necessárias.

Exemplos:

- frontend não recebe credenciais administrativas;
- tenant acessa apenas os próprios dados;
- cliente acessa somente uma reserva autorizada;
- funções públicas não recebem permissões administrativas;
- credenciais de serviço devem possuir escopo mínimo quando o provedor permitir.

---

# 48. Operações administrativas

Operações sensíveis exigem autorização adequada.

Exemplos:

- exclusão de conta;
- alteração de Mercado Pago;
- manutenção;
- alteração de segurança;
- operações administrativas globais.

Quando apropriado, exigir confirmação explícita.

Contas administrativas da:

- Vercel;
- Convex;
- GitHub;
- Cloudflare;
- Mercado Pago;
- Resend;

devem utilizar MFA/2FA quando disponível.

---

# 49. Incidentes de segurança

O sistema deve possuir procedimento para incidentes.

Ao identificar suspeita de:

- acesso indevido;
- vazamento;
- token exposto;
- credencial comprometida;
- falha de autorização;
- alteração indevida;
- fraude;
- perda de dados;

deve-se:

1. conter o incidente;
2. preservar evidências;
3. determinar impacto;
4. revogar credenciais comprometidas;
5. corrigir a causa;
6. identificar dados/titulares afetados;
7. registrar o ocorrido;
8. avaliar obrigações legais de comunicação;
9. acompanhar a recuperação.

O procedimento jurídico e regulatório deve seguir o documento específico de Preparação e Revisão Jurídica.

---

# 50. Analytics e monitoramento

Ferramentas de analytics e monitoramento não devem receber dados pessoais desnecessários.

Evitar enviar:

- telefone;
- endereço;
- nome completo;
- token de reserva;
- observações;
- credenciais;
- informações financeiras identificáveis desnecessárias.

Preferir eventos e identificadores técnicos minimizados.

Antes da produção deve ser definido exatamente:

- quais ferramentas de analytics serão utilizadas;
- quais cookies/armazenamentos serão utilizados;
- quais dados cada ferramenta recebe.

---

# 51. Privacidade no frontend

Evitar dados pessoais desnecessários em:

- query strings;
- URLs;
- localStorage;
- títulos da página;
- analytics;
- logs do navegador.

Dados sensíveis devem permanecer disponíveis somente onde forem necessários.

---

# 52. Cache

Informações privadas devem possuir políticas de cache compatíveis com sua sensibilidade.

Uma página privada não pode ser indevidamente reutilizada por outra sessão.

Informações armazenadas offline devem ser minimizadas.

---

# 53. Exclusão no Convex

Regras conceituais SQL como:

- `ON DELETE CASCADE`;
- `ON DELETE RESTRICT`;
- `FOREIGN KEY`;
- `UNIQUE`;

precisam ser implementadas explicitamente no Convex quando necessárias.

Exclusões devem utilizar:

- Mutations;
- verificações;
- índices;
- regras de autorização;
- ordem segura de remoção.

---

# 54. Índices e consultas

Consultas devem utilizar índices adequados.

Não buscar conjuntos indiscriminados de dados para depois filtrá-los somente no navegador.

Filtros de interface não substituem autorização.

---

# 55. Valores financeiros

Valores financeiros relevantes devem ser calculados ou confirmados no backend.

O frontend não pode alterar arbitrariamente:

- preço;
- sinal;
- valor pago;
- reembolso.

No Convex, preferir valores monetários em centavos inteiros.

Exemplo:

`R$ 30,00 = 3000`

---

# 56. Status

Estados atuais:

- `pendente`;
- `confirmado`;
- `finalizado`;
- `cancelado`;
- `expirado`.

No-Show não é um status do MVP.

O backend deve validar transições de estado.

O frontend não pode definir livremente qualquer estado.

---

# 57. Dados internos e observações

Observações relacionadas a clientes devem:

- possuir finalidade legítima relacionada ao atendimento;
- pertencer somente ao tenant;
- evitar conteúdo excessivo;
- não ser compartilhadas com outros estabelecimentos;
- não ser comercializadas;
- evitar dados sensíveis quando não forem necessários.

Não existe estrutura obrigatória `clients.notasInternas` no MVP atual.

---

# 58. Retenção e exclusão

Regra principal:

**Não manter dados pessoais apenas "por garantia".**

Dados devem permanecer enquanto forem necessários para finalidade concreta.

## Profissional

Após solicitação válida de exclusão:

1. verificar pendências;
2. resolver agendamentos futuros;
3. resolver pagamentos;
4. resolver reembolsos;
5. impedir novas reservas;
6. excluir dados operacionais;
7. excluir mídias;
8. excluir integrações;
9. excluir tenant;
10. excluir conta.

## Cliente

Dados devem permanecer somente enquanto necessários para:

- reserva;
- atendimento;
- contato;
- cancelamento;
- pagamento;
- reembolso;
- exercício de direitos;
- finalidade legítima informada.

Não existe retenção genérica de 24 meses apenas por padrão.

## Dados financeiros

Não existe retenção genérica de cinco anos apenas por conveniência.

Retenção deve existir somente quando houver finalidade ou obrigação concreta aplicável.

---

# 59. Testes de segurança

Devem ser testados cenários como:

- profissional A tenta acessar dados da profissional B;
- usuário deslogado chama Mutation privada;
- token público é alterado;
- token inválido é usado;
- duas clientes reservam simultaneamente;
- preço é adulterado no frontend;
- sinal é adulterado no frontend;
- Webhook inválido é enviado;
- Webhook duplicado é recebido;
- retorno do pagamento ocorre sem confirmação;
- reembolso sofre timeout;
- reembolso é clicado duas vezes;
- arquivo inválido é enviado;
- arquivo excede limite;
- profissional tenta excluir conta com pendências;
- cliente tenta acessar dados de outra pessoa;
- sessão expirada tenta alterar dados;
- requisições repetidas tentam abusar de códigos de verificação.

O teste deve confirmar rejeição no backend.

Esconder um botão não constitui proteção.

---

# 60. Checklist Mestre do Sistema

O checklist completo de:

- documentação;
- produto;
- arquitetura;
- segurança;
- integrações;
- implementação;
- testes;
- privacidade;
- infraestrutura;
- lançamento;

é mantido separadamente no documento:

**Beleza em Dia - Checklist Mestre de Prontidão do Sistema**

Esse checklist é a fonte de acompanhamento para determinar o que:

- já foi decidido;
- já foi documentado;
- foi implementado;
- foi testado;
- ainda está pendente.

---

# 61. Preparação e Revisão Jurídica

O processo jurídico completo é mantido separadamente no documento:

**Beleza em Dia - Preparação para Revisão Jurídica e Conformidade**

Esse documento especifica:

- momento adequado da revisão;
- documentos que devem ser enviados;
- informações sobre o sistema;
- questões que devem ser analisadas;
- checklist pré-revisão;
- checklist da análise;
- checklist pós-revisão;
- controle das alterações jurídicas.

As Diretrizes de Segurança não substituem esse processo.

---

# 62. Regra Final

Em caso de conflito entre conveniência de implementação e segurança de uma operação crítica, priorizar:

1. integridade dos dados;
2. autorização;
3. proteção de dados pessoais;
4. confirmação real de operações financeiras;
5. rastreabilidade proporcional;
6. experiência do usuário.

Nenhuma funcionalidade pode depender exclusivamente da confiança no navegador para proteger:
- dinheiro;
- dados;
- identidade;
- permissões.

---

**Documento:** Diretrizes de Segurança e Proteção de Dados  
**Sistema:** Beleza em Dia  
**Versão:** 1.0  
**Status:** Diretriz técnica interna  
**Última atualização:** 06/09/2026