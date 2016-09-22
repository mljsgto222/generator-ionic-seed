var generator = require('yeoman-generator');
var _ = require('lodash');
var path = require('path');

module.exports = generator.Base.extend({
    constructor: function () {
        generator.Base.apply(this, arguments);

        this.argument('valueName', {
            type: String,
            required: false
        });
    },
    prompting: function () {
        var prompts = [];
        if(!this.valueName){
            prompts.push({
                type: 'input',
                name: 'name',
                message: 'What\'s the value name?',
                default: 'myValue'
            });
            return this.prompt(prompts)
            .then(function(answers){
                this.valueName = answers.name || this.valueName;
            }.bind(this));
        }  
    },
    addValue: function () {
        var toPath = 'app/main/value';
        var toJs = path.join(toPath, this.valueName + '.scss');
        this.fs.copyTpl(this.templatePath('value.scss'), this.destinationPath(toJs), {
            name: this.valueName
        });
    }
});