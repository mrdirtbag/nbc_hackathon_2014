var VideoView = require('../views/video');
var templates = require('../templates');
var ItemView = require('../views/item');
var _ = require('underscore');
var log = require('bows')('P:Feed');

module.exports = VideoView.extend({
    template: templates.includes.videoEmbed,

    bindings: {
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

    render: function () {
        this.renderWithTemplate();
        this.video = this.queryByHook('video');
        this.video.addEventListener('loadeddata', function () {
            log('loadeddata');
            this.currentTime = 1800;
            this.play();
        }, false);
        this.renderCollection(this.model.feed, ItemView, this.queryByHook('feed'));
        if (!this.model.feed.length) {
            log('adding default series');
            this.startFeed();
        }
    },

    play: function (e) {
        log('play');
        e.preventDefault();
        e.stopPropagation();
        var video = this.video;
        if (video.currentTime < 1800) {
            video.currentTime = 1800;
            video.play();
        } else {
            if (video.paused)
                video.play();
            else
                video.pause();
        }
    },

    startFeed: function () {
        var feed = this.model.feed;
        this.interval = setInterval(function () {
            feed.add({
                title: _.uniqueId('item'),
                text: 'blah blah blah blah blah and more blah'
            });
        }, 1000);
    }
});