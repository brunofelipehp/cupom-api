# 🧠 Cupom-api

> Breve descrição do projeto. Ex: API REST para gerenciamento de usuários, produtos ou qualquer outra funcionalidade.

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [Zod](https://zod.dev/) — Validações de dados
- [Express](https://expressjs.com/) ou [Fastify](https://www.fastify.io/) *(dependendo do projeto)*
- [dotenv](https://www.npmjs.com/package/dotenv) — Variáveis de ambiente

## 📁 Estrutura de Pastas (Exemplo)

```
src/
├── controllers/
├── lib/
├── routes/          
├── schema/  # Zod schemas
├── server.ts
```

## ⚙️ Configuração do Ambiente

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/seu-projeto.git
cd seu-projeto
```

2. **Instale as dependências**

```bash
pnpm install
# ou
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` com base no `.env.example`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/database"
PORT=3333
JWT_SECRET=suachavesecreta
```

4. **Execute as migrações do banco**

```bash
npx prisma migrate dev
```

5. **Inicie o servidor**

```bash
pnpm dev
# ou
npm run dev
```

## 🧪 Testes

*Incluir aqui se utilizar alguma biblioteca de testes, como Jest ou Vitest.*

```bash
pnpm test
```

## 🛡️ Validações com Zod

Todos os dados de entrada (ex: corpo da requisição) são validados utilizando `zod` para garantir integridade e segurança.

## 🔐 Autenticação (se aplicável)

Este projeto utiliza autenticação baseada em JWT. As rotas protegidas requerem um token válido no header `Authorization`.

## 📝 Licença

Este projeto está licenciado sob a licença MIT.

---

Desenvolvido com 💻 por [Seu Nome](https://github.com/seu-usuario)
