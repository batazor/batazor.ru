FROM nginx:1.14-alpine

WORKDIR /usr/share/nginx/html

COPY ./ ./
