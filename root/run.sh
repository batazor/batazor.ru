#!/bin/sh

nginx -g "daemon off;" &&
certbot certonly --webroot --agree-tos -w /etc/letsencrypt/ -d batazor.ru -m batazor111@gmail.com
