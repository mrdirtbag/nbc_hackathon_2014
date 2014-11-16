/* global me */

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

    session: {
        started: ['boolean', true, false],
        rendered: ['boolean', true, false]
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
        me.showNav = true;
    },

    render: function () {
        this.renderWithTemplate();
        var model = this.model;
        var startTime = this.model.startTime;
        this.video = this.queryByHook('video');
        this.video.addEventListener('loadeddata', function () {
            log('loadeddata');
            var video = this;
            model.currentTime = this.currentTime = startTime;
            setInterval(function () {
                model.currentTime = video.currentTime;
            }, 500);
            // this.play();
        }, false);
    },

    renderFeed: function () {
        if (this.started) return;
        this.started = true;
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
        if (!this.started)
            this.renderFeed();
        if (video.currentTime < this.model.startTime) {
            this.model.currentTime = video.currentTime = this.model.startTime;
            video.play();
            me.showNav = false;
        } else {
            if (video.paused) {
                video.play();
                me.showNav = false;
            }
            else {
                me.showNav = true;
                video.pause();
            }

        }
    },

    startFeed: function () {
        var feed = this.model.feed;
        this.interval = setInterval(function () {
            if (feed.length > 10)
                return clearInterval(this.interval);
            feed.add({
                title: _.uniqueId('item'),
                text: 'blah blah blah blah blah and more blah',
                videoId: '08a8YdJrvj8s'
            });
        }, 1000);
    }
});