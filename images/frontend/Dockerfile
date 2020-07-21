FROM node:12.16.1-alpine

WORKDIR /app

ADD package.json ./
ADD yarn.lock ./

RUN yarn install
