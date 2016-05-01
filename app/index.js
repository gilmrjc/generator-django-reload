'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var mkdirp = require('mkdirp');

module.exports = yeoman.Base.extend({

  prompting: function () {
    var done = this.async();

    if(!process.env.VIRTUAL_ENV) {
      this.log(chalk.red('ERROR: ') + 'You must be in a virtualenv before using this generator');
      return;
    }
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the scrumtrulescent ' + chalk.red('Django-reload') + ' generator!'
    ));

    var prompts = [{
      name: 'projectName',
      message: 'What is the name of the project?',
      default: path.basename(process.cwd()),
      validate: function (str) {
          return /^\S+$/.test(str);
      }
    }, {
      name: 'description',
      message: 'What is the project about?',
      default: '',
      validate: function (str) {
          return str.length > 0;
      }
    }, {
      name: 'name',
      message: 'What is your name?',
      default: '',
      validate: function (str) {
        return str.length > 0;
      }
    }, {
      name: 'email',
      message: 'What is your email?',
      validate: function (str) {
        return /[a-zA-Z0-9.!#$%&'*+-/=?\^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*/.test(str);
      }
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someAnswer;

      done();
    }.bind(this));
  },

  writing: {
    rootDir: function () {
      this.fs.copyTpl(
        this.templatePath('manage.py'),
        this.destinationPath('manage.py'),
        {
          projectName: this.props.projectName
        }
      );
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          projectName: this.props.projectName,
          description: this.props.description,
          name: this.props.name,
          email: this.props.email
        }
      );
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        {
          projectName: this.props.projectName,
          description: this.props.description,
          name: this.props.name,
          email: this.props.email
        }
      );
      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('_bowerrc'),
        this.destinationPath('.bowerrc')
      );
      this.fs.copy(
        this.templatePath('_editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('_eslintrc.json'),
        this.destinationPath('.eslintrc.json')
      );
      this.fs.copy(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
    },

    app: function () {
      this.fs.copyTpl(
        this.templatePath('app/wsgi.py'),
        this.destinationPath(this.props.projectName + '/wsgi.py'),
        {
          projectName: this.props.projectName
        }
      );
      this.fs.copyTpl(
        this.templatePath('app/settings/base.py'),
        this.destinationPath(this.props.projectName + '/settings/base.py'),
        {
          projectName: this.props.projectName
        }
      );
      this.fs.copy(
        this.templatePath('app/settings/development.py'),
        this.destinationPath(this.props.projectName + '/settings/development.py')
      );
      this.fs.copy(
        this.templatePath('app/settings/production.py'),
        this.destinationPath(this.props.projectName + '/settings/production.py')
      );
      this.fs.copy(
        this.templatePath('app/settings/__init__.py'),
        this.destinationPath(this.props.projectName + '/settings/__init__.py')
      );
      this.fs.copy(
        this.templatePath('app/urls.py'),
        this.destinationPath(this.props.projectName + '/urls.py')
      );
      this.fs.copy(
        this.templatePath('app/__init__.py'),
        this.destinationPath(this.props.projectName + '/__init__.py')
      );
    },

    home: function () {
      this.fs.copy(
        this.templatePath('home/__init__.py'),
        this.destinationPath('home/__init__.py')
      );
      this.fs.copy(
        this.templatePath('home/apps.py'),
        this.destinationPath('home/apps.py')
      );
      this.fs.copy(
        this.templatePath('home/views.py'),
        this.destinationPath('home/views.py')
      );
    },

    minihtml: function () {
      this.fs.copy(
        this.templatePath('minihtml/apps.py'),
        this.destinationPath('minihtml/apps.py')
      );
      this.fs.copy(
        this.templatePath('minihtml/middleware.py'),
        this.destinationPath('minihtml/middleware.py')
      );
    },

    templates: function() {
      this.fs.copyTpl(
        this.templatePath('templates/base.html'),
        this.destinationPath('templates/base.html'),
        {
          projectName: this.props.projectName
        }
      );
      this.fs.copy(
        this.templatePath('templates/header.html'),
        this.destinationPath('templates/header.html')
      );
      this.fs.copy(
        this.templatePath('templates/footer.html'),
        this.destinationPath('templates/footer.html')
      );
      this.fs.copy(
        this.templatePath('home/templates/index.html'),
        this.destinationPath('home/templates/home/index.html')
      );
      this.fs.copy(
        this.templatePath('templates/400.html'),
        this.destinationPath('templates/400.html')
      );
      this.fs.copy(
        this.templatePath('templates/403.html'),
        this.destinationPath('templates/403.html')
      );
      this.fs.copy(
        this.templatePath('templates/404.html'),
        this.destinationPath('templates/404.html')
      );
      this.fs.copy(
        this.templatePath('templates/500.html'),
        this.destinationPath('templates/500.html')
      );
    },

    styles: function () {
      this.fs.copy(
        this.templatePath('static/scss/style.scss'),
        this.destinationPath('static/scss/style.scss')
      );
      this.fs.copy(
        this.templatePath('static/scss/base/_base.scss'),
        this.destinationPath('static/scss/base/_base.scss')
      );
      this.fs.copy(
        this.templatePath('static/scss/base/_reset.scss'),
        this.destinationPath('static/scss/base/_reset.scss')
      );
      this.fs.copy(
        this.templatePath('static/scss/base/_clearfix.scss'),
        this.destinationPath('static/scss/base/_clearfix.scss')
      );
      this.fs.copy(
        this.templatePath('static/scss/components/_components.scss'),
        this.destinationPath('static/scss/components/_components.scss')
      );
      this.fs.copy(
        this.templatePath('static/scss/components/_main-menu.scss'),
        this.destinationPath('static/scss/components/_main-menu.scss')
      );
      this.fs.copy(
        this.templatePath('static/scss/helpers/_helpers.scss'),
        this.destinationPath('static/scss/helpers/_helpers.scss')
      );
      this.fs.copy(
        this.templatePath('static/scss/helpers/_variables.scss'),
        this.destinationPath('static/scss/helpers/_variables.scss')
      );
      this.fs.copy(
        this.templatePath('static/scss/helpers/_media.scss'),
        this.destinationPath('static/scss/helpers/_media.scss')
      );
      this.fs.copy(
        this.templatePath('static/scss/layout/_layout.scss'),
        this.destinationPath('static/scss/layout/_layout.scss')
      );
      this.fs.copy(
        this.templatePath('static/scss/pages/_pages.scss'),
        this.destinationPath('static/scss/pages/_pages.scss')
      );
    },

    requirements: function () {
      this.fs.copy(
        this.templatePath('requirements.txt'),
        this.destinationPath('requirements.txt')
      );
      this.fs.copy(
        this.templatePath('requirements/base.txt'),
        this.destinationPath('requirements/base.txt')
      );
      this.fs.copy(
        this.templatePath('requirements/development.txt'),
        this.destinationPath('requirements/development.txt')
      );
      this.fs.copy(
        this.templatePath('requirements/production.txt'),
        this.destinationPath('requirements/production.txt')
      );
    },
    
    dirs: function () {
      mkdirp('static/img');
      mkdirp('static/css');
      mkdirp('static/js');
      mkdirp('assets');
    }
  },

  install: {
    pip: function () {
      var done = this.async();
      
      if (process.env.VIRTUAL_ENV) {
        this.log(chalk.magenta('Installing pip dependencies...'));
        this.spawnCommand('pip', [
          'install',
          '-r',
          'requirements/development.txt'
        ]).on('close', function () {
            this.spawnCommand('python', ['manage.py', 'migrate', '--noinput']);
          }.bind(this));
        done();
      };
    },

    normal: function () {
      this.installDependencies();
    },

    git: function () {
      this.log(chalk.yellow('Setting up git repo'));
      this.spawnCommand('git', ['init']);
    }
  }
});
