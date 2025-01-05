readonly AWS_PROFILE=santeri-dev

GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET:-}

if [ -z "$GOOGLE_CLIENT_SECRET" ]; then
  echo "Error: GOOGLE_CLIENT_SECRET environment variable is not set."
  exit 1
fi

aws cloudformation deploy \
    --profile ${AWS_PROFILE} \
    --region eu-west-1 \
    --template-file template.yaml \
    --stack-name event-signup-cognito \
    --parameter-overrides GoogleClientSecret=${GOOGLE_CLIENT_SECRET}
