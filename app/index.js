'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var StyleguideGenerator = module.exports = function StyleguideGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(StyleguideGenerator, yeoman.generators.Base);

StyleguideGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'styleguideName',
    message: 'What would you like to name your styleguide?',
  }];

  this.prompt(prompts, function (props) {
    this.styleguideName = props.styleguideName;

    cb();
  }.bind(this));
};

StyleguideGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/_posts');
  this.mkdir('app/_templates');

  this.template('_index.md', 'app/posts/index.md');
  this.template('Gruntfile.js', 'Gruntfile.js');
  this.template('index.html', 'index.html');
  this.template('_bower.json', 'bower.json');
  this.template('_config.json', 'config.json');
  this.template('_package.json', 'package.json');

  this.copy('wordmap.json', 'wordmap.json');
  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

StyleguideGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
