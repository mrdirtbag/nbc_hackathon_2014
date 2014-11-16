var AmpersandModel = require('ampersand-model');
var Episodes = require('./episodes');
var config = require('clientconfig');
var _ = require('underscore');

module.exports = AmpersandModel.extend({

    urlRoot: 'http://data.tmsapi.com/v1/series',

    idAttribute: 'seriesId',

    props: {
        'tmsId': 'string',
        'rootId': 'string',
        'seriesId': 'string',
        'shortDescription': 'string',
        'longDescription': 'string',
        'origAirDate': 'string',
        // 'seasonNum': 'number',
        // 'episodeNum': 'number',
        'entityType': 'string',
        'subType': "string",
        'preferredImage': 'object',
        'title': 'string'
    },
    collections: {
        episodes: Episodes
    },

    initialize: function () {
        this.fetch = _.wrap(this.fetch.bind(this), function (fetch, options) {
            options || (options = {});
            options.data = _.defaults(options.data || {}, {
                imageSize: 'Sm',
                descriptionLang: 'en',
                api_key: config.tmsApiKey
            });
            fetch(options);
        });
    },

    fetchDetails: function () {
        this.fetch({
            url: this.url(),
            data: {
                imageSize: 'Sm',
                season: 2,
                descriptionLang: 'en',
                api_key: config.tmsApiKey
            }
        });
    },

    fetchEpisodes: function (cb) {
        this.episodes._fetch(this.seriesId, cb);
    }
});