var View = require('ampersand-view');
var templates = require('../templates');


module.exports = View.extend({
    template: templates.pages.settings,
    bindings: {
        // 'model.fullName': '[data-hook~=name]',
        // 'model.avatar': {
        //     type: 'attribute',
        //     hook: 'avatar',
        //     name: 'src'
        // },
        // 'model.editUrl': {
        //     type: 'attribute',
        //     hook: 'action-edit',
        //     name: 'href'
        // },
        // 'model.viewUrl': {
        //     type: 'attribute',
        //     hook: 'name',
        //     name: 'href'
        // }
    },
    events: {
        'click [data-hook~=done]': 'handleDone'
    },

    handleDone: function () {
        this.model.showSettings = false;
    }
});