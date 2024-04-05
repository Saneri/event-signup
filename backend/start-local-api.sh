set -e

sam build
DOCKER_HOST=unix://$HOME/.docker/run/docker.sock sam local start-api --port 3001 --parameter-overrides Env=dev MockAuth=1
