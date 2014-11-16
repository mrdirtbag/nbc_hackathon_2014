/*global me, app*/
var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var SeriesCollectionPage = require('./pages/seriesCollection');
var SeriesPage = require('./pages/series');
var EpisodesPage = require('./pages/episodes');
var EpisodePage = require('./pages/episode');
var FeedPage = require('./pages/feed');
var log = require('bows')('A:Router');


module.exports = Router.extend({
    routes: {
        '': 'home',
        'series(/)': 'seriesCollection',
        'series/:seriesId(/)': 'series',
        'series/:seriesId/episodes': 'episodes',
        'series/:seriesId/episodes/:episodeId': 'episode',
        'video(/:videoId)': 'feed',
        'settings': 'settings',
        '(*path)': 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    home: function () {
        this.trigger('page', new HomePage({
            model: me
        }));
    },

    seriesCollection: function () {
        this.trigger('page', new SeriesCollectionPage({
            model: me,
            collection: app.series
        }));
    },

    series: function (id) {
        app.series.getOrFetch(id, function (err, model) {
            if (err) return log(err);
            this.trigger('page', new SeriesPage({
                model: model
            }));
        }.bind(this));
    },

    episodes: function (seriesId) {
        this.trigger('page', new EpisodesPage({
            model: app.series.get(seriesId),
        }));
    },

    episode: function (seriesId, episodeId) {
        this.feed();

        // var self = this;
        // app.series.getOrFetch(seriesId, function (err, series) {
        //     if (err) return log(err);
        //     log('got series: '+ seriesId);
        //     if (series.episodes.length) {
        //         self.trigger('page', new EpisodePage({
        //             model: series.episodes.get(episodeId)
        //         }));
        //     } else {
        //         series.fetchEpisodes(function (collection) {
        //             self.trigger('page', new EpisodePage({
        //                 model: collection.get(episodeId)
        //             }));
        //         });
        //     }
        // });
    },

    feed: function (id) {
        id = id || 'P0Anbwja7n_5';
        this.trigger('page', new FeedPage({
            model: app.videos.get(id)
        }));
    },

    settings: function () {
        log('settings');
        // this.trigger('page', new FeedPage({
        //     model: app.videos.at(0)
        // }));
    },

    catchAll: function () {
        this.redirectTo('');
    }
});
