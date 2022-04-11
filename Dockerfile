FROM node:16-alpine as base
WORKDIR /src
COPY package*.json ./


FROM base as production
ENV NODE_ENV=production
RUN yarn install --frozen-lockfile --production
COPY . .
CMD ["yarn",  "start"]

FROM base as dev
RUN apk add --no-cache bash
RUN apt update && apt install curl
RUN wget -O /bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /bin/wait-for-it.sh

ENV NODE_ENV=development
RUN yarn
COPY . .

CMD ["yarn", "start:dev"]