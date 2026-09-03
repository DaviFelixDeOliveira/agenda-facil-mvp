# 🛠️ Especificação de Ajustes e Tarefas — Beleza em Dia

---

## 1. Onboarding (Fluxo de Configuração de Conta)
- **Ajuste de Passos:** Reformular o onboarding para **5 passos no total**.
  - **Passo 1:** Remover o botão/opção *"Atendimento a Domicílio - Ofereço serviços na casa do cliente"*.
  - **Passo 2 (Novo):** Adicionar etapa dedicada a **Locais de Atendimento** (ficando como Passo 2 de 5).
- **Lógica da Etapa de Local de Atendimento (Passo 2 e Tela de Configurações):**
  - Opções de modalidade: **"Apenas no Salão"**, **"Apenas a Domicílio"** e **"Ambos"**.
  - **Se selecionar "Salão" (ou "Ambos"):** Exibir campos para *Rua/Logradouro*, *Número*, *Bairro*, *Cidade* (input de texto) e *Estado* (campo `<select>` com estados).
  - **Se selecionar "Domicílio" (ou "Ambos"):** Exibir campos opcionais para *Taxa de Deslocamento* (R$) e *Regiões/Bairros Atendidos* (área de texto).
  - **Configurações:** Permitir alterar e editar essas mesmas opções a qualquer momento na seção **Configurações -> Local de Atendimento**.

---

## 2. Gestão de Serviços & Imagens
- **Imagem Padrão:** Cada serviço cadastrado deve vir acompanhado de uma imagem pré-selecionada ilustrativa de acordo com a categoria do procedimento.
- **Visibilidade na Vitrine Pública:**
  - No formulário de cadastro/edição de serviço, incluir uma chave seletora (*toggle switch* ou *checkbox*) com o rótulo **"Visível na Vitrine Pública"**.
  - **Nova Seção em Configurações -> Serviços:**
    - Listar todos os serviços cadastrados permitindo ativar/desativar a exibição na vitrine por chave seletora (*toggle*/*checkbox*).
    - Adicionar um botão/marcador **"Selecionar Todos"** no topo da lista para ativar ou desativar todos os serviços de uma só vez.
    - **Padrão:** Todos os serviços cadastrados devem vir **PRÉ-SELECIONADOS COMO ATIVADOS** (`ativo = true`).

---

## 3. Algoritmo de Busca de Horários Livres (Backend)
- **Local no Projeto:** API/Função responsável pela geração de slots de horários (ex: `getAvailableSlots.ts` ou `agendaController.js`).
- **Regra do Intervalo (Slotting):** O cálculo **não pode saltar de forma fixa pela duração do serviço** (ex: de 60 em 60 min). Deve utilizar um **passo/intervalo padrão de 30 em 30 minutos** (ou 15 min) a partir do horário de início para testar a viabilidade, garantindo que horários intermediários livres não desapareçam.
- **Fluxo de Execução:**
  1. A cliente seleciona o serviço na vitrine pública (ex: *Alongamento em Fibra*, duração de 60 min).
  2. O backend busca na **Tabela 4 (`availability`)** as janelas de trabalho cadastradas para aquele dia (ex: `09:00` às `19:00`).
  3. O backend executa um laço (*loop*) gerando intervalos a cada 30 minutos (`09:00`, `09:30`, `10:00`, `10:30`...) e valida se cabe a duração total do procedimento (60 min) dentro do horário de funcionamento.
  4. **Cruzamento de Conflitos:** O algoritmo descarta qualquer slot que coincida com:
     - Agendamentos existentes na **Tabela 6 (`appointments`)** (desconsiderando os cancelados).
     - Bloqueios manuais e saídas na **Tabela 5 (`blocked_times`)**.
  5. Retorna para a vitrine pública somente a lista de horários livres validados.

---

## 4. Correções e Ajustes na Tela de Agenda (`/agenda`)

### A. Correção de Bug
- **Remoção de Dados Mockados:** Corrigir o renderizador da agenda para que dados mockados/fakes não apareçam em dias sem agendamentos cadastrados. Dias sem registros devem exibir a tela vazia.

### B. Ações no Cabeçalho
- Adicionar o botão **`+ Bloquear Horário`** no topo da tela.
- Ao clicar, abrir o modal de **Bloqueio Manual** para gravar na **Tabela 5 (`blocked_times`)**, contendo: *Título/Motivo*, *Data/Hora Início*, *Data/Hora Fim* e a chave seletora *'Bloquear o dia todo / Resto do dia'*.

### C. Padronização do Comportamento de Clique nos Cards
- **Prevenção de Navegação Acidental:** Remover qualquer link de navegação direta para `/clientes` no nome da cliente que está visível no card da agenda.
- **Clique Único no Card de Agendamento:** Qualquer clique em qualquer área do card abre **unicamente** o modal de **'Detalhes do Agendamento'**.
- **Navegação Segura para o Perfil:** Dentro do modal de **'Detalhes do Agendamento'**, transformar o nome/foto da cliente em um botão/link clicável (*'Ver perfil da cliente'*). Apenas ao clicar nesse link dentro do modal o usuário será redirecionado para `/clientes?cliente=ID`.
- **Card de Bloqueio/Saída (Tabela 5):** O clique no card abre o modal com dados do impedimento e o botão para **'Remover Bloqueio'**.
- **Card de Pausa/Intervalo (Tabela 4):** O clique abre um modal explicativo informando a pausa de rotina e um link para a tela de configurações de horário.

---

## 5. Suporte a Observações Pontuais do Agendamento
- Integrar o campo **`observacao`** (`string` | opcional) na **Tabela 6 (`appointments`)** para recados específicos do atendimento do dia.
- **No Modal de Novo Agendamento:** Adicionar o campo de texto simples opcional: *'Observação / Recado para este atendimento'* (ex: *"Avisou que vai atrasar 10 min"* ou *"Cliente pediu para separar a cor X"*).
- **No Modal de Detalhes do Agendamento (Tela da Agenda):**
  - Exibir um bloco discreto mostrando o texto do campo `observacao`, caso tenha sido preenchido.
  - Se o campo estiver em branco, omitir essa seção ou exibir um botão/link para *'Adicionar observação'*.

  ---

## 6. Diretrizes Técnicas Adicionais (CRM, Portfólio e Pagamentos)

### A. Gestão de Clientes e Notas Internas (CRM Simplificado)
- **Notas Internas Fixas:** Adicionar à **Tabela 6 (`appointments`)** ou gerenciar dinamicamente o campo `notasInternas` por cliente.
- **Consolidação de Histórico:** Na tela de **Clientes (`/clientes`)**, o backend deve agrupar as clientes pelo número de WhatsApp (`clienteTelefone`).
- **Métricas por Cliente:**
  - **Total de Visitas:** Soma de todos os agendamentos concluídos (`status = finalizado`) associados àquele telefone.
  - **Ticket Médio:** Média calculada dividindo o valor total gasto pelo número de visitas.
  - **Manutenção de Notas:** Ao editar a seção *"Notas Internas"* na tela da cliente, a informação deve permanecer salva e acessível para todos os agendamentos futuros daquele telefone.

### B. Galeria e Portfólio de Trabalhos
- **Estrutura de Armazenamento:** Adicionar o campo `portfolioUrls` (`JSON / Array de strings`) na **Tabela 2 (`tenants`)** para armazenar os links das imagens hospedadas (via Cloudflare R2 ou AWS S3).
- **Validação de Limite:** Ao fazer upload de novas mídias no painel, a API deve validar se a quantidade total de URLs no array não excede o parâmetro `limitePortfolioArquivos` (padrão: `20`).
- **Exibição:** Renderizar esse carrossel/grade de fotos na vitrine pública do estabelecimento.

### C. Fluxo de Sinal Pix e Status Financeiro
- **Criação do Agendamento (Vitrine):** Quando a cliente faz uma reserva que exige cobrança de taxa de reserva/sinal:
  1. O backend grava no campo `precoCobrado` o **valor total original do serviço**.
  2. O status inicial do agendamento deve ser definido obrigatoriamente como `pendente`.
- **Confirmação do Pagamento:** Após a confirmação/validação do Pix (ou envio do comprovante), o status deve ser atualizado para `confirmado`.