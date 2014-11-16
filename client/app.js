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
                startTime: 1805,
                endTime: 1840,
                feed: [
                    {
                        title: "Interview with lead actors",
                        text: "RT @TLMDMediaPR: Nuestro protagonista de la serie @SrDeLosCielosTV habla con @UnNuevoDia sobre la gran final! #ESDLC http://t.co/ClSKFcSK1V",
                        imageUrl: "http://pbs.twimg.com/media/ByI73JbIcAAoMn5.jpg",
                        feedType: 'twitter',
                        time: 1804+ 5
                    },
                    {
                        // id: 'string',
                        // text: 'string',
                        // videoId: 'string',
                        imageUrl: 'http://d3jubmq7nwu33f.cloudfront.net/images/c25ea33afd5545e381e0f1a92a9b5d88.jpg',
                        // imageCaption: 'Picture of Isidro',
                        feedType: 'image',
                        time: 1805+ 5,
                        title: "Monica's son is named after Isidro (Monica's Older Brother)"
                    },
                    {
                        title: 'Remember',
                        text: "Aurelio stabbed Monica which caused her miscarriage.",
                        feedType: 'remember',
                        time: 1805+ 9
                    },
                    {
                        // id: 'string',
                        // text: 'string',
                        videoId: '08a8YdJrvj8s',
                        imageUrl: "../images/MonicasSoftSideClip.jpg",
                        // imageCaption: 'Picture of Isidro',
                        feedType: 'video',
                        time: 1805+ 12,
                        title: "Monica's Soft Side"
                    },
                    {
                        title: 'Tiffany',
                        text: "I remember when Monica had her miscarriage ... so sad :-(",
                        feedType: 'comment',
                        time: 1805+ 18
                    },
                    {
                        title: "Jonathan Lander     @JonnyLand     9/22/14",
                        text: "No way Aurelio would do that! He is the Lord! #ESDLC",
                        time: 1805+ 20,
                        feedType: 'twitter'
                    }
                ]
            },
            {
                id: '08a8YdJrvj8s',
                url: 'http://link.theplatform.com/s/HNK2IC/media/08a8YdJrvj8s?feed=Telemundo%20Hackathon',
                startTime: 15,
                endTime: 45,
                feed: [

                    {
                        title: 'Remember',
                        text: "Monica remembers her first child and the miscarriage from Aurelio stabbing her.",
                        feedType: 'remember',
                        time: 15+ 4
                    },
                    {
                        title: 'Susan Lander     @SueLand     9/22/14',
                        text: "Goodness the Lord is mean! #ESDLC",
                        feedType: 'twitter',
                        time: 15+ 10
                    }
                ]
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
