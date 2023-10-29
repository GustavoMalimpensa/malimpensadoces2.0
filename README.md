# Cátalogo para visualização e compra de produtos

malimpensadoces é um projeto que visa criar um catálogo online para visualização e compra de produtos. Este repositório abrange a aplicação frontend em Angular e o backend em Node.js com PostgreSQL em um contêiner Docker.

## Tecnologias Utilizadas

# Frontend (Angular)

-Angular CLI: Framework de desenvolvimento para a construção de aplicativos web escaláveis.
-Bootstrap: Framework de design para criar interfaces de usuário atraentes e responsivas.
-Bootstrap Icons: Conjunto de ícones de alta qualidade para uso no projeto.
-ngx-bootstrap: Biblioteca de componentes Bootstrap para Angular.
-TypeScript: Linguagem superset do JavaScript que adiciona tipagem estática ao JavaScript.
-Zone.js: Biblioteca para detecção e reação a mudanças no modelo de objeto do navegador.

# Backend (Node.js)

-Express: Framework web rápido, flexível e minimalista para construir aplicativos web e APIs.
-TypeORM: ORM (Object-Relational Mapping) para interagir com o banco de dados PostgreSQL.

# Outros

-PostgreSQL: Banco de dados relacional para armazenar informações de produtos e pedidos.
-Docker: Plataforma para desenvolvimento, envio e execução de aplicativos em contêineres.

## Requisitos de Instalação

Antes de começar, certifique-se de ter os seguintes requisitos instalados em sua máquina:

-Node.js: Você pode baixá-lo em nodejs.org.
-Angular CLI: Para o frontend, instale-o globalmente com npm install -g @angular/cli.

## Instalação e Uso
# Frontend (Angular)

1. Certifique-se de ter o Node.js instalado em sua máquina. Você pode baixá-lo em [nodejs.org](https://nodejs.org/).

2.Instale as dependências do projeto:

npm install

3.Inicie o servidor de desenvolvimento:

ng serve

4.Abra um navegador e acesse http://localhost:4200/ para ver o projeto em execução.

# Backend (Node.js com PostgreSQL em Docker)

1.Instale as dependências do projeto:

npm install

2.Certifique-se de ter o Docker instalado. Você pode baixá-lo em Docker Hub.

3.Inicie o banco de dados PostgreSQL em um contêiner Docker:

docker-compose up

4.Inicie o servidor Node.js:

npm run dev

# Endpoints da API

O backend fornece uma API com os seguintes endpoints:

-GET /api/products: Obtenha uma lista de todos os produtos.
-POST /api/products: Crie um novo produto.
-GET /api/products/:id: Obtenha detalhes de um produto específico.
-PUT /api/products/:id: Atualize as informações de um produto.
-DELETE /api/products/:id: Exclua um produto.


# Comandos Disponíveis
npm start: Inicia o servidor de desenvolvimento.
npm run build: Compila o projeto para produção.
npm run watch: Compila o projeto em modo de observação para desenvolvimento.
npm test: Executa os testes unitários.
npm run test:dev: Executa os testes unitários em modo de desenvolvimento.
npm run clean: Remove os diretórios de compilação e cache.

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para obter detalhes.


