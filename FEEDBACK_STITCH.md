# Feedback para Stitch - Ajuste de Contexto e Próximas Telas

## 📋 Observação importante sobre a tela criada

A dashboard do profissional que você criou está **visualmente correta** e **bem estruturada**, mas há um **detalhe de contexto** que precisa ser ajustado.

---

## 🔴 Problema identificado

O botão **"Novo Agendamento"** e **"Compartilhar Link da Agenda"** na dashboard da profissional estão em **contexto confuso**.

### Por que?

O sistema **Beleza em Dia** tem **dois fluxos completamente diferentes**:

1. **Página Pública da Cliente** (`/[slug]` ou URL da agenda pública)
   - Cliente SEM login vindo de Instagram/WhatsApp
   - Objetivo: encontrar serviços, consultar horários DISPONÍVEIS e AGENDAR
   - Botão "Novo Agendamento" faz sentido AQUI
   - Botão "Compartilhar Link" faz sentido AQUI (compartilhar com amigos)

2. **Dashboard da Profissional** (área administrativa logada)
   - Profissional JÁ logada
   - Objetivo: GERENCIAR agendamentos já feitos, clientes, faturamento
   - Botão "Novo Agendamento" NÃO faz sentido (quem cria agendamento é o cliente, não a profissional)
   - Botão "Compartilhar Link" faz sentido em outro contexto (Configurações/Perfil, para compartilhar seu perfil público)

---

## ✅ Diferença entre os contextos

### PÁGINA PÚBLICA (Cliente descobrindo / agendando)
```
URL: belezaemdia.com/ana-silva
OU: belezaemdia.com/salao-premium

Fluxo:
1. Cliente chega (sem login, vindo de rede social ou busca)
2. Vê perfil profissional / serviços / horários disponíveis
3. Clica em "Novo Agendamento"
4. Preenche dados (data, horário, serviço, dados pessoais)
5. Confirma
6. Compartilha link com amigas

Navegação: apenas os serviços, perfil e horários da profissional
```

### DASHBOARD DA PROFISSIONAL (Gerenciamento)
```
URL: belezaemdia.com/dashboard

Fluxo:
1. Profissional faz login
2. Vê seus agendamentos FUTUROS e PASSADOS
3. Clica EM CIMA de um agendamento para:
   - Ver detalhes do cliente
   - Confirmar/cancelar
   - Adicionar notas
   - Marcar como concluído
   - Enviar mensagem
4. Usa ações rápidas:
   - Visualizar agenda em diferentes visualizações
   - Filtrar por status, serviço, cliente
   - Acessar relatórios de faturamento
   - Gerenciar horários bloqueados
   - Editar perfil/serviços/configurações

Navegação: Dashboard, Agenda, Clientes, Financeiro, Perfil (conforme a estrutura atual do painel profissional)
```

---

## 🎯 Ações que faltam na Dashboard

Por favor, crie as seguintes **telas de interação** para a dashboard do profissional:

### 1. Detalhes do Agendamento (ao clicar em um agendamento na lista)

**Informações a mostrar:**
- Nome do cliente
- Serviço agendado
- Data e horário
- Duração
- Valor
- Telefone/contato do cliente
- Status (confirmado/pendente/cancelado)
- Histórico (cliente tem quantos agendamentos?)

**Ações disponíveis:**
- ✅ Confirmar agendamento
- ⏸ Remarcar
- ❌ Cancelar
- 💬 Enviar mensagem (WhatsApp)
- ✔ Marcar como concluído (após a data)
- 📝 Adicionar notas

---

### 2. Tela "Compartilhar Link da Agenda"

**Contexto:** A profissional quer compartilhar seu perfil público com clientes/amigas.

**Mostrar:**
- Link copiável da agenda pública
- Preview do que o cliente vai ver
- Opções de compartilhamento:
  - Copiar link
  - Compartilhar via WhatsApp
  - Compartilhar via Email
  - QR code

**Estilo:** Modal ou tela deslizável

---

### 3. Novo Agendamento (opcional para a dashboard)

Se a profissional precisar criar um agendamento manual (ex: cliente ligou):
- Buscar/criar cliente
- Selecionar serviço
- Escolher data/horário
- Confirmar

Mas isso é MENOS prioritário que as outras.

---

## 📝 Resumo das alterações

| Elemento | Situação Atual | Situação Corrigida |
|----------|----------------|--------------------|
| Botão "Novo Agendamento" | Confuso na dashboard | Deixa só em telas de ação ou remove |
| Botão "Compartilhar Link" | Confuso na dashboard | Move para modal/overlay ou Configurações |
| Clicar em agendamento | Sem ação | Abre detalhes + ações (confirmar, cancelar, etc) |
| Status dos agendamentos | Já está bom ✅ | Mantém |
| Bottom nav | Já está bom ✅ | Mantém |

---

## 🚀 Próximo passo

Por favor, crie estas 2-3 telas em sequência:

1. **Detalhes do Agendamento** (clicável a partir da lista)
2. **Modal de Compartilhar Link**
3. (Opcional) **Novo Agendamento Manual**

Após isso, podemos pensar na **página pública** (cliente externo agendando).

---

## 📌 Notas adicionais

- A dashboard atual é perfeita em estrutura, cores e layout
- Apenas a lógica/conteúdo dos botões precisa ser ajustada
- Manter o bottom nav mobile e sidebar desktop conforme está
- Usar as mesmas cores e componentes (design system já está ótimo)

Obrigado! 👍
