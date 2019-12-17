FROM node:latest

RUN npm install -g heroku
WORKDIR /home/node/heroku

COPY docker-entrypoint.sh /usr/bin/docker-entrypoint.sh
RUN chmod o+rx /usr/bin/docker-entrypoint.sh
ENTRYPOINT ["/usr/bin/docker-entrypoint.sh"]

ADD . /home/node/heroku
RUN npm install
RUN chown -R node:node /home/node
USER node
