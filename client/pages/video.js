var VideoView = require('../views/video');
var templates = require('../templates');
// var _ = require('underscore');
var log = require('bows')('P:Video');

module.exports = VideoView.extend({
    template: templates.includes.videoPage,

    bindings: {
        'width': {
            type: 'attribute',
            hook: 'canvas',
            name: 'width'
        },
        'height': {
            type: 'attribute',
            hook: 'canvas',
            name: 'height'
        },
        'pageWidth': {
            type: 'attribute',
            hook: 'video-page',
            name: 'style'
        }
    },

    events: {
        'click': 'closeVideo'
    },

    derived: {
        width: {
            deps: ['model.width', 'multiplier'],
            fn: function () {
                return this.model.width * this.multiplier;
            }
        },
        height: {
            deps: ['model.height', 'multiplier'],
            fn: function () {
                return this.model.height * this.multiplier;
            }
        },
        pageWidth: {
            deps: ['width', 'model.borderWidth', 'multiplier'],
            fn: function () {
                return 'width: '+(this.width + (this.model.borderWidth * this.multiplier)*2 + 2) + 'px;';
            }
        }
    },

    initialize: function () {
        // window.tp = this;
        log('initialize');
    }
});