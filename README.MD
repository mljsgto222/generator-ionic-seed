# generator-ionic-seed

a ionic generator using by yoeman, bower, sass, gulp, also provide service generator command.Inspired by [generator-gulp-ionic](https://github.com/njleonzhang/generator-gulp-ionic)

## Install

You should instal [Yeoman](http://yeoman.io/) before install generator-ionic-seed:

    npm install -g yo
    npm install -g generator-ionic-seed

## Usage

Generate your ionic project:

    yo ionic-seed [ProjectName]

Generate your new view:

    yo ionic-seed:view [viewName]

You can also add service, value, factory, sass, constant, directive, filter by change command.

## Directory Structure

```
+-- app
|   +-- images 
|   +-- libs
|   +-- main 
|       +-- constants
|           +-- APP_CONFIG.js
|       +-- directives
|       +-- filters
|       +-- scss
|       +-- services
|           +-- httpInterceptor.js
|       +-- views
|           +-- app
|               +-- app.html
|           +-- start
|               +-- start.html
|       +-- app.js
|       +-- app.scss
|   +-- index.html
+-- hooks
|   +-- beforePrepare.js
+-- .bowerrc
+-- .gitignore
+-- app.json
+-- bower.json
+-- config.xml
+-- gulpfile.js
+-- package.json
+-- ionic.config.json
```

* All source code is under app/main folder.The root template is app/index.html
* There is a file named `app.json` at the root folder, whose content should be like


    {
        "dev": {
            "host": "/api",
            "staticHost": ""
        },
        "web": {
            "host": "",
            "staticHost": ""
        }
    }
* The host will automatically add into angular request url in httpInterceptor service .
* You can add any new config in app.json, and build with `gulp [task] --app configName` to select config.

## Gulp Task

### ionicServe

run `ionic server` and watch ./app/main directory in gulp.

### build 

build ./app directory to ./www

### release

build and compress ./app directory to ./www

## License

Copyright (C) 2016 Zhengz

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.