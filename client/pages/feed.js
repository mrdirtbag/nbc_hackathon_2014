var VideoView = require('../views/video');
var templates = require('../templates');
// var _ = require('underscore');
var log = require('bows')('P:Feed');

module.exports = VideoView.extend({
    template: templates.includes.videoEmbed,

    bindings: {
        // 'pageWidth': {
        //     type: 'attribute',
        //     hook: 'video-page',
        //     name: 'style'
        // }
    },

    events: {
        'click [data-hook~=video]': 'play',
    },

    derived: {
        // width: {
        //     deps: ['model.width', 'multiplier'],
        //     fn: function () {
        //         return this.model.width * this.multiplier;
        //     }
        // },
        // height: {
        //     deps: ['model.height', 'multiplier'],
        //     fn: function () {
        //         return this.model.height * this.multiplier;
        //     }
        // },
        // pageWidth: {
        //     deps: ['width', 'model.borderWidth', 'multiplier'],
        //     fn: function () {
        //         return 'width: '+(this.width + (this.model.borderWidth * this.multiplier)*2 + 2) + 'px;';
        //     }
        // }
    },

    initialize: function () {
        window.fp = this;
        log('initialize');
    },

    play: function (e) {
        log('play');
        e.preventDefault();
        e.stopPropagation();
        var video = this.queryByHook('video');
        // video.load();
        if (video.currentTime < 1800) {
            video.currentTime = 1800;
            video.play();
        } else {
            if (video.paused)
                video.play();
            else
                video.pause();
        }
    }
});