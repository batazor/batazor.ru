#!/bin/sh

certbot certonly --webroot --agree-tos -w /etc/letsencrypt/ -d batazor.ru -m batazor111@gmail.com
nginx -g "daemon off;"
