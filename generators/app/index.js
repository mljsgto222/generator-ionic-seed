var generator = require('yeoman-generator');
var _ = require('lodash');
var chalk = require('chalk');
var fs = require('fs-extra');
var glob = require('glob');
var path = require('path');

module.exports = generator.Base.extend({
    constructor: function () {
        generator.Base.apply(this, arguments);

        this.argument('appName', {
            type: String,
            required: false
        });
        
        this.appName = _.camelCase(this.appName) || 'ionicProject';
    },
    prompting: {
        setApp: function(){
            var prompts = [{
                type: 'input',
                name: 'name',
                message: 'What\'s the app name?',
                default: this.appName
            }, {
                type: 'input',
                name: 'userName',
                message: 'what\'s the author name?',
                default: 'author'
            }, {
                type: 'input',
                name: 'userEmail',
                message: 'what\s the author email?',
                default: 'email@example.com'
            }];

            return this.prompt(prompts)
                .then(function (answers) {
                    answers.name = _.camelCase(answers.name);
                    this.answers = answers;
                }.bind(this));
        },
        setAppId: function () {
            var userName = _.lowerCase(this.answers.userName).replace(' ', '');
            var appName = _.lowerCase(this.answers.name).replace(' ', '');
            var prompts = [{
                type: 'input',
                name: 'appId',
                message: 'what\'s the app id?',
                default: 'com.' + userName + '.' + appName
            }];
            return this.prompt(prompts)
                .then(function (answers) {
                    this.answers.appId = answers.appId
                }.bind(this));
        },
        cleanDirectory: function(){
            var appPath = this.destinationPath(this.answers.name);
            var files = glob.sync('**/*.*', {dot: true, cwd: appPath});
            if(files.length > 0){
                var prompts = [{
                    type: 'confirm',
                    name: 'isClean',
                    message: 'the directory \''+ chalk.red(appPath) + '\' has already exists.Do you want to clean it?'
                }]
                return this.prompt(prompts)
                    .then(function (answers) {
                        if(answers.isClean){
                            fs.emptyDirSync(appPath);
                        }
                    }.bind(this));
            }
        }
    },
    writing: function () {
        var files = glob.sync('**/*.*', {dot: true, cwd: this.sourceRoot()});
        var appPath = this.answers.name;
        var self = this;
        _.forEach(files, function(file){
            self.fs.copyTpl(self.templatePath(file), self.destinationPath(path.join(appPath, file)), {
                app: self.answers
            });
        });
    },
    install: function () {
        var appPath = this.destinationPath(this.answers.name);
        process.chdir(appPath);
        this.installDependencies();
    }
});