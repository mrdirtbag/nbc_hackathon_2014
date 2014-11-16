var RestCollection = require('ampersand-rest-collection');
var Item = require('./item');
// var config = require('clientconfig');

// var _ = require('underscore');
var log = require('bows')('C:Feed');

module.exports = RestCollection.extend({

    // url: 'http://data.tmsapi.com/v1/series/',


    model: Item,

    // comparator: 'origAirDate',

    initialize: function () {
        log('initialize');
    }
});