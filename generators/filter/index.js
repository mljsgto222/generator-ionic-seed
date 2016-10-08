var generator = require('yeoman-generator');
var _ = require('lodash');
var path = require('path');

module.exports = generator.Base.extend({
    constructor: function () {
        generator.Base.apply(this, arguments);

        this.argument('filterName', {
            type: String,
            required: false
        });
    },
    prompting: function () {
        var prompts = [];
        if(!this.filterName){
            prompts.push({
                type: 'input',
                name: 'name',
                message: 'What\'s the filter name?',
                default: 'myFilter'
            });
            return this.prompt(prompts)
            .then(function(answers){
                this.filterName = answers.name || this.filterName;
            }.bind(this));
        }  
    },
    addFilter: function () {
        var toPath = 'app/main/filters';
        var toJs = path.join(toPath, this.filterName + '.js');
        this.fs.copyTpl(this.templatePath('filter.js'), this.destinationPath(toJs), {
            name: this.filterName
        });
    }
});