var generator = require('yeoman-generator');
var _ = require('lodash');
var path = require('path');

module.exports = generator.Base.extend({
    constructor: function () {
        generator.Base.apply(this, arguments);

        this.argument('viewName', {
            type: String,
            required: false
        });
    },
    prompting: function () {
        var prompts = [];
        if(!this.viewName){
            prompts.push({
                type: 'input',
                name: 'name',
                message: 'What\'s the view name?',
                default: 'myView'
            });
        }

        return this.prompt(prompts)
            .then(function(answers){
                this.viewName = answers.name || this.viewName;
            }.bind(this));
    },
    addView: function () {
        var toPath = 'app/main/views';
        toPath = path.join(toPath, this.viewName);
        var toTemplate = path.join(toPath, this.viewName + '.html');
        this.fs.write(this.destinationPath(toTemplate), '');
        var toJs = path.join(toPath, this.viewName + 'Ctrl.js');
        this.fs.copyTpl(this.templatePath('controller.js'), this.destinationPath(toJs), {
            name: this.viewName
        });
    }
});