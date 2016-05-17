# Your STL Courts Response Web Application

This project contains the source code for the Angular application at yourstlcourts.com (does not currently work with SSL due to ArcGIS Ajax calls)

## Build & development

* Download NodeJS w/ npm
* Install grunt-cli `npm install -g grunt-cli`
* Install bower `npm install -g bower`

### Build
Run `grunt build:(local|uionly|production)` for building and `grunt serve:(local|uionly|production)` for preview.

### Development
`grunt serve:local` - Runs the webapp, expecting a local copy of the services
`grunt serve:uionly` - Runs the webapp, using the test.yourstlcourts.com web api
`grunt serve:prod` - Runs the webapp, using the /api/ path for services expecting a proxy redirect

## Testing

Running `grunt test:local` will run the unit tests with karma.
