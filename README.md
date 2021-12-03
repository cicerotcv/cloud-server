# crud-nodejs-postgresql

## Endpoints

### Autenticação

**Cria conta de usuário**

```http
POST /auth/create-account

{
  "email": "string",
  "username": "string",
  "password": "string"
}
```

**Autentica o usuário**

```http
POST /auth/login

{
  "email": "string",
  "password": "string"
}
```

**Deleta a conta do usuário**

```http
POST /auth/delete

{
  "email": "string",
  "password": "string"
}
```

**Verifica se o Token é válido**

```http
GET /auth
x-authorization: Bearer token
```

### Tasks (CRUD)

**Cria uma task**

```http
POST /task
x-authorization: Bearer token

{
  "content": "task content text"
}
```

**Lista todas as tasks do usuário**

```http
GET /task
x-authorization: Bearer token
```

**Baixa os dados de uma task específica**

```http
GET /task/:taskId
x-authorization: Bearer token
```

**Deleta uma task específica**

```http
DELETE /task/:taskId
x-authorization: Bearer token
```

**Atualiza o coteúdo de uma task específica**

```http
PATCH /task/:taskId
x-authorization: Bearer token

{
  "content": "task content text updated"
}
```

## Algumas tecnologias utilizadas nesse projeto

![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/Nodejs-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TSNode](https://img.shields.io/badge/ts--node-3178c6?style=for-the-badge&logo=ts-node&logoColor=white)
![MongoDB](https://img.shields.io/badge/mongodb-589636?style=for-the-badge&logo=mongodb&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-f7b93e?style=for-the-badge&logo=prettier&logoColor=black)
