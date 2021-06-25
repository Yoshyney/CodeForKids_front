FROM nginx:alpine
COPY ./index.html /usr/share/nginx/html
RUN apk add docker
RUN apk update
ENTRYPOINT service docker start && /bin/bash
ENTRYPOINT service docker status && /bin/bash
