var RestCollection = require('ampersand-rest-collection');
var Episode = require('./episode');
var config = require('clientconfig');

// var _ = require('underscore');
var log = require('bows')('C:Series');

module.exports = RestCollection.extend({

    url: 'http://data.tmsapi.com/v1/series/',

    model: Episode,

    comparator: 'origAirDate',

    initialize: function () {
        log('initialize');
    },

    _fetch: function (seriesId, cb) {
        this.fetch({
            url: this.url + (seriesId || this.parent.seriesId) + '/episodes?api_key='+config.tmsApiKey+'&imageSize=Sm',
            // data: {
            //     imageSize: 'Sm',
            //     descriptionLang: 'en',
            //     api_key: config.tmsApiKey
            // },
            success: cb
        });
    }
});