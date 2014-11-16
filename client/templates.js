(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof root === 'undefined' || root !== Object(root)) {
        throw new Error('templatizer: window does not exist or is not an object');
    } else {
        root.templatizer = factory();
    }
}(this, function () {
    var jade=function(){function r(r){return null!=r&&""!==r}function n(e){return Array.isArray(e)?e.map(n).filter(r).join(" "):e}var e={};return e.merge=function t(n,e){if(1===arguments.length){for(var a=n[0],s=1;s<n.length;s++)a=t(a,n[s]);return a}var i=n["class"],l=e["class"];(i||l)&&(i=i||[],l=l||[],Array.isArray(i)||(i=[i]),Array.isArray(l)||(l=[l]),n["class"]=i.concat(l).filter(r));for(var o in e)"class"!=o&&(n[o]=e[o]);return n},e.joinClasses=n,e.cls=function(r,t){for(var a=[],s=0;s<r.length;s++)a.push(t&&t[s]?e.escape(n([r[s]])):n(r[s]));var i=n(a);return i.length?' class="'+i+'"':""},e.attr=function(r,n,t,a){return"boolean"==typeof n||null==n?n?" "+(a?r:r+'="'+r+'"'):"":0==r.indexOf("data")&&"string"!=typeof n?" "+r+"='"+JSON.stringify(n).replace(/'/g,"&apos;")+"'":t?" "+r+'="'+e.escape(n)+'"':" "+r+'="'+n+'"'},e.attrs=function(r,t){var a=[],s=Object.keys(r);if(s.length)for(var i=0;i<s.length;++i){var l=s[i],o=r[l];"class"==l?(o=n(o))&&a.push(" "+l+'="'+o+'"'):a.push(e.attr(l,o,!1,t))}return a.join("")},e.escape=function(r){var n=String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");return n===""+r?r:n},e.rethrow=function a(r,n,e,t){if(!(r instanceof Error))throw r;if(!("undefined"==typeof window&&n||t))throw r.message+=" on line "+e,r;try{t=t||require("fs").readFileSync(n,"utf8")}catch(s){a(r,null,e)}var i=3,l=t.split("\n"),o=Math.max(e-i,0),c=Math.min(l.length,e+i),i=l.slice(o,c).map(function(r,n){var t=n+o+1;return(t==e?"  > ":"    ")+t+"| "+r}).join("\n");throw r.path=n,r.message=(n||"Jade")+":"+e+"\n"+i+"\n\n"+r.message,r},e}();

    var templatizer = {};
    templatizer["includes"] = {};
    templatizer["pages"] = {};

    // body.jade compiled template
    templatizer["body"] = function tmpl_body() {
        return '<body><nav class="navbar navbar-default"><div class="container-fluid"><div class="navbar-header"><button type="button" data-toggle="collapse" data-target="#feedline-navbar" data-hook="collapse" class="navbar-toggle collapsed"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="/" class="navbar-brand">feedline</a></div><div id="feedline-navbar" data-hook="collapse-target" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="/">home</a></li><li><a href="/series">tv</a></li><li><a href="/video">video</a></li><li><a href="/feedline">feedline</a></li></ul></div></div></nav><div class="container"><div class="row"><div class="col-xs-12 col-sm-6 col-md-8"><div class="content"><div id="phone-view"><div data-hook="rotate-target" class="device"><div class="phone-container"><div data-hook="main-view" class="main-view"><nav data-hook="app-nav" class="navbar navbar-default"><div class="container-fluid"><div class="navbar-header"><button type="button" data-toggle="collapse" data-target="#app-navbar" data-hook="app-collapse" class="navbar-toggle collapsed"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="/" class="navbar-brand">feedline</a></div><div id="app-navbar" data-hook="app-collapse-target" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="/series">tv</a></li><li><a href="/video">video</a></li></ul><ul class="nav navbar-nav navbar-right"><li><a id="settings-cog" href="/settings" role="button"><span class="glyphicon glyphicon-cog"></span><span class="sr-only">settings</span></a></li></ul></div></div></nav><main data-hook="page-container"></main></div><div data-hook="settings"></div></div></div></div></div></div><div class="col-xs-12 col-sm-6 col-md-4"><div class="jumbotron"><h1>FeedLine</h1><p>El Señor de los Cielos</p><button data-hook="rotate" class="btn btn-primary btn-lg">Rotate</button></div></div></div></div></body>';
    };

    // head.jade compiled template
    templatizer["head"] = function tmpl_head() {
        return '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"/><meta name="apple-mobile-web-app-capable" content="yes"/>';
    };

    // includes/formInput.jade compiled template
    templatizer["includes"]["formInput"] = function tmpl_includes_formInput() {
        return '<div class="form-group"><label data-hook="label"></label><div data-hook="message-container"><div data-hook="message-text" class="alert alert-danger"></div></div><input class="form-control"/></div>';
    };

    // includes/person.jade compiled template
    templatizer["includes"]["person"] = function tmpl_includes_person() {
        return '<li class="person list-group-item"><img data-hook="avatar" width="40" height="40"/><a data-hook="name"></a><span class="btn-group pull-right"> <a data-hook="action-edit" class="btn btn-default">edit </a><a href="#" data-hook="action-delete" class="btn btn-danger">delete</a></span></li>';
    };

    // includes/user.jade compiled template
    templatizer["includes"]["user"] = function tmpl_includes_user() {
        return '<li class="person list-group-item"><img data-hook="avatar" width="40" height="40"/><a data-hook="name"></a><span data-hook="points" class="badge pull-right"></span></li>';
    };

    // includes/videoEmbed.jade compiled template
    templatizer["includes"]["videoEmbed"] = function tmpl_includes_videoEmbed(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(model) {
            buf.push('<div><div class="embed-responsive embed-responsive-16by9"><video controls="controls" data-hook="video" preload="preload" class="embed-responsive-item"><source' + jade.attr("src", model.url, true, false) + ' type="video/mp4"/>Your browser does not support the <code>video</code> element.</video></div><div data-hook="feed" class="scroll-container"></div></div>');
        }).call(this, "model" in locals_for_with ? locals_for_with.model : typeof model !== "undefined" ? model : undefined);
        return buf.join("");
    };

    // includes/videoListItem.jade compiled template
    templatizer["includes"]["videoListItem"] = function tmpl_includes_videoListItem() {
        return '<div class="media"><a href="#" data-hook="media-link" class="media-left"><img src="..." data-hook="media-image" class="media-thumbnail"/></a><div class="media-body"><h4 data-hook="media-heading" class="media-heading"></h4><img data-hook="media-body-image" class="hidden"/><p data-hook="media-body"></p></div></div>';
    };

    // includes/videoPage.jade compiled template
    templatizer["includes"]["videoPage"] = function tmpl_includes_videoPage() {
        return '<div data-hook="video-page" class="video-page"></div>';
    };

    // pages/contentList.jade compiled template
    templatizer["pages"]["contentList"] = function tmpl_pages_contentList(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(title) {
            buf.push('<section class="page pageOne"><h4>' + jade.escape(null == (jade_interp = title) ? "" : jade_interp) + '</h4><div data-hook="content-list" class="media-list"></div></section>');
        }).call(this, "title" in locals_for_with ? locals_for_with.title : typeof title !== "undefined" ? title : undefined);
        return buf.join("");
    };

    // pages/episode.jade compiled template
    templatizer["pages"]["episode"] = function tmpl_pages_episode() {
        return '<section class="page pageOne"><ol class="breadcrumb"><li><a href="/series">Series</a></li><li><a data-hook="series"></a></li><li data-hook="episode" class="active"></li></ol><h3>Episode</h3><div class="media"><a href="#" data-hook="media-link" class="media-left"><img src="..." data-hook="media-image" class="media-thumbnail"/></a><div class="media-body"><h4 data-hook="media-heading" class="media-heading"></h4><p data-hook="media-body"></p></div></div></section>';
    };

    // pages/home.jade compiled template
    templatizer["pages"]["home"] = function tmpl_pages_home() {
        return '<div class="container"><section class="page home"><h2>Welcome to Feedline</h2><h3><a href="/series" role="button" class="btn btn-lg btn-primary">series</a></h3></section></div>';
    };

    // pages/series.jade compiled template
    templatizer["pages"]["series"] = function tmpl_pages_series() {
        return '<section class="page pageOne"><ol class="breadcrumb"><li><a href="/series">Series</a></li><li data-hook="series" class="active"></li></ol><div class="media"><a href="#" data-hook="media-link" class="media-left"><img src="..." data-hook="media-image" class="media-thumbnail"/></a><div class="media-body"><h4 data-hook="media-heading" class="media-heading"></h4><p data-hook="media-body"></p></div></div><h3>Episodes</h3><div data-hook="episode-list" class="media-list scroll-container"></div></section>';
    };

    // pages/settings.jade compiled template
    templatizer["pages"]["settings"] = function tmpl_pages_settings() {
        return '<div data-hook="settings" class="settings"><h2>Settings</h2><h3><a data-hook="done" role="button" class="btn btn-lg btn-primary">done</a></h3></div>';
    };

    // pages/videoCollection.jade compiled template
    templatizer["pages"]["videoCollection"] = function tmpl_pages_videoCollection() {
        return '<section class="page pageOne"><h4>available videos</h4><div data-hook="video-list"></div></section>';
    };

    return templatizer;
}));