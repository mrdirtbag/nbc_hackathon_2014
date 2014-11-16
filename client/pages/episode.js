var PageView = require('./base');
var templates = require('../templates');
var config = require('clientconfig');

var log = require('bows')('P:Episode');


module.exports = PageView.extend({

    pageTitle: 'episode',

    template: templates.pages.episode,

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
        title: {
            hook: 'media-heading',
        },
        'model.shortDescription': {
            hook: 'media-body',
        },
        'model.title': {
            hook: 'series'
        },
        'model.episodeTitle': {
            hook: 'episode'
        },
        'seriesLink': {
            hook: 'series',
            type: 'attribute',
            name: 'href'
        }
    },

    events: {
        // 'click [data-hook~=canvas]': 'onSelect'
    },

    session: {
        // multiplier: ['number', true, 1]
    },

    derived: {
        title: {
            deps: ['model.entityType','model.episodeTitle', 'model.seasonNum', 'model.episodeNum', 'model.title'],
            fn: function () {
                var title = '';
                if (this.model.entityType === 'Episode') {
                    if (this.model.seasonNum)
                        title += 'S'+this.model.seasonNum;
                    if (this.model.episodeNum)
                        title += 'E' + this.model.episodeNum;
                    if (title.length)
                        title += ' - ';
                    title += this.model.episodeTitle;
                } else
                    title = this.model.title;
                return  title;
            }
        },
        imageSrc: {
            deps: ['model.preferredImage.uri'],
            fn: function () {
                var uri = this.model.preferredImage.uri;
                if (uri === 'tvbanners/generic/generic_tvbanners_v6.png') {
                    try {
                        uri = this.model.collection.parent.preferredImage.uri;
                    } catch (e) {
                        log(e);
                    }
                }
                return 'http://developer.tmsimg.com/'+ uri + '?api_key='+config.tmsApiKey;
            }
        },
        seriesLink: {
            deps: ['model.seriesId'],
            fn: function () {
                return '/series/'+ this.model.seriesId;
            }
        }
    },

    render: function () {
        this.renderWithTemplate();
    }

    // initialize: function() {
    //     log('initialize');
    // }
});