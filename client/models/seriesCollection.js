var RestCollection = require('ampersand-rest-collection');
var Series = require('./series');
var config = require('clientconfig');
var _ = require('underscore');
var log = require('bows')('C:Series');

module.exports = RestCollection.extend({

    url: 'http://data.tmsapi.com/v1/series/',

    // ajaxConfig: function () {
    //     return {
    //         beforeSend: function (xhr) {

    //         }
    //     };
    // },

    model: Series,

    comparator: 'origAirDate',

    initialize: function () {
        log('initialize');
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

    // _fetch: function (seriesId) {
    //     this.fetch({
    //         url: this.url + seriesId,
    //         data: {
    //             imageSize: 'Sm',
    //             descriptionLang: 'en',
    //             api_key: config.tmsApiKey
    //         }
    //     });
    // },

    fetchByIds: function (ids) {
        ids.forEach(function (id) {
            this.fetchById(id);
        }, this);
    }
});