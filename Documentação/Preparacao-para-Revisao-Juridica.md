# ⚖️ Preparação para Revisão Jurídica e Conformidade

## Beleza em Dia

**Tipo de documento:** Procedimento interno de preparação jurídica  
**Sistema:** Beleza em Dia  
**Versão:** 1.0  
**Última atualização:** 06/09/2026

---

# 1. Objetivo

Este documento define como o Beleza em Dia deve se preparar para uma revisão jurídica antes do lançamento comercial definitivo.

O objetivo da revisão jurídica é verificar se:

- Termos de Uso;
- Política de Privacidade;
- fluxos de tratamento de dados;
- regras de pagamento;
- cancelamentos;
- reembolsos;
- responsabilidades;
- direitos das clientes;
- responsabilidades das profissionais;
- relações com fornecedores;

estão adequadamente documentados e compatíveis com o funcionamento real da plataforma.

A revisão jurídica não substitui testes técnicos e de segurança.

Da mesma forma, a revisão técnica não substitui a avaliação jurídica.

---

# 2. Quando realizar a revisão

A revisão principal deve ocorrer quando o MVP estiver suficientemente estabilizado.

Idealmente:

1. regras principais definidas;
2. fluxos documentados;
3. telas principais definidas;
4. integrações definidas;
5. modelo de pagamento definido;
6. tratamento de dados conhecido;
7. Termos e Política elaborados;
8. antes do lançamento comercial definitivo.

Caso o beta utilize clientes reais, dados pessoais reais ou pagamentos reais, a documentação jurídica e de privacidade deve estar minimamente funcional antes do início desse piloto.

Não é recomendável esperar o produto já estar amplamente em produção para descobrir que uma regra jurídica exige alteração do fluxo técnico.

---

# 3. Profissional jurídico a procurar

Dar preferência a advogado ou escritório com experiência em pelo menos parte das seguintes áreas:

- Direito Digital;
- proteção de dados;
- LGPD;
- contratos de software;
- SaaS;
- comércio eletrônico;
- relações de consumo;
- marketplaces/plataformas;
- pagamentos online.

Não basta solicitar apenas:

> "Veja se os Termos estão bons."

O profissional precisa compreender o funcionamento real da plataforma.

---

# 4. Pacote de documentos para enviar

O pacote jurídico do Beleza em Dia deve conter os documentos abaixo.

## 4.1 Documento de Visão

Enviar:

**Beleza em Dia - Documento de Visão**

Deve explicar:

- o que é o produto;
- público;
- problema;
- solução;
- módulos;
- modelo de negócio;
- tecnologias;
- atores do sistema.

Status:

- [x] Documento existente.
- [ ] Fazer revisão final antes de enviar ao advogado.

---

## 4.2 Especificação Funcional

Enviar:

**Beleza em Dia - Especificação Funcional do Sistema**

Deve mostrar exatamente:

- telas;
- ações;
- fluxos;
- pagamentos;
- cancelamentos;
- reembolsos;
- exclusão;
- agendamento;
- privacidade;
- integrações.

Status:

- [x] Grande parte documentada.
- [ ] Concluir telas administrativas pendentes.
- [ ] Realizar revisão final.
- [ ] Remover qualquer regra antiga conflitante antes do envio.

---

## 4.3 Termos de Uso

Enviar a versão atual dos:

**Termos de Uso do Beleza em Dia**

Status atual:

- [x] Texto elaborado.
- [x] Versão 1.1 definida.
- [ ] Revisão jurídica profissional pendente.
- [ ] Aprovação final pendente.

O advogado deve revisar especialmente:

- identificação da plataforma;
- regras de cadastro;
- obrigações da profissional;
- obrigações da plataforma;
- uso permitido;
- disponibilidade;
- pagamentos;
- Mercado Pago;
- comissão da plataforma;
- cancelamento;
- reembolso;
- exclusão;
- responsabilidade;
- suspensão de conta;
- propriedade intelectual;
- alterações dos Termos;
- foro e legislação aplicável;
- relações de consumo quando aplicáveis.

---

# 5. Política de Privacidade

Enviar:

**Política de Privacidade do Beleza em Dia**

Status:

- [x] Texto elaborado.
- [x] Versão 1.1 definida.
- [ ] Revisão jurídica profissional pendente.
- [ ] Aprovação final pendente.

O advogado deve analisar:

- quem trata os dados;
- quais dados são tratados;
- finalidades;
- bases legais;
- compartilhamentos;
- fornecedores;
- direitos dos titulares;
- retenção;
- exclusão;
- segurança;
- transferências internacionais quando houver;
- cookies/analytics;
- canal de privacidade;
- papel da profissional;
- papel do Beleza em Dia;
- Mercado Pago;
- backups.

---

# 6. Diretrizes de Segurança

Enviar:

**Beleza em Dia - Diretrizes de Segurança e Proteção de Dados**

Esse documento ajuda o advogado a compreender as medidas técnicas planejadas.

Status:

- [x] Documento criado.
- [ ] Revisar após a implementação real.
- [ ] Confirmar se o comportamento técnico final corresponde ao documento.

---

# 7. Modelagem de Dados

Enviar:

**Modelagem Conceitual de Dados**

Pode incluir o SQL de referência, deixando claro:

> O arquivo SQL é conceitual. O backend oficial é Convex.

Também enviar posteriormente, se útil:

- `convex/schema.ts`;
- resumo das collections;
- diagrama simplificado das entidades.

O advogado não precisa analisar código detalhadamente, mas precisa entender quais dados existem.

Status:

- [x] Modelagem conceitual criada.
- [ ] Schema Convex definitivo pendente.
- [ ] Criar versão simplificada para revisão jurídica.

---

# 8. Mapa de Tratamento de Dados

Criar um documento específico chamado:

**Mapa de Tratamento de Dados Pessoais - Beleza em Dia**

Para cada tratamento registrar:

| Campo | Descrição |
|---|---|
| Titular | Quem é a pessoa |
| Dados | Quais dados são tratados |
| Origem | De onde vêm |
| Finalidade | Por que são usados |
| Base legal | Fundamento jurídico a validar |
| Compartilhamento | Com quem são enviados |
| Armazenamento | Onde ficam |
| Retenção | Enquanto necessário para quê |
| Exclusão | Como são removidos |
| Segurança | Principais proteções |

Exemplo:

| Titular | Dados | Finalidade |
|---|---|---|
| Profissional | nome, e-mail | criação e gestão da conta |
| Cliente | nome, telefone | criação e administração da reserva |
| Cliente | endereço | atendimento domiciliar |
| Cliente | pagamento/status | acompanhar sinal e reembolso |

Status:

- [ ] Criar documento.
- [ ] Mapear todos os dados.
- [ ] Validar finalidades.
- [ ] Validar bases legais com advogado.

---

# 9. Inventário de Fornecedores

Criar uma lista dos fornecedores que podem tratar, armazenar ou transmitir informações relacionadas ao sistema.

Fornecedores atuais ou planejados:

- Convex;
- Vercel;
- Cloudflare R2;
- Mercado Pago;
- Resend;
- Google, quando utilizado para autenticação;
- GitHub, para código e CI/CD;
- ferramenta de analytics, quando definida;
- ferramenta de monitoramento, quando definida.

Para cada fornecedor registrar:

- finalidade;
- dados envolvidos;
- país/região quando relevante;
- política de privacidade;
- termos;
- contrato/DPA quando disponível;
- mecanismo de exclusão;
- mecanismo de segurança.

Status:

- [x] Principais fornecedores técnicos identificados.
- [ ] Criar inventário formal.
- [ ] Coletar termos aplicáveis.
- [ ] Coletar DPAs ou documentos equivalentes quando disponíveis.
- [ ] Solicitar análise jurídica das relações relevantes.

---

# 10. Fluxograma de Dados

Preparar um fluxo simples mostrando:

`Cliente → Beleza em Dia → Profissional`

e, conforme a operação:

`Beleza em Dia → Mercado Pago`

`Beleza em Dia → Convex`

`Beleza em Dia → Cloudflare R2`

`Beleza em Dia → Resend`

`Profissional/Cliente → WhatsApp via wa.me`

O fluxo deve mostrar que tipos de dados passam por cada componente.

Status:

- [ ] Criar fluxograma.

---

# 11. Telas que devem ser apresentadas ao jurídico

Quando disponíveis, enviar prints ou protótipos das telas juridicamente relevantes.

## Profissional

- [ ] Cadastro.
- [ ] Aceite dos Termos.
- [ ] Ciência da Política.
- [ ] Onboarding.
- [ ] Configurações de Mercado Pago.
- [ ] Configurações de privacidade.
- [ ] Solicitação de exclusão de conta.

## Cliente

- [ ] Perfil público.
- [ ] Formulário de agendamento.
- [ ] Aviso de privacidade.
- [ ] Checkout/redirecionamento.
- [ ] `/agendamento/[token]`.
- [ ] Cancelamento.
- [ ] Acompanhamento de reembolso.
- [ ] `/privacidade`.
- [ ] `Falar sobre meus dados`.

---

# 12. Dados da própria operação

Antes da versão jurídica definitiva, definir os dados oficiais que identificarão o responsável pela plataforma.

Podem incluir, conforme aplicável:

- nome empresarial;
- nome fantasia;
- CPF/CNPJ conforme estrutura jurídica adotada;
- endereço comercial;
- e-mail de suporte;
- contato de privacidade;
- responsável legal;
- domínio oficial.

Status:

- [ ] Definir estrutura jurídica/empresarial aplicável.
- [ ] Definir dados oficiais que aparecerão nos documentos.
- [ ] Definir e-mail de suporte.
- [ ] Definir canal de privacidade.

---

# 13. Controlador e Operador

Não tratar automaticamente a divisão:

> Profissional = controladora  
> Beleza em Dia = operador

como uma regra absoluta para todos os casos.

Cada finalidade deve ser analisada.

O advogado deve avaliar, entre outras situações:

- dados da conta da profissional;
- segurança da plataforma;
- reservas de clientes;
- comunicação;
- pagamentos;
- prevenção de fraude;
- logs;
- exercício de direitos;
- marketing;
- analytics.

Checklist:

- [ ] Mapear operações.
- [ ] Definir quem decide finalidade.
- [ ] Definir responsabilidades.
- [ ] Registrar papel por tratamento.
- [ ] Ajustar Termos.
- [ ] Ajustar Política de Privacidade.

---

# 14. Bases legais

Nem todo tratamento depende de consentimento.

O advogado deve identificar a base legal adequada para cada finalidade.

Exemplos de tratamentos que precisam ser analisados:

- criação da conta;
- execução do serviço;
- agendamento;
- segurança;
- prevenção de fraude;
- pagamentos;
- reembolsos;
- obrigações legais;
- atendimento de direitos;
- marketing.

Checklist:

- [ ] Mapear cada finalidade.
- [ ] Associar base jurídica apropriada.
- [ ] Evitar consentimento genérico.
- [ ] Garantir consentimento separado quando realmente utilizado.
- [ ] Documentar possibilidade de revogação quando aplicável.

---

# 15. Direitos dos titulares

O processo deve contemplar direitos previstos na legislação aplicável, incluindo quando cabíveis:

- informação;
- confirmação de tratamento;
- acesso;
- correção;
- anonimização;
- bloqueio;
- eliminação;
- portabilidade conforme regulamentação aplicável;
- informações sobre compartilhamento;
- revogação do consentimento quando utilizado;
- oposição quando cabível.

No MVP:

- `/agendamento/[token]` trata uma reserva específica;
- `/privacidade` oferece canal mais amplo;
- `Falar sobre meus dados` inicia solicitações mais abrangentes.

Status:

- [x] Fluxo conceitual definido.
- [ ] Implementar.
- [ ] Criar procedimento interno.
- [ ] Definir responsável por responder.
- [ ] Criar modelo de resposta.
- [ ] Criar registro/protocolo.

---

# 16. Verificação de identidade

Solicitações amplas não podem ser atendidas apenas porque alguém conhece:

- nome;
- telefone.

A verificação deve ser proporcional.

Não solicitar dados excessivos.

Checklist:

- [x] Princípio definido.
- [ ] Definir procedimento técnico/manual.
- [ ] Validar procedimento juridicamente.
- [ ] Criar instrução interna.
- [ ] Testar fluxo.

---

# 17. Retenção de dados

O projeto já decidiu não utilizar períodos genéricos arbitrários apenas "por garantia".

O jurídico deve validar:

- quais dados realmente precisam permanecer;
- por quais finalidades;
- por quanto tempo;
- quais obrigações podem exigir retenção;
- quando excluir;
- quando anonimizar.

Checklist:

- [x] Princípio de minimização definido.
- [x] Retenção genérica de 24 meses removida.
- [x] Retenção genérica de 5 anos removida.
- [ ] Criar matriz de retenção por categoria.
- [ ] Validar obrigações específicas.
- [ ] Incorporar resultado à Política.
- [ ] Incorporar resultado ao backend.

---

# 18. Exclusão de conta da profissional

Validar juridicamente o processo:

1. solicitação;
2. verificação de pendências;
3. resolução de reservas;
4. resolução de pagamentos;
5. resolução de reembolsos;
6. retirada do perfil público;
7. exclusão dos dados operacionais;
8. tratamento de eventuais retenções obrigatórias.

Status:

- [x] Regra funcional definida.
- [ ] Implementar.
- [ ] Validar juridicamente.

---

# 19. Exclusão de dados da cliente

A cliente poderá solicitar exclusão:

- em relação a um estabelecimento;
- de dados verificados localizados no Beleza em Dia.

Antes disso, podem precisar ser resolvidos:

- reservas futuras;
- pagamentos;
- reembolsos;
- obrigações aplicáveis.

Dados mantidos independentemente pela profissional fora do Beleza em Dia não estão sob controle técnico da plataforma.

Status:

- [x] Regra conceitual definida.
- [ ] Implementar.
- [ ] Validar juridicamente.

---

# 20. Mercado Pago

Enviar ao advogado um resumo do fluxo:

1. profissional conecta Mercado Pago por OAuth;
2. Beleza em Dia cria preferência;
3. cliente é redirecionada ao Checkout Pro;
4. Mercado Pago processa pagamento;
5. backend recebe/confirma resultado;
6. Beleza em Dia registra estado;
7. reembolso pode ser solicitado conforme as regras.

Informar:

- comissão Beleza em Dia = 0% no MVP;
- Mercado Pago pode cobrar próprias taxas;
- plataforma não armazena dados completos de cartão;
- Mercado Pago pode manter registros próprios independentemente da exclusão no Beleza em Dia.

Checklist:

- [x] Arquitetura definida.
- [x] Regras de cancelamento definidas.
- [x] Regras de reembolso definidas.
- [ ] Implementação pendente.
- [ ] Revisão jurídica das cláusulas pendente.

---

# 21. Relação com consumidores

Solicitar análise específica sobre a aplicação de regras de defesa do consumidor às diferentes relações existentes.

Avaliar:

- Beleza em Dia ↔ profissional;
- profissional ↔ cliente;
- Beleza em Dia ↔ cliente quando aplicável;
- responsabilidades por serviços de beleza;
- responsabilidades por indisponibilidade da plataforma;
- pagamentos;
- cancelamentos;
- reembolsos;
- informações ao consumidor.

Checklist:

- [ ] Solicitar análise.
- [ ] Ajustar Termos conforme resultado.
- [ ] Ajustar telas se necessário.

---

# 22. Marketing

Marketing deve permanecer separado da prestação essencial do serviço.

Exemplo:

`☐ Quero receber novidades e ofertas do Beleza em Dia.`

Checklist:

- [x] Marketing separado conceitualmente.
- [ ] Definir se marketing fará parte do MVP.
- [ ] Caso seja implementado, revisar mecanismo jurídico.
- [ ] Implementar opt-in quando necessário.
- [ ] Implementar revogação/descadastro.
- [ ] Registrar preferência.

---

# 23. Cookies e Analytics

Antes da revisão final, produzir inventário de:

- cookies;
- localStorage;
- sessionStorage;
- analytics;
- pixels;
- ferramentas de monitoramento.

Para cada item:

- finalidade;
- fornecedor;
- duração;
- necessidade;
- dados tratados.

Não presumir automaticamente que todo site precisa do mesmo modelo de banner.

A necessidade e a forma de consentimento devem ser analisadas conforme as tecnologias realmente utilizadas.

Checklist:

- [ ] Escolher analytics.
- [ ] Fazer inventário.
- [ ] Classificar tecnologias necessárias/opcionais.
- [ ] Revisar com jurídico.
- [ ] Criar banner/configuração quando efetivamente necessário.
- [ ] Atualizar Política.

---

# 24. Transferências e fornecedores internacionais

Como serviços de nuvem podem operar infraestrutura fora do Brasil ou possuir organizações internacionais, o jurídico deve avaliar as transferências internacionais aplicáveis.

Checklist:

- [ ] Mapear localizações relevantes dos provedores.
- [ ] Mapear transferências.
- [ ] Avaliar mecanismos jurídicos aplicáveis.
- [ ] Atualizar Política se necessário.

---

# 25. Encarregado e canal de privacidade

A necessidade, forma de atuação e divulgação de encarregado deve ser avaliada conforme:

- porte;
- natureza da operação;
- regulamentação aplicável;
- enquadramento jurídico da empresa.

Independentemente disso, deve existir um canal funcional para solicitações relacionadas à privacidade.

Checklist:

- [ ] Avaliar necessidade de encarregado.
- [ ] Definir responsável pelo canal.
- [ ] Definir e-mail/canal.
- [ ] Inserir dados necessários na Política.
- [ ] Criar procedimento de atendimento.

---

# 26. RIPD

O Relatório de Impacto à Proteção de Dados Pessoais não deve ser tratado automaticamente como obrigatório para toda operação.

O advogado deve avaliar:

- natureza dos dados;
- escala;
- riscos;
- tratamentos;
- critérios regulatórios;
- possibilidade de solicitação pela ANPD.

Checklist:

- [ ] Avaliar necessidade.
- [ ] Caso necessário, preparar RIPD.
- [ ] Manter atualizado conforme mudanças relevantes.

---

# 27. Incidentes de segurança

Deve existir processo que permita rapidamente:

- identificar incidente;
- conter;
- avaliar dados afetados;
- identificar titulares;
- registrar circunstâncias;
- avaliar riscos;
- determinar necessidade de comunicação;
- preservar documentação.

A avaliação de comunicação deve considerar o Regulamento de Comunicação de Incidente de Segurança da ANPD.

Checklist:

- [x] Procedimento técnico básico descrito nas Diretrizes de Segurança.
- [ ] Criar procedimento operacional formal.
- [ ] Definir responsável.
- [ ] Criar formulário interno de registro.
- [ ] Definir contato jurídico.
- [ ] Criar modelo de comunicação.
- [ ] Validar critérios regulatórios.
- [ ] Treinar/testar procedimento.

---

# 28. Documentos de incidente

Preparar antecipadamente modelos internos para registrar:

- data de descoberta;
- data do conhecimento;
- sistema afetado;
- natureza do incidente;
- dados envolvidos;
- número estimado de titulares;
- risco;
- medidas adotadas;
- credenciais comprometidas;
- ações de contenção;
- comunicação realizada;
- correção aplicada.

Status:

- [ ] Criar modelo.

---

# 29. Documentos dos fornecedores

Reunir quando aplicável:

- Termos de Serviço;
- Política de Privacidade;
- Data Processing Agreement;
- termos de segurança;
- termos de pagamento;
- termos de marketplace;
- condições de OAuth.

Checklist:

- [ ] Convex.
- [ ] Vercel.
- [ ] Cloudflare.
- [ ] Mercado Pago.
- [ ] Resend.
- [ ] Google.
- [ ] Analytics escolhido.
- [ ] Monitoramento escolhido.

---

# 30. Perguntas para fazer ao advogado

Enviar junto da documentação uma lista objetiva.

## LGPD

- [ ] Nossos papéis de controlador e operador estão corretamente definidos?
- [ ] Quais bases legais devem ser utilizadas em cada tratamento?
- [ ] Nossa Política de Privacidade contém informações suficientes?
- [ ] Nosso procedimento de direitos dos titulares é adequado?
- [ ] Nossa política de retenção está adequada?
- [ ] O procedimento de exclusão está correto?
- [ ] Precisamos de encarregado?
- [ ] Precisamos de RIPD?
- [ ] Como devemos tratar transferências internacionais?

## Termos

- [ ] As responsabilidades do Beleza em Dia estão adequadamente delimitadas?
- [ ] As responsabilidades da profissional estão claras?
- [ ] Precisamos alterar cláusulas de indisponibilidade?
- [ ] Regras de suspensão/exclusão estão adequadas?
- [ ] Regras de propriedade intelectual estão suficientes?

## Pagamentos

- [ ] Nossa relação com Mercado Pago está descrita corretamente?
- [ ] A regra de comissão 0% precisa de cláusula adicional?
- [ ] A regra de cancelamento de 24 horas está juridicamente adequada?
- [ ] O reembolso integral está corretamente descrito?
- [ ] Como tratar falhas de reembolso causadas pelo saldo do vendedor?

## Consumidor

- [ ] Em quais relações o CDC se aplica?
- [ ] O Beleza em Dia pode ser responsabilizado pelo serviço executado pela profissional?
- [ ] Precisamos alterar alguma tela ou aviso?

## Privacidade

- [ ] O aviso exibido antes do agendamento é suficiente?
- [ ] Precisamos de outras informações na tela?
- [ ] O canal público de privacidade é adequado?
- [ ] Nosso método de verificação de identidade é proporcional?

---

# 31. Mensagem para enviar ao profissional jurídico

Modelo:

> Estou desenvolvendo o Beleza em Dia, uma plataforma SaaS de agendamento para profissionais e estabelecimentos de beleza.
>
> A profissional possui conta e configura serviços, agenda, perfil e pagamentos. A cliente final não possui conta no MVP e realiza o agendamento por uma página pública.
>
> Quando configurado, o sinal é processado pelo Mercado Pago Checkout Pro utilizando OAuth da conta da própria profissional.
>
> Gostaria de uma revisão jurídica do produto, principalmente em relação aos Termos de Uso, Política de Privacidade, LGPD, definição de controlador/operador, direitos dos titulares, cancelamentos, reembolsos, responsabilidades da plataforma, relações de consumo e fornecedores envolvidos.
>
> Estou enviando também a especificação funcional, modelagem dos dados, diretrizes de segurança, mapa de tratamento e resumo das integrações para que a análise considere o funcionamento real do sistema.
>
> Gostaria que a revisão indicasse:
>
> 1. pontos corretos;
> 2. alterações necessárias;
> 3. riscos jurídicos identificados;
> 4. cláusulas ausentes;
> 5. alterações necessárias no funcionamento do sistema;
> 6. pontos que precisam de nova validação antes do lançamento.

---

# 32. Entregáveis que devem ser solicitados

É recomendável combinar previamente o que será entregue.

Solicitar, quando fizer parte do serviço contratado:

- [ ] Termos revisados.
- [ ] Política revisada.
- [ ] Comentários das alterações.
- [ ] Lista de riscos.
- [ ] Lista de pendências.
- [ ] Orientações sobre papéis LGPD.
- [ ] Orientações sobre retenção.
- [ ] Orientações sobre direitos dos titulares.
- [ ] Orientações sobre fornecedores.
- [ ] Orientações sobre incidentes.
- [ ] Indicação de mudanças necessárias no produto.

Evitar contratar uma revisão em que o único resultado seja:

> "Está tudo certo."

É importante entender o que foi analisado e quais limitações a avaliação possui.

---

# 33. Antes de enviar ao advogado

- [ ] Escopo do MVP está congelado para revisão.
- [ ] Documento de Visão atualizado.
- [ ] Especificação Funcional atualizada.
- [ ] Telas críticas documentadas.
- [ ] Termos atualizados.
- [ ] Política atualizada.
- [ ] Diretrizes de Segurança atualizadas.
- [ ] Modelagem de Dados atualizada.
- [ ] Mapa de Tratamento criado.
- [ ] Inventário de fornecedores criado.
- [ ] Fluxograma de dados criado.
- [ ] Prints/protótipos organizados.
- [ ] Lista de dúvidas preparada.
- [ ] Dados da operação definidos quando disponíveis.

---

# 34. Durante a revisão

- [ ] Explicar o sistema em reunião quando necessário.
- [ ] Demonstrar fluxo de cadastro.
- [ ] Demonstrar agendamento.
- [ ] Demonstrar Mercado Pago.
- [ ] Demonstrar cancelamento.
- [ ] Demonstrar reembolso.
- [ ] Demonstrar exclusão.
- [ ] Demonstrar privacidade.
- [ ] Registrar todas as recomendações.
- [ ] Identificar recomendações que exigem alteração de código.

---

# 35. Depois da revisão

Não basta trocar o texto dos Termos.

Se o advogado identificar que determinado comportamento deve mudar:

1. atualizar decisão;
2. atualizar Especificação Funcional;
3. atualizar banco/schema se necessário;
4. atualizar frontend;
5. atualizar backend;
6. atualizar Termos;
7. atualizar Política;
8. atualizar Diretrizes de Segurança;
9. atualizar testes.

Checklist:

- [ ] Termos corrigidos.
- [ ] Política corrigida.
- [ ] Documento de Visão corrigido quando necessário.
- [ ] Especificação corrigida.
- [ ] Segurança corrigida.
- [ ] Modelagem corrigida.
- [ ] Código corrigido.
- [ ] Testes corrigidos.
- [ ] Nova revisão das alterações relevantes.

---

# 36. Versionamento jurídico

Termos e Política devem possuir:

- número da versão;
- data de vigência;
- histórico interno de alterações.

Quando uma atualização exigir novo aceite da profissional:

- bloquear acesso conforme regra definida;
- apresentar a nova versão;
- registrar novo aceite.

Quando uma Política precisar de nova ciência:

- apresentar adequadamente;
- registrar a versão exibida.

Nunca sobrescrever silenciosamente a informação histórica de qual versão foi aceita.

---

# 37. Estado atual do Beleza em Dia

## Já preparado

- [x] Documento de Visão.
- [x] Grande parte da Especificação Funcional.
- [x] Modelagem conceitual.
- [x] Termos de Uso v1.1.
- [x] Política de Privacidade v1.1.
- [x] Regras de cancelamento.
- [x] Regras de reembolso.
- [x] Fluxo de exclusão da profissional.
- [x] Fluxo de direitos da cliente.
- [x] Diretrizes de Segurança e Proteção de Dados.

## Ainda precisa ser preparado

- [ ] Final da Especificação das telas administrativas.
- [ ] Mapa de Tratamento de Dados.
- [ ] Inventário jurídico de fornecedores.
- [ ] Fluxograma de dados.
- [ ] Inventário de cookies/analytics.
- [ ] Matriz de retenção.
- [ ] Matriz controlador/operador.
- [ ] Bases legais por finalidade.
- [ ] Dados oficiais da operação.
- [ ] Canal oficial de privacidade.
- [ ] Procedimento formal de incidente.
- [ ] Avaliação de encarregado.
- [ ] Avaliação de RIPD.
- [ ] Revisão por advogado.

---

# 38. Condição para aprovação jurídica interna

A etapa jurídica somente deve ser considerada pronta para produção quando:

- [ ] documentos representam o comportamento real do sistema;
- [ ] Termos foram revisados;
- [ ] Política foi revisada;
- [ ] papéis LGPD foram definidos;
- [ ] bases legais foram avaliadas;
- [ ] direitos dos titulares possuem procedimento;
- [ ] retenção foi validada;
- [ ] fornecedores foram analisados;
- [ ] pagamentos e reembolsos foram analisados;
- [ ] relações de consumo foram avaliadas;
- [ ] incidentes possuem procedimento;
- [ ] alterações recomendadas foram implementadas;
- [ ] versões finais foram publicadas;
- [ ] nenhuma pendência jurídica crítica conhecida permanece sem tratamento.

---

# 39. Regra Final

A revisão jurídica deve analisar o produto real.

Se a documentação disser uma coisa e o sistema fizer outra, a documentação não resolve o problema.

Por isso:

**Código, regras de negócio, Termos de Uso e Política de Privacidade devem permanecer alinhados.**

Qualquer mudança relevante em:

- dados coletados;
- finalidade;
- pagamento;
- marketing;
- compartilhamento;
- fornecedor;
- conta da cliente;
- retenção;
- cancelamento;
- reembolso;

deve provocar análise sobre a necessidade de atualizar a documentação jurídica.

---

**Documento:** Preparação para Revisão Jurídica e Conformidade  
**Sistema:** Beleza em Dia  
**Versão:** 1.0  
**Status:** Em preparação  
**Última atualização:** 06/09/2026