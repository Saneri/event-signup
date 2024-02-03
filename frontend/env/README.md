# Environment variables

The easily get started, create a copy of `.env.example`

Create a file for either local development or the envorinment to be deployed.

| Environment | File Name    | Description                                             |
| ----------- | ------------ | ------------------------------------------------------- |
| Local       | `.env.local` | Local development                                       |
| Dev         | `.env.dev`   | Development env which is not know to the public         |
| Prod        | `.env.prod`  | Production which is the actual site (not implement yet) |

| Variable            | Description              |
| ------------------- | ------------------------ |
| VITE_API_URL        | backend url              |
| VITE_PUBLIC_API_KEY | backend API key          |
| VITE_USER_POOL_ID   | AWS Cognito user pool id |
| VITE_CLIENT_ID      | AWS Cognito client id    |

If you want to use local backend, set

```
VITE_API_URL=http://localhost:3001
VITE_PUBLIC_API_KEY=
```
