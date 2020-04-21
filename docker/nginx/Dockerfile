FROM nginx:alpine

WORKDIR /application

# nginx configurations files
COPY ./docker/nginx/conf.d/*.template /etc/nginx/conf.d/

# Copy applications file
COPY ./application ./

# entrypoint
COPY ./docker/nginx/entrypoint /usr/local/bin

ENTRYPOINT ["entrypoint"]

CMD ["nginx", "-g", "daemon off;"]
