
-----



Mostra os próximos agendamentos do dia, o estado dele (confirmado, pendente, finalizado ou cancelado)

Confirmado: Se obrigatório, um agendamento é confirmado após o pagamento do sinal, se não necessário, confirmado após mandar mensagem para a profissional. Quando clico sobre um agendamento concluído, consigo ver as informações como nome, telefone, data e hora do agendamento, preço e confirmação que o sinal foi pago (caso seja necessário)



Pendente: Se obrigatório, um agendamento é pendente enquanto o sinal não for pago, se não necessário, pendente enquanto não mandar mensagem para a profissional.  Quando clico sobre um agendamento pendente, consigo ver as informações como nome, telefone, data e hora do agendamento, preço e aviso que o sinal está pendente (caso seja necessário)

Finalizado: Quando já ocorreu aquele atendimento

Cancelado: quando o cliente cancela o agendamento ou a profissional. Caso o sinal tenha sido pago ou não ( se necessário), deve mostrar

Nessa tela tem dois botões, Compartilhar Link de Agenda e Novo Agendamento

Botão de  Compartilhar Link de Agenda

Ao clicar, abre um modal com o qr code do link publico da profissional, onde aparece o portfolio da profissional e o cliente consegue fazer seu agendamento

aparece o link por escrito caso ela queira copiar
e aparece o botão de whatsapp (remover do instagram) que quando eu clico, envia uma mensagem automatica 

"Olá! Gostaria de agendar um horário comigo? Acesse meu link oficial de agendamentos: https:minhaurl.com.br"


Novo agendamento

Ao clicar, aparece um modal com algumas informações a serem preenchidas

Nome da cliente, whatsapp, serviço (podendo seelcionar mais de um, ai apareceria ou em checkbox ou select para selecionar os serviços cadastrados)


data e hora do atendimento

valor do sinal pix (caso ela use, esse campo vem pre preenchido já), caso nao use, campo fica bloqueado

após preencher as informações,  gera um novo modal escrito link de confirmação gerado

nesse modal tem as sequintes informações

Pré-reserva cadastrada!

Envie o link abaixo para a cliente confirmar o horário e efetuar o sinal Pix.

abaixo disso mostra a url gerada exemplo: http://localhost:3000/confirmar/1788463142818-dfwti

e um botão

Copiar texto pronto para enviar


Ao clicar, gera um texto exemplo: "Olá nome! Seu agendamento para *Agendamento* no dia *11/11/2011 às 11:00* foi pré-reservado no Beleza em Dia. ✨

Para confirmar seu horário e realizar o sinal, acesse o link:
http://localhost:3000/confirmar/1788463142818-dfwti"

aí ao acessar esse link,

iria aparecer um modal de Confirmação de Reserva
Revise os detalhes do seu agendamento

aí aparece um aviso escrito "pendente de sinal"

e os dados como 

Profissional / Salão:
Studio Bia Nails (Beatriz Oliveira)
Serviço Escolhido:
ooooooooooooooo
Data e Horário:
2011-11-11 às 11:00
Valor Total:
R$ 25,00

Sinal Necessário

Para garantir sua vaga na agenda

R$ 30,00

e a chave pix pra copiar

e aparece ou
"Fazer pagamento via QR code

aí aparece o qr code  com valor e escrito "Aponte a câmera no app do seu banco"

e ao pagar, sistema entende e volta e mostra o aviso 

"Reserva Confirmada com Sucesso!
Seu horário está garantido. Te esperamos no horário agendado! "



Tela de Agenda

tem um calendário que mostra os dias e, ao clicar em um dia, vejo os agendamentos daquele dia com a situação do agendamento se está pendente, confirmado, finalizado ou cancelado

ao clicar mostra  um modal com as mesmas informações que mostra na tela de dashboard também, so que quando clica no nome, consigo ir para a tela de clientes e ver todas as informações do cliente, e um campo de notas pra dizer alguma coisa que eu queira sobre ele



Tela de Clientes

aparece uma barra de pesquisa e abaixo todos os clientes que já agendaram com ela, a quantidade de visitas e a data da ultima vez, ao clicar vejo todas as informações dele e o Histórico de Agendamentos
e tenho a seção de Notas Internas
 que posso escrever coisas como "Prefere esmaltes em tons nudes e formato amendoado. Cutículas sensíveis."



Tela de FInanceiro

nessa tela eu Acompanho o faturamento e transações

mostrando ticket médio, Crescimento vs. mês/semana/dia anterior


e um gráfico de crescimento semanal

abaixo, mostra as transações recentes e o tipo de transação (tire isso do mvp e adicione em ideias futuras)


Tela de Perfil

nessa tela mostra as informações da profissional como nome, nome do salão, descrição e o link do perfil publico e um botão de ver perfil publico, que mostra como mostrará seu perfil para os clientes, e tem seção de adicionar fotos para seu portfólio, que apareceção em seu perfil

Quando a profissional clica em ver perfil publico, ela apenas pode visualizar o perfil editar, não consegue agendar, caso seja o cliente, ele pode ver e marcar agendamento e selecionar seus serviços no mínimo 1, pagar sinal pix (se necessário) digitar seus dados e endereço (endereço so se a cliente atende domicilio e se atende ambos, ela seleciona onde quer ser atendida, e se selecionou casa, mostra o preço que a profissional cobra caso atenda em casa (se ela cobrar algo, pois é opcional)


Tela de Configurações


Centro de controle e parametrização do seu negócio



Tem algumas seções:

Dados do Negócio

Consigo editar minhas informações como
Foto de perfil
Nome do negócio
Nome da profissional
CPF ou CPNJ (remover esse campo)
Telefone
Email de contato (remover esse campo)
Instagram profissional (remover esse campo)
Endereço do estabelecimento  e cidade/UF (esse campo existe em outro local, remova dessa tela)
bio profissional

serviços oferecidos (remova dessa tela, isso existe em outro local

---



Pagamento e Sinal Pix

Botão de aivar ou não o
Exigir taxa de sinal antecipada (Pix)
se ativo, profissional escolhe se  cobra o sinal com valor fixo ou em porcentagem (limite até 100)
coloca o  valor do sinal fixo ou porcentagem
e seleciona o Prazo de Cancelamento sem Perda


campo de Formas de Pagamento no Salão / Balcão - remover, não está no MVP








notificações


tem 3 tipos de notificações

Novos Agendamentos: Receber um e-mail transacional sempre que uma cliente agendar e pagar o sinal.


Cancelamentos e Desmarcações : Receber um e-mail se um agendamento for cancelado ou uma vaga liberada.


Lembretes de Atendimento (In-App / WhatsApp): Alerta visual no painel e link rápido inteligente (wa.me) para lembrar a cliente do próximo horário sem custo.

caso ative alguma deve funcionar


Segurança e Conta


mostra o metodo de acesso de sua conta

via email e senha ou google

caso seja via email, tem campos de mudar senha
ela preenche a senha atual, nova senha e confirmação de senha, com as mesmas validações 

aparencia do painel 
Modo claro
Modo escuro
Padrao do sistema

Zona de Perigo

Ações com impacto na sessão e nos dados cadastrados.

Sair da Conta (Logout)
Excluir Conta

	
Agenda e Expediente

Seleciona o tipo de agenda e seus horários, funciona idêntico a configuração de perfil
caso ela não tenha selecionado lá, é pbrigatorio preencher aqui caso ela  queira que o sistema funcione, se não, os botões como criar agendamento e o link publico não estarão disponíveis para aquela profissional



Local de Atendimento


tem 3 opções

salão, domicilio e ambos

salão preenche o endereço do salão
rua
numero
complemento(opcional)
bairro
cidade
estado
cep (adicionar esse campo)



Compartilhamento e Qr Code

aparece o
Seu Link Público de Agendamento

Cole este link na sua Bio do Instagram ou envie diretamente para as clientes.


QR Code para Recepção / Balcão

Imprima e coloque na sua recepção para que clientes agendem direto pelo celular.

Qr code pode ser baixado em imagem png

Compartilhamento Rápido

aparece botão de compartilhar link no zap
botão ver vitrine (remova dessa tela)


Meus Serviços - nova tela que será criada

assim como na configuração de perfil, profissional pode gerenciar seus serviços aqui


Minha Agenda e Horários de Trabalho



assim como na configuração de perfil, profissional pode gerenciar sua agenda aqui


