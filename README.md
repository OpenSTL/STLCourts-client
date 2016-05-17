# Your STL Courts Response Web Application

This project contains the source code for the Angular application at gh-angular.herokuapp.com/#/ (does not currently work with SSL due to ArcGIS Ajax calls)

This project was generated with [yo angular generator](https://github.com/yeoman/generator-angular) version 0.12.1.

## Build & development

Run `grunt build:(local|uionly|production)` for building and `grunt serve:(local|uionly|production)` for preview.

`grunt serve:local` - Runs the webapp, expecting a local copy of the services
`grunt serve:uionly` - Runs the webapp, using the test.yourstlcourts.com web api
`grunt serve:prod` - Runs the webapp, using the /api/ path for services expecting a proxy redirect

NOTE: "dist" folder is checked in for use in Heroku - this is not a long-term solution. Procfile and web.js are also Heroku-specific. For local development using our Heroku database, using `grunt serve:local` while also running the local backend service gh-spring-svc OR `grunt serve:production` in order to run/develop while using the services deployed on Heroku.

## Testing

Running `grunt test` will run the unit tests with karma.
