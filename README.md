## Sobre o Projeto

Este projeto é uma aplicação web desenvolvida com **Next.js**, **Prisma** e **PostgreSQL**, que exibe informações sobre unidades do McDonald's.

**Importante:** As informações apresentadas são fictícias e foram criadas para fins educacionais e demonstrativos. Nenhuma das unidades exibidas é real, e os dados não correspondem a estabelecimentos reais do McDonald's.

---

## 🌐 Acesse a Aplicação

A aplicação está hospedada e disponível para acesso público no seguinte link:

🔗 [https://mcdonalds-gabrieldani.vercel.app/](https://mcdonalds-gabrieldani.vercel.app/)

---

## Tecnologias Utilizadas

- **Next.js**: Framework React para construção de interfaces de usuário.
- **Prisma**: ORM para Node.js, facilitando a interação com o banco de dados.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
- **Tailwind CSS**: Framework utilitário para estilização rápida e responsiva.

---

## Pré-requisitos

Antes de rodar o projeto localmente, é necessário instalar algumas ferramentas:

### 1. Node.js

O Node.js é necessário para executar o ambiente de desenvolvimento e instalar dependências.

#### Instalação no Windows

1. Acesse o site oficial do Node.js: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
2. Baixe o instalador recomendado para o seu sistema operacional.
3. Execute o instalador e siga as instruções na tela.

Após a instalação, verifique se o Node.js foi instalado corretamente:

```bash
node -v
npm -v
```

### 2. PostgreSQL

O PostgreSQL é o banco de dados utilizado no projeto.

#### Instalação no Windows

1. Acesse o site oficial do PostgreSQL: [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)
2. Baixe o instalador para Windows.
3. Execute o instalador e siga as instruções na tela. Durante a instalação, defina a senha do superusuário (geralmente "postgres").
4. Após a instalação, abra o pgAdmin (ferramenta gráfica para administração do PostgreSQL) e crie um novo banco de dados chamado `mcdonalds_db`.

---

## Configuração do Ambiente

### 1. Clonando o Repositório

Clone o repositório para sua máquina local:

```bash
git clone https://github.com/GabrielDani/mcdonalds.git
cd mcdonalds
```

### 2. Instalando Dependências

Instale as dependências do projeto:

```bash
npm install
```

### 3. Configurando o Banco de Dados

Crie um arquivo `.env` na raiz do projeto com a seguinte variável de ambiente:

```env
DATABASE_URL=postgresql://<usuário>:<senha>@localhost:5432/mcdonalds_db?schema=public
```

Substitua `<usuário>` e `<senha>` pelas credenciais do seu banco de dados PostgreSQL.

### 4. Executando as Migrations

Para configurar o banco de dados com as tabelas necessárias, execute:

```bash
npx prisma migrate dev
```

### 5. Populando o Banco de Dados (Seed)

Para popular o banco de dados com dados iniciais, execute:

```bash
npx prisma db seed
```

---

## Executando o Projeto

Para rodar o servidor de desenvolvimento, execute:

```bash
npm run dev
```

O projeto estará disponível em [http://localhost:3000](http://localhost:3000).

---

## Estrutura do Projeto

- `prisma/`: Contém o arquivo `schema.prisma` e o script de seed.
- `src/`: Contém os componentes e páginas da aplicação.
- `public/`: Contém arquivos estáticos como imagens.
- `tailwind.config.ts`: Configuração do Tailwind CSS.
- `tsconfig.json`: Configuração do TypeScript.

---

## Deploy

O projeto está hospedado na Vercel. Para realizar o deploy:

1. Acesse [https://vercel.com](https://vercel.com) e crie uma conta ou faça login.
2. Clique em "New Project" e conecte seu repositório do GitHub.
3. Durante a configuração, defina a variável de ambiente `DATABASE_URL` com a URL de conexão do seu banco de dados PostgreSQL.

---

## Contribuindo

1. Faça um fork deste repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Faça suas alterações e commit (`git commit -am 'Add nova-feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

---
