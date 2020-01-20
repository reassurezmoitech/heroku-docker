FROM node:latest

COPY docker-entrypoint.sh /usr/bin/docker-entrypoint.sh
RUN chmod o+rx /usr/bin/docker-entrypoint.sh
ENTRYPOINT ["/usr/bin/docker-entrypoint.sh"]

ADD . /home/node/heroku
WORKDIR /home/node/heroku
RUN chown -R node:node /home/node

USER node
RUN mkdir /home/node/.npm-packages
RUN npm config set prefix /home/node/.npm-packages
ENV NPM_PACKAGES /home/node/.npm-packages
ENV PATH $NPM_PACKAGES/bin:$PATH
RUN npm install -g heroku
RUN heroku plugins:install heroku-repo
RUN npm install
