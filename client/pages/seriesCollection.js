var PageView = require('./base');
var templates = require('../templates');
var SeriesView = require('../views/series');
var log = require('bows')('P:Series');


module.exports = PageView.extend({

    pageTitle: 'series',

    template: templates.pages.contentList,

    session: {
        title: ['string', true, 'Series']
    },

    render: function () {
        this.renderWithTemplate();
        this.renderCollection(this.collection, SeriesView, this.queryByHook('content-list'));
        if (this.collection.length < 2) {
            log('adding default series');
            this.collection.fetchByIds(['9891050']);
        }
    },

    fetchCollection: function () {
        this.collection.fetch();
        return false;
    }
});