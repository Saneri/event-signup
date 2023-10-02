set -e

sam build
sam local start-api --port 3001 --parameter-overrides Env=dev
