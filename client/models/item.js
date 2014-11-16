var AmpersandState = require('ampersand-state');
// var log = require('bows')('M:Episode');

module.exports = AmpersandState.extend({
    type: 'item',

    // idAttribute: 'tmsId',

    props: {
        id: 'string',
        text: 'string',
        videoId: 'string',
        imageUrl: 'string',
        feedType: 'string',
        time: 'number',
        preferredImage: 'object',
        title: 'string'
    }
});