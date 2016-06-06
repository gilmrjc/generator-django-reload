# generator-django-reload [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Django generator with live-reload and front-end support

## Installation

First, install [Yeoman](http://yeoman.io) and generator-django-reload using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-django-reload
```

Then generate your new project:

```bash
yo django-reload
```

## Gulp task

This generator uses gulp to manage the development tasks. The following task are available

### patch
Generate a new git tag for patch release

### feature
Generate a new git tag for minor release

### release
Generate a new git tag for major release

### styles-dev
Compiles the SASS files with sourceMap support to style.css. The css file is autoprefixed for the last 2 release of the major browsers and IE>8. Also concat normalize.css and external css installed via bower at the top of the css stack.

### styles
This does the same that styles-dev with the exception of no sourceMap.

### minify-css
This minify the css files with css optimizer.

### eslint-dev
This runs the eslinter and print the errors in the console without exiting.

### eslint
This runs the eslinter and exist if there is an error.

### uglify
Minify the js files with uglify.

### watch
This task watches the sass and js files and runs styles-dev and eslint-dev on modifications.

### clean
This task clean the assets dir.

### shell
This task runs the django shell

### migrate
This task runs the django migrations

### collectstatic
This task runs the django collectstatic

### makemigrations
This task runs the django makemigrations

### runserver
This task runs the django runserver with livereload support

### build
This task runs clean, styles, minify-css, eslint, uglify, migrate and collecstatic task to build the assets pipeline

### default
This task builds the development enviroment, runs the django server with livereload support and the watches the sass and js files.

## Tree structure
```
.
├── assets
├── bower.json
├── gulpfile.js
├── home
│   ├── apps.py
│   ├── __init__.py
│   ├── templates
│   │   └── home
│   │       └── index.html
│   └── views.py
├── manage.py
├── minihtml
│   ├── apps.py
│   ├── __init__.py
│   └── middleware.py
├── package.json
├── requirements
│   ├── base.txt
│   ├── development.txt
│   └── production.txt
├── requirements.txt
├── static
│   ├── css
│   ├── img
│   │   └── logo.png
│   ├── js
│   │   └── menu.js
│   └── scss
│       ├── base
│       │   ├── _base.scss
│       │   ├── _clearfix.scss
│       │   └── _reset.scss
│       ├── components
│       │   ├── _components.scss
│       │   ├── _main-menu.scss
│       │   └── _mask.scss
│       ├── helpers
│       │   ├── _helpers.scss
│       │   ├── _media.scss
│       │   └── _variables.scss
│       ├── layout
│       │   └── _layout.scss
│       ├── pages
│       │   └── _pages.scss
│       └── style.scss
├── templates
│   ├── 400.html
│   ├── 403.html
│   ├── 404.html
│   ├── 500.html
│   ├── base.html
│   ├── footer.html
│   └── header.html
└── project
    ├── __init__.py
    ├── settings
    │   ├── base.py
    │   ├── development.py
    │   ├── __init__.py
    │   └── production.py
    ├── urls.py
    └── wsgi.py
```

In the the static files are server from the assets dir. The home app servers the home page (index.html) and can be used to server all the static pages like about, contact, etc. Minihtml app minifies the html output, this is done to use percentage width in divs and reduce the page load. Requirements are distributed in development, test and production enviroments, by default production requirements are used.
Manage.py uses development settings by default and wsgi.py uses production settings. To use other setting just set DJANGO_SETTINGS_MODULE env to the required settings file.

## License

MIT © [Gildardo Adrian Maravilla Jacome]()


[npm-image]: https://badge.fury.io/js/generator-django-reload.svg
[npm-url]: https://npmjs.org/package/generator-django-reload
[travis-image]: https://travis-ci.org/gilmrjc/generator-django-reload.svg?branch=master
[travis-url]: https://travis-ci.org/gilmrjc/generator-django-reload
[daviddm-image]: https://david-dm.org/gilmrjc/generator-django-reload.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/gilmrjc/generator-django-reload
