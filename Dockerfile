FROM nginx:1.13-alpine

WORKDIR /usr/share/nginx/html

COPY ./ ./
