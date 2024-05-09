readonly AWS_PROFILE=santeri-dev

aws cloudformation deploy \
    --profile ${AWS_PROFILE} \
    --region eu-west-1 \
    --template-file template.yaml \
    --stack-name event-signup-dynamodb
