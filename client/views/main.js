/*global app, me */
// This app view is responsible for rendering all content that goes into
// <html>. It's initted right away and renders itself on DOM ready.

// This view also handles all the 'document' level events such as keyboard shortcuts.
var View = require('ampersand-view');
var ViewSwitcher = require('ampersand-view-switcher');
var _ = require('underscore');
var domify = require('domify');
var dom = require('ampersand-dom');
var SettingsView = require('./settings');
var templates = require('../templates');
// var tracking = require('../helpers/metrics');
var setFavicon = require('favicon-setter');
var log = require('bows')('V:Main');



module.exports = View.extend({
    template: templates.body,
    initialize: function () {
        // this marks the correct nav item selected
        this.listenTo(app.router, 'page', this.handleNewPage);
    },
    bindings: {
        'model.points': '[data-hook~=points]',
        'model.avatar': {
            type: 'attribute',
            hook: 'avatar',
            name: 'src'
        },
        'model.loggedIn': {
            type: 'booleanClass',
            hook: 'collapse-target',
            yes: 'login',
            no: 'logout'
        },
        'model.collapse': {
            type: 'booleanClass',
            hook: 'collapse-target',
            name: 'collapse'
        },
        'model.menuDropdown': {
            type: 'booleanClass',
            hook: 'dropdown-menu',
            name: 'open'
        },
        'model.rotate': {
            type: 'booleanClass',
            hook: 'rotate-target',
            name: 'landscape'
        },
        'model.showSettings': {
            type: 'booleanClass',
            hook: 'settings',
            no: 'hidden'
        },
        'model.showNav': {
            type: 'booleanClass',
            hook: 'app-nav',
            no: 'hidden'
        }
    },
    session: {
        // collapse: ['boolean', true, true],
        // rotate: ['boolean', true, false],
        // menuDropdown: ['boolean', true, false]
    },
    // derived: {
    //     dropdownText: {
    //         deps: ['model.loggedIn'],
    //         fn: function () {
    //             if (this.model.loggedIn)
    //                 return '';
    //             else
    //                 return 'menu';
    //         }
    //     }
    // },
    events: {
        'click [data-hook~=rotate]': 'handleRotate',
        'click [data-hook~=collapse]': 'handleCollapse',
        'click [data-hook~=dropdown-toggle]': 'handleMenu',
        'click a[href]': 'handleLinkClick',
        'click a img': 'handleImgClick',
        'click a span': 'handleSpanClick',
        'click main': 'closeNav'
    },
    render: function () {
        // some additional stuff we want to add to the document head
        document.head.appendChild(domify(templates.head()));

        // main renderer
        this.renderWithTemplate({me: me});

        // init and configure our page switcher
        this.pageSwitcher = new ViewSwitcher(this.queryByHook('page-container'), {
            show: function (newView, oldView) {
                // it's inserted and rendered for me
                document.title = _.result(newView, 'pageTitle') || "Catch Novela";
                document.scrollTop = 0;

                // add a class specifying it's active
                dom.addClass(newView.el, 'active');

                // store an additional reference, just because
                app.currentPage = newView;
            }
        });

        // setting a favicon for fun (note, it's dynamic)
        setFavicon('/images/ampersand.png');
        return this;
    },

    subviews: {
        settings: {
            hook: 'settings',
            waitFor: 'model.showSettings',
            prepareView: function (el) {
                return new SettingsView({
                    el: el,
                    model: this.model
                });
            }
        }
    },

    handleNewPage: function (view) {
        // tell the view switcher to render the new one
        this.pageSwitcher.set(view);

        // mark the correct nav item selected
        this.updateActiveNav();
    },

    handleLinkClick: function (e) {
        var aTag = e.target;
        if (aTag.pathname !== '/menu')
            this._handleClick(aTag, e);
    },

    handleImgClick: function (e) {
        var aTag = e.target.parentNode;
        this._handleClick(aTag, e);
    },

    handleSpanClick: function (e) {
        var aTag = e.target.parentNode;

        if (aTag.pathname === '/settings') {
            log('settings');
            this.model.toggle('showSettings');
            e.preventDefault();
            return;
        }
        this._handleClick(aTag, e);
    },

    _handleClick: function (aTag, e) {
        var local = aTag.host === window.location.host;

        // if it's a plain click (no modifier keys)
        // and it's a local url, navigate internally
        if (local && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
            e.preventDefault();
            this.closeNav();
            // window.aTag = aTag;
            // log(aTag.pathname);
            app.navigate(aTag.pathname);
        }
    },

    handleRotate: function (e) {
        // log('handleCollapse');
        e.preventDefault();
        e.stopPropagation();
        this.model.toggle('rotate');
    },

    handleCollapse: function (e) {
        // log('handleCollapse');
        e.preventDefault();
        e.stopPropagation();
        this.toggle('collapse');
        if (this.model.collapse)
            this.model.menuDropdown = false;
    },

    handleMenu: function (e) {
        // log('handleMenu');
        e.preventDefault();
        e.stopPropagation();
        this.model.toggle('menuDropdown');
    },

    closeNav: function () {
        this.model.collapse = true;
        this.model.menuDropdown = false;
    },

    updateActiveNav: function () {
        var path = window.location.pathname.slice(1);

        this.queryAll('.nav a[href]').forEach(function (aTag) {
            var aPath = aTag.pathname.slice(1);

            if ((!aPath && !path) || (aPath && path.indexOf(aPath) === 0)) {
                dom.addClass(aTag.parentNode, 'active');
            } else {
                dom.removeClass(aTag.parentNode, 'active');
            }
        });
    }
});