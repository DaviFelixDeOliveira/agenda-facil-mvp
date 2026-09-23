# ✅ Checklist Mestre de Prontidão do Sistema

## Beleza em Dia

**Tipo de documento:** Controle mestre de prontidão  
**Objetivo:** acompanhar tudo que precisa ser definido, documentado, implementado, validado e testado antes do lançamento do Beleza em Dia.

**Última atualização:** 06/09/2026

---

# Legenda

- [x] Concluído / definido / documentado
- [ ] Pendente

> Um item marcado como documentado não significa necessariamente que já foi implementado no código.

---

# 1. Identidade e Escopo do Produto

- [x] Nome do sistema definido: Beleza em Dia.
- [x] Objetivo principal definido.
- [x] Público-alvo definido.
- [x] MVP definido.
- [x] Cliente sem conta no MVP.
- [x] Profissional com conta autenticada.
- [x] Agendamento público por link.
- [x] Perfil público do estabelecimento.
- [x] Portfólio definido.
- [x] Agenda fixa definida.
- [x] Agenda flexível definida.
- [x] Atendimento em salão definido.
- [x] Atendimento domiciliar definido.
- [x] Sinal antecipado definido.
- [x] Mercado Pago escolhido como gateway.
- [x] Checkout Pro escolhido.
- [x] OAuth por profissional definido.
- [x] Comissão Beleza em Dia definida como 0% no MVP.
- [x] WhatsApp via `wa.me` definido.
- [x] No-Show retirado do MVP.
- [x] Reembolso parcial retirado do MVP.
- [x] Pagamento integral antecipado mantido como futuro.
- [x] PDV/estoque classificado como módulo opcional/futuro conforme escopo.
- [ ] Revisar todo o escopo uma última vez antes de congelar a versão MVP.

---

# 2. Documentação Principal

## Documento de Visão

- [x] Documento de Visão criado.
- [x] Contexto do produto documentado.
- [x] Problema documentado.
- [x] Solução documentada.
- [x] Público documentado.
- [x] Tecnologias documentadas.
- [x] Módulos principais documentados.
- [x] Arquitetura Convex registrada como oficial.
- [x] SQL registrado apenas como referência conceitual.

## Especificação Funcional

- [x] Fluxos principais de autenticação documentados.
- [x] Fluxo de onboarding documentado.
- [x] Perfil público documentado.
- [x] Fluxo público de agendamento documentado.
- [x] Fluxo de sinal documentado.
- [x] Mercado Pago documentado.
- [x] Cancelamento documentado.
- [x] Reembolso documentado.
- [x] Privacidade da cliente documentada.
- [x] Exclusão da conta profissional documentada.
- [x] Operação offline crítica documentada.
- [x] Manutenção documentada.
- [ ] Detalhar completamente a tela Agenda.
- [ ] Detalhar completamente a tela Clientes.
- [ ] Detalhar completamente a tela Financeiro.
- [ ] Detalhar completamente a tela Perfil administrativa.
- [ ] Detalhar completamente Configurações.
- [ ] Detalhar completamente Meus Serviços.
- [ ] Detalhar completamente Minha Agenda/Horários.
- [ ] Executar revisão final da Especificação Funcional inteira após concluir essas telas.

## Modelagem de Dados

- [x] Entidades conceituais principais definidas.
- [x] Arquivo SQL conceitual criado.
- [x] Convex definido como banco oficial.
- [x] Relação users → tenants definida.
- [x] Serviços definidos.
- [x] Disponibilidade definida.
- [x] Portfolio definido.
- [x] Bloqueios definidos.
- [x] Appointments definidos.
- [x] Appointment Services definidos.
- [x] Mercado Pago OAuth definido.
- [x] Token público definido.
- [x] Campos de cancelamento definidos.
- [x] Campos de reembolso definidos.
- [x] Índices conceituais principais registrados.
- [ ] Traduzir modelagem conceitual para `convex/schema.ts`.
- [ ] Revisar índices reais necessários no Convex.
- [ ] Testar integridade das relações na implementação real.

---

# 3. Documentação Jurídica

- [x] Termos de Uso elaborados.
- [x] Política de Privacidade elaborada.
- [x] Versão atual definida como 1.1.
- [x] Aceite dos Termos separado da ciência da Política.
- [x] Aviso público de privacidade definido.
- [x] Fluxo de direitos da cliente definido.
- [x] Fluxo de exclusão da profissional definido.
- [x] Minimização de dados documentada.
- [x] Retenção genérica arbitrária removida.
- [x] Regras de pagamento e reembolso documentadas.
- [x] Papel do Mercado Pago descrito.
- [ ] Criar Mapa de Tratamento de Dados Pessoais.
- [ ] Mapear bases legais por finalidade.
- [ ] Definir formalmente controlador/operador por operação.
- [ ] Inventariar fornecedores que tratam dados.
- [ ] Avaliar contratos/termos de proteção de dados dos fornecedores.
- [ ] Definir dados oficiais da empresa/responsável que aparecerão nos documentos.
- [ ] Definir canal oficial de privacidade.
- [ ] Avaliar necessidade/designação de encarregado conforme realidade jurídica da operação.
- [ ] Avaliar necessidade de RIPD.
- [ ] Realizar revisão jurídica profissional.
- [ ] Aplicar correções solicitadas pelo jurídico.
- [ ] Aprovar versão jurídica final para produção.

---

# 4. Segurança

- [x] Diretrizes de Segurança e Proteção de Dados criadas.
- [x] Multi-tenancy documentado.
- [x] Autorização server-side documentada.
- [x] Segurança do `tokenPublico` documentada.
- [x] Segurança financeira documentada.
- [x] Idempotência documentada.
- [x] Proteção de OAuth documentada.
- [x] Upload seguro documentado.
- [x] Minimização de logs documentada.
- [x] Exclusão segura documentada.
- [ ] Implementar autenticação real.
- [ ] Implementar autorização de tenant.
- [ ] Implementar rate limiting.
- [ ] Implementar proteção contra brute force.
- [ ] Implementar política de segurança dos headers.
- [ ] Revisar CSRF de acordo com o método de autenticação real.
- [ ] Revisar CORS.
- [ ] Implementar proteção de tokens OAuth em repouso.
- [ ] Testar exposição de segredos.
- [ ] Testar enumeração de recursos.
- [ ] Realizar revisão de segurança pré-produção.

---

# 5. Decisões Técnicas Pendentes

- [x] Next.js definido.
- [x] React definido.
- [x] TypeScript definido.
- [x] Tailwind definido.
- [x] Shadcn UI definido.
- [x] Lucide definido.
- [x] React Hook Form definido.
- [x] Zod definido.
- [x] Convex definido.
- [x] Convex Auth definido.
- [x] Convex Cloud definido.
- [x] Cloudflare R2 definido.
- [x] Resend definido.
- [x] Mercado Pago definido.
- [x] Vercel definida.
- [x] GitHub definido.
- [ ] Definir estratégia oficial de timezone.
- [ ] Definir formato oficial de armazenamento/conversão de horários.
- [ ] Definir ferramentas finais de analytics.
- [ ] Definir ferramentas finais de monitoramento de erros.
- [ ] Definir se haverá cookies não essenciais.
- [ ] Documentar política técnica de cache.
- [ ] Definir política real de backup/restauração conforme provedores.

---

# 6. Design e UX

- [x] Estratégia Mobile First definida.
- [x] Uso do design system definido.
- [ ] Finalizar wireframes de todas as telas do MVP.
- [ ] Finalizar comportamento responsivo.
- [ ] Validar telas de 320 px.
- [ ] Validar telas de 360 px.
- [ ] Validar telas de 375 px.
- [ ] Validar telas de 390 px.
- [ ] Validar telas de 412 px.
- [ ] Validar tablet.
- [ ] Validar desktop.
- [ ] Revisar acessibilidade.
- [ ] Validar contraste.
- [ ] Validar navegação por teclado onde aplicável.
- [ ] Validar labels de formulários.
- [ ] Validar mensagens de erro.
- [ ] Validar estados de loading.
- [ ] Validar estados vazios.
- [ ] Validar estados offline.

---

# 7. Convex

- [ ] Criar schema definitivo.
- [ ] Criar índices.
- [ ] Implementar users/auth.
- [ ] Implementar tenants.
- [ ] Implementar services.
- [ ] Implementar availability.
- [ ] Implementar blocked_times.
- [ ] Implementar tenant_portfolio.
- [ ] Implementar appointments.
- [ ] Implementar appointment_services.
- [ ] Implementar integração Mercado Pago por tenant.
- [ ] Implementar verificações de tenant em Queries.
- [ ] Implementar verificações de tenant em Mutations.
- [ ] Implementar transições de status.
- [ ] Implementar expiração de reservas.
- [ ] Implementar exclusão segura.
- [ ] Implementar índices para telefone quando necessários.
- [ ] Implementar geração segura de `tokenPublico`.
- [ ] Testar concorrência de reservas.

---

# 8. Autenticação e Cadastro

- [ ] Implementar cadastro por e-mail.
- [ ] Implementar senha.
- [ ] Implementar login.
- [ ] Implementar login Google.
- [ ] Implementar verificação de e-mail.
- [ ] Implementar código de 6 dígitos.
- [ ] Implementar expiração do código.
- [ ] Implementar limite de tentativas.
- [ ] Implementar recuperação de senha.
- [ ] Implementar logout.
- [ ] Implementar proteção de rotas.
- [ ] Implementar bloqueio de onboarding incompleto.
- [ ] Registrar aceite de Termos.
- [ ] Registrar ciência da Política.
- [ ] Implementar reaceite quando necessário.

---

# 9. Onboarding

- [x] Fluxo conceitual documentado.
- [ ] Implementar dados iniciais.
- [ ] Implementar perfil.
- [ ] Implementar tipo de atendimento.
- [ ] Implementar endereço de salão.
- [ ] Implementar agenda.
- [ ] Implementar serviços.
- [ ] Implementar configuração de sinal.
- [ ] Implementar conexão Mercado Pago.
- [ ] Implementar aceite legal.
- [ ] Registrar etapa atual.
- [ ] Registrar conclusão.
- [ ] Bloquear acesso ao painel enquanto obrigatório estiver incompleto.

---

# 10. Perfil Público

- [ ] Implementar slug único.
- [ ] Implementar perfil público.
- [ ] Implementar apresentação.
- [ ] Implementar serviços.
- [ ] Implementar preços.
- [ ] Implementar duração.
- [ ] Implementar portfólio.
- [ ] Implementar disponibilidade.
- [ ] Implementar atendimento em salão.
- [ ] Implementar atendimento domiciliar.
- [ ] Implementar visualização mobile.
- [ ] Implementar estados indisponíveis.

---

# 11. Agendamento

- [x] Antecedência mínima definida em 1 hora.
- [x] Expiração pendente definida em 30 minutos.
- [x] Estados definidos.
- [ ] Implementar seleção de serviço.
- [ ] Implementar múltiplos serviços.
- [ ] Implementar snapshot de preço.
- [ ] Implementar snapshot de duração.
- [ ] Implementar calendário.
- [ ] Implementar horários.
- [ ] Implementar validação de disponibilidade.
- [ ] Implementar proteção contra double booking.
- [ ] Implementar tipo de atendimento.
- [ ] Implementar endereço domiciliar condicional.
- [ ] Implementar nome.
- [ ] Implementar telefone.
- [ ] Implementar observação.
- [ ] Implementar aviso de privacidade.
- [ ] Registrar versão do aviso.
- [ ] Implementar reserva pendente.
- [ ] Implementar expiração automática.
- [ ] Implementar confirmação.
- [ ] Implementar link seguro.

---

# 12. Mercado Pago

- [x] Checkout Pro definido.
- [x] OAuth definido.
- [x] Comissão da plataforma em 0% definida.
- [x] Preference ID separado de Payment ID.
- [x] Webhook definido como fonte confiável.
- [ ] Criar aplicação oficial no Mercado Pago.
- [ ] Configurar OAuth.
- [ ] Configurar redirect URI.
- [ ] Implementar conexão de conta.
- [ ] Implementar armazenamento seguro dos tokens.
- [ ] Implementar refresh quando necessário.
- [ ] Implementar criação de preferência.
- [ ] Implementar redirect ao Checkout Pro.
- [ ] Implementar Webhook.
- [ ] Implementar validação da assinatura.
- [ ] Implementar tratamento de eventos duplicados.
- [ ] Implementar reconciliação de pagamentos.
- [ ] Testar sandbox.
- [ ] Testar cenários de falha.
- [ ] Testar produção de forma controlada antes do lançamento geral.

---

# 13. Cancelamento

- [x] Regra das 24 horas definida.
- [x] Cancelamento profissional definido.
- [x] Cancelamento cliente definido.
- [ ] Implementar cancelamento da cliente.
- [ ] Implementar cancelamento profissional.
- [ ] Registrar autor.
- [ ] Registrar horário.
- [ ] Registrar motivo quando necessário.
- [ ] Liberar horário corretamente.
- [ ] Impedir dupla execução.

---

# 14. Reembolso

- [x] Apenas integral no MVP.
- [x] Estados definidos.
- [x] Idempotência definida.
- [x] Falha por saldo insuficiente definida.
- [ ] Implementar solicitação.
- [ ] Implementar `X-Idempotency-Key`.
- [ ] Persistir chave.
- [ ] Implementar estado pendente.
- [ ] Implementar processando.
- [ ] Implementar concluído.
- [ ] Implementar falhou.
- [ ] Implementar nova tentativa segura.
- [ ] Implementar tratamento de timeout.
- [ ] Implementar tratamento de saldo insuficiente.
- [ ] Bloquear exclusão enquanto reembolso não estiver resolvido.

---

# 15. Reagendamento

- [x] Regra de atomicidade definida.
- [ ] Implementar validação do novo horário.
- [ ] Garantir novo horário antes de liberar o antigo.
- [ ] Preservar original em caso de falha.
- [ ] Registrar alteração.
- [ ] Testar concorrência.

---

# 16. Cloudflare R2

- [x] R2 escolhido.
- [x] Limites conceituais definidos.
- [ ] Criar configuração de produção.
- [ ] Criar configuração de desenvolvimento.
- [ ] Implementar upload seguro.
- [ ] Implementar URL assinada ou mecanismo equivalente.
- [ ] Validar tipo.
- [ ] Validar tamanho.
- [ ] Validar autorização.
- [ ] Implementar compressão.
- [ ] Implementar WebP.
- [ ] Implementar exclusão.
- [ ] Testar arquivos inválidos.
- [ ] Testar arquivos muito grandes.
- [ ] Garantir que credenciais nunca cheguem ao navegador.

---

# 17. Resend

- [x] Resend escolhido.
- [ ] Configurar domínio/remetente.
- [ ] Configurar ambiente de desenvolvimento.
- [ ] Configurar produção.
- [ ] Implementar verificação de e-mail.
- [ ] Implementar recuperação.
- [ ] Criar templates.
- [ ] Validar links/códigos.
- [ ] Testar falha no envio.
- [ ] Impedir exposição de segredos.

---

# 18. WhatsApp

- [x] `wa.me` escolhido.
- [x] Envio automático fora do MVP.
- [ ] Implementar mensagens pré-preenchidas.
- [ ] Validar telefone.
- [ ] Normalizar telefone.
- [ ] Evitar dados excessivos.
- [ ] Testar Android.
- [ ] Testar iOS.
- [ ] Testar WhatsApp Web/Desktop quando aplicável.

---

# 19. Área da Cliente

- [x] Cliente sem conta.
- [x] `/agendamento/[token]` definido.
- [ ] Implementar consulta segura.
- [ ] Implementar alteração do nome.
- [ ] Implementar alteração do telefone.
- [ ] Implementar cancelamento.
- [ ] Implementar acompanhamento de pagamento.
- [ ] Implementar acompanhamento de reembolso.
- [ ] Implementar contato com profissional.
- [ ] Impedir acesso a outras reservas.
- [ ] Testar tokens inválidos.
- [ ] Testar enumeração.

---

# 20. Privacidade

- [x] `/privacidade` definido.
- [x] `Falar sobre meus dados` definido.
- [x] Nome/telefone isolados definidos como prova insuficiente para acesso amplo.
- [ ] Implementar página.
- [ ] Implementar canal de solicitação.
- [ ] Criar procedimento interno de verificação de identidade.
- [ ] Criar procedimento de acesso.
- [ ] Criar procedimento de correção.
- [ ] Criar procedimento de exclusão.
- [ ] Criar protocolo/rastreabilidade do pedido.
- [ ] Testar solicitações.

---

# 21. Exclusão da Conta Profissional

- [x] Bloqueadores definidos.
- [x] Ordem conceitual de exclusão definida.
- [ ] Implementar verificação de agendamentos futuros.
- [ ] Implementar verificação de pagamentos.
- [ ] Implementar verificação de reembolsos.
- [ ] Mostrar pendências.
- [ ] Exigir confirmação.
- [ ] Retirar perfil público.
- [ ] Bloquear novas reservas.
- [ ] Excluir dependências.
- [ ] Excluir mídias.
- [ ] Excluir integração Mercado Pago.
- [ ] Excluir tenant.
- [ ] Excluir usuário/auth.
- [ ] Testar falhas intermediárias.

---

# 22. Telas Administrativas

## Dashboard

- [ ] Revisar especificação final.
- [ ] Implementar.
- [ ] Testar.

## Agenda

- [ ] Finalizar especificação.
- [ ] Implementar.
- [ ] Testar.

## Clientes

- [ ] Finalizar especificação.
- [ ] Confirmar agrupamento/recorrência dentro do tenant.
- [ ] Implementar.
- [ ] Testar.

## Financeiro

- [ ] Finalizar especificação.
- [ ] Decidir se appointments são suficientes ou se futuro ledger será necessário.
- [ ] Implementar.
- [ ] Testar.

## Perfil

- [ ] Finalizar especificação.
- [ ] Implementar.
- [ ] Testar.

## Configurações

- [ ] Finalizar especificação.
- [ ] Implementar.
- [ ] Testar.

## Serviços

- [ ] Finalizar especificação.
- [ ] Implementar.
- [ ] Testar.

## Horários

- [ ] Finalizar especificação.
- [ ] Implementar.
- [ ] Testar.

---

# 23. Offline/PWA

- [x] Regra de não concluir operações críticas offline definida.
- [ ] Implementar detecção offline.
- [ ] Implementar tela offline.
- [ ] Definir exatamente quais dados podem ser armazenados.
- [ ] Implementar cache seguro.
- [ ] Implementar sincronização permitida.
- [ ] Tratar conflitos.
- [ ] Testar reconexão.
- [ ] Testar perda de conexão durante operação crítica.

---

# 24. Manutenção

- [x] Conceito documentado.
- [ ] Implementar flag global.
- [ ] Implementar autorização.
- [ ] Implementar tela.
- [ ] Bloquear operações críticas.
- [ ] Implementar registro do incidente.
- [ ] Implementar mecanismo emergencial.
- [ ] Testar ativação.
- [ ] Testar desativação.
- [ ] Testar recuperação de operações pendentes.

---

# 25. Segurança Web

- [ ] Configurar HTTPS em produção.
- [ ] Configurar headers.
- [ ] Revisar CSP.
- [ ] Revisar XSS.
- [ ] Revisar CSRF.
- [ ] Revisar CORS.
- [ ] Revisar cookies.
- [ ] Revisar cache.
- [ ] Revisar redirects.
- [ ] Revisar URLs contendo tokens.
- [ ] Revisar analytics em páginas sensíveis.
- [ ] Executar teste de autorização horizontal entre tenants.

---

# 26. Segredos e Contas

- [ ] Ativar 2FA no GitHub.
- [ ] Ativar 2FA na Vercel quando disponível.
- [ ] Ativar 2FA no Convex quando disponível.
- [ ] Ativar 2FA no Cloudflare.
- [ ] Ativar 2FA no Mercado Pago.
- [ ] Ativar 2FA no Resend quando disponível.
- [ ] Separar credenciais de desenvolvimento e produção.
- [ ] Auditar `.env`.
- [ ] Auditar histórico Git.
- [ ] Garantir ausência de segredos no frontend.
- [ ] Criar procedimento de rotação de credenciais.

---

# 27. Logs e Monitoramento

- [ ] Escolher ferramenta de monitoramento.
- [ ] Configurar erros.
- [ ] Configurar alertas.
- [ ] Minimizar PII.
- [ ] Remover tokens de logs.
- [ ] Remover códigos de verificação de logs.
- [ ] Registrar operações financeiras críticas.
- [ ] Registrar exclusões.
- [ ] Definir retenção técnica de logs.
- [ ] Testar alertas.

---

# 28. Backups e Recuperação

- [ ] Documentar mecanismos fornecidos pelo Convex.
- [ ] Documentar mecanismos do R2.
- [ ] Definir procedimento de recuperação.
- [ ] Definir responsáveis.
- [ ] Testar restauração quando tecnicamente suportada.
- [ ] Confirmar comportamento de dados excluídos em backups.
- [ ] Documentar RPO/RTO se necessário para produção.

---

# 29. Analytics e Cookies

- [ ] Definir analytics.
- [ ] Inventariar cookies.
- [ ] Inventariar localStorage/sessionStorage.
- [ ] Identificar itens estritamente necessários.
- [ ] Identificar itens opcionais.
- [ ] Avaliar necessidade de consentimento/banner.
- [ ] Atualizar Política de Privacidade conforme decisão.
- [ ] Bloquear analytics desnecessário em páginas de reserva sensíveis quando apropriado.

---

# 30. Testes Funcionais

- [ ] Cadastro.
- [ ] Login.
- [ ] Google.
- [ ] Recuperação.
- [ ] Onboarding.
- [ ] Serviços.
- [ ] Agenda fixa.
- [ ] Agenda flexível.
- [ ] Bloqueios.
- [ ] Agendamento.
- [ ] Multi-serviços.
- [ ] Atendimento domiciliar.
- [ ] Atendimento em salão.
- [ ] Signal off.
- [ ] Signal on.
- [ ] Checkout.
- [ ] Webhook.
- [ ] Expiração.
- [ ] Cancelamento cliente.
- [ ] Cancelamento profissional.
- [ ] Reembolso.
- [ ] Reagendamento.
- [ ] Token público.
- [ ] Exclusão profissional.
- [ ] Privacidade cliente.
- [ ] Offline.
- [ ] Manutenção.

---

# 31. Testes de Concorrência e Falhas

- [ ] Duas reservas simultâneas.
- [ ] Dois cliques no botão de agendamento.
- [ ] Dois Webhooks iguais.
- [ ] Dois pedidos de reembolso.
- [ ] Timeout de pagamento.
- [ ] Timeout de reembolso.
- [ ] Queda de internet.
- [ ] Falha do Convex.
- [ ] Falha do R2.
- [ ] Falha do Resend.
- [ ] Falha do Mercado Pago.
- [ ] Sessão expirada durante operação.
- [ ] Exclusão interrompida.

---

# 32. Testes de Segurança

- [ ] Tenant A acessando tenant B.
- [ ] Cliente acessando outro token.
- [ ] IDOR.
- [ ] Forjamento de tenantId.
- [ ] Alteração de preço no navegador.
- [ ] Alteração de status.
- [ ] Alteração de valor de reembolso.
- [ ] Upload inválido.
- [ ] XSS.
- [ ] CSRF quando aplicável.
- [ ] Brute force.
- [ ] Rate limit.
- [ ] Exposição de segredos.
- [ ] Logs contendo dados sensíveis.
- [ ] Webhook falso.
- [ ] OAuth associado ao tenant incorreto.

---

# 33. Performance

- [ ] Testar carregamento 4G.
- [ ] Testar páginas públicas.
- [ ] Testar imagens.
- [ ] Testar portfólio.
- [ ] Testar agenda com volume maior.
- [ ] Testar consultas Convex.
- [ ] Revisar índices.
- [ ] Otimizar imagens.
- [ ] Testar Web Vitals.

---

# 34. Acessibilidade

- [ ] Contraste.
- [ ] Labels.
- [ ] Foco.
- [ ] Teclado.
- [ ] Texto alternativo.
- [ ] Estados de erro acessíveis.
- [ ] Botões identificáveis.
- [ ] Leitura adequada em mobile.
- [ ] Revisão WCAG aplicável.

---

# 35. Infraestrutura de Produção

- [ ] Projeto Vercel de produção.
- [ ] Projeto Convex de produção.
- [ ] R2 de produção.
- [ ] Resend de produção.
- [ ] Mercado Pago de produção.
- [ ] Domínio oficial.
- [ ] HTTPS.
- [ ] DNS.
- [ ] Variáveis de ambiente.
- [ ] Webhooks oficiais.
- [ ] OAuth redirect oficial.
- [ ] Logs.
- [ ] Monitoramento.
- [ ] Alertas.

---

# 36. Preparação Jurídica Final

- [x] Termos elaborados.
- [x] Política elaborada.
- [x] Fluxos principais documentados.
- [ ] Concluir todas as decisões de produto que afetam documentos jurídicos.
- [ ] Criar pacote para revisão jurídica.
- [ ] Enviar documentos.
- [ ] Receber parecer/revisão.
- [ ] Corrigir documentos.
- [ ] Corrigir funcionalidades afetadas.
- [ ] Versionar novos documentos.
- [ ] Definir data de vigência.
- [ ] Publicar versões finais.

---

# 37. Beta com Usuários Reais

Antes de utilizar dados e pagamentos reais:

- [ ] Revisar segurança.
- [ ] Revisar privacidade.
- [ ] Ter Termos e Política disponíveis.
- [ ] Ter canal de privacidade funcionando.
- [ ] Testar cancelamento.
- [ ] Testar reembolso.
- [ ] Testar exclusão.
- [ ] Testar recuperação de falhas.
- [ ] Definir suporte.
- [ ] Definir contato em caso de incidente.

---

# 38. Pré-Produção

- [ ] Todos os bugs críticos corrigidos.
- [ ] Fluxos financeiros testados.
- [ ] Testes de autorização aprovados.
- [ ] Testes multi-tenant aprovados.
- [ ] Testes mobile aprovados.
- [ ] Testes de privacidade aprovados.
- [ ] Testes de exclusão aprovados.
- [ ] Monitoramento funcionando.
- [ ] Backups/recovery documentados.
- [ ] Jurídico revisado.
- [ ] Documentação atualizada.
- [ ] Variáveis e segredos auditados.
- [ ] Contas administrativas protegidas.
- [ ] Ambiente de produção aprovado.

---

# 39. Critério Final de Lançamento

O Beleza em Dia só deve ser considerado pronto para lançamento quando:

- [ ] funcionalidades obrigatórias do MVP estiverem implementadas;
- [ ] fluxos críticos estiverem testados;
- [ ] pagamentos e reembolsos estiverem confiáveis;
- [ ] isolamento de tenants estiver validado;
- [ ] Termos e Política refletirem o funcionamento real;
- [ ] revisão jurídica necessária estiver concluída;
- [ ] segurança mínima estiver implantada;
- [ ] monitoramento estiver operacional;
- [ ] suporte e incidentes possuírem procedimentos definidos;
- [ ] nenhuma pendência crítica deste checklist permanecer aberta.

---

# 40. Itens Fora do MVP

Os itens abaixo não bloqueiam o MVP atual:

- [x] No-Show formal mantido fora do MVP.
- [x] Reembolso parcial mantido fora do MVP.
- [x] Pagamento integral antecipado mantido fora do fluxo principal.
- [x] Conta global da cliente mantida fora do MVP.
- [x] API automática de WhatsApp mantida fora do MVP.

Esses recursos só devem ser implementados futuramente depois de:

- documentação;
- regras;
- análise de impacto;
- atualização da modelagem;
- atualização jurídica quando aplicável.

---

**Documento:** Checklist Mestre de Prontidão do Sistema  
**Sistema:** Beleza em Dia  
**Status:** Em andamento  
**Última atualização:** 06/09/2026