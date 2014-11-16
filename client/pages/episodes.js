var PageView = require('./base');
var templates = require('../templates');
var VideoView = require('../views/video');
var log = require('bows')('P:Episodes');


module.exports = PageView.extend({

    pageTitle: 'episodes',

    template: templates.pages.videoCollection,

    // bindings: {
    //     'model.points': '[data-hook~=points]',
    //     'model.avatar': {
    //         type: 'attribute',
    //         hook: 'avatar',
    //         name: 'src'
    //     }
    // },

    // subviews: {
    //     scroller: {
    //         prepareView: function(el) {
    //             return new ScrollerView({
    //                 model: this.model,
    //                 el: el,
    //             });
    //         },
    //         hook: 'video-scroller',
    //         waitFor: 'model.videos'
    //     }
    // },

    render: function () {
        this.renderWithTemplate();
        this.renderCollection(this.collection, VideoView, this.queryByHook('video-list'));
        if (!this.collection.length) {
            log('no episodes');
            // this.collection.fetchBSG();
            // this.addVideo();
        }
    },

    fetchCollection: function () {
        this.collection.fetch();
        return false;
    }
});