var generator = require('yeoman-generator');
var _ = require('lodash');
var path = require('path');

module.exports = generator.Base.extend({
    constructor: function () {
        generator.Base.apply(this, arguments);

        this.argument('sassName', {
            type: String,
            required: false
        });
    },
    prompting: function () {
        var prompts = [];
        if(!this.sassName){
            prompts.push({
                type: 'input',
                name: 'name',
                message: 'What\'s the sass name?',
                default: 'my-sass'
            });
            return this.prompt(prompts)
            .then(function(answers){
                this.sassName = answers.name || this.sassName;
            }.bind(this));
        }  
    },
    addSass: function () {
        var toPath = 'app/main/sass';
        var toJs = path.join(toPath, this.sassName + '.scss');
        this.fs.copyTpl(this.templatePath('sass.scss'), this.destinationPath(toJs), {
            name: this.sassName
        });
    }
});