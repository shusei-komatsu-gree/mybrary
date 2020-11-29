FROM node:14.4.0-alpine

ENV HOME=/nuxt \
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    HOST=0.0.0.0
WORKDIR ${HOME}

# for fibers, gyp, preventing SAOError
RUN apk add python make g++

COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn run build

EXPOSE 3000
