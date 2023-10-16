#!/bin/bash
set +x;

aws ecr get-login-password --region eu-west-3 | docker login --username AWS --password-stdin 113659546096.dkr.ecr.eu-west-3.amazonaws.com
#docker build -t marketplace-backend-api . --build-arg BIN_NAME=api
#docker tag marketplace-backend-api:latest 113659546096.dkr.ecr.eu-west-3.amazonaws.com/marketplace-backend-api:latest
#docker push 113659546096.dkr.ecr.eu-west-3.amazonaws.com/marketplace-backend-api:latest