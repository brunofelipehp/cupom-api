# 🎟️ Cupom API

API REST para gerenciamento de cupons promocionais, desenvolvida com Node.js, TypeScript, Prisma e Zod.

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [Zod](https://zod.dev/) — Validações de dados
- [Fastify](https://www.fastify.io/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [SQLite](https://www.sqlite.org/) — Banco de dados leve e local

## 📁 Estrutura de Pastas


```
cupom-api/
├── prisma/
├── src/
│   ├── controllers/
│   ├── lib/
│   ├── routes/
│   ├── schema/
│   └── server.ts
├── package-lock.json
├── Readme.md
└── .gitIgnore
```

## ⚙️ Configuração do Ambiente

1. **Clone o repositório**

```bash
git clone https://github.com/brunofelipehp/cupom-api.git
cd cupom-api
```

2. **Instale as dependências**

```bash
pnpm install
# ou
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env`:

```env
DATABASE_URL="file:./dev.db"
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


## 🛡️ Validações com Zod

Todos os dados de entrada são validados utilizando `zod`, garantindo segurança e integridade.

## 📌 Observações

- Este projeto utiliza Fastify, que oferece alta performance para criação de APIs modernas.
- Prisma é utilizado como ORM para facilitar o acesso e manipulação dos dados com SQLite.

## 📝 Licença

Este projeto está licenciado sob a licença MIT.

---

Desenvolvido com 💻 por [Bruno Felipe](https://github.com/brunofelipehp)
