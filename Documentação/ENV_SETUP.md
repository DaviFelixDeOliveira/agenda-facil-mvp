# Configuração de Ambiente e Integrações

Este arquivo informa à pessoa ou à IA responsável pelo desenvolvimento quais serviços, credenciais, endpoints e decisões precisam ser definidos para executar o Beleza em Dia. Os valores reais nunca devem ser colocados neste documento, em commits, prompts ou mensagens de chat.

## 1. Regras de Segurança

- Criar um `.env.example` somente com nomes de variáveis e valores fictícios.
- Usar `.env.local` no desenvolvimento e variáveis protegidas no ambiente de deploy.
- Nunca enviar tokens, chaves privadas, senhas, credenciais de banco ou segredos de webhook para uma IA.
- Chaves com prefixo público só podem ser usadas no navegador quando o provedor indicar explicitamente que são públicas.
- Segredos devem ser consumidos exclusivamente em funções server-side.
- Rotacionar qualquer credencial que tenha sido exposta.

## 2. Next.js, React e TypeScript

O frontend oficial usa Next.js com App Router, React, TypeScript e Tailwind CSS. Os componentes visuais usam shadcn/ui e Lucide React. Formulários usam React Hook Form e Zod.

Para processamento de imagens no navegador, instalar e configurar Browser Image Compression. Fotos devem ser convertidas para WebP antes do upload para o Cloudflare R2.

## 3. Variáveis de Aplicação

| Variável | Obrigatória | Onde usar | O que fornecer |
|---|---|---|---|
| `NEXT_PUBLIC_APP_URL` | Sim | Cliente e servidor | URL pública do ambiente, por exemplo `https://agenda.exemplo.com` |
| `NEXT_PUBLIC_APP_NAME` | Não | Interface | Nome exibido da aplicação: `Beleza em Dia` |
| `NODE_ENV` | Sim | Servidor | `development`, `test` ou `production` |
| `NEXT_PUBLIC_SUPPORT_WHATSAPP` | Não | Interface | Telefone de suporte em formato internacional |

Para uma ativação emergencial quando o painel estiver indisponível, definir com a equipe de infraestrutura um mecanismo protegido, como `MAINTENANCE_MODE=true`, em variável de ambiente do ambiente de deploy. Essa variável não deve ser controlável pelo navegador e sua alteração deve gerar registro operacional. O painel administrativo continua sendo o fluxo normal de ativação e desativação.

## 4. Convex Cloud

O backend planejado usa Convex para banco reativo e funções serverless.

| Variável | Obrigatória | O que fornecer |
|---|---|---|
| `CONVEX_DEPLOYMENT` | Sim | Identificador do deployment Convex |
| `NEXT_PUBLIC_CONVEX_URL` | Sim | URL pública da aplicação Convex |
| `CONVEX_DEPLOY_KEY` | Apenas CI/CD | Chave de deploy para migrações e publicação server-side |

Também é necessário fornecer à IA:

- Nome do deployment de desenvolvimento e produção.
- Região ou política de residência dos dados, se aplicável.
- Comando oficial usado para iniciar o Convex.
- Estrutura de autenticação: Convex Auth para login e gestão de sessões.
- Verificação de login por OTP de 6 dígitos enviado pelo Resend.
- Queries, Mutations e Cron Jobs necessários para cada módulo.

## 5. Autenticação com Convex Auth

- Configuração do provider de autenticação escolhido.
- URL pública de callback, quando exigida.
- Domínio autorizado para login e recuperação de conta.
- Configuração de e-mail transacional para envio do código OTP de 6 dígitos.
- Template, validade, limite de tentativas e política de reenvio do OTP.

Fornecer também as URLs de login, logout, cadastro e redirecionamento após autenticação.

## 6. Cloudflare R2 e Storage de Imagens

O storage oficial do projeto é o Cloudflare R2. Fornecer o nome do bucket, domínio público ou CDN, políticas de acesso e limites de upload.

| Variável | Obrigatória | Onde usar |
|---|---|---|
| `R2_ACCOUNT_ID` | Sim | Servidor |
| `R2_ACCESS_KEY_ID` | Sim | Servidor |
| `R2_SECRET_ACCESS_KEY` | Sim | Servidor |
| `R2_BUCKET_NAME` | Sim | Servidor |
| `R2_PUBLIC_URL` | Sim, se imagens forem públicas | Cliente e servidor |
| `R2_ENDPOINT` | Sim, se exigido pelo SDK | Servidor |

Regras de mídia do MVP:

- Limitar o portfólio a 20 arquivos por profissional, somando fotos e vídeos.
- Limitar fotos a 5 MB por arquivo e vídeos a 30 MB por arquivo e 60 segundos.
- Comprimir e redimensionar imagens no client-side antes do upload.
- Converter fotos para WebP antes de emitir o upload.
- Recomendar resolução de 1080p para vídeos.
- Definir limite de tamanho, quantidade por serviço e quantidade total do portfólio.
- Usar upload direto com URL assinada quando possível.
- Nunca expor `R2_SECRET_ACCESS_KEY` ou credencial equivalente no frontend.

## 7. Mercado Pago e Pagamentos Pix

O gateway oficial do projeto é o Mercado Pago API. Informar a documentação da versão da API usada.

| Variável | Obrigatória | O que fornecer |
|---|---|---|
| `PAYMENT_PROVIDER` | Sim | `mercadopago` |
| `PAYMENT_API_KEY` | Sim | Token privado do ambiente escolhido |
| `PAYMENT_WEBHOOK_SECRET` | Se disponível | Segredo para validar webhooks |
| `PAYMENT_WEBHOOK_URL` | Sim | URL pública que receberá eventos de pagamento |
| `PAYMENT_ENVIRONMENT` | Sim | `sandbox` ou `production` |

Também fornecer:

- Endpoint base da API e versão.
- Identificador da conta ou subconta, se necessário.
- Eventos de webhook para cobrança criada, Pix pago, expirado, cancelado e estornado.
- Tempo de expiração da cobrança.
- Política de cancelamento e reembolso do sinal.

Regra obrigatória: QR Code aberto ou redirecionamento iniciado não significa pagamento confirmado. A confirmação deve vir de webhook validado ou consulta server-side confiável.

## 8. WhatsApp

`wa.me` serve para abrir uma conversa ou link pré-preenchido e não fornece, sozinho, envio automático em segundo plano. Para notificações automáticas, escolher um provedor oficial da WhatsApp Business Platform ou um BSP compatível.

### Link `wa.me`

- `NEXT_PUBLIC_WHATSAPP_NUMBER`: telefone público de contato, sem token.
- `NEXT_PUBLIC_WHATSAPP_MESSAGE_TEMPLATE`: mensagem opcional sem dados sensíveis excessivos.

### API oficial ou BSP

| Variável | Obrigatória | O que fornecer |
|---|---|---|
| `WHATSAPP_PROVIDER` | Se houver automação | Nome do provedor |
| `WHATSAPP_API_BASE_URL` | Sim para API | Endpoint base |
| `WHATSAPP_ACCESS_TOKEN` | Sim para API | Token privado |
| `WHATSAPP_PHONE_NUMBER_ID` | Sim para API | ID do número de envio |
| `WHATSAPP_BUSINESS_ACCOUNT_ID` | Conforme provedor | ID da conta empresarial |
| `WHATSAPP_WEBHOOK_VERIFY_TOKEN` | Se houver webhook | Token de verificação |
| `WHATSAPP_WEBHOOK_SECRET` | Se houver assinatura | Segredo para validar eventos |

Fornecer os templates aprovados, idioma, variáveis de cada template, janela de atendimento e política de opt-in. A IA deve implementar retry, idempotência e log do status de envio sem duplicar mensagens.

## 9. E-mail Transacional com Resend

Para o Resend:

| Variável | Obrigatória | O que fornecer |
|---|---|---|
| `RESEND_API_KEY` | Sim, se usado | Chave privada do Resend |
| `EMAIL_FROM` | Sim | Remetente verificado, por exemplo `Beleza em Dia <noreply@dominio.com>` |
| `EMAIL_REPLY_TO` | Não | Endereço para respostas |
| `EMAIL_WEBHOOK_SECRET` | Se houver webhook | Segredo para validar eventos |

Fornecer o domínio verificado, templates, remetentes permitidos e eventos de recuperação de senha, confirmação de conta e confirmação de agendamento.

## 10. Deploy, Observabilidade e Domínio

| Variável | Obrigatória | O que fornecer |
|---|---|---|
| `VERCEL_PROJECT_ID` | CI/CD | ID do projeto Vercel |
| `VERCEL_ORG_ID` | CI/CD | ID da organização ou conta |
| `VERCEL_TOKEN` | CI/CD | Token protegido, somente no ambiente do deploy |
| `SENTRY_DSN` | Recomendado | DSN público do projeto Sentry |
| `SENTRY_AUTH_TOKEN` | CI/CD | Token para sourcemaps e releases |

Fornecer domínio, ambientes, URLs de preview, regras de CORS, domínio de e-mail e alertas de uptime.

## 11. O que Passar para a IA Desenvolvedora

Entregar somente informações de configuração, nunca os valores secretos:

1. Framework e comando para executar o projeto.
2. Provedor escolhido para Convex, autenticação, storage, Pix, WhatsApp e e-mail.
3. URLs base, IDs públicos, nomes de buckets e nomes de eventos.
4. URLs de callback e webhook que deverão ser criadas.
5. Schemas ou regras de dados do agendamento, pagamento, sinal, cliente e profissional.
6. Templates de mensagens e e-mails, sem dados reais de clientes.
7. Regras de negócio: agenda fixa/flexível, sinal, tolerância de 15 minutos, cancelamento em até 24 horas e reagendamento.
8. Limites de imagens, política de retenção, permissões e requisitos LGPD.
9. Comandos de teste, sandbox, usuários fictícios e critérios de aceite.

## 12. Checklist Antes do Desenvolvimento

- [ ] Um provedor foi escolhido para cada integração.
- [ ] Ambientes sandbox e produção foram separados.
- [ ] Domínio e URLs de callback/webhook estão definidos.
- [ ] Segredos foram cadastrados no gerenciador de variáveis do ambiente.
- [ ] `.env.example` não contém valores reais.
- [ ] Webhooks possuem validação de assinatura, idempotência e logs.
- [ ] Políticas de cancelamento, reembolso e atraso foram aprovadas.
- [ ] Limites de upload e bucket foram definidos.
- [ ] Templates de WhatsApp foram aprovados pelo provedor.
- [ ] Dados fictícios foram preparados para testes.