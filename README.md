# Your STL Courts Response Web Application

This project contains the source code for the Angular application at yourstlcourts.com (does not currently work with SSL due to ArcGIS Ajax calls)

## Build & development

* Download & Install NodeJS (v4.x) w/ npm
* Download & Install Ruby
* Install grunt-cli `npm install -g grunt-cli`
* Install bower `npm install -g bower`
* Install app dependencies `npm install && bower install`
* Install compass `gem install compass`

### Configs
* local = use local API
* uionly = use test API
* production = use API at /api/ (presumably proxied)

### Build
Run `grunt build:(local|uionly|production)` for building and `grunt serve:(local|uionly|production)` for preview.

### Development
`grunt serve:local` - Runs the webapp, expecting a local copy of the services
`grunt serve:uionly` - Runs the webapp, using the test.yourstlcourts.com web api
`grunt serve:prod` - Runs the webapp, using the /api/ path for services expecting a proxy redirect

## Testing

* Install karma `npm install -g karma-cli`
Running `grunt test:local` will run the unit tests with karma.
