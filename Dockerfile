FROM node:16-alpine as base
WORKDIR /src
COPY package*.json ./

FROM base as production
ENV NODE_ENV=production
RUN yarn install --frozen-lockfile --production
COPY . .
CMD ["yarn",  "start"]

