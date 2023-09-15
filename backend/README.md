# backend

## requirements

- aws-sam-cli
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
