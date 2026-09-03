# 🛡️ Diretrizes de Segurança, Privacidade e LGPD

Documento de conformidade e arquitetura de segurança para o ecossistema **Beleza em Dia** (Lei nº 13.709/2018).

---

## 1. 🔒 Segurança da Infraestrutura & Banco de Dados

* **Proteção de Senhas:** Nenhuma senha é armazenada em texto puro. Utilizar exclusivamente hash forte e irreversível (`bcrypt` ou `argon2`) com *salt*.
* **Criptografia em Trânsito e Repouso:** Todo o tráfego utiliza HTTPS/TLS. Conexões de banco de dados e segredos de gateway requerem suporte SSL/TLS ativado.
* **Isolamento de Tenants (Multi-tenancy):**
  * Todas as queries do backend aplicam filtros estritos baseados na sessão autenticada (`WHERE tenantId = session.tenantId`).
  * Nenhuma rota de API expõe dados de um salão para outro.
* **Acesso Administrativo:** O acesso ao console do banco de dados em produção exige Autenticação em Dois Fatores (2FA) e restrição por IP quando aplicável.

---

## 2. ⚖️ Conformidade com a LGPD

### Papéis do Sistema
* **Profissional (Salão):** Controladora dos dados das suas respectivas clientes.
* **Beleza em Dia (Plataforma):** Operadora do processamento de agendamentos e Controladora dos dados de cadastro da profissional.

### Requisitos de Consentimento e Transparência
1. **Cadastro da Profissional (`/signup`):** Aceite explícito e obrigatório dos Termos de Uso (`TERMOS_DE_USO.md`) e da Política de Privacidade.
2. **Vitrine Pública (Agendamento do Cliente):** Aviso de privacidade claro abaixo do formulário de agendamento:
   > *"Ao agendar, você concorda que seus dados sejam compartilhados com [Nome do Estabelecimento] para gestão de agendamentos e lembretes via WhatsApp."*

### Direitos dos Titulares
* **Direito ao Esquecimento (Exclusão):** Em caso de cancelamento de conta pela profissional, o sistema deve anonimizar ou remover permanentemente os registros atrelados.
* **Sigilo de Notas Internas (`clients.notasInternas`):** As anotações confidenciais feitas pela profissional sobre preferências ou restrições das clientes são de uso exclusivo do atendimento e jamais serão compartilhadas ou comercializadas.
* **Uso Restrito de Contatos:** A base de contatos capturada por um estabelecimento é de uso exclusivo dele para lembretes e confirmações. É proibida a utilização para disparos de marketing da plataforma sem consentimento direto.