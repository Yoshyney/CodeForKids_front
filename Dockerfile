FROM nginx:alpine
COPY ./index.html /usr/share/nginx/html
RUN apk add docker
RUN apk update
CMD service docker start && /bin/bash
CMD service docker status && /bin/bash
