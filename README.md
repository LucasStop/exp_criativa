# Cakeria

Cakeria é uma plataforma online para gerenciamento de uma confeitária. O projeto está estruturado em duas partes principais: **backend** (Node.js/Express, utilizando Sequelize) e **frontend** (arquivos estáticos ou framework JS). Além disso, há um arquivo `script.sql` para criação ou configuração inicial do banco.

## Índice

- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Principais](#tecnologias-principais)
- [Instalação e Configuração](#instalação-e-configuração)
  - [1. Banco de Dados](#1-banco-de-dados)
  - [2. Backend](#2-backend)
  - [3. Frontend](#3-frontend)
- [Uso de NPM e Yarn](#uso-de-npm-e-yarn)
- [Scripts Úteis](#scripts-úteis)
- [Uso](#uso)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

---

## Estrutura do Projeto

```plaintext
Cakeria/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── migrations/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── seeders/
│   ├── .env            # Variáveis de ambiente do backend
│   ├── app.js          # Ponto de entrada do servidor
│   ├── package.json
│   └── yarn.lock       # Lockfile do Yarn (ou package-lock.json se estiver usando npm)
├── frontend/
│   ├── public/
│   ├── assets/
│   ├── components/
│   ├── css/
│   ├── imgs/
│   ├── js/
│   ├── index.html
│   ├── .env            # Variáveis de ambiente do frontend (se necessário)
│   ├── app.js          # Script principal do frontend
│   ├── package.json
│   └── yarn.lock       # Lockfile do Yarn (ou package-lock.json se estiver usando npm)
├── .gitignore
├── README.md
└── script.sql          # Script SQL para criação/configuração inicial do banco
```

### Descrição das Principais Pastas e Arquivos

- **backend/**: Código-fonte do servidor (Node.js + Express), incluindo configurações, rotas, controladores, modelos, migrações e seeders do Sequelize.
- **frontend/**: Código-fonte do frontend, podendo ser arquivos HTML/CSS/JS puros ou um framework (React, Vue, Angular).
- **script.sql**: Script para criação e configuração inicial do banco de dados.

---

## Tecnologias Principais

- **Node.js + Express** para o servidor.
- **Sequelize** para ORM (mapeamento objeto-relacional).
- **MySQL / PostgreSQL / etc.** como banco de dados (dependendo da escolha).
- **HTML, CSS, JS** (ou framework como React) para o frontend.
- **dotenv** para gerenciamento de variáveis de ambiente.

---

## Instalação e Configuração

### 1. Banco de Dados

1. Instale e configure o SGBD de sua preferência (MySQL, PostgreSQL etc.).
2. Crie um banco de dados (por exemplo, `cakeria_db`).
3. Execute o `script.sql` para criar tabelas/configurações iniciais (exemplo para MySQL):
   ```bash
   mysql -u seu_usuario -p cakeria_db < script.sql
   ```
4. Caso vá utilizar migrations do Sequelize, você pode rodar:
   ```bash
   npx sequelize db:migrate
   npx sequelize db:seed:all
   ```
   (Verifique na seção [Scripts Úteis](#scripts-úteis) como executar via npm ou yarn.)

### 2. Backend

1. Navegue até a pasta do backend:
   ```bash
   cd backend
   ```
2. Instale as dependências (com **npm** ou **yarn**, veja a próxima seção sobre como escolher):
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn
   ```
3. Crie ou edite o arquivo `.env` com as variáveis de ambiente. Exemplo:
   ```bash
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASS=sua_senha
   DB_NAME=cakeria_db
   DB_DIALECT=mysql
   PORT=8080
   ```
4. Inicie o servidor:
   ```bash
   npm run dev
   ```
   ou
   ```bash
   yarn dev
   ```
   O servidor estará disponível em `http://localhost:8080` (ou na porta definida no `.env`).

### 3. Frontend

1. Em outro terminal, volte para a raiz do projeto e entre em `frontend`:
   ```bash
   cd ../frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```
   ou
   ```bash
   yarn start
   ```
4. Abra seu navegador em `http://localhost:3000` (ou a porta exibida no terminal).

---

## Uso de NPM e Yarn

Este projeto pode utilizar **npm** ou **yarn** para gerenciar dependências. A recomendação é **escolher um** gerenciador e mantê-lo em todo o projeto, para evitar conflitos nos arquivos de lock (`package-lock.json` e `yarn.lock`).

- Se optar por **npm**, use:
  ```bash
  npm install
  npm start
  npm run dev
  npm run build
  ```
- Se optar por **yarn**, use:
  ```bash
  yarn
  yarn start
  yarn dev
  yarn build
  ```

> **Dica**: Se você já tem o `yarn.lock` no projeto, provavelmente o projeto foi configurado com Yarn. Caso contrário, se existe apenas `package-lock.json`, o projeto foi configurado com npm.

---

## Scripts Úteis

No **backend** (em `package.json`), alguns scripts comuns podem ser:

- **`npm run dev`** ou **`yarn dev`**: Inicia o servidor em modo de desenvolvimento (geralmente com `nodemon`).
- **`npm start`** ou **`yarn start`**: Inicia o servidor em modo de produção.
- **`npm run migrate`** ou **`yarn migrate`**: Executa `npx sequelize db:migrate`.
- **`npm run seed`** ou **`yarn seed`**: Executa `npx sequelize db:seed:all`.
- **`npm run rollback`** ou **`yarn rollback`**: Reverte a última migração (`npx sequelize db:migrate:undo`).

No **frontend** (em `package.json`), você pode ter scripts como:

- **`npm start`** ou **`yarn start`**: Inicia o servidor de desenvolvimento.
- **`npm run build`** ou **`yarn build`**: Gera uma versão de produção otimizada.
- **`npm run serve`** ou **`yarn serve`**: Serve localmente a build de produção (dependendo do framework utilizado).

> Ajuste esses scripts de acordo com a configuração real do seu projeto.

---

## Scripts do Package (Backend)

Os scripts abaixo estão configurados no arquivo `package.json` para facilitar tarefas comuns de gerenciamento e manutenção do banco de dados e do servidor:

```json
"scripts": {
  "start": "node app.js", // Inicia o servidor em modo de produção
  "dev": "nodemon app.js", // Inicia o servidor em modo de desenvolvimento, com recarregamento automático
  "migrate": "sequelize db:migrate", // Executa as migrações do banco de dados
  "seed": "sequelize db:seed:all", // Popula o banco com dados iniciais (seeds)
  "db:reset": "sequelize db:migrate:undo:all && sequelize db:migrate", // Reseta o banco, revertendo e reaplicando as migrações
  "db:clear-data": "node scripts/truncate-data.js", // Limpa os dados existentes no banco de dados
  "db:drop-tables": "node scripts/clean-database.js", // Remove todas as tabelas do banco de dados
  "db:rebuild": "npm run db:drop-tables && npm run migrate && npm run seed", // Recria o banco de dados (apaga, migra e popula com seeds)
  "db:refresh": "npm run db:clear-data && npm run seed" // Limpa os dados atuais e repopula o banco com os seeds
}
```

### Descrição dos Scripts

- **`start`**: Inicia o servidor em modo de produção utilizando o comando `node app.js`.
- **`dev`**: Inicia o servidor com `nodemon`, que reinicia automaticamente o serviço a cada alteração no código, facilitando o desenvolvimento.
- **`migrate`**: Executa as migrações definidas para configurar e atualizar a estrutura do banco de dados.
- **`seed`**: Popula o banco de dados com dados iniciais definidos nos arquivos seeders.
- **`db:reset`**: Reverte todas as migrações e as reaplica, permitindo reiniciar a estrutura do banco.
- **`db:clear-data`**: Executa um script para limpar os dados existentes no banco, sem alterar a estrutura.
- **`db:drop-tables`**: Remove as tabelas existentes no banco de dados, útil para uma limpeza completa.
- **`db:rebuild`**: Realiza uma sequência de operações para apagar as tabelas, migrar a estrutura e repopular o banco com os dados iniciais.
- **`db:refresh`**: Limpa os dados existentes e repopula o banco, mantendo a estrutura das tabelas intacta.

Essa organização de scripts permite um gerenciamento flexível do ambiente de desenvolvimento e produção, facilitando ações como atualização, limpeza e reinicialização do banco de dados.

---

## Uso

Depois de:

1. Configurar o banco de dados.
2. Iniciar o **backend** (`npm run dev` ou `yarn dev`).
3. Iniciar o **frontend** (`npm start` ou `yarn start`).

A aplicação estará acessível no **frontend** (por padrão em `http://localhost:3000`) e se comunicará com o **backend** (por padrão em `http://localhost:8080`).

---

## Contribuição

Contribuições são bem-vindas! Para colaborar:

1. Faça um **fork** deste repositório.
2. Crie uma nova **branch** para sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça commits das suas alterações:
   ```bash
   git commit -m "Implementa nova feature X"
   ```
4. Envie para o seu fork:
   ```bash
   git push origin minha-feature
   ```
5. Abra um **Pull Request** descrevendo suas mudanças.

---

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE). Sinta-se livre para usar, modificar e distribuir de acordo com as condições estabelecidas.

---

## Contato

- **Autores**:
  - Lucas Stopinski da Silva
  - Eduardo Henrique Fabri
  - João Victor Carvalho de Freitas
  - Renan Americo Herculano
- **GitHub**:
  - Lucas Stopinski da Silva: [@LucasStop](https://github.com/LucasStop)
  - Eduardo Henrique Fabri: [@eduardofabrii](https://github.com/eduardofabrii)
  - João Victor Carvalho de Freitas: [@jvecodev](https://github.com/jvecodev)
  - Renan Americo Herculano: [@RenanH19](https://github.com/RenanH19)
- **E-mail**:
  - Lucas Stopinski da Silva: [lucasstopinskidasilva@gmail.com](mailto:lucasstopinskidasilva@gmail.com)
  - Eduardo Henrique Fabri: [eduardohfabri@gmail.com](mailto:eduardohfabri@gmail.com)
  - João Victor Carvalho de Freitas: [jvitor.oliveira1803@gmail.com](mailto:jvitor.oliveira1803@gmail.com)
  - Renan Americo Herculano: [Renan.kaspermaya19americo@gmail.com](mailto:Renan.kaspermaya19americo@gmail.com)