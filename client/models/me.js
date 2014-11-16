var AmpersandState = require('ampersand-state');
// var _ = require('underscore');
var log = require('bows')('M:Me');

module.exports = AmpersandState.extend({
    type: 'user',


    props: {
        id: ['string', true, 'me'],
        uid: ['string'],
        // username: ['string']
    },
    derived: {
       avatar: {
            deps: ['id'],
            fn: function () {
                if (this.id === 'me') return '';
                return 'http://robohash.org/' + encodeURIComponent(this.id) + '?size=80x80';
            }
        }
    },

    initialize: function () {
        log('initialize');
    }

});