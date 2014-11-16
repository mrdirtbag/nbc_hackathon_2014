var RestCollection = require('ampersand-rest-collection');
var Video = require('./video');
var config = require('clientconfig');

// var _ = require('underscore');
var log = require('bows')('C:Videos');

module.exports = RestCollection.extend({

    url: 'http://data.tmsapi.com/v1/',

    model: Video,

    // comparator: 'origAirDate',

    initialize: function () {
        log('initialize');
        if (!this.length)
            this.add({});
    }
});