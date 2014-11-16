var AmpersandState = require('ampersand-state');
// var log = require('bows')('M:Video');

module.exports = AmpersandState.extend({
    type: 'video',

    props: {
        'tmsId': 'string',
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