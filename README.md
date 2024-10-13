<h1 align='center'>Portfolio - BackEnd Node</h1>

<div align='center'>

  [Descrição](#descrição)
  |
  [Demo](#demo-gif)
  |
  [Iniciando](#iniciando)
  |
  [Dependências](#dependências)
  |
  [Rotas](#rotas)
  |
  [Licença](#licença)

</div>

<div align='center'>
  <img src='https://img.shields.io/github/license/matheus369k/coffee-delivery-api.svg'/>
  <img src='https://img.shields.io/github/watchers/matheus369k/coffee-delivery-api.svg' />
</div>

## Demo Gif

<div align='center'>
  <img src='.github/coffee-delivery-projetc-view.gif' />
</div>

## Descrição

Este repositório contém o backend do meu portfólio. Ele é desenvolvido em TypeScript e utiliza várias tecnologias modernas para fornecer uma base sólida e escalável para o portfólio.

- Registro de endereço de usuário.
- Atualização de endereço.
- Lista compra vinculada ao usuário.
- Filtro de variedade de cafe.
- Registro de novos produtos.

## Dependências

- Git - [baixar](https://git-scm.com)
- Node - [baixar](https://nodejs.org/pt)
- VSCode ( Recomendado ) - [baixar](https://code.visualstudio.com)
- Front-end ( Recomendado ) - [repositório](https://github.com/matheus369k/coffee-delivery)

## Iniciando

Para testar o projeto na sua maquina, recomenda-se clonar o repositório em uma pasta local, como seguinte comando.

### Instalando o projeto

Digite no terminal

__HTTPS__
```
$ git clone https://github.com/matheus369k/coffee-delivery-api.git
```
Acesse o projeto com seguinte comando 
```
$ coffee-delivery-api
```
Instalando as dependências
```
$ npm install
```
Se for usar o docker instale as seguintes Extensões no vsCode.
- Dev Containers
- Docker

inicie o docker e insira o comando
```
$ docker compose up -d
```
logo apos use a seguinte url para o banco de dados
```
DATABASE_URL="postgresql://docker:docker@localhost:5432/coffeedelivery"
```
### Configurando

crie um arquivo __.env__ e adicione as variáveis ambiente a seguir

```
// url banco de dados
DATABASE_URL="postgresql://usuario:senha@host:porta/nome_do_banco
"

// Port o valor padrão e 3333
PORT=3333
```
Esse comando ira criar as tabela no banco de dados.
```
$ npm run prisma:dev
```
Para inserir os dados no banco use o comando a seguir
```
$ npm run seed
```
Aplicação pronta, use o comando abaixo para rodar a aplicação
```
$ npm run dev
```
## Rotas
__Método HTTP GET__<br/>
Coletar todos os produtos
```
/coffees
```
Filtrar pelo slug
```
/coffees/:slug
```
Coletar dados: Cidade e UF
```
/location/:addressId
```
Coletar endereço
```
/user/:addressId
```
Coleta de informações de confirmação de compra
```
/shopping/:shoppingId
```
__Método HTTP POST__<br/>
Registrar novos produtos
```
/coffees
```
Registrar Endereço
```
/user/register
```
Registar compra
```
/shopping/:addressId
```

__Método HTTP PUT__<br/>
Atualizar Endereço
```
/user/:addressId
```

## 📜Licença

Para o projeto fora usado a licença 🔗[MIT](/LICENSE.txt).