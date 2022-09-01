#!/bin/bash

set -xe
BUILD="$ENVIR-$(date '+%Y%m%d%H%M')"
docker build -t $IMAGE_REPO_NAME:$BUILD --build-arg IMAGEREPO=$IMAGEREPO --build-arg NAMESPACE=$NAMESPACE --build-arg BUILD=$BUILD --build-arg REACT_APP_API_URL=$REACT_APP_API_URL --build-arg REACT_APP_SCOKET_URL=$REACT_APP_SCOKET_URL --build-arg REACT_APP_API_TOKEN=$REACT_APP_API_TOKEN --build-arg REACT_APP_COGNITO_USER_POOL_ID=$REACT_APP_COGNITO_USER_POOL_ID --build-arg REACT_APP_COGNITO_CLIENT_ID=$REACT_APP_COGNITO_CLIENT_ID .
docker tag $IMAGE_REPO_NAME:$BUILD $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$IMAGE_REPO_NAME:$BUILD
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$IMAGE_REPO_NAME:$BUILD
kubectl set image --namespace=$NAMESPACE deployment/$DEPLOYMENT $CONTAINER_NAME=$IMAGEREPO:$BUILD