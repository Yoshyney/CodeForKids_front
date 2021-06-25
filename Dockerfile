FROM docker:dind
RUN apt-get install nginx
COPY ./index.html /usr/share/nginx/html
RUN apk update
