# Your STL Courts Response Web Application

## Development server
To Run the project, type the following in the console and navigate to 'http://localhost:4200' The app will automatically reload if you change any of the source files.
Run 'npm start -- --env=[local|dev|prod]'

Optionally the following are available as shortcuts:
Run 'npm run local'  - this will use a local copy of the server
Run 'npm run dev' - this will use a copy of the server from the test/development server
Run 'npm run prod' - this will use a copy of the server from the production server

## Generating new items
'npm run g -- <type to generate> <name> [--mod=name of module to put this into]'
  Where <type to generate> can be 'component', 'directive', 'enum', 'guard', 'interface', 'pipe', or 'service'
  Where <name>  is the name of the component, directive, etc
  Optionally if you desire the generated item to be created in a specific module add --mod=app.module.ts for example
  

## Build

Run `npm build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
