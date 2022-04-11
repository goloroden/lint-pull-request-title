FROM node:16.13.0-alpine

USER node

ADD --chown=node:node . /home/node
RUN cd /home/node && \
    npm install --production

CMD [ "node", "/home/node/app.js" ]
