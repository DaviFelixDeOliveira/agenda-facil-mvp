# Beleza em Dia - Termos de Uso e Política de Privacidade

**Versão:** 1.1  

**Data de vigência:** 06/09/2026

Este documento explica, de forma simples, as regras para usar o Beleza em Dia e como os dados pessoais são tratados.

Ao criar uma conta profissional, serão apresentadas duas confirmações separadas:

- ☑ **Li e aceito os Termos de Uso**

- ☑ **Li e declaro estar ciente da Política de Privacidade**

A Política de Privacidade é um documento de transparência. Ela explica como os dados são usados, protegidos, compartilhados e por quanto tempo podem ser mantidos.

---

# Parte 1 - Termos de Uso

## 1. O que é o Beleza em Dia

O **Beleza em Dia** é uma plataforma para profissionais e estabelecimentos de beleza divulgarem seus serviços, organizarem sua agenda e receberem solicitações de agendamento.

A cliente pode acessar o perfil público de uma profissional e solicitar um horário sem precisar criar uma conta.

A profissional utiliza uma área autenticada para gerenciar seus serviços, disponibilidade, perfil, pagamentos e agendamentos.

---

## 2. Quem pode usar

Quem utilizar o sistema deve fornecer informações verdadeiras e utilizar a plataforma de forma legítima.

A pessoa responsável por uma conta profissional deve manter suas credenciais protegidas e não deve permitir o uso indevido da conta.

---

## 3. Conta profissional

A profissional pode criar ou acessar sua conta pelos meios de autenticação disponíveis no sistema.

Quando o fluxo exigir verificação de e-mail, a conta somente poderá avançar depois da confirmação correta.

A profissional é responsável por manter atualizados os dados do próprio perfil, como:

- nome;

- WhatsApp;

- estabelecimento;

- serviços;

- preços;

- agenda;

- local de atendimento.

---

## 4. Agendamentos

A cliente pode solicitar um agendamento pelo perfil público da profissional sem criar uma conta no MVP.

Antes de concluir a reserva, o sistema pode solicitar somente os dados necessários para o atendimento, como:

- nome;

- telefone/WhatsApp;

- serviço escolhido;

- data e horário;

- endereço, somente quando o atendimento for domiciliar;

- observação opcional.

A disponibilidade exibida na tela não substitui a validação final do servidor.

Antes de criar uma reserva, o sistema verifica novamente se o horário continua disponível.

Depois que um agendamento é criado, o Beleza em Dia pode disponibilizar à cliente um link individual e seguro no formato conceitual:

`/agendamento/[token]`

Esse link permite gerenciar somente a reserva à qual o token pertence. Ele não cria uma conta de cliente e não concede acesso a outros agendamentos, dados administrativos da profissional ou dados de outras pessoas.

Por esse link, quando a ação estiver disponível para o estado atual da reserva, a cliente poderá:

- visualizar o próprio agendamento;

- corrigir nome ou telefone vinculados àquela reserva;

- cancelar o agendamento conforme as regras aplicáveis;

- acompanhar o estado do pagamento e de eventual reembolso.

A cliente é responsável por não compartilhar publicamente esse link. O Beleza em Dia deve utilizar token suficientemente imprevisível e validar o estado real da reserva no backend antes de qualquer alteração.

---

## 5. Pré-reserva e confirmação

Quando uma reserva for criada como pendente, o horário pode permanecer temporariamente reservado pelo prazo definido no sistema.

No MVP atual, a pré-reserva possui prazo de **30 minutos**.

Se a confirmação ou o pagamento necessário não ocorrer dentro desse período, a reserva pode expirar e o horário voltar a ficar disponível.

---

## 6. Pagamentos e Mercado Pago

Quando a profissional exigir sinal antecipado, o pagamento é processado pelo **Mercado Pago** por meio da integração oficial definida pelo Beleza em Dia.

No MVP, cada profissional que utilizar pagamentos antecipados deve conectar a própria conta Mercado Pago. O valor pago pela cliente é processado pelo Mercado Pago e destinado à conta conectada da profissional, conforme as regras e condições do provedor.

O Beleza em Dia utiliza **Checkout Pro + OAuth** no fluxo oficial de pagamentos antecipados do MVP. A cliente é direcionada ao ambiente seguro do Mercado Pago para efetuar o pagamento e o Beleza em Dia somente considera a operação aprovada depois de confirmação confiável do backend junto ao provedor.

**Tarifas do Mercado Pago**:

Os pagamentos realizados pelo Mercado Pago podem estar sujeitos às tarifas cobradas pelo próprio Mercado Pago. Essas tarifas são definidas pelo provedor e podem variar conforme a conta da profissional, o meio de pagamento, o prazo de recebimento e outras condições comerciais aplicáveis. O Beleza em Dia não define nem recebe essas tarifas.

No MVP atual, o Beleza em Dia não cobra comissão sobre o valor processado pelo Mercado Pago.

O Beleza em Dia não deve armazenar:

- senhas bancárias;

- dados completos de cartão;

- credenciais privadas de pagamento da cliente;

- tokens privados do Mercado Pago no navegador.

O sistema pode armazenar somente os dados técnicos e financeiros necessários para conciliar a operação, como identificadores de preferência e pagamento, valores, status, datas e identificadores de reembolso.

O sistema somente considera um pagamento confirmado após validação confiável pelo backend e pelo provedor de pagamento.

Um botão como **Já paguei / Atualizar** apenas solicita nova consulta do estado e não transforma sozinho um pagamento em aprovado.

---

## 7. Cancelamento e reembolso

No MVP atual, o prazo de cancelamento sem perda do sinal é fixo em **24 horas**.

**Cancelamento solicitado pela cliente**:

- com **24 horas ou mais de antecedência**, se houver sinal efetivamente pago, a cliente tem direito ao reembolso integral do valor pago antecipadamente;

- com **menos de 24 horas de antecedência**, o cancelamento não gera reembolso automático do sinal pelo Beleza em Dia;

- quando não houver sinal pago, o cancelamento não gera operação de reembolso.

**Cancelamento realizado pela profissional**:

- se houver sinal efetivamente pago, o Beleza em Dia deverá solicitar o reembolso integral à cliente independentemente da antecedência do cancelamento;

- quando não houver pagamento antecipado, o agendamento pode ser cancelado sem operação financeira de reembolso.

O reembolso é solicitado ao Mercado Pago usando o pagamento original. Em um reembolso total, o valor de referência é o valor efetivamente pago pela cliente, e não o valor líquido que a profissional recebeu após tarifas do provedor.

O Beleza em Dia não recalcula manualmente a tarifa do Mercado Pago para definir o valor a devolver. O resultado financeiro deve seguir o que for confirmado pela API do provedor.

No MVP, o Beleza em Dia oferece somente **reembolso integral do sinal** quando houver direito à devolução. Reembolso parcial não faz parte do MVP atual.

O reembolso pode assumir estados como:

- **pendente**;

- **processando**;

- **concluído**;

- **falhou**.

O sistema somente pode informar que o reembolso foi concluído depois da confirmação real do Mercado Pago.

A integração deve utilizar mecanismo de idempotência para impedir que uma repetição de requisição gere duas devoluções para a mesma operação.

O Mercado Pago pode exigir saldo disponível na conta recebedora para processar o reembolso. Caso o provedor rejeite ou não conclua a operação, inclusive por saldo insuficiente, o Beleza em Dia deve manter a pendência registrada e informar que o reembolso ainda precisa ser resolvido, sem declarar sucesso.

A profissional não pode excluir a conta enquanto existir reembolso pendente, em processamento ou com falha ainda não resolvida.

As regras acima também dependem dos limites técnicos e operacionais do Mercado Pago aplicáveis à transação.

---

## 8. Atendimento prestado pela profissional

O Beleza em Dia fornece a plataforma tecnológica de agendamento e gestão.

O serviço de beleza é prestado pela profissional ou estabelecimento escolhido pela cliente.

A profissional é responsável por:

- qualidade e execução do atendimento;

- informações publicadas em seu perfil;

- preços e serviços oferecidos;

- cumprimento do horário e das condições informadas;

- contato com a cliente sobre o atendimento.

---

## 9. Conteúdo e portfólio

A profissional pode publicar fotos, vídeos, descrições e outras mídias permitidas pelo sistema.

Ao enviar conteúdo, a profissional declara que possui autorização para utilizar aquele material e que ele não viola direitos de terceiros.

Não é permitido publicar conteúdo:

- ilegal;

- enganoso;

- ofensivo;

- malicioso;

- que exponha dados de terceiros sem autorização adequada.

---

## 10. Uso proibido

Não é permitido utilizar o Beleza em Dia para:

- tentar acessar conta ou dados de outra profissional;

- manipular pagamentos ou agendamentos;

- explorar falhas de segurança;

- enviar conteúdo malicioso;

- realizar fraude;

- coletar dados de outras pessoas sem finalidade legítima;

- utilizar a plataforma de forma contrária à lei.

Contas envolvidas em abuso podem ser limitadas ou suspensas quando necessário para proteger usuários e o sistema.

---

## 11. Disponibilidade do sistema

O Beleza em Dia busca manter o serviço disponível e seguro, mas podem ocorrer interrupções por:

- manutenção;

- falhas de internet;

- indisponibilidade de serviços terceiros;

- incidentes técnicos;

- atualizações de segurança.

Operações críticas, como novos agendamentos, pagamentos, cancelamentos e reembolsos, não devem ser consideradas concluídas enquanto o backend não confirmar o resultado.

---

## 12. Alterações destes Termos

Os Termos de Uso possuem uma versão identificável.

Quando houver uma alteração relevante que exija nova confirmação, a profissional será informada e deverá aceitar a nova versão antes de continuar utilizando normalmente as áreas privadas do sistema.

Alterações apenas editoriais podem ser publicadas sem exigir novo aceite quando não modificarem de forma relevante as regras do serviço.

---

## 13. Encerramento da conta

A profissional pode solicitar exclusão da própria conta através de:

**Configurações > Privacidade e Dados > Solicitar exclusão da conta**

Antes de permitir a exclusão definitiva, o Beleza em Dia deve confirmar a identidade da profissional e verificar se existem pendências que dependam da conta.

A exclusão deve ser bloqueada temporariamente quando existir, por exemplo:

- agendamento futuro pendente ou confirmado;

- pagamento cujo estado ainda precise ser resolvido;

- reembolso pendente;

- reembolso em processamento;

- reembolso com falha ainda não resolvida.

Quando houver pendências, o sistema deve apresentá-las de forma clara e orientar a profissional a concluir ou cancelar os agendamentos necessários e resolver as operações financeiras antes de tentar novamente.

Depois que não houver pendências, a exclusão definitiva poderá prosseguir. Como regra operacional do Beleza em Dia, devem ser removidos os dados da conta e os dados vinculados à operação daquele estabelecimento, incluindo, quando aplicável:

- conta e credenciais de acesso do Beleza em Dia;

- perfil e dados do estabelecimento;

- serviços;

- agenda, disponibilidade e bloqueios;

- portfólio e mídias;

- integração e credenciais armazenadas do Mercado Pago;

- agendamentos e dados de clientes vinculados ao estabelecimento;

- demais dados operacionais que não precisem continuar armazenados.

O Beleza em Dia não deve conservar dados apenas "por garantia". Se alguma informação precisar ser preservada por obrigação legal, regulatória, segurança, prevenção a fraude ou exercício regular de direitos, a conservação deve ser limitada ao mínimo necessário e pelo período aplicável.

A exclusão de dados do Beleza em Dia não obriga provedores independentes, como o Mercado Pago, a apagar registros que eles próprios precisem manter segundo suas obrigações e políticas.

---

# Parte 2 - Política de Privacidade

## 14. Quais dados são coletados

### Dados da profissional

Podem ser tratados:

- nome;

- e-mail;

- telefone/WhatsApp;

- dados do estabelecimento;

- endereço do salão, quando informado;

- serviços;

- preços;

- disponibilidade;

- fotos e vídeos do portfólio;

- dados necessários para autenticação;

- informações relacionadas à integração com Mercado Pago;

- registros técnicos e de segurança.

### Dados da cliente

Como a cliente não precisa criar uma conta, o sistema coleta somente o necessário para o agendamento, como:

- nome;

- telefone/WhatsApp;

- serviço escolhido;

- data e horário;

- endereço, quando o atendimento for domiciliar;

- observação opcional;

- dados relacionados ao pagamento, quando houver sinal.

O Beleza em Dia não solicita e-mail da cliente quando ele não for necessário para o fluxo.

---

## 15. Para que os dados são usados

Os dados podem ser utilizados para:

- criar e administrar contas profissionais;

- autenticar usuários;

- criar agendamentos;

- confirmar agendamentos;

- remarcar agendamentos;

- cancelar agendamentos;

- consultar agendamentos;

- organizar agenda e disponibilidade;

- permitir contato entre cliente e profissional;

- processar e conferir pagamentos;

- enviar códigos de verificação e recuperação;

- armazenar portfólio e mídias;

- prevenir fraude e abuso;

- manter segurança e auditoria;

- cumprir obrigações aplicáveis;

- exercer direitos.

Os dados não devem ser usados para uma finalidade incompatível com aquela informada sem uma justificativa válida e, quando necessário, uma nova autorização.

---

## 16. Aviso mostrado à cliente antes do agendamento

Antes da criação da reserva, a cliente deverá visualizar o seguinte aviso:

> **Ao agendar, seus dados serão utilizados pelo Beleza em Dia e compartilhados com este estabelecimento para administrar sua reserva e entrar em contato sobre o atendimento.**

A tela também deve disponibilizar links para:

- **Termos de Uso**

- **Política de Privacidade**

O sistema pode registrar qual versão do aviso de privacidade foi apresentada no momento da reserva.

Esse registro não autoriza o envio de marketing.

---

## 17. Com quem os dados podem ser compartilhados

Os dados da cliente podem ser compartilhados com o estabelecimento escolhido porque isso é necessário para administrar a reserva e realizar o atendimento.

Também podem ser utilizados serviços técnicos necessários ao funcionamento da plataforma, como:

- **Convex**, para backend, banco de dados e funções do sistema;

- **Vercel**, para hospedagem da aplicação;

- **Cloudflare R2**, para armazenamento de mídias;

- **Resend**, para envio de e-mails transacionais;

- **Google**, quando a autenticação Google for utilizada;

- **Mercado Pago**, quando houver pagamento ou integração financeira, inclusive para criar o checkout, confirmar o pagamento, processar cancelamentos financeiros e solicitar/acompanhar reembolsos.

O Mercado Pago pode tratar e manter registros próprios conforme suas responsabilidades, políticas e obrigações aplicáveis. A exclusão de dados dentro do Beleza em Dia não significa automaticamente a exclusão dos registros mantidos pelo Mercado Pago em seus próprios sistemas.

Cada serviço deve receber apenas os dados necessários para cumprir sua função.

Dados das clientes de um estabelecimento não devem ser disponibilizados para outro estabelecimento.

---

## 18. Marketing

O aceite dos Termos de Uso e a ciência da Política de Privacidade **não autorizam marketing automaticamente**.

Se o Beleza em Dia oferecer novidades, promoções ou campanhas no futuro, deverá existir uma opção separada e opcional.

Exemplo:

> ☐ Quero receber novidades e ofertas do Beleza em Dia.

Recusar marketing não impede o uso normal da plataforma.

---

## 19. Como os dados são protegidos

O Beleza em Dia utiliza medidas técnicas e organizacionais para reduzir riscos de:

- acesso indevido;

- perda de informações;

- alteração não autorizada;

- divulgação indevida;

- fraude;

- uso abusivo.

Entre as medidas previstas estão:

- HTTPS;

- autenticação segura;

- controle de acesso por estabelecimento;

- validação das operações no backend;

- proteção de tokens e segredos;

- proteção de credenciais sensíveis;

- logs de segurança sem exposição desnecessária de dados;

- isolamento entre estabelecimentos.

Nenhum sistema é completamente livre de riscos.

Incidentes devem ser tratados com prioridade e dados pessoais não devem ser expostos por conveniência de implementação.

---

## 20. Por quanto tempo os dados ficam armazenados

O Beleza em Dia adota como regra a **minimização e a necessidade**: não manter dados pessoais apenas por conveniência ou "por garantia".

### Conta da profissional

Os dados permanecem enquanto a conta estiver ativa e enquanto forem necessários para fornecer o serviço.

Quando a profissional solicitar exclusão, o pedido não será concluído enquanto existirem agendamentos futuros ou operações de pagamento/reembolso que precisem ser resolvidas. Depois que essas pendências forem encerradas, o Beleza em Dia deverá excluir os dados operacionais vinculados à conta, salvo informação específica cuja conservação seja concretamente necessária por obrigação aplicável, segurança, prevenção a fraude ou exercício regular de direitos.

### Dados da cliente e agendamentos

Os dados da cliente devem ser mantidos somente enquanto forem necessários para administrar o agendamento, realizar o atendimento, permitir contato relacionado à reserva, tratar pagamento/reembolso e cumprir outras finalidades legítimas informadas.

O Beleza em Dia não adota, no MVP, uma regra genérica de guardar todos os dados de clientes por 24 meses apenas por padrão. Quando o dado deixar de ser necessário e não existir motivo concreto de conservação, deverá ser excluído.

### Pagamentos e registros financeiros

O Beleza em Dia deve manter apenas os metadados necessários enquanto houver pagamento, reembolso, conciliação ou outra finalidade concreta em andamento. Não existe, no MVP, uma regra genérica de manter todos os registros financeiros por cinco anos apenas por conveniência.

Se uma obrigação legal, regulatória, prevenção a fraude, segurança ou exercício regular de direitos exigir conservação de informação específica por prazo determinado, deve ser mantido somente o mínimo necessário para essa finalidade.

O Beleza em Dia não armazena dados bancários completos que devam permanecer exclusivamente com o provedor de pagamento.

### Códigos de verificação

Códigos de verificação e recuperação possuem validade de **15 minutos**.

Depois do uso ou expiração, deixam de funcionar e devem ser removidos pela rotina técnica definida para esse tipo de dado temporário.

### Logs de segurança

Logs técnicos e de segurança devem conter apenas o necessário e ser mantidos pelo período necessário à segurança, diagnóstico e investigação de incidentes. O prazo operacional deve ser revisado antes da produção e não deve ser maior do que o necessário sem justificativa.

### Fotos e vídeos

Mídias da profissional permanecem enquanto fizerem parte da conta ativa ou forem necessárias ao serviço. Depois da exclusão definitiva da conta ou remoção da mídia, devem ser removidas do armazenamento operacional, observados os ciclos técnicos inevitáveis dos provedores.

### Cópias de segurança

Dados já excluídos podem permanecer temporariamente em cópias técnicas até o ciclo normal de substituição dessas cópias.

Essas cópias não devem voltar ao uso operacional normal depois de uma solicitação válida de exclusão.

---

## 21. Como acessar seus dados

### Profissional

A profissional pode acessar:

**Configurações > Privacidade e Dados**

Nessa área, poderá consultar os principais dados da própria conta, os documentos legais vigentes e iniciar uma solicitação de cópia ou exportação quando aplicável.

### Cliente

A cliente não possui conta própria no MVP.

Para uma reserva específica, o link seguro:

`/agendamento/[token]`

pode permitir a visualização dos dados daquela reserva e das ações disponíveis para ela.

Para solicitar acesso mais amplo aos dados que o Beleza em Dia possua sobre ela, a cliente deve acessar:

`/privacidade`

e utilizar:

**Falar sobre meus dados**

Antes de fornecer dados pessoais além daqueles autorizados pelo link individual do agendamento, o Beleza em Dia deve verificar a identidade da pessoa de forma proporcional e segura. Nome ou telefone informados isoladamente não são prova suficiente de identidade.

---

## 22. Como corrigir seus dados

A profissional pode corrigir informações comuns diretamente nas telas:

- **Perfil**

- **Configurações**

Para informações que não possam ser alteradas diretamente, deve existir a opção:

**Solicitar correção dos meus dados**

A cliente poderá corrigir nome e telefone vinculados a uma reserva específica pelo link seguro `/agendamento/[token]`, quando o estado do agendamento permitir a alteração.

Essa alteração vale para aquele agendamento. Como o MVP não possui uma conta global de cliente, a atualização de uma reserva não deve modificar silenciosamente agendamentos pertencentes a outros estabelecimentos.

Quando a cliente precisar corrigir dados presentes em outros agendamentos, poderá utilizar **Falar sobre meus dados** em `/privacidade`. Antes de alterar registros adicionais, o Beleza em Dia deve verificar a identidade da pessoa de forma segura.

---

## 23. Como solicitar exclusão

### Profissional

A profissional pode acessar:

**Configurações > Privacidade e Dados > Solicitar exclusão da conta**

A exclusão exige sessão válida, confirmação da ação e ausência de pendências que impeçam o encerramento seguro da conta.

Se existirem agendamentos futuros, pagamentos pendentes ou reembolsos ainda não resolvidos, a exclusão deve ser bloqueada até que essas situações sejam concluídas.

Depois que as pendências forem resolvidas, os dados da conta e da operação devem ser excluídos conforme a seção de Encerramento da conta.

### Cliente

A cliente não possui conta no MVP. Para solicitar exclusão, deve acessar:

`/privacidade`

e utilizar:

**Falar sobre meus dados**

Depois da verificação segura de identidade, a cliente poderá solicitar, conforme o caso:

- exclusão dos dados vinculados a **um estabelecimento específico**;

- exclusão dos dados pessoais encontrados no **Beleza em Dia como um todo**.

Se houver agendamento futuro, pagamento ou reembolso ainda em andamento relacionado ao escopo solicitado, a exclusão deve aguardar a resolução dessa pendência. O sistema deve informar claramente o motivo do bloqueio.

Quando não houver mais finalidade necessária nem obrigação concreta de conservação, os dados solicitados devem ser excluídos. O Beleza em Dia não deve manter dados pessoais apenas "por garantia".

A exclusão dentro do Beleza em Dia não apaga automaticamente registros que um provedor independente, como o Mercado Pago, precise manter em seus próprios sistemas.

---

## 24. Como entrar em contato sobre privacidade

Na página pública:

`/privacidade`

o Beleza em Dia deve disponibilizar a opção:

**Falar sobre meus dados**

Esse canal pode ser utilizado para:

- pedir acesso aos dados;

- pedir correção;

- pedir exclusão ou anonimização;

- tirar dúvidas sobre o uso dos dados;

- informar problema de privacidade.

Quando o pedido estiver relacionado diretamente ao atendimento prestado por um estabelecimento, a cliente também pode entrar em contato com a própria profissional.

---

## 25. Direitos relacionados aos dados pessoais

Dependendo da situação e da legislação aplicável, a pessoa pode solicitar:

- informações sobre seus dados;

- acesso aos dados;

- correção de informações incorretas;

- exclusão;

- anonimização;

- outras providências previstas em lei.

As solicitações devem ser analisadas de forma segura e podem exigir confirmação de identidade.

---

## 26. Alterações da Política de Privacidade

Esta Política possui uma versão identificável.

Quando houver uma mudança relevante, a nova versão será publicada em:

`/privacidade`

Se a alteração exigir nova ciência da profissional, o sistema deverá apresentar novamente a Política antes de permitir o uso normal das áreas privadas.

---

## 27. Considerações finais

Usar o Beleza em Dia significa respeitar estes Termos de Uso.

O tratamento de dados deve seguir esta Política de Privacidade, a finalidade informada ao usuário e as regras de segurança do sistema.

O objetivo é manter um produto simples, claro e transparente, com regras de uso e privacidade fáceis de consultar e entender.

---

## Confirmações apresentadas à profissional

Ao prosseguir com a criação e configuração da conta, apresentar separadamente:

- ☑ **Li e aceito os Termos de Uso**

- ☑ **Li e declaro estar ciente da Política de Privacidade**

A conta somente poderá continuar para as próximas etapas obrigatórias após o registro dessas confirmações pelo sistema.