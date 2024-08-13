# Hangry's Case Study Project - MSIB 7 Program

a RESTful API (CRUD) to manage user data using [Node.js](https://nodejs.org/) and [TypeScript](https://www.typescriptlang.org/). This project is created as a submission.

## Table of Contents

- [Hangry's Case Study Project - MSIB 7 Program](#hangrys-case-study-project---msib-7-program)
  - [Table of Contents](#table-of-contents)
  - [Project](#project)
    - [Commands](#commands)
      - [Install Dependencies](#install-dependencies)
      - [Development](#development)
      - [Production](#production)
    - [Structure](#structure)
    - [Limitation](#limitation)
    - [API Endpoints](#api-endpoints)
      - [Get All Users](#get-all-users)
      - [Create User](#create-user)
      - [Get User](#get-user)
      - [Update User](#update-user)
      - [Patch User](#patch-user)
      - [Delete User](#delete-user)

## Project

### Commands

#### Install Dependencies

```shell
npm i
```

#### Development

Run the app in development mode with the following command:

```shell
npm run dev
```

#### Production

Run the app in production mode with the following command:

```shell
npm run build
npm run start
```

### Structure

- `src`: contains all of the source code for the app.
  - `app`: contains the implementation of a mini web application framework inspired by [Express.js](https://expressjs.com/).
  - `controllers`: contains functions to manage user data.
  - `db`: contains a mock implementation of a database with local memory data.
  - `middlewares`: contains functions that are executed before any route handlers.
  - `validators`: contains basic schema validation for user data.
  - `index.ts`: the entry point of the app.

### Limitation

Currently, the app only accepts a user data payload for creating and updating user data with `content-type` = `application/json`. This can be extended by implementing another middleware for specific `content-type` values.

### API Endpoints

#### Get All Users

Method: GET

>```text
>/api/users
>```

Response: 200

```json
{
    "data": [
        {
            "id": "1",
            "name": "John Doe",
            "email": "johndoe@mail.com",
            "dateOfBirth": "1990-01-01T00:00:00.000Z"
        },
        {
            "id": "2",
            "name": "Jane Doe",
            "email": "janedoe@mail.com",
            "dateOfBirth": "1991-02-02T00:00:00.000Z"
        }
    ]
}
```

#### Create User

Method: POST

>```text
>/api/users
>```

Body (`content-type` = `application/json`)

```json
{
    "name": "Mark Doe",
    "email": "markdoe@mail.com",
    "dateOfBirth": "1990-01-01T00:00:00.000Z"
}

```

Response: 200

```json
{
    "data": {
        "id": "3",
        "name": "Mark Doe",
        "email": "markdoe@mail.com",
        "dateOfBirth": "1990-01-01T00:00:00.000Z"
    }
}
```

Response: 400

```json
{
    "data": {},
    "error": "Date of birth is required and must be valid"
}
```

#### Get User

Method: GET

>```text
>/api/users/:id
>```

Response: 200

```json
{
    "data": {
        "id": "3",
        "name": "Mark Doe",
        "email": "markdoe@mail.com",
        "dateOfBirth": "1990-01-01T00:00:00.000Z"
    }
}
```

Response: 404

```json
{
    "data": {},
    "error": "User not found"
}
```

#### Update User

Method: PUT

>```text
>/api/users/:id
>```

Body (`content-type` = `application/json`)

```json
{
    "name": "Mark Doe Update",
    "email": "markdoeupdate@mail.com",
    "dateOfBirth": "1990-01-01T00:00:00.000Z"
}
```

Response: 200

```json
{
    "data": {
        "id": "3",
        "name": "Mark Doe Update",
        "email": "markdoeupdate@mail.com",
        "dateOfBirth": "1990-01-01T00:00:00.000Z"
    }
}
```

Response: 400

```json
{
    "data": {},
    "error": "Date of birth is required and must be valid"
}
```

Response: 404

```json
{
    "data": {},
    "error": "User not found"
}
```

#### Patch User

Method: PATCH

>```text
>/api/users/:id
>```

Body (`content-type` = `application/json`)

```json
{
    "name": "Mark Doe Update 2"
}
```

Response: 200

```json
{
    "data": {
        "id": "3",
        "name": "Mark Doe Update 2",
        "email": "markdoeupdate@mail.com",
        "dateOfBirth": "1990-01-01T00:00:00.000Z"
    }
}
```

Response: 400

```json
{
    "data": {},
    "error": "At least one field is required"
}
```

Response: 404

```json
{
    "data": {},
    "error": "User not found"
}
```

#### Delete User

Method: DELETE

>```text
>/api/users/:id
>```

Response: 200

```json
{
    "data": {
        "id": "3",
        "name": "Mark Doe Update 2",
        "email": "markdoeupdate@mail.com",
        "dateOfBirth": "1990-01-01T00:00:00.000Z"
    }
}
```

Response: 404

```json
{
    "data": {},
    "error": "User not found"
}
```
