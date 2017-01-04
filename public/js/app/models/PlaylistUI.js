/*! videojs-playlist-ui - v3.0.0 - 2016-12-20
* Copyright (c) 2016 Brightcove; Licensed Apache-2.0 */
!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(){(function(a){"use strict";var b=function(a){return a&&a.__esModule?a["default"]:a},c=function(){function a(a,b){for(var c in b){var d=b[c];d.configurable=!0,d.value&&(d.writable=!0)}Object.defineProperties(a,b)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),d=function t(a,b,c){var d=Object.getOwnPropertyDescriptor(a,b);if(void 0===d){var e=Object.getPrototypeOf(a);return null===e?void 0:t(e,b,c)}if("value"in d&&d.writable)return d.value;var f=d.get;return void 0===f?void 0:f.call(c)},e=function(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(a.__proto__=b)},f=function(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")},g=b("undefined"!=typeof window?window.videojs:"undefined"!=typeof a?a.videojs:null),h=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},i=function(){var a=document.createElement("x");return a.style.cssText="pointer-events:auto","auto"===a.style.pointerEvents}(),j={className:"vjs-playlist",playOnSelect:!1,supportsCssPointerEvents:i},k=function(a){a.addClass("vjs-selected")},l=function(a){a.removeClass("vjs-selected"),a.thumbnail&&g.removeClass(a.thumbnail,"vjs-playlist-now-playing")},m=function(a){a.addClass("vjs-up-next")},n=function(a){a.removeClass("vjs-up-next")},o=function(a){if(!a){var b=document.createElement("div");return b.className="vjs-playlist-thumbnail vjs-playlist-thumbnail-placeholder",b}var c=document.createElement("picture");if(c.className="vjs-playlist-thumbnail","string"==typeof a){var d=document.createElement("img");d.src=a,c.appendChild(d)}else{for(var e=0;e<a.length-1;e++){var f=a[e],g=document.createElement("source");for(var h in f)g[h]=f[h];c.appendChild(g)}var i=a[a.length-1],d=document.createElement("img");for(var h in i)d[h]=i[h];c.appendChild(d)}return c},p=g.getComponent("Component"),q=function(a){function b(a,c,e){if(f(this,b),!c.item)throw new Error("Cannot construct a PlaylistMenuItem without an item option");d(Object.getPrototypeOf(b.prototype),"constructor",this).call(this,a,c),this.item=c.item,this.playOnSelect=e.playOnSelect,this.emitTapEvents(),this.on(["click","tap"],this.switchPlaylistItem_),this.on("keydown",this.handleKeyDown_)}return e(b,a),c(b,{handleKeyDown_:{value:function(a){(13===a.which||32===a.which)&&this.switchPlaylistItem_()}},switchPlaylistItem_:{value:function(){this.player_.playlist.currentItem(h(this.player_.playlist(),this.item)),this.playOnSelect&&this.player_.play()}},createEl:{value:function(){var a=document.createElement("li"),b=this.options_.item;if(a.className="vjs-playlist-item",a.setAttribute("tabIndex",0),this.thumbnail=o(b.thumbnail),a.appendChild(this.thumbnail),b.duration){var c=document.createElement("time"),d=g.formatTime(b.duration);c.className="vjs-playlist-duration",c.setAttribute("datetime","PT0H0M"+b.duration+"S"),c.appendChild(document.createTextNode(d)),a.appendChild(c)}var e=document.createElement("span"),f=this.localize("Now Playing");e.className="vjs-playlist-now-playing",e.appendChild(document.createTextNode(f)),e.setAttribute("title",f),this.thumbnail.appendChild(e);var h=document.createElement("div");h.className="vjs-playlist-title-container",this.thumbnail.appendChild(h);var i=document.createElement("span"),j=this.localize("Up Next");i.className="vjs-up-next-text",i.appendChild(document.createTextNode(j)),i.setAttribute("title",j),h.appendChild(i);var k=document.createElement("cite"),l=b.name||this.localize("Untitled Video");return k.className="vjs-playlist-name",k.appendChild(document.createTextNode(l)),k.setAttribute("title",l),h.appendChild(k),a}}}),b}(p),r=function(a){function b(a,c){var e=this;if(f(this,b),!a.playlist)throw new Error("videojs-playlist is required for the playlist component");d(Object.getPrototypeOf(b.prototype),"constructor",this).call(this,a,c),this.items=[],c.supportsCssPointerEvents&&this.addClass("vjs-csspointerevents"),this.createPlaylist_(),g.browser.TOUCH_ENABLED||this.addClass("vjs-mouse"),a.on(["loadstart","playlistchange"],function(){e.update()}),a.on("adstart",function(){e.addClass("vjs-ad-playing")}),a.on("adend",function(){a.ended()?a.one("ended",function(){e.removeClass("vjs-ad-playing")}):e.removeClass("vjs-ad-playing")})}return e(b,a),c(b,{createEl:{value:function(){var a=this.options_;if(a.el)return a.el;var b=document.createElement("ol");return b.className=a.className,a.el=b,b}},createPlaylist_:{value:function(){var a=this.player_.playlist()||[],b=document.querySelector(".vjs-playlist-item-list"),c=this.el_.querySelector(".vjs-playlist-ad-overlay");b||(b=document.createElement("ol"),b.className="vjs-playlist-item-list",this.el_.appendChild(b));for(var d=0;d<this.items.length;d++)b.removeChild(this.items[d].el_);this.items.length=0;for(var d=0;d<a.length;d++){var e=new q(this.player_,{item:a[d]},this.options_);this.items.push(e),b.appendChild(e.el_)}if(c)b.appendChild(c);else{var f=document.createElement("li");f.className="vjs-playlist-ad-overlay",b.appendChild(f)}var h=this.player_.playlist.currentItem();if(this.items.length&&h>=0){k(this.items[h]);var i=this.items[h].$(".vjs-playlist-thumbnail");i&&g.addClass(i,"vjs-playlist-now-playing")}}},update:{value:function(){var a=this.player_.playlist();if(this.items.length!==a.length)return void this.createPlaylist_();for(var b=0;b<this.items.length;b++)if(this.items[b].item!==a[b])return void this.createPlaylist_();for(var c=this.player_.playlist.currentItem(),b=0;b<this.items.length;b++){var d=this.items[b];b===c?(k(d),document.activeElement!==d.el()&&g.addClass(d.thumbnail,"vjs-playlist-now-playing"),n(d)):b===c+1?(l(d),m(d)):(l(d),n(d))}}}}),b}(p),s=function(a){var b=this,c=void 0,d=void 0;if(!b.playlist)throw new Error("videojs-playlist is required for the playlist component");"undefined"!=typeof HTMLElement&&a instanceof HTMLElement||a&&1===a.nodeType?(d=a,c=g.mergeOptions(j)):(c=g.mergeOptions(j,a),d=document.querySelector("."+c.className)),c.el=d,b.playlistMenu=new r(b,c)};g.registerComponent("PlaylistMenu",r),g.registerComponent("PlaylistMenuItem",q),g.plugin("playlistUi",s)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1]);