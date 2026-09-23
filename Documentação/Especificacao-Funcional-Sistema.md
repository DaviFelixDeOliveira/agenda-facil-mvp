estrutura para fazer a documentação

Dados usados;
mensagens de erros e validações;
Ajustes a serem feitos nas telas atuais:
Modo Web:
Modo Mobile:


# Nota Técnica - Banco Oficial e Modelagem de Referência

O **backend e banco de dados oficial do Beleza em Dia são o Convex**.

O arquivo escrito em SQL/MySQL existe somente como **modelagem conceitual de referência**, porque essa sintaxe é conhecida pelo autor do projeto e facilita visualizar entidades, campos, relacionamentos e regras.

O arquivo SQL **não será executado em produção** e não significa que o projeto utilize MySQL, PostgreSQL, Prisma ou outro ORM/banco relacional como tecnologia oficial.

Antes da implementação definitiva do backend, a modelagem conceitual deverá ser traduzida para os recursos nativos do Convex, principalmente:

- `convex/schema.ts`;
- `defineTable()` e validadores `v.*`;
- IDs/referências com `v.id("nomeDaTabela")`;
- índices `.index(...)`;
- Queries para leitura;
- Mutations para gravações transacionais da aplicação;
- Actions somente quando houver necessidade de integração externa ou operação não suportada diretamente por Query/Mutation;
- Cron Jobs / tarefas agendadas para rotinas como limpeza e expiração quando necessário.

Sempre que esta documentação utilizar a palavra **tabela**, ela representa uma entidade/tabela lógica do domínio e deve ser interpretada conforme o schema oficial do Convex. Regras escritas no SQL, como `UNIQUE`, `FOREIGN KEY`, `ON DELETE CASCADE` e `ON DELETE RESTRICT`, são referências de intenção e devem ser implementadas com índices, validações e Mutations apropriadas no Convex.

---



# Cadastro de Profissional

Ao entrar no sistema, a profissional visualiza a tela de boas-vindas.

Nessa tela existem duas opções:

- **Criar minha conta**
- **Já tenho uma conta / Entrar**

- **Dados usados:** 0 dados do banco de dados.

- **Mensagens de erros e validações:**
  - Ao clicar em **Criar minha conta**, redirecionar corretamente para o fluxo de cadastro.
  - Ao clicar em **Já tenho uma conta / Entrar**, redirecionar corretamente para a tela de login.
  - Caso ocorra erro no redirecionamento, exibir: **"Não foi possível abrir esta página. Tente novamente."**

- **Ajustes a serem feitos nas telas atuais:**

  - **Modo Web:**
    - Adicionar a barra de rolagem na lateral direita da página, seguindo o comportamento padrão do navegador. O slider do carrossel não deve possuir barra de rolagem.
    - Aumentar o tamanho da logo.

  - **Modo Mobile:**
    - Aumentar o tamanho da logo.
    - No modo mobile para tablets e iPads, principalmente em orientação vertical, não utilizar o mesmo layout de duas colunas da versão Web. Atualmente esse comportamento deixa os elementos muito pequenos e gera uma grande quantidade de espaço vazio na tela.
    - No modo mobile para tablets e iPads, reorganizar todo o conteúdo em uma única coluna vertical, centralizada e com melhor aproveitamento da largura disponível.
    - No modo mobile para tablets e iPads, organizar os elementos na seguinte ordem: logo e identidade do Beleza em Dia, texto de apresentação, imagem principal, cards com os três benefícios, seção "Comece agora", texto auxiliar e, por último, os botões "Criar minha conta" e "Já tenho uma conta / Entrar".
    - No modo mobile para tablets e iPads, utilizar um container centralizado com largura máxima aproximada entre 520px e 560px, mantendo margens laterais adequadas.
    - No modo mobile para tablets e iPads, aumentar proporcionalmente a logo, a imagem principal, os textos, os cards de benefícios e os botões para aproveitar melhor o espaço disponível e facilitar a interação por toque.
    - No modo mobile para tablets e iPads, fazer a imagem principal ocupar praticamente toda a largura disponível do container, mantendo sua proporção e o estilo visual atual.
    - No modo mobile para tablets e iPads, aumentar a altura e o espaçamento interno dos três cards de benefícios, mantendo ícone, título e descrição bem distribuídos.
    - No modo mobile para tablets e iPads, fazer os botões "Criar minha conta" e "Já tenho uma conta / Entrar" ocuparem 100% da largura disponível do container e possuírem altura confortável para interação por toque.
    - No modo mobile para tablets e iPads, utilizar `min-height: 100dvh` e permitir a rolagem vertical normal da página sempre que o conteúdo ultrapassar a altura disponível. Nenhum conteúdo ou botão deve ficar cortado.
    - No modo mobile para tablets e iPads, considerar as `safe areas` do dispositivo para evitar que elementos importantes fiquem muito próximos das extremidades da tela.
    - Em tablets e iPads na orientação horizontal, caso a largura da tela seja suficiente para comportar adequadamente a versão Web, o layout poderá voltar automaticamente para duas colunas.
    - A adaptação deve ser baseada principalmente na largura disponível da tela: celulares devem continuar utilizando uma versão compacta; tablets e iPads devem utilizar uma coluna mais larga e espaçosa; e telas grandes devem utilizar o layout Web de duas colunas.
    - Manter a identidade visual atual do Beleza em Dia em todos os tamanhos de tela. As alterações devem afetar apenas responsividade, proporções, espaçamentos e organização dos elementos.

---

## 1. Fluxo de Criar Conta

Ao clicar em **Criar minha conta**, a profissional é direcionada para a tela de cadastro.

A conta pode ser criada de duas formas:

1. E-mail e senha.
2. Google.

---

### 1.1 Criar conta com E-mail e Senha

A profissional informa seu e-mail e cria uma senha.

Abaixo do campo de senha devem aparecer os requisitos em tempo real. Os requisitos começam em vermelho e ficam verdes conforme forem atendidos.

Requisitos mínimos da senha:

- Mínimo de 8 caracteres.
- Pelo menos 1 letra.
- Pelo menos 1 número.

O botão **Criar Minha Conta** fica desabilitado até que o e-mail seja válido e a senha cumpra todos os requisitos.

Após o cadastro ser criado com sucesso, a profissional é direcionada para a **Tela de Verificar E-mail**.

- **Dados usados:**
  - **Tabela `users`:**
    - `id` - gerado pelo backend para identificar a conta.
    - `email` - informado pela profissional.
    - `senhaHash` - gerado pelo backend a partir da senha informada. A senha em texto puro não deve ser salva.
    - `emailVerificado` - inicia como `FALSE` até a confirmação do código enviado por e-mail.
    - `criadoEm` - gerado automaticamente pelo banco.

- **Mensagens de erros e validações:**
  - **E-mail vazio:** **"Informe seu e-mail para continuar."**
  - **E-mail inválido:** **"Informe um e-mail em formato válido (exemplo: nome@dominio.com)."**
  - **E-mail já cadastrado:** **"Este e-mail já possui uma conta. Entre na sua conta ou utilize outro e-mail."**
  - **Senha vazia:** **"Crie uma senha para continuar."**
  - **Senha com menos de 8 caracteres:** requisito permanece vermelho.
  - **Senha sem letra:** requisito permanece vermelho.
  - **Senha sem número:** requisito permanece vermelho.
  - **Cadastro concluído:** criar a conta e encaminhar para a verificação do e-mail.
  - O botão **Criar Minha Conta** permanece desabilitado enquanto houver campo obrigatório inválido.

- **Ajustes a serem feitos nas telas atuais:**

  - **Modo Web:**
    - Não é necessário exibir o aviso informando que o modo de teste está ativo.
    - Manter o formulário de criação de conta centralizado horizontal e verticalmente na tela.
    - Garantir que o formulário possua uma largura confortável para preenchimento, sem ficar excessivamente largo em monitores grandes.
    - Manter espaçamentos consistentes entre logo, título, subtítulo, campos, mensagens de validação, botões e demais ações.

  - **Modo Mobile:**
    - Não é necessário exibir o aviso informando que o modo de teste está ativo.
    - Garantir que as mensagens de validação apareçam completamente abaixo de seus respectivos campos e não sejam cortadas em telas menores.
    - Garantir que o formulário nunca ultrapasse as laterais da tela, mantendo margens adequadas em celulares pequenos.
    - Caso o conteúdo ultrapasse a altura disponível, permitir a rolagem vertical normal da página, sem cortar campos, mensagens de erro, botões ou o link de login.
    - Aumentar proporcionalmente o tamanho da logo para melhorar sua visualização em dispositivos móveis.

    - No modo mobile para tablets e iPads, principalmente em orientação vertical, aumentar significativamente a largura do formulário para aproveitar melhor o espaço disponível. O formulário não deve permanecer com a mesma largura utilizada em celulares.
    - No modo mobile para tablets e iPads, utilizar um container centralizado com largura aproximada entre `500px` e `560px`, respeitando as margens laterais da tela.
    - No modo mobile para tablets e iPads, aumentar proporcionalmente os elementos internos do formulário, incluindo logo, título, subtítulo, campos, botões e espaçamentos.
    - No modo mobile para tablets e iPads, os campos de E-mail e Senha e os botões devem ocupar `100%` da largura disponível dentro do formulário.
    - No modo mobile para tablets e iPads, aumentar a altura dos campos e botões para proporcionar uma área de toque mais confortável. Utilizar aproximadamente `52px` a `56px` de altura.
    - No modo mobile para tablets e iPads, utilizar textos com tamanho adequado para a distância de visualização de uma tela maior. O título "Crie sua conta profissional" deve possuir maior destaque e o subtítulo deve continuar claramente legível.
    - No modo mobile para tablets e iPads, aumentar os espaçamentos internos do card para evitar que os componentes fiquem concentrados em uma área pequena enquanto existe muito espaço disponível na tela.
    - No modo mobile para tablets e iPads, manter o formulário visualmente centralizado na tela quando houver altura suficiente.
    - No modo mobile para tablets e iPads, utilizar `min-height: 100dvh` e permitir rolagem vertical quando a altura disponível não for suficiente para exibir todo o formulário.
    - No modo mobile para tablets e iPads, considerar as `safe areas` do dispositivo para que o formulário não fique excessivamente próximo das bordas da tela.
    - No modo mobile para tablets e iPads, manter uma quantidade equilibrada de espaço ao redor do formulário. O objetivo é evitar o comportamento atual em que o formulário aparece muito pequeno no centro de uma grande área vazia.
    - Em tablets e iPads na orientação horizontal, adaptar a largura do formulário de acordo com o espaço disponível, sem deixá-lo excessivamente largo. O formulário deve continuar centralizado.
    - A responsividade deve considerar três comportamentos distintos: celulares com formulário compacto, tablets/iPads com formulário maior e mais espaçoso e desktop com largura controlada.
    - Manter a identidade visual atual do Beleza em Dia. As alterações devem afetar principalmente largura, proporções, espaçamentos e responsividade, sem modificar desnecessariamente cores, tipografia ou estilo visual da tela.

---

## Tela de Verificar E-mail

A profissional deverá inserir o código numérico de 6 dígitos enviado para o e-mail cadastrado.

Após validar o código corretamente, `emailVerificado` passa para `TRUE` e a profissional é direcionada para a **Tela de Termos de Uso**.

- **Dados usados:**
  - **Tabela `users`:**
    - `email` - identifica a conta que está sendo verificada.
    - `emailVerificado` - atualizado para `TRUE` após a validação correta.
  - **Tabela `verification_codes`:**
    - `id` - gerado pelo backend.
    - `email` - e-mail que receberá o código.
    - `codigo` - código de 6 dígitos gerado pelo backend.
    - `tipo` - salvo como `verificacao_email`.
    - `expiraEm` - horário de expiração do código, 15 minutos após a criação.
    - `tentativas` - quantidade de tentativas incorretas.
    - `bloqueadoAte` - data/hora até a qual novas tentativas permanecem temporariamente bloqueadas após exceder o limite; no Convex, representar como timestamp numérico opcional.
    - `criadoEm` - gerado automaticamente.

- **Mensagens de erros e validações:**
  - Aceitar somente números.
  - O código deve possuir exatamente 6 dígitos.
  - **Código incompleto:** **"Preencha todos os 6 dígitos do código."**
  - **Código incorreto:** **"Código inválido. Verifique e tente novamente."**
  - **Código expirado:** **"Código expirado. Solicite um novo código."**
  - **Reenvio:** botão **Reenviar código** deve ficar disponível após 60 segundos.
  - Ao gerar um novo código, o código anterior não deve continuar válido.
  - Após a validação correta, remover ou invalidar o código utilizado para impedir reutilização.
  - **Sucesso:** atualizar `users.emailVerificado = TRUE` e direcionar para os Termos de Uso.

- **Ajustes a serem feitos nas telas atuais:**
  - **Modo Web:**
    - Desenvolver a tela por completo.
    - Permitir colar um código de 6 dígitos e distribuir automaticamente os números entre os campos.
    - Ignorar caracteres excedentes caso seja colado um texto maior que 6 dígitos.
    - Bloquear letras e caracteres especiais.
  - **Modo Mobile:**
    - Desenvolver a tela por completo.
    - Utilizar teclado numérico (`inputmode="numeric"`).
    - Permitir colar/preencher automaticamente o código quando suportado pelo dispositivo.
    - Bloquear letras e caracteres especiais.

---

### 1.2 Criar conta com Google

A profissional clica no botão **Criar conta com Google** e é direcionada para o fluxo de autenticação do Google.

Caso já exista uma conta Google autenticada no navegador, a profissional poderá selecioná-la diretamente. Caso contrário, deverá fazer login no Google antes de continuar.

Depois da autenticação concluída, a conta é criada no Beleza em Dia e a profissional segue para a **Tela de Termos de Uso**.

- **Dados usados:**
  - **Tabela `users`:**
    - `id` - gerado pelo backend.
    - `email` - retornado pelo Google.
    - `googleId` - identificador da conta retornado pelo Google.
    - `senhaHash` - permanece `NULL` para conta criada somente pelo Google.
    - `emailVerificado` - definir como `TRUE` somente quando a identidade validada pelo Google indicar que o e-mail foi verificado pelo provedor; caso contrário, seguir o fluxo normal de verificação de e-mail.
    - `criadoEm` - gerado automaticamente.

- **Mensagens de erros e validações:**
  - **Autenticação concluída:** criar/vincular a conta e direcionar para os Termos de Uso.
  - **E-mail Google já cadastrado:** não criar uma segunda conta duplicada; orientar a profissional a entrar na conta existente.
  - **Autenticação cancelada:** **"O cadastro com Google não foi concluído."**
  - **Falha de autenticação:** **"Não foi possível continuar com o Google. Tente novamente."**

- **Ajustes a serem feitos nas telas atuais:**
  - **Modo Web:** alterar o texto **Continue With Google** para **Criar conta com Google**.
  - **Modo Mobile:** alterar o texto **Continue With Google** para **Criar conta com Google**.

---

## Tela de Termos de Uso e Ciência da Política de Privacidade

A profissional deverá ler os **Termos de Uso** e a **Política de Privacidade** antes de continuar para a configuração inicial.

A tela deve apresentar os documentos de forma separada, com linguagem clara e links permanentes para consulta.

Checkboxes obrigatórios:

- **☑ Li e aceito os Termos de Uso**.
- **☑ Li e declaro estar ciente da Política de Privacidade**.

A Política de Privacidade é apresentada como documento de transparência sobre o tratamento de dados. O sistema não deve tratar esse checkbox como autorização genérica para qualquer uso futuro de dados.

O botão **Aceitar e Continuar** ficará bloqueado enquanto a profissional não chegar ao final do conteúdo obrigatório e marcar as duas opções.

Também devem existir links públicos permanentes:

- **Termos de Uso** → `/termos`;
- **Política de Privacidade** → `/privacidade`.

Esses links devem continuar acessíveis depois do cadastro, inclusive a partir de **Configurações > Privacidade e Dados**.

- **Dados usados:**
  - **Coleção/tabela `users` no Convex - campos obrigatórios antes da produção:**
    - `termosVersaoAceita` - versão dos Termos de Uso aceita pela profissional.
    - `termosAceitosEm` - data/hora do aceite dos Termos de Uso.
    - `politicaPrivacidadeVersaoCiente` - versão da Política de Privacidade apresentada e reconhecida pela profissional.
    - `politicaPrivacidadeCienteEm` - data/hora em que a profissional declarou ciência da Política de Privacidade.
  - O `localStorage` pode ser utilizado somente para preservar temporariamente estado visual durante o preenchimento.
  - A confirmação definitiva deve ser persistida no Convex e utilizada como fonte confiável para proteção de rotas.

- **Mensagens de erros e validações:**
  - Se o checkbox dos Termos não estiver marcado, não permitir continuar.
  - Se o checkbox de ciência da Política de Privacidade não estiver marcado, não permitir continuar.
  - Se os documentos obrigatórios ainda não tiverem sido percorridos conforme a regra visual definida, não permitir continuar.
  - Mensagem: **"Leia os documentos até o final, aceite os Termos de Uso e confirme que está ciente da Política de Privacidade para continuar."**
  - Se a página for atualizada antes da confirmação final, o estado visual pode ser mantido temporariamente no `localStorage`.
  - Ao clicar em **Aceitar e Continuar**, persistir no backend a versão e a data/hora correspondentes.
  - Somente considerar a etapa concluída depois da confirmação de sucesso do backend.

### Versionamento dos Documentos Legais

O sistema deve possuir uma versão atual para cada documento, por exemplo:

- Termos de Uso: `1.0`;
- Política de Privacidade: `1.0`.

Ao autenticar a profissional, comparar a versão registrada na conta com a versão obrigatória atual.

Se uma nova versão for publicada e estiver marcada como **exigindo nova confirmação**:

- não considerar suficiente o aceite de uma versão antiga;
- redirecionar a profissional para a tela de Termos e Privacidade;
- mostrar de forma clara que os documentos foram atualizados;
- registrar a nova versão somente depois da nova confirmação.

Alterações meramente editoriais podem ser publicadas sem exigir nova confirmação quando essa for a decisão definida para aquela versão.

### Marketing

Marketing não deve fazer parte do aceite obrigatório dos Termos ou da ciência da Política de Privacidade.

Se futuramente o Beleza em Dia oferecer campanhas, novidades ou promoções por e-mail/WhatsApp, utilizar uma opção separada e opcional, por exemplo:

**☐ Quero receber novidades e ofertas do Beleza em Dia.**

Recusar marketing não pode impedir o uso normal do sistema.

- **Ajustes a serem feitos nas telas atuais:**
  - **Modo Web:**
    - substituir os textos antigos dos checkboxes pelos textos definidos nesta seção;
    - exibir links claros para `/termos` e `/privacidade`;
    - manter o conteúdo legível e sem linguagem jurídica desnecessariamente complexa.
  - **Modo Mobile:**
    - aplicar as mesmas regras;
    - garantir que os textos dos checkboxes quebrem linha sem cortar conteúdo;
    - manter os links fáceis de tocar;
    - permitir rolagem normal do documento sem esconder o botão final.

## Privacidade, Direitos dos Titulares e Retenção de Dados

O Beleza em Dia deve possuir uma área pública e uma área autenticada para explicar e permitir o exercício dos direitos relacionados aos dados pessoais.

### Como a profissional acessa seus dados

Na área autenticada, disponibilizar:

**Configurações > Privacidade e Dados**

A profissional deve conseguir:

- consultar os principais dados vinculados à própria conta e estabelecimento;
- acessar os Termos de Uso e a Política de Privacidade vigentes;
- visualizar a versão dos documentos registrada na conta;
- solicitar uma cópia/exportação dos próprios dados quando aplicável;
- iniciar uma solicitação de correção ou exclusão.

### Como a profissional corrige seus dados

Dados editáveis normalmente, como nome profissional, WhatsApp, estabelecimento, endereço e informações de perfil, devem ser corrigidos nas telas próprias de **Perfil** e **Configurações**.

Quando um dado não puder ser alterado diretamente, disponibilizar a ação:

**Solicitar correção dos meus dados**

A solicitação deve ser vinculada à conta autenticada para reduzir risco de alteração por terceiros.

### Como solicitar exclusão da conta e dos dados

Em **Configurações > Privacidade e Dados**, disponibilizar:

**Solicitar exclusão da conta**

Antes de concluir:

- exigir sessão válida;
- solicitar confirmação clara da ação;
- consultar o backend para verificar pendências;
- impedir a exclusão enquanto existir agendamento futuro `pendente` ou `confirmado`;
- impedir a exclusão enquanto existir pagamento cujo estado ainda precise ser resolvido;
- impedir a exclusão enquanto existir reembolso `pendente`, `processando` ou `falhou` ainda não resolvido;
- listar de forma clara as pendências encontradas e indicar qual ação precisa ser tomada.

Mensagem quando houver bloqueio:

**"Não é possível excluir sua conta enquanto houver agendamentos ou operações financeiras pendentes. Resolva as pendências indicadas e tente novamente."**

Um reembolso já `concluido` não deve bloquear a exclusão.

Depois que todas as pendências forem resolvidas, a exclusão definitiva poderá prosseguir. A regra operacional do Beleza em Dia é remover a conta profissional e os dados vinculados à operação daquele estabelecimento, incluindo perfil, serviços, agenda, disponibilidade, bloqueios, portfólio, mídias, integração Mercado Pago, agendamentos e dados de clientes vinculados ao tenant.

O sistema não deve manter dados apenas "por garantia". Se existir obrigação legal, regulatória, segurança, prevenção a fraude ou exercício regular de direitos que exija conservar informação específica, manter somente o mínimo necessário pelo período aplicável.

A exclusão dentro do Beleza em Dia não obriga provedores independentes, como o Mercado Pago, a apagar registros que eles próprios precisem manter segundo suas obrigações e políticas.

### Como a cliente acessa, corrige ou solicita exclusão de seus dados

A cliente **não possui conta própria no MVP**. Existem dois caminhos diferentes:

1. **Gerenciar uma reserva específica:** usar o link seguro `/agendamento/[token]`. Esse link permite visualizar a reserva correspondente, corrigir nome/telefone daquela reserva, cancelar quando permitido e acompanhar pagamento/reembolso. O token não concede acesso a outros agendamentos.

2. **Exercer direitos de privacidade de forma mais ampla:** acessar `/privacidade` e utilizar **Falar sobre meus dados**.

O fluxo de privacidade deve permitir solicitar:

- confirmação da existência de dados;
- acesso aos dados vinculados aos seus agendamentos;
- correção de informação incorreta;
- exclusão dos dados ligados a um estabelecimento específico;
- exclusão dos dados pessoais encontrados no Beleza em Dia como um todo;
- informações sobre como os dados são utilizados e compartilhados.

Antes de revelar, corrigir ou excluir dados além de uma reserva autorizada pelo token, o sistema deve realizar verificação proporcional e segura de identidade.

A plataforma não deve entregar, alterar ou apagar dados pessoais apenas porque alguém informou um nome ou telefone que conhece.

Se o pedido de exclusão abranger um agendamento futuro, pagamento ou reembolso em andamento, a exclusão deve ser bloqueada até que a pendência seja resolvida.

Mensagem sugerida:

**"Ainda existem agendamentos ou operações financeiras vinculadas a estes dados. Resolva essas pendências antes de concluir a exclusão."**

Como o MVP não possui uma tabela global de clientes, corrigir o telefone pelo link de um agendamento altera somente aquela reserva. Correções mais amplas devem usar o fluxo **Falar sobre meus dados** após verificação de identidade.

### Como entrar em contato sobre privacidade

A Política de Privacidade pública deve conter uma seção **Contato sobre Privacidade** com o botão:

**Falar sobre meus dados**

Esse canal deve receber solicitações de acesso, correção, exclusão e dúvidas relacionadas à privacidade.

Enquanto a solicitação estiver em análise, não prometer que uma alteração ou exclusão já foi concluída.

### Política Inicial de Retenção

A regra principal do Beleza em Dia é **não manter dados pessoais apenas por conveniência ou "por garantia"**. Os dados devem existir enquanto forem necessários para as finalidades informadas e ser removidos quando deixarem de ser necessários, salvo motivo concreto de conservação.

- **Conta e dados da profissional:** manter enquanto a conta estiver ativa e enquanto forem necessários para a prestação do serviço. Se a exclusão for solicitada, primeiro resolver agendamentos futuros, pagamentos e reembolsos pendentes; depois excluir os dados operacionais vinculados à conta.
- **Dados de clientes e histórico de agendamentos:** manter enquanto forem necessários para administrar a reserva, realizar o atendimento, permitir contato relacionado ao agendamento, tratar cancelamento, pagamento ou reembolso e demais finalidades legítimas informadas. O MVP não adota um prazo genérico de 24 meses para guardar todos os registros.
- **Dados de pagamento e eventos financeiros:** manter somente os metadados necessários enquanto houver pagamento, reembolso, conciliação ou outra finalidade concreta. O MVP não adota uma regra genérica de cinco anos apenas por conveniência.
- **Exceções de conservação:** quando obrigação legal/regulatória, segurança, prevenção a fraude ou exercício regular de direitos exigir a manutenção de informação específica, preservar apenas o mínimo necessário pelo período aplicável.
- **Códigos de verificação e recuperação:** possuem validade de **15 minutos**, deixam de ser utilizáveis após uso/expiração e devem ser removidos em rotina técnica apropriada.
- **Logs de segurança e auditoria técnica:** coletar somente o necessário e manter pelo período justificado para segurança, diagnóstico ou investigação. O prazo operacional deve ser revisado antes da produção.
- **Fotos, vídeos e demais mídias da profissional:** manter enquanto fizerem parte da conta ativa; após remoção definitiva ou exclusão da conta, remover do armazenamento operacional, respeitando ciclos técnicos inevitáveis dos provedores.

Dados já removidos do ambiente operacional podem permanecer temporariamente em cópias técnicas até o ciclo normal de substituição dessas cópias, sem voltar ao uso operacional normal.

A exclusão de dados do Beleza em Dia não significa que serviços independentes, como o Mercado Pago, apagarão registros que eles próprios tenham obrigação ou finalidade legítima de manter.

### Minimização de Dados

Coletar somente informações necessárias para o funcionamento do sistema.

Para a cliente, não solicitar e-mail quando nome, telefone/WhatsApp e os demais dados estritamente necessários ao atendimento forem suficientes.

Endereço somente deve ser solicitado quando a modalidade escolhida for domiciliar.

### Compartilhamento

Dados da cliente podem ser compartilhados com o estabelecimento escolhido somente na medida necessária para:

- administrar a reserva;
- realizar o atendimento;
- entrar em contato sobre o agendamento;
- processar pagamento quando aplicável.

O Beleza em Dia também pode utilizar prestadores técnicos necessários ao funcionamento da plataforma, como Convex, Vercel, Cloudflare R2, Resend, Google e Mercado Pago, respeitando a finalidade correspondente e o mínimo de dados necessário.

Dados de uma cliente de determinado tenant nunca devem ser disponibilizados a outro estabelecimento.

### Regra Final de Privacidade

A existência de um checkbox não substitui:

- transparência;
- segurança;
- minimização de dados;
- controle de acesso;
- retenção adequada;
- atendimento aos direitos dos titulares.

O sistema deve implementar essas regras no backend e nas interfaces correspondentes.


## Fluxo Operacional de Exclusão da Conta Profissional

A tela futura **Configurações > Privacidade e Dados > Solicitar exclusão da conta** deve executar uma verificação no backend antes de liberar a confirmação final.

### Pendências que bloqueiam a exclusão

Bloquear quando existir:

- agendamento futuro `pendente`;
- agendamento futuro `confirmado`;
- pagamento com estado financeiro ainda não resolvido;
- reembolso `pendente`;
- reembolso `processando`;
- reembolso `falhou` ainda não resolvido.

Exibir uma lista das pendências, sem obrigar a profissional a descobrir manualmente por que a conta não pode ser encerrada.

### Depois de resolver as pendências

Quando não existir nenhuma pendência impeditiva:

1. pedir nova confirmação da ação destrutiva;
2. tornar o perfil indisponível para novos agendamentos durante a exclusão;
3. remover dados de autenticação/conta;
4. remover tenant, serviços, disponibilidade, bloqueios, portfólio e mídias;
5. remover agendamentos e dados de clientes vinculados àquele tenant;
6. revogar/remover a integração Mercado Pago armazenada pelo Beleza em Dia;
7. concluir a exclusão somente depois da confirmação do backend.

Mensagem de sucesso:

**"Sua conta e os dados vinculados ao Beleza em Dia foram excluídos."**

Não prometer a remoção de registros que provedores independentes, como o Mercado Pago, precisem manter em seus próprios sistemas.

---


# Controle de Acesso e Proteção de Rotas

O sistema deve impedir que uma profissional acesse telas ou etapas para as quais ainda não possui autorização, mesmo que tente alterar manualmente a URL no navegador.

A proteção não deve depender apenas da interface ou da existência/ausência de botões.

O backend e/ou middleware responsável pelas rotas deve validar a sessão e o estado atual da conta antes de permitir acesso às páginas protegidas.


## Rotas Públicas

### Rotas públicas de autenticação da profissional

Podem ser acessadas sem uma sessão autenticada, conforme o fluxo:

- `/boas-vindas`;
- criação de conta;
- Login;
- recuperação de senha;
- etapas necessárias para validação/recuperação da conta;
- `/termos` - Termos de Uso vigentes;
- `/privacidade` - Política de Privacidade e canal **Falar sobre meus dados**.

Essas rotas não dão acesso ao painel administrativo.

### Rotas públicas destinadas às clientes

Não exigem login da profissional nem da cliente:

- `/{slug}` - perfil público da profissional;
- `/{slug}/agendar` - novo agendamento público, quando utilizado;
- `/agendamento/[token]` - confirmação de uma pré-reserva específica.

Essas páginas devem exibir somente informações públicas necessárias ao atendimento e nunca dados administrativos da profissional.


## Rotas Protegidas da Profissional

As telas internas do painel devem exigir uma sessão autenticada válida.

Exemplos:

- `/dashboard`;
- `/agenda`;
- `/clientes`;
- `/financeiro`;
- `/perfil`;
- `/configuracoes`;
- telas de gerenciamento de serviços;
- telas de gerenciamento de horários;
- demais páginas administrativas da profissional.

Caso uma pessoa sem sessão tente acessar diretamente uma dessas rotas, por exemplo:

`http://localhost:3001/dashboard`

o sistema não deve carregar a Dashboard.

A pessoa deve ser redirecionada para a tela de login.

## Tentativa de Alteração Manual da URL

Não deve ser possível pular etapas apenas digitando uma URL diretamente no navegador.

Exemplo:

A profissional está em:

`/boas-vindas`

e altera manualmente para:

`/dashboard`

Se ainda não estiver autenticada, deve ser redirecionada para o login.

Outro exemplo:

A profissional criou a conta, mas ainda não verificou o e-mail, e tenta acessar:

`/dashboard`

O sistema deve redirecioná-la para a etapa de verificação de e-mail.

A mesma regra deve ser aplicada para todas as etapas obrigatórias do fluxo.

## Ordem de Validação do Acesso

Ao tentar acessar uma página interna, o sistema deve verificar o estado da conta na seguinte ordem:

1. Existe uma sessão autenticada válida?

   - **Não:** redirecionar para Login.
   - **Sim:** continuar a validação.

2. O e-mail da conta foi verificado?

   - Para contas criadas com e-mail e senha, se `emailVerificado = FALSE`, redirecionar para **Verificar E-mail**.
   - Contas autenticadas pelo Google devem seguir a regra correspondente definida pelo fluxo de autenticação.

3. A conta possui o aceite da versão obrigatória atual dos Termos de Uso e a ciência da versão atual obrigatória da Política de Privacidade?

   - Se `termosVersaoAceita` não corresponder à versão obrigatória atual, redirecionar para **Termos de Uso e Privacidade**.
   - Se `politicaPrivacidadeVersaoCiente` não corresponder à versão obrigatória atual, redirecionar para **Termos de Uso e Privacidade**.
   - Se uma nova versão não exigir nova confirmação, manter o fluxo normal conforme a configuração daquela publicação.

4. A configuração inicial obrigatória foi concluída?

   - Se não foi concluída, redirecionar para a etapa pendente da configuração inicial.
   - Não permitir acessar diretamente a Dashboard antes da conclusão das etapas obrigatórias.

5. Se todas as verificações forem válidas:

   - permitir acesso à Dashboard e às demais áreas internas autorizadas.

Fluxo esperado:

`Sem sessão → Login`

`Sessão válida + e-mail não verificado → Verificar E-mail`

`Sessão válida + e-mail verificado + termos/privacidade pendentes → Termos de Uso e Privacidade`

`Sessão válida + termos aceitos + onboarding incompleto → Configuração Inicial`

`Sessão válida + todas as etapas concluídas → Dashboard`
## Usuário Já Autenticado

O comportamento das rotas deve considerar não apenas se a profissional está autenticada, mas também o estágio atual da conta.

### Conta autenticada com configuração inicial incompleta

Se a profissional estiver autenticada, mas ainda não tiver concluído todas as etapas obrigatórias da configuração inicial:

- permitir acesso somente às etapas do onboarding necessárias para concluir a configuração;

- redirecionar automaticamente para a etapa pendente quando tentar acessar a Dashboard ou outra área administrativa;

- não permitir utilizar diretamente:
  - `/dashboard`;
  - `/agenda`;
  - `/clientes`;
  - `/financeiro`;
  - `/perfil`;
  - `/configuracoes`;
  - demais áreas administrativas;

- não permitir pular etapas obrigatórias do onboarding alterando manualmente a URL;

- ao tentar acessar uma etapa posterior sem concluir corretamente as anteriores, redirecionar para a primeira etapa obrigatória ainda pendente.

Exemplo:

`Onboarding pendente no Passo 3 + tentativa de acessar /dashboard → redirecionar para o Passo 3.`

### Conta autenticada com configuração inicial concluída

Quando a profissional já tiver concluído o onboarding:

- permitir acesso normal à Dashboard e às demais áreas administrativas autorizadas;

- não permitir acessar novamente as telas de onboarding apenas alterando manualmente a URL;

- caso tente acessar uma rota como `/onboarding/passo-1`, `/onboarding/passo-2` ou qualquer outra etapa da configuração inicial, redirecionar para a Dashboard;

- alterações posteriores nas informações cadastradas durante o onboarding devem ser realizadas pelas telas normais do sistema, como:
  - Perfil;
  - Configurações;
  - Meus Serviços;
  - Agenda e Horários de Trabalho;
  - demais áreas específicas de gerenciamento.

O onboarding deve ser utilizado somente para a configuração inicial da conta e não deve funcionar como uma segunda área de configurações depois de concluído.

### Conta autenticada tentando acessar Login, Cadastro ou Boas-vindas

Se a profissional estiver autenticada e já tiver concluído a configuração inicial:

- `/login` → Dashboard;
- `/cadastro` → Dashboard;
- `/boas-vindas` → Dashboard.

Se estiver autenticada, mas ainda possuir alguma etapa obrigatória pendente:

- direcionar para a etapa obrigatória correspondente, e não para a Dashboard.

## Sessão Expirada

Se a sessão expirar enquanto a profissional estiver utilizando uma área protegida:

- impedir novas operações autenticadas;
- não permitir continuar alterando dados utilizando uma sessão inválida;
- redirecionar para o Login quando necessário;
- exibir uma mensagem amigável:

**"Sua sessão expirou. Entre novamente para continuar."**

Nunca exibir erros técnicos da autenticação diretamente na interface.

## Proteção também no Backend

Esconder uma página, botão ou item do menu no frontend não é considerado proteção suficiente.

Toda operação privada deve validar a autenticação também no backend.

Por exemplo, mesmo que uma pessoa tente chamar manualmente uma rota de API responsável por:

- criar um serviço;
- alterar um agendamento;
- excluir uma mídia;
- modificar configurações;
- acessar dados financeiros;

o backend deve verificar se existe uma sessão válida antes de executar a operação.

Uma requisição manual não deve conseguir contornar as regras da interface.

## Modo de Teste / Desenvolvimento

O modo de teste deve continuar permitindo testar todo o sistema sem exigir que todas as integrações externas estejam funcionando.

Porém, o modo de teste não deve simplesmente tornar todas as páginas privadas públicas.

O ambiente de teste deve possuir um estado de autenticação mock controlado.

Exemplos:

- Usuário mock não autenticado:
  - não pode acessar `/dashboard`.

- Usuário mock autenticado:
  - pode acessar as páginas permitidas pelo estado da conta mock.

- Usuário mock ainda na configuração inicial:
  - não pode pular diretamente para a Dashboard alterando a URL.

- Usuário mock com configuração concluída:
  - pode acessar a Dashboard e demais telas internas.

Isso permite testar corretamente a proteção das rotas mesmo sem depender do backend real.

## Redirecionamentos

Os redirecionamentos devem evitar loops.

Exemplo de comportamento incorreto:

`/dashboard → /login → /dashboard → /login`

O sistema deve determinar corretamente o estado atual da conta antes de decidir a página de destino.

Enquanto essa validação estiver sendo realizada, exibir um estado de carregamento compatível com a identidade visual do Beleza em Dia, evitando mostrar rapidamente uma página protegida antes do redirecionamento.

## Segurança da Informação durante o Redirecionamento

Antes da autorização ser confirmada:

- não exibir dados privados da profissional;
- não carregar informações de clientes;
- não carregar dados financeiros;
- não carregar agendamentos privados;
- não mostrar conteúdo protegido por alguns instantes antes de redirecionar.

A tela protegida somente deve ser apresentada depois que o acesso tiver sido validado.



---


# Validação Global de Campos e Tratamento de Erros

As regras desta seção são globais e devem ser aplicadas em todas as telas, formulários, modais, ações e APIs do Beleza em Dia.

As validações específicas descritas em cada tela continuam sendo aplicadas normalmente.

Esta seção define o comportamento padrão quando uma tela não possuir uma regra mais específica.

## Validação no Frontend e no Backend

Toda informação enviada pelo usuário deve ser validada em duas camadas:

1. **Frontend**
   - responsável por orientar o usuário;
   - impedir entradas obviamente inválidas;
   - apresentar mensagens de erro de forma clara;
   - evitar requisições desnecessárias.

2. **Backend**
   - responsável pela validação definitiva;
   - nunca confiar diretamente nos valores enviados pelo navegador;
   - rejeitar dados inválidos mesmo que o frontend tenha permitido seu envio;
   - impedir que uma requisição manual contorne as validações da interface.

A validação existente apenas no frontend não deve ser considerada uma proteção suficiente.

Exemplo:

Mesmo que um campo de duração permita somente números visualmente, o backend ainda deve rejeitar uma requisição contendo:

`duracaoMinutos = "abc"`

## Campos Obrigatórios

Campos obrigatórios não podem ser enviados:

- vazios;
- contendo apenas espaços;
- contendo somente caracteres invisíveis;
- com valores equivalentes a vazio.

Antes da validação, textos podem ter espaços desnecessários no início e no final removidos.

Exemplo:

`"   Maria Silva   "` → `"Maria Silva"`

Um campo contendo somente:

`"     "`

deve ser tratado como vazio.

Quando houver uma mensagem específica definida para o campo, utilizar essa mensagem.

Caso não exista uma mensagem específica, utilizar:

**"Preencha este campo para continuar."**

## Campos de Texto

Campos de texto devem:

- respeitar o tamanho máximo definido pelo sistema/banco;
- remover espaços desnecessários no início e no final;
- não aceitar conteúdo formado apenas por espaços;
- não aceitar entradas claramente incompatíveis com a finalidade do campo;
- ser tratados de forma segura antes de serem exibidos novamente na interface.

Caso o texto ultrapasse o limite permitido:

**"O texto informado ultrapassa o limite permitido."**

Quando houver um limite conhecido, preferir mensagem específica.

Exemplo:

**"A bio pode ter no máximo 500 caracteres."**

## Campos Numéricos

Campos destinados exclusivamente a números não devem aceitar letras ou caracteres incompatíveis.

O frontend deve utilizar o tipo de campo e `inputmode` adequados sempre que possível.

O backend deve validar novamente o valor recebido.

Não aceitar:

- letras;
- texto arbitrário;
- `NaN`;
- valores infinitos;
- valores negativos quando não permitidos;
- números decimais em campos que aceitam somente inteiros;
- valores fora dos limites definidos para aquele campo.

Exemplos inválidos para um campo de duração:

- `abc`;
- `10min`;
- `-15`;
- `1.5`, quando somente números inteiros forem permitidos.

Caso não exista uma mensagem específica:

**"Informe um valor válido."**

## Valores Monetários

Campos de dinheiro devem:

- utilizar formatação monetária brasileira na interface;
- trabalhar com valores maiores ou iguais a zero ou maiores que zero, conforme a regra específica;
- rejeitar letras ou valores inválidos;
- não aceitar `NaN` ou valores infinitos;
- ser convertidos e validados novamente no backend.

Exemplo visual:

`75` → `R$ 75,00`

O valor enviado pelo navegador nunca deve ser considerado confiável para operações financeiras.

Valores derivados, como:

- valor total do agendamento;
- valor do sinal;
- valor restante;
- porcentagens;

devem ser recalculados ou validados pelo backend antes de serem utilizados.

## Campos de Porcentagem

Campos de porcentagem devem aceitar somente números dentro do intervalo definido.

Quando o campo representar uma porcentagem comum do sistema, utilizar o intervalo:

`1% até 100%`

Não aceitar:

- letras;
- valores negativos;
- zero quando a regra exigir pelo menos 1%;
- valores acima de 100%.

Mensagem padrão:

**"Informe uma porcentagem válida."**

Quando existir uma mensagem específica na tela, utilizar a específica.

## Datas e Horários

Campos de data e horário devem ser validados tanto no frontend quanto no backend.

Não aceitar:

- datas inválidas;
- horários inexistentes;
- valores malformados;
- datas passadas quando a ação exigir uma data futura;
- horário final anterior ou igual ao horário inicial;
- horários indisponíveis;
- valores manipulados manualmente fora das opções permitidas.

O backend deve considerar a data/hora real da operação e não confiar somente no estado mostrado anteriormente pelo navegador.

## Campos de Seleção

Campos como:

- `select`;
- radio button;
- checkbox;
- opções de modalidade;
- categorias;
- status;

devem aceitar apenas valores previamente permitidos pelo sistema.

Mesmo que o navegador envie manualmente outro valor, o backend deve rejeitá-lo.

Exemplo:

Se `tipoAtendimento` aceita apenas:

- `salao`;
- `domiciliar`;

não aceitar:

`tipoAtendimento = "qualquer_coisa"`

Mensagem padrão:

**"Selecione uma opção válida."**

## Telefone / WhatsApp

Campos de telefone devem:

- aplicar máscara visual quando apropriado;
- remover máscara antes das comparações internas;
- validar quantidade de dígitos;
- validar presença de DDD quando obrigatório;
- rejeitar letras.

Formato visual:

`(00) 00000-0000`

O sistema deve trabalhar internamente com o número normalizado sempre que necessário.

## CEP

Campos de CEP devem:

- aceitar somente números;
- aplicar máscara `00000-000`;
- possuir exatamente 8 dígitos antes da consulta;
- impedir chamada à API quando o CEP estiver incompleto.

CEP incompleto ou inválido:

**"Informe um CEP válido."**

Erros específicos da API de CEP continuam seguindo as mensagens definidas na respectiva tela.

## URLs e Identificadores

IDs, `slug`, tokens públicos e parâmetros presentes na URL devem ser validados antes de qualquer consulta ou operação.

Não confiar que um valor é válido apenas porque veio da URL.

Caso um identificador não exista ou seja inválido, utilizar a mensagem correspondente à tela.

Nunca exibir:

- consulta/query interna do banco;
- stack trace;
- caminho interno;
- detalhes de implementação;
- resposta bruta do banco;
- código técnico desnecessário.

## Validação ao Enviar um Formulário

Ao clicar no botão principal de um formulário:

1. validar todos os campos;
2. impedir o envio caso exista algum campo inválido;
3. exibir as mensagens abaixo dos campos correspondentes;
4. aplicar destaque visual no campo inválido;
5. direcionar o foco ou rolar automaticamente até o primeiro campo com erro.

O usuário não deve precisar procurar manualmente qual campo está impedindo a continuação.

## Mensagens de Erro nos Campos

Sempre que possível, o erro deve aparecer próximo ao campo responsável pelo problema.

Exemplo:

**Nome da cliente**

`[                    ]`

**"Informe o nome completo da cliente."**

Não utilizar apenas um toast genérico quando for possível identificar exatamente qual campo está incorreto.

Campos inválidos devem possuir:

- mensagem textual;
- destaque visual;
- associação clara entre mensagem e campo.

A cor nunca deve ser o único recurso utilizado para indicar erro.

## Correção do Campo

Quando o usuário corrigir o valor:

- remover a mensagem de erro quando o campo voltar a ser válido;
- remover o estado visual de erro;
- não manter uma mensagem antiga após a correção.

A validação pode acontecer:

- durante a digitação, quando apropriado;
- ao sair do campo;
- ao tentar enviar o formulário.

Evitar mensagens agressivas enquanto o usuário ainda está digitando um valor incompleto.

## Botões Durante Operações

Enquanto uma ação estiver sendo processada:

- desabilitar o botão correspondente;
- impedir múltiplos cliques;
- impedir requisições duplicadas;
- exibir indicador visual de carregamento;
- alterar temporariamente o texto quando fizer sentido.

Exemplos:

`Entrar` → `Entrando...`

`Salvar` → `Salvando...`

`Buscar CEP` → `Buscando...`

`Concluir` → `Concluindo...`

Após erro:

- restaurar o botão;
- permitir nova tentativa.

Após sucesso:

- seguir o fluxo correspondente.

## Falhas de Conexão

Quando não for possível completar uma operação por problema de conexão, utilizar uma mensagem amigável.

Mensagem padrão:

**"Não foi possível concluir esta operação. Verifique sua conexão e tente novamente."**

Quando houver mensagem específica definida na tela, utilizar a mensagem específica.

Sempre que possível, disponibilizar ação:

**Tentar novamente**

Não apagar dados já preenchidos pelo usuário apenas porque ocorreu uma falha de conexão.

## Erros de API ou Serviço Externo

Se uma API ou integração externa falhar:

- não exibir a resposta técnica diretamente;
- manter os dados já informados pelo usuário quando possível;
- restaurar botões e estados de carregamento;
- permitir nova tentativa quando apropriado;
- registrar o erro técnico apenas internamente.

Exemplo de serviços externos:

- API de CEP;
- Google;
- Mercado Pago;
- serviço de envio de e-mail;
- armazenamento de arquivos;
- demais integrações futuras.

## Erro Interno do Sistema

Quando ocorrer uma falha inesperada e não existir uma mensagem específica:

Exibir:

**"Não foi possível concluir esta operação. Tente novamente em alguns instantes."**

Quando a falha impedir o carregamento completo de uma página:

Exibir:

**"Não foi possível carregar esta página. Tente novamente."**

Disponibilizar botão:

**Tentar novamente**

quando a ação puder ser repetida.

## Conteúdo Técnico Nunca Deve Ser Exibido

Nunca mostrar diretamente ao usuário mensagens como:

- `Unexpected end of JSON input`;
- `TypeError`;
- `ReferenceError`;
- `SyntaxError`;
- `Internal Server Error`;
- stack traces;
- erros internos do banco;
- mensagens internas do ORM;
- respostas brutas do Mercado Pago;
- respostas brutas de outras APIs;
- caminhos internos do servidor;
- tokens;
- segredos;
- credenciais.

Essas informações podem ser registradas internamente para diagnóstico, mas não devem aparecer na interface.

## Respostas Vazias ou Inválidas da API

O frontend não deve presumir que toda resposta recebida contém JSON válido.

Antes de processar uma resposta:

- verificar se a requisição foi concluída corretamente;
- considerar o status HTTP;
- tratar respostas vazias;
- tratar conteúdo inválido;
- evitar executar parsing de JSON sem tratamento adequado.

Caso a resposta seja inválida:

**"Não foi possível processar a resposta do sistema. Tente novamente."**

O erro técnico deve permanecer somente nos registros internos.

## Persistência dos Dados em Caso de Erro

Sempre que possível, um erro não deve apagar tudo que o usuário já preencheu.

Exemplo:

A profissional preenche cinco campos e ocorre uma falha ao salvar.

O sistema deve:

- manter os cinco campos preenchidos;
- informar o erro;
- permitir tentar novamente.

Não obrigar o usuário a preencher todo o formulário novamente por causa de uma falha temporária.

## Dados Opcionais

Campos opcionais podem permanecer vazios.

Um campo opcional vazio não deve gerar erro.

Porém, caso o usuário preencha um campo opcional, o conteúdo informado deve respeitar as mesmas regras de formato e segurança aplicáveis ao campo.

Exemplo:

Uma observação é opcional.

Porém, se for preenchida, ainda deve respeitar:

- tamanho máximo;
- tratamento de texto;
- validações definidas.

## Validação de Arquivos

Uploads de imagens e vídeos devem ser validados no frontend e novamente no backend.

Validar:

- formato permitido;
- tamanho máximo;
- quantidade máxima;
- duração máxima, quando vídeo;
- integridade básica do arquivo.

Não confiar somente na extensão do nome do arquivo.

Exemplo:

Um arquivo chamado:

`foto.jpg`

não deve ser aceito automaticamente sem que o sistema valide se realmente é um arquivo compatível.

Quando um arquivo específico falhar:

- identificar qual arquivo apresentou problema;
- não invalidar automaticamente os demais arquivos válidos;
- permitir remover o arquivo com erro;
- permitir tentar novamente quando aplicável.

Mensagem padrão para falha de upload:

**"Não foi possível enviar este arquivo. Tente novamente."**

## Ações Destrutivas

Ações que removem ou cancelam informações importantes devem solicitar confirmação antes da execução.

Exemplos:

- excluir mídia;
- cancelar agendamento;
- desconectar integração;
- excluir serviço quando permitido;
- excluir conta futuramente.

A confirmação deve explicar claramente o que acontecerá.

A ação não deve ser executada apenas pelo primeiro clique acidental.

## Estado de Sucesso

Após uma ação concluída:

- atualizar a interface imediatamente;
- não manter mensagens antigas de erro;
- informar sucesso quando necessário;
- evitar duplicação da operação caso a página seja atualizada.

## Regra Geral

Sempre que existir uma regra mais específica documentada em determinada tela, a regra específica possui prioridade sobre a mensagem genérica desta seção.

Exemplo:

Regra global:

**"Informe um valor válido."**

Regra específica do serviço:

**"A duração deve ser maior que 0 minutos."**

Neste caso, utilizar a mensagem específica do serviço.


---


# Segurança Multi-Tenant e Autorização

O Beleza em Dia é um sistema multi-tenant.

Cada profissional/estabelecimento deve acessar exclusivamente os dados pertencentes ao próprio `tenant`.

As regras desta seção devem ser aplicadas em todas as:

- páginas privadas;
- APIs privadas;
- Server Actions;
- consultas ao banco;
- alterações;
- exclusões;
- uploads;
- integrações;
- operações financeiras;
- agendamentos;
- serviços;
- disponibilidades;
- bloqueios;
- configurações.

A autenticação identifica quem está utilizando o sistema.

A autorização determina quais dados essa pessoa pode acessar ou alterar.

Estar autenticada não significa possuir acesso a qualquer registro do sistema.

## Regra Principal de Isolamento

Uma profissional nunca deve conseguir visualizar, criar, editar, excluir, cancelar, confirmar, finalizar, remarcar, exportar ou consultar dados pertencentes a outro `tenant`.

Essa regra deve ser garantida pelo backend e não deve depender apenas da interface.

## Tenant da Sessão

Nas áreas administrativas, o backend deve determinar o `tenant` autorizado através da sessão e dos relacionamentos confiáveis armazenados no sistema.

Fluxo conceitual:

`Sessão autenticada`

↓

`Identificar users.id`

↓

`Localizar tenant autorizado para esse usuário`

↓

`Executar operação somente dentro desse tenant`

O `tenantId` autorizado não deve ser escolhido livremente pelo navegador.

## Nunca Confiar no tenantId do Frontend

Mesmo que o frontend envie um `tenantId`, esse valor não deve ser utilizado isoladamente para autorizar uma operação privada.

Exemplo inseguro:

```text
POST /api/services

{
  "tenantId": "tenant-de-outra-profissional",
  "nome": "Corte"
}
```

O backend não deve concluir que a pessoa possui acesso apenas porque o navegador enviou aquele identificador.

Quando um `tenantId` precisar existir na requisição por motivos técnicos, ele deve ser comparado com o tenant autorizado da sessão antes de qualquer operação.

## Consultas ao Banco

Consultas privadas devem possuir escopo pelo tenant autorizado.

Conceitualmente:

```text
Buscar agendamento
onde:
  id = appointmentId
  E tenantId = tenantAutorizado
```

E não apenas:

```text
Buscar agendamento
onde:
  id = appointmentId
```

A mesma regra deve ser aplicada a serviços, agendamentos, disponibilidade, bloqueios, portfólio, integração Mercado Pago e demais recursos vinculados ao estabelecimento.

## IDs não Concedem Permissão

Conhecer ou descobrir um `id` não concede autorização.

Se uma profissional alterar manualmente um identificador na URL ou em uma requisição e o recurso pertencer a outro tenant:

- não exibir os dados;
- não permitir alterações;
- não retornar informações privadas;
- não revelar detalhes desnecessários sobre o proprietário do recurso.

## Recursos Relacionados

Ao executar uma operação envolvendo vários registros, validar que todos pertencem ao mesmo tenant autorizado.

Exemplo: ao criar um agendamento manual utilizando `serviceId`, o backend deve validar que o serviço pertence ao tenant autenticado.

Não basta validar somente o recurso principal.

## Serviços

Em operações administrativas envolvendo `services`:

- buscar somente serviços do tenant autenticado;
- não permitir editar serviço de outro tenant;
- não permitir desativar serviço de outro tenant;
- não permitir consultar informações administrativas de serviço de outro tenant.

A validação deve considerar simultaneamente:

`service.id = serviceId`

E:

`service.tenantId = tenantAutorizado`

## Agendamentos

Todas as operações administrativas em `appointments` devem validar:

- existência;
- tenant correspondente;
- status atual;
- permissão para a operação.

Isso inclui:

- visualizar;
- confirmar;
- finalizar;
- cancelar;
- remarcar;
- editar observação;
- gerar/copiar link;
- consultar pagamento.

Uma profissional não pode acessar um agendamento apenas por possuir seu `appointments.id`.

## Serviços do Agendamento

Ao acessar `appointment_services`:

1. validar primeiro o agendamento;
2. confirmar que o agendamento pertence ao tenant autorizado;
3. somente então retornar os serviços vinculados.

Não permitir obter informações privadas de um agendamento de outro tenant através de registros relacionados.

## Disponibilidade

Operações em `availability` devem utilizar exclusivamente registros do tenant autorizado.

Não permitir visualizar ou alterar horários de outro tenant utilizando apenas um ID enviado pelo navegador.

## Horários Bloqueados

A mesma regra se aplica à tabela `blocked_times`.

Ao criar, editar ou remover um bloqueio, validar que a operação pertence ao tenant autenticado.

Nunca permitir que uma profissional bloqueie ou libere horários de outra.

## Portfólio

Arquivos e registros de `tenant_portfolio` também devem respeitar o isolamento.

Uma profissional não deve conseguir remover, substituir, editar ou listar mídias administrativas pertencentes a outro tenant informando manualmente um ID.

## Mercado Pago

Toda operação envolvendo `tenant_mercadopago` deve utilizar o tenant obtido através da sessão.

Isso inclui:

- consultar conexão;
- iniciar OAuth;
- finalizar OAuth;
- renovar credenciais;
- desconectar;
- criar cobrança;
- consultar pagamento;
- solicitar reembolso.

Nunca utilizar um `tenantId` recebido do frontend como única informação para decidir qual conta Mercado Pago será utilizada.

## Conta que Recebe o Pagamento

Ao iniciar o pagamento antecipado de um agendamento pelo Checkout Pro:

1. localizar o agendamento;
2. identificar o tenant real do agendamento;
3. localizar a integração Mercado Pago daquele mesmo tenant;
4. validar a integração e as credenciais OAuth;
5. criar a preferência do Checkout Pro utilizando exclusivamente o `access_token` da conta Mercado Pago conectada àquele tenant;
6. utilizar o endereço seguro retornado pelo Mercado Pago para redirecionar a cliente ao checkout.

Nunca permitir que um agendamento do Tenant A utilize a conta Mercado Pago do Tenant B.

No MVP atual, o Beleza em Dia não cobra comissão da plataforma. Tarifas eventualmente aplicadas pelo Mercado Pago pertencem às condições comerciais do próprio provedor e não devem ser confundidas com comissão do Beleza em Dia.

## Rotas Públicas

As páginas públicas possuem regras diferentes das áreas administrativas.

Rotas como:

- `/{slug}`;
- `/{slug}/agendar`;
- `/agendamento/[token]`;

podem ser acessadas sem sessão profissional conforme os fluxos já definidos.

Porém, serem públicas não significa que podem retornar qualquer dado do tenant.

## Perfil Público por Slug

Em `/{slug}`, o `slug` pode identificar o estabelecimento exibido publicamente.

Retornar somente informações destinadas ao perfil público, como:

- nome profissional;
- nome do estabelecimento;
- foto;
- bio;
- portfólio público;
- serviços ativos;
- preços públicos;
- duração;
- modalidades de atendimento;
- informações necessárias ao agendamento.

Não retornar:

- credenciais;
- tokens;
- dados da conta Mercado Pago;
- configurações administrativas privadas;
- informações de outras clientes;
- agendamentos de outras pessoas;
- dados internos desnecessários.

## Criação Pública de Agendamento

No fluxo público, o tenant deve ser determinado pelo contexto confiável do perfil/slug utilizado para iniciar o agendamento.

O backend deve garantir que:

- o slug existe;
- o tenant correto foi localizado;
- todos os serviços enviados pertencem ao mesmo tenant;
- os serviços estão ativos;
- a disponibilidade utilizada pertence ao mesmo tenant;
- os bloqueios consultados pertencem ao mesmo tenant;
- as regras de atendimento utilizadas pertencem ao mesmo tenant.

A cliente não deve conseguir enviar outro `tenantId` e redirecionar a reserva para outro estabelecimento.

## IDs de Serviços em Rotas Públicas

Mesmo que a cliente possua um `serviceId`, o backend deve validar:

- existência;
- status ativo;
- relacionamento com o tenant do slug atual.

Exemplo:

Perfil atual: `/studio-maria`

A cliente manipula a requisição e envia um serviço de `/studio-ana`.

Resultado: rejeitar a operação.

## Página Pública de Confirmação

A rota `/agendamento/[token]` deve permitir acesso somente à reserva específica daquele link e apenas às ações públicas documentadas.

Nunca permitir que essa página:

- liste outros agendamentos;
- consulte agenda administrativa;
- revele dados de outras clientes;
- dê acesso ao Dashboard;
- altere configurações profissionais.

## Identificador Público da Confirmação

O link público deve utilizar `appointments.tokenPublico`, separado do `appointments.id` interno.

O identificador utilizado em `/agendamento/[token]` deve ser suficientemente imprevisível.

Se `appointments.id` utilizar UUID ou outro identificador aleatório forte, ele pode ser utilizado conforme o fluxo documentado.

Se o ID for sequencial, curto ou facilmente enumerável, não deve ser utilizado sozinho como credencial pública de acesso.

Nesse caso, a implementação deverá utilizar um identificador público seguro ou token aleatório específico.

O requisito é impedir que alguém descubra reservas de outras clientes simplesmente tentando IDs.

## Minimização de Dados na Confirmação Pública

Mesmo com link válido, retornar apenas o necessário para:

- identificar a reserva;
- apresentar o resumo;
- pagar o sinal;
- confirmar;
- cancelar quando permitido;
- apresentar o estado atual.

Não retornar:

- senha;
- credenciais Mercado Pago;
- Access Token;
- Refresh Token;
- informações de outras reservas;
- observações administrativas privadas;
- IDs internos desnecessários.

## Cliente Não Possui Permissão Administrativa

Uma cliente utilizando páginas públicas nunca deve conseguir:

- marcar atendimento como `finalizado`;
- alterar preço;
- alterar serviço cadastrado;
- alterar configuração da profissional;
- modificar disponibilidade;
- consultar Dashboard;
- acessar Financeiro;
- modificar integração Mercado Pago.

## Operações Privadas por ID

Para toda API privada que receba identificadores como `appointmentId`, `serviceId`, `blockedTimeId` ou `portfolioId`, seguir:

1. validar sessão;
2. identificar tenant autorizado;
3. validar formato do ID;
4. buscar o recurso dentro do tenant autorizado;
5. validar estado/permissão específica;
6. somente então executar a operação.

## Recurso de Outro Tenant

Caso uma profissional tente acessar um recurso de outro tenant:

- nunca retornar o conteúdo;
- nunca executar a ação;
- não revelar informações desnecessárias.

Para recursos privados identificados por ID, preferir comportamento que não permita distinguir facilmente entre:

**"esse recurso existe, mas pertence a outra pessoa"**

e:

**"esse recurso não existe"**

quando essa distinção não for necessária.

A padronização entre `403` e `404` é definida na seção global de erros HTTP/API.

## Listagens

Listagens privadas devem aplicar o filtro do tenant desde a própria consulta.

Nunca:

1. buscar dados de todos os tenants;
2. enviar para o frontend;
3. esconder visualmente os que não pertencem à profissional.

O correto é consultar somente os registros do tenant autorizado.

## Paginação, Busca e Filtros

Filtros enviados pelo frontend nunca devem remover a proteção de tenant.

Conceitualmente:

```text
tenantId = tenantAutorizado
E filtrosSolicitadosPeloUsuario
```

## Contagens e Métricas

A mesma proteção vale para:

- quantidade de agendamentos;
- clientes;
- faturamento;
- horas ocupadas;
- gráficos;
- relatórios;
- estatísticas futuras.

Consultas agregadas também devem ser filtradas pelo tenant.

## Criação de Registros

Quando uma profissional criar um recurso privado, o backend deve associá-lo ao tenant autorizado obtido pela sessão.

Não confiar em `tenantId` enviado pelo formulário para definir o proprietário.

## Atualização de Registros

Para atualizar um recurso:

- validar propriedade antes;
- atualizar somente dentro do tenant autorizado.

## Exclusão ou Desativação

Antes de excluir ou desativar qualquer recurso:

- validar sessão;
- validar tenant;
- validar propriedade;
- validar regras específicas do recurso.

## Mass Assignment

O backend não deve aceitar automaticamente todos os campos enviados pelo frontend e repassá-los ao banco.

Utilizar somente campos explicitamente permitidos para cada operação.

Campos como `tenantId`, `userId`, `statusPagamento`, `paymentId`, tokens, credenciais OAuth, datas internas e outros campos controlados pelo sistema não devem ser alteráveis livremente pelo navegador.

## Respostas da API

As respostas devem retornar somente os campos necessários à tela correspondente.

Não retornar objetos completos do banco por conveniência quando eles contiverem informações que o frontend não precisa.

Princípio:

**mínimo necessário para executar a função da tela.**

## Logs

Logs internos podem registrar informações necessárias para diagnóstico e segurança, mas não devem registrar desnecessariamente:

- senhas;
- Access Tokens;
- Refresh Tokens;
- Client Secrets;
- cookies de sessão;
- códigos de autenticação completos;
- dados financeiros sensíveis.

## Tentativa de Acesso Indevido

Quando uma tentativa inválida entre tenants for detectada:

- rejeitar a operação;
- não retornar o recurso;
- registrar internamente quando apropriado;
- não alterar nenhum registro.

## Sessão Válida, mas Tenant Inexistente

Caso exista sessão válida, mas o tenant correspondente não possa ser localizado:

- não permitir acesso às áreas administrativas;
- não utilizar um tenant informado pelo frontend como substituto;
- tratar a situação como estado inválido da conta.

Exibir:

**"Não foi possível acessar os dados da sua conta. Entre novamente ou tente mais tarde."**

## Cache

Dados privados armazenados em cache não podem ser compartilhados entre tenants.

Qualquer cache administrativo deve incluir o tenant em sua chave ou estratégia de isolamento.

Exemplo:

```text
dashboard:{tenantId}
```

E não apenas:

```text
dashboard
```

## Server-Side Rendering e Carregamento Inicial

Quando páginas privadas forem renderizadas no servidor:

- validar sessão antes de buscar os dados;
- identificar tenant;
- consultar somente dados autorizados;
- não renderizar conteúdo privado para depois escondê-lo no navegador.

## APIs Internas e Chamadas Diretas

Todas as regras devem funcionar mesmo quando alguém chamar a API diretamente sem utilizar a interface oficial.

A ausência de um botão no frontend não constitui autorização.

## Modo Mock / Desenvolvimento

Quando o sistema estiver em modo mock:

- manter identidade de tenant controlada;
- não ignorar completamente as verificações de autorização;
- simular isolamento entre tenants quando necessário para testes;
- impedir ativação acidental do mock em produção.

A versão de produção não deve possuir mecanismo público para escolher arbitrariamente qual tenant simular.

## Testes de Autorização

Antes da produção, testar no mínimo:

- profissional A consulta recurso da profissional A → permitido;
- profissional A consulta recurso da profissional B → negado;
- profissional A tenta editar/excluir recurso da profissional B → negado;
- profissional A manipula `tenantId` no body → negado ou ignorado de forma segura;
- profissional A manipula ID na URL → não obtém recurso de outro tenant;
- cliente acessa perfil público → recebe somente dados públicos;
- cliente tenta usar serviço de outro slug → rejeitado;
- requisição sem sessão acessa API administrativa → rejeitada;
- sessão inválida/expirada acessa dados privados → rejeitada.

## Regra Final

Em qualquer operação privada, a pergunta do backend nunca deve ser apenas:

**"Este recurso existe?"**

Deve ser:

**"Este recurso existe dentro do tenant que esta sessão está autorizada a acessar?"**

Todo isolamento entre estabelecimentos deve ser garantido no backend, independentemente do comportamento do frontend.

---

# Segurança de Autenticação, Sessões e Integrações

As regras desta seção devem ser aplicadas a todos os mecanismos relacionados a:

- criação de conta;
- Login;
- Logout;
- verificação de e-mail;
- recuperação de senha;
- redefinição de senha;
- autenticação com Google;
- sessões;
- cookies;
- códigos temporários;
- Mercado Pago OAuth;
- webhooks;
- pagamentos;
- credenciais;
- segredos da aplicação.

A segurança dessas operações deve ser garantida principalmente pelo backend.

O frontend pode melhorar a experiência do usuário, mas não deve ser utilizado como única camada de proteção.

## Regra Geral

Nenhuma operação de autenticação deve confiar somente em:

- estado do frontend;
- `localStorage`;
- parâmetros da URL;
- campos ocultos;
- valores enviados pelo navegador.

Toda autenticação, sessão, código, token e autorização deve ser validada pelo backend antes da operação correspondente.

## Senhas

Senhas nunca devem ser armazenadas em texto puro.

A senha deve ser transformada utilizando algoritmo de hash de senha apropriado antes de ser persistida.

O banco deve armazenar somente `senhaHash`.

Nunca armazenar:

- senha original;
- senha temporária em texto puro;
- senha em logs;
- senha em analytics;
- senha no `localStorage`;
- senha em cookies;
- senha em parâmetros de URL.

## Comparação de Senha

Durante o Login:

- buscar a conta correspondente;
- comparar a senha informada com `senhaHash` utilizando o mecanismo seguro da biblioteca de autenticação;
- não comparar senhas manualmente;
- não retornar `senhaHash` ao frontend.

O resultado público deve indicar apenas autenticação válida ou inválida.

## Requisitos de Senha

Aplicar as regras já definidas nas telas de Cadastro e Redefinição.

O backend deve repetir a validação e não considerar suficiente apenas `minLength`, JavaScript ou indicador visual de força.

## Login com E-mail e Senha

No Login, não informar publicamente se:

- o e-mail não existe;
- o e-mail existe, mas a senha está errada.

Para os dois casos, utilizar:

**"E-mail ou senha incorretos. Tente novamente."**

O backend pode registrar internamente o motivo real da falha sem revelar essa informação ao usuário.

## Conta com E-mail Ainda Não Verificado

Quando as credenciais estiverem corretas, mas o e-mail ainda precisar ser verificado, exibir:

**"Seu e-mail ainda não foi verificado. Conclua a verificação para continuar."**

Disponibilizar ação **Verificar e-mail**.

Não liberar áreas administrativas antes da verificação obrigatória.

## Prevenção contra Enumeração de Contas

As rotas públicas de autenticação não devem facilitar a descoberta de quais e-mails estão cadastrados.

Aplicar principalmente em:

- Login;
- recuperação de senha;
- solicitação de código;
- endpoints públicos relacionados à autenticação.

## Recuperação de Senha

Ao solicitar recuperação, não informar se existe ou não uma conta vinculada ao e-mail.

Após um e-mail com formato válido ser informado, exibir:

**"Se existir uma conta vinculada a este e-mail, enviaremos um código de recuperação."**

Essa resposta deve ser visualmente equivalente quando a conta existe e quando não existe.

Caso exista uma conta elegível para recuperação por senha:

- gerar o código;
- armazenar com segurança;
- enviar o e-mail.

Caso não exista conta elegível, não enviar código e manter a mesma resposta pública.

## Conta que Utiliza Somente Google

Na primeira etapa pública da recuperação, não revelar imediatamente que um e-mail pertence a uma conta Google.

Manter resposta genérica:

**"Se existir uma conta vinculada a este e-mail, enviaremos instruções para continuar."**

Fluxos em que a identidade já tenha sido comprovada podem apresentar orientação mais específica quando necessário.

## Tempo de Resposta

Evitar diferenças excessivamente perceptíveis entre conta existente e inexistente em operações públicas de autenticação.

O objetivo é reduzir enumeração por tempo de resposta sem introduzir atrasos artificiais desnecessários.

## Códigos de Verificação

Códigos de verificação de e-mail e recuperação de senha devem:

- possuir validade limitada;
- possuir finalidade específica;
- ser associados ao e-mail correto;
- possuir controle de tentativas;
- ser invalidados após uso;
- não poder ser reutilizados.

Validar no backend:

- `email`;
- `codigo`;
- `tipo`;
- `expiraEm`;
- `tentativas`;
- `bloqueadoAte`, quando houver bloqueio temporário ativo.

## Separação por Tipo de Código

Um código criado para `verificacao_email` não pode ser utilizado para `recuperacao_senha` e vice-versa.

Sempre validar `verification_codes.tipo`.

## Validade do Código

O prazo atual é de 15 minutos.

Após `expiraEm`:

- rejeitar o código;
- impedir utilização;
- solicitar novo código.

A validade deve ser determinada pelo backend, não pelo cronômetro do frontend.

## Código de Uso Único

Após utilização bem-sucedida:

- invalidar ou remover o código;
- impedir reutilização.

## Novo Código Invalida o Anterior

Quando um novo código for gerado para o mesmo e-mail e finalidade, o código anterior deve deixar de ser aceito.

Somente o código mais recente permanece utilizável.

## Tentativas de Código

Aplicar controle de tentativas também à verificação inicial de e-mail.

Após cada código incorreto, incrementar `tentativas`.

Após 5 tentativas incorretas, bloquear temporariamente novas tentativas.

O backend deve persistir o instante final do bloqueio em `verification_codes.bloqueadoAte` ou estrutura equivalente no Convex. Enquanto `Date.now() < bloqueadoAte`, novas tentativas devem ser rejeitadas mesmo que a página seja atualizada, o navegador seja fechado ou outra requisição seja enviada manualmente.

A duração do bloqueio deve ser definida por constante/configuração segura no backend para que frontend e backend utilizem a mesma regra. A contagem regressiva exibida na interface deve ser calculada a partir de `bloqueadoAte`, nunca apenas de um contador local.

## Reenvio de Código

Aplicar intervalo mínimo de 60 segundos entre solicitações consecutivas.

Durante esse período:

- desabilitar **Reenviar código**;
- mostrar contagem regressiva quando apropriado.

O backend também deve rejeitar tentativas manuais de contornar o intervalo.

## Rate Limit

Aplicar limitação de requisições nas operações públicas sensíveis, no mínimo:

- criação de conta;
- Login;
- envio e validação de código;
- reenvio;
- recuperação de senha;
- redefinição de senha;
- autenticação Google;
- início de OAuth;
- criação pública de pré-reserva;
- operações públicas de confirmação;
- geração ou consulta repetitiva de pagamento.

O objetivo é reduzir brute force, spam, automação abusiva, enumeração de contas, envio excessivo de e-mails, criação abusiva de reservas e consumo indevido de APIs externas.

## Limites de Rate Limit

Os valores exatos podem variar por rota.

Quando apropriado, considerar:

- IP;
- conta/e-mail;
- sessão;
- identificador da operação;
- combinação desses fatores.

Não depender apenas de IP em todos os casos.

## Excesso de Tentativas

Quando o limite for ultrapassado:

- rejeitar temporariamente novas solicitações;
- não executar a operação;
- não continuar enviando e-mails;
- não continuar consultando integrações desnecessariamente.

Exibir:

**"Muitas tentativas foram realizadas. Aguarde um pouco antes de tentar novamente."**

## Proteção contra Brute Force no Login

Tentativas repetidas de senha incorreta devem ser limitadas.

Evitar bloqueio permanente de uma conta causado por terceiros.

Preferir:

- limitação temporária;
- aumento gradual de espera;
- rate limit;
- monitoramento de comportamento anormal.

## Sessão

Após autenticação bem-sucedida, criar sessão segura usando o mecanismo de autenticação adotado pelo projeto.

A sessão deve representar:

- usuário autenticado;
- identidade necessária para autorização;
- validade da sessão.

Nunca utilizar apenas `userId` no `localStorage` como prova de autenticação.

## Cookies de Sessão

Quando a autenticação utilizar cookies, em produção aplicar quando compatível:

- `HttpOnly`;
- `Secure`;
- `SameSite` apropriado;
- escopo restrito ao necessário.

## Tokens de Sessão

Tokens de autenticação não devem ser armazenados desnecessariamente em:

- `localStorage`;
- variáveis públicas;
- HTML;
- URL;
- logs.

Utilizar o mecanismo seguro da biblioteca/framework.

## HTTPS

A versão de produção deve utilizar HTTPS.

Não enviar por conexão insegura:

- senha;
- sessão;
- código;
- token OAuth;
- dados de pagamento;
- dados privados da profissional;
- dados de clientes.

## Login Bem-Sucedido

Após autenticação:

- criar/atualizar sessão;
- determinar estado real da conta;
- verificar e-mail quando aplicável;
- verificar aceite dos termos;
- verificar onboarding;
- redirecionar conforme **Controle de Acesso e Proteção de Rotas**.

Não confiar em destino livremente fornecido pelo navegador sem validá-lo.

## Prevenção de Session Fixation

Após Login, a sessão deve ser estabelecida ou rotacionada de forma segura pelo mecanismo de autenticação.

Utilizar os mecanismos da biblioteca em vez de gerenciamento manual improvisado.

## Sessão Expirada

Quando a sessão expirar:

- rejeitar novas operações privadas;
- interromper uso de dados administrativos;
- limpar estado de autenticação apropriado;
- direcionar para Login.

Exibir:

**"Sua sessão expirou. Entre novamente para continuar."**

## Logout

Ao clicar em **Sair**:

- encerrar a sessão atual;
- inutilizar estado local de autenticação correspondente;
- redirecionar para rota pública apropriada.

Após Logout, o botão Voltar não deve permitir reutilizar páginas privadas com uma sessão inválida.

## Redefinição de Senha

Antes de permitir nova senha:

- validar código;
- validar e-mail;
- validar `tipo = recuperacao_senha`;
- validar prazo;
- validar tentativas;
- confirmar que o código não foi utilizado.

Somente depois atualizar `senhaHash`.

## Após Redefinir a Senha

Depois da redefinição:

- invalidar o código;
- impedir reutilização;
- considerar encerrar sessões antigas quando suportado;
- direcionar para Login, salvo se a aplicação estabelecer de forma explícita uma nova sessão autenticada segura.

Exibir:

**"Senha redefinida com sucesso."**

## CSRF

Operações autenticadas que alteram dados devem possuir proteção contra requisições forjadas quando a estratégia utilizada exigir.

Isso inclui:

- criar serviço;
- editar perfil;
- criar agendamento;
- cancelar;
- alterar configurações;
- desconectar Mercado Pago.

Utilizar as proteções fornecidas pelo framework/biblioteca e não desativá-las apenas para facilitar desenvolvimento.

## Login com Google

A autenticação Google deve utilizar o fluxo oficial OAuth/OIDC suportado pela biblioteca de autenticação.

Não implementar Login Google validando apenas informações enviadas pelo frontend.

## Google OAuth - Estado da Operação

Utilizar proteções suportadas pela biblioteca/provedor, quando aplicáveis:

- `state`;
- `nonce`;
- PKCE;
- demais mecanismos oficiais.

Não aceitar callback OAuth arbitrário apenas por conter parâmetros aparentemente válidos.

## Redirect URI do Google

Utilizar somente URLs de retorno previamente configuradas e permitidas.

Não permitir URL externa arbitrária como destino final.

## Dados Recebidos do Google

Confiar somente nos dados de identidade validados pelo provedor/biblioteca.

Não permitir que o frontend envie manualmente:

```text
email = profissional@exemplo.com
googleId = qualquer_valor
```

e seja tratado como autenticação Google válida.

## Vinculação de Conta Google

Não vincular automaticamente uma conta Google a uma conta existente com base em um e-mail não validado enviado pelo navegador.

Qualquer vinculação deve utilizar identidade validada pelo provedor e respeitar o comportamento seguro da biblioteca de autenticação.

## Falha no Google OAuth

Caso o Login Google falhe, exibir:

**"Não foi possível autenticar com o Google. Tente novamente."**

Nunca mostrar tokens, resposta completa do provedor, stack trace ou Client Secret.

## Mercado Pago OAuth

A conexão Mercado Pago deve ser iniciada somente por profissional autenticada e autorizada para o tenant correspondente.

Antes de iniciar:

1. validar sessão;
2. identificar tenant da sessão;
3. gerar estado de OAuth;
4. associar o fluxo ao tenant autorizado;
5. redirecionar para o Mercado Pago.

Não permitir iniciar conexão para um `tenantId` arbitrário enviado pelo frontend.

## Proteção do state no Mercado Pago

O `state` ou mecanismo equivalente deve ser:

- imprevisível;
- associado à tentativa correta;
- validado no callback;
- possuir validade limitada quando aplicável;
- não ser reutilizado indefinidamente.

Se for inválido, ausente, expirado ou incompatível, não concluir a conexão.

Exibir:

**"Não foi possível validar a conexão com o Mercado Pago. Tente conectar novamente."**

## Código OAuth do Mercado Pago

O código temporário recebido no callback:

- deve ser processado pelo backend;
- deve ser usado somente para concluir a conexão;
- não deve ser persistido como credencial permanente;
- não deve ser enviado ao `localStorage`;
- não deve aparecer em logs desnecessariamente;
- não deve ser reutilizado.

## Tokens Mercado Pago

`accessTokenCriptografado` e `refreshTokenCriptografado` devem permanecer protegidos no backend.

Nunca retornar esses valores ao navegador.

O frontend deve receber somente estados como:

- conectado;
- desconectado;
- conexão expirada;
- necessita reconexão.

## Criptografia de Credenciais

A chave usada para proteger tokens:

- não deve ficar no banco junto dos tokens;
- não deve ser enviada ao frontend;
- não deve estar no repositório;
- deve ser mantida como segredo do ambiente.

## Renovação de Token

Quando houver suporte:

- verificar `tokenExpiraEm`;
- utilizar `refreshToken` pelo backend;
- persistir novos tokens com segurança;
- não enviar credenciais ao frontend.

Se a renovação falhar, não continuar usando silenciosamente um token inválido.

## Webhooks do Mercado Pago

Notificações recebidas por webhook não devem ser confiadas automaticamente apenas por chegarem à rota correta.

O backend deve validar a autenticidade da notificação utilizando o mecanismo oficial disponibilizado pelo Mercado Pago para a integração utilizada.

## Validação de Webhook

Antes de alterar pagamento ou agendamento:

- validar autenticidade;
- identificar o pagamento;
- localizar o agendamento correspondente;
- verificar tenant;
- consultar/confirmar o estado real quando necessário;
- aplicar mudança somente quando os dados forem consistentes.

Nunca aceitar diretamente uma requisição arbitrária definindo `statusPagamento = pago`.

## Webhook Inválido

Caso a autenticidade não possa ser validada:

- não alterar pagamento;
- não confirmar agendamento;
- não executar reembolso;
- registrar internamente quando apropriado.

## Webhook Duplicado

O processamento deve ser idempotente.

O mesmo evento recebido duas vezes não pode:

- criar outro agendamento;
- contabilizar pagamento duas vezes;
- executar a mesma operação financeira duas vezes.

## Ordem dos Webhooks

Não assumir que eventos externos chegam sempre na ordem esperada.

Antes de alterar estado financeiro:

- consultar estado atual;
- validar transição;
- impedir evento antigo de sobrescrever estado mais recente incorretamente.

## paymentId

`appointments.paymentId` deve ser definido a partir de operação confiável do backend/Mercado Pago.

A cliente não deve conseguir alterar esse valor manualmente.

Ao utilizar `paymentId`, confirmar:

- relacionamento com o agendamento esperado;
- tenant;
- estado financeiro.

## Botão Já paguei

O botão **Já paguei / Atualizar** não deve definir diretamente `statusPagamento = pago`.

Ele deve solicitar nova verificação ao backend.

Somente após confirmação válida do gateway:

- atualizar pagamento;
- confirmar agendamento quando aplicável.

## Idempotência de Pagamentos

Operações que criam cobranças devem evitar duplicidade por:

- duplo clique;
- retry;
- atualização;
- falha de conexão;
- reenvio da mesma solicitação.

Quando já existir uma cobrança válida associada à pré-reserva, reutilizá-la quando aplicável.

## Segredos da Aplicação

Devem permanecer somente no backend/ambiente seguro:

- segredo da sessão;
- Client Secret do Google;
- Client Secret do Mercado Pago;
- chaves de criptografia;
- Access Tokens;
- Refresh Tokens;
- credenciais de banco;
- chaves privadas de serviços;
- demais secrets.

## Variáveis NEXT_PUBLIC_*

Qualquer variável destinada ao frontend deve ser considerada pública.

Nunca armazenar em `NEXT_PUBLIC_*`:

- Client Secret;
- senha;
- Access Token;
- Refresh Token;
- chave de criptografia;
- segredo de sessão;
- credenciais privadas.

## Arquivo .env

Arquivos com credenciais reais:

- não devem ser enviados ao repositório;
- não devem ser incluídos em ZIP de distribuição;
- não devem ser publicados;
- não devem aparecer em screenshots/documentação pública.

Utilizar `.env.example` somente com nomes das variáveis e placeholders.

## Logs

Não registrar em texto puro:

- senha;
- código completo de recuperação quando desnecessário;
- Access Token;
- Refresh Token;
- Client Secret;
- cookie de sessão;
- Authorization header completo;
- chaves de criptografia.

## Mensagens de Erro

Erros de autenticação nunca devem revelar hash de senha, queries internas, stack trace, tokens, cookies, segredos, estrutura interna da sessão ou resposta bruta de OAuth.

## CORS

APIs privadas não devem aceitar indiscriminadamente requisições de qualquer origem quando isso não for necessário.

A política deve ser compatível com a arquitetura real do Beleza em Dia.

## Cabeçalhos de Segurança

Na produção, aplicar cabeçalhos de segurança apropriados usando recursos do Next.js, plataforma de hospedagem ou middleware correspondente.

As políticas devem ser compatíveis com Google OAuth, Mercado Pago, imagens e demais recursos realmente utilizados.

## Modo Desenvolvimento / Mock

Comportamentos exclusivos de teste devem ser impossíveis de ativar acidentalmente em produção.

Isso inclui:

- Login fictício;
- código `123456`;
- usuário mock;
- pagamentos falsos;
- Mercado Pago simulado;
- bypass de autenticação;
- bypass de verificação de e-mail.

Não aceitar `?mock=true` ou `localStorage.mock = true` como autorização para ativar bypasses.

## Código Fixo de Teste

Caso exista código fictício conhecido no ambiente local, ele deve funcionar exclusivamente em desenvolvimento/teste.

Na produção:

- não pode funcionar;
- não deve aparecer na interface;
- não deve aparecer em JavaScript enviado ao navegador;
- não deve ser aceito como fallback.

## Falha do Serviço de E-mail

Se o serviço de e-mail falhar:

- não expor credenciais;
- não retornar resposta técnica do provedor;
- não fingir que o envio ocorreu quando a operação exigia envio real.

Quando necessário para evitar enumeração, a resposta pública deve continuar sem revelar se a conta existe.

## Eventos Sensíveis

Quando apropriado, registrar eventos como:

- excesso de tentativas de Login;
- bloqueios temporários;
- tentativas inválidas de código;
- callback OAuth inválido;
- tentativa de acesso entre tenants;
- webhook inválido;
- falhas repetidas de autenticação.

Esses registros não devem conter segredos.

## Regra Final

O backend deve assumir que qualquer requisição pode ser construída manualmente.

Toda operação sensível deve validar:

1. identidade;
2. sessão;
3. autorização;
4. entrada;
5. estado atual;
6. regras de negócio;

antes de executar qualquer alteração.

---

# Padronização de API, Erros HTTP e Comportamento Global da Interface

As regras desta seção devem ser aplicadas a todas as APIs, Server Actions, integrações e operações do Beleza em Dia.

O objetivo é garantir que:

- o backend utilize respostas HTTP consistentes;
- o frontend consiga identificar corretamente cada situação;
- mensagens técnicas não sejam exibidas ao usuário;
- erros de validação sejam diferenciados de erros internos;
- conflitos de negócio sejam tratados corretamente;
- falhas externas não sejam confundidas com falhas da própria aplicação;
- a experiência permaneça consistente em Web, Tablet/iPad e Mobile.

## Estrutura Geral das Respostas da API

Sempre que a arquitetura da rota permitir, utilizar uma estrutura previsível.

### Resposta de Sucesso

```json
{
  "success": true,
  "data": {}
}
```

Quando necessário:

```json
{
  "success": true,
  "data": {},
  "meta": {}
}
```

`meta` pode conter paginação, quantidade total e outros metadados não sensíveis.

### Resposta de Erro

```json
{
  "success": false,
  "error": {
    "code": "APPOINTMENT_TIME_CONFLICT",
    "message": "Este horário acabou de ficar indisponível. Escolha outro horário."
  }
}
```

Para erros de campo:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Revise os campos informados.",
    "fields": {
      "clienteNome": "Informe seu nome.",
      "clienteTelefone": "Informe um número de WhatsApp válido com DDD."
    }
  }
}
```

O formato exato pode ser adaptado durante a implementação, desde que permaneça consistente.

## Código Funcional do Erro

Sempre que útil, utilizar código funcional estável, por exemplo:

```text
VALIDATION_ERROR
AUTHENTICATION_REQUIRED
SESSION_EXPIRED
ACCESS_DENIED
RESOURCE_NOT_FOUND
APPOINTMENT_TIME_CONFLICT
APPOINTMENT_EXPIRED
SERVICE_INACTIVE
RATE_LIMIT_EXCEEDED
PAYMENT_NOT_CONFIRMED
MERCADOPAGO_UNAVAILABLE
INTERNAL_ERROR
```

O frontend deve preferir esses códigos para decidir comportamento da interface em vez de comparar textos completos de mensagens.

# Status HTTP

## HTTP 200 - OK

Utilizar quando uma operação for concluída normalmente e houver conteúdo de resposta.

Exemplos:

- consultar Dashboard;
- listar agendamentos;
- consultar serviço;
- verificar estado de pagamento;
- carregar perfil público.

## HTTP 201 - Created

Utilizar quando um novo recurso for criado com sucesso.

Exemplos:

- criação de agendamento;
- criação de serviço;
- criação de bloqueio de horário.

## HTTP 204 - No Content

Pode ser utilizado quando uma operação for concluída sem necessidade de retornar conteúdo.

O frontend deve estar preparado para uma resposta sem JSON e nunca executar parsing obrigatório em `204`.

## HTTP 400 - Bad Request

Utilizar quando a requisição estiver estruturalmente inválida ou não puder ser interpretada.

Exemplos:

- JSON inválido;
- parâmetro estrutural obrigatório ausente;
- formato impossível de interpretar;
- requisição malformada.

Mensagem genérica:

**"Não foi possível processar os dados enviados. Revise as informações e tente novamente."**

Quando o problema for uma validação de campo compreensível, preferir `422`.

## HTTP 401 - Unauthorized

Utilizar para usuário não autenticado ou sessão inválida/expirada.

Exemplos:

- API administrativa sem sessão;
- sessão expirada;
- token de sessão inválido.

Frontend:

- interromper operação privada;
- limpar estado de autenticação apropriado;
- redirecionar para Login quando aplicável.

Exibir:

**"Sua sessão expirou. Entre novamente para continuar."**

## HTTP 403 - Forbidden

Utilizar quando existe autenticação válida, porém a identidade não possui autorização para executar a ação.

Exibir:

**"Você não possui permissão para realizar esta ação."**

Não revelar detalhes sobre outros tenants.

## HTTP 404 - Not Found

Utilizar quando o recurso não existe ou quando sua existência não deve ser revelada naquele contexto.

Exemplos:

- perfil público inexistente;
- agendamento inexistente;
- serviço inexistente;
- recurso privado fora do tenant autorizado quando for mais seguro não revelar existência.

Mensagem administrativa:

**"Não foi possível encontrar o recurso solicitado."**

Em páginas públicas, utilizar mensagens específicas já definidas, como **"Agenda não encontrada."**

## 403 ou 404 para Recurso de Outro Tenant

Para recursos privados identificados por ID, pode ser preferível retornar `404` para não revelar que o recurso existe em outro tenant.

O comportamento deve ser consistente entre recursos equivalentes.

## HTTP 405 - Method Not Allowed

Utilizar quando a rota existe, mas o método HTTP não é permitido.

Não executar automaticamente outra operação apenas porque a rota existe.

## HTTP 409 - Conflict

Utilizar quando a requisição é válida, mas entra em conflito com o estado atual do sistema.

Exemplos:

- horário acabou de ser ocupado;
- reserva já expirou;
- status atual impede a transição;
- concorrência entre operações.

### Horário Ocupado

Backend:

```text
409 Conflict
code: APPOINTMENT_TIME_CONFLICT
```

Frontend:

**"Este horário acabou de ficar indisponível. Escolha outro horário."**

### Reserva Expirada

```text
409 Conflict
code: APPOINTMENT_EXPIRED
```

Mensagem:

**"Esta pré-reserva expirou e o horário não está mais reservado."**

## HTTP 413 - Payload Too Large

Utilizar quando arquivo ou requisição ultrapassar o tamanho máximo permitido.

Exibir:

**"Este arquivo ultrapassa o tamanho máximo permitido."**

Quando houver limite específico, informar o limite.

## HTTP 415 - Unsupported Media Type

Utilizar quando o tipo de conteúdo/arquivo não for suportado.

Exibir:

**"Formato de arquivo não suportado."**

## HTTP 422 - Unprocessable Entity

Utilizar preferencialmente quando a estrutura da requisição é válida, mas os dados não respeitam regras de validação.

Exemplos:

- nome obrigatório vazio;
- telefone inválido;
- preço menor ou igual a zero;
- porcentagem acima de 100%;
- endereço obrigatório ausente;
- modalidade incompatível.

O frontend deve mostrar erros próximos aos campos e focar/rolar até o primeiro inválido.

Nunca apresentar apenas **"Erro 422"**.

## Diferença entre 400 e 422

```text
400 → a requisição está malformada ou não pode ser interpretada.
422 → a requisição foi entendida, mas os dados não passam nas validações.
```

## HTTP 429 - Too Many Requests

Utilizar quando houver bloqueio por rate limit.

Aplicável a Login, Cadastro, recuperação, códigos, reenvio, criação pública de agendamentos e outras rotas sensíveis.

Exibir:

**"Muitas tentativas foram realizadas. Aguarde um pouco antes de tentar novamente."**

Quando possível, utilizar `Retry-After` ou informação equivalente.

## HTTP 500 - Internal Server Error

Utilizar para falhas inesperadas internas.

Nunca retornar ao usuário:

- stack trace;
- query/estrutura interna do banco;
- erro interno do Convex/SDK;
- caminho de arquivo;
- variável de ambiente;
- credencial;
- token;
- detalhe interno de infraestrutura.

Resposta segura:

```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Não foi possível concluir esta operação agora."
  }
}
```

Interface:

**"Não foi possível concluir esta operação agora. Tente novamente em alguns instantes."**

## HTTP 502 - Bad Gateway

Pode ser utilizado quando o Beleza em Dia depende de serviço externo e recebe resposta inválida ou inesperada.

A interface deve usar mensagem contextual, por exemplo:

**"Não foi possível consultar o Mercado Pago agora. Tente novamente em alguns instantes."**

## HTTP 503 - Service Unavailable

Utilizar quando o serviço estiver temporariamente indisponível.

Exibir:

**"O serviço está temporariamente indisponível. Tente novamente em alguns instantes."**

## HTTP 504 - Gateway Timeout

Pode ser utilizado quando uma dependência externa demora além do limite permitido.

Especialmente em operações financeiras, timeout significa estado potencialmente desconhecido, não necessariamente falha definitiva.

Quando necessário:

- consultar novamente o estado;
- evitar repetir operação automaticamente;
- aplicar idempotência.

Exibir:

**"O serviço demorou mais que o esperado para responder. Tente novamente."**

# Falha de Rede sem Resposta HTTP

Nem todo erro possui código HTTP.

Exemplos:

- internet caiu;
- DNS falhou;
- navegador ficou offline;
- conexão foi interrompida;
- requisição não chegou ao servidor.

Exibir:

**"Não foi possível conectar ao sistema. Verifique sua conexão e tente novamente."**

O frontend deve diferenciar API que respondeu com erro de situação em que nenhuma resposta foi recebida.

# Timeout no Frontend

Requisições não devem permanecer indefinidamente em **"Carregando..."**.

Quando aplicável, utilizar timeout controlado.

Em operações de escrita, como criação de agendamento, pagamento, cancelamento e reembolso, não repetir automaticamente sem verificar se a primeira tentativa foi concluída.

# Erros de Integrações Externas

Falhas externas podem possuir códigos funcionais próprios, por exemplo:

```text
CEP_SERVICE_UNAVAILABLE
EMAIL_SERVICE_UNAVAILABLE
GOOGLE_AUTH_FAILED
MERCADOPAGO_UNAVAILABLE
MERCADOPAGO_AUTH_EXPIRED
PAYMENT_VERIFICATION_FAILED
```

# Mercado Pago

Nunca enviar diretamente ao frontend mensagens internas do Mercado Pago quando contiverem informações técnicas desnecessárias.

O backend deve:

1. interpretar a resposta;
2. registrar detalhes técnicos de forma segura;
3. retornar código funcional do Beleza em Dia;
4. retornar mensagem segura.

# Erros de Banco de Dados

Erros internos do Convex, validações de schema, índices ou exceções de funções do backend nunca devem ser enviados diretamente ao navegador.

Não retornar mensagens técnicas brutas, nomes internos de funções, conteúdo de documentos, stack traces ou detalhes de validação do SDK.

O backend deve interpretar a falha e retornar status/código funcional adequado para a interface.

# Erros Conhecidos e Desconhecidos

### Erro conhecido

Situação prevista pela regra de negócio, como horário ocupado, serviço inativo, sessão expirada, código incorreto ou reserva expirada.

Retornar status adequado, código funcional e mensagem segura.

### Erro desconhecido

Falha não prevista.

Retornar `500`, `INTERNAL_ERROR`, registrar internamente e não revelar detalhes técnicos.

# Request ID / Identificador de Diagnóstico

Quando a infraestrutura permitir, erros internos podem possuir identificador seguro de requisição para localizar o evento nos logs.

Nunca utilizar token, ID de sessão, senha ou segredo como código de referência.

# Logs de Erro

Os logs podem registrar detalhes técnicos necessários para diagnóstico, porém devem evitar dados sensíveis.

Não registrar desnecessariamente:

- senhas;
- tokens OAuth;
- cookies;
- Authorization headers completos;
- Client Secrets;
- códigos de recuperação;
- chaves de criptografia;
- dados financeiros sensíveis.

# Erros e Dados de Outros Tenants

Uma resposta de erro nunca deve revelar dados pertencentes a outro tenant.

Preferir mensagem genérica apropriada, como:

**"Não foi possível encontrar o recurso solicitado."**

# Frontend - Tratamento de Resposta

O frontend não deve assumir que:

- toda resposta contém JSON;
- toda resposta `2xx` possui corpo;
- todo erro possui o mesmo formato;
- toda requisição que falhou recebeu resposta HTTP.

Antes de processar:

1. verificar status;
2. verificar se existe corpo;
3. verificar tipo de conteúdo quando necessário;
4. interpretar com tratamento seguro;
5. utilizar fallback se a resposta for inválida.

# JSON Inválido

Não exibir mensagens como `Unexpected end of JSON input`.

Exibir:

**"Não foi possível processar a resposta do sistema. Tente novamente."**

# Resposta Vazia

Uma resposta vazia pode ser válida em `204 No Content`.

Se uma operação esperava obrigatoriamente determinado conteúdo e não o recebeu, tratar como resposta inesperada.

# Loading

Toda operação assíncrona perceptível deve possuir estado de carregamento.

Durante loading:

- evitar múltiplos cliques;
- evitar envio duplicado;
- manter feedback visual;
- preservar conteúdo preenchido.

# Toast, Mensagem no Campo ou Estado da Página

### Erro de campo

Exibir próximo ao campo.

### Erro de uma ação

Pode utilizar mensagem integrada, alerta ou toast.

### Erro que impede carregar uma seção

Exibir dentro da própria seção.

### Erro que impede carregar toda a página

Utilizar estado completo com título, descrição e **Tentar novamente**.

Não utilizar toast como única informação para uma página totalmente indisponível.

# Sucesso

Mensagens de sucesso devem refletir somente operações confirmadas.

Não exibir **"Salvo com sucesso"** antes da confirmação do backend.

# Operações Otimistas

Atualizações otimistas podem ser usadas em situações seguras e devem ser revertidas caso o backend rejeite a operação.

Para operações críticas, preferir confirmação do backend antes de representar sucesso definitivo.

# Revisão Global de Responsividade

Todas as telas do Beleza em Dia devem funcionar corretamente em:

- Web/Desktop;
- Tablet/iPad;
- Mobile/Celular.

As regras específicas de cada tela possuem prioridade.

## Modo Web

Em telas maiores:

- aproveitar largura disponível sem esticar excessivamente o conteúdo;
- utilizar `max-width` adequado;
- manter hierarquia visual clara;
- evitar grandes áreas vazias quando puderem ser aproveitadas;
- manter sidebar/navegação consistente em áreas administrativas;
- centralizar modais;
- manter largura máxima apropriada;
- evitar linhas de texto excessivamente longas;
- utilizar grids quando houver espaço.

## Modo Tablet / iPad

Tablet não deve receber simplesmente a versão Desktop espremida ou Mobile esticada.

Quando houver espaço:

- manter cards lado a lado;
- aproveitar largura horizontal;
- manter ações principais na mesma linha quando couberem;
- adaptar sidebar/navegação;
- utilizar modais centralizados;
- aumentar moderadamente a largura dos formulários.

Adaptar progressivamente conforme a largura diminuir.

## Modo Mobile

Em celulares:

- utilizar largura disponível de forma eficiente;
- reduzir paddings excessivos;
- empilhar conteúdo quando necessário;
- manter ações principais acessíveis;
- utilizar botões `100%` quando apropriado;
- evitar elementos pequenos demais para toque;
- não depender de hover;
- permitir rolagem vertical natural;
- manter hierarquia visual clara.

# Sem Scroll Horizontal

Nenhuma tela deve exigir scroll horizontal para uso normal.

Corrigir overflow em:

- tabelas;
- grids;
- cards;
- inputs;
- imagens;
- QR Codes;
- modais;
- textos longos;
- botões.

# Safe Area

Respeitar `safe-area` quando necessário, principalmente em botões fixos, rodapés, modais e ações próximas à parte inferior.

# Altura da Tela

Quando uma tela utilizar a altura disponível, preferir `100dvh` quando apropriado.

# Teclado Mobile

Ao abrir teclado virtual:

- campo focado deve permanecer visível;
- botões críticos não devem ficar permanentemente inacessíveis;
- página/modal deve poder rolar.

# Modais

Os modais devem permanecer utilizáveis em qualquer tamanho de tela.

Aplicar:

- largura máxima;
- margem lateral segura;
- `max-height`;
- rolagem interna quando necessário.

Não transformar automaticamente todos os modais em bottom sheets.

# QR Code

QR Codes devem ser responsivos, legíveis, proporcionais e nunca ultrapassar a largura da tela.

# Imagens e Vídeos

Conteúdo visual deve respeitar o container e evitar distorção, overflow e cortes involuntários.

# Textos Longos

URL, e-mail, código Pix, observações e outros textos longos devem quebrar linha, truncar de forma controlada ou possuir área específica de rolagem/copiar sem quebrar o layout.

# Botões

Botões devem possuir área confortável para clique/toque e ação principal visualmente identificável.

# Hover

Nenhuma funcionalidade obrigatória pode depender exclusivamente de `:hover`.

# Foco por Teclado

Elementos interativos devem manter indicação visual de foco e navegação por teclado funcional.

# Labels

Placeholder não deve ser a única forma de identificar um campo.

# Mensagens de Erro Acessíveis

Erro não deve ser indicado somente por cor.

Utilizar texto, destaque visual e associação clara ao campo.

# Contraste

Garantir contraste adequado nos temas Claro, Escuro e Automático, principalmente em texto secundário, placeholders, bordas, estados desabilitados, badges, erros e links.

# Loading e Skeleton

Skeletons devem preservar aproximadamente a estrutura que será carregada e evitar mudanças bruscas de layout.

# Estado Vazio

Diferenciar sempre:

```text
carregando
```

de:

```text
vazio
```

de:

```text
erro
```

Cada estado deve possuir interface própria.

# Consistência das Mensagens

Utilizar português claro e direto na interface final.

Evitar misturar textos como `Loading`, `Save` ou `Something went wrong` com o restante da aplicação em português.

# Ambiente de Desenvolvimento

Mensagens técnicas mais detalhadas podem aparecer em console e logs locais, mas não na interface final.

Não adicionar avisos permanentes como **"MODO MOCK ATIVO"** na versão destinada ao usuário.

# Produção

Em produção:

- não exibir stack traces;
- não exibir erros do framework;
- não expor configuração;
- não expor variáveis de ambiente;
- não expor credenciais;
- não mostrar erros crus do banco ou integrações.

# Tratamento de Erros por Prioridade

Quando uma operação puder gerar vários tipos de erro, tratar primeiro situações específicas e conhecidas.

Exemplo para criação de agendamento:

1. validar entrada;
2. validar autenticação/contexto;
3. validar tenant;
4. validar serviço;
5. validar disponibilidade;
6. verificar conflito;
7. persistir;
8. tratar falha inesperada.

Assim:

- dados inválidos → `422`;
- horário ocupado → `409`;
- rate limit → `429`;
- falha inesperada → `500`.

# Não Utilizar HTTP 200 para Todo Erro

Uma API não deve retornar `HTTP 200` com `success: false` para qualquer problema.

Utilizar o status HTTP correspondente sempre que apropriado.

# Não Utilizar HTTP 500 para Toda Validação

Erros do usuário e conflitos conhecidos não devem virar `500`.

Exemplos:

- telefone inválido → `422`;
- horário ocupado → `409`;
- sessão expirada → `401`.

# Regra Final de API

Cada resposta de erro deve permitir responder:

1. qual categoria de problema ocorreu → status HTTP;
2. qual situação funcional ocorreu → `error.code`;
3. o que o usuário precisa saber → mensagem segura;
4. o que o desenvolvedor precisa investigar → logs internos.

Nunca enviar o conteúdo completo do log ao usuário.

# Regra Final de Interface

Todas as telas devem:

- possuir estados de loading apropriados;
- diferenciar vazio, erro e sucesso;
- preservar dados preenchidos em falhas recuperáveis;
- impedir múltiplos envios;
- possuir mensagens amigáveis;
- funcionar em Web, Tablet/iPad e Mobile;
- impedir overflow horizontal;
- respeitar safe areas;
- funcionar com teclado mobile;
- manter modais acessíveis;
- não depender exclusivamente de hover;
- nunca exibir conteúdo técnico ou privado por erro.

Quando uma tela possuir regra específica documentada anteriormente, a regra específica possui prioridade sobre a regra global desta seção.

---

# Configuração Inicial do Perfil

Após criar a conta e aceitar os termos, a profissional passa por 6 etapas de configuração.

---

## Tela de Configurar Perfil - Passo 1 de 6

Nesta tela, a profissional informa:

- Nome completo / nome profissional.
- Número de telefone / WhatsApp.
- Foto de perfil ou logo.
- Nome do Estúdio/Salão.
- Bio profissional.
- Mídias do portfólio: fotos e vídeos.

### Portfólio

O limite é de **20 mídias no total**, somando imagens e vídeos.

Formatos aceitos:

- Imagens: JPG, PNG e WebP.
- Vídeos: MP4, MOV e WEBM.
- Vídeos: máximo de 30 segundos e até 50 MB por arquivo.

- **Dados usados:**
  - **Tabela `tenants`:**
    - `id` - gerado pelo backend para o estabelecimento.
    - `userId` - recebe o `id` da conta criada em `users`.
    - `slug` - gerado pelo backend com base no nome do estabelecimento e usado na URL pública.
    - `nomeProfissional` - informado pela profissional.
    - `bioProfissional` - informado pela profissional, até 500 caracteres.
    - `nomeEstabelecimento` - informado pela profissional.
    - `whatsapp` - informado pela profissional.
    - `fotoPerfilUrl` - URL gerada após o upload da foto/logo.
    - `limitePortfolioArquivos` - padrão de 20 arquivos.
    - `criadoEm` - gerado automaticamente.
  - **Tabela `tenant_portfolio`:** para cada mídia enviada:
    - `id` - gerado pelo backend.
    - `tenantId` - recebe o `id` do estabelecimento.
    - `tipo` - `imagem` ou `video`.
    - `midiaUrl` - URL do arquivo armazenado.
    - `thumbnailUrl` - capa/thumbnail do vídeo, quando aplicável.
    - `duracaoSegundos` - duração do vídeo, quando aplicável.
    - `tamanhoBytes` - tamanho do arquivo.
    - `ordemExibicao` - posição da mídia no portfólio.
    - `criadoEm` - gerado automaticamente.

- **Mensagens de erros e validações:**
  - **Nome profissional vazio:** **"Informe seu nome para continuar."**
  - **Nome do salão/estúdio vazio:** **"Informe o nome do seu salão, estúdio ou seu próprio nome profissional."**
  - O nome do estabelecimento é obrigatório porque será utilizado na vitrine pública.
  - **Telefone vazio:** **"Informe seu número de WhatsApp."**
  - Aplicar máscara: `(00) 00000-0000`.
  - Validar DDD e quantidade de dígitos antes de salvar.
  - Caso o WhatsApp já esteja vinculado a outro estabelecimento, exibir: **"Este número de WhatsApp já está vinculado a outro perfil."**
  - **Bio:** máximo de 500 caracteres, com contador visual.
  - Foto/logo é opcional, mas recomendar o envio para facilitar a identificação do negócio.
  - O `slug` deve ser criado no backend em formato apropriado para URL.
  - Se o `slug` já existir, o backend deve gerar uma variação única em vez de sobrescrever outro perfil.
  - **Mais de 20 mídias:** **"Seu portfólio pode ter no máximo 20 fotos e vídeos."**
  - **Formato não permitido:** **"Formato de arquivo não suportado."**
  - **Vídeo acima de 30 segundos:** **"O vídeo deve ter no máximo 30 segundos."**
  - **Arquivo acima de 50 MB:** **"Arquivo excedeu o tamanho máximo de 50 MB."**
  - Manter temporariamente os campos preenchidos no `localStorage` durante o fluxo de configuração.
  
  ### Validações e Erros Complementares do Passo 1

Além das regras globais de validação do sistema, aplicar as seguintes validações específicas nesta etapa.

- **Nome profissional inválido:**
  - não aceitar valor composto apenas por espaços;
  - não aceitar conteúdo claramente incompatível com um nome profissional.

  Exibir:

  **"Informe um nome profissional válido."**

- **Nome do estabelecimento inválido:**
  - não aceitar valor composto apenas por espaços;
  - aplicar as regras globais de campos de texto.

  Exibir:

  **"Informe um nome válido para o seu salão, estúdio ou negócio."**

- **Telefone / WhatsApp inválido:**

  Caso o campo tenha sido preenchido, mas não possua DDD ou quantidade válida de dígitos, exibir:

  **"Informe um número de WhatsApp válido com DDD."**

- O campo de telefone deve rejeitar letras e caracteres incompatíveis.

- A máscara visual não deve ser considerada suficiente para validar o número.

- O backend deve normalizar e validar novamente o telefone antes de salvar.

### Foto de Perfil / Logo

A foto de perfil é opcional.

Porém, caso a profissional escolha enviar uma imagem:

- validar o arquivo antes do upload;

- não aceitar arquivo vazio, corrompido ou incompatível;

- validar o tipo real do arquivo no backend, não confiando apenas na extensão;

- caso o upload falhe, manter os demais dados do formulário preenchidos.

- **Arquivo inválido:**

  **"Não foi possível utilizar esta imagem. Escolha outro arquivo."**

- **Falha no upload da foto de perfil:**

  **"Não foi possível enviar sua foto de perfil. Tente novamente."**

- Caso o upload falhe:
  - restaurar os botões;
  - permitir nova tentativa;
  - não apagar nome, telefone, estabelecimento, bio ou mídias já selecionadas.

### Upload do Portfólio

Cada arquivo do portfólio deve possuir estado individual de upload.

Estados possíveis:

- aguardando;
- enviando;
- concluído;
- erro.

Caso apenas uma mídia apresente erro:

- não cancelar automaticamente o upload das demais mídias válidas;

- identificar visualmente qual arquivo apresentou problema;

- manter os arquivos enviados com sucesso;

- disponibilizar as ações:
  - **Tentar novamente**;
  - **Remover**.

- **Falha no upload de uma mídia:**

  **"Não foi possível enviar este arquivo. Tente novamente."**

- **Arquivo inválido ou corrompido:**

  **"Este arquivo não pôde ser processado. Escolha outro arquivo."**

- **Falha inesperada durante o processamento da mídia:**

  **"Não foi possível processar esta mídia. Tente novamente."**

- Se um vídeo não puder ter sua duração identificada corretamente, não salvar o arquivo até que a validação seja concluída.

- Não considerar uma mídia como adicionada ao portfólio enquanto o upload e o salvamento não tiverem sido concluídos com sucesso.

### Remoção de Foto ou Mídia

Antes de remover uma foto de perfil ou mídia já salva, solicitar confirmação.

Caso ocorra erro ao excluir:

- manter a mídia visível;

- não alterar o contador do portfólio;

- não informar sucesso antes da confirmação do backend.

Mensagem:

**"Não foi possível remover esta mídia. Tente novamente."**

Após exclusão confirmada pelo backend:

- remover a mídia da interface;

- atualizar o contador;

- fechar o modal de visualização, quando aplicável.

### Salvamento do Passo 1

Ao clicar em **Próximo Passo**:

1. validar todos os campos obrigatórios;

2. validar os arquivos ainda pendentes;

3. impedir avanço enquanto existir upload obrigatório ainda sendo processado;

4. focar ou rolar automaticamente até o primeiro campo inválido;

5. iniciar o salvamento somente quando os dados estiverem válidos.

Durante o salvamento:

- desabilitar **Próximo Passo**;

- impedir múltiplos envios;

- exibir estado de carregamento, por exemplo:

  **"Salvando..."**

- **Erro de conexão ao salvar:**

  **"Não foi possível salvar seu perfil. Verifique sua conexão e tente novamente."**

- **Erro interno ao salvar:**

  **"Não foi possível salvar seu perfil agora. Tente novamente em alguns instantes."**

Em qualquer falha de salvamento:

- manter todos os dados preenchidos;

- manter as mídias já enviadas com sucesso;

- restaurar o botão **Próximo Passo**;

- permitir uma nova tentativa.

Somente após confirmação de sucesso pelo backend:

- considerar o Passo 1 concluído;

- avançar para o **Passo 2 de 6**.

- **Ajustes a serem feitos nas telas atuais:**

  - **Modo Web:**
    - Remover o aviso informando que o modo de teste está ativo.
    - Separar visualmente a seção de **Foto de perfil / Logo** da seção de **Portfólio**. A foto de perfil é uma configuração única do perfil profissional, enquanto o portfólio representa uma coleção de fotos e vídeos dos trabalhos realizados.
    - Na seção **Foto de perfil / Logo**, exibir a foto atual em formato circular e disponibilizar as ações **Editar enquadramento**, **Visualizar** e **Remover**.
    - Permitir abrir um modal de visualização ao clicar na foto de perfil ou em uma mídia do portfólio.
    - Adicionar botão para remover a foto de perfil.
    - A foto de perfil deve ser opcional. Caso nenhuma foto seja cadastrada, exibir um avatar circular com fundo preto/escuro e as iniciais do nome da profissional em vermelho.
    - Para nomes compostos, utilizar as iniciais definidas a partir do nome da profissional. Exemplo: "Davi Almeida" deve gerar "DA". Para nomes com apenas uma palavra, utilizar apenas uma inicial.
    - Adicionar modal de edição/enquadramento da foto de perfil.
    - No modal de edição, exibir uma prévia circular representando exatamente como a foto aparecerá no perfil público.
    - Permitir arrastar/reposicionar a imagem dentro da área de recorte.
    - Permitir controlar o zoom da imagem para aproximar ou afastar o enquadramento.
    - Disponibilizar as ações **Cancelar** e **Salvar foto** no modal de edição.
    - Na seção **Portfólio**, exibir separadamente todas as mídias já adicionadas em formato de grade.
    - Exibir no título da seção a quantidade de mídias cadastradas, por exemplo: **Portfólio (3/20 mídias)**.
    - Manter um card **Adicionar** ao final da grade do portfólio para inclusão de novas fotos ou vídeos.
    - Ao clicar no card **Adicionar**, abrir um modal específico para adicionar novas mídias ao portfólio.
    - O modal **Adicionar Fotos ao Portfólio** deve seguir o design apresentado na referência, exibindo:
      - título do modal;
      - quantidade de vagas disponíveis, por exemplo: **Disponível: 17 vaga(s) de 20 fotos**;
      - botão para fechar o modal;
      - grande área tracejada de upload;
      - ícone de upload;
      - mensagem **Arraste e solte suas fotos aqui**;
      - opção para abrir os arquivos do dispositivo;
      - formatos aceitos;
      - quantidade máxima de arquivos que ainda pode ser adicionada;
      - botão **Cancelar**;
      - botão **Salvar no Portfólio**, inicialmente desabilitado enquanto nenhuma mídia estiver selecionada.
    - Manter suporte a clique e **arrastar/soltar** arquivos para adicionar novas mídias ao portfólio.
    - Após selecionar uma ou mais mídias, manter o modal aberto e exibir uma seção **Fotos selecionadas**, conforme o design apresentado na referência.
    - Para cada arquivo selecionado, exibir:
      - miniatura da mídia;
      - nome do arquivo;
      - progresso percentual do upload;
      - barra visual de progresso;
      - indicador visual quando o upload for concluído.
    - Durante o upload, atualizar visualmente a porcentagem e a barra de progresso para deixar claro que o arquivo ainda está sendo processado.
    - Após o upload chegar a **100%**, exibir um indicador de conclusão ao lado da mídia.
    - Exibir a opção **+ Adicionar mais** enquanto ainda houver espaço disponível no portfólio, permitindo selecionar outros arquivos sem fechar o modal.
    - O botão **Salvar no Portfólio** deve exibir entre parênteses a quantidade de mídias prontas para serem adicionadas. Exemplo: **Salvar no Portfólio (1)**.
    - O botão **Salvar no Portfólio** somente deve ficar habilitado quando existir pelo menos uma mídia válida e pronta para ser salva.
    - Ao salvar, adicionar as mídias à grade do portfólio e atualizar automaticamente o contador de mídias utilizadas e vagas disponíveis.
    - Cada mídia adicionada ao portfólio deve ser apresentada em um card com prévia da imagem ou vídeo.
    - Ao passar o mouse sobre uma mídia do portfólio, disponibilizar as ações de **Visualizar** e **Remover**, seguindo o design apresentado na referência.
    - A ação **Visualizar** deve ser representada pelo ícone de olho.
    - A ação **Remover** deve ser representada pelo ícone de lixeira.
    - Permitir abrir a visualização tanto ao clicar diretamente sobre a mídia quanto ao clicar no ícone de **Visualizar**.
    - Ao abrir uma mídia, exibir um modal de visualização em tamanho maior, seguindo o design apresentado na referência.
    - O modal de visualização deve possuir:
      - nome/título da mídia no cabeçalho;
      - mídia ampliada utilizando o maior espaço possível sem distorção;
      - ação **Excluir Foto** ou **Excluir Vídeo**, conforme o tipo de mídia;
      - botão para fechar o modal.
    - A mídia ampliada deve manter sua proporção original, utilizando `object-fit: contain` quando necessário para evitar cortes ou distorções.
    - Ao clicar em **Excluir Foto**, **Excluir Vídeo** ou no ícone de lixeira da grade, solicitar confirmação antes da exclusão definitiva.
    - A confirmação deve informar claramente que a mídia será removida do portfólio.
    - Após confirmar a exclusão, remover a mídia, fechar o modal de visualização quando necessário e atualizar automaticamente o contador do portfólio.
    - Vídeos devem possuir uma indicação visual de que são vídeos, como um ícone de reprodução sobre a miniatura.
    - Ao visualizar um vídeo, utilizar o mesmo conceito de modal das fotos, porém exibindo um player de vídeo com os controles necessários.
    - Manter o limite máximo definido para o portfólio. Ao atingir **20/20 mídias**, impedir novas adições e informar visualmente que o limite foi alcançado.
    - Manter o botão **Próximo Passo** alinhado à direita no modo Web.


  - **Modo Mobile:**
    - Remover o aviso informando que o modo de teste está ativo.
    - Separar visualmente a seção de **Foto de perfil / Logo** da seção de **Portfólio**, seguindo a mesma hierarquia da versão Web.
    - Exibir a foto de perfil centralizada e em formato circular.
    - Disponibilizar abaixo da foto as ações **Editar enquadramento**, **Visualizar** e **Remover**, garantindo que sejam facilmente utilizáveis por toque.
    - Permitir abrir um modal de visualização da foto de perfil e das mídias do portfólio.
    - Adicionar botão para remover a foto de perfil.
    - A foto de perfil deve ser opcional. Caso nenhuma foto seja cadastrada, exibir um avatar circular com fundo preto/escuro e as iniciais do nome da profissional em vermelho.
    - Para nomes compostos, utilizar as iniciais definidas a partir do nome da profissional. Exemplo: "Davi Almeida" deve gerar "DA". Para nomes com apenas uma palavra, utilizar apenas uma inicial.
    - Adicionar modal de edição/enquadramento da foto de perfil adaptado para telas menores.
    - Permitir reposicionar a foto por toque/arraste e ajustar seu zoom.
    - A área circular exibida no editor deve representar exatamente o recorte que será utilizado no perfil público.
    - Organizar o portfólio em uma grade responsiva, preferencialmente com **2 colunas em celulares**, mantendo espaçamento adequado entre as mídias.
    - Manter o card **Adicionar** integrado à grade do portfólio.
    - Ao tocar no card **Adicionar**, abrir o modal **Adicionar Fotos ao Portfólio** adaptado para a largura do dispositivo.
    - No Mobile, substituir a dependência de arrastar e soltar pela seleção através dos arquivos/galeria do dispositivo, mantendo o drag and drop apenas quando o navegador e dispositivo oferecerem suporte adequado.
    - O modal deve informar a quantidade de vagas restantes, os formatos permitidos e a quantidade máxima de arquivos que ainda pode ser selecionada.
    - Após selecionar uma ou mais mídias, exibir a seção **Fotos selecionadas** com miniatura, nome do arquivo, porcentagem e barra de progresso do upload.
    - A barra de progresso deve atualizar visualmente durante o envio e indicar claramente quando o upload chegar a **100%**.
    - Disponibilizar a ação **+ Adicionar mais** enquanto ainda houver vagas disponíveis no portfólio.
    - O botão **Salvar no Portfólio** deve informar a quantidade de mídias selecionadas e somente ficar habilitado quando houver pelo menos uma mídia válida pronta para ser salva.
    - Cada mídia adicionada deve possuir ações acessíveis para **Visualizar** e **Remover**.
    - Como dispositivos touch não possuem `hover`, os botões de **Visualizar** e **Remover** devem permanecer visíveis sobre a miniatura ou ser facilmente acessíveis através de toque.
    - Permitir abrir uma mídia tocando diretamente sobre sua miniatura ou sobre o botão de **Visualizar**.
    - Ao visualizar uma foto, abrir um modal em tela ampliada contendo o nome da mídia, a imagem, a opção **Excluir Foto** e o botão para fechar.
    - A imagem deve utilizar o máximo de espaço disponível sem perder sua proporção ou ficar distorcida.
    - Para vídeos, utilizar o mesmo conceito de visualização, exibindo um player com controles e a opção **Excluir Vídeo**.
    - Antes de excluir qualquer mídia, solicitar confirmação para evitar exclusões acidentais, principalmente em dispositivos touch.
    - Após uma exclusão, atualizar imediatamente a grade e o contador de mídias disponíveis.
    - Garantir que os modais de upload, visualização, confirmação e edição não ultrapassem a largura ou a altura disponível da tela.
    - Em celulares, os modais podem ocupar praticamente toda a largura disponível, mantendo pequenas margens laterais e respeitando as `safe areas`.
    - Caso o conteúdo do modal seja maior que a altura da tela, permitir rolagem dentro da área de conteúdo sem esconder os botões principais.
    - Manter o limite máximo de **20 mídias** também no Mobile.
    - Caso o conteúdo da página ultrapasse a altura disponível, permitir rolagem vertical normal sem cortar campos, fotos, ações ou botões.
    - Centralizar horizontalmente o botão **Próximo Passo** no modo Mobile.
    - Manter o botão **Próximo Passo** sempre acessível após o conteúdo, respeitando a `safe area` inferior do dispositivo.




---

## Tela de Configurar Perfil - Passo 2 de 6

Nesta tela, a profissional define como sua agenda funcionará.

O tipo padrão é **Agenda Fixa**.

### Agenda Fixa

Ao selecionar Agenda Fixa, mostrar um texto simples explicando o funcionamento.

Por padrão:

- Segunda a sexta: ativos.
- Sábado e domingo: desativados.

Para cada dia ativo existem duas opções:

- **Expediente contínuo:** exemplo `09:00 às 18:00` ou mais de uma janela, como `09:00 às 12:00` e `14:00 às 18:00`.
- **Horários pontuais:** exemplo `09:00`, `12:00` e `14:00`.

### Agenda Flexível

Ao selecionar Agenda Flexível, exibir um texto explicativo.

Para cada dia ativo existem duas opções:

- **Faixas de horário:** exemplo `14:00 às 20:00`.
- **Combinar no WhatsApp:** o dia fica aberto e a cliente solicita o agendamento; a profissional combina o horário exato pelo WhatsApp.

### Pré-visualização da Agenda

No final da tela, mostrar uma pré-visualização do que foi configurado.

**Exemplo:**

- Segunda-feira: 09:00 às 12:00 e 14:00 às 18:00.
- Terça-feira: 09:00 às 12:00 e 14:00 às 18:00.
- Quarta-feira: 09:00, 12:00 e 14:00.
- Quinta-feira: 09:00 às 12:00 e 14:00 às 18:00.
- Sexta-feira: 09:00 às 12:00 e 14:00 às 18:00.
- Sábado: Fechado.
- Domingo: Fechado.

### Regras de Tempo e Pausas

Valores padrão:

- **Intervalo entre atendimentos:** não aplicado.
  - Opções: não aplicado, 5, 10, 15, 20, 25 ou 30 minutos.
- **Tolerância de atraso:** não aplicado.
  - Opções: não aplicado, 5, 10, 15, 20, 25 ou 30 minutos.
- **Antecedência mínima para agendamento:** regra fixa de **1 hora** no MVP.
  - Não exibir seletor de 2, 4, 8, 12 ou 24 horas enquanto essa regra permanecer fixa.

- **Dados usados:**
  - **Tabela `tenants`:**
    - `tipoAgenda` - `fixa` ou `flexivel`.
    - `intervaloEntreAtendimentosMinutos` - número de minutos ou `NULL` quando não aplicado.
    - `toleranciaAtrasoMinutos` - número de minutos ou `NULL` quando não aplicado.
    - `antecedenciaMinimaAgendamentoHoras` - quantidade de horas; padrão 1.
  - **Tabela `availability`:** uma linha por dia da semana para cada estabelecimento.
    - `id` - gerado pelo backend.
    - `tenantId` - estabelecimento dono da agenda.
    - `diaSemana` - `0` para domingo até `6` para sábado.
    - `ativo` - define se o dia está aberto.
    - `janelas` - horários/faixas daquele dia em JSON.
    - `modoExpediente` - `continuo`, `pontuais`, `faixas` ou `whatsapp`.
    - `criadoEm` - gerado automaticamente.

- **Mensagens de erros e validações:**
  - Agenda Fixa já deve vir selecionada por padrão.
  - Sempre deve existir exatamente um tipo de agenda selecionado.
  - **Tipo de agenda ausente:** **"Selecione o tipo de agenda."**
  - Não permitir horário final menor ou igual ao horário inicial.
  - **Faixa inválida:** **"O horário final deve ser depois do horário inicial."**
  - Não permitir sobreposição de janelas no mesmo dia.
  - **Sobreposição:** **"Existem horários sobrepostos neste dia. Ajuste as faixas para continuar."**
  - Em horários pontuais, não permitir o mesmo horário duplicado.
  - Um dia desativado deve aparecer como **Fechado** na pré-visualização.
  - Cada estabelecimento pode possuir somente um registro de disponibilidade por dia, conforme a restrição `UNIQUE (tenantId, diaSemana)`.
  - Manter temporariamente as configurações no `localStorage` durante o cadastro.


### Validações e Erros Complementares do Passo 2

Além das regras globais de validação do sistema, aplicar as seguintes validações específicas à configuração da agenda.

### Dia Ativo sem Horário

Quando um dia estiver marcado como ativo, ele deve possuir uma configuração válida de funcionamento.

Não permitir avançar caso exista um dia ativo sem nenhum horário, faixa ou modo de funcionamento configurado.

- **Agenda Fixa + Expediente Contínuo:**
  - deve existir pelo menos uma janela de horário válida.

- **Agenda Fixa + Horários Pontuais:**
  - deve existir pelo menos um horário válido.

- **Agenda Flexível + Faixas de Horário:**
  - deve existir pelo menos uma faixa válida.

- **Agenda Flexível + Combinar no WhatsApp:**
  - não é necessário cadastrar horário específico, pois o próprio modo `whatsapp` representa o funcionamento daquele dia.

Caso um dia ativo esteja sem configuração:

**"Adicione pelo menos um horário para este dia ou marque-o como fechado."**

O sistema deve rolar/focar automaticamente no primeiro dia que possuir erro.

### Horários Vazios ou Incompletos

Não permitir salvar uma faixa com apenas um dos horários preenchido.

Exemplo inválido:

- Início: `09:00`
- Fim: vazio.

Exibir:

**"Informe o horário inicial e o horário final."**

Caso ambos estejam vazios em uma nova faixa ainda não utilizada, ela pode ser ignorada ou removida automaticamente, desde que não represente a única configuração de um dia ativo.

### Horário Inválido

Horários devem utilizar valores válidos entre:

`00:00` e `23:59`

Não aceitar valores manipulados manualmente como:

- `25:00`;
- `12:80`;
- texto;
- formatos inválidos;
- valores fora das opções permitidas.

Mensagem:

**"Informe um horário válido."**

Mesmo que os campos utilizem seletores de horário, o backend deve validar novamente os valores recebidos.

### Faixa de Horário

Para cada faixa:

- o horário inicial deve ser menor que o horário final;

- não permitir duração igual a zero;

- não permitir faixa invertida;

- não permitir sobreposição com outra faixa do mesmo dia.

Exemplos:

`09:00 às 09:00` → inválido.

`14:00 às 10:00` → inválido.

Mensagem já definida:

**"O horário final deve ser depois do horário inicial."**

### Sobreposição de Horários

Considerar sobreposição inclusive quando uma faixa estiver parcialmente dentro de outra.

Exemplo inválido:

- `09:00 às 12:00`;
- `11:30 às 14:00`.

Exibir:

**"Existem horários sobrepostos neste dia. Ajuste as faixas para continuar."**

Também não permitir faixas completamente duplicadas.

### Horários Pontuais

Em **Horários Pontuais**:

- não permitir valor vazio;

- não permitir horário inválido;

- não permitir o mesmo horário mais de uma vez no mesmo dia.

Caso exista duplicidade:

**"Este horário já foi adicionado neste dia."**

### Alteração do Tipo de Funcionamento

Ao trocar um dia de:

- **Expediente Contínuo** para **Horários Pontuais**;

ou entre:

- **Faixas de Horário**;
- **Combinar no WhatsApp**;

o sistema deve evitar que valores antigos incompatíveis sejam enviados ou salvos acidentalmente.

Os dados que não pertencem ao modo atualmente selecionado não devem interferir na validação.

Antes de descartar alterações preenchidas que ainda não foram salvas, caso exista risco de perda de informação relevante, solicitar confirmação.

### Dia Desativado

Quando um dia for desativado:

- considerá-lo como **Fechado**;

- não exigir horários;

- não utilizar horários antigos daquele dia na disponibilidade pública enquanto ele permanecer desativado.

A pré-visualização deve atualizar imediatamente para:

**"[Dia da semana]: Fechado."**

### Regras de Tempo e Pausas

Os campos:

- **Intervalo entre atendimentos**;
- **Tolerância de atraso**;
- **Antecedência mínima para agendamento**;

devem aceitar somente as opções definidas pelo sistema.

Não confiar em valores enviados manualmente pelo navegador.

Para **Intervalo entre atendimentos**, aceitar somente:

- não aplicado;
- 5;
- 10;
- 15;
- 20;
- 25;
- 30 minutos.

Para **Tolerância de atraso**, aceitar somente:

- não aplicado;
- 5;
- 10;
- 15;
- 20;
- 25;
- 30 minutos.

Para **Antecedência mínima**, utilizar a regra fixa de **1 hora**.

O backend deve rejeitar tentativa de alterar esse valor por requisição manipulada enquanto a regra permanecer fixa no MVP.

### Resumo da Agenda

O **Resumo da sua Agenda** deve ser gerado somente a partir da configuração atualmente válida.

Se existir algum erro:

- o resumo pode continuar exibindo os demais dias válidos;

- o dia inválido deve possuir indicação visual de que precisa ser corrigido;

- não apresentar uma configuração inválida como se estivesse pronta para ser utilizada pelas clientes.

### Salvamento do Passo 2

Ao clicar em **Próximo Passo**:

1. validar o tipo de agenda;

2. validar todos os dias ativos;

3. validar todas as faixas e horários pontuais;

4. validar sobreposições;

5. validar as regras de tempo e pausas;

6. rolar/focar automaticamente no primeiro erro encontrado;

7. somente iniciar o salvamento quando todas as configurações obrigatórias estiverem válidas.

Durante o salvamento:

- desabilitar **Próximo Passo**;

- impedir múltiplos envios simultâneos;

- exibir estado de carregamento:

  **"Salvando..."**

### Erro de Conexão ao Salvar

Exibir:

**"Não foi possível salvar sua agenda. Verifique sua conexão e tente novamente."**

### Erro Interno ao Salvar

Exibir:

**"Não foi possível salvar sua agenda agora. Tente novamente em alguns instantes."**

Em qualquer erro:

- não apagar os horários já configurados;

- não apagar regras de tempo e pausas;

- manter os dados temporariamente preenchidos;

- restaurar o botão **Próximo Passo**;

- permitir uma nova tentativa;

- não avançar para o Passo 3 antes da confirmação de sucesso.

Somente após o backend confirmar o salvamento:

- considerar o Passo 2 concluído;

- avançar para **Passo 3 de 6**.



- **Ajustes a serem feitos nas telas atuais:**

  - **Modo Web:**
    -  Quando houver algum erro num campo e eu aperto em "Próximo Passo", ele deve me mostrar qual campo está errado e me direcionar ao campo errado.
    - Remover o aviso informando que o modo de teste está ativo.

    - Deixar **Agenda Fixa** pré-selecionada.

    - Adicionar uma animação simples e discreta ao alternar entre **Agenda Fixa** e **Agenda Flexível**, utilizando `fade-out` no conteúdo atual e `fade-in` no novo conteúdo. A transição deve ser rápida, aproximadamente entre `150ms` e `250ms`.

    - Exibir corretamente as opções de **Agenda Flexível**:
      - **Faixas de Horário**;
      - **Combinar no WhatsApp**.

    - Adicionar a categoria **Regras de Tempo e Pausas**.

    - Na categoria **Regras de Tempo e Pausas**, adicionar uma explicação curta abaixo de cada campo para deixar clara sua função:
      - **Intervalo entre atendimentos:** "Tempo livre entre um atendimento e outro."
      - **Tolerância de atraso:** "Tempo máximo de atraso permitido para a cliente."
      - **Antecedência mínima:** "Quanto tempo antes a cliente precisa agendar."

    - Manter a opção **Não aplicado** nos campos em que a profissional não desejar utilizar determinada regra.

    - Adicionar a pré-visualização completa da semana no final da página através de uma seção chamada **Resumo da sua Agenda**.

    - Adicionar acima do resumo o texto:
      **"Confira abaixo como sua disponibilidade será apresentada para as clientes."**

    - O **Resumo da sua Agenda** deve ser atualizado automaticamente sempre que a profissional alterar dias, horários, faixas ou o tipo de funcionamento.

    - O resumo deve representar cada configuração corretamente:
      - **Expediente Contínuo:** "Segunda-feira: 09:00 às 18:00."
      - **Horários Pontuais:** "Quarta-feira: 09:00, 12:00 e 14:00."
      - **Faixas de Horário:** "Segunda-feira: 09:00 às 12:00 e 14:00 às 18:00."
      - **Combinar no WhatsApp:** "Segunda-feira: Horário a combinar pelo WhatsApp."
      - **Dia desativado:** "Segunda-feira: Fechado."

    - Exemplo de resumo:

      - Segunda-feira: 09:00 às 12:00 e 14:00 às 18:00.
      - Terça-feira: 09:00 às 12:00 e 14:00 às 18:00.
      - Quarta-feira: 09:00, 12:00 e 14:00.
      - Quinta-feira: 09:00 às 12:00 e 14:00 às 18:00.
      - Sexta-feira: 09:00 às 12:00 e 14:00 às 18:00.
      - Sábado: Fechado.
      - Domingo: Fechado.

    - Exibir o **Resumo da sua Agenda** em um card próprio, visualmente separado das configurações dos dias.

    - Garantir espaçamento adequado entre o resumo e os botões de navegação.

    - Nas áreas laterais vazias da página em monitores maiores, adicionar elementos decorativos sutis para dar maior profundidade ao layout, como gradientes radiais ou brilhos difusos em vermelho/rosa escuro com baixa opacidade. Esses elementos devem permanecer apenas no fundo e não podem competir visualmente com o conteúdo principal.

  - **Modo Mobile:**
    - Aplicar as mesmas regras e funcionalidades definidas no modo Web.

    - Remover o aviso informando que o modo de teste está ativo.

    - Deixar **Agenda Fixa** pré-selecionada.

    - Adicionar a mesma animação discreta de `fade-out` e `fade-in` ao alternar entre **Agenda Fixa** e **Agenda Flexível**.

    - Organizar os dias da semana em cards/accordions para evitar excesso de conteúdo aberto simultaneamente.

    - Garantir que seletores de horário não ultrapassem a largura da tela.

    - Exibir corretamente as opções de Agenda Flexível: **Faixas de Horário** e **Combinar no WhatsApp**.

    - Adicionar **Regras de Tempo e Pausas**.

    - Exibir abaixo de cada campo as explicações:
      - **Intervalo entre atendimentos:** "Tempo livre entre um atendimento e outro."
      - **Tolerância de atraso:** "Tempo máximo de atraso permitido para a cliente."
      - **Antecedência mínima:** "Quanto tempo antes a cliente precisa agendar."

    - Em celulares, organizar os campos de **Regras de Tempo e Pausas** verticalmente quando não houver largura suficiente para apresentá-los lado a lado.

    - Adicionar a pré-visualização completa da semana no final da página através da seção **Resumo da sua Agenda**, seguindo as mesmas regras do modo Web.

    - No Mobile, cada dia do resumo deve possuir espaço suficiente para que horários maiores possam quebrar em mais de uma linha sem cortar ou sobrepor informações.

    - O card **Resumo da sua Agenda** deve ocupar `100%` da largura disponível.

    - Atualizar o resumo automaticamente conforme a profissional altera a configuração da agenda.

    - Para tablets e iPads, manter a estrutura atual da tela de Agenda, pois ela já utiliza adequadamente a largura disponível.

    - Em tablets e iPads, manter os campos de início e fim lado a lado e manter **Agenda Fixa** e **Agenda Flexível** lado a lado quando houver espaço suficiente.

    - Em tablets e iPads, aumentar levemente o tamanho dos textos secundários e explicativos para melhorar a legibilidade.

    - Não adicionar elementos decorativos laterais complexos em celulares. Caso exista decoração de fundo, utilizar apenas gradientes muito sutis e de baixa opacidade.

    - Garantir que todo o conteúdo, incluindo **Regras de Tempo e Pausas**, **Resumo da sua Agenda** e botões de navegação, permaneça acessível através da rolagem vertical normal da página.

> **AVISO:** Na tela de **Configurações**, remover o campo **Duração Padrão dos Serviços**, pois cada serviço possui sua própria duração na tabela `services`.

---

## Tela de Configurar Perfil - Passo 3 de 6

Nesta tela, a profissional configura os serviços oferecidos.

Existem cinco categorias disponíveis no banco:

### 1. Unhas

- Manicure Simples.
- Pedicure Tradicional.
- Combo Manicure + Pedicure.
- Alongamento em Fibra de Vidro.
- Manutenção de Alongamento.
- Esmaltação em Gel.
- Banho de Gel.
- Remoção de Alongamento / Gel.
- Spa dos Pés.

### 2. Cabelos

- Corte Feminino + Escova.
- Escova Modelada.
- Hidratação Profunda + Escova.
- Nutrição / Reconstrução Capilar.
- Retoque de Raiz / Coloração.
- Meias Luzes / Morena Iluminada.
- Luzes / Mechas (Global).
- Botox Capilar.
- Penteado.

### 3. Sobrancelhas e Cílios

- Design de Sobrancelhas Simples.
- Design de Sobrancelhas com Henna.
- Brow Lamination.
- Extensão de Cílios - Fio a Fio.
- Extensão de Cílios - Volume Russo.
- Lash Lifting + Tintura.
- Manutenção de Cílios.
- Remoção de Cílios.

### 4. Depilação e Estética

- Depilação Buço / Rosto.
- Depilação Axilas.
- Depilação Meia Perna.
- Depilação Perna Inteira.
- Depilação Íntima / Virilha Completa.
- Limpeza de Pele Profunda.
- Drenagem Linfática Corporal.
- Massagem Relaxante.

### 5. Maquiagem

- Maquiagem Social / Evento.
- Maquiagem Express / Casual.
- Maquiagem para Noiva / Pré-Wedding.
- Aplicação de Cílios Postiços.

A profissional pode selecionar uma sugestão existente e editar:

- Nome.
- Descrição/observação.
- Preço.
- Duração em minutos.
- Imagem.

- **Dados usados:**
  - **Tabela `services`:** para cada serviço salvo:
    - `id` - gerado pelo backend.
    - `tenantId` - recebe o `id` do estabelecimento.
    - `categoria` - uma das cinco categorias disponíveis.
    - `nome` - informado ou editado pela profissional.
    - `descricao` - opcional.
    - `preco` - valor informado.
    - `duracaoMinutos` - duração informada.
    - `imagemPadraoUrl` - imagem padrão da sugestão, quando utilizada.
    - `imagemUrl` - imagem personalizada enviada pela profissional, quando houver.
    - `ordemExibicao` - posição de exibição.
    - `ativo` - `TRUE` para serviço disponível.
    - `criadoEm` - gerado automaticamente.

- **Mensagens de erros e validações:**
  - É necessário possuir pelo menos um serviço selecionado/criado para continuar.
  - **Nenhum serviço:** **"Selecione ou crie pelo menos um serviço para continuar."**
  - **Nome vazio:** **"Informe o nome do serviço."**
  - O nome deve respeitar o limite de 150 caracteres do banco.
  - Não aceitar nome composto somente por espaços, símbolos ou caracteres repetidos sem conteúdo útil.
  - **Nome claramente incompleto/inválido:** **"Esse nome parece incompleto. Informe o nome real do serviço."**
  - **Preço vazio:** **"Informe o preço do serviço."**
  - **Preço igual ou menor que zero:** **"O preço do serviço deve ser maior que R$ 0,00."**
  - Aplicar máscara de moeda brasileira, por exemplo: `75` → `R$ 75,00`.
  - **Duração vazia:** **"Informe a duração do serviço."**
  - **Duração igual ou menor que zero:** **"A duração deve ser maior que 0 minutos."**
  - Permitir somente números no campo de duração.
  - Se houver erro, rolar/focar automaticamente o primeiro campo inválido.

  ### Validações e Erros Complementares do Passo 3

Além das regras globais de validação do sistema, aplicar as seguintes validações específicas ao cadastro e edição de serviços.

### Categoria do Serviço

Todo serviço deve estar associado a uma das categorias permitidas pelo sistema:

- Unhas;
- Cabelos;
- Sobrancelhas e Cílios;
- Depilação e Estética;
- Maquiagem.

Para serviços sugeridos pelo sistema, a categoria já vem definida.

Para serviços criados manualmente, a profissional deve selecionar uma categoria válida antes de salvar.

- **Categoria não selecionada:**

  **"Selecione a categoria do serviço."**

O backend deve rejeitar qualquer categoria diferente das opções permitidas.

Não confiar em valores enviados manualmente pelo navegador.

### Nome do Serviço

O nome é obrigatório.

Não aceitar:

- campo vazio;
- apenas espaços;
- apenas símbolos;
- conteúdo claramente inválido;
- texto acima do limite permitido;
- caracteres invisíveis utilizados para contornar a validação.

- **Nome vazio:**

  **"Informe o nome do serviço."**

- **Nome inválido:**

  **"Informe um nome válido para o serviço."**

- **Nome acima do limite permitido:**

  **"O nome do serviço pode ter no máximo 150 caracteres."**

Remover espaços desnecessários no início e no final antes de salvar.

### Preço

O preço é obrigatório e deve representar um valor monetário válido.

Não aceitar:

- campo vazio;
- letras;
- texto arbitrário;
- valor igual a zero;
- valor negativo;
- `NaN`;
- valor infinito;
- formato que não possa ser convertido de maneira segura para moeda.

Exemplos inválidos:

- `abc`;
- `R$ teste`;
- `-20`;
- `0`.

- **Preço vazio:**

  **"Informe o preço do serviço."**

- **Preço com conteúdo inválido:**

  **"Informe um preço válido."**

- **Preço igual ou menor que zero:**

  **"O preço do serviço deve ser maior que R$ 0,00."**

O frontend deve utilizar máscara monetária.

Exemplo:

`75` → `R$ 75,00`

O backend deve validar novamente o valor recebido.

### Duração

A duração do serviço é obrigatória e deve ser informada em minutos.

Aceitar somente número inteiro maior que zero.

Não aceitar:

- letras;
- texto;
- número decimal;
- zero;
- valor negativo;
- `NaN`;
- valor infinito.

Exemplos inválidos:

- `abc`;
- `30min`;
- `1.5`;
- `0`;
- `-15`.

- **Duração vazia:**

  **"Informe a duração do serviço."**

- **Duração com formato inválido:**

  **"Informe a duração utilizando apenas minutos inteiros."**

- **Duração igual ou menor que zero:**

  **"A duração deve ser maior que 0 minutos."**

### Descrição

A descrição permanece opcional.

Caso seja preenchida:

- remover espaços desnecessários no início e no final;
- não aceitar somente espaços;
- respeitar o limite definido pelo sistema;
- aplicar as regras globais de segurança e tratamento de texto.

Um campo de descrição vazio não deve impedir o salvamento.

### Imagem do Serviço

A imagem do serviço é opcional.

Caso seja enviada:

- validar formato;
- validar tamanho;
- validar conteúdo real do arquivo;
- não confiar somente na extensão;
- impedir arquivo vazio, inválido ou corrompido.

- **Formato não permitido:**

  **"Formato de imagem não suportado."**

- **Arquivo inválido:**

  **"Não foi possível utilizar esta imagem. Escolha outro arquivo."**

- **Falha no upload:**

  **"Não foi possível enviar a imagem do serviço. Tente novamente."**

Caso o upload da imagem falhe:

- manter nome, categoria, preço, duração e descrição preenchidos;
- restaurar o botão;
- permitir tentar novamente;
- permitir remover a imagem e salvar o serviço sem ela.

### Serviços Duplicados

Não permitir que o mesmo serviço seja adicionado duas vezes ao mesmo estabelecimento de maneira acidental quando representar claramente o mesmo item.

Se a profissional tentar selecionar novamente um serviço sugerido que já está selecionado:

- manter somente uma ocorrência;
- não duplicar o card.

Para serviços criados manualmente com nome semelhante, não bloquear automaticamente apenas pelo nome caso possam representar serviços diferentes.

Quando houver risco claro de duplicação, o sistema pode alertar:

**"Já existe um serviço com este nome. Verifique antes de continuar."**

Esse aviso é preventivo. O backend deve validar a operação, mas nomes iguais ou semelhantes não constituem automaticamente uma violação de unicidade. Não criar uma restrição global de nome único apenas por causa desse aviso, pois serviços diferentes podem possuir nomes iguais ou parecidos.

### Edição de Serviço

Ao editar um serviço existente:

- aplicar novamente todas as validações de:
  - categoria;
  - nome;
  - preço;
  - duração;
  - descrição;
  - imagem.

Não permitir salvar uma edição inválida apenas porque o serviço já existia anteriormente.

Caso a edição falhe:

**"Não foi possível salvar as alterações deste serviço. Tente novamente."**

Manter os valores digitados para permitir correção ou nova tentativa.

### Remoção de Serviço Durante o Onboarding

Durante o onboarding, um serviço criado manualmente que ainda não foi salvo definitivamente pode ser removido da seleção.

Quando o serviço já existir no backend:

- não considerar a remoção concluída antes da confirmação do backend;
- em caso de falha, manter o serviço visível.

Mensagem:

**"Não foi possível remover este serviço. Tente novamente."**

Não utilizar exclusão física de serviços que já possuam vínculo com agendamentos antigos.

Quando aplicável fora do onboarding, utilizar `services.ativo = FALSE` para retirar o serviço da vitrine sem destruir o histórico.

### Estado dos Serviços Selecionados

O sistema deve garantir que:

- um serviço não apareça duplicado na lista;
- serviços desmarcados não sejam enviados como selecionados;
- serviços selecionados possuam todos os campos obrigatórios válidos;
- somente serviços válidos sejam considerados para conclusão do Passo 3.

Se existir qualquer serviço selecionado com dados inválidos, não permitir avançar.

### Salvamento do Passo 3

Ao clicar em **Próximo Passo**:

1. verificar se existe pelo menos um serviço selecionado ou criado;

2. validar todos os serviços selecionados;

3. validar categoria, nome, preço e duração;

4. verificar uploads ainda pendentes;

5. impedir avanço caso exista upload necessário em processamento;

6. rolar/focar automaticamente no primeiro campo inválido;

7. salvar somente quando todos os serviços estiverem válidos.

Durante o salvamento:

- desabilitar **Próximo Passo**;

- impedir múltiplos envios;

- exibir estado de carregamento:

  **"Salvando..."**

### Erro de Conexão ao Salvar

Exibir:

**"Não foi possível salvar seus serviços. Verifique sua conexão e tente novamente."**

### Erro Interno ao Salvar

Exibir:

**"Não foi possível salvar seus serviços agora. Tente novamente em alguns instantes."**

Em caso de falha:

- não apagar os serviços preenchidos;

- não remover serviços já selecionados;

- manter uploads concluídos;

- manter alterações ainda não salvas quando possível;

- restaurar o botão **Próximo Passo**;

- permitir nova tentativa;

- não avançar para o Passo 4.

Somente após confirmação de sucesso pelo backend:

- considerar o Passo 3 concluído;

- avançar para **Passo 4 de 6**.


- **Ajustes a serem feitos nas telas atuais:**

  - **Modo Web:**
    - Remover o aviso **"Modo de teste local ativo: uploads, login e painel podem ser testados sem banco de dados ou integrações externas."**.

    - Padronizar o design de todos os serviços selecionados.

    - Tanto os **serviços pré-cadastrados/sugeridos** quanto os **serviços criados manualmente pela profissional** devem utilizar o mesmo design compacto atualmente utilizado pelos serviços pré-cadastrados.

    - Não utilizar um card maior ou um formulário diferente para serviços criados manualmente.

    - Depois que um novo serviço for criado através de **Adicionar Novo Serviço**, ele deve ser adicionado à seção **Serviços Selecionados** utilizando exatamente o mesmo componente visual dos serviços pré-cadastrados.

    - O card padrão de um serviço selecionado deve apresentar:
      - checkbox indicando que o serviço está selecionado;
      - nome do serviço no cabeçalho;
      - campo **Nome do Serviço**;
      - campo **Preço (R$)**;
      - campo **Duração (min)**;
      - campo **Descrição (opcional)**.

    - Manter o layout compacto do design atual dos serviços pré-cadastrados:
      - **Nome do Serviço**, **Preço** e **Duração** devem permanecer na mesma linha quando houver espaço suficiente;
      - **Descrição (opcional)** deve ocupar a largura completa em uma linha abaixo.

    - A categoria do serviço criado manualmente deve continuar sendo armazenada normalmente, porém não é necessário exibir um campo grande de seleção de categoria dentro do card de **Serviços Selecionados**.

    - Para serviços criados manualmente, exibir a categoria de forma discreta acima do card ou próxima ao nome do serviço, seguindo o mesmo padrão visual utilizado para agrupar os serviços pré-cadastrados por categoria.

    - Caso seja necessário alterar a categoria de um serviço criado manualmente, essa alteração deve ser realizada através de uma ação de edição específica, sem transformar permanentemente o card selecionado em um formulário maior.

    - Permitir editar diretamente no card:
      - nome;
      - preço;
      - duração;
      - descrição.

    - O preço deve aceitar apenas valores numéricos válidos e maiores que zero.

    - A duração deve aceitar apenas números inteiros maiores que zero.

    - Manter as mensagens de validação diretamente abaixo do respectivo campo, sem alterar excessivamente a altura ou largura dos demais campos.

    - O serviço criado manualmente deve poder ser removido da seleção.

    - Ao remover um serviço criado manualmente que ainda não foi salvo definitivamente no sistema, removê-lo da lista de serviços selecionados.

    - Evitar duplicação visual: não exibir o mesmo serviço simultaneamente em um card de "serviço criado" e em outro card de "serviço selecionado".

    - Manter consistência de bordas, espaçamentos, tipografia, altura dos campos e cores entre serviços sugeridos e serviços criados manualmente.

    - O resultado esperado é que, depois de selecionado ou criado, **não seja possível distinguir visualmente pela estrutura do card se o serviço veio das sugestões ou foi criado manualmente**.


  - **Modo Mobile:**
    - Aplicar a mesma padronização definida no modo Web.

    - Remover o aviso **"Modo de teste local ativo: uploads, login e painel podem ser testados sem banco de dados ou integrações externas."**.

    - Tanto serviços pré-cadastrados quanto serviços criados manualmente devem utilizar o mesmo componente visual depois de selecionados.

    - Manter o design compacto do serviço selecionado, adaptando apenas a distribuição dos campos conforme a largura disponível.

    - Em telas pequenas, permitir que **Nome do Serviço**, **Preço** e **Duração** sejam reorganizados verticalmente ou em mais de uma linha quando necessário.

    - O campo **Descrição (opcional)** deve continuar ocupando toda a largura disponível.

    - Garantir que cards, campos e textos não ultrapassem a largura da tela e não gerem rolagem horizontal.

    - Utilizar teclado numérico nos campos de preço e duração quando suportado pelo dispositivo.

    - Para **Preço**, utilizar teclado adequado para entrada decimal.

    - Para **Duração**, utilizar teclado numérico.

    - Garantir que mensagens de erro apareçam integralmente abaixo de seus respectivos campos e não provoquem rolagem horizontal.

    - Manter áreas de toque adequadas para checkbox, campos e ações de remoção.

    - Em tablets e iPads, quando houver largura suficiente, manter **Nome do Serviço**, **Preço** e **Duração** lado a lado, seguindo o mesmo layout utilizado no Web.

    - Em celulares, priorizar legibilidade e espaço para toque em vez de forçar os três campos na mesma linha.

---

## Tela de Configurar Perfil - Passo 4 de 6

Nesta tela, a profissional define onde atende.

Opções:

- **Salão**.
- **Domicílio**.
- **Ambos**.

### Se selecionar Salão

Exibir:

- CEP.
- Rua/Logradouro.
- Número.
- Complemento, opcional.
- Bairro.
- Cidade.
- Estado.

### Se selecionar Domicílio

Exibir:

- Taxa de deslocamento, opcional.
- Regiões/Bairros atendidos, opcional.

### Se selecionar Ambos

Exibir os campos de endereço do salão e os campos de atendimento domiciliar.

- **Dados usados:**
  - **Tabela `tenants`:**
    - `tipoAtendimento` - `salao`, `domiciliar` ou `ambos`.
    - `enderecoSalao` - JSON contendo os dados do endereço do salão quando aplicável.
    - `taxaDeslocamentoPadrao` - valor opcional informado para atendimento domiciliar.
    - `regioesAtendidas` - texto opcional com bairros/regiões atendidas.

- **Mensagens de erros e validações:**
  - **Tipo de atendimento não selecionado:** **"Selecione o tipo de atendimento."**
  - Ao selecionar **Salão** ou **Ambos**, o endereço do salão deve ser preenchido.
  - Aplicar máscara de CEP: `00000-000`.
  - Consultar o CEP em API de endereço e preencher automaticamente rua, bairro, cidade e estado quando houver retorno.
  - **CEP não encontrado:** **"CEP não encontrado. Verifique o número ou preencha o endereço manualmente."**
  - **Falha ao consultar CEP:** **"Não foi possível consultar o CEP agora. Preencha o endereço manualmente."**
  - Campo **Número** deve aceitar números e, se desejado pelo projeto, identificadores como `S/N`; não permitir conteúdo aleatório.
  - **Taxa de deslocamento:** aceitar somente valor monetário igual ou maior que zero.
  - Aplicar máscara de moeda: `R$ 0,00`.
  - Ao selecionar somente **Salão**, `taxaDeslocamentoPadrao` e `regioesAtendidas` podem permanecer `NULL`.
  - Ao selecionar somente **Domicílio**, `enderecoSalao` pode permanecer `NULL`.
  - Manter temporariamente o estado no `localStorage` durante o cadastro.


### Validações e Erros Complementares do Passo 4

Além das regras globais de validação do sistema, aplicar as seguintes validações específicas à configuração do local de atendimento.

### Tipo de Atendimento

Sempre deve existir uma modalidade válida selecionada.

As únicas opções permitidas são:

- `salao`;
- `domiciliar`;
- `ambos`.

Caso nenhuma opção esteja selecionada:

**"Selecione onde você realiza seus atendimentos."**

O backend deve rejeitar qualquer valor diferente das modalidades permitidas.

### Atendimento em Salão

Quando a profissional selecionar:

- **Salão**;

ou:

- **Ambos**;

o endereço do estabelecimento deve ser preenchido corretamente.

Os seguintes campos são obrigatórios:

- CEP;
- Rua / Logradouro;
- Número;
- Bairro;
- Cidade;
- Estado / UF.

O campo **Complemento** permanece opcional.

### CEP

O CEP deve:

- aceitar somente números;
- possuir exatamente 8 dígitos;
- utilizar máscara visual `00000-000`;
- ser validado antes de iniciar consulta à API.

Não realizar requisição à API enquanto o CEP estiver incompleto.

- **CEP vazio:**

  **"Informe o CEP do estabelecimento."**

- **CEP incompleto ou inválido:**

  **"Informe um CEP válido com 8 dígitos."**

- **CEP não encontrado:**

  **"CEP não encontrado. Verifique o número ou preencha o endereço manualmente."**

- **Falha de conexão com a API de CEP:**

  **"Não foi possível consultar o CEP agora. Preencha o endereço manualmente."**

Uma falha na API de CEP não deve impedir a profissional de preencher o endereço manualmente.

### Consulta de CEP

Durante a consulta:

- desabilitar temporariamente o botão **Buscar CEP**;

- impedir múltiplas consultas simultâneas;

- exibir:

  **"Buscando..."**

- não apagar os campos já preenchidos enquanto a consulta estiver em andamento;

- não limpar o CEP informado em caso de erro.

Caso a API retorne dados válidos:

- preencher Rua / Logradouro;
- preencher Bairro;
- preencher Cidade;
- selecionar automaticamente a UF correspondente.

Os dados retornados pela API devem ser tratados como auxílio de preenchimento.

A profissional deve poder corrigir manualmente os campos quando necessário.

### Rua / Logradouro

Quando atendimento em salão estiver ativo, o campo é obrigatório.

- **Campo vazio:**

  **"Informe o logradouro do estabelecimento."**

- Não aceitar conteúdo formado somente por espaços.

### Número

O número é obrigatório quando houver atendimento em salão.

Aceitar:

- números;
- complementos simples necessários ao endereço;
- `S/N`, quando o estabelecimento não possuir número.

Não aceitar conteúdo aleatório incompatível com endereço.

- **Campo vazio:**

  **"Informe o número do endereço ou utilize S/N."**

- **Valor inválido:**

  **"Informe um número de endereço válido."**

### Complemento

O complemento é opcional.

Pode receber informações como:

- apartamento;
- sala;
- bloco;
- fundos;
- casa;
- ponto complementar do endereço.

Caso seja preenchido:

- aplicar as regras globais de campos de texto;
- remover espaços desnecessários;
- respeitar o limite definido pelo sistema.

Um complemento vazio não deve impedir o avanço.

### Bairro

Quando houver atendimento em salão, o bairro é obrigatório.

- **Campo vazio:**

  **"Informe o bairro do estabelecimento."**

- Não aceitar somente espaços ou conteúdo vazio.

### Cidade

Quando houver atendimento em salão, a cidade é obrigatória.

- **Campo vazio:**

  **"Informe a cidade do estabelecimento."**

- Não aceitar somente espaços.

### Estado / UF

A UF deve ser selecionada por meio de `select`.

Não permitir texto livre.

Aceitar somente uma das unidades federativas brasileiras disponíveis no sistema.

- **Nenhuma UF selecionada:**

  **"Selecione o estado."**

O backend deve rejeitar siglas inexistentes ou valores manipulados manualmente.

### Atendimento Domiciliar

Quando a profissional selecionar:

- **Domicílio**;

ou:

- **Ambos**;

exibir as configurações específicas de atendimento domiciliar.

Os campos:

- **Taxa de deslocamento**;
- **Regiões/Bairros atendidos**;

continuam opcionais, conforme o escopo atual.

### Taxa de Deslocamento

A taxa é opcional.

Caso permaneça vazia:

- considerar que não existe taxa adicional configurada;
- permitir `NULL` ou comportamento equivalente definido pelo backend.

Caso seja preenchida:

- aceitar somente valor monetário válido;
- aceitar valor igual ou maior que zero;
- rejeitar letras;
- rejeitar valor negativo;
- rejeitar `NaN`;
- rejeitar valor infinito.

- **Valor inválido:**

  **"Informe uma taxa de deslocamento válida."**

- **Valor negativo:**

  **"A taxa de deslocamento não pode ser negativa."**

Aplicar máscara monetária:

`20` → `R$ 20,00`

### Regiões / Bairros Atendidos

O campo permanece opcional.

Caso seja preenchido:

- aplicar regras globais de texto;
- remover espaços desnecessários;
- respeitar o limite do sistema;
- não aceitar somente espaços.

Essa informação será utilizada para orientar a cliente sobre as áreas em que a profissional oferece atendimento domiciliar.

### Alteração da Modalidade

Ao alterar a modalidade, a interface deve atualizar imediatamente os campos exibidos.

#### Salão → Domicílio

- ocultar os campos de endereço do salão;

- não exigir os campos de endereço para concluir enquanto a modalidade permanecer somente `domiciliar`;

- não utilizar `enderecoSalao` no agendamento domiciliar.

#### Domicílio → Salão

- ocultar configurações exclusivas do atendimento domiciliar;

- exigir endereço completo do estabelecimento;

- `taxaDeslocamentoPadrao` e `regioesAtendidas` podem permanecer `NULL`.

#### Ambos

- manter visíveis:
  - endereço do salão;
  - configurações de atendimento domiciliar.

- exigir o endereço do salão;

- manter taxa e regiões domiciliares opcionais.

Campos ocultos por causa da modalidade atual não devem gerar erros indevidos.

### Dados Preenchidos ao Trocar de Modalidade

Caso a profissional altere temporariamente a modalidade durante o onboarding:

- não apagar imediatamente dados já preenchidos sem necessidade;

- os dados ocultos podem permanecer temporariamente no estado da tela durante a edição;

- somente os dados compatíveis com a configuração final devem ser considerados no salvamento.

Não permitir que valores antigos e incompatíveis interfiram na validação da modalidade selecionada.

### Endereço Retornado pela API

O sistema não deve confiar que todos os campos retornados pela API de CEP estarão preenchidos.

Exemplo:

A API pode retornar:

- CEP;
- cidade;
- UF;

mas não retornar:

- rua;
- bairro.

Nesse caso:

- preencher somente os dados recebidos;
- manter os demais campos disponíveis para preenchimento manual;
- aplicar normalmente as validações obrigatórias antes de salvar.

### Falha ao Carregar Configurações Existentes

Caso a etapa seja aberta para continuação e os dados anteriores não possam ser carregados:

Exibir:

**"Não foi possível carregar suas configurações de atendimento. Tente novamente."**

Disponibilizar:

**Tentar novamente**

Não apresentar campos vazios como se significassem que a profissional nunca os havia preenchido enquanto o sistema ainda não souber se ocorreu uma falha de carregamento.

### Salvamento do Passo 4

Ao clicar em **Próximo Passo**:

1. validar a modalidade selecionada;

2. verificar quais campos são obrigatórios para aquela modalidade;

3. validar o endereço do salão quando aplicável;

4. validar a taxa de deslocamento quando preenchida;

5. validar regiões/bairros quando preenchidos;

6. verificar se existe alguma consulta ou operação ainda sendo processada;

7. rolar/focar automaticamente no primeiro campo inválido;

8. somente iniciar o salvamento quando todos os dados obrigatórios estiverem válidos.

Durante o salvamento:

- desabilitar **Próximo Passo**;

- impedir múltiplos envios;

- exibir estado de carregamento:

  **"Salvando..."**

### Erro de Conexão ao Salvar

Exibir:

**"Não foi possível salvar seu local de atendimento. Verifique sua conexão e tente novamente."**

### Erro Interno ao Salvar

Exibir:

**"Não foi possível salvar seu local de atendimento agora. Tente novamente em alguns instantes."**

Em qualquer falha:

- não apagar a modalidade escolhida;

- não apagar o endereço preenchido;

- não apagar taxa ou regiões informadas;

- restaurar o botão **Próximo Passo**;

- permitir nova tentativa;

- não avançar para o Passo 5.

Somente após confirmação de sucesso pelo backend:

- considerar o Passo 4 concluído;

- avançar para **Passo 5 de 6**.


- **Ajustes a serem feitos nas telas atuais:**

  - **Modo Web:**
    - Manter o design atual da tela, pois a distribuição dos campos, cards de modalidade e área de endereço está adequada.
    - Remover o aviso informando que o modo de teste está ativo.

    - Alterar o campo **UF** para um `select`, em vez de permitir digitação manual.
    - O `select` de UF deve conter todas as unidades federativas brasileiras utilizando suas respectivas siglas, por exemplo: **SP, RJ, MG, PR, SC**, etc.
    - Quando o endereço for encontrado através da busca por CEP, selecionar automaticamente no `select` a UF correspondente.
    - A profissional ainda deve poder alterar manualmente a UF através do `select`, caso necessário.

    - Ao clicar no botão **Buscar CEP**, exibir imediatamente um estado visual de carregamento para indicar que a consulta está sendo realizada.
    - Durante a consulta, substituir temporariamente o conteúdo do botão por um indicador de carregamento acompanhado do texto **"Buscando..."**.
    - Exemplo visual:

      `Buscar CEP` → `◌ Buscando...`

    - O indicador de carregamento deve possuir uma animação simples de rotação.
    - Enquanto a consulta estiver em andamento, manter o botão **Buscar CEP** desabilitado para impedir múltiplas requisições simultâneas.
    - Não limpar os campos de endereço enquanto a busca estiver sendo realizada.
    - Quando o CEP for encontrado, preencher automaticamente os dados retornados, como **Rua / Logradouro, Bairro, Cidade e UF**.
    - Após a conclusão da busca, remover o estado de carregamento e restaurar o botão para **Buscar CEP**.
    - Caso o CEP não seja encontrado, exibir a mensagem de erro diretamente abaixo do campo de CEP, por exemplo:
      **"CEP não encontrado. Verifique o número informado."**
    - Caso ocorra uma falha na consulta, exibir:
      **"Não foi possível consultar o CEP. Tente novamente."**
    - Em caso de erro, restaurar normalmente o botão **Buscar CEP** para permitir uma nova tentativa.

  - **Modo Mobile:**
    - Remover o aviso informando que o modo de teste está ativo.

    - Manter a mesma identidade visual e hierarquia da versão Web, evitando transformar todos os campos obrigatoriamente em uma única coluna quando houver espaço suficiente.

    - Manter os cards **Salão**, **Domicílio** e **Ambos** empilhados em celulares pequenos, ocupando `100%` da largura disponível.

    - Preservar o destaque visual da modalidade selecionada, utilizando a mesma borda e cor de destaque da versão Web.

    - Manter a seção **Endereço do salão** em um card separado, seguindo o mesmo padrão visual utilizado no Web.

    - Adaptar a distribuição dos campos conforme a largura disponível:
      - em celulares pequenos, permitir que os campos sejam exibidos em uma única coluna;
      - em celulares maiores, manter campos relacionados lado a lado sempre que houver espaço suficiente.

    - Sempre que houver largura suficiente, manter **CEP** e o botão **Buscar CEP** na mesma linha.
    - Em celulares menores, permitir que o botão **Buscar CEP** fique abaixo do campo e ocupe `100%` da largura disponível.

    - Ao tocar em **Buscar CEP**, aplicar o mesmo estado de carregamento utilizado no Web:
      - exibir indicador animado;
      - alterar o texto para **"Buscando..."**;
      - desabilitar temporariamente o botão;
      - impedir consultas duplicadas;
      - restaurar o botão após sucesso ou erro.

    - Sempre que possível, manter **Rua / Logradouro** e **Número** na mesma linha, utilizando maior largura para o campo de rua e menor largura para o campo de número.

    - Alterar o campo **UF** para um `select` também no Mobile.
    - O `select` deve apresentar as siglas das unidades federativas brasileiras e possuir área de toque confortável.
    - Quando o CEP for encontrado, selecionar automaticamente a UF correspondente.

    - Manter **Cidade** e **UF** lado a lado quando houver largura suficiente.
    - Em celulares pequenos, caso os campos fiquem comprimidos, permitir que sejam empilhados automaticamente.

    - Garantir que nenhum campo, botão ou card ultrapasse a largura da tela ou gere rolagem horizontal.

    - Manter campos e botões com altura confortável para interação por toque, aproximadamente entre `48px` e `52px`.

    - Garantir que mensagens de validação e erros da consulta de CEP sejam exibidos integralmente abaixo de seus respectivos campos.

    - Em celulares pequenos, exibir o botão **Voltar** acima e o botão **Próximo Passo** abaixo, permitindo que o botão principal ocupe toda a largura disponível.

    - Em celulares maiores e tablets, permitir que os botões **Voltar** e **Próximo Passo** permaneçam lado a lado, seguindo o mesmo conceito visual do Web.

    - Permitir rolagem vertical normal quando o conteúdo ultrapassar a altura disponível e respeitar a `safe area` inferior.

    - No modo mobile para tablets e iPads, manter uma distribuição ainda mais próxima da versão Web, aproveitando a largura disponível para exibir mais campos lado a lado.

---

## Tela de Configurar Perfil - Passo 5 de 6

Nesta tela, a profissional configura como funcionará a cobrança antecipada de sinal.

A tela será dividida em duas categorias:

- **Pagamento e Sinal - Mercado Pago**.
- **Política de Cancelamento**.

### Pagamento e Sinal - Mercado Pago

Adicionar o toggle:

- **Exigir sinal antecipado**.

Subtexto:

> Ao ativar, a cliente só terá o horário reservado definitivamente após a confirmação do pagamento do sinal pelo Mercado Pago.

#### Switch desativado - padrão

- Nenhum sinal antecipado é cobrado.
- Os campos de valor do sinal ficam ocultos.
- A conexão com Mercado Pago não é obrigatória.
- `modeloCobrancaSinal = sem_sinal_presencial`.
- `tipoValorSinal = NULL`.
- `valorSinal = NULL`.

#### Switch ativado

- Mostrar configuração do valor do sinal.
- `modeloCobrancaSinal = sinal_antecipado`.
- Exigir uma conta Mercado Pago conectada antes de concluir a etapa.

> O banco também possui o valor `pagamento_integral_antecipado` em `modeloCobrancaSinal`, mas essa opção ainda não faz parte desta tela do MVP.

### Configuração do Valor do Sinal

Campo **Como você prefere calcular o sinal?** com as opções:

- **Valor Fixo**.
- **Porcentagem**.

#### Valor Fixo

Exibir **Valor do Sinal Fixo (R$)**.

Exemplo:

- Valor do agendamento: R$ 100,00.
- Sinal fixo: R$ 15,00.
- Restante no atendimento: R$ 85,00.

#### Porcentagem

Exibir **Porcentagem do Serviço (%)**.

A porcentagem é calculada sobre o **valor total do agendamento**, incluindo todos os serviços selecionados.

Exemplo:

- Serviço 1: R$ 60,00.
- Serviço 2: R$ 40,00.
- Total: R$ 100,00.
- Sinal: 30%.
- Sinal antecipado: R$ 30,00.
- Restante no atendimento: R$ 70,00.

### Recebimento dos Pagamentos - Mercado Pago

Se a cobrança de sinal estiver ativada, exibir:

- Título: **Recebimento dos Pagamentos**.
- Texto: **"Conecte sua conta Mercado Pago para receber os pagamentos antecipados realizados pelas suas clientes."**

> **Sobre as tarifas:** O Beleza em Dia não cobra comissão sobre os pagamentos no MVP atual. O Mercado Pago pode aplicar suas próprias tarifas, conforme as condições da conta da profissional, o meio de pagamento utilizado, o prazo de recebimento e outras condições comerciais definidas pelo próprio Mercado Pago.

- Botão: **Conectar Mercado Pago**.

A profissional **não informa Chave Pix manualmente no Beleza em Dia**.

Ao clicar em **Conectar Mercado Pago**:

1. O Beleza em Dia inicia a conexão OAuth.
2. A profissional é redirecionada para o ambiente oficial do Mercado Pago.
3. Faz login, se necessário.
4. Autoriza o Beleza em Dia.
5. O Mercado Pago redireciona de volta para o Beleza em Dia.
6. O backend recebe o código temporário de autorização.
7. O backend troca esse código pelas credenciais OAuth da profissional.
8. Os tokens são protegidos/criptografados antes de serem gravados.
9. A integração é vinculada ao `tenantId` da profissional.
10. A profissional volta ao Passo 5 com os demais campos preservados.

Durante o retorno, exibir:

**"Finalizando conexão com o Mercado Pago..."**

Após sucesso, mostrar:

- **✓ Mercado Pago conectado**.
- **"Sua conta está pronta para receber pagamentos antecipados das suas clientes."**
- Aviso informativo: **"Os valores recebidos podem sofrer descontos de tarifas aplicadas pelo Mercado Pago conforme as condições da sua conta. O Beleza em Dia não cobra comissão sobre os pagamentos no MVP atual."**
- Botão **Desconectar Mercado Pago**.

### Comissão do Beleza em Dia

No MVP atual, o Beleza em Dia **não cobra comissão** sobre pagamentos processados pelo Mercado Pago.

Portanto:

- a comissão da plataforma é de **0%**;
- o Beleza em Dia não retém parte do sinal pago pela cliente;
- eventuais tarifas do Mercado Pago são cobradas pelo próprio provedor conforme as condições aplicáveis à conta da profissional;
- o sistema não deve assumir nem calcular manualmente uma porcentagem fixa de tarifa do Mercado Pago;
- o valor exibido como tarifa do provedor, quando essa informação estiver disponível futuramente no Financeiro, deve vir de dados confiáveis do próprio Mercado Pago e não de uma constante fixa criada pelo Beleza em Dia;
- a arquitetura de pagamentos pode permanecer preparada para futura monetização por transação, mas **nenhum valor positivo de comissão da plataforma deve ser aplicado no MVP atual**;
- caso seja criada comissão futuramente, ela deve ser informada previamente à profissional, refletida nos Termos/regras comerciais aplicáveis e implementada no Checkout Pro de acordo com os recursos oficiais do Mercado Pago.

Se futuramente existir comissão percentual, ela será calculada somente sobre o valor efetivamente processado online pelo Mercado Pago. Valores pagos presencialmente fora do Mercado Pago não entram automaticamente nesse cálculo.

### Desconectar Mercado Pago

Ao clicar, exibir confirmação:

**"Deseja desconectar sua conta Mercado Pago?"**

Subtexto:

**"Enquanto a conta estiver desconectada, não será possível receber novos pagamentos antecipados pelo Beleza em Dia."**

Botões:

- Cancelar.
- Desconectar.

Ao confirmar, `conectado` passa para `FALSE`.

Desativar o sinal **não desconecta automaticamente** o Mercado Pago. A integração pode permanecer pronta para uso futuro.

### Política de Cancelamento

No MVP, o **prazo de cancelamento sem perda do sinal é fixo em 24 horas**.

Não exibir seletor com outros prazos nesta etapa enquanto essa regra permanecer fixa.

O backend deve utilizar:

`prazoCancelamentoSemPerdaHoras = 24`

Texto explicativo:

**"Para manter o direito à devolução do sinal pago, o cancelamento deve ocorrer com pelo menos 24 horas de antecedência."**

### Regra de Reembolso

Exibir a regra fixa de 24 horas:

> **Regra de Reembolso:** Se a **cliente** cancelar com pelo menos 24 horas de antecedência, mantém o direito ao reembolso integral do sinal efetivamente pago. Se a cliente cancelar com menos de 24 horas, não existe reembolso automático do sinal. Se a **profissional** cancelar um agendamento que possui sinal pago, o reembolso integral deve ser solicitado independentemente da antecedência. Quando não houve pagamento, não existe operação de reembolso. O tratamento formal de não comparecimento (`No-Show`) fica fora do MVP atual e não deve criar um novo status de agendamento nesta versão.

O reembolso somente se aplica a pagamentos realmente processados pelo Mercado Pago e deve usar o `paymentId` do agendamento para localizar a transação.

No MVP, somente reembolso **integral** do sinal é suportado. Reembolso parcial fica fora do escopo atual.

A interface nunca deve informar que o reembolso foi concluído antes da confirmação do backend/Mercado Pago.

O valor solicitado no reembolso integral deve corresponder ao valor efetivamente pago pela cliente, e não ao valor líquido recebido pela profissional depois das tarifas do Mercado Pago. O Beleza em Dia não deve recalcular manualmente as tarifas do provedor.

- **Dados usados:**
  - **Tabela `tenants`:**
    - `id` - identifica o estabelecimento e será usado na integração Mercado Pago.
    - `modeloCobrancaSinal` - `sem_sinal_presencial` ou `sinal_antecipado` nesta tela.
    - `tipoValorSinal` - `fixo` ou `porcentagem`.
    - `valorSinal` - valor fixo ou percentual escolhido.
    - `prazoCancelamentoSemPerdaHoras` - regra fixa de 24 horas no MVP.
  - **Tabela `tenant_mercadopago`:**
    - `id` - gerado pelo backend.
    - `tenantId` - recebe o `id` do estabelecimento.
    - `mercadoPagoUserId` - retornado pelo Mercado Pago.
    - `accessTokenCriptografado` - Access Token protegido pelo backend antes de salvar.
    - `refreshTokenCriptografado` - Refresh Token protegido pelo backend antes de salvar, quando fornecido.
    - `tokenExpiraEm` - calculado pelo backend com base na validade retornada pelo Mercado Pago.
    - `conectado` - `TRUE` quando a integração está ativa e `FALSE` quando desconectada/inválida.
    - `conectadoEm` - gerado na conexão inicial.
    - `atualizadoEm` - atualizado automaticamente quando a integração muda ou é renovada.
  - O código temporário retornado pelo OAuth é usado somente durante a conexão e não deve ser salvo como dado permanente.
  - O campo `chavePix` **não existe mais no banco atual e não deve aparecer na interface**.

- **Mensagens de erros e validações:**
  - **Sinal ativado sem tipo selecionado:** **"Selecione como você prefere calcular o valor do sinal."**
  - **Valor fixo vazio:** **"Informe o valor fixo em reais (R$) para o sinal."**
  - **Valor fixo igual ou menor que zero:** **"O valor do sinal deve ser maior que R$ 0,00."**
  - Aplicar máscara monetária: `15` → `R$ 15,00`.
  - O sinal fixo nunca pode gerar uma cobrança maior que o valor total do agendamento.
  - **Porcentagem vazia:** **"Informe a porcentagem do serviço cobrada como sinal."**
  - Aceitar somente números de 1 a 100.
  - **Porcentagem inválida:** **"A porcentagem cobrada deve estar entre 1% e 100%."**
  - Exibir `%` junto ao valor.
  - **Mercado Pago não conectado com sinal ativo:** **"Conecte sua conta Mercado Pago para receber pagamentos antecipados."**
  - **Conexão concluída:** Toast **"Conta Mercado Pago conectada com sucesso!"**
  - **Falha ao iniciar:** **"Não foi possível iniciar a conexão com o Mercado Pago. Tente novamente."**
  - **Autorização cancelada:** **"A conexão com o Mercado Pago não foi concluída."**
  - **Retorno OAuth inválido/expirado:** **"Não foi possível validar a conexão com o Mercado Pago. Tente conectar novamente."**
  - **Erro ao salvar integração:** **"Sua conta foi autorizada, mas não foi possível concluir a conexão. Tente novamente."**
  - **Não foi possível renovar credenciais:** definir `conectado = FALSE` e exibir **"Sua conexão com o Mercado Pago expirou. Conecte sua conta novamente."**
  - **Desconexão:** sempre pedir confirmação.
  - **Desconexão concluída:** Toast **"Conta Mercado Pago desconectada."**
  - **Erro ao desconectar:** **"Não foi possível desconectar sua conta Mercado Pago. Tente novamente."**
  - **Salvamento concluído:** avançar para o Passo 6.
  - **Erro ao salvar:** **"Não foi possível salvar suas configurações de pagamento. Tente novamente."**
  - Campos comuns podem permanecer temporariamente no `localStorage` durante o cadastro: toggle, tipo do sinal e valor. O prazo de cancelamento é fixo em 24 horas no MVP.
  - **Nunca salvar no `localStorage`:** Access Token, Refresh Token, código OAuth ou qualquer credencial privada.
  - O status real da conexão deve vir do backend/tabela `tenant_mercadopago`.

### Validações e Erros Complementares do Passo 5

Além das regras globais de validação do sistema, aplicar as seguintes validações específicas à configuração de pagamento, sinal antecipado e integração Mercado Pago.

### Sinal Desativado

Quando **Exigir sinal antecipado** estiver desativado:

- `modeloCobrancaSinal = sem_sinal_presencial`;

- `tipoValorSinal = NULL`;

- `valorSinal = NULL`;

- não exigir conexão com Mercado Pago;

- ocultar os campos de configuração do sinal;

- ocultar a área de conexão obrigatória com Mercado Pago;

- não validar campos de valor ou porcentagem que estejam ocultos;

- não impedir o avanço apenas porque não existe uma conta Mercado Pago conectada.

Desativar o sinal não deve desconectar automaticamente uma conta Mercado Pago que já tenha sido conectada anteriormente.

### Sinal Ativado

Quando **Exigir sinal antecipado** estiver ativado:

- `modeloCobrancaSinal = sinal_antecipado`;

- exigir uma forma válida de cálculo do sinal;

- exigir valor válido;

- exigir integração Mercado Pago conectada antes de concluir a etapa.

Caso o sinal esteja ativo e nenhum tipo tenha sido selecionado:

**"Selecione como você prefere calcular o valor do sinal."**

### Valor Fixo

Quando `tipoValorSinal = fixo`:

- o campo de valor é obrigatório;

- aceitar somente valor monetário maior que zero;

- rejeitar:
  - letras;
  - texto arbitrário;
  - zero;
  - valores negativos;
  - `NaN`;
  - valores infinitos;
  - formatos monetários inválidos.

- **Campo vazio:**

  **"Informe o valor fixo em reais (R$) para o sinal."**

- **Formato inválido:**

  **"Informe um valor válido para o sinal."**

- **Valor igual ou menor que zero:**

  **"O valor do sinal deve ser maior que R$ 0,00."**

Aplicar máscara monetária:

`15` → `R$ 15,00`

### Sinal Fixo Maior que o Valor do Agendamento

Como o valor fixo é configurado antes de existir um agendamento específico, a validação definitiva deve acontecer também no momento da criação da reserva.

O sistema nunca deve criar uma cobrança de sinal maior que o valor total do agendamento.

Regra:

`valorSinalCobrado = menor valor entre o sinal fixo configurado e o valor total do agendamento`

Exemplo:

- sinal configurado: `R$ 50,00`;
- valor total dos serviços: `R$ 35,00`.

Resultado:

- sinal cobrado: `R$ 35,00`;
- valor restante: `R$ 0,00`.

Nunca gerar:

- sinal de `R$ 50,00`;
- para um agendamento de `R$ 35,00`.

O cálculo final deve ocorrer no backend.

### Porcentagem

Quando `tipoValorSinal = porcentagem`:

- o campo é obrigatório;

- aceitar somente valores entre `1` e `100`;

- rejeitar:
  - letras;
  - texto;
  - zero;
  - valores negativos;
  - valores maiores que 100;
  - `NaN`;
  - valores infinitos.

- **Campo vazio:**

  **"Informe a porcentagem do serviço cobrada como sinal."**

- **Formato inválido:**

  **"Informe uma porcentagem válida."**

- **Valor fora do intervalo:**

  **"A porcentagem cobrada deve estar entre 1% e 100%."**

Exibir `%` junto ao campo.

### Cálculo da Porcentagem

A porcentagem deve ser calculada sobre o valor total da reserva.

Quando houver múltiplos serviços:

`valorTotal = soma dos preços dos serviços`

Depois:

`valorSinal = valorTotal × porcentagem / 100`

O cálculo utilizado para cobrança deve ser realizado novamente no backend.

O navegador pode apresentar uma prévia, mas não deve determinar o valor confiável da cobrança.

### Casas Decimais e Arredondamento

Valores financeiros devem utilizar duas casas decimais.

Quando um cálculo percentual produzir mais de duas casas decimais, aplicar arredondamento monetário consistente no backend.

A interface e o valor enviado ao Mercado Pago devem representar exatamente o mesmo valor final calculado.

Não permitir diferenças entre:

- valor mostrado à cliente;
- valor registrado no agendamento;
- valor enviado ao Mercado Pago.

### Alteração entre Valor Fixo e Porcentagem

Ao trocar:

- **Valor Fixo** → **Porcentagem**;

ou:

- **Porcentagem** → **Valor Fixo**;

o campo anteriormente utilizado não deve interferir na validação do novo tipo selecionado.

Somente o valor correspondente ao tipo atualmente selecionado deve ser considerado no salvamento.

Não enviar valores antigos ocultos como configuração ativa.

### Conexão com Mercado Pago

Quando o sinal estiver ativado, a etapa somente pode ser concluída se a integração do estabelecimento estiver realmente conectada.

O estado visual do botão não deve ser utilizado como fonte da verdade.

O backend deve consultar o estado real de `tenant_mercadopago`.

Somente considerar conectado quando a integração correspondente ao `tenantId` estiver válida.
### Estado - Não Conectado

Exibir:

- botão **Conectar Mercado Pago**;

- explicação de que os sinais das clientes serão recebidos pela conta conectada da profissional;

- aviso sobre tarifas:

  > **Sobre as tarifas:** O Beleza em Dia não cobra comissão sobre os pagamentos no MVP atual. O Mercado Pago pode aplicar suas próprias tarifas, conforme as condições da conta da profissional, o meio de pagamento utilizado, o prazo de recebimento e outras condições comerciais definidas pelo próprio Mercado Pago.

Ao clicar:

- desabilitar temporariamente o botão;

- impedir múltiplos cliques;

- exibir estado de carregamento:

  **"Conectando..."**

### Falha ao Iniciar OAuth

Caso o Beleza em Dia não consiga iniciar o processo:

**"Não foi possível iniciar a conexão com o Mercado Pago. Tente novamente."**

Restaurar o botão **Conectar Mercado Pago**.

### Autorização Cancelada

Caso a profissional saia ou cancele a autorização no ambiente do Mercado Pago:

**"A conexão com o Mercado Pago não foi concluída."**

Não marcar a integração como conectada.

Manter os demais dados do Passo 5 preenchidos.

### Retorno OAuth Inválido

O backend deve validar o retorno recebido do Mercado Pago.

Não confiar apenas nos parâmetros presentes na URL.

Caso o retorno seja inválido, expirado ou não possa ser verificado:

**"Não foi possível validar a conexão com o Mercado Pago. Tente conectar novamente."**

Não considerar a integração ativa.

### Estado Durante o Retorno do OAuth

Enquanto o backend estiver finalizando a conexão, exibir uma tela/estado de carregamento com a identidade visual do Beleza em Dia.

Mensagem:

**"Finalizando conexão com o Mercado Pago..."**

Durante esse processamento:

- não permitir novos cliques de conexão;

- não mostrar a conta como conectada antes da confirmação do backend;

- manter os demais campos do Passo 5 preservados.

### Erro ao Salvar a Integração

Caso a autorização no Mercado Pago tenha ocorrido, mas o Beleza em Dia não consiga persistir corretamente a integração:

**"Sua conta foi autorizada, mas não foi possível concluir a conexão. Tente novamente."**

Não apresentar:

**"Mercado Pago conectado"**

enquanto a integração não estiver registrada corretamente.

### Integração Conectada

Depois da confirmação do backend, exibir:

**"✓ Mercado Pago conectado"**

Subtexto:

**"Sua conta está pronta para receber pagamentos antecipados das suas clientes."**

Exibir também o aviso resumido:

**"Os valores recebidos podem sofrer descontos de tarifas aplicadas pelo Mercado Pago conforme as condições da sua conta. O Beleza em Dia não cobra comissão sobre os pagamentos no MVP atual."**

Disponibilizar:

**Desconectar Mercado Pago**

### Credenciais Expiradas

O backend deve tentar renovar as credenciais quando o Mercado Pago permitir renovação por `refreshToken`.

Se a renovação não puder ser concluída:

- definir a integração como indisponível/conexão inválida quando aplicável;

- não tentar criar novas cobranças com credenciais inválidas;

- exibir:

  **"Sua conexão com o Mercado Pago expirou. Conecte sua conta novamente."**

Disponibilizar:

**Conectar novamente**

### Credenciais e Dados Privados

Nunca enviar para o navegador:

- Access Token;
- Refresh Token;
- Client Secret;
- credenciais privadas;
- códigos internos de autenticação;
- demais segredos da integração.

Nunca armazenar esses dados no `localStorage`.

Tokens devem permanecer protegidos no backend.

O frontend deve receber somente informações necessárias para representar o estado da integração, por exemplo:

- conectado;
- desconectado;
- conexão expirada.

### Conta Mercado Pago por Estabelecimento

Cada `tenant` deve utilizar exclusivamente a própria integração Mercado Pago.

Uma profissional não pode utilizar, visualizar ou modificar credenciais vinculadas a outro estabelecimento.

A integração utilizada deve ser determinada pelo `tenantId` autorizado no backend.

Não confiar em um `tenantId` enviado pelo navegador para escolher a conta que receberá o pagamento.

### Desconectar Mercado Pago

Ao clicar em **Desconectar Mercado Pago**, sempre solicitar confirmação.

Exibir:

**"Deseja desconectar sua conta Mercado Pago?"**

Subtexto:

**"Enquanto a conta estiver desconectada, não será possível receber novos pagamentos antecipados pelo Beleza em Dia."**

Botões:

- **Cancelar**;
- **Desconectar**.

Ao confirmar:

- desabilitar os botões durante a operação;

- exibir estado de carregamento;

- impedir múltiplas solicitações.

Somente mostrar a conta como desconectada depois da confirmação do backend.

### Falha ao Desconectar

Exibir:

**"Não foi possível desconectar sua conta Mercado Pago. Tente novamente."**

Em caso de falha:

- manter o estado anterior da integração;

- restaurar os botões;

- não informar que a conta foi desconectada.

### Política de Cancelamento

No MVP, não existe seleção de prazo. A política é fixa em **24 horas** para cancelamento sem perda do sinal.

O backend deve aplicar `prazoCancelamentoSemPerdaHoras = 24` e rejeitar alteração arbitrária desse valor enquanto a regra permanecer fixa.

### Regra de Cancelamento e Sinal Pago

O prazo deve ser comparado com a data/hora do atendimento.

Exemplo com prazo de 24 horas:

- cancelamento com 30 horas de antecedência:
  - está dentro do prazo para manter o direito à devolução;

- cancelamento com 5 horas de antecedência:
  - está fora do prazo definido.

A interface deve explicar a situação à profissional antes de concluir o cancelamento quando houver um sinal pago.

### Reembolso

#### Regras de Origem do Cancelamento

- **Cancelamento pela cliente com 24 horas ou mais:** se houver sinal pago, solicitar reembolso integral.
- **Cancelamento pela cliente com menos de 24 horas:** cancelar o agendamento sem reembolso automático do sinal.
- **Cancelamento pela profissional:** se houver sinal pago, solicitar reembolso integral independentemente da antecedência.
- **Sem sinal pago:** não criar operação de reembolso.

O backend deve salvar `canceladoPor = cliente`, `profissional` ou `sistema` conforme a origem real da ação e registrar `canceladoEm`.

#### Valor do Reembolso

No reembolso integral, utilizar como referência o valor efetivamente pago pela cliente. Não utilizar o valor líquido que chegou à conta da profissional após as tarifas do Mercado Pago.

Exemplo conceitual:

- cliente pagou: `R$ 30,00`;
- a profissional recebeu valor líquido inferior por causa de tarifa do provedor;
- reembolso total solicitado ao Mercado Pago: `R$ 30,00`.

O Beleza em Dia não calcula nem devolve manualmente a tarifa do Mercado Pago. O resultado deve seguir a confirmação da API do provedor.

#### Estados e Idempotência

O reembolso deve utilizar os estados:

- `pendente`;
- `processando`;
- `concluido`;
- `falhou`.

A criação do reembolso deve utilizar uma chave de idempotência (`X-Idempotency-Key`) gerada pelo backend e persistida como `reembolsoIdempotencyKey` para a operação lógica, impedindo que repetição de clique, timeout ou retry gere duas devoluções.

No MVP, não implementar reembolso parcial.

#### Saldo Insuficiente ou Reembolso Rejeitado

Se o Mercado Pago rejeitar a operação, inclusive por falta de saldo disponível na conta da profissional quando essa condição for exigida pelo provedor:

- definir `reembolsoStatus = falhou`;
- manter `valorSinalPago` original;
- não marcar o reembolso como concluído;
- manter a pendência visível para a profissional;
- permitir nova tentativa segura conforme o estado real do pagamento e as regras do Mercado Pago.

Mensagem para a profissional:

**"Não foi possível concluir o reembolso pelo Mercado Pago. Verifique sua conta e tente novamente."**

Enquanto existir reembolso `pendente`, `processando` ou `falhou` ainda não resolvido, a profissional não pode excluir a conta.

O sistema nunca deve considerar um reembolso concluído apenas porque a profissional solicitou o cancelamento.

Quando houver direito a reembolso e o sistema executar ou solicitar a devolução através do Mercado Pago:

1. localizar o pagamento utilizando `appointments.paymentId`;

2. solicitar a operação pelo backend;

3. aguardar resposta do Mercado Pago;

4. somente informar sucesso após confirmação da operação.

Durante o processo, utilizar um estado como:

**"Processando reembolso..."**

Caso o reembolso seja confirmado:

**"Reembolso realizado com sucesso."**

Caso a operação falhe:

**"Não foi possível realizar o reembolso automaticamente. Verifique o pagamento antes de tentar novamente."**

A falha no reembolso não deve apagar o histórico do pagamento nem criar falsamente um novo status de pagamento.

### Persistência do Resultado do Reembolso no Convex

O resultado financeiro do reembolso não pode existir somente na interface ou na resposta momentânea do Mercado Pago. O schema oficial de `appointments` no Convex deve permitir registrar, quando aplicável:

- `valorReembolsado` - total efetivamente devolvido à cliente; na implementação Convex, armazenar valor monetário preferencialmente em centavos inteiros;
- `reembolsoStatus` - estado do processo (`pendente`, `processando`, `concluido` ou `falhou`);
- `reembolsadoEm` - timestamp da confirmação do reembolso concluído;
- `mercadoPagoRefundId` - identificador da devolução retornado pelo Mercado Pago, quando existir;
- `reembolsoSolicitadoEm` - timestamp da primeira solicitação válida de devolução;
- `reembolsoIdempotencyKey` - chave usada para repetir com segurança a mesma operação lógica sem duplicar o reembolso;
- `reembolsoFalhaCodigo` - código interno/sanitizado da última falha, quando útil para diagnóstico;
- `reembolsoFalhaMensagem` - mensagem sanitizada para registro interno, sem expor resposta bruta do provedor à usuária.

Esses campos devem ser atualizados somente pelo backend a partir de respostas confiáveis do Mercado Pago. `valorSinalPago` representa quanto foi recebido originalmente e não deve ser zerado para simular devolução. Assim o sistema consegue distinguir sinal pago e retido de sinal pago e posteriormente reembolsado.

A política completa de cancelamento de agendamentos confirmados também deve ser respeitada nas telas de Agenda/Detalhes do Agendamento quando essas telas forem documentadas.

### Falha de Comunicação com Mercado Pago

Uma falha temporária da API do Mercado Pago não significa automaticamente que:

- a conta foi desconectada;
- um pagamento falhou;
- um pagamento foi aprovado;
- um reembolso falhou definitivamente.

Quando o estado não puder ser determinado com segurança, apresentar uma mensagem temporária.

Exemplo:

**"Não foi possível consultar o Mercado Pago agora. Tente novamente em alguns instantes."**

Não inventar um estado financeiro enquanto a resposta for desconhecida.

### Dados Financeiros Confiáveis

O frontend nunca deve conseguir definir diretamente:

- valor do sinal pago;
- status de pagamento;
- `paymentId`;
- confirmação de pagamento;
- resultado de reembolso.

Esses valores devem depender do backend e, quando aplicável, da resposta validada do Mercado Pago.

### Salvamento do Passo 5

Ao clicar em **Próximo Passo**:

1. verificar se o sinal está ativo ou desativado;

2. se desativado, ignorar validações de valor do sinal e conexão obrigatória;

3. se ativo:
   - validar tipo de cálculo;
   - validar valor;
   - validar porcentagem quando aplicável;
   - verificar conexão Mercado Pago;

4. validar o prazo de cancelamento;

5. impedir avanço enquanto existir operação de conexão/desconexão em andamento;

6. focar ou rolar automaticamente até o primeiro campo inválido;

7. salvar somente após todas as validações necessárias.

Durante o salvamento:

- desabilitar **Próximo Passo**;

- impedir múltiplos envios;

- exibir:

  **"Salvando..."**

### Erro de Conexão ao Salvar

Exibir:

**"Não foi possível salvar suas configurações de pagamento. Verifique sua conexão e tente novamente."**

### Erro Interno ao Salvar

Exibir:

**"Não foi possível salvar suas configurações de pagamento agora. Tente novamente em alguns instantes."**

Em qualquer falha:

- preservar o estado do toggle;

- preservar tipo e valor do sinal;

- preservar o prazo de cancelamento;

- manter o estado real da integração Mercado Pago;

- não apagar configurações já preenchidas;

- restaurar **Próximo Passo**;

- permitir nova tentativa;

- não avançar para o Passo 6.

Somente após confirmação do backend:

- considerar o Passo 5 concluído;

- avançar para **Passo 6 de 6**.

- **Ajustes a serem feitos nas telas atuais:**
  - **Modo Web:**
    - Desenvolver a tela por completo.
    - Criar **Pagamento e Sinal - Mercado Pago**.
    - Adicionar toggle de sinal.
    - Adicionar seletor Valor Fixo / Porcentagem.
    - Aplicar máscara monetária e formatação de porcentagem.
    - Criar **Recebimento dos Pagamentos**.
    - Adicionar **Conectar Mercado Pago**.
    - Criar estado **Mercado Pago conectado** e botão **Desconectar Mercado Pago**.
    - Não criar campo de Chave Pix.
    -  retornar diretamente ao Passo 5 mantendo os campos preenchidos.
    - Remover de **Configurações / Agenda** o campo **Prazo de Cancelamento sem Perda**, pois ele pertence a esta tela.
  - **Modo Mobile:**
    - Desenvolver a tela por completo com as mesmas regras do Web.
    - Empilhar os campos verticalmente.
    - Botão **Conectar Mercado Pago** em largura disponível.
    - Card de conexão sem corte de texto ou rolagem horizontal.
    - Garantir que teclado virtual não esconda campos ou botões.
    - Utilizar teclado numérico nos campos de valor/porcentagem.
    - Manter espaço inferior para não sobrepor a bottom bar.
    - Retornar ao Passo 5 após OAuth mantendo o estado.
    - Remover **Prazo de Cancelamento sem Perda** da configuração de Agenda no mobile.

---

## Tela de Configurar Perfil - Passo 6 de 6

Nesta tela, a profissional escolhe a aparência do sistema:

- Modo Claro.
- Modo Escuro.
- Padrão do Sistema.

O padrão é **Padrão do Sistema**.

Após escolher, a profissional clica em **Concluir Configuração** e acessa a Dashboard.

- **Dados usados:** 0 dados do banco de dados atual.
  - A estrutura atual não possui campo de tema em `users` ou `tenants`.


- **Mensagens de erros e validações:**
  - Sempre manter uma opção selecionada.
  - Caso não exista preferência salva, utilizar **Padrão do Sistema**.
  - Aplicar a mudança de tema imediatamente na própria tela para pré-visualização.


### Validações e Erros Complementares do Passo 6

Além das regras globais de validação do sistema, aplicar as seguintes regras específicas à escolha de aparência e conclusão da configuração inicial.

### Aparência

Sempre deve existir exatamente uma opção de aparência selecionada.

As opções válidas são:

- **Modo Claro**;
- **Modo Escuro**;
- **Padrão do Sistema / Automático**.

Caso nenhuma preferência tenha sido escolhida anteriormente, utilizar:

**Padrão do Sistema / Automático**

como valor inicial.

O sistema não deve permitir valores diferentes das opções suportadas.

Caso um valor inválido seja recebido ou recuperado do armazenamento local:

- ignorar o valor inválido;
- utilizar **Padrão do Sistema / Automático**;
- não impedir o acesso à tela.

### Alteração do Tema

Ao selecionar uma aparência:

- aplicar a alteração imediatamente para pré-visualização;

- manter legíveis:
  - textos;
  - botões;
  - campos;
  - mensagens de erro;
  - ícones;
  - bordas;
  - cards;
  - modais;

- não exigir recarregamento da página para visualizar a mudança.

Caso seja utilizada a opção **Padrão do Sistema / Automático**:

- detectar a preferência atual do dispositivo/navegador;

- acompanhar alterações futuras da preferência do sistema enquanto essa opção permanecer selecionada.

### Falha ao Aplicar a Preferência Visual

Uma falha ao aplicar ou recuperar a preferência de aparência não deve impedir a conclusão do onboarding.

Caso a preferência salva esteja ausente, inválida ou não possa ser recuperada:

- utilizar **Padrão do Sistema / Automático** como fallback;

- permitir que a profissional continue normalmente.

Não exibir erro técnico relacionado ao armazenamento do navegador.

### Persistência da Aparência

Como a estrutura atual do banco ainda não possui campo específico para armazenar o tema em `users` ou `tenants`, a preferência visual pode permanecer armazenada localmente no navegador durante o MVP.

Não utilizar o armazenamento local da preferência de aparência como fonte de autenticação, autorização ou conclusão do onboarding.

A ausência ou alteração dessa preferência não pode permitir acesso indevido a páginas protegidas.

### Seção "Tudo pronto!"

Antes do botão **Concluir Configuração**, apresentar um resumo visual das principais etapas concluídas.

Exibir:

- **Perfil ✓**
- **Agenda ✓**
- **Serviços ✓**
- **Pagamentos ✓**

O resumo possui função visual e não deve ser a única fonte utilizada para determinar se as etapas realmente foram concluídas.

O backend deve validar o estado necessário antes de considerar a configuração inicial concluída.

### Validação Antes de Concluir

Ao clicar em **Concluir Configuração**, o sistema deve verificar se todas as etapas obrigatórias anteriores estão válidas.

Validar:

1. **Passo 1 - Perfil**
   - dados obrigatórios do perfil preenchidos;

2. **Passo 2 - Agenda**
   - configuração de disponibilidade válida;

3. **Passo 3 - Serviços**
   - pelo menos um serviço válido e ativo/configurado;

4. **Passo 4 - Local de Atendimento**
   - modalidade válida;
   - endereço obrigatório preenchido quando aplicável;

5. **Passo 5 - Pagamento**
   - configuração de sinal válida;
   - Mercado Pago conectado quando o sinal antecipado estiver ativo;
   - política de cancelamento válida;

6. **Passo 6 - Aparência**
   - uma opção de aparência válida selecionada.

O frontend pode utilizar os estados já conhecidos para melhorar a experiência, mas a validação definitiva não deve depender apenas do navegador.

### Etapa Anterior Incompleta

Caso alguma etapa obrigatória esteja incompleta ou inválida, não concluir o onboarding.

Exibir:

**"Ainda existem informações obrigatórias que precisam ser concluídas."**

Indicar qual etapa precisa ser revisada.

Exemplo:

**"Revise a configuração da sua agenda antes de concluir."**

Disponibilizar uma ação para retornar diretamente à etapa correspondente.

Não apagar as informações já preenchidas nas outras etapas.

### Conclusão do Onboarding

O sistema somente deve considerar a configuração inicial concluída após a confirmação de sucesso da operação responsável por finalizar o onboarding.

Não considerar o onboarding concluído apenas porque:

- a profissional chegou ao Passo 6;
- clicou no botão;
- o frontend alterou uma variável local;
- a interface exibiu a seção **Tudo pronto!**;
- houve tentativa de redirecionamento para a Dashboard.

A conclusão deve possuir um estado confiável que possa ser consultado pelo sistema para aplicar a proteção de rotas definida anteriormente nesta documentação.

### Estado de Carregamento

Ao clicar em **Concluir Configuração**:

- desabilitar o botão;

- impedir múltiplos cliques;

- impedir múltiplas requisições de conclusão;

- alterar temporariamente o conteúdo para:

  **"Concluindo..."**

- exibir indicador de carregamento;

- manter a profissional na tela até existir uma resposta definitiva.

Não redirecionar para a Dashboard enquanto a conclusão ainda estiver sendo processada.

### Erro de Conexão ao Concluir

Caso a requisição não possa ser concluída por problema de conexão:

Exibir:

**"Não foi possível concluir sua configuração. Verifique sua conexão e tente novamente."**

Em seguida:

- restaurar o botão **Concluir Configuração**;

- manter todas as informações preenchidas;

- manter a preferência de aparência selecionada;

- permitir nova tentativa;

- não marcar o onboarding como concluído;

- não redirecionar para a Dashboard.

### Erro Interno ao Concluir

Caso ocorra uma falha interna:

Exibir:

**"Não foi possível concluir sua configuração agora. Tente novamente em alguns instantes."**

O sistema deve:

- preservar os dados das etapas anteriores;

- restaurar o botão;

- permitir nova tentativa;

- não liberar acesso à Dashboard;

- registrar detalhes técnicos somente internamente.

### Resposta Inválida da API

Caso a API retorne:

- resposta vazia;
- JSON inválido;
- resposta inesperada;
- status de erro não tratado;

não assumir que a configuração foi concluída.

Exibir:

**"Não foi possível confirmar a conclusão da configuração. Tente novamente."**

Não alterar o estado do onboarding para concluído sem confirmação válida.

### Evitar Conclusão Duplicada

Se a profissional clicar várias vezes ou a requisição for repetida por algum motivo:

- não criar dados duplicados;

- não duplicar configurações;

- não criar um segundo `tenant`;

- não duplicar serviços;

- não duplicar disponibilidade;

- tratar a conclusão da configuração de maneira segura contra requisições repetidas.

Se o onboarding já estiver concluído e uma requisição de conclusão for recebida novamente, o sistema deve reconhecer o estado existente em vez de executar todo o processo novamente.

### Sucesso

Somente após confirmação válida da conclusão:

- considerar o onboarding concluído;

- liberar as rotas administrativas protegidas;

- redirecionar para:

  `/dashboard`

- não permitir retornar às etapas de onboarding apenas alterando manualmente a URL, conforme definido na seção **Controle de Acesso e Proteção de Rotas**.

### Falha no Redirecionamento Após Sucesso

Caso o onboarding tenha sido concluído corretamente, mas exista uma falha apenas na navegação para a Dashboard:

- não executar novamente todo o onboarding;

- manter o estado de configuração como concluído;

- permitir tentar abrir a Dashboard novamente.

Exibir:

**"Sua configuração foi concluída, mas não foi possível abrir o painel. Tente novamente."**

Disponibilizar:

**Ir para o Dashboard**

### Atualização ou Fechamento da Página Durante a Conclusão

Se a profissional atualizar ou fechar a página enquanto **Concluindo...** estiver sendo processado:

- ao retornar, consultar o estado real da configuração;

- se já tiver sido concluída com sucesso, direcionar para a Dashboard;

- se não tiver sido concluída, permitir continuar no Passo 6;

- não assumir sucesso ou falha apenas com base no estado antigo do navegador.

### Regra Importante para Proteção de Rotas

A preferência de aparência pode permanecer local no MVP.

Porém, o estado que determina:

**"Esta profissional concluiu ou não o onboarding?"**

não deve depender de `localStorage`.

Antes da produção, adicionar à tabela `users`:

- `onboardingEtapaAtual` - inteiro indicando a etapa obrigatória atual (`1` a `6`), utilizando `0` quando ainda não iniciado;
- `onboardingConcluido` - booleano com padrão `FALSE`.

Regras:

- ao concluir cada passo com sucesso, atualizar `onboardingEtapaAtual` para a próxima etapa;
- ao concluir o Passo 6 com sucesso, definir `onboardingEtapaAtual = 6` e `onboardingConcluido = TRUE`;
- middleware e backend devem utilizar esses campos como fonte confiável para proteção de rotas;
- o `localStorage` pode preservar dados temporários de formulário, mas nunca decidir sozinho se a Dashboard pode ser acessada.

- **Ajustes a serem feitos nas telas atuais:**

  - **Modo Web:**
    - Aplicar a mudança de tema em tempo real.

    - Remover o aviso informando que o modo de teste está ativo.

    - Manter **Padrão do Sistema / Automático** pré-selecionado na primeira configuração.

    - Considerar alterar o nome **Padrão do Sistema** para **Automático**, deixando mais claro que essa opção acompanha automaticamente o tema configurado no dispositivo.

    - Adicionar um ícone correspondente em cada opção:
      - **Modo Claro:** ícone de sol.
      - **Modo Escuro:** ícone de lua.
      - **Automático:** ícone relacionado ao sistema/dispositivo.

    - Adicionar uma pequena pré-visualização visual em cada opção de tema, permitindo visualizar a diferença entre **Modo Claro**, **Modo Escuro** e **Automático** antes da seleção.

    - Ao selecionar **Modo Claro** ou **Modo Escuro**, aplicar imediatamente o tema escolhido em toda a interface.

    - Ao selecionar **Automático**, detectar e utilizar o tema atual do dispositivo. Caso o tema do dispositivo seja alterado posteriormente, o sistema também deve acompanhar essa alteração.

    - Adicionar uma transição curta e discreta durante a mudança de tema para evitar alterações visuais excessivamente bruscas.

    - Manter uma indicação visual clara da opção selecionada através de borda de destaque e ícone de confirmação.

    - Substituir a mensagem atual de **"Configuração pronta"** por uma seção de conclusão mais completa.

    - Adicionar uma seção com:
      - ícone de confirmação;
      - título **"Tudo pronto!"**;
      - mensagem informando que o perfil profissional foi configurado;
      - confirmação das principais etapas concluídas.

    - Exibir as principais configurações concluídas:
      - **Perfil ✓**
      - **Agenda ✓**
      - **Serviços ✓**
      - **Pagamentos ✓**

    - Adicionar a mensagem:
      **"Seu perfil profissional está configurado. Ao concluir, você poderá acessar seu painel, gerenciar sua agenda e compartilhar seu perfil com suas clientes."**

    - Manter os botões **Voltar** e **Concluir Configuração** nas extremidades inferiores do card.

    - Ao clicar em **Concluir Configuração**, exibir um estado de carregamento no botão, alterando temporariamente seu conteúdo para **"Concluindo..."** acompanhado de um indicador de carregamento.

    - Enquanto a configuração estiver sendo concluída, desabilitar o botão para impedir múltiplos envios.

    - Após concluir com sucesso, direcionar a profissional para o Dashboard.

    - Aproveitar melhor o espaço disponível em monitores maiores, aumentando moderadamente a presença visual do conteúdo sem esticar artificialmente o card.

    - Utilizar nas áreas vazias do fundo elementos decorativos sutis, como gradientes radiais ou brilhos difusos de baixa opacidade, seguindo a identidade visual do sistema.


  - **Modo Mobile:**
    - Aplicar a mudança de tema em tempo real e garantir contraste e leitura adequados em todas as opções de aparência.

    - Remover o aviso informando que o modo de teste está ativo.

    - Manter **Padrão do Sistema / Automático** pré-selecionado na primeira configuração.

    - Em celulares, manter as opções de aparência organizadas verticalmente, com um card por linha.

    - Adicionar um ícone em cada opção:
      - **Modo Claro:** ícone de sol.
      - **Modo Escuro:** ícone de lua.
      - **Automático:** ícone relacionado ao sistema/dispositivo.

    - Utilizar descrições curtas no modo celular:
      - **Modo Claro:** "Fundo claro e maior contraste."
      - **Modo Escuro:** "Fundo escuro e confortável."
      - **Automático:** "Segue o tema claro ou escuro do dispositivo."

    - Não utilizar pré-visualizações grandes dos temas em celulares, evitando aumentar excessivamente a altura da página.

    - Ao selecionar um tema, aplicar imediatamente a alteração em toda a interface.

    - Garantir que textos, campos, bordas, ícones, botões e mensagens permaneçam legíveis tanto no tema claro quanto no tema escuro.

    - Ao utilizar **Automático**, acompanhar o tema configurado no dispositivo.

    - Adicionar uma transição curta e discreta durante a alteração entre temas.

    - Após as opções de aparência, adicionar uma seção compacta de conclusão com o título **"Tudo pronto!"**.

    - No celular, apresentar as principais configurações concluídas em uma grade de 2 colunas:
      - **Perfil ✓**
      - **Agenda ✓**
      - **Serviços ✓**
      - **Pagamentos ✓**

    - Adicionar abaixo a mensagem:
      **"Ao concluir, você poderá acessar seu painel e compartilhar seu perfil com suas clientes."**

    - Em celulares, organizar os botões de navegação verticalmente:
      - **Voltar** como ação secundária;
      - **Concluir Configuração** abaixo, ocupando `100%` da largura disponível.

    - Ao tocar em **Concluir Configuração**, alterar o botão para **"Concluindo..."**, acompanhado de um indicador de carregamento, e impedir novos cliques até a conclusão.

    - Garantir rolagem vertical normal caso o conteúdo ultrapasse a altura disponível.

    - Respeitar a `safe area` inferior do dispositivo.

    - **No modo mobile para tablets e iPads:**
      - Aumentar a largura máxima do conteúdo principal para aproveitar melhor o espaço disponível.
      - Evitar que o card fique excessivamente estreito em relação à tela.
      - Manter **Modo Claro**, **Modo Escuro** e **Automático** lado a lado quando houver largura suficiente.
      - Utilizar pequenas pré-visualizações visuais dos temas em tablets e iPads, seguindo o conceito da versão Web.
      - Aumentar moderadamente a presença visual dos cards de aparência para aproveitar melhor a proporção da tela.
      - Manter a seção **Tudo pronto!** abaixo das opções de aparência.
      - Manter **Voltar** e **Concluir Configuração** lado a lado e posicionados nas extremidades do card quando houver espaço suficiente.
      - Não aumentar artificialmente a altura do card apenas para preencher a tela.
      - Utilizar elementos decorativos sutis no fundo para reduzir a sensação de espaço vazio.
      - Garantir contraste e legibilidade adequados tanto no tema claro quanto no tema escuro.
---

# Fluxo de Já Tenho uma Conta / Entrar

Ao clicar em **Já tenho uma conta / Entrar**, a profissional é direcionada à Tela de Login.

Existem duas formas de acesso:

- E-mail e senha.
- Google.

---

## 1. Entrar com E-mail e Senha

A profissional informa e-mail e senha cadastrados.

- **Dados usados:**
  - **Tabela `users`:**
    - `id`.
    - `email`.
    - `senhaHash`.
    - `emailVerificado`.
- **Mensagens de erros e validações:**

  - **E-mail vazio:** **"Informe seu e-mail."**

  - **E-mail inválido/incompleto:** **"Informe um e-mail em formato válido (exemplo: nome@dominio.com)."**

  - O campo de e-mail deve validar:
    - presença do caractere `@`;
    - existência de conteúdo antes e depois do `@`;
    - existência de domínio válido;
    - evitar aceitar formatos claramente incompletos como:
      - `nome`;
      - `nome@`;
      - `@dominio.com`;
      - `nome@dominio`;
      - `nome dominio.com`.

  - **Senha vazia:** **"Informe sua senha."**

  - **Credenciais inválidas:** **"E-mail ou senha incorretos. Tente novamente."**

  - Utilizar a mesma mensagem tanto quando o e-mail não existir quanto quando a senha estiver incorreta.

  - Não informar qual das duas informações está errada.

  - **E-mail ainda não verificado:** **"Seu e-mail ainda não foi verificado. Conclua a verificação para continuar."**
    - Exibir uma ação para continuar a verificação.
    - Ao selecionar essa ação, direcionar a profissional para a **Tela de Verificar E-mail**.
    - O e-mail informado no login deve ser levado para a tela de verificação para evitar que a profissional precise digitá-lo novamente.

  - **Campos vazios:** validar cada campo individualmente e exibir a mensagem diretamente abaixo do respectivo campo.

  - Não utilizar apenas uma mensagem genérica como **"Preencha o e-mail e a senha para continuar."** quando for possível identificar individualmente qual campo está vazio ou inválido.

  - Quando ambos os campos estiverem vazios, exibir:
    - abaixo do e-mail: **"Informe seu e-mail."**
    - abaixo da senha: **"Informe sua senha."**

  - Campos inválidos devem receber uma borda de erro na cor de destaque utilizada pelo sistema.

  - A mensagem de erro deve desaparecer ou ser atualizada assim que o valor informado voltar a ser válido.

  - O botão **Entrar** deve ficar desabilitado enquanto:
    - o e-mail estiver vazio;
    - o e-mail estiver em formato inválido;
    - a senha estiver vazia;
    - uma tentativa de login estiver sendo processada.

  - Ao clicar em **Entrar**, exibir estado de carregamento:
    - alterar temporariamente o texto do botão para **"Entrando..."**;
    - exibir um indicador de carregamento;
    - desabilitar o botão enquanto a autenticação estiver sendo processada;
    - impedir múltiplos envios simultâneos.

  - Em caso de erro retornado pelo backend, restaurar o botão para **Entrar**.

  - **Sucesso:** após autenticar, consultar o estado real da conta e seguir a ordem de proteção de rotas: verificação de e-mail quando aplicável → Termos/Privacidade → etapa pendente do onboarding → Dashboard.

  - Caso a profissional já esteja autenticada e tente acessar a tela de login, não redirecionar automaticamente para a Dashboard sem verificar o estado da conta. Se houver Termos/Privacidade ou onboarding pendentes, direcionar para a etapa obrigatória correspondente.

  - Manter suporte à autenticação com Google.

  - Em caso de falha na autenticação com Google, exibir uma mensagem clara, por exemplo:
    **"Não foi possível entrar com o Google. Tente novamente."**


- **Ajustes a serem feitos nas telas atuais:**

  - **Modo Web:**
    - Remover o aviso **"Modo de teste ativo. Preencha qualquer e-mail e senha para visualizar o painel sem consultar o backend."**

    - Manter o formulário centralizado horizontal e verticalmente na tela.

    - Aumentar moderadamente a largura do card de login para aproveitar melhor o espaço disponível em monitores grandes.

    - Utilizar uma largura máxima aproximada entre `500px` e `560px`, evitando que o formulário fique excessivamente estreito.

    - Aumentar levemente o tamanho da logo para melhorar a identidade visual da tela.

    - Manter o título **"Acesse sua conta"** centralizado e com destaque adequado.

    - Manter o subtítulo abaixo do título, utilizando tamanho secundário e boa legibilidade.

    - Adicionar mensagens de validação diretamente abaixo dos campos de **E-mail** e **Senha**.

    - Aplicar borda de erro no campo correspondente quando houver uma validação inválida.

    - Não reservar uma grande área fixa para mensagens de erro. O formulário deve aumentar sua altura naturalmente apenas quando uma mensagem for exibida.

    - Adicionar opção de **mostrar/ocultar senha** através do ícone de olho.

    - O ícone de mostrar/ocultar senha deve permanecer dentro do campo e possuir área de clique confortável.

    - Manter o link **"Esqueceu a senha?"** alinhado próximo ao campo de senha e visualmente separado do rótulo do campo.

    - Melhorar o espaçamento entre:
      - campo de e-mail;
      - mensagem de erro;
      - campo de senha;
      - mensagem de erro;
      - botão Entrar.

    - Manter o botão **Entrar** ocupando `100%` da largura disponível.

    - Exibir estado **"Entrando..."** com indicador de carregamento durante a autenticação.

    - Manter a separação **"ou continue com"** entre o login tradicional e o login com Google.

    - Manter o botão **Entrar com Google** ocupando toda a largura disponível.

    - Manter o ícone colorido do Google ao lado do texto.

    - Manter o texto **"Ainda não tem conta? Criar conta"** abaixo do formulário.

    - Nas áreas vazias laterais em monitores grandes, utilizar apenas elementos decorativos sutis, como gradientes radiais ou brilhos difusos de baixa opacidade, seguindo o mesmo padrão visual utilizado nas demais telas.

    - Não aumentar artificialmente a altura do card apenas para preencher a tela.

  - **Modo Mobile:**
    - Remover o aviso informando que o modo de teste está ativo.

    - Adicionar as mesmas validações e mensagens utilizadas no modo Web.

    - Adicionar opção de **mostrar/ocultar senha**.

    - Garantir que as mensagens de validação apareçam integralmente abaixo de seus respectivos campos e nunca sejam cortadas.

    - Garantir que mensagens de erro maiores possam quebrar em mais de uma linha sem gerar rolagem horizontal.

    - Manter o formulário em uma única coluna.

    - Manter margens laterais de aproximadamente `16px` em celulares.

    - Manter os campos e botões com altura confortável para toque, aproximadamente entre `48px` e `52px`.

    - Garantir que o teclado virtual não cubra o botão **Entrar**.

    - Quando o teclado estiver aberto, permitir rolagem vertical suficiente para que o campo ativo, sua mensagem de validação e o botão **Entrar** continuem acessíveis.

    - Utilizar `min-height: 100dvh` e respeitar as `safe areas` do dispositivo.

    - Utilizar teclado adequado para o campo de e-mail, com `inputmode`/tipo apropriado para facilitar a digitação do caractere `@`.

    - Manter o botão **Entrar** ocupando `100%` da largura disponível.

    - Exibir o estado **"Entrando..."** durante a autenticação e impedir múltiplos toques.

    - Manter o botão **Entrar com Google** ocupando `100%` da largura disponível.

    - Manter o link **Criar conta** facilmente acessível abaixo do formulário.

    - **No modo mobile para tablets e iPads:**
      - Aumentar significativamente a largura do formulário em relação à versão de celular.
      - Evitar o comportamento atual em que o card de login aparece pequeno no centro de uma grande área vazia.
      - Utilizar largura máxima aproximada entre `500px` e `560px`.
      - Manter o formulário centralizado horizontalmente.
      - Aumentar proporcionalmente a logo, os campos, os botões e os espaçamentos internos.
      - Manter campos e botões utilizando `100%` da largura interna do card.
      - Aumentar levemente o tamanho do título e dos textos secundários para melhorar a leitura em telas maiores.
      - Manter as mensagens de validação diretamente abaixo dos respectivos campos.
      - Manter o formulário visualmente centralizado verticalmente quando houver altura suficiente.
      - Caso o conteúdo ultrapasse a altura disponível, permitir rolagem vertical normal.
      - Em tablets e iPads, não utilizar a mesma largura compacta definida para celulares.
      - Evitar deixar grandes áreas vazias ao redor do card sem necessidade.
---

## 2. Entrar com Google

A profissional clica em **Entrar com Google** e é direcionada para autenticação.

- **Dados usados:**
  - **Tabela `users`:**
    - `id`.
    - `email`.
    - `googleId`.

- **Mensagens de erros e validações:**
  - **Conta Google não cadastrada:** **"Nenhuma conta encontrada com este e-mail do Google. Crie uma conta para continuar."**
  - **Falha:** **"Não foi possível autenticar com o Google. Tente novamente."**
  - **Sucesso:** validar o estado atual da conta e aplicar a ordem de proteção de rotas antes de decidir o destino. Somente redirecionar para a Dashboard quando Termos/Privacidade e onboarding estiverem concluídos.

- **Ajustes a serem feitos nas telas atuais:**
  - **Modo Web:** alterar **Continue with Google** para **Entrar com Google**.
  - **Modo Mobile:** alterar **Continue with Google** para **Entrar com Google**.

---

## 3. Fluxo de Esqueci Minha Senha

Na Tela de Login, a profissional pode clicar em **Esqueceu a senha?**.

---

### Etapa 3.1 - Solicitar Código

A profissional informa o e-mail cadastrado e clica em **Enviar código**.

- **Dados usados:**
  - **Tabela `users`:**
    - `email` - usado para localizar a conta.
    - `senhaHash` e `googleId` podem ser consultados pelo backend para determinar se a conta usa senha local ou somente Google.
  - **Tabela `verification_codes`:**
    - `id` - gerado pelo backend.
    - `email`.
    - `codigo` - 6 dígitos.
    - `tipo` - `recuperacao_senha`.
    - `expiraEm` - 15 minutos após a criação.
    - `tentativas` - inicia em 0.
    - `bloqueadoAte` - inicia ausente/nulo e recebe timestamp somente quando o limite de tentativas for excedido.
    - `criadoEm` - automático.
- **Mensagens de erros e validações:**

  - **E-mail vazio:** **"Informe seu e-mail."**

  - **E-mail inválido:** **"Informe um e-mail válido."**

  - O campo de e-mail deve validar:
    - presença do caractere `@`;
    - conteúdo antes do `@`;
    - domínio após o `@`;
    - formato minimamente válido de e-mail.

  - Exemplos que devem ser considerados inválidos:
    - `nome`;
    - `nome@`;
    - `@dominio.com`;
    - `nome@dominio`;
    - `nome dominio.com`.

  - Após informar um e-mail com formato válido e clicar em **Enviar Código**, exibir:

    **"Se existir uma conta vinculada a este e-mail, enviaremos um código de recuperação."**

  - Utilizar a mesma resposta visual independentemente de o e-mail estar ou não cadastrado.

  - Não informar nesta etapa pública se:
    - o e-mail não possui conta;
    - a conta utiliza somente Google;
    - a conta possui senha local.

  - Se existir uma conta elegível para recuperação por senha, gerar e enviar o código normalmente.

  - Se não existir conta elegível, não gerar código, mantendo a mesma resposta pública para evitar enumeração de usuários.

  - **Erro inesperado ao solicitar código:** **"Não foi possível enviar o código de recuperação. Tente novamente."**

  - Não utilizar mensagens genéricas como **"Erro ao solicitar código de recuperação"** em toast sem contexto.

  - Sempre que possível, exibir o erro diretamente abaixo do campo de e-mail ou em um aviso integrado ao formulário.

  - Gerar um código numérico de **6 dígitos**.

  - O código de recuperação deve possuir validade de **15 minutos**.

  - Ao gerar um novo código:
    - invalidar ou remover qualquer código de recuperação anterior ainda ativo para aquele e-mail;
    - garantir que somente o código mais recente permaneça válido.

  - Salvar o código com o tipo correspondente à recuperação de senha.

  - Após o envio do código, não permitir múltiplas solicitações simultâneas.

  - **Sucesso:** encaminhar automaticamente para a **Tela de Verificar Código de Recuperação**.

  - O e-mail informado deve ser levado automaticamente para a próxima etapa, sem exigir que a profissional digite novamente.

  - No modo de teste local:
    - não exigir envio real de e-mail;
    - simular a geração do código;
    - permitir avançar para a tela seguinte normalmente;
    - utilizar um código fictício conhecido apenas para testes, por exemplo `123456`;
    - deixar claro no código do projeto que esse comportamento é exclusivo do modo de desenvolvimento/teste;
    - não exibir essa informação na interface final destinada ao usuário.

  - No modo de teste, ao informar qualquer e-mail com formato válido e clicar em **Enviar Código**, avançar para a tela de verificação.

  - O fluxo de teste deve permitir acessar todas as etapas seguintes da recuperação de senha sem depender de banco de dados ou serviço real de e-mail.


- **Ajustes a serem feitos nas telas atuais:**

  - **Modo Web:**
    - Criar/ajustar a tela de solicitação de recuperação de senha.

    - Manter o formulário centralizado horizontal e verticalmente na tela.

    - Aumentar moderadamente a largura do card para aproveitar melhor o espaço disponível em monitores maiores.

    - Utilizar uma largura máxima aproximada entre `500px` e `560px`.

    - Aumentar levemente o tamanho da logo para manter consistência com as telas de Login e Cadastro.

    - Manter o título **"Redefinir Senha"** centralizado.

    - Manter o subtítulo:
      **"Digite o e-mail da sua conta profissional."**

    - Adicionar mensagem de validação diretamente abaixo do campo de e-mail.

    - Aplicar borda de erro no campo quando houver:
      - e-mail vazio;
      - e-mail inválido;
      - falha ao solicitar código.

    - A mensagem de erro deve desaparecer ou ser atualizada assim que o valor informado voltar a ser válido.

    - O botão **Enviar Código** deve ocupar `100%` da largura disponível.

    - O botão **Enviar Código** deve permanecer desabilitado enquanto:
      - o campo estiver vazio;
      - o e-mail estiver em formato inválido;
      - uma solicitação estiver sendo processada.

    - Ao clicar em **Enviar Código**, alterar temporariamente o botão para:
      **"Enviando..."**

    - Exibir um indicador de carregamento junto ao texto durante o processamento.

    - Enquanto o envio estiver em andamento:
      - desabilitar o botão;
      - impedir múltiplos cliques;
      - manter o e-mail preenchido.

    - Após sucesso:
      - avançar automaticamente para a tela de verificação do código;
      - manter o e-mail associado ao fluxo.

    - Em caso de erro:
      - restaurar o botão para **Enviar Código**;
      - exibir a mensagem correspondente no formulário.

    - Remover qualquer aviso de modo de teste da interface final.

    - No modo de teste local, simular o envio do código sem depender do backend ou de serviço externo de e-mail.

    - Manter o link **"Voltar para o login"** abaixo do botão principal.

    - Adicionar uma transição curta entre a tela de solicitação e a tela de verificação, utilizando um `fade-out` e `fade-in` discreto.

    - Nas áreas vazias do fundo em monitores grandes, utilizar elementos decorativos sutis, como gradientes radiais ou brilhos difusos de baixa opacidade, seguindo o padrão das demais telas.

    - Não utilizar toast como principal forma de comunicar erro de validação do formulário. O erro deve permanecer próximo ao campo relacionado.


  - **Modo Mobile:**
    - Criar/ajustar a tela seguindo as mesmas regras funcionais do modo Web.

    - Garantir que o campo de e-mail nunca seja cortado ou ultrapasse a largura da tela.

    - Manter o formulário em uma única coluna.

    - Manter margens laterais de aproximadamente `16px` em celulares.

    - Manter o campo de e-mail e o botão **Enviar Código** ocupando `100%` da largura disponível.

    - Utilizar teclado apropriado para entrada de e-mail.

    - Garantir que mensagens de erro possam quebrar em mais de uma linha sem gerar rolagem horizontal.

    - Garantir que o teclado virtual não cubra o botão **Enviar Código**.

    - Quando o teclado estiver aberto, permitir rolagem vertical suficiente para manter:
      - campo de e-mail;
      - mensagem de erro;
      - botão **Enviar Código**;
      - link **Voltar para o login**
      acessíveis.

    - Exibir o mesmo estado **"Enviando..."** com indicador de carregamento durante a solicitação.

    - No modo de teste local, permitir avançar normalmente para a próxima tela sem envio real de e-mail.

    - Não exibir mensagens de teste ou detalhes técnicos na interface.

    - Utilizar `min-height: 100dvh`.

    - Respeitar as `safe areas` do dispositivo.

    - Permitir rolagem vertical normal quando necessário.

    - **No modo mobile para tablets e iPads:**
      - aumentar a largura máxima do formulário em relação à versão de celular;
      - evitar que o card fique pequeno demais no centro da tela;
      - utilizar largura aproximada entre `500px` e `560px`;
      - manter o formulário centralizado horizontalmente;
      - aumentar proporcionalmente logo, campos, botões e espaçamentos internos;
      - manter o campo de e-mail e o botão utilizando `100%` da largura interna;
      - manter o formulário visualmente centralizado verticalmente quando houver espaço suficiente;
      - permitir rolagem normal caso o conteúdo ultrapasse a altura disponível;
      - evitar grandes áreas vazias ao redor do card sem necessidade.
---

### Etapa 3.2 - Verificar Código de Recuperação

A profissional informa o código de 6 dígitos recebido.

- **Dados usados:**
  - **Tabela `verification_codes`:**
    - `email`.
    - `codigo`.
    - `tipo`.
    - `expiraEm`.
    - `tentativas`.
    - `bloqueadoAte`.

- **Mensagens de erros e validações:**
  - Aceitar somente números.
  - **Código incorreto:** **"Código incorreto. Tente novamente."**
  - **Código expirado:** **"Código expirado. Solicite um novo código de recuperação."**
  - **Código incompleto:** **"Preencha todos os 6 dígitos do código."**
  - Após cada erro, incrementar `tentativas`.
  - Após 5 tentativas incorretas, definir `bloqueadoAte` no backend e bloquear temporariamente novas tentativas. A contagem regressiva deve utilizar o timestamp persistido, não estado somente local.
  - **Reenviar código:** ativar após 60 segundos.
  - **Sucesso:** invalidar/remover o código utilizado e encaminhar para Redefinir Senha.

- **Ajustes a serem feitos nas telas atuais:**
  - **Modo Web:**
    - Permitir colar código e distribuir automaticamente os 6 dígitos.
    - Ignorar caracteres excedentes.
    - Bloquear letras e caracteres especiais.
  - **Modo Mobile:**
    - Permitir colar/preenchimento automático quando suportado.
    - Utilizar `inputmode="numeric"`.
    - Bloquear letras e caracteres especiais.

---

### Etapa 3.3 - Redefinir Senha

Após validar o código, a profissional cria uma nova senha.

- **Dados usados:**
  - **Tabela `users`:**
    - `senhaHash` - substituída pelo novo hash após validação.

- **Mensagens de erros e validações:**
  - Nova senha deve possuir:
    - Mínimo de 8 caracteres.
    - Pelo menos 1 letra.
    - Pelo menos 1 número.
  - Requisitos exibidos em vermelho e passando para verde conforme atendidos.
  - Campo **Confirmar Nova Senha** obrigatório.
  - **Senhas diferentes:** **"As senhas não conferem."**
  - A senha em texto puro nunca deve ser salva no banco.
  - **Sucesso:** atualizar `senhaHash`, invalidar o código utilizado e redirecionar para o Login com Toast **"Senha alterada com sucesso! Entre novamente para continuar."**

- **Ajustes a serem feitos nas telas atuais:**
  - **Modo Web:** validações em tempo real e botões mostrar/ocultar senha.
  - **Modo Mobile:** mesmas validações e botões, garantindo que o teclado não esconda a ação principal.

---

# Fluxo nas Outras Telas do Sistema

## Tela Dashboard - Início

Após o login, a profissional visualiza a Dashboard principal.

A tela deve apresentar:

- Quantidade de agendamentos do dia por status.
- Próximo atendimento.
- Quantidade de confirmados.
- Quantidade de pendentes.
- Faturamento.
- Total de horas ocupadas.
- Lista de próximos agendamentos.

O faturamento exibido pelo MVP pode ser calculado a partir dos agendamentos `finalizado`, usando `appointments.precoCobrado`, enquanto não existir uma estrutura financeira separada.

- **Dados usados:**
  - **Tabela `tenants`:**
    - `nomeProfissional`.
    - `nomeEstabelecimento`.
    - `slug`.
    - `whatsapp`.
    - `modeloCobrancaSinal`.
    - `valorSinal`.
  - **Tabela `appointments`:**
    - `id`.
    - `clienteNome`.
    - `clienteTelefone`.
    - `tipoAtendimento`.
    - `precoCobrado`.
    - `valorSinalPago`.
    - `dataInicio`.
    - `dataFim`.
    - `status`.
  - **Tabela `appointment_services`:**
    - `appointmentId`.
    - `serviceId`.
    - `precoCobrado`.
    - `duracaoMinutos`.
  - **Tabela `services`:**
    - `id`.
    - `nome`.

    ### Estados, Mensagens de Erro e Validações da Dashboard

Além das regras globais de validação e tratamento de erros do sistema, aplicar as seguintes regras específicas à Dashboard.

### Carregamento Inicial

Ao abrir a Dashboard, o sistema deve carregar os dados necessários antes de apresentar informações como se fossem definitivas.

Enquanto os dados estiverem sendo carregados:

- utilizar skeletons, placeholders ou indicador visual compatível com o design do Beleza em Dia;

- não exibir valores falsos como `0` apenas porque a API ainda não respondeu;

- não mostrar por alguns instantes dados pertencentes a outra sessão, tenant ou estado anterior;

- não bloquear toda a interface desnecessariamente caso apenas uma informação específica ainda esteja carregando.

Exemplo:

Em vez de:

`Faturamento: R$ 0,00`

enquanto o valor real ainda está sendo buscado, utilizar um estado de carregamento visual.

### Carregamento dos Próximos Agendamentos

Enquanto a lista de próximos agendamentos estiver sendo carregada:

- exibir skeletons ou estado de carregamento dentro da própria seção;

- não exibir imediatamente **"Nenhum agendamento"** antes de saber se a lista realmente está vazia;

- substituir o loading pelo resultado real somente após a resposta ser processada.

### Dashboard sem Agendamentos

Caso a profissional realmente não possua agendamentos para o dia, apresentar um estado vazio amigável.

Exibir:

**"Nenhum agendamento para hoje."**

Subtexto sugerido:

**"Quando novas reservas forem realizadas, elas aparecerão aqui."**

Os botões:

- **Compartilhar Link da Agenda**;
- **+ Novo Agendamento**;

devem continuar disponíveis normalmente.

Não tratar uma lista vazia como erro.

### Próximo Atendimento Inexistente

Caso não exista nenhum próximo atendimento válido para o dia:

Exibir:

**"Nenhum próximo atendimento."**

Não mostrar:

- horário vazio;
- `undefined`;
- `null`;
- `Invalid Date`;
- dados de um agendamento cancelado ou expirado como próximo atendimento.

### Agendamentos Considerados Ativos

Para cálculos relacionados aos próximos horários ocupados, considerar somente os status que realmente representam reserva ativa naquele momento.

Agendamentos:

- `cancelado`;
- `expirado`;

não devem ocupar a agenda nem aparecer como próximo atendimento ativo.

Agendamentos `finalizado` podem permanecer disponíveis no histórico correspondente, mas não devem ser apresentados como próximo atendimento futuro.

### Contagem por Status

Os cards de métricas devem utilizar os status reais registrados no sistema.

A Dashboard não deve inferir um status diferente apenas com base no horário.

Exemplo:

Um agendamento que passou do horário não deve virar `finalizado` automaticamente apenas porque a hora terminou.

A alteração para `finalizado` deve seguir a regra definida para conclusão do atendimento.

### Faturamento

Enquanto não existir uma estrutura financeira separada no MVP, o faturamento exibido na Dashboard deve considerar somente agendamentos com:

`status = finalizado`

utilizando:

`appointments.precoCobrado`

Não incluir no faturamento:

- `pendente`;
- `confirmado` ainda não finalizado;
- `cancelado`;
- `expirado`.

O valor apresentado no frontend deve ser calculado a partir dos dados confiáveis retornados pelo backend.

### Horas Ocupadas

O total de horas ocupadas deve ser calculado com base na duração dos atendimentos considerados válidos para a métrica.

Não utilizar:

- agendamentos cancelados;
- agendamentos expirados.

A duração deve considerar corretamente:

- `dataInicio`;
- `dataFim`;

ou os snapshots de duração dos serviços, conforme a regra implementada pelo backend.

Nunca apresentar:

- duração negativa;
- `NaN`;
- `Invalid Date`.

Caso exista dado inconsistente, registrar internamente e evitar quebrar toda a Dashboard.

### Falha Geral ao Carregar a Dashboard

Caso nenhuma das informações principais possa ser carregada:

Exibir um estado de erro integrado à página.

Título:

**"Não foi possível carregar sua Dashboard."**

Descrição:

**"Verifique sua conexão e tente novamente."**

Disponibilizar botão:

**Tentar novamente**

Ao clicar em **Tentar novamente**:

- iniciar nova tentativa de carregamento;

- exibir estado de loading;

- impedir múltiplas tentativas simultâneas;

- manter a página protegida normalmente.

### Erro Interno do Sistema

Caso a conexão exista, mas ocorra uma falha interna:

Exibir:

**"Não foi possível carregar sua Dashboard agora. Tente novamente em alguns instantes."**

Disponibilizar:

**Tentar novamente**

Nunca apresentar diretamente:

- erro interno do banco/Convex;
- erro interno de função/SDK;
- stack trace;
- erro de JSON;
- resposta bruta da API;
- código interno da aplicação.

### Falha Parcial

Uma falha em apenas uma parte da Dashboard não deve necessariamente impedir o uso das demais partes.

Exemplo:

Se os próximos agendamentos forem carregados corretamente, mas ocorrer erro ao calcular o faturamento:

- manter a lista de agendamentos visível;

- não substituir toda a Dashboard por uma tela de erro;

- apresentar erro somente na métrica afetada.

Exemplo no card:

**"Não foi possível carregar este dado."**

Quando apropriado, disponibilizar uma ação de nova tentativa apenas para aquela informação.

### Falha ao Carregar Próximos Agendamentos

Caso somente a lista de próximos agendamentos falhe:

Exibir dentro da própria seção:

**"Não foi possível carregar os próximos agendamentos."**

Disponibilizar:

**Tentar novamente**

Os demais cards e informações da Dashboard devem continuar disponíveis se tiverem sido carregados corretamente.

### Falha ao Carregar uma Métrica

Se apenas uma métrica falhar, como:

- Confirmados;
- Pendentes;
- Faturamento;
- Horas Ocupadas;

não utilizar `0` como substituto automático, pois isso poderia representar uma informação incorreta.

Exibir naquele card:

**"Não disponível"**

ou estado visual equivalente.

Se a falha persistir, registrar o erro internamente para diagnóstico.

### Sessão Expirada Durante o Carregamento

Caso a API indique que a sessão não é mais válida:

- não apresentar a falha como simples erro de Dashboard;

- aplicar a regra global de sessão expirada;

- interromper carregamentos privados;

- redirecionar para Login;

- exibir:

**"Sua sessão expirou. Entre novamente para continuar."**

### Acesso Não Autorizado

Caso exista sessão, mas a operação tente acessar dados que não pertencem à profissional autenticada:

- não exibir os dados;

- não tentar corrigir utilizando um `tenantId` fornecido pelo navegador;

- tratar como acesso não autorizado;

- registrar internamente a tentativa quando apropriado.

A regra completa de autorização multi-tenant será definida na seção global de segurança.

### Atualização dos Dados

Após uma ação que altere informações exibidas na Dashboard, a interface deve atualizar os dados afetados.

Exemplos:

- criação de novo agendamento;
- confirmação;
- cancelamento;
- conclusão;
- expiração;
- alteração relevante em uma reserva.

Após fechar um modal com uma operação concluída, atualizar as informações necessárias sem exigir que a profissional recarregue manualmente toda a página.

### Erro Durante Atualização Automática

Se uma operação foi concluída com sucesso no backend, mas a atualização visual da Dashboard falhar:

- não repetir automaticamente a operação original;

- não criar um segundo agendamento;

- não cancelar novamente;

- tentar apenas recarregar os dados da Dashboard.

Exemplo:

A criação do agendamento foi confirmada, mas a atualização da lista falhou.

Exibir:

**"O agendamento foi salvo, mas não foi possível atualizar a Dashboard. Atualize os dados novamente."**

Disponibilizar:

**Atualizar**

### Evitar Requisições Duplicadas

Durante carregamentos e atualizações:

- impedir requisições duplicadas desnecessárias;

- não disparar a mesma criação, cancelamento ou alteração duas vezes por causa de duplo clique;

- diferenciar uma operação de alteração de uma simples atualização de dados.

### Dados Inconsistentes

Caso um agendamento retornado pelo backend possua algum dado opcional ausente, a interface deve continuar funcionando quando possível.

Exemplo:

Se `observacao = NULL`, simplesmente não exibir observação.

Porém, caso falte um dado essencial necessário para representar o agendamento:

- não quebrar a página inteira;

- apresentar estado seguro para aquele item;

- registrar internamente a inconsistência.

Nunca exibir:

- `undefined`;
- `null`;
- `[object Object]`;
- `NaN`;
- `Invalid Date`.

### Ordenação dos Próximos Agendamentos

Os próximos agendamentos devem ser ordenados cronologicamente por `dataInicio`.

O agendamento mais próximo no futuro deve aparecer primeiro.

Não depender da ordem em que os registros vieram do banco para determinar visualmente o próximo atendimento.

### Estado da Dashboard após Alterações

Depois de:

- confirmar;
- finalizar;
- cancelar;
- expirar;
- remarcar;

um agendamento, atualizar:

- quantidade por status;
- próximo atendimento;
- faturamento, quando aplicável;
- horas ocupadas;
- lista de próximos agendamentos.

A atualização deve refletir o novo estado confirmado pelo backend.

### Regra de Segurança

Nenhum dado privado da Dashboard deve ser exibido antes da confirmação de que:

- existe uma sessão válida;

- a profissional concluiu o onboarding obrigatório;

- o acesso à rota está autorizado.

Essa regra complementa a seção **Controle de Acesso e Proteção de Rotas**.


- **Ajustes a serem feitos nas telas atuais:**

  - **Modo Web:**
    - Remover o texto/logo duplicado **Beleza em Dia** no topo da área principal.
    - Manter somente a identidade visual **Beleza em Dia** presente na sidebar.
    - Remover o aviso **Modo de teste ativo**.
    - Após remover o aviso de teste, ajustar o espaçamento superior para que a saudação e o conteúdo principal não fiquem excessivamente afastados do topo.
    - Manter a estrutura atual dos cards, métricas e próximos agendamentos.

  - **Modo Tablet / iPad:**
    - Remover o texto/logo duplicado **Beleza em Dia** no topo da área principal.
    - Manter somente a identidade visual **Beleza em Dia** presente na sidebar.
    - Remover o aviso **Modo de teste ativo**.

    - Manter a sidebar lateral visível, porém utilizar uma largura mais compacta que no desktop para liberar mais espaço para o conteúdo principal.
    - Reduzir levemente os espaçamentos laterais do conteúdo em relação ao Web, aproveitando melhor a largura disponível do tablet.
    - Após remover o aviso de teste, reposicionar a saudação **Olá, [nome]! 👋** mais próxima do topo, evitando espaço vazio desnecessário.

    - No card principal de resumo do dia:
      - Manter a quantidade de agendamentos e o próximo atendimento na mesma linha quando houver largura suficiente.
      - Evitar que o nome da cliente, horário ou texto **Próximo atendimento** fiquem comprimidos.
      - Manter os botões **Compartilhar Link da Agenda** e **+ Novo Agendamento** lado a lado.
      - Os dois botões devem aproveitar a largura disponível de maneira equilibrada.
      - Em tablets mais estreitos, permitir que os botões sejam empilhados somente quando não houver espaço suficiente.

    - Manter os 4 cards de métricas (**Confirmados**, **Pendentes**, **Faturamento** e **Horas Ocupadas**) em uma única linha de 4 colunas quando houver espaço suficiente.
    - Em tablets mais estreitos, permitir reorganização automática para grade 2x2.
    - Reduzir apenas o necessário o espaçamento interno e a tipografia dos cards, sem diminuir excessivamente os valores principais.
    - Todos os cards devem possuir altura e largura visualmente consistentes.

    - Em **Próximos Agendamentos**:
      - Aproveitar toda a largura disponível do card.
      - Manter avatar, nome da cliente e serviços agrupados à esquerda.
      - Manter horário e badge de status alinhados à direita.
      - Evitar quebra desnecessária do horário ou do badge.
      - Quando houver múltiplos serviços, permitir que a descrição utilize mais de uma linha sem sobrepor horário ou status.
      - Manter separação visual clara entre os agendamentos.
      - Não permitir rolagem horizontal.

    - Manter o conteúdo principal centralizado e com largura máxima adequada para tablet, sem deixar grandes áreas vazias nas laterais.
    - Utilizar espaçamentos proporcionais ao tamanho da tela, menores que no desktop e maiores que no celular.
    - Garantir que toda a Dashboard permaneça confortável tanto em orientação retrato quanto paisagem.

  - **Modo Mobile:**
    - Remover o elemento duplicado **Beleza em Dia** no topo.
    - Remover o aviso **Modo de teste ativo**.
    - Manter os 4 cards de métricas em grade 2x2.
    - Ajustar o espaçamento de **Próximos Agendamentos** para não cortar horários ou badges de status.
---
## 1. Modal - Compartilhar Link da Agenda

Aberto ao clicar em **Compartilhar Link da Agenda** na Dashboard.

A modal exibe:

- URL pública do perfil/agenda.

- Botão **Copiar**.

- QR Code.

- Nome do estabelecimento abaixo ou próximo ao QR Code.

- Botão **WhatsApp**.

- Opção para baixar o QR Code em PNG, contendo a URL escrita abaixo do código.

- A URL compartilhada deve apontar sempre para o perfil público da profissional no formato:

  - `/{slug}`

  - Exemplo:
    - `https://belezaemdia.com/studio-bia-nails`

- **Dados usados:**

  - **Tabela `tenants`:**

    - `slug` - utilizado para montar a URL pública `/{slug}`.

    - `nomeEstabelecimento` - usado nos textos de compartilhamento, identificação visual do modal e/ou arquivo de QR Code.

- **Mensagens de erros e validações:**

  - **Copiar link:** Toast **"Link da agenda copiado para a área de transferência!"**

  - **Falha ao copiar:** **"Não foi possível copiar o link. Tente novamente."**

  - **WhatsApp:** abrir o compartilhamento com mensagem pré-formatada contendo a URL pública.

  - A mensagem de compartilhamento pode seguir o padrão:

    - **"Olá! Confira minha agenda, serviços e horários disponíveis pelo link abaixo: [URL]"**

  - **Falha ao abrir compartilhamento do WhatsApp:** **"Não foi possível abrir o WhatsApp. Copie o link e envie manualmente."**

  - **Download do QR Code:** gerar arquivo PNG corretamente.

  - **Erro ao gerar QR Code:** **"Não foi possível gerar o QR Code para download."**

  - A URL exibida no modal nunca deve ficar vazia.

  - Caso o `slug` da profissional não esteja disponível, não permitir compartilhar uma URL inválida e exibir:

    - **"Não foi possível gerar o link da sua agenda. Verifique as configurações do seu perfil."**

- **Comportamento do modal:**

  - Ao abrir, aplicar overlay escurecido sobre a Dashboard.

  - Aplicar efeito de `backdrop-blur` no conteúdo ao fundo.

  - O modal deve possuir botão **X** no canto superior direito.

  - Permitir fechamento pelo botão **X**.

  - No Web e Tablet, permitir fechamento ao clicar fora do modal e pela tecla `ESC`.

  - O conteúdo ao fundo não deve permanecer interativo enquanto o modal estiver aberto.

  - O QR Code deve ser gerado utilizando exatamente a mesma URL exibida no campo de compartilhamento.

  - O botão **Copiar** deve copiar exatamente a URL pública `/{slug}`.

  - O botão **WhatsApp** deve utilizar exatamente a mesma URL.

  - Não exibir nenhuma opção específica para Instagram.

- **Ajustes a serem feitos nas telas atuais:**

  - **Modo Web:**

    - Remover **Copiar p/ Instagram**.

    - Manter o modal centralizado horizontal e verticalmente.

    - Manter o QR Code centralizado.

    - Manter o nome do estabelecimento associado visualmente ao QR Code.

    - Manter a caixa com URL pública + botão **Copiar**.

    - Deixar o botão **WhatsApp** com 100% da largura disponível.

    - Manter largura do modal suficiente para que URL e botão **Copiar** não fiquem comprimidos.

    - Caso a URL seja longa, aplicar truncamento visual com reticências sem alterar o valor real copiado.

    - Manter espaçamento consistente entre:
      - cabeçalho;
      - QR Code;
      - nome do estabelecimento;
      - URL;
      - botão WhatsApp.

  - **Modo Tablet / iPad:**

    - Utilizar o mesmo padrão visual do modo Web.

    - Remover **Copiar p/ Instagram**.

    - Manter o modal centralizado horizontal e verticalmente.

    - Não utilizar comportamento de modal fixado no rodapé.

    - Manter largura confortável, sem ocupar toda a tela.

    - Manter QR Code centralizado.

    - Manter caixa com URL pública + botão **Copiar**.

    - Manter botão **WhatsApp** em largura total.

    - Garantir que o modal não ultrapasse a altura disponível da tela.

    - Quando necessário, permitir rolagem interna no conteúdo do modal.

    - Manter margens laterais suficientes para não encostar nas bordas da tela.

  - **Modo Mobile:**

    - Remover **Copiar p/ Instagram**.

    - Alterar o modal atual que fica fixado na parte inferior da tela.

    - O modal deve ficar centralizado vertical e horizontalmente.

    - Não utilizar comportamento de `bottom sheet`.

    - Manter margem segura nas laterais da tela.

    - Utilizar largura próxima de toda a área disponível, sem encostar nas bordas.

    - Aplicar overlay escurecido e `backdrop-blur` ao conteúdo da Dashboard ao fundo.

    - Manter o botão **X** no canto superior direito.

    - Manter QR Code centralizado.

    - Reduzir o tamanho do QR Code automaticamente quando necessário para evitar que ultrapasse a largura ou altura disponível.

    - Exibir o nome do estabelecimento abaixo ou próximo ao QR Code.

    - Manter a caixa com URL pública e botão **Copiar**.

    - Caso não exista largura suficiente para URL e botão **Copiar** confortavelmente na mesma linha, permitir ajuste interno sem gerar rolagem horizontal.

    - Manter botão **WhatsApp** em largura total.

    - Não permitir rolagem horizontal.

    - Caso a altura da tela seja pequena, permitir rolagem interna no modal.

    - O modal deve respeitar `safe-area` em dispositivos com notch ou barra de navegação.

    - Não deve existir sobreposição da bottom bar sobre o modal.

    - O modal deve permanecer visualmente centralizado mesmo quando houver rolagem interna.

    ### Página Pública Aberta pelo Link da Agenda

A URL compartilhada pelo modal **Compartilhar Link da Agenda** representa o perfil público da profissional/estabelecimento.

A estrutura da URL deve seguir:

- `/{slug}`

Exemplo:

- `https://belezaemdia.com/studio-bia-nails`

Essa página pode ser acessada sem login e funciona como a vitrine pública da profissional.

A cliente pode acessar o link pelo WhatsApp, Instagram, Facebook, QR Code ou qualquer outro local em que a profissional tenha divulgado sua agenda.

### Informações exibidas no Perfil Público

A página deve apresentar:

- **Foto de perfil ou logo da profissional/estabelecimento.**

- **Nome do estabelecimento.**

- **Nome da profissional.**

- **Biografia/descrição profissional**, quando cadastrada.

- **Modalidade de atendimento disponível:**
  - Salão;
  - Domiciliar;
  - Salão e Domiciliar.

- **Endereço do salão**, quando o estabelecimento oferecer atendimento em salão.

- **Regiões atendidas**, quando houver atendimento domiciliar e essa informação estiver configurada.

- **Horários e dias de funcionamento**, de acordo com a disponibilidade configurada pela profissional.

- **Serviços disponíveis**, considerando somente `services.ativo = TRUE`.

Para cada serviço, exibir quando disponível:

- Nome.
- Categoria.
- Descrição.
- Preço.
- Duração.
- Imagem.

- **Portfólio da profissional**, contendo as fotos e vídeos cadastrados em `tenant_portfolio`.

- Quando houver cobrança de sinal antecipado, informar de maneira clara que determinados agendamentos exigem pagamento de sinal para confirmação.

- **Botão principal "Agendar Horário"** ou **"Fazer Agendamento"**.

### Informações que não devem ser exibidas

A página pública não deve apresentar informações internas da profissional, como:

- Dados financeiros.
- Faturamento.
- Agendamentos de outras clientes.
- Telefones ou dados pessoais de outras clientes.
- Configurações internas da agenda.
- Credenciais ou informações da integração Mercado Pago.
- Informações administrativas do painel.



### Início do Agendamento

Ao clicar em **Agendar Horário**, a cliente deve iniciar o fluxo público de agendamento da profissional.

O fluxo pode utilizar:

- `/{slug}/agendar`

ou continuar dentro da própria página pública por meio de etapas internas.

Independentemente da implementação visual escolhida, o agendamento deve permanecer associado ao `tenant` correspondente ao `slug` acessado.

Durante o fluxo, a cliente deve informar/selecionar:

1. Serviço(s).

2. Modalidade de atendimento, quando a profissional oferecer mais de uma opção.

3. Data disponível.

4. Horário disponível.

5. Nome da cliente.

6. WhatsApp / Telefone.

7. Endereço do atendimento, somente quando a modalidade escolhida for domiciliar.

8. Observação, opcional.

A cliente não precisa criar conta ou realizar login para fazer um agendamento.

Não solicitar e-mail da cliente.

### Serviços e Valores

- Permitir selecionar múltiplos serviços.

- Exibir somente serviços ativos da profissional.

- O valor total deve ser calculado pela soma dos serviços selecionados.

- A duração total deve ser calculada pela soma de `duracaoMinutos` dos serviços selecionados.

- A disponibilidade de horários deve considerar a duração total dos serviços, os intervalos configurados, os bloqueios da agenda e outros agendamentos existentes.

- Antes da criação do agendamento, exibir um resumo contendo:
  - Serviço(s).
  - Valor total.
  - Duração total.
  - Modalidade.
  - Data.
  - Horário.
  - Endereço, quando domiciliar.
  - Informação sobre sinal, quando aplicável.


### Aviso de Privacidade antes de Criar a Reserva

Imediatamente antes da ação final que cria a pré-reserva/agendamento, exibir de forma visível:

**"Ao agendar, seus dados serão utilizados pelo Beleza em Dia e compartilhados com este estabelecimento para administrar sua reserva e entrar em contato sobre o atendimento."**

Abaixo do aviso, disponibilizar links:

- **Política de Privacidade** → `/privacidade`;
- **Termos de Uso** → `/termos`.

A cliente não precisa criar uma conta para agendar.

O aviso deve aparecer antes da criação da reserva e não pode ficar escondido apenas dentro de um modal secundário ou rodapé distante.

A criação do agendamento representa que aquele aviso foi apresentado no fluxo. Para manter rastreabilidade da versão exibida, registrar no agendamento:

- `avisoPrivacidadeVersao` - versão da Política/Aviso de Privacidade exibida naquele agendamento;
- `avisoPrivacidadeExibidoEm` - data/hora em que a reserva foi criada após a apresentação do aviso.

Esses campos não autorizam marketing. Qualquer comunicação promocional futura exige tratamento separado quando aplicável.

Caso a cliente queira entender, acessar, corrigir ou solicitar exclusão de seus dados, o link `/privacidade` deve oferecer a ação **Falar sobre meus dados**.

### Validações e Erros do Agendamento Iniciado pela Cliente

O fluxo público de agendamento deve aplicar todas as regras globais de validação e segurança definidas nesta documentação.

A cliente não precisa criar conta ou realizar login.

Porém, todos os dados informados devem ser validados antes da criação da pré-reserva.

O frontend deve orientar a cliente e impedir entradas obviamente inválidas, enquanto o backend deve repetir todas as validações antes de criar o agendamento.

## Validação do Perfil / Agenda

Antes de permitir iniciar um agendamento, verificar se:

- o `slug` informado existe;
- o estabelecimento correspondente pode ser carregado;
- existem serviços ativos disponíveis;
- existe configuração válida de agenda;
- existe pelo menos uma modalidade de atendimento válida;
- o perfil pertence a um estabelecimento válido.

Caso o perfil não exista, utilizar a mensagem já definida:

**"Agenda não encontrada"**

**"Não encontramos uma agenda associada a este link. Verifique se o endereço está correto."**

Caso exista perfil, mas não seja possível realizar novos agendamentos no momento:

**"Agendamentos indisponíveis no momento."**

Subtexto:

**"Esta profissional ainda não possui horários disponíveis para novas reservas."**

Quando a agenda estiver válida e existirem reservas em outros dias, mas a **data escolhida não possuir nenhum horário disponível**, exibir mensagem específica:

**"Nenhum horário disponível nesta data. Escolha outro dia para continuar."**

Essa mensagem deve ser utilizada tanto quando todos os horários possíveis estiverem ocupados quanto quando bloqueios, duração dos serviços ou regras da agenda fizerem com que não exista nenhum horário válido naquele dia.

Não apresentar erro técnico.

## Serviço(s)

A cliente deve selecionar no mínimo um serviço.

Exibir somente serviços com:

`services.ativo = TRUE`

Não permitir selecionar duas vezes o mesmo serviço.

- **Nenhum serviço selecionado:**

  **"Selecione pelo menos um serviço para continuar."**

Caso um serviço deixe de estar disponível enquanto a cliente estiver realizando o agendamento:

- não criar a reserva utilizando informações antigas;
- atualizar a lista;
- informar a cliente.

Exibir:

**"Um dos serviços selecionados não está mais disponível. Revise sua seleção para continuar."**

O backend deve validar novamente:

- existência do serviço;
- `tenantId` correspondente;
- se o serviço está ativo;
- preço atual;
- duração atual.

Não confiar nos valores enviados pelo navegador.

## Preço dos Serviços

A cliente não deve informar manualmente o preço.

O valor deve vir dos serviços cadastrados pela profissional.

O frontend pode mostrar o cálculo em tempo real, porém o backend deve calcular novamente:

`valorTotal = soma dos serviços selecionados`

Não confiar em valores como:

- preço;
- total;
- valor do sinal;
- duração;

enviados pelo navegador.

Caso esses valores sejam manipulados manualmente, utilizar os valores confiáveis registrados no sistema.

## Duração Total

A duração deve ser calculada a partir da soma de `duracaoMinutos` dos serviços selecionados.

Exemplo:

- Serviço A: 30 minutos;
- Serviço B: 60 minutos.

Duração total:

`90 minutos`

Essa duração completa deve ser considerada ao verificar a disponibilidade.

Não basta verificar se o horário inicial está livre.

Exemplo:

Se a cliente escolher:

`14:00`

para serviços com duração total de:

`2 horas`

o sistema deve verificar disponibilidade de todo o período:

`14:00 até 16:00`

considerando também o intervalo entre atendimentos quando configurado.

## Modalidade de Atendimento

A modalidade disponível deve respeitar `tenants.tipoAtendimento`.

### Profissional atende somente em Salão

Não solicitar escolha de modalidade.

Utilizar automaticamente:

`appointments.tipoAtendimento = salao`

Não permitir que uma requisição manipulada envie:

`domiciliar`

### Profissional atende somente em Domicílio

Não solicitar escolha de modalidade.

Utilizar automaticamente:

`appointments.tipoAtendimento = domiciliar`

Solicitar endereço da cliente.

### Profissional atende em Ambos

Exigir que a cliente escolha:

- **Atendimento no Salão**;
- **Atendimento em Domicílio**.

Caso não selecione:

**"Escolha onde você deseja ser atendida."**

O backend deve aceitar somente:

- `salao`;
- `domiciliar`.

## Atendimento Domiciliar

Quando a modalidade escolhida for domiciliar, o endereço da cliente passa a ser obrigatório.

Exigir os campos necessários definidos pelo fluxo de endereço da reserva.

Caso o endereço esteja ausente:

**"Informe o endereço onde o atendimento será realizado."**

Não permitir criar agendamento domiciliar sem endereço válido.

Campos ocultos de endereço não devem ser exigidos quando o atendimento for no salão.

## Taxa de Deslocamento

Quando existir `taxaDeslocamentoPadrao` configurada para atendimento domiciliar:

- exibir a taxa antes da confirmação da reserva;
- deixar claro que ela será adicionada ao valor da reserva;
- incluir a taxa no resumo final.

A cliente não deve poder alterar manualmente essa taxa.

O backend deve utilizar o valor configurado pela profissional.

Caso não exista taxa:

- não exibir cobrança adicional;
- não inventar valor de deslocamento.

A regra definitiva de composição do valor total com taxa domiciliar deve ser utilizada de forma consistente em:

- resumo;
- cálculo do sinal;
- valor registrado no agendamento;
- pagamento Mercado Pago.

## Data

A cliente deve selecionar somente uma data válida e disponível.

Não permitir:

- data inválida;
- data passada;
- dia fechado;
- dia sem disponibilidade;
- data fora das regras configuradas pela profissional.

- **Data não selecionada:**

  **"Selecione uma data para o atendimento."**

- **Data inválida ou passada:**

  **"Selecione uma data válida para o atendimento."**

## Antecedência Mínima

Respeitar:

`tenants.antecedenciaMinimaAgendamentoHoras`

Exemplo:

Como a antecedência mínima do MVP é fixa em:

`1 hora`

se forem 14:00, não permitir um novo agendamento para 14:30. Um horário às 15:00 pode ser oferecido se todas as demais regras também forem válidas.

Exibir:

**"Este horário não respeita a antecedência mínima para agendamento. Escolha outro horário."**

A verificação deve ocorrer novamente no backend no momento da criação da reserva.

## Horário

Exibir somente horários realmente disponíveis para:

- data selecionada;
- serviços selecionados;
- duração total;
- modalidade aplicável;
- disponibilidade configurada;
- intervalo entre atendimentos;
- bloqueios;
- outros agendamentos ativos.

- **Horário não selecionado:**

  **"Selecione um horário para o atendimento."**

- **Horário inválido:**

  **"Selecione um horário válido."**

Não aceitar manualmente um horário que não tenha sido apresentado como disponível.

O backend deve validar novamente a disponibilidade antes de salvar.

## Horário que Ficou Indisponível

A disponibilidade exibida na tela representa o estado conhecido naquele momento.

Outro agendamento pode ocupar o horário antes da conclusão.

Por isso, imediatamente antes de criar a pré-reserva, o backend deve verificar novamente a disponibilidade.

Caso o horário tenha sido ocupado:

**"Este horário acabou de ficar indisponível. Escolha outro horário."**

Após esse erro:

- não apagar nome;
- não apagar telefone;
- não apagar serviços;
- não apagar modalidade;
- não apagar endereço;
- manter os demais dados preenchidos;
- atualizar apenas os horários disponíveis;
- pedir que a cliente escolha outro horário.

A proteção completa contra duas reservas simultâneas será definida também na seção global de concorrência de agendamentos.

## Modo "Combinar no WhatsApp"

Quando o dia estiver configurado com:

`modoExpediente = whatsapp`

seguir a regra definida na configuração da Agenda Flexível.

Nesse modo:

- não apresentar horários fixos inexistentes como se estivessem disponíveis;
- informar que o horário daquele dia será combinado diretamente com a profissional;
- disponibilizar a ação apropriada para contato pelo WhatsApp;
- não inventar um horário fictício apenas para permitir a criação de um agendamento;
- não criar uma pré-reserva sem horário definido apenas para registrar o contato;
- depois que cliente e profissional combinarem data/horário pelo WhatsApp, a profissional deve registrar o atendimento pelo fluxo de criação manual, utilizando um horário real e novamente validado.

Texto sugerido:

**"O horário deste dia é combinado diretamente com a profissional pelo WhatsApp."**

O sistema deve diferenciar esse comportamento dos dias que possuem horários selecionáveis normalmente.

## Nome da Cliente

O nome é obrigatório.

Não aceitar:

- campo vazio;
- somente espaços;
- caracteres invisíveis;
- conteúdo claramente incompatível com um nome.

- **Campo vazio:**

  **"Informe seu nome para continuar."**

- **Nome inválido:**

  **"Informe um nome válido."**

Remover espaços desnecessários no início e no final.

## WhatsApp / Telefone

O telefone é obrigatório.

Aplicar máscara:

`(00) 00000-0000`

Validar:

- quantidade de dígitos;
- DDD;
- conteúdo numérico;
- formato normalizado.

Não aceitar letras.

- **Campo vazio:**

  **"Informe seu número de WhatsApp."**

- **Número inválido:**

  **"Informe um número de WhatsApp válido com DDD."**

O backend deve normalizar o número antes de armazenar.

## Observação

A observação é opcional.

Caso seja preenchida:

- remover espaços desnecessários;
- aplicar o limite definido pelo sistema;
- aplicar as regras globais de tratamento de texto;
- não aceitar somente espaços como conteúdo real.

Uma observação vazia não deve impedir a criação da reserva.

## Resumo Antes da Confirmação

Antes de criar a pré-reserva, apresentar um resumo contendo:

- serviço(s);
- preço de cada serviço, quando apropriado;
- valor total;
- duração total;
- modalidade;
- taxa de deslocamento, quando aplicável;
- data;
- horário;
- endereço, quando domiciliar;
- valor do sinal, quando aplicável;
- restante a pagar no atendimento, quando aplicável.

A cliente deve conseguir revisar essas informações antes de continuar.

## Sinal Antecipado

Se:

`modeloCobrancaSinal = sinal_antecipado`

exibir claramente antes da criação da reserva:

- que existe sinal obrigatório;
- valor do sinal;
- valor total;
- valor restante após o sinal.

O valor do sinal deve ser calculado pelo backend utilizando as configurações atuais do estabelecimento.

A cliente não deve informar ou alterar o valor do sinal.

## Sem Sinal

Se:

`modeloCobrancaSinal = sem_sinal_presencial`

não exibir:

- botão **Pagar com Mercado Pago**;
- mensagem de pagamento/sinal pendente;
- cobrança antecipada inexistente.

Após criar a pré-reserva, seguir o fluxo de confirmação sem sinal definido em `/agendamento/[token]`.

## Criação da Pré-Reserva

Ao confirmar os dados, o frontend deve enviar somente as informações necessárias para o backend identificar a solicitação.

Antes de persistir, o backend deve validar novamente:

1. `tenant`;
2. serviço(s);
3. modalidade;
4. data;
5. horário;
6. duração total;
7. antecedência mínima;
8. disponibilidade;
9. bloqueios;
10. conflitos com outros agendamentos;
11. dados da cliente;
12. endereço quando domiciliar;
13. valores;
14. configuração de sinal.

O backend deve ser a fonte da verdade.

## Estado de Carregamento ao Criar

Ao clicar no botão final para criar a reserva:

- desabilitar o botão;
- impedir múltiplos cliques;
- impedir criação duplicada;
- exibir indicador de carregamento.

Texto sugerido:

**"Criando pré-reserva..."**

Não permitir que a cliente altere os campos enquanto a criação estiver sendo concluída, quando isso puder gerar inconsistência.

## Erro de Validação

Caso o backend rejeite algum dado:

- não apagar o formulário;
- identificar o problema;
- destacar o campo correspondente quando possível;
- permitir correção.

Não transformar uma validação de campo em erro interno genérico.

## Erro de Conexão ao Criar

Exibir:

**"Não foi possível criar sua pré-reserva. Verifique sua conexão e tente novamente."**

Em seguida:

- manter todos os dados preenchidos;
- restaurar o botão;
- permitir nova tentativa;
- não assumir que a reserva foi criada.

## Erro Interno ao Criar

Exibir:

**"Não foi possível criar sua pré-reserva agora. Tente novamente em alguns instantes."**

Não apresentar:

- stack trace;
- resposta bruta da API;
- erro interno do banco/Convex;
- erro interno de função/SDK;
- erro de JSON.

## Resposta Indeterminada

Caso a conexão seja interrompida depois do envio e o frontend não consiga determinar se a reserva foi criada:

- não criar automaticamente outra reserva sem verificar o resultado anterior;
- consultar o backend quando existir mecanismo seguro para identificar a operação;
- evitar duplicidade.

Exibir temporariamente:

**"Não foi possível confirmar se sua reserva foi criada. Aguarde um instante e tente atualizar."**

Não informar sucesso ou falha sem certeza.

## Sucesso

Somente após confirmação válida do backend:

- considerar a pré-reserva criada;
- gerar/utilizar o `appointments.id`;
- redirecionar para:

`/agendamento/[token]`

A página `/agendamento/[token]` deve então seguir o fluxo já documentado para:

- sinal obrigatório;
- confirmação sem sinal;
- reserva confirmada;
- cancelamento;
- expiração;
- erros.

## Regra de Segurança

A cliente nunca deve conseguir alterar pelo navegador e tornar confiáveis valores como:

- `tenantId`;
- preço;
- duração;
- valor do sinal;
- status;
- `mercadoPagoPreferenceId`;
- `paymentId`;
- taxa de deslocamento;
- disponibilidade.

Essas informações devem ser obtidas, calculadas ou validadas pelo backend a partir dos dados reais do sistema.




### Dados usados no Perfil Público

- **Tabela `tenants`:**
  - `id`.
  - `slug`.
  - `nomeProfissional`.
  - `nomeEstabelecimento`.
  - `bioProfissional`.
  - `fotoPerfilUrl`.
  - `tipoAtendimento`.
  - `enderecoSalao`.
  - `regioesAtendidas`.
  - `taxaDeslocamentoPadrao`.
  - `modeloCobrancaSinal`.
  - `tipoValorSinal`.
  - `valorSinal`.

- **Tabela `tenant_portfolio`:**
  - `tipo`.
  - `midiaUrl`.
  - `thumbnailUrl`.
  - `duracaoSegundos`.
  - `ordemExibicao`.

- **Tabela `services`:**
  - `id`.
  - `categoria`.
  - `nome`.
  - `descricao`.
  - `preco`.
  - `duracaoMinutos`.
  - `imagemPadraoUrl`.
  - `imagemUrl`.
  - `ordemExibicao`.
  - `ativo`.

- **Tabela `availability`:**
  - `diaSemana`.
  - `ativo`.
  - `janelas`.
  - `modoExpediente`.

### Tratamento de Erros da Página Pública

A página pública nunca deve exibir mensagens técnicas, códigos internos, exceções, stack traces ou erros de JSON para a cliente ou profissional.

Por exemplo, nunca exibir mensagens como:

- `Unexpected end of JSON input`.
- `Internal Server Error`.
- `TypeError`.
- `SyntaxError`.
- Stack traces.
- Respostas brutas da API.

- **Slug inexistente:**

  Exibir:

  **"Agenda não encontrada"**

  **"Não encontramos uma agenda associada a este link. Verifique se o endereço está correto."**

- **Falha de conexão:**

  Exibir:

  **"Não foi possível carregar a agenda"**

  **"Verifique sua conexão com a internet e tente novamente."**

  Disponibilizar botão **Tentar novamente**.

- **Erro interno do sistema:**

  Exibir:

  **"Não foi possível abrir esta agenda"**

  **"Ocorreu um problema ao carregar as informações. Tente novamente em alguns instantes."**

  Disponibilizar botão **Tentar novamente**.

- Caso futuramente exista uma configuração para desativar temporariamente o perfil público, exibir:

  **"Agenda indisponível"**

  **"Esta agenda não está disponível no momento."**

- Erros técnicos devem ser registrados somente internamente para diagnóstico.

- O frontend deve tratar respostas vazias, inválidas ou que não estejam em JSON sem apresentar o conteúdo técnico do erro ao usuário.

### Responsividade da Página Pública

- **Modo Web:**
  - Utilizar conteúdo centralizado e largura máxima confortável.
  - Destacar informações da profissional e botão de agendamento.
  - Exibir serviços e portfólio aproveitando a largura disponível.
  - Evitar áreas excessivamente vazias.
  - O botão **Agendar Horário** deve permanecer facilmente identificável.
  - Adicionar labels com o nome dos campos, e nao aparecendo dentro do placholder. Exemplo: 'Nome da Cliente' acima do campo e nao dentro, assim com todos os campos.

- **Modo Tablet / iPad:**
  - Adaptar grids de serviços e portfólio para a largura intermediária.
  - Manter informações da profissional centralizadas e bem distribuídas.
  - Evitar simplesmente reduzir a versão Web.
  - Garantir boa utilização tanto em orientação retrato quanto paisagem.

- **Modo Mobile:**
  - Utilizar layout de uma coluna.
  - Foto, nome, bio e informações principais devem aparecer antes dos serviços.
  - Serviços devem ser exibidos em cards adaptados à largura da tela.
  - Portfólio deve utilizar grade responsiva, preferencialmente com 2 colunas quando houver espaço.
  - Não permitir rolagem horizontal.
  - Botões principais devem possuir tamanho confortável para toque.
  - O botão para iniciar o agendamento deve permanecer claramente visível.
  - Respeitar `safe-area` e barras de navegação do dispositivo.

---

## Regra Global - Concorrência e Integridade dos Horários

As regras desta seção devem ser aplicadas a qualquer operação que possa criar, confirmar, remarcar ou ocupar um horário na agenda.

Elas se aplicam tanto a:

- agendamentos iniciados pela cliente através do perfil público;
- agendamentos criados manualmente pela profissional;
- remarcações futuras;
- demais operações que possam ocupar novamente um intervalo da agenda.

O objetivo é impedir que duas reservas ocupem o mesmo período mesmo quando as requisições ocorrerem praticamente ao mesmo tempo.

### A Disponibilidade Mostrada na Tela não é Definitiva

Um horário apresentado como disponível representa apenas o estado conhecido no momento em que a página consultou a agenda.

Exemplo:

1. Cliente A abre a agenda às 13:59.
2. Cliente B abre a agenda às 13:59.
3. Para as duas, `14:00` aparece disponível.
4. Cliente A confirma primeiro.
5. Cliente B confirma alguns segundos depois.

A Cliente B não pode conseguir criar uma segunda reserva para o mesmo período apenas porque o horário estava disponível quando sua página foi carregada.

Por isso, o backend deve validar novamente a disponibilidade imediatamente antes de persistir qualquer nova reserva.

### Regra Principal

A criação de um agendamento deve seguir conceitualmente:

1. receber a solicitação;

2. validar os dados enviados;

3. recalcular:
   - serviços;
   - duração;
   - preço;
   - sinal;
   - modalidade;
   - intervalo necessário;

4. consultar novamente a disponibilidade;

5. verificar conflitos;

6. criar o agendamento somente se o intervalo continuar livre.

A verificação de disponibilidade e a criação da reserva devem ocorrer de forma segura contra requisições concorrentes.

Não deve existir um intervalo inseguro em que:

`verifica disponibilidade → outra reserva ocupa → primeira requisição salva mesmo assim`

### Operação Atômica / Transacional

A verificação final de conflito e a criação do agendamento devem utilizar uma operação transacional, mecanismo de bloqueio ou estratégia equivalente que impeça duas requisições concorrentes de confirmarem o mesmo intervalo.

A tecnologia específica pode ser definida durante a implementação.

O requisito funcional é:

**somente uma das requisições concorrentes pode conseguir ocupar o mesmo horário.**

A outra deve receber uma resposta de conflito controlada.

Não confiar apenas em uma consulta feita anteriormente pelo frontend.

### Verificação do Intervalo Completo

A verificação não deve considerar somente o horário inicial.

Deve considerar:

- `dataInicio`;
- `dataFim`;
- duração total dos serviços;
- intervalo entre atendimentos, quando configurado.

Exemplo:

Reserva existente:

`14:00 até 15:30`

Nova tentativa:

`15:00 até 16:00`

Existe conflito, mesmo que os horários iniciais sejam diferentes.

Também existe conflito em:

Reserva existente:

`14:00 até 16:00`

Nova tentativa:

`14:30 até 15:00`

E em:

Reserva existente:

`14:00 até 15:00`

Nova tentativa:

`13:30 até 14:30`

### Regra de Sobreposição

Dois intervalos possuem conflito quando:

`novoInicio < existenteFim`

e:

`novoFim > existenteInicio`

Quando as duas condições forem verdadeiras, o novo agendamento não deve ser criado.

Exemplo sem conflito:

Reserva existente:

`14:00 até 15:00`

Nova reserva:

`15:00 até 16:00`

Esse caso pode ser permitido quando não existir intervalo adicional configurado entre atendimentos.

### Intervalo entre Atendimentos

Quando `intervaloEntreAtendimentosMinutos` estiver configurado, esse tempo também deve ser considerado na disponibilidade.

Exemplo:

Agendamento:

`14:00 até 15:00`

Intervalo configurado:

`15 minutos`

O próximo horário disponível somente pode começar às:

`15:15`

Uma tentativa para:

`15:05`

deve ser considerada conflito.

A mesma regra deve ser aplicada no backend, não somente na geração dos horários apresentados no frontend.

### Status que Ocupam Horário

Enquanto válidos, os seguintes status devem bloquear o período correspondente:

- `pendente`;
- `confirmado`.

Uma pré-reserva `pendente` continua ocupando aquele horário durante seu prazo válido de confirmação.

Isso impede que outra pessoa reserve o mesmo horário enquanto a primeira cliente ainda está dentro do período permitido para confirmar ou pagar.

### Status que Liberam Horário

Os seguintes status não devem continuar bloqueando disponibilidade futura:

- `cancelado`;
- `expirado`.

Quando um agendamento mudar para um desses estados, o horário deve voltar a poder ser utilizado, desde que continue compatível com:

- disponibilidade da agenda;
- antecedência mínima;
- bloqueios;
- demais agendamentos;
- regras atuais da profissional.

### Agendamento Finalizado

`finalizado` representa um atendimento que já ocorreu.

Ele deve permanecer registrado para histórico, faturamento e demais cálculos.

Não deve ser apagado para liberar horário.

Como representa um intervalo passado, normalmente não interfere na disponibilidade de novos horários futuros.

### Pré-Reserva Expirada

Antes de considerar um agendamento `pendente` como conflito, o backend deve verificar se seu prazo ainda é válido.

A regra atual é:

`appointments.criadoEm + 30 minutos`

Se o prazo já tiver terminado e a pré-reserva ainda estiver tecnicamente marcada como `pendente`:

- considerar a regra de expiração;
- atualizar/tratar o agendamento como `expirado`;
- liberar o horário;
- somente então continuar a verificação de disponibilidade.

Um registro pendente vencido não deve bloquear a agenda indefinidamente por falta de atualização visual.

### Bloqueios Manuais

A validação deve considerar também `blocked_times`.

Se existir um bloqueio que intercepte qualquer parte do intervalo solicitado:

- não permitir criar a reserva;
- não apresentar o horário como disponível.

Exemplo:

Bloqueio:

`14:30 até 15:00`

Reserva solicitada:

`14:00 até 15:30`

Resultado:

**indisponível**

### Disponibilidade Semanal

Mesmo que não exista conflito com outro agendamento, o novo intervalo precisa continuar dentro da disponibilidade configurada pela profissional.

Exemplo:

Expediente:

`09:00 até 18:00`

Serviço:

`17:30 até 18:30`

O início está dentro do expediente, mas o término não.

Portanto:

**não permitir a reserva.**

A duração completa do atendimento deve caber no período disponível.

### Antecedência Mínima

A validação final também deve verificar novamente:

`antecedenciaMinimaAgendamentoHoras`

Não confiar apenas na lista de horários que foi carregada anteriormente.

Exemplo:

A cliente abriu a página quando um horário ainda respeitava a antecedência mínima, permaneceu muito tempo na tela e tentou concluir depois.

Se no momento da criação a antecedência não for mais suficiente:

- não criar a reserva;
- solicitar outro horário.

Mensagem:

**"Este horário não respeita mais a antecedência mínima para agendamento. Escolha outro horário."**

### Serviço ou Configuração Alterados Durante o Agendamento

A profissional pode alterar um serviço ou sua agenda enquanto uma cliente está com o formulário público aberto.

Antes de criar a reserva, o backend deve verificar novamente:

- se todos os serviços continuam existentes;
- se continuam ativos;
- seus preços atuais;
- suas durações atuais;
- disponibilidade atual;
- modalidade;
- regras de sinal.

Caso a alteração torne a reserva impossível:

não utilizar silenciosamente dados antigos armazenados no navegador.

Exemplo:

**"As informações desta reserva foram atualizadas. Revise os dados antes de continuar."**

### Conflito na Criação pela Cliente

Caso outra reserva ocupe o horário antes da conclusão:

não criar a nova pré-reserva.

Exibir:

**"Este horário acabou de ficar indisponível. Escolha outro horário."**

Após o conflito:

- manter serviços selecionados;
- manter nome;
- manter WhatsApp;
- manter modalidade;
- manter endereço;
- manter observação;
- manter os demais dados válidos;

e atualizar:

- horários disponíveis.

A cliente deve precisar escolher somente um novo horário quando os demais dados continuarem válidos.

### Conflito na Criação pela Profissional

A mesma proteção deve existir no modal **+ Novo Agendamento**.

Mesmo sendo a própria profissional criando manualmente:

- verificar a disponibilidade novamente no backend;
- não permitir sobreposição com outra reserva;
- não permitir ignorar silenciosamente um horário já ocupado.

Caso exista conflito:

**"Este horário não está mais disponível. Selecione outro horário."**

Manter os demais campos preenchidos.

### Requisições Simultâneas

Se duas requisições tentarem criar o mesmo horário praticamente ao mesmo tempo:

- uma pode ser concluída com sucesso;
- a outra deve ser rejeitada como conflito.

Nunca permitir:

`Cliente A → sucesso`

e:

`Cliente B → sucesso`

para o mesmo período incompatível.

### Remarcação

Quando futuramente um agendamento for remarcado:

- verificar a disponibilidade do novo horário antes de liberar definitivamente o horário antigo;
- evitar perder o agendamento original caso o novo horário esteja indisponível;
- não concluir a remarcação parcialmente.

A operação deve possuir comportamento consistente.

Se o novo horário estiver ocupado:

**"Não foi possível remarcar porque o novo horário não está mais disponível."**

O agendamento atual deve permanecer intacto.

### Atualizações Simultâneas

A proteção contra concorrência não se limita à criação.

Também deve considerar operações simultâneas como:

- cancelar enquanto outra operação confirma;
- confirmar enquanto a reserva está expirando;
- marcar como finalizado enquanto outra operação tenta cancelar;
- remarcar enquanto outro processo altera o mesmo agendamento.

Antes de aplicar uma mudança importante, o backend deve verificar o estado atual do registro.

Não confiar apenas no status que o frontend carregou anteriormente.

### Exemplo - Confirmação após Expiração

Situação:

1. a cliente abre `/agendamento/[token]`;
2. a página mostra `pendente`;
3. o prazo termina;
4. sem atualizar a página, a cliente clica em **Confirmar Agendamento**.

O frontend antigo ainda acredita que a reserva está pendente.

O backend deve verificar novamente o prazo.

Se já expirou:

- não confirmar;
- alterar/tratar como `expirado`;
- liberar o horário.

Exibir:

**"Esta pré-reserva expirou e o horário não está mais reservado."**

### Exemplo - Pagamento no Limite da Expiração

Caso exista pagamento sendo processado próximo ao momento de expiração:

- não confiar apenas no cronômetro visual;
- consultar o estado real da reserva e do pagamento;
- evitar marcar como `expirado` um pagamento que já tenha sido validamente aprovado quando a regra do gateway indicar que a transação ocorreu dentro do período permitido;
- evitar confirmar pagamento inexistente apenas porque a tela informou que ele estava sendo processado.

A definição final deve vir do backend e do estado validado no Mercado Pago.

### Duplo Clique

Botões responsáveis por operações de criação ou alteração devem ser desabilitados enquanto uma requisição estiver sendo processada.

Isso inclui:

- criar pré-reserva;
- confirmar;
- cancelar;
- remarcar;
- finalizar;
- gerar pagamento.

Porém, impedir duplo clique no frontend não substitui a proteção no backend.

Mesmo duas requisições iguais enviadas manualmente devem ser tratadas de forma segura.

### Repetição da Mesma Requisição

Quando uma requisição for repetida devido a:

- duplo clique;
- atualização;
- retry automático;
- falha de conexão;
- reenvio acidental;

o sistema deve evitar criar recursos duplicados quando a operação anterior já tiver sido concluída.

Quando necessário, utilizar estratégia de idempotência ou mecanismo equivalente no backend.

A implementação específica pode ser definida posteriormente, mas o comportamento esperado é:

**uma mesma ação lógica não deve gerar dois agendamentos ou dois pagamentos acidentalmente.**

### Falha Depois de Criar a Reserva

Situação:

1. backend cria a reserva;
2. conexão com o navegador cai antes da resposta;
3. cliente não sabe se funcionou;
4. cliente clica novamente.

O sistema não deve simplesmente criar uma segunda reserva sem verificar a operação anterior quando existir mecanismo de identificação aplicável.

Caso o estado seja indeterminado, apresentar:

**"Não foi possível confirmar se a reserva foi criada. Aguarde um instante e tente atualizar."**

Nunca afirmar que houve falha apenas porque o frontend não recebeu a resposta.

### Fonte da Verdade

A fonte definitiva para decidir se um horário pode ser ocupado deve ser o backend.

O frontend:

- mostra disponibilidade;
- melhora a experiência;
- bloqueia escolhas obviamente inválidas.

O backend:

- recalcula;
- revalida;
- verifica conflitos;
- aplica regras;
- persiste a reserva.

### Regra Final

Nenhum horário deve ser considerado definitivamente reservado até que o backend conclua com sucesso a operação de criação ou alteração correspondente.

Da mesma forma, nenhum horário deve ser considerado liberado apenas porque o frontend mudou visualmente o status.

A mudança deve ser confirmada pelo backend.

---
## 2. Modal - Novo Agendamento (Criação Manual)

Aberto ao clicar em **+ Novo Agendamento**.

Permite que a profissional crie uma pré-reserva e gere o link de confirmação.

### Campos

- **Nome da Cliente** - obrigatório.
- **WhatsApp / Telefone** - obrigatório.
- **Tipo de Atendimento** - definido de acordo com o que o estabelecimento oferece:
  - Se `tenants.tipoAtendimento = salao`, usar Salão automaticamente.
  - Se `tenants.tipoAtendimento = domiciliar`, usar Domicílio automaticamente.
  - Se `tenants.tipoAtendimento = ambos`, permitir escolha entre Salão e Domicílio.
- **Endereço Completo** - visível e obrigatório apenas quando o agendamento for domiciliar.
- **Notas Internas / Observações** - opcional.
- **Serviços** - obrigatório e com seleção múltipla.
- **Data e Horário** - obrigatório.
- **Valor do Sinal** - somente leitura e exibido se houver cobrança de sinal. O valor é calculado pela configuração do estabelecimento e pelo total do agendamento.

### Cálculos

- `precoCobrado` = soma do preço dos serviços selecionados no momento do agendamento.
- `dataFim` = `dataInicio` + soma de `duracaoMinutos` dos serviços.
- `valorSinalPago` começa em `0.00` e só passa a representar dinheiro recebido após confirmação real do pagamento.

### Link de Confirmação

Ao clicar em salvar e gerar link:

- O backend gera um `id` único para o agendamento.
- O registro começa como `pendente`.
- O sistema monta a URL `/agendamento/[token]` dinamicamente.
- A URL completa não precisa ser gravada no banco.

- **Dados usados:**
  - **Tabela `appointments`:**
    - `id` - gerado pelo backend.
    - `tenantId` - estabelecimento responsável.
    - `clienteNome` - informado.
    - `clienteTelefone` - informado.
    - `tipoAtendimento` - `salao` ou `domiciliar` para este agendamento específico.
    - `enderecoCliente` - JSON, somente quando domiciliar.
    - `precoCobrado` - calculado pela soma dos serviços.
    - `valorSinalPago` - inicia em `0.00`.
    - `dataInicio` - informado.
    - `dataFim` - calculado.
    - `status` - inicia como `pendente`.
    - `paymentId` - permanece `NULL` até uma cobrança Mercado Pago ser criada.
    - `observacao` - opcional.
    - `criadoEm` - automático.
  - **Tabela `appointment_services`:** uma linha para cada serviço selecionado.
    - `id` - gerado pelo backend.
    - `appointmentId` - agendamento criado.
    - `serviceId` - serviço selecionado.
    - `precoCobrado` - snapshot do preço daquele serviço no momento da reserva.
    - `duracaoMinutos` - snapshot da duração no momento da reserva.
    - `criadoEm` - automático.
  - **Tabela `services`:**
    - `id`.
    - `nome`.
    - `preco`.
    - `duracaoMinutos`.
    - `categoria`.
    - `ativo`.
  - **Tabela `tenants`:**
    - `tipoAtendimento`.
    - `modeloCobrancaSinal`.
    - `tipoValorSinal`.
    - `valorSinal`.

- **Mensagens de erros e validações:**
  - **Nome vazio:** **"Informe o nome completo da cliente."**
  - **Telefone:** máscara `(00) 00000-0000`.
  - **Telefone inválido:** **"Informe um número de WhatsApp válido com DDD."**
  - **Nenhum serviço:** **"Selecione ao menos um serviço para prosseguir."**
  - Não permitir selecionar duas vezes o mesmo serviço no mesmo agendamento, respeitando a restrição única do banco.
  - Exibir somente serviços `ativo = TRUE`.
  - **Data passada:** **"Selecione uma data e horário futuros."**
  - Verificar disponibilidade considerando toda a duração dos serviços, intervalos configurados e bloqueios existentes.
  - **Conflito:** **"Horário indisponível! O tempo total dos serviços conflita com outro atendimento já agendado."**
  - Se domiciliar e endereço estiver vazio: **"Informe o endereço do atendimento domiciliar."**
  - Se estabelecimento atende somente em salão, não permitir salvar `tipoAtendimento = domiciliar`.
  - Se atende somente em domicílio, não permitir salvar `tipoAtendimento = salao`.
  - **Erro ao criar:** **"Não foi possível gerar a pré-reserva. Tente novamente."**
  - **Sucesso:** **"Agendamento criado e link de confirmação gerado!"**

### Select de Serviços

- Seleção múltipla com checkboxes ou chips.
- Agrupar por `categoria`.
- Permitir busca por nome.
- Permitir filtro por categoria.
- Exibir resumo em tempo real:
  - Serviços selecionados.
  - Valor total.
  - Duração total.
  - Sinal calculado, quando aplicável.

- **Ajustes a serem feitos nas telas atuais:**
  - **Modo Web:**
    - Aplicar overlay escurecido + `backdrop-blur` ao abrir o modal.
    - Corrigir dropdown para não cobrir incorretamente outros campos.
    - Exibir resumo em tempo real do valor e duração.
    - Adicionar escolha de modalidade quando o tenant possuir `ambos`.
    - Adicionar endereço condicional para domicílio.
  - **Modo Mobile:**
    - Aplicar overlay e impedir interação com Dashboard ao fundo.
    - Garantir que dropdown fique dentro da largura da tela.
    - Não permitir rolagem horizontal.
    - Adicionar rolagem interna do modal.
    - Manter ação principal com espaço acima da bottom bar.
    - Exibir resumo em tempo real do valor e duração.

---



## 3. Modal - Link de Confirmação Gerado

Aberto automaticamente após **Salvar e Gerar Link**.

A modal confirma que a pré-reserva foi criada e disponibiliza formas de compartilhar o link individual de confirmação com a cliente.

O agendamento já existe neste momento e permanece com status `pendente` até ser confirmado, pago, cancelado ou expirado.

### Estrutura do Link

- O banco/Convex armazena `appointments.id` como identificador interno e `appointments.tokenPublico` como identificador público seguro da reserva.

- O `tokenPublico` deve ser aleatório, suficientemente imprevisível e não sequencial.

- O frontend/backend monta a URL:

  - `/agendamento/[token]`

- Exemplo conceitual:

  - `https://belezaemdia.com/agendamento/TOKEN_PUBLICO_SEGURO`

- A URL completa não precisa ser salva no banco; basta persistir o token público e montar a URL com a origem confiável da aplicação.

- Esse link pertence a uma reserva específica e não deve ser confundido com o link público da agenda `/{slug}`.

- O link público `/{slug}` permite iniciar um novo agendamento.

- O link `/agendamento/[token]` permite visualizar e gerenciar somente a reserva correspondente, conforme as ações permitidas pelo estado atual.

### Informações exibidas no Modal

- Título **Link de Confirmação Gerado**.

- Confirmação visual:

  **"Pré-reserva cadastrada!"**

- URL `/agendamento/[token]`.

- Botão **Copiar Link**.

- Botão **Enviar no WhatsApp**.

- Botão **Copiar Texto Pronto**.

- Botão **Concluir**.

- Botão **X** para fechar.

### Enviar no WhatsApp

O botão **Enviar no WhatsApp** deve abrir a conversa com `appointments.clienteTelefone` utilizando uma mensagem pré-formatada.

No MVP, utilizar compartilhamento/link do WhatsApp com mensagem previamente preenchida.

A mensagem não é enviada automaticamente pelo navegador. A profissional ainda confirma o envio dentro do WhatsApp.

Envio totalmente automático pelo sistema depende de integração oficial com a plataforma WhatsApp Business e não faz parte do fluxo básico atual.

A mensagem pode seguir um formato semelhante:

**"Olá, [cliente]! Sua pré-reserva no [estabelecimento] foi criada para [data] às [horário]. Acesse o link abaixo para confirmar sua reserva: [URL]"**

Quando houver cobrança de sinal, adaptar o texto:

**"Olá, [cliente]! Sua pré-reserva no [estabelecimento] foi criada para [data] às [horário]. Para confirmar o horário, acesse o link abaixo e realize o pagamento do sinal dentro do prazo informado: [URL]"**

### Copiar Texto Pronto

- Copiar a mesma mensagem utilizada para compartilhamento pelo WhatsApp.

- O conteúdo deve se adaptar automaticamente a:
  - reservas com sinal;
  - reservas sem sinal.

- Não incluir dados técnicos ou informações internas do sistema.

### Expiração da Pré-Reserva

Toda pré-reserva criada como `pendente` possui prazo de **30 minutos** para ser confirmada.

O prazo é calculado utilizando:

`appointments.criadoEm + 30 minutos`

Não é necessário criar uma coluna adicional para armazenar a expiração enquanto essa regra permanecer fixa em 30 minutos.

#### Com sinal

- A cliente possui 30 minutos para realizar o pagamento do sinal.

- Após confirmação real do pagamento:
  - `pendente` → `confirmado`.

#### Sem sinal

- A cliente possui 30 minutos para acessar o link e clicar em **Confirmar Agendamento**.

- Ao confirmar:
  - `pendente` → `confirmado`.

#### Caso nenhuma ação seja realizada

Após os 30 minutos:

- `pendente` → `expirado`.

- O horário volta a ficar disponível.

- O link continua podendo ser aberto, mas deve mostrar que a pré-reserva expirou.

- Não permitir confirmação ou pagamento da mesma pré-reserva expirada.

O cronômetro visual não é a fonte da verdade.

A expiração deve ser validada pelo backend e também ao carregar a reserva.

### Funcionamento no Modo de Teste

O fluxo de teste deve funcionar completamente mesmo sem backend real.

Quando uma pré-reserva mock for criada:

- armazenar os dados do agendamento no mecanismo de mock utilizado pelo sistema;

- gerar um identificador mock válido;

- permitir abrir `/agendamento/[token]`;

- recuperar os dados mock correspondentes;

- exibir normalmente a Tela Pública / Confirmação de Reserva;

- permitir testar os estados:
  - pendente;
  - confirmado;
  - cancelado;
  - expirado;
  - pagamento pendente;
  - pagamento confirmado simulado.

A página não deve tentar exclusivamente consultar um backend inexistente durante o modo de teste.

Não exibir mensagens como:

- `Unexpected end of JSON input`;
- `Failed to execute 'json' on 'Response'`;
- erros de API;
- stack traces.

### Dados usados

- **Tabela `appointments`:**
  - `id`.
  - `tenantId`.
  - `clienteNome`.
  - `clienteTelefone`.
  - `precoCobrado`.
  - `dataInicio`.
  - `dataFim`.
  - `status`.
  - `criadoEm`.

- **Tabela `appointment_services`:**
  - `appointmentId`.
  - `serviceId`.
  - `precoCobrado`.
  - `duracaoMinutos`.

- **Tabela `services`:**
  - `id`.
  - `nome`.

- **Tabela `tenants`:**
  - `nomeEstabelecimento`.
  - `modeloCobrancaSinal`.

### Mensagens de erros e validações

- **Sucesso:** **"Agendamento criado e link de confirmação gerado!"**

- **Copiar Link:** Toast **"Link de confirmação copiado!"**

- **Falha ao copiar:** **"Não foi possível copiar o link. Tente novamente."**

- **Copiar Texto Pronto:** Toast **"Texto pronto copiado!"**

- **Falha ao abrir WhatsApp:** **"Não foi possível abrir o WhatsApp. Copie o link e envie manualmente."**

- Se a profissional fechar pelo X, `ESC` ou **Concluir**, o agendamento não é apagado.

- O agendamento permanece na Dashboard como `pendente`.

- O link pode ser recuperado posteriormente pelo Modal de Detalhes do Agendamento.

### Ajustes a serem feitos nas telas atuais

- **Modo Web:**

  - Remover qualquer aviso ou Toast contendo **"teste"** da interface final.

  - Manter a modal centralizada horizontal e verticalmente.

  - Manter overlay escurecido e `backdrop-blur` sobre a Dashboard.

  - Organizar URL e botão **Copiar Link** de forma que URLs longas não quebrem o layout.

  - Permitir quebra controlada ou truncamento visual da URL, sem alterar seu valor real.

  - Manter **Enviar no WhatsApp** como ação de destaque.

  - Manter **Copiar Texto Pronto** como ação secundária.

  - Manter **Concluir** claramente identificado.

  - Garantir que **Concluir** feche o modal e atualize a Dashboard.

- **Modo Tablet / iPad:**

  - Utilizar o mesmo padrão visual do Web.

  - Centralizar o modal horizontal e verticalmente.

  - Manter largura confortável sem ocupar toda a tela.

  - Garantir que URLs longas não provoquem rolagem horizontal.

  - Manter os botões em largura adequada para toque.

- **Modo Mobile:**

  - Alterar o comportamento atual de modal fixado no rodapé.

  - Não utilizar `bottom sheet`.

  - Centralizar o modal vertical e horizontalmente.

  - Manter margem segura nas laterais.

  - Aplicar overlay escurecido e `backdrop-blur` ao conteúdo da Dashboard.

  - Organizar a URL sem quebrar caracteres de forma desordenada.

  - Não permitir rolagem horizontal.

  - Manter os botões em largura total:
    - **Enviar no WhatsApp**;
    - **Copiar Texto Pronto**;
    - **Concluir**.

  - Caso a altura disponível seja pequena, permitir rolagem interna no modal.

  - Respeitar `safe-area`.

  - Garantir que nenhum botão fique escondido pela bottom bar.

---

## 4. Tela Pública / Confirmação de Reserva - Visão da Cliente

A cliente acessa:

`/agendamento/[token]`

Essa página representa uma pré-reserva específica já criada no sistema.

Pode ser acessada sem login.

A cliente não precisa possuir conta no Beleza em Dia.

A página funciona principalmente de duas formas:

- **Com sinal:** apresenta o valor do sinal e o botão **Pagar com Mercado Pago**, com redirecionamento ao Checkout Pro.

- **Sem sinal:** apresenta confirmação simples da pré-reserva.

Antes de exibir qualquer conteúdo, o sistema deve consultar o estado atual do agendamento.

### Estado de Carregamento

Enquanto a reserva estiver sendo localizada e validada, exibir uma tela de carregamento alinhada à identidade visual do **Beleza em Dia**.

Não utilizar apenas um spinner isolado no centro de uma tela vazia.

Exibir:

- Logo do Beleza em Dia.

- Nome **Beleza em Dia**.

- Spinner/loading compatível com o restante da interface.

- Mensagem:

  **"Carregando sua reserva..."**

ou:

  **"Preparando sua reserva..."**

A tela deve utilizar:

- as mesmas cores do sistema;
- tipografia consistente;
- fundo correspondente ao tema;
- card ou composição visual centralizada;
- animação discreta.

Não exibir sidebar, Dashboard ou elementos administrativos, pois essa é uma página pública.

### Validação inicial da Reserva

Ao carregar `/agendamento/[token]`, verificar:

1. se o token público possui formato válido e corresponde a um agendamento;

2. se o agendamento existe;

3. qual é o `status`;

4. se o prazo de 30 minutos já expirou;

5. se o estabelecimento exige sinal;

6. se já existe `mercadoPagoPreferenceId` associado à tentativa de pagamento;

7. se já existe `paymentId` de um pagamento efetivamente identificado pelo Mercado Pago;

8. se o pagamento já foi confirmado;

9. quais serviços pertencem ao agendamento;

10. qual `tenant` é responsável pela reserva.

### Funcionamento no Modo de Teste

Quando o token começar ou estiver associado a um agendamento mock:

- não depender de consulta a backend real;

- recuperar o agendamento armazenado pelo modo de teste;

- carregar os dados da reserva normalmente;

- simular o comportamento do pagamento quando necessário;

- permitir navegar por todos os estados da página.

Assim, um link gerado no modo de teste deve abrir uma reserva de teste válida em vez de resultar em erro de API.

### Resumo da Reserva

Antes da área de confirmação/pagamento, exibir:

- Nome do estabelecimento.

- Nome da cliente.

- Serviço(s).

- Data.

- Horário.

- Duração total.

- Modalidade:
  - Salão;
  - Domiciliar.

- Endereço, quando domiciliar.

- Valor total.

- Valor do sinal, quando houver.

- Valor restante a pagar no atendimento, quando aplicável.

- Observação, quando existir.

### Integração Mercado Pago - Checkout Pro + OAuth

Quando o estabelecimento exige sinal, o fluxo oficial do MVP utiliza **Checkout Pro + OAuth**.

1. O backend localiza o `tenantId` do agendamento.

2. Consulta a integração correspondente em `tenant_mercadopago`.

3. Verifica se `conectado = TRUE`.

4. Utiliza exclusivamente a credencial OAuth da profissional responsável pelo estabelecimento.

5. O backend valida novamente:
   - se o agendamento ainda está `pendente`;
   - se a pré-reserva ainda está dentro do prazo de 30 minutos;
   - o valor total real do agendamento;
   - o valor real do sinal;
   - se ainda não existe pagamento aprovado para a reserva.

6. O backend cria uma **preferência do Checkout Pro** no Mercado Pago usando o `access_token` da profissional.

7. A preferência deve conter somente dados necessários ao pagamento, incluindo:
   - descrição/itens compatíveis com o sinal cobrado;
   - valor calculado pelo backend;
   - referência interna segura do agendamento, como `external_reference` e/ou metadata quando apropriado;
   - URLs de retorno do Beleza em Dia;
   - configurações de vigência/expiração compatíveis com a regra da reserva quando tecnicamente aplicável.

8. Como a comissão do Beleza em Dia é **0% no MVP**, o backend não deve aplicar comissão positiva da plataforma na preferência.

9. O Mercado Pago retorna o identificador da preferência e o endereço seguro do Checkout Pro (`init_point`).

10. O backend registra o identificador da preferência em `appointments.mercadoPagoPreferenceId` e devolve ao frontend somente o endereço seguro necessário ao redirecionamento, sem expor tokens.

11. Antes do redirecionamento, a página informa:

**"Você pagará R$ [valor do sinal]. O pagamento será processado com segurança pelo Mercado Pago."**

12. A página exibe o botão **Pagar com Mercado Pago**.

13. Ao clicar, a cliente é redirecionada para o ambiente oficial do Mercado Pago e realiza o pagamento.

14. O retorno da cliente ao Beleza em Dia, por si só, **não confirma o pagamento**.

15. O backend deve confirmar o estado real através de webhook validado e/ou consulta confiável ao Mercado Pago.

16. Quando um pagamento aprovado for identificado:
    - registrar o identificador real do pagamento em `appointments.paymentId`;
    - atualizar `valorSinalPago`;
    - alterar `status = confirmado`.

**Não utilizar um único `MERCADOPAGO_ACCESS_TOKEN` global como credencial de recebimento para todas as profissionais.**

Cada estabelecimento utiliza a conta Mercado Pago conectada pela própria profissional.

As credenciais OAuth nunca devem ser enviadas para o navegador da cliente.

As tarifas eventualmente cobradas pelo Mercado Pago da profissional não devem ser exibidas à cliente como parte do valor do sinal. A cliente deve visualizar apenas o valor que efetivamente pagará.

### Estado 1 - Aguardando Pagamento

Quando:

- `status = pendente`;

- o estabelecimento exige sinal;

- a reserva ainda está dentro do prazo;

exibir:

- Nome do estabelecimento.

- Resumo completo da reserva.

- Status **Aguardando pagamento**.

- Valor total.

- Valor do sinal.

- Mensagem auxiliar:

  **"Você pagará R$ [valor do sinal]. O pagamento será processado com segurança pelo Mercado Pago."**

- Botão principal **Pagar com Mercado Pago**.

- Cronômetro com o tempo restante.

- Botão secundário **Já paguei / Atualizar**, quando fizer sentido consultar novamente o estado depois de uma tentativa de pagamento/retorno.

- Opção discreta **Cancelar esta pré-reserva**.

O cronômetro deve ser calculado utilizando:

`appointments.criadoEm + 30 minutos`

O botão **Já paguei / Atualizar** solicita ao backend uma nova verificação do pagamento. O backend pode utilizar `paymentId` quando ele já for conhecido e, quando ainda não existir, utilizar a preferência (`mercadoPagoPreferenceId`), `external_reference` e os mecanismos oficiais disponíveis para localizar/confirmar o pagamento correspondente.

O frontend nunca consulta o Mercado Pago diretamente utilizando credenciais privadas.

### Estado 2 - Pagamento Confirmado

Quando o Mercado Pago confirmar o pagamento:

- `status = confirmado`.

Exibir:

- Ícone de sucesso.

- Nome do estabelecimento.

- Status **Confirmado**.

- Resumo da reserva.

- Mensagem:

  **"Pagamento recebido com sucesso! Sua reserva para [data] às [horário] está garantida."**

- Exibir o valor do sinal pago.

- Exibir, quando houver, o valor restante que será pago no atendimento.

Não permitir gerar nova cobrança para o mesmo agendamento confirmado.

### Estado 3 - Confirmação sem Sinal

Se:

`modeloCobrancaSinal = sem_sinal_presencial`

e:

`status = pendente`

exibir:

- Nome do estabelecimento.

- Resumo completo da reserva.

- Mensagem:

  **"Confira os dados abaixo e confirme sua presença para reservar este horário."**

- Informação:

  **"O pagamento será realizado diretamente no atendimento."**

- Botão principal **Confirmar Agendamento**.

- Opção secundária **Cancelar esta pré-reserva**.

Ao clicar em **Confirmar Agendamento**:

- validar novamente se a reserva ainda está dentro do prazo;

- verificar se o horário continua vinculado àquela pré-reserva;

- alterar:
  - `pendente` → `confirmado`.

Depois, exibir o estado de confirmação concluída.

### Estado 4 - Pré-Reserva Cancelada pela Cliente

Enquanto `status = pendente`, disponibilizar a opção:

**Cancelar esta pré-reserva**

Antes de cancelar, exibir confirmação:

**"Deseja cancelar esta pré-reserva? O horário será liberado e poderá ser reservado por outra cliente."**

Botões:

- **Voltar**.

- **Cancelar Pré-Reserva**.

Ao confirmar:

- alterar:
  - `pendente` → `cancelado`;

- salvar em `motivoCancelamento`:

  **"Pré-reserva cancelada pela cliente pelo link de confirmação."**

- liberar o horário imediatamente.

Depois exibir:

**"Pré-reserva cancelada"**

**"Este horário foi liberado. Caso queira marcar outro atendimento, você pode acessar novamente a agenda da profissional."**

Botão:

**Fazer Novo Agendamento**

Direcionar para:

`/{slug}`

### Estado 5 - Reserva Expirada

Se a reserva continuar `pendente` após os 30 minutos:

- alterar:
  - `pendente` → `expirado`;

- liberar o horário.

Exibir:

**"Esta pré-reserva expirou"**

**"O prazo para confirmar este horário terminou e ele voltou a ficar disponível na agenda."**

Botão:

**Tentar Novo Agendamento**

Direcionar para:

`/{slug}`

Não permitir:

- confirmar;

- pagar;

- gerar nova preferência de pagamento;

- reutilizar a mesma reserva expirada.

### Estado 6 - Reserva já Cancelada

Se:

`status = cancelado`

exibir:

**"Esta reserva foi cancelada"**

**"Este link não pode mais ser utilizado para confirmar o atendimento."**

Quando aplicável, disponibilizar:

**Fazer Novo Agendamento**

→ `/{slug}`

Não permitir pagamento ou confirmação.

### Estado 7 - Reserva já Confirmada

Se:

`status = confirmado`

abrir diretamente a tela de sucesso/resumo.

Exibir:

- Status **Confirmado**.

- Data.

- Horário.

- Serviço(s).

- Modalidade.

- Valor total.

- Sinal pago, quando existir.

Não gerar nova cobrança.

Não mostrar novamente **Confirmar Agendamento**.

A página segura `/agendamento/[token]` também funciona como área de gerenciamento daquela reserva.

Disponibilizar, conforme o estado atual:

- **Atualizar meus dados** - permite corrigir `clienteNome` e `clienteTelefone` daquela reserva;
- **Cancelar Agendamento** - inicia o fluxo de cancelamento pela cliente;
- **Acompanhar reembolso** - quando existir processo de devolução;
- **Falar com a profissional pelo WhatsApp**.

Ao cancelar um agendamento confirmado pela cliente:

1. validar novamente o token e o estado real do agendamento;
2. calcular a antecedência em relação a `dataInicio`;
3. salvar `canceladoPor = cliente` e `canceladoEm` somente dentro de uma operação backend consistente;
4. se houver sinal pago e faltarem **24 horas ou mais**, iniciar reembolso integral;
5. se houver sinal pago e faltarem **menos de 24 horas**, informar claramente que não existe reembolso automático do sinal;
6. se não houver sinal pago, cancelar sem criar operação de reembolso;
7. liberar o horário de forma consistente com o resultado da operação.

Se houver reembolso, exibir o estado real (`pendente`, `processando`, `concluido` ou `falhou`) e nunca declarar sucesso antes da confirmação do Mercado Pago.

### Estado 8 - Erro ao Gerar ou Consultar Pagamento

Exibir:

**"Não foi possível carregar o pagamento"**

**"Ocorreu um problema ao abrir ou consultar o pagamento no Mercado Pago. Tente novamente em alguns instantes."**

Botão:

**Recarregar Pagamento**

Não alterar automaticamente o status para cancelado ou expirado apenas por erro de comunicação.

### Estado 9 - Reserva não encontrada

Se o token não existir ou não corresponder a uma reserva válida:

Exibir uma tela alinhada à identidade visual do Beleza em Dia.

Exibir:

**"Reserva não encontrada"**

**"Não encontramos uma reserva associada a este link. Verifique se o endereço está correto."**

Nunca exibir mensagens como:

- `Unexpected end of JSON input`;

- `Failed to execute 'json' on 'Response'`;

- `Internal Server Error`;

- `TypeError`;

- `SyntaxError`;

- stack traces;

- mensagens brutas da API.

### Estado 10 - Falha de conexão

Quando não for possível determinar se a reserva existe devido a falha de conexão:

Exibir:

**"Não foi possível carregar sua reserva"**

**"Verifique sua conexão com a internet e tente novamente."**

Botão:

**Tentar novamente**

Não apresentar a reserva como inexistente somente porque a API ficou temporariamente indisponível.

### Estado 11 - Erro interno do sistema

Quando ocorrer uma falha inesperada, seja na conexão da API do mercado pago, ou outra API ou outro erro:

Exibir:

**"Não foi possível abrir sua reserva"**

**"Ocorreu um problema ao carregar as informações. Tente novamente em alguns instantes."**

Botão:

**Tentar novamente**

O erro técnico deve ser registrado somente internamente.

### Dados usados

- **Tabela `tenants`:**
  - `id`.
  - `slug`.
  - `nomeEstabelecimento`.
  - `nomeProfissional`.
  - `whatsapp`.
  - `modeloCobrancaSinal`.
  - `tipoValorSinal`.
  - `valorSinal`.

- **Tabela `tenant_mercadopago`:**
  - `tenantId`.
  - `mercadoPagoUserId`.
  - `accessTokenCriptografado`.
  - `refreshTokenCriptografado`.
  - `tokenExpiraEm`.
  - `conectado`.

- **Tabela `appointments`:**
  - `id`.
  - `tenantId`.
  - `clienteNome`.
  - `clienteTelefone`.
  - `tipoAtendimento`.
  - `enderecoCliente`.
  - `precoCobrado`.
  - `valorSinalPago`.
  - `dataInicio`.
  - `dataFim`.
  - `status`.
  - `mercadoPagoPreferenceId`.
  - `paymentId`.
  - `tokenPublico`.
  - `canceladoPor`.
  - `canceladoEm`.
  - `valorReembolsado`.
  - `reembolsoStatus`.
  - `reembolsoSolicitadoEm`.
  - `reembolsadoEm`.
  - `mercadoPagoRefundId`.
  - `reembolsoIdempotencyKey`.
  - `motivoCancelamento`.
  - `observacao`.
  - `criadoEm`.

- **Tabela `appointment_services`:**
  - `appointmentId`.
  - `serviceId`.
  - `precoCobrado`.
  - `duracaoMinutos`.

- **Tabela `services`:**
  - `id`.
  - `nome`.

### Mensagens de erros e validações

- Não exibir dados de um agendamento inexistente.

- Não diferenciar erro de rede de reserva inexistente sem ter certeza da resposta do backend.

- **Token inválido:** **"Reserva não encontrada."**

- Se `status = cancelado`, não permitir pagamento ou confirmação.

- Se `status = expirado`, não criar uma nova preferência do Checkout Pro para a mesma reserva.

- Se `status = confirmado`, abrir diretamente o estado de sucesso.

- Se sinal for exigido e não houver Mercado Pago conectado, não criar preferência de pagamento.

Exibir:

**"O pagamento desta reserva está temporariamente indisponível. Entre em contato com a profissional."**

- Não gerar mais de uma preferência ativa desnecessariamente ao atualizar a página.

- Se `mercadoPagoPreferenceId` já existir e a preferência ainda puder ser utilizada com segurança, consultar/reutilizar o checkout correspondente em vez de criar outra preferência sem necessidade.

- Se `paymentId` de um pagamento aprovado já existir, não iniciar novo checkout para o mesmo sinal.

- O valor do sinal deve ser calculado no backend.

- O navegador nunca deve definir o valor final confiável da cobrança.

- O backend deve validar novamente o prazo de 30 minutos.

- **Pagamento aprovado:** atualizar `valorSinalPago` e `status = confirmado` somente após confirmação real do gateway.

- **Webhook atrasado:** **Já paguei / Atualizar** consulta novamente pelo backend.

- **Erro de conexão:** **"Não foi possível verificar o pagamento agora. Tente novamente."**

- Respostas vazias ou inválidas da API devem ser tratadas antes de tentar executar `.json()`.

- Nenhum erro técnico deve ser apresentado diretamente à cliente.

- **Dados atualizados:** **"Seus dados deste agendamento foram atualizados."**

- **Não foi possível atualizar:** **"Não foi possível atualizar seus dados agora. Tente novamente."**

- **Reembolso processando:** **"Seu reembolso está sendo processado pelo Mercado Pago."**

- **Reembolso concluído:** **"Reembolso concluído. O Mercado Pago confirmou a devolução."**

- **Reembolso falhou:** **"Não foi possível concluir o reembolso pelo Mercado Pago. A profissional precisa resolver esta pendência."**

### Ajustes a serem feitos nas telas atuais

- **Modo Web:**

  - Criar tela de carregamento própria do Beleza em Dia.

  - Remover spinner isolado em fundo vazio.

  - Exibir logo, nome do sistema e mensagem de carregamento.

  - Corrigir o modo de teste para que links `/agendamento/[token]` gerados por agendamentos mock sejam encontrados.

  - Não depender exclusivamente do backend real durante o modo de teste.

  - Remover qualquer exibição de mensagens técnicas de erro.

  - Exibir card centralizado contendo a reserva.

  - Manter boa hierarquia entre:
    - estabelecimento;
    - resumo;
    - status;
    - pagamento;
    - ações.

  - Exibir todos os serviços do agendamento.

  - Utilizar `criadoEm`, não `createdAt`, para calcular a validade.

  - Implementar a criação/reutilização da preferência do **Checkout Pro** usando a integração Mercado Pago correspondente ao `tenantId`.

  - Adicionar estados de carregamento ao criar o checkout, redirecionar e consultar o pagamento.

  - Exibir **Pagar com Mercado Pago** quando houver sinal pendente e a reserva ainda estiver válida.

  - Adicionar **Já paguei / Atualizar** como ação secundária quando fizer sentido consultar novamente o estado.

  - Adicionar **Cancelar esta pré-reserva** quando `status = pendente`.

  - Remover a implementação antiga de QR Code Pix e Pix Copia e Cola dentro do Beleza em Dia para este fluxo de Checkout Pro.

- **Modo Tablet / iPad:**

  - Utilizar o mesmo conceito visual do Web.

  - Manter card centralizado com largura adequada.

  - Não utilizar layout administrativo/sidebar.

  - Manter o botão **Pagar com Mercado Pago** visível e com largura confortável.

  - Garantir que resumo, valores e cronômetro não fiquem comprimidos.

  - Adaptar espaçamentos sem simplesmente reduzir a versão Web.

- **Modo Mobile:**

  - Utilizar layout de uma coluna.

  - Manter logo e identidade visual do Beleza em Dia na tela de carregamento.

  - Centralizar o conteúdo principal.

  - Manter margem lateral segura.

  - Exibir claramente o valor que será pago antes do redirecionamento.

  - Manter o botão **Pagar com Mercado Pago** em largura adequada para toque e sem ser coberto pelas barras do dispositivo.

  - Botões principais devem ocupar largura adequada para toque.

  - Cronômetro e status devem permanecer legíveis.

  - Resumo dos serviços deve ser exibido em lista vertical.

  - Não permitir rolagem horizontal.

  - Respeitar `safe-area`.

  - **Confirmar Agendamento**, **Pagar com Mercado Pago**, **Já paguei / Atualizar** e demais ações devem permanecer acessíveis sem serem cobertas pelas barras do dispositivo.



---

## 5. Modal - Detalhes do Agendamento - Visão da Profissional

Aberto ao clicar em um card de agendamento na Dashboard.

### Origem do Agendamento

#### Cenário A - Criado pela Cliente

- Cliente escolhe serviço, modalidade, data e horário pela página pública.
- O sistema cria o agendamento.
- Redireciona para `/agendamento/[token]`.
- Com sinal: aguarda pagamento pelo Mercado Pago Checkout Pro.
- Sem sinal: aguarda confirmação simples.

#### Cenário B - Criado pela Profissional

- Profissional usa **+ Novo Agendamento**.
- O agendamento é criado como `pendente`.
- O link de confirmação é gerado.
- A profissional pode copiá-lo e enviá-lo à cliente.

#### Cenário C - Confirmação Manual

- Em casos tratados fora do pagamento automático, a profissional pode utilizar **Confirmar Manualmente**.
- O sistema altera o agendamento para `confirmado`.
- A interface deve deixar claro que essa confirmação é manual e não significa que o Mercado Pago aprovou um pagamento.

### Estrutura Visual

#### Cabeçalho

- Título **Detalhes do Agendamento**.
- Botão X.

#### Status

- Badge: `Pendente`, `Confirmado`, `Finalizado`, `Cancelado` ou `Expirado`.

Badge de sinal deve ser contextual:

- Com sinal e pago: `✓ Sinal pago (R$ XX,XX)`.
- Com sinal e pendente: `Sinal pendente (R$ XX,XX)`.
- Sem sinal: não exibir **Sinal pago**; mostrar, se necessário, `Pagamento no atendimento`.

#### Cliente

- Avatar com iniciais, por exemplo `FL` para Fernanda Lima.
- Nome.
- Telefone/WhatsApp.

O banco atual **não possui tabela de clientes/perfis de cliente**, portanto nome e telefone não devem redirecionar para um perfil de cliente inexistente. O telefone pode ser utilizado diretamente para abrir o WhatsApp.

#### Serviços

Como o agendamento suporta múltiplos serviços, listar todos os serviços vinculados em `appointment_services`.

Para cada serviço, mostrar:

- Nome.
- Preço cobrado naquele agendamento.
- Duração salva no snapshot.

Depois, mostrar:

- **Preço Total** (`appointments.precoCobrado`).
- **Data e Horário**.
- **Duração Total**, calculada pela soma das durações dos serviços.
- **Observação**, quando existir.
- **Modalidade de Atendimento** usando `appointments.tipoAtendimento`.
  - Salão: `🏠 Atendimento no Salão`.
  - Domiciliar: `🚗 Atendimento Domiciliar` + endereço de `enderecoCliente`.
- **Valor Restante a Receber:** `precoCobrado - valorSinalPago`.

### Área de Ações

- **Enviar Mensagem WhatsApp**.
- **Concluído**.
- **Remarcar**.
- **Cancelar Agendamento**.
- **Copiar Link de Confirmação** quando aplicável.
- **Confirmar Manualmente** quando aplicável.

- **Dados usados:**
  - **Tabela `appointments`:**
    - `id`.
    - `clienteNome`.
    - `clienteTelefone`.
    - `tipoAtendimento`.
    - `enderecoCliente`.
    - `precoCobrado`.
    - `valorSinalPago`.
    - `dataInicio`.
    - `dataFim`.
    - `status`.
    - `paymentId`.
    - `valorReembolsado` - quando houver devolução confirmada.
    - `reembolsoStatus` - quando houver fluxo de reembolso.
    - `reembolsadoEm` - quando houver devolução confirmada.
    - `mercadoPagoRefundId` - quando o Mercado Pago retornar identificador da devolução.
    - `reembolsoSolicitadoEm`.
    - `reembolsoIdempotencyKey`.
    - `reembolsoFalhaCodigo`.
    - `reembolsoFalhaMensagem`.
    - `tokenPublico`.
    - `canceladoPor`.
    - `canceladoEm`.
    - `motivoCancelamento`.
    - `observacao`.
    - `criadoEm`.
  - **Tabela `appointment_services`:**
    - `appointmentId`.
    - `serviceId`.
    - `precoCobrado`.
    - `duracaoMinutos`.
  - **Tabela `services`:**
    - `id`.
    - `nome`.
  - **Tabela `tenants`:**
    - `slug`.
    - `modeloCobrancaSinal`.
    - `whatsapp`.

- **Mensagens de erros e validações:**
  - **Erro ao carregar:** **"Não foi possível carregar os detalhes do agendamento."**
  - Formatar telefone como `(00) 00000-0000`.
  - Formatar valores como `R$ 0,00`.
  - Exibir endereço somente para domiciliar.
  - Não permitir editar ações em `cancelado`, `expirado` ou `finalizado`, salvo ações somente leitura/contato permitidas.
  - **Cancelar:** exigir motivo antes de confirmar. Se vazio: **"Informe o motivo do cancelamento."**
  - Quando o cancelamento for iniciado pela **profissional**, salvar `canceladoPor = profissional`. Se `valorSinalPago > 0`, o reembolso integral deve ser solicitado independentemente da antecedência. Não aplicar a regra de perda do sinal de 24 horas contra a cliente quando quem cancelou foi a profissional.
  - Não declarar o reembolso concluído antes da confirmação do Mercado Pago. Se o reembolso falhar, manter a pendência visível e impedir exclusão da conta enquanto não for resolvida.
  - **Remarcar:** pedir confirmação antes de iniciar a remarcação; validar e reservar o novo horário antes de liberar definitivamente o horário atual. Se o novo horário não puder ser reservado, manter o agendamento original intacto.
  - **Concluído:** disponível somente para agendamento `confirmado`.
  - **Copiar link:** disponível para `pendente` quando ainda fizer sentido confirmar aquela reserva.
  - **Confirmar manualmente:** mostrar confirmação clara antes da ação.
  - **WhatsApp:** se `pendente`, o texto pode incluir `/agendamento/[token]`.
  - Calcular **Restante a receber** sem permitir resultado negativo; se `valorSinalPago` for igual ao total, mostrar `R$ 0,00`.

### Definição dos Status

- **`pendente`:** reserva criada e ainda aguardando pagamento/confirmação ou decisão manual.
- **`confirmado`:** horário reservado definitivamente após confirmação válida ou confirmação manual.
- **`finalizado`:** atendimento concluído.
- **`cancelado`:** reserva cancelada e horário liberado.
- **`expirado`:** prazo de confirmação/pagamento terminou e o horário foi liberado.

### Regras dos Botões

- **Concluído:** `confirmado` → `finalizado`.
- **Remarcar:** solicita confirmação e inicia o fluxo de escolha do novo horário sem cancelar imediatamente o agendamento atual. O backend valida o novo período e somente conclui a troca de forma atômica; se houver conflito, o agendamento original permanece intacto.
- **Cancelar Agendamento:** quando a ação for executada pela profissional, solicitar motivo, registrar `canceladoPor = profissional` e `canceladoEm`. Se existir sinal pago, solicitar **reembolso integral independentemente da antecedência**. Somente informar reembolso concluído depois da confirmação do Mercado Pago. Se o reembolso ficar pendente, processando ou falhar, manter a operação financeira registrada e não permitir exclusão da conta enquanto a pendência não for resolvida. Depois, alterar o agendamento para `cancelado` e liberar a vaga de forma consistente.
- **Copiar Link de Confirmação:** copia `/agendamento/[token]`.
- **Confirmar Manualmente:** altera para `confirmado` sem registrar automaticamente que houve pagamento Mercado Pago.
- **Enviar Mensagem WhatsApp:** abre conversa com `clienteTelefone`.

### Diferenciação Visual por Status

- **Confirmado:** badge Confirmado; exibir sinal pago somente se `valorSinalPago > 0`; ações de concluir, remarcar, cancelar e WhatsApp.
- **Pendente com sinal:** badge Pendente + Sinal Pendente; copiar link, confirmar manualmente, remarcar, cancelar e WhatsApp.
- **Pendente sem sinal:** badge Pendente + Aguardando Confirmação; não mostrar Sinal Pendente.
- **Finalizado:** somente leitura; manter WhatsApp se desejado.
- **Cancelado / Expirado:** somente leitura, sem ações que alterem o agendamento.

- **Ajustes a serem feitos nas telas atuais:**
  - **Modo Web:**
    - Listar múltiplos serviços em vez de assumir apenas um serviço.
    - Usar `appointments.tipoAtendimento`, não o tipo geral do tenant, para mostrar a modalidade daquele agendamento.
    - Adicionar endereço para atendimento domiciliar.
    - Adicionar **Valor Restante a Receber**.
    - Remover link para perfil de cliente, pois não existe tabela/perfil de cliente no banco atual.
    - Ajustar badges de sinal para não exibir **Sinal pago** em reservas sem sinal.
  - **Modo Mobile:**
    - Aplicar os mesmos ajustes funcionais.
    - Empilhar informações do agendamento sem cortar valores, endereço ou badges.
    - Em múltiplos serviços, usar lista vertical compacta.
    - Botões devem se reorganizar verticalmente quando não houver espaço lateral suficiente.
    - Adicionar espaço inferior para a bottom bar.


---


# Modelagem de Dados de Referência e Implementação Oficial no Convex

## Fonte Oficial de Dados

O **Convex é o backend e banco de dados oficial do Beleza em Dia**.

O arquivo SQL/MySQL mantido no projeto é apenas uma **modelagem conceitual de referência**. Ele foi escrito dessa forma porque a sintaxe SQL é familiar ao autor do projeto e facilita visualizar entidades, campos, tipos, relacionamentos e restrições.

O arquivo SQL:

- não será executado em produção;
- não define a tecnologia oficial do banco;
- não exige MySQL, PostgreSQL, Prisma ou outro ORM;
- não deve ser tratado como fonte definitiva do schema em runtime;
- deve ser convertido conceitualmente para o schema e as funções nativas do Convex antes da implementação final do backend.

A fonte de verdade da implementação será o conjunto de arquivos e funções do Convex, principalmente `convex/schema.ts`, Queries, Mutations, Actions, índices e Cron Jobs.

## Entidades Conceituais

A modelagem continua organizada nas seguintes entidades lógicas:

1. `users` - contas e autenticação.
2. `verification_codes` - códigos de verificação de e-mail e recuperação de senha.
3. `tenants` - perfil do estabelecimento e configurações gerais.
4. `availability` - disponibilidade semanal da agenda.
5. `tenant_portfolio` - fotos e vídeos do portfólio.
6. `services` - serviços oferecidos.
7. `blocked_times` - bloqueios manuais de horário.
8. `appointments` - agendamentos.
9. `appointment_services` - relação de múltiplos serviços por agendamento com snapshot de preço e duração.
10. `tenant_mercadopago` - conexão OAuth do Mercado Pago por estabelecimento.

No Convex essas entidades podem continuar sendo representadas como tabelas definidas por `defineTable()`, desde que o schema final preserve as regras funcionais descritas nesta documentação.

## Conversão Conceitual de SQL/MySQL para Convex

A tradução não deve ser feita como simples conversão textual linha por linha. Cada conceito do SQL de referência deve ser implementado usando o recurso equivalente do Convex.

| Conceito no SQL de referência | Implementação equivalente no Convex |
| --- | --- |
| `CREATE TABLE` | `defineTable()` em `convex/schema.ts` |
| `VARCHAR`, `TEXT` | `v.string()` |
| `BOOLEAN` | `v.boolean()` |
| `INT`, `BIGINT` | `v.number()` quando o intervalo for seguro para JavaScript |
| `DATETIME` | timestamp numérico, normalmente armazenado com `v.number()` |
| `ENUM(...)` | `v.union(v.literal(...), ...)` |
| FK / relacionamento | `v.id("nomeDaTabela")` + validação de autorização/regra de negócio |
| `INDEX` | `.index("nome", [campos...])` |
| `SELECT` | Query do Convex |
| `INSERT` | Mutation com `ctx.db.insert()` |
| `UPDATE` | Mutation com `ctx.db.patch()` ou `ctx.db.replace()` |
| `DELETE` | Mutation com `ctx.db.delete()` somente quando permitido pela regra de negócio |
| `UNIQUE` | índice adequado + consulta/validação dentro da Mutation antes de gravar |
| `ON DELETE CASCADE` | exclusão explícita e controlada dos dependentes em Mutation, quando a regra permitir |
| `ON DELETE RESTRICT` | validação explícita que impede exclusão quando houver vínculo |
| `ALTER TABLE` | evolução de `schema.ts` e, quando necessário, rotina/migração de dados existente |

A implementação real será escrita principalmente em **TypeScript**, usando a API do Convex.

## Valores Monetários no Convex

O SQL de referência utiliza `DECIMAL(10,2)` por ser apropriado para modelagem relacional de valores monetários.

No Convex, valores monetários devem ser armazenados preferencialmente como **inteiros em centavos**, evitando erros de ponto flutuante.

Exemplo:

```text
R$ 30,00 → 3000
R$ 79,90 → 7990
```

Essa regra se aplica, quando implementados no Convex, a valores como:

- preço de serviço;
- `precoCobrado`;
- `valorSinal` quando for valor fixo;
- `valorSinalPago`;
- `valorReembolsado`;
- taxa de deslocamento;
- outros valores financeiros futuros.

A interface continua exibindo os valores formatados em reais (`R$ 0,00`).

## Datas e Horários no Convex

Campos conceituais do SQL definidos como `DATETIME` devem ser traduzidos para timestamps numéricos no Convex.

Exemplos:

- `criadoEm`;
- `expiraEm`;
- `bloqueadoAte`;
- `dataInicio`;
- `dataFim`;
- `reembolsoSolicitadoEm`;
- `reembolsadoEm`;
- `canceladoEm`;
- datas de aceite de Termos/Privacidade.

O backend deve ser a fonte confiável para cálculos de expiração, bloqueio, antecedência, cancelamento e concorrência.

## Campos Obrigatórios no Schema Oficial do Convex

### `users`

Além dos campos conceituais já existentes, o schema oficial deve possuir:

- `termosVersaoAceita` - versão dos Termos de Uso aceita;
- `termosAceitosEm` - timestamp do aceite dos Termos de Uso;
- `politicaPrivacidadeVersaoCiente` - versão da Política de Privacidade apresentada e reconhecida;
- `politicaPrivacidadeCienteEm` - timestamp da ciência da Política de Privacidade;
- `onboardingEtapaAtual` - etapa atual do onboarding (`0` a `6`);
- `onboardingConcluido` - booleano, inicialmente `FALSE`.

Esses campos permitem ao backend distinguir:

- conta com Termos pendentes;
- conta com Política de Privacidade ainda não reconhecida quando necessário;
- onboarding pendente;
- etapa atual obrigatória;
- conta liberada para as áreas administrativas.

O `localStorage` não deve substituir esses dados.

### `verification_codes`

Além dos campos conceituais do SQL de referência, incluir:

- `bloqueadoAte` - timestamp opcional com o final do bloqueio temporário após excesso de tentativas.

O contador `tentativas` sozinho não é suficiente para exibir e aplicar um bloqueio persistente com tempo definido.

### `appointments`

Para rastreabilidade de privacidade em reservas públicas, incluir:

- `avisoPrivacidadeVersao`;
- `avisoPrivacidadeExibidoEm`.

Para o fluxo de pagamento via Checkout Pro, incluir:

- `mercadoPagoPreferenceId` - identificador da preferência criada no Checkout Pro para a tentativa de pagamento do agendamento;
- `paymentId` continua representando o identificador do pagamento efetivamente criado/identificado pelo Mercado Pago e não deve ser confundido com o ID da preferência.

Para rastreabilidade financeira de reembolsos, incluir quando aplicável:

- `valorReembolsado`;
- `reembolsoStatus` (`pendente`, `processando`, `concluido` ou `falhou`);
- `reembolsoSolicitadoEm`;
- `reembolsadoEm`;
- `mercadoPagoRefundId`;
- `reembolsoIdempotencyKey`;
- `reembolsoFalhaCodigo`;
- `reembolsoFalhaMensagem`.

Para gerenciamento público e cancelamento, incluir:

- `tokenPublico` - token aleatório e imprevisível usado em `/agendamento/[token]`;
- `canceladoPor` - `cliente`, `profissional` ou `sistema`;
- `canceladoEm` - timestamp do cancelamento efetivo.

`valorSinalPago` continua representando quanto foi efetivamente recebido. Ele não deve ser zerado quando houver devolução; o reembolso deve possuir registro separado.

## Relacionamentos e Integridade no Convex

Relacionamentos devem utilizar IDs do Convex e validação explícita nas funções do backend.

Exemplos conceituais:

```ts
tenantId: v.id("tenants")
appointmentId: v.id("appointments")
serviceId: v.id("services")
```

A existência de um ID válido não concede autorização. Toda Query/Mutation privada deve continuar validando o `tenantId` derivado da sessão.

As regras conceituais do SQL devem ser preservadas desta forma:

- um usuário possui no máximo um `tenant`: validar antes de inserir/alterar e utilizar índice apropriado por `userId`;
- um estabelecimento possui no máximo uma disponibilidade por dia da semana: consultar por `tenantId + diaSemana` antes de gravar;
- o mesmo serviço não deve aparecer duas vezes no mesmo agendamento: validar `appointmentId + serviceId` dentro da Mutation;
- serviço já utilizado por histórico de agendamento não deve ser apagado fisicamente: impedir exclusão e utilizar `services.ativo = FALSE`;
- exclusões em cascata descritas no SQL de referência somente devem ocorrer por lógica explícita e segura da aplicação.

## Índices Principais do Convex

Antes da implementação das telas administrativas e das consultas reais, o schema deve possuir índices compatíveis com os padrões de acesso mais frequentes.

No mínimo, avaliar/implementar:

```ts
appointments
  .index("by_tenant_dataInicio", ["tenantId", "dataInicio"])
  .index("by_tenant_status_dataInicio", ["tenantId", "status", "dataInicio"])
  .index("by_tokenPublico", ["tokenPublico"])
  .index("by_clienteTelefone", ["clienteTelefone"])
  .index("by_tenant_clienteTelefone", ["tenantId", "clienteTelefone"])

blocked_times
  .index("by_tenant_dataInicio", ["tenantId", "dataInicio"])

services
  .index("by_tenant", ["tenantId"])

availability
  .index("by_tenant_diaSemana", ["tenantId", "diaSemana"])
```

Os nomes podem ser refinados no `schema.ts`, mas as consultas não devem depender de varrer todas as tabelas para localizar agenda, bloqueios ou serviços de um estabelecimento.

Outros índices devem ser adicionados somente quando houver padrão real de consulta que justifique sua existência.

## Regras do MVP Relacionadas ao Modelo de Dados

- A modalidade geral do estabelecimento fica em `tenants.tipoAtendimento`; cada reserva usa seu próprio `appointments.tipoAtendimento`.
- O campo manual `chavePix` não faz parte do modelo atual; pagamentos antecipados utilizam Mercado Pago.
- O fluxo oficial do MVP para pagamentos antecipados é **Checkout Pro + OAuth**.
- Cada profissional conecta sua própria conta Mercado Pago por meio da entidade `tenant_mercadopago`.
- `appointments.mercadoPagoPreferenceId` identifica a preferência do Checkout Pro criada para o agendamento.
- `appointments.paymentId` identifica o pagamento efetivamente criado/identificado pelo Mercado Pago depois da tentativa de pagamento.
- A comissão do Beleza em Dia é **0% no MVP atual**. Tarifas do Mercado Pago são independentes e não devem ser hardcodedadas como porcentagem fixa no sistema.
- A expiração da pré-reserva utiliza a regra fixa `criadoEm + 30 minutos`, sem exigir um campo separado de expiração do agendamento.
- `intervaloEntreAtendimentosMinutos` e `toleranciaAtrasoMinutos` permanecem opcionais quando a regra não é utilizada.
- A antecedência mínima de agendamento é fixa em **1 hora** no MVP.
- O prazo de cancelamento sem perda do sinal é fixo em **24 horas** no MVP para cancelamentos iniciados pela cliente.
- Se a profissional cancelar e existir sinal pago, o reembolso integral é devido independentemente da antecedência.
- O MVP suporta somente reembolso integral do sinal; reembolso parcial fica fora do escopo.
- A exclusão da conta profissional deve ser bloqueada enquanto houver agendamento futuro, pagamento ou reembolso não resolvido.
- O tratamento formal de **No-Show** não faz parte do MVP atual e não deve ser adicionado aos status de `appointments` nesta versão.
- Os status atuais permanecem: `pendente`, `confirmado`, `finalizado`, `cancelado` e `expirado`.
- Erros técnicos devem ser registrados internamente e não expostos ao usuário.
- Ao ficar offline, a interface deve utilizar a tela offline definida pelo produto e impedir operações críticas sem confirmação do backend.

---


# Pendências de Documentação das Telas Administrativas

Após a consolidação desta parte, ainda precisam ser documentadas com o mesmo nível de detalhe as telas administrativas de **Agenda, Clientes, Financeiro, Perfil, Configurações, Meus Serviços e Minha Agenda/Horários**, conforme o escopo efetivamente implementado.

---

# Consolidação das Regras de Cancelamento, Reembolso e Privacidade - 06/09/2026

Esta seção consolida decisões posteriores e possui prioridade caso algum trecho antigo da documentação apresente redação diferente.

- Cliente não possui conta no MVP.
- A reserva individual é gerenciada pelo link seguro `/agendamento/[token]`, baseado em `appointments.tokenPublico`.
- Cliente pode corrigir nome e telefone daquela reserva pelo link seguro.
- Cliente cancela com 24h ou mais e sinal pago: reembolso integral.
- Cliente cancela com menos de 24h: sem reembolso automático do sinal.
- Profissional cancela e existe sinal pago: reembolso integral independentemente do prazo.
- Reembolso parcial não faz parte do MVP.
- Reembolso usa o valor efetivamente pago pela cliente, não o líquido recebido pela profissional após tarifas.
- Reembolso somente é concluído após confirmação real do Mercado Pago.
- Estados: `pendente`, `processando`, `concluido`, `falhou`.
- Usar idempotência para impedir reembolso duplicado.
- Saldo insuficiente/rejeição do Mercado Pago mantém a pendência e bloqueia exclusão da conta profissional até resolução.
- Profissional só pode excluir a conta quando não houver agendamento futuro, pagamento ou reembolso pendente.
- Depois das pendências resolvidas, a regra operacional é excluir os dados vinculados ao tenant, salvo retenção concreta exigida por obrigação aplicável.
- Cliente pode usar `/privacidade` > **Falar sobre meus dados** para acesso, correção ou exclusão ampla.
- Pedidos amplos exigem verificação segura de identidade; nome ou telefone isolados não bastam.
- A cliente pode solicitar exclusão em um estabelecimento específico ou em todos os registros pessoais localizados no Beleza em Dia.
- Se houver agendamento/pagamento/reembolso em andamento dentro do escopo solicitado, primeiro resolver a pendência e depois excluir.
- O Beleza em Dia não guarda dados apenas "por garantia".
- A exclusão do Beleza em Dia não apaga automaticamente registros que o Mercado Pago mantenha sob suas próprias responsabilidades.