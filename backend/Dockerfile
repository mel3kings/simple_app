ARG TYPE=local

FROM node:16-alpine3.11 AS builder
WORKDIR /usr/app
COPY package.json ./
COPY package-lock.json ./


FROM builder AS builder-local
RUN echo "building local image"
RUN npm install --quiet
COPY . .
ENTRYPOINT ["npm", "start"]

FROM builder-${TYPE} AS final
RUN echo "environment build was for ${TYPE}"