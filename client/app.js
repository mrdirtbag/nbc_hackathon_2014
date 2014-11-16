/* global me */
// var _ = require('underscore');
// var config = require('clientconfig');

var Router = require('./router');
// var tracking = require('./helpers/metrics');
var MainView = require('./views/main');
var Series = require('./models/seriesCollection');
var Videos = require('./models/videos');
var Me = require('./models/me');
var domReady = require('domready');
var log = require('bows')('A:app');

'use strict';

module.exports = {
    // this is the the whole app initter
    blastoff: function () {
        log('blastoff');
        var self = window.app = this;

        // create our global 'me' object and an empty collection for our people models.
        window.me = new Me();

        this.series = new Series();

        this.videos = new Videos([
            {
                id: 'P0Anbwja7n_5',
                seasonNum: 2,
                episodeNum: 84,
                url: 'http://link.theplatform.com/s/HNK2IC/media/P0Anbwja7n_5?feed=Telemundo%20Hackathon',
                startTime: 1800,
                endTime: 1840,
                feed: [
                    {
                        // id: 'string',
                        // text: 'string',
                        // videoId: 'string',
                        imageUrl: 'http://d3jubmq7nwu33f.cloudfront.net/images/c25ea33afd5545e381e0f1a92a9b5d88.jpg',
                        // imageCaption: 'Picture of Isidro',
                        feedType: 'image',
                        time: 5,
                        title: "Isidro (Monica's Older Brother)"
                    }
                ]
            },
            {
                id: '08a8YdJrvj8s',
                url: 'http://link.theplatform.com/s/HNK2IC/media/08a8YdJrvj8s?feed=Telemundo%20Hackathon',
                startTime: 15,
                endTime: 45
            }
        ]);

        // init our URL handlers and the history tracker
        this.router = new Router();

        // wait for document ready to render our main view
        // this ensures the document has a body, etc.
        domReady(function () {
            // init our main view
            var mainView = self.view = new MainView({
                model: me,
                el: document.body
                // el: document.getElementById('main')
            });

            // ...and render it
            mainView.render();

            // we have what we need, we can now start our router and show the appropriate page
            self.router.history.start({pushState: true, root: '/'});
        });
    },

    // This is how you navigate around the app.
    // this gets called by a global click handler that handles
    // all the <a> tags in the app.
    // it expects a url without a leading slash.
    // for example: "costello/settings".
    navigate: function (page) {
        var url = (page.charAt(0) === '/') ? page.slice(1) : page;
        this.router.history.navigate(url, {trigger: true});
    }
};

// run it
module.exports.blastoff();
