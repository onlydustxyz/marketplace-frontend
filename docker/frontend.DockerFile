FROM node:18-bullseye

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --modules-folder /node_modules

CMD [ "yarn", "--modules-folder", "/node_modules", "run", "dev", "--host" ]
