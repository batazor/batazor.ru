FROM nginx:1.13-alpine

RUN apk add --no-cache certbot openssl && \
    mkdir /etc/letsencrypt

WORKDIR /usr/share/nginx/html

ADD ./root /
COPY ./ ./
RUN rm -rf root

CMD ["/run.sh"]
