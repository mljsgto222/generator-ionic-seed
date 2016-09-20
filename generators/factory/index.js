var generator = require('yeoman-generator');
var _ = require('lodash');
var path = require('path');

module.exports = generator.Base.extend({
    constructor: function () {
        generator.Base.apply(this, arguments);

        this.argument('factoryName', {
            type: String,
            required: false
        });
    },
    prompting: function () {
        var prompts = [];
        if(!this.factoryName){
            prompts.push({
                type: 'input',
                name: 'name',
                message: 'What\'s the factory name?',
                default: 'myFactory'
            });
        }
        prompts.push({
            type: 'confirm',
            name: 'hasTemplate',
            message: 'Is the factory need template?',
        });

        return this.prompt(prompts)
            .then(function(answers){
                this.factoryName = answers.name || this.factoryName;
                this.hasTemplate = answers.hasTemplate;
            }.bind(this));
    },
    addFactory: function () {
        var toPath = 'app/main/factorys';
        if(this.hasTemplate){
            toPath = path.join(toPath, this.factoryName);
            var toTemplate = path.join(toPath, this.factoryName + '.html');
            this.fs.write(this.destinationPath(toTemplate), '');
        }
        var toJs = path.join(toPath, this.factoryName + '.js');
        this.fs.copyTpl(this.templatePath('factory.js'), this.destinationPath(toJs), {
            name: this.factoryName
        });
    }
});