# Backend Setup — Guia de Integração para Beleza em Dia

## 📋 Visão Geral

Este documento descreve como o frontend está estruturado para receber o backend real. O app está **pronto em modo frontend-first**, com autenticação desacoplada do banco de dados, permitindo que o backend seja integrado quando estiver pronto.

## 🏗️ Arquitetura Atual

### Camada de Autenticação

**Status**: Frontend pronto | Backend mock

O sistema de autenticação está estruturado com:

- **NextAuth 5.0** com estratégia JWT
- **Prisma ORM** com schema pré-definido (PostgreSQL)
- **Google OAuth 2.0** (opcional, ativa quando credenciais estiverem disponíveis)
- **Credenciais por email/senha** com bcrypt

### Inicialização Condicional

O banco de dados é inicializado com fallback seguro:

```typescript
// lib/db.ts
export const prisma: PrismaClient | null = /* mock ou real */
export function isDatabaseReady() {
  return Boolean(prisma && process.env.DATABASE_URL)
}
```

**Resultado**: A app compila e roda sem erros mesmo sem `.env.local` ou banco ativo.

---

## 🔐 Fluxos de Autenticação

### 1️⃣ Login com Email/Senha

**Rota Frontend**: `/login`

**Fluxo Atual (Mock)**:
```
1. Input: email + senha
2. Delay simulado (600ms)
3. Redirect: → /dashboard
```

**Fluxo com Backend Real**:
```
1. Input: email + senha
2. POST /api/auth/callback/credentials
   └─ Validar no banco (CredentialsProvider)
3. JWT criado e sessão ativada
4. Redirect: → /dashboard
```

**Dependência de Backend**:
- ✓ Tabela `User` com campos: `email`, `password` (hash bcrypt), `role`, etc.

---

### 2️⃣ Login com Google OAuth

**Rota Frontend**: Botão em `/signup`

**Fluxo Atual (Mock)**:
```
1. GoogleProvider está configurado mas desabilitado sem credenciais
2. Botão clicável apenas quando GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET existem
```

**Fluxo com Backend Real**:
```
1. Input: clique no botão "Continue with Google"
2. Redireção para Google consent screen
3. POST /api/auth/callback/google
   └─ Criar conta com email do Google
   └─ Salvar googleImage no User
   └─ Vincular Account (OAuth)
4. JWT criado
5. Redirect: → /dashboard
```

**Dependência de Backend**:
- ✓ Tabelas: `User`, `Account`
- ✓ Env vars: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`

---

### 3️⃣ Signup (Registro de Novo Usuário)

**Rota Frontend**: `/signup`

**Fluxo Atual (Mock)**:
```
1. Input: name + email + password
2. Delay simulado (400ms)
3. Redirect: → /termos
4. (Sem salvar no banco)
```

**Fluxo com Backend Real**:
```
1. Input: name + email + password
2. POST /api/signup
   ├─ Validar email único
   ├─ Hash senha com bcrypt
   ├─ Criar User no banco
   └─ Auto-login (opcional)
3. Redirect: → /termos (aceitar termos)
4. Redirect: → /onboarding (primeira configuração)
```

**Rota API Expected**:
```typescript
POST /api/signup
Body: {
  name: string
  email: string
  password: string
}
Response: {
  success: boolean
  user?: { id, email, name }
  error?: string
}
```

**Dependência de Backend**:
- ✓ Tabela `User`
- ✓ Validação de email único (constraint)
- ✓ Hash de senha (bcrypt)

---

### 4️⃣ Reset de Senha (Forgot Password)

**Rota Frontend**: `/esqueceu-senha/request` → `/esqueceu-senha/verify` → `/esqueceu-senha/new-password`

**Fluxo Atual (Mock)**:
```
Etapa 1 - Request:
  1. Input: email
  2. POST /api/auth/reset-password
  3. Response (dev): código 123456
  4. Salva email em sessionStorage

Etapa 2 - Verify:
  1. Input: 6 dígitos (OTP)
  2. POST /api/auth/verify-reset-code
  3. Se code === '123456': OK
  4. Salva token em sessionStorage

Etapa 3 - New Password:
  1. Input: password + confirmPassword
  2. POST /api/auth/reset-password-confirm
  3. Response (dev): sucesso
  4. Limpa sessionStorage
  5. Redirect: → /login
```

**Fluxo com Backend Real**:
```
Etapa 1 - Request:
  1. Input: email
  2. POST /api/auth/reset-password
  ├─ Validar email existe no User
  ├─ Gerar código 6 dígitos
  ├─ Salvar em PasswordResetToken (expira em 15 min)
  └─ Enviar email com código (nodemailer, SendGrid, AWS SES, etc)

Etapa 2 - Verify:
  1. Input: código 6 dígitos
  2. POST /api/auth/verify-reset-code
  ├─ Buscar token no PasswordResetToken
  ├─ Validar não expirou
  └─ Retornar ID do token para próxima etapa

Etapa 3 - New Password:
  1. Input: password + confirmPassword
  2. POST /api/auth/reset-password-confirm
  ├─ Validar token não usado
  ├─ Hash nova senha
  ├─ Atualizar User.password
  └─ Marcar PasswordResetToken como used
```

**Rotas API Expected**:
```typescript
POST /api/auth/reset-password
Body: { email: string }
Response: { success: boolean, message: string }

POST /api/auth/verify-reset-code
Body: { email: string, code: string }
Response: { success: boolean, token: string }

POST /api/auth/reset-password-confirm
Body: { email: string, token: string, newPassword: string }
Response: { success: boolean, message: string }
```

**Dependência de Backend**:
- ✓ Tabelas: `User`, `PasswordResetToken`
- ✓ Serviço de email para envio (fora do escopo deste app)

---

## 📊 Schema Prisma (Pronto)

O schema está definido em `prisma/schema.prisma` com todos os modelos necessários:

### Autenticação
- `User` — profissional/dono da conta
- `Account` — OAuth (Google, etc)
- `Session` — sessões persistidas
- `VerificationToken` — tokens de verificação
- `PasswordResetToken` — tokens de reset de senha

### Domínio de Negócio
- `Client` — clientes atendidos
- `Service` — serviços oferecidos
- `Appointment` — agendamentos
- `Transaction` — movimentação financeira
- `BusinessConfig` — configurações do negócio

---

## 🔧 Como Ativar o Backend Real

### Passo 1: Configurar Banco de Dados

```bash
# .env.local (crie na raiz de beleza-em-dia/)
DATABASE_URL="postgresql://user:password@localhost:5432/beleza_em_dia"

# NextAuth
NEXTAUTH_SECRET="generate_with: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (opcional)
GOOGLE_CLIENT_ID="xxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxx"
```

### Passo 2: Criar e Popular o Banco

```bash
cd beleza-em-dia/

# Criar schema no banco
npx prisma migrate deploy

# Seed inicial (opcional)
npx prisma db seed
```

### Passo 3: Testar a Compilação

```bash
npm run build
npm start
```

---

## 📝 Rotas de API Préprodução

O frontend espera que o backend implemente:

### Auth
- `POST /api/auth/callback/credentials` — CredentialsProvider (NextAuth)
- `POST /api/auth/callback/google` — GoogleProvider (NextAuth)
- `POST /api/auth/reset-password` — solicitar reset
- `POST /api/auth/verify-reset-code` — verificar OTP
- `POST /api/auth/reset-password-confirm` — confirmar novo password
- `POST /api/signup` — criar conta

### Clientes
- `GET /api/clients`
- `POST /api/clients`
- `GET /api/clients/[id]`
- `PUT /api/clients/[id]`
- `DELETE /api/clients/[id]`

### Serviços
- `GET /api/services`
- `POST /api/services`
- `GET /api/services/[id]`
- `PUT /api/services/[id]`
- `DELETE /api/services/[id]`

### Agendamentos
- `GET /api/appointments`
- `POST /api/appointments`
- `GET /api/appointments/[id]`
- `PUT /api/appointments/[id]`
- `DELETE /api/appointments/[id]`

### Transações / Financeiro
- `GET /api/transactions`
- `POST /api/transactions`
- `GET /api/transactions/[id]`
- `PUT /api/transactions/[id]`

### Perfil
- `GET /api/profile`
- `PUT /api/profile`

---

## 🎯 Checklist de Backend

- [ ] Banco PostgreSQL criado e rodando
- [ ] Schema Prisma migrado
- [ ] Serviço de email configurado (para reset de senha)
- [ ] Implementar `/api/signup`
- [ ] Testar fluxos de login/signup
- [ ] Implementar endpoints de CRUD para clientes
- [ ] Implementar endpoints de CRUD para serviços
- [ ] Implementar endpoints de CRUD para agendamentos
- [ ] Implementar endpoints de transações
- [ ] Configurar CORS (se necessário)
- [ ] Validar autenticação em todas as rotas
- [ ] Testar fluxo completo de reset de senha

---

## 🚀 Próximos Passos (Frontend)

Quando o backend estiver ativo:

1. **Testar fluxo completo de auth**
   - Signup → Onboarding → Dashboard
   - Login com credenciais
   - Login com Google
   - Reset de senha

2. **Implementar dados reais**
   - Remover mocks de `lib/mock-data.ts`
   - Conectar componentes a endpoints reais

3. **Melhorias de UX**
   - Loading states durante requisições
   - Mensagens de erro personalizadas
   - Retry logic para falhas de rede
   - Offline mode com service workers

4. **Testes e2e**
   - Testar fluxos críticos com Playwright/Cypress
   - Testar performance
   - Testar acessibilidade

---

## 📚 Referências

- [NextAuth Documentation](https://next-auth.js.org/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [PostgreSQL Best Practices](https://wiki.postgresql.org/wiki/Performance_Optimization)

---

**Última atualização**: 2025-08-31
**Status**: Frontend pronto para backend
**Versão**: 1.0
