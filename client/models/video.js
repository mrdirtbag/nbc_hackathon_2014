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
        'title': 'string',
        'url': ['string', true, 'http://link.theplatform.com/s/HNK2IC/media/P0Anbwja7n_5?feed=Telemundo%20Hackathon']
        // 'url': ['string', true, 'http://player.theplatform.com/p/JStuSC/hackathon_dark/embed/select/media/P0Anbwja7n_5?t=1800-1900']
    }
});