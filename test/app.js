'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-django-reload:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .withPrompts({projectName: 'test', description: 'test', name: 'test', email: 'test@example.com'})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'gulpfile.js'
    ]);
  });
});
