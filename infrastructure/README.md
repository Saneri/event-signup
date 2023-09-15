# infrastructure

## requirements

- docker

## run dynamodb locally

```shell
docker compose up -d
```

[!NOTE] DynamoDB is accessible in URL http://host.docker.internal:8000

To finally stop the docker container

```shell
docker compose down
```

## dynamodb local admin panel

The compose file also starts running a custom (non AWS) admin panel.

To access the admin panel, navigate to `localhost:8000` in your browser
