var generator = require('yeoman-generator');
var _ = require('lodash');
var path = require('path');

module.exports = generator.Base.extend({
    constructor: function () {
        generator.Base.apply(this, arguments);

        this.argument('constantName', {
            type: String,
            required: false
        });
    },
    prompting: function () {
        var prompts = [];
        if(!this.constantName){
            prompts.push({
                type: 'input',
                name: 'name',
                message: 'What\'s the constant name?',
                default: 'myConstant'
            });
            return this.prompt(prompts)
                .then(function(answers){
                    this.constantName = answers.name || this.constantName;
                }.bind(this));
        }
    },
    addConstant: function () {
        var toPath = 'app/main/constants';
        var toJs = path.join(toPath, this.constantName + '.js');
        this.fs.copyTpl(this.templatePath('constant.js'), this.destinationPath(toJs), {
            name: this.constantName
        });
    }
});