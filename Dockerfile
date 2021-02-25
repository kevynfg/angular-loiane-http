FROM node:10-alpine as node
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=node app/dist/requests-http /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

# docker build -t requests-http .
# docker run-p 8081:80 requests-http
