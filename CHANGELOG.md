# Changelog

## 0.4.0
**Update for adding bower files via command line:**
- add bower boolean to main config file
- add bower.json & .bowerrc files
- add app.public.components & app.dir.components to config
- remove {{bowerHead}} && {{bowerFoot}} placeholders from templates

## 0.3.4
- fix socket.io issue and update to run on same port as pog
- add bower placeholder to views
- add controller templates for jade, handlebars & nunjucks
- add model template

## 0.3.3
- use site.public instead of site.dir for serving assets

## 0.3.2
- set model to false by default

## 0.3.1
- remove chalk

## 0.3.0
**First draft of models:**

- add model docs
- require model helper
- remove trailing comma
- add handler to render error pages
- fix syntax error
- add db configs
- move comment block to top
- add model helper
- add model templates
- add app.dir to hold app structure references
- remove deleted files
- add mongo & rethink templates
- update dependencies
- update logging
- update logging
- use app.log instead of console.log
- update error reporting, logging & add db

## 0.2.2
- fix includes in default jade template

## 0.2.1
- add log folder

## 0.2.0
- allow disabling of auto-router
- move socket.io info log to server.js
- refactor controllers
- remove node_modules from ignore list & reload if they change
- update to latest pog router
- update README

## 0.1.2
- add missing g-zip module

## 0.1.1
- add Procfile for heroku deploys
- add engines to package file
- add changelog file

## 0.1.0
- add socket.io
- add gzip, cors & polyfills
- fix invalid variables in environment settings
- update template files
- update gulp tasks
- update jshint settings
- update packages
- remove hello world
- remove commented out settings
- remove koala
- ignore public/css/\_dist
