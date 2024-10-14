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

## Dependências

- Git - [baixar](https://git-scm.com)
- Node - [baixar](https://nodejs.org/pt)
- MongoDb - [site](https://cloud.mongodb.com/)
- Emailjs - [site](https://dashboard.emailjs.com)
- VSCode ( Recomendado ) - [baixar](https://code.visualstudio.com)

## Iniciando

Para testar o projeto na sua maquina, recomenda-se clonar o repositório em uma pasta local, como seguinte comando.

### Instalando o projeto

Digite no terminal

__HTTPS__
```
$ git clone https://github.com/matheus369k/portfolio-back-end.git
```
Acesse o projeto com seguinte comando 
```
$ portfolio-back-end
```
Instalando as dependências
```
$ npm install
```
### Configurando

crie um arquivo __.env__ e adicione as variáveis ambiente a seguir

Url do banco de dados mongodb 
```
DATABASE_URL="mongodb://<usuário>:<senha>@<host>:<porta>/<nome_do_banco>"
```
Porta e host do servidor
```
PORT=3333
HOST="0.0.0.0"
```
Informações necessárias para o uso do emailjs
```
EMAIL_SERVER_ID="xxxxxxxx"
EMAIL_TEMPLATE_ID="xxxxxxxx"
EMAIL_PUBLIC_KEY="xxxxx_xx-x"
EMAIL_PRIVATE_KEY="xxxxxxxx-"
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
Coletar todos projetos
```
/projects
```
Liminar a quantidade de projetos
```
/projects/:max
```
Coletar todas as tecnologias
```
/tools
```
Coletar todos os certificados
```
/certificates
```
Limitar a quantidade de certificados
```
/certificates/:max
```
__Método HTTP POST__<br/>
Registar novo projeto
```
/projects
```
```
{
  name: string,
  slug: string,
  tools: [string],
  images_url: {
    png: string,
    gif: string
    },
  description: string
}
```
Registar nova tecnologia
```
/tools
```
```
{
  name: string,
  svg_url: string,
}
```
Registrar novo certificado
```
/certificates
```
```
{
  title: string,
  validation_code: string,
  image_url: string,
  verification_url: string
}
```
Enviar email
```
/invite-email
```
```
{
  email: string, 
  from_name: string,
  message: string
}
```

__Método HTTP DELETE__<br/>
Deletar projeto
```
/projects/:id
```
Deletar tecnologias
```
/tools/:id
```
Deletar certificado
```
/certificates/:id
```

## 📜Licença

Para o projeto fora usado a licença 🔗[MIT](/LICENSE.txt).