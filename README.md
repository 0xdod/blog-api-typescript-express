# Blog API - Technical Test

## Task

Design a Blog API using Node.js + TS, with postgres for the DB.

- Users should be able to get all blog posts
- Users should be able to get a specific post
- Users should be able to add a post
- Users should be able to edit a post
- Users should be able to delete a post
- Pagination and the search functionality should also be implemented

## Technologies Used

- **Node.js**: The runtime environment for the API.
- **TypeScript**: To ensure type safety and improved code quality.
- **Express.js**: For creating RESTful API endpoints.
- **PostgreSQL**: Database management system to manage and store data

## Getting Started

Follow these instructions to get the Blog API up and running locally.

### Prerequisites

- Node.js and yarn installed on your machine.
- PostgreSQL installation

### Running the Application

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/0xdod/blog-api-typescript-express.git
   ```

2. Navigate to the project directory:

   ```bash
   cd blog-api-typescript-express
   ```

3. Install the project dependencies:

   ```bash
   yarn
   ```

4. Run database migrations

   Make sure your database engine in up and running, and the relevant database has been created, then run the following command

   ```bash
   yarn migrate
   ```

5. Configuration

   Copy and edit the env variables from the sample file

   ```bash
   cp .env.sample .env
   ```

6. Start the server

   To start the server, run the following command:

   ```bash
   yarn dev
   ```

The API will be available at `http://localhost:5090` by default. You can change the port in the configuration if needed.

## Usage

### Sign up

`POST /v1/auth/signup`

Sample Request

```json
{
  "username": "testuser",
  "email": "testuser123@gmail.com",
  "password": "testingmicrophone"
}
```

Sample Response

```json
{
  "id": "1d0c87c0-62df-4eba-9cdd-925b04e5dd81",
  "createdAt": "2023-09-06T11:49:32.595Z",
  "updatedAt": "2023-09-06T11:49:32.595Z",
  "email": "testuser123@gmail.com",
  "firstname": null,
  "lastname": null,
  "username": "testuser"
}
```

### Login

`POST /v1/auth/login`
Sample Request

```json
{
  "email": "testuser123@gmail.com",
  "password": "testingmicrophone"
}
```

Sample Response

```json
{
  "id": "55c22e01-0a9b-4a83-a5cc-d875cbf9440e",
  "createdAt": "2023-09-04T23:07:17.474Z",
  "updatedAt": "2023-09-04T23:07:17.474Z",
  "email": "testuser123@gmail.com",
  "firstname": null,
  "lastname": null,
  "username": "testuser",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1YzIyZTAxLTBhOWItNGE4My1hNWNjLWQ4NzVjYmY5NDQwZSIsInN1YiI6ImRhbWlsb2xhMiIsImlhdCI6MTY5Mzk5NzcyOSwiZXhwIjoxNjk0MDAxMzI5fQ.RIOMIfDw3vVdaxiScsNbLIhd_z3Pm_ne_zzL1tIJkQw"
}
```

### Create a post

`POST /v1/posts`
Sample Request

```json
{
  "title": "Wahala Musician",
  "content": "Portable is coming",
  "published": false
}
```

Sample Response

```json
{
  "id": "71821641-d38a-4de4-8126-f8f79dfea2b9",
  "createdAt": "2023-09-06T11:27:51.223Z",
  "updatedAt": "2023-09-06T11:27:51.223Z",
  "title": "Wahala Musician",
  "slug": "wahala-musician-55c22e01-0a9b-4a83-a5cc-d875cbf9440e",
  "content": "Portable is coming",
  "published": false,
  "authorId": "55c22e01-0a9b-4a83-a5cc-d875cbf9440e"
}
```

### Get a post by slug or id

`GET /v1/posts/:slugOrId`
Replace ":slugOrId" with a valid slug or id.

Sample Response

```json
{
  "id": "71821641-d38a-4de4-8126-f8f79dfea2b9",
  "createdAt": "2023-09-06T11:27:51.223Z",
  "updatedAt": "2023-09-06T11:27:51.223Z",
  "title": "Wahala Musician",
  "slug": "wahala-musician-55c22e01-0a9b-4a83-a5cc-d875cbf9440e",
  "content": "Portable is coming",
  "published": false,
  "authorId": "55c22e01-0a9b-4a83-a5cc-d875cbf9440e"
}
```

### Get posts

`GET /v1/posts/?[page=1][&limit=10][&published=true][&searchTerm=wahala]`
Fetch all posts, returns paginated data, can also be searched by title or content via url query params &
can also filter by published content.

Sample Response

```json
{
  "data": [
    {
      "id": "71821641-d38a-4de4-8126-f8f79dfea2b9",
      "createdAt": "2023-09-06T11:27:51.223Z",
      "updatedAt": "2023-09-06T11:27:51.223Z",
      "title": "new update",
      "slug": "new-update-55c22e01-0a9b-4a83-a5cc-d875cbf9440e",
      "content": "Portable is coming",
      "published": false,
      "authorId": "55c22e01-0a9b-4a83-a5cc-d875cbf9440e"
    },
    {
      "id": "e22f67e5-9a13-41d2-b8b2-24f39dd43378",
      "createdAt": "2023-09-05T18:42:29.262Z",
      "updatedAt": "2023-09-05T18:42:29.262Z",
      "title": "Test title",
      "slug": "test-title-55c22e01-0a9b-4a83-a5cc-d875cbf9440e",
      "content": "Praise da lord",
      "published": false,
      "authorId": "55c22e01-0a9b-4a83-a5cc-d875cbf9440e"
    }
  ],
  "total": 2,
  "pageQuery": {
    "page": 1,
    "limit": 10,
    "published": false
  }
}
```

### Edit a post by slug or id

`PATCH /v1/posts/:slugOrId`
Replace ":slugOrId" with a valid slug or id.

Sample Request

```json
{
  "title": "Title Update",
  "content": "Content update",
  "published": true
}
```

Sample Response

```json
{
  "id": "71821641-d38a-4de4-8126-f8f79dfea2b9",
  "createdAt": "2023-09-06T11:27:51.223Z",
  "updatedAt": "2023-09-06T11:27:51.223Z",
  "title": "Title Update",
  "slug": "title-update-55c22e01-0a9b-4a83-a5cc-d875cbf9440e",
  "content": "Content update",
  "published": true,
  "authorId": "55c22e01-0a9b-4a83-a5cc-d875cbf9440e"
}
```

### Delete a post by slug or id

`DELETE /v1/posts/:slugOrId`
Replace ":slugOrId" with a valid slug or id.

Removes post from the database
