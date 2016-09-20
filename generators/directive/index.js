var generator = require('yeoman-generator');
var _ = require('lodash');
var path = require('path');

module.exports = generator.Base.extend({
    constructor: function () {
        generator.Base.apply(this, arguments);

        this.argument('directiveName', {
            type: String,
            required: false
        });
    },
    prompting: function () {
        var prompts = [];
        if(!this.directiveName){
            prompts.push({
                type: 'input',
                name: 'name',
                message: 'What\'s the directive name?',
                default: 'myDirective'
            });
        }
        prompts.push({
            type: 'confirm',
            name: 'hasTemplate',
            message: 'Is the directive need template?',
        });

        return this.prompt(prompts)
            .then(function(answers){
                this.directiveName = answers.name || this.directiveName;
                this.hasTemplate = answers.hasTemplate;
            }.bind(this));
    },
    addDirective: function () {
        var toPath = 'app/main/directives';
        if(this.hasTemplate){
            toPath = path.join(toPath, this.directiveName);
            var toTemplate = path.join(toPath, this.directiveName + '.html');
            this.fs.write(this.destinationPath(toTemplate), '');
        }
        var toJs = path.join(toPath, this.directiveName + '.js');
        this.fs.copyTpl(this.templatePath('directive.js'), this.destinationPath(toJs), {
            name: this.directiveName
        });
    }
});