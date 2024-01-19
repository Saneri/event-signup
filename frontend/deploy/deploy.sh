set -e

readonly BUCKET_NAME=event-signup-dev
readonly AWS_PROFILE=santeri-dev

aws cloudformation deploy \
    --profile ${AWS_PROFILE} \
    --region eu-west-1 \
    --template-file template.yaml \
    --stack-name ${BUCKET_NAME}

npm run build
aws s3 sync --profile ${AWS_PROFILE} --delete ../dist/ s3://${BUCKET_NAME}

