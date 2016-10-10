FROM cardinalsoftwaresolutions/nginx-node-bower-grunt

#Install Ruby & Compass
RUN apt-get update && apt-get install -y ruby-full
RUN gem install --no-rdoc --no-ri sass -v 3.4.22
RUN gem install --no-rdoc --no-ri compass

COPY deploy/nginx.conf /etc/nginx/nginx.conf

ADD package.json /tmp/package.json
RUN cd /tmp && npm set progress=false && npm install
RUN mkdir -p /stlcourts-client && cp -a /tmp/node_modules /stlcourts-client
WORKDIR /stlcourts-client
ADD . /stlcourts-client

RUN npm set progress=false && npm install
RUN bower --allow-root install

# Rebuild node-sass due to some node versioning possible conflicts
RUN npm rebuild node-sass

RUN npm install -g karma-cli

#Run jasmine tests
RUN grunt test:local

# Building
RUN grunt build:production

# Copy dist to nginx for hosting
RUN cp -a dist/. /usr/share/nginx/html
