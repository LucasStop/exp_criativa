# Cakeria

Bem-vindo(a) ao **Cakeria**! Este projeto tem como objetivo criar um site para exibir e gerenciar informações sobre bolos, doces e outros produtos de confeitaria. Aqui você encontrará as instruções para executar o projeto localmente com um servidor Express, bem como detalhes sobre a estrutura de diretórios e como contribuir.

---

## Sumário

1. [Visão Geral](#visão-geral)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Estrutura de Pastas](#estrutura-de-pastas)
4. [Instalação e Execução](#instalação-e-execução)
5. [Como Contribuir](#como-contribuir)
6. [Licença](#licença)

---

## Visão Geral

O **Cakeria** é uma plataforma simples para exibir informações sobre produtos de confeitaria (bolos, doces, etc.). O projeto utiliza o [Express](https://expressjs.com/) para servir as páginas e arquivos estáticos, facilitando o desenvolvimento e a manutenção. A organização dos arquivos permite que cada parte (HTML, CSS, JavaScript, imagens e outros recursos) seja gerenciada de forma separada, garantindo clareza e escalabilidade.

---

## Tecnologias Utilizadas

- **HTML5**: Estrutura e marcação das páginas.
- **CSS3**: Estilização e layout do site.
- **JavaScript (ES6+)**: Lógica do front-end.
- **Node.js & Express**: Ambiente de execução e servidor web para servir o projeto.
- **npm**: Gerenciamento de dependências.

---

## Estrutura de Pastas

A estrutura do projeto foi organizada para separar os arquivos de visualização, estilos, scripts e demais recursos:

```
CAKERIA
│
├── app.js                   # Configuração do servidor Express
├── package.json             # Informações do projeto e dependências (Node.js)
├── package-lock.json        # Mapeamento exato das dependências instaladas
├── .gitignore               # Arquivos/pastas ignorados pelo Git
├── README.md                # Documentação do projeto (este arquivo)
│
└── /pages                   # Páginas HTML do projeto
│   ├── index.html           # Página principal (servida pelo Express)
│   ├── home.html            # Página adicional (ex.: Home)
│   ├── about.html           # Página "Sobre"
│   └── contact.html         # Página de contato
│
└── /assets                  # Arquivos de mídia (imagens, ícones, etc.)
│   ├── /ico                 # Ícones no formato .ico
│   │   ├── favicon.ico
│   │   ├── icon_cakeria.ico
│   │   └── logo_cakeria.ico
│   ├── /png                 # Imagens em formato .png
│   │   ├── icon_cakeria.png
│   │   └── logo_cakeria.png
│   └── /webp                # Imagens em formato .webp
│       ├── icon_cakeria.webp
│       └── logo_cakeria.webp
│
└── /css                     # Arquivos de estilo
│   └── styles.css           # Estilos globais do projeto
│
└── /js                      # Arquivos JavaScript
    ├── index.js             # Script principal (inicializa funcionalidades)
    ├── /modules             # Módulos com funcionalidades específicas
    │   ├── module1.js
    │   ├── module2.js
    │   └── ...
    └── /utils               # Funções utilitárias (reutilizáveis)
        ├── helper1.js
        ├── helper2.js
        └── ...
```

### Observações sobre a configuração de arquivos estáticos

- O Express foi configurado para servir a pasta `/pages` como conteúdo estático. Dessa forma, arquivos internos, como `pages/js/index.js` e `pages/css/styles.css`, ficam disponíveis diretamente nas URLs `/js/index.js` e `/css/styles.css`, respectivamente.
- Se desejar que os arquivos sejam servidos com um prefixo (por exemplo, `/pages/js/index.js`), ajuste a configuração do `express.static` conforme necessário.

---

## Instalação e Execução

Para executar o projeto localmente, siga os passos abaixo:

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/cakeria.git
   ```

2. **Instale as dependências**:
   Navegue até a pasta do projeto e instale as dependências definidas no `package.json`:

   ```bash
   cd cakeria
   npm install
   ```

3. **Execute o servidor**:
   Se o projeto estiver utilizando o Express (configurado no `app.js`), inicie o servidor com:

   ```bash
   npm start
   ```

   ```bash
   node app.js
   ```

   ```bash
   node run dev
   ```

4. **Acesse o projeto**:
   Abra o navegador e vá para:  
   [http://localhost:3000](http://localhost:3000)

> **Dica:** Caso o projeto seja apenas estático e você não deseje usar o servidor Node, você pode abrir o arquivo `index.html` diretamente no navegador ou usar uma extensão como o **Live Server** (para VSCode) para visualizar o projeto.

---

## Como Contribuir

Contribuições são sempre bem-vindas! Se você deseja ajudar a melhorar o **Cakeria**, siga estes passos:

1. Faça um **fork** do projeto.
2. Crie uma nova branch a partir da `main`:
   ```bash
   git checkout -b minha-nova-funcionalidade
   ```
3. Realize suas alterações e faça commits descritivos:
   ```bash
   git commit -m "Descrição clara da alteração"
   ```
4. Envie suas alterações para o seu fork:
   ```bash
   git push origin minha-nova-funcionalidade
   ```
5. Abra um **Pull Request** detalhando suas alterações e sugestões.

---

## Licença

Este projeto está licenciado sob a [Licença MIT](https://opensource.org/licenses/MIT). Sinta-se livre para usar, modificar e distribuir o projeto conforme os termos da licença.
