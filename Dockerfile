FROM nginx:1.16-alpine

WORKDIR /usr/share/nginx/html

COPY ./ ./
