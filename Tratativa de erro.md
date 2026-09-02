Mensagens de erro pra adicionar no sistema e boas práticas

na tela de Verificar Código deve aparecer a mensagem: "O código que você inseriu é inválido. Tente novamente." abaixo dos inputs de codigo.
Quando inserir um código invalido 3 vezes o sistema avisa para esperar 5 minutos para tentar novamente.
Mesma coisa no botão de enviar código, ao enviar a primeira vez a pessoa tem 30 segundos para enviar o código, se ela apertar em reenviar a próxima tentativa precisa esperar 1 minuto, após apertar em reenviar pela terceira vez o sistema avisa para esperar 5 minutos para tentar novamente.

Adicionar que quaisquer modais abertos venham ser fechados usando botões de voltar nos dispositivos mobile e a tecla esc no web

Para selecionar fotos ao portfólio na tela de  perfil, a pessoa pode clicar e abrir um modal escito para a pesssoa abrir o sistema do dispositivo e selecionar os arquivos ou ela pode arrastar e soltar dentro do modal que o sistema cria para que ela possa fazer o upload das fotos e mostrar uma barra de progresso do upload de cada arquivo. 

Na tela de configurações, ao abrir alguma categoria de configuração e fazer alguma ação de voltar, também deve voltar


Na parte de excluir conta, para ter certeza da confirmação o botão de "Sim, Excluir" deve estar não clicavel por 10 segundos após a pessoa clicar em "Excluir Conta" e deve aparecer um contador de tempo em segundos decrescente no botão. o botão deve ficar com um estilo diferente enquanto estiver não clicavel. E antes de apertar em "Sim, Excluir" no modal, a cliente deve inserir sua senha para confirmar a exclusão.

Botão de visualizar a senha (emoji de olho) deve aparecer em todos os campos que a pessoa insere senha, no nomento ele so aparece na tela de login.

Na tela de Configure seu perfil passo 1 de 4 remova o campo de especialidade principal.


Ajustes tela dashboard

Filtro de Período nos Cards de Métricas: Os cards mostram Faturamento R$ 0,00 e Horas Ocupadas 0h, mas não fica claro se isso é do dia, da semana ou do mês.

Sugestão: Adicionar um seletor discreto no canto superior (ex: Hoje | Esta Semana | Este Mês) para dar contexto correto aos números.

Redundância de Faturamento: O valor de faturamento/ganhos aparece duas vezes (no banner escuro como "Ganhos Estimados" e no card branco como "Faturamento").

Ajuste: No banner escuro, foque em Próximo Atendimento (ex: "Próxima cliente: Ana às 14:00") para dar um senso de urgência operacional ao dia, deixando a métrica financeira concentrada no card de baixo

Botão "Copiar Chave Pix" no Modal de Novo Agendamento:
Ao criar um agendamento manual com sinal, a profissional costuma enviar a chave Pix para a cliente no WhatsApp. Adicionar um botão rápido "Copiar Chave Pix" ao salvar o agendamento facilita muito essa rotina.

Status Visual nos Cards da Lista "Próximos Agendamentos":
Quando houver itens na lista vazia, garanta que cada card de agendamento exiba etiquetas visuais claras de status:

🟢 Confirmado (Sinal pago)

🟡 Pendente Sinal (Aguardando Pix)

🔵 Concluído

🔴 Atrasado

Atalho para "Bloquear Agenda" (Folga / Imprevisto):
Profissionais da beleza frequentemente precisam fechar um horário de última hora (médico, almoço longo, imprevisto). Um botão ou opção discreta no banner como "Bloquear Horário Hoje" evita que clientes agendem nesses intervalos.

Ajustes tela de Agenda

Ajustes de Layout e UX (Interface)
Ajuste de Mês no Cabeçalho:
No carrossel de dias, o topo exibe "Agosto de 2026", mas os dias exibidos já entram em setembro (dia 1 é Terça-feira, dia 2 é Quarta-feira). Certifique-se de que o título do mês seja dinâmico e acompanhe a semana selecionada (ex: se a semana cruza meses, exibir "Ago / Set de 2026" ou atualizar dinamicamente).

Falta um Botão de Ação Rápida no Estado Vazio:
Na tela com o estado vazio ("Nenhum agendamento neste dia"), vale adicionar um botão primário "+ Adicionar Agendamento" ou "Bloquear este Dia" diretamente na área central. Isso poupa cliques caso ela queira encaixar alguém manualmente ali na hora.

Data Selecionada vs. Cabeçalho:
Na primeira imagem, o card do dia TER 1 está selecionado (destacado em vermelho), mas o texto abaixo diz "Quarta-feira, 2 de setembro". Trata-se de um pequeno desalinhamento visual do protótipo que deve ser corrigido no código (o texto do cabeçalho da lista deve corresponder exatamente ao dia clicado).

Recursos Úteis para Adicionar (Sem Alterar Escopo/Banco)
Indicador de Atendimento Domiciliar:
Se o agendamento for do tipo domiciliar (com base no campo clienteEndereco de appointments), coloque um ícone discreto de "Casa" ou uma tag "Domiciliar" no modal e no card da lista, para a profissional lembrar que precisa se deslocar.

Exibição do Sinal/Pix no Modal:
No modal da Camila Souza, o status está como Pendente. Seria excelente exibir um pequeno aviso: "Sinal de R$ 15,00 Pendente" ou um botão "Confirmar Recebimento do Sinal", aproveitando o campo sinalPago (boolean) que você já possui na tabela appointments.

Ajustes tela de Clientes
1. Cabeçalho e Controles Superiores (Ações Rápidas & Busca)
Botão Primário (+ Cadastrar Cliente): Adicionar um botão destacado no canto superior direito do cabeçalho da página (na cor principal do sistema) para permitir o cadastro manual rápido de uma cliente.

Ajuste na Barra de Busca: Alterar o texto do placeholder do campo de pesquisa para: "Buscar por nome ou WhatsApp..." (remover a menção a e-mail).

2. Lista / Tabela Populada com Dados Fictícios
Substituir o estado vazio por uma lista de cards ou tabela limpa exibindo os seguintes dados de clientes fictícias para homologação dos cenários:

Campos obrigatórios em cada linha/card:

Nome da Cliente e Telefone/WhatsApp

Total de Agendamentos Realizados (ex: 4 agendamentos)

Status/Tag Visual do Último Agendamento:

🟢 Confirmado (ex: Maria Silva • Sinal pago)

🟡 Pendente (ex: Ana Costa • Aguardando sinal Pix)

🔵 VIP / Frequente (ex: Carla Souza • +10 atendimentos)

Atalho de Ação Rápida: Ícone/Botão do WhatsApp direto na linha para abrir conversa no aplicativo instantaneamente.

3. Modal de Detalhes do Cliente (Ao clicar em um item da lista)
Criar o protótipo do modal que abre ao clicar em qualquer cliente da lista:

Cabeçalho do Modal: Nome completo, foto/inicial, número do WhatsApp e total acumulado gasto no estúdio.

Histórico de Atendimentos: Lista dos serviços contratados em ordem cronológica (ex: "Pedicure Completa - 01/09/2026 - R$ 45,00").

Métricas de Frequência: Tags visuais com contagem de Presenças vs. Faltas/No-Show.



Ajustes tela Financeiro

1. Componentes Visuais a Adicionar
Gráfico de Faturamento: Inserir um gráfico de barras simples na caixa central de "Faturamento Semanal" simulando a receita diária de Segunda a Domingo.

Título Dinâmico: Garantir que o título do gráfico acompanhe os botões (ex: "Faturamento Diário", "Faturamento Semanal", "Faturamento Mensal").

2. Preenchimento da Tabela "Transações Recentes"
Exibir uma lista contendo as seguintes linhas de exemplo:

Sinal Pix Recebido: 🟢 + R$ 15,00 | Sinal: Pedicure Completa - Camila Souza | Hoje, 10:00

Valor Restante Pago: 🟢 + R$ 30,00 | Saldo Final: Pedicure Completa - Camila Souza | Hoje, 10:50

Sinal Retido (No-Show): 🟡 + R$ 15,00 | Taxa de Cancelamento/Falta - Ana Costa | Ontem, 14:00

Reembolso: 🔴 - R$ 15,00 | Reembolso de Agendamento - Maria Silva | 28/08, 09:00

Ajustes tela Perfil

1. Cabeçalho e Dados do Estabelecimento
Avatar e Nome: Exibir a foto da profissional com badge de edição, nome do estúdio (Studio Bia Nails) e localização/modalidade ("Atendimento no Salão • Centro").

Bio Profissional: Preencher o primeiro campo de texto cinza com uma bio realista (ex: "Especialista em Alongamento em Fibra e Banho de Gel. Atendimento com hora marcada.").

Link do Perfil Público: Adicionar a tag/label "Seu Link de Agendamento" acima do campo contendo [belezaemdia.com/studio-bia-nails](https://belezaemdia.com/studio-bia-nails) acompanhado do botão "Copiar".

2. Preenchimento das Seções de Conteúdo
Horário de Funcionamento: Listar resumo das janelas da semana (ex: "Ter a Sáb: 09:00 às 18:00").

Serviços Oferecidos: Exibir cards de serviços cadastrados no catálogo (ex: "Pedicure Completa - R$ 45,00 (50min)") com indicação de 2 ativos.

Portfólio: Mostrar o card de upload + Adicionar ao lado de 2 ou 3 fotos fictícias já publicadas (com contador atualizado para 3 / 20 arquivos).

Ajustes tela de Configurações

1. Subtela: Pagamento e Sinal Pix
Campo do Valor do Sinal: Ao ativar a chave "Exigir taxa de sinal antecipada (Pix)", exibir dinamicamente um campo de input com duas opções de tipo:

[R$] Valor Fixo (ex: R$ 15,00)

[%] Porcentagem do Serviço (ex: 30%)

2. Subtela: Agenda e Expediente
Grade de Dias Semanais: Incluir na seção "DIAS E HORÁRIOS DA SEMANA" os seletores para cada dia de Segunda a Domingo com:

Checkbox/Toggle para ativar o dia.

Inputs de Horário Inicial e Horário Final.

Botão para "Adicionar Intervalo/Pausa" (ex: almoço das 12:00 às 13:00).

Card de Resumo Dinâmico: Garantir que a caixa de resumo no rodapé da página reaja às escolhas da profissional (ex: exibindo "Dias ativos: Seg, Ter, Qua, Qui, Sex").

1. Subtela: Compartilhamento & QR Code
Preenchimento da URL: Exibir no campo de entrada a URL gerada com o slug da profissional: [belezaemdia.com/studio-bia-nails](https://belezaemdia.com/studio-bia-nails).

QR Code Realista: Substituir o ícone genérico por uma renderização simulada de um QR Code visualmente funcional.

2. Subtela: Notificações
Nota Informativa: Incluir um pequeno texto auxiliar abaixo do toggle de WhatsApp informando que as mensagens automáticas utilizam o número oficial cadastrado nos Dados do Negócio.

Mensagem para Limite de Rate Limit (OTP):

Quando o usuário atingir o limite de 3 tentativas ou solicitar o reenvio pela 3ª vez, exiba um contador textual em tempo real no aviso: "Muitas tentativas incorretas. Aguarde 04:59 para tentar novamente."

Validação de Tamanho e Formato de Arquivo no Portfólio:

Definir limite por arquivo (ex: máximo de 10MB por imagem/vídeo) e formatos aceitos (.png, .jpg, .webp).

Se o usuário tentar subir um arquivo inválido, exibir o toast/alerta: "Arquivo não suportado. Envie imagens em PNG ou JPG de até 10MB."

Mascara e Validação de Inputs nos Formulários:

WhatsApp: Aplicar máscara automática (00) 00000-0000 e validar se possui o número correto de dígitos antes de liberar o botão de envio.

Valores em Dinheiro/Porcentagem: Garantir validação para que a taxa de sinal não ultrapasse 100% (quando em porcentagem) nem supere o valor total do serviço (quando em valor fixo).