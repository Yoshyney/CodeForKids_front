FROM nginx:alpine
COPY ./index.html /usr/share/nginx/html
RUN apk add docker
RUN apk update
RUN Service docker status
