FROM nginx:1.23-alpine

WORKDIR /usr/share/nginx/html

COPY ./ ./
