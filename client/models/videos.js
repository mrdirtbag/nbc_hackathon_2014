var RestCollection = require('ampersand-rest-collection');
var Video = require('./video');
var config = require('clientconfig');

// var _ = require('underscore');
var log = require('bows')('C:Videos');

module.exports = RestCollection.extend({

    url: 'http://data.tmsapi.com/v1/',

    model: Video,

    comparator: 'origAirDate',

    initialize: function () {
        log('initialize');
    },

    fetchBSG: function () {
        log('fetch BSG');
        var seriesId = '185082';
        var url = this.url + 'series/'+ seriesId + '/episodes';

        this.fetch({
            url: url,
            data: {
                imageSize: 'Sm',
                descriptionLang: 'en',
                api_key: config.tmsApiKey
            }
        });
    }
});