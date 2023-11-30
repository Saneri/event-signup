# backend

## requirements

- aws-sam-cli >= 1.102.0
- nvm

## initialize database

[!IMPORTANT] You need to have dynamodb running locally. See: [infrastructure](../infrastructure/README.md)

```shell
cd src
nvm use
npm run init-db
```

## run the project

```shell
./start-local-api.sh
```
