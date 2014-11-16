var PageView = require('./base');
var templates = require('../templates');
var EpisodeView = require('../views/video');
var config = require('clientconfig');

var log = require('bows')('P:Series');


module.exports = PageView.extend({

    pageTitle: 'series',

    template: templates.pages.series,

    bindings: {
        link: {
            type: 'attribute',
            hook: 'media-link',
            name: 'href'
        },
        imageSrc: {
            type: 'attribute',
            hook: 'media-image',
            name: 'src'
        },
        'model.shortDescription': {
            hook: 'media-body',
        },
        'model.title': [
            {
                hook: 'series'
            },
            {
                hook: 'media-heading',
            }
        ]
    },

    events: {
        // 'click [data-hook~=canvas]': 'onSelect'
    },

    derived: {
        imageSrc: {
            deps: ['model.preferredImage.uri'],
            fn: function () {
                var uri = this.model.preferredImage.uri;
                return 'http://developer.tmsimg.com/'+ uri + '?api_key='+config.tmsApiKey;
            }
        },
        link: {
            deps: ['model.seriesId'],
            fn: function () {
                return '/series/'+ this.model.seriesId;
            }
        }
    },

    render: function () {
        this.renderWithTemplate();
        this.renderCollection(this.model.episodes, EpisodeView, this.queryByHook('episode-list'));
        if (!this.model.episodes.length) {
            log('adding default series');
            this.fetchCollection();
        }
    },

    fetchCollection: function () {
        this.model.fetchEpisodes();
        return false;
    }

    // initialize: function() {
    //     log('initialize');
    // }
});