<h1 align='center'>Portfolio - BackEnd Node</h1>

<div align='center'>

  [Descrição](#descrição)
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
</div>

## Descrição

O projeto é uma API para o portfólio pessoal. Tendo como objetivo, armazenar as informações do portfólio, como projetos, tecnologias e certificados e fazer envio de email utilizando o EmailJS.

## Iniciando

E necessário ter instalado:
- docker
- git
- nodejs

E uma conta no EmailJS.

Para iniciar o projeto, primeiro clone o repositório e instale as dependências...

```bash
git clone https://github.com/matheus369k/portfolio-back-end.git
cd portfolio-back-end
npm install
```

adicione o arquivo .env e insira as variáveis de ambiente baixo...

```bash
DATABASE_URL="mongodb://localhost:<port>/?authSource=admin"
DATABASE_USERNAME="USERNAME"
DATABASE_PASSWORD="PASSWORD"  

EMAIL_SERVER_ID="xxxxxxxx"
EMAIL_TEMPLATE_ID="xxxxxxxx"
EMAIL_PUBLIC_KEY="xxxxx_xx-x"
EMAIL_PRIVATE_KEY="xxxxxxxx-"

HOST="0.0.0.0"
PORT=3333
```

Agora crie o banco de dados do docker, digite o comando abaixo no terminal do projeto...

```bash
docker compose up -d
```

Após use o comando abaixo para inserir dados faker no banco de dados...
```bash
npm run seed
```
Por fim, inicie o projeto...
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
  description: string,
  links: {
    deploy: string,
    repository: string
  }
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