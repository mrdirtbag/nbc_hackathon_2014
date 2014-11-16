var View = require('ampersand-view');
var templates = require('../templates');


module.exports = View.extend({
    template: templates.includes.user,
    bindings: {
        'model.id': '[data-hook~=name]',
        'model.points': '[data-hook~=points]',
        'model.avatar': {
            type: 'attribute',
            hook: 'avatar',
            name: 'src'
        },
        'model.viewUrl': {
            type: 'attribute',
            hook: 'name',
            name: 'href'
        }
    }
});