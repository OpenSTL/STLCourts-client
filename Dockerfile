FROM cardinalsoftwaresolutions/nginx-node-bower-grunt

COPY deploy/nginx.conf /etc/nginx/nginx.conf

# Copy application files and set working dir
RUN mkdir /stlcourts-client
COPY . /stlcourts-client
WORKDIR /stlcourts-client

#Install Ruby & Compass
RUN apt-get install -y ruby-full
RUN gem install compass

RUN npm set progress=false && npm install
RUN bower --allow-root install

# Rebuild node-sass due to some node versioning possible conflicts
RUN npm rebuild node-sass

#TODO: Run jasmine tests

# Building
RUN grunt build:production

# Copy dist to nginx for hosting
RUN cp -a /stlcourts-client/dist/. /usr/share/nginx/html
