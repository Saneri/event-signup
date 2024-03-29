sam build
sam deploy  \
    --region eu-west-1 \
    --stack-name event-signup-backend \
    --profile santeri-dev \
    --capabilities CAPABILITY_IAM \
    --no-confirm-changeset \
    --s3-bucket event-signup-backend-sam \
    --parameter-overrides Env=prod