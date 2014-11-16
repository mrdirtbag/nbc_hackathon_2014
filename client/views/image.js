var View = require('ampersand-view');
var templates = require('../templates');
// var _ = require('underscore');
// var raf = require('raf');
// var config = require('clientconfig');

var log = require('bows')('V:Image');

module.exports = View.extend({
    template: templates.includes.image,

    bindings: {
        // link: {
        //     type: 'attribute',
        //     hook: 'media-link',
        //     name: 'href'
        // },
        imageSrc: {
            type: 'booleanClass',
            hook: 'img',
            no: 'hidden'
        }
        // title: {
        //     hook: 'media-heading',
        // },
        // 'model.shortDescription': {
        //     hook: 'media-body',
        // }
    },
    events: {
        // 'click [data-hook~=canvas]': 'onSelect'
    },

    session: {
        // multiplier: ['number', true, 1]
    },

    derived: {
        imageSrc: {
            deps: ['model.episodeNum','model.seasonNum'],
            fn: function () {
                if (this.model.seasonNum === 2 && this.model.episodeNum >= 72)
                    return '../images/Episode0'+ this.model.episodeNum + '.jpg';
            }
        }
    },

    // initialize: function () {
    //     log('initialize');
    // },

    // onSelect: function () {
    //     var route = this.model.route || '/videos/'+this.model.id;
    //     log(route);
    //     app.navigate(route);
    // },

    render: function () {
        this.renderWithTemplate();
    }
});