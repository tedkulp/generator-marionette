'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var MarionetteGenerator = module.exports = function MarionetteGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.testFramework = this.options['test-framework'] || 'jasmine';
  this.templateFramework = this.options['template-framework'] || 'lodash';

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(MarionetteGenerator, yeoman.generators.Base);

MarionetteGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      type: 'string',
      name: 'bowerDirectory',
      message: 'Where do you want the Bower components installed?',
      default: 'bower_components'
    }
  ];

  this.prompt(prompts, function (props) {
    this.bowerDirectory = props.bowerDirectory;

    cb();
  }.bind(this));
};

MarionetteGenerator.prototype.bower = function bower() {
  this.template('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
};

MarionetteGenerator.prototype.gruntfile = function gruntfile() {
  this.connect = {
    options: {
      port: 8888
    }
  };

  this.template('Gruntfile.js', 'Gruntfile.js');
};

MarionetteGenerator.prototype.git = function git() {
  this.template('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

MarionetteGenerator.prototype.mainStylesheet = function mainStylesheet() {
  this.write('styles/main.scss', '@import \'sass-bootstrap/lib/bootstrap\';\n\n.hero-unit {\n    margin: 50px auto 0 auto;\n    width: 400px;\n}');
};

MarionetteGenerator.prototype.app = function app() {
  this.mkdir('scripts');

  this.copy('_package.json', 'package.json');
  this.copy('app/app.coffee', 'scripts/app.coffee');
  this.copy('app/config.js', 'scripts/config.js');
  this.copy('app/main.coffee', 'scripts/main.coffee');

  // html
  this.template('app/index.html', 'index.html');
};

MarionetteGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
