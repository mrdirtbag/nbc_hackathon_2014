var PageView = require('./base');
var templates = require('../templates');
// var ScrollerView = require('../views/scroller');
var VideoView = require('../views/video');
var log = require('bows')('P:Videos');


module.exports = PageView.extend({

    pageTitle: 'videos',

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
            this.collection.fetchBSG();
            // this.addVideo();
        }
    },

    fetchCollection: function () {
        this.collection.fetch();
        return false;
    },

    addVideo: function () {
        // TODO: limit new videos
        this.collection.addNew();
    }

    // initialize: function() {
    //     log('initialize');
    // }
});