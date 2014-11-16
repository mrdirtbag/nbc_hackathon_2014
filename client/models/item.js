var AmpersandState = require('ampersand-state');
// var log = require('bows')('M:Episode');

module.exports = AmpersandState.extend({
    type: 'item',

    // idAttribute: 'tmsId',

    props: {
        'id': 'string',
        'text': 'string',
        'videoId': 'string',
        'rootId': 'string',
        'seriesId': 'string',
        'episodeTitle': 'string',
        'shortDescription': 'string',
        'origAirDate': 'string',
        'seasonNum': 'number',
        'episodeNum': 'number',
        'entityType': 'string',
        'subType': "string",
        'preferredImage': 'object',
        'title': 'string'
    }
});