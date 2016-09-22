var generator = require('yeoman-generator');
var _ = require('lodash');
var path = require('path');

module.exports = generator.Base.extend({
    constructor: function () {
        generator.Base.apply(this, arguments);

        this.argument('serviceName', {
            type: String,
            required: false
        });
    },
    prompting: function () {
        var prompts = [];
        if(!this.serviceName){
            prompts.push({
                type: 'input',
                name: 'name',
                message: 'What\'s the service name?',
                default: 'myService'
            });
        }
        prompts.push({
            type: 'confirm',
            name: 'hasTemplate',
            message: 'Do you need a template for this service?',
        });

        return this.prompt(prompts)
            .then(function(answers){
                this.serviceName = answers.name || this.serviceName;
                this.hasTemplate = answers.hasTemplate;
            }.bind(this));
    },
    addService: function () {
        var toPath = 'app/main/services';
        if(this.hasTemplate){
            toPath = path.join(toPath, this.serviceName);
            var toTemplate = path.join(toPath, this.serviceName + '.html');
            this.fs.write(this.destinationPath(toTemplate), '');
        }
        var toJs = path.join(toPath, this.serviceName + '.js');
        this.fs.copyTpl(this.templatePath('service.js'), this.destinationPath(toJs), {
            name: this.serviceName
        });
    }
});