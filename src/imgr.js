/**
 * This plugin is used to load images as the scrolls or the dom element moves.
 * When the images are on screen then they will be triggered to load.
 * This also takes care of showing a loader till the images are not loaded.
 * Usage is pretty simple -
 * 1.Every image tag in html has to follow this syntax
 * <img src="" data-src="<imageurl>" class="imgr"/>
 * 2.At an appropriate place in yoiur code call Genwi.Plugins.imgr.run();
 * @namespace Genwi.Plugins
 * @class Imgr
 * @version 1.0
 * @author agaase
 */
(function($) {

    /**
     * The event to be handled which will trigger the check if the element is on screen.
     */
    var evToBind = "touchmove.imgr mousewheel.imgr";
    /**
     * The class to denote that an element has to be included in the imgr process.
     * @type {String}
     */
    var imgrClass = "imgr";
    /**
     * The class to denote that image is loaded for the element.
     * @type {String}
     */
    var imgrrdClass = "imgrrd";
    /**
     * The class which denotes that process of checking is currently running for that element.
     * @type {String}
     */
    var imgrrClass = "imgrr";

    var errorMessage = "imgr:error loading image";
    var elements = [];
    var margin = 250;
    var scrollEl, evBinded = false,
        checkingForLoad = false,
        atOnce = false;

    var context;


    /**
     * Binds a touch/scroll event and keeps checking for all the images whether they are loaded or not.
     * @method checkAndLoad
     */
    var checkAndLoad = function() {
        var checking = false,
            timer = 0;
        $(window).bind(evToBind, function(ev) {
            if (timer) {
                clearTimeout(timer);
            }
            if (elements.length) {
                timer = setTimeout(function() {

                    var cnt = 0;
                    var inId = setInterval(function() {
                        if (cnt < 3) {
                            checkIfElementLoaded();
                            cnt++;
                        } else {
                            clearInterval(inId);
                        }
                    }, 1000);

                }, 100);
            } else {
                if (!elements.length) {
                    setTimeout(function() {
                        if (!$("." + imgrClass + ",." + imgrrClass, context).length) {
                            $(window).unbind(evToBind);
                            evBinded = false;
                        }
                    }, 5000);
                }
            }
        });
    };

    var eventToBind = function() {
        try {
            document.createEvent("TouchEvent");
            return "touchmove";
        } catch (err) {
            return "mousewheel";
        }
    };

    /**
     * Checks for each element whether its loaded or not.
     * @method checkIfElementLoaded
     * @return {[type]}
     */
    var checkIfElementLoaded = function() {

        if (checkingForLoad) {
            return;
        }
        checkingForLoad = true;
        for (var i = 0; i < elements.length; i++) {
            var ele = $(elements[i]);
            if (atOnce || isOnScreen(ele)) {
                //ele=$("#"+ele.attr("id"));
                loadImg(ele);
                elements.splice(i, 1);
                i--;
            }
        }
        checkingForLoad = false;
    };

    /**
     * Checks whether the element is on screen or not.
     * @method isOnScreen
     * @param  {[type]}   elem [description]
     * @return {Boolean}
     */
    var isOnScreen = function(elem) {
        var viewport = {
            top: scrollEl.scrollTop(),
            left: scrollEl.scrollLeft()
        };
        viewport.right = viewport.left + scrollEl.width();
        viewport.bottom = viewport.top + scrollEl.height();
        var bounds = elem.offset();
        bounds.right = bounds.left + elem.outerWidth();
        bounds.bottom = bounds.top + elem.outerHeight();
        if (!(viewport.right < (bounds.left - margin) || viewport.left > (bounds.right + margin) || viewport.bottom < (bounds.top - margin) || viewport.top > (bounds.bottom + margin))) {
            return true;
        }
    };

    /**
     * When the image is loaded this sets the src attr and shows the image.
     * @method displayImg
     * @param  {[type]} type [description]
     * @param  {[type]} ele  [description]
     * @param  {[type]} src  [description]
     * @return {[type]}
     */
    var displayImg = function(type, ele, src) {

        if (ele.hasClass(imgrrdClass)) {
            return;
        }

        if (type === "div") {
            ele.css('background-image', 'url(' + src + ')');
        } else {
            ele.attr("src", src);
        }
        ele.removeClass(imgrrClass);
        ele.addClass(imgrrdClass);
        ele.animate({
            opacity: 1
        }, 2000);
        setTimeout(function() {
            ele.css("background-color", "inherit");
        }, 300);
    };

    /**
     * This triggers the image load when the image is on screen.
     * @method loadImg
     * @param  {[type]}    ele [description]
     * @return {[type]}
     */
    var loadImg = function(ele) {
        var src = "" + ele.attr("data-src");
        if (src && src.length > 0) {
            var type = ele.attr("tagName");
            if (type === undefined) {
                type = ele.prop("tagName");
            }
            type = type.toLowerCase();
            $("<img/>")
                .load(function() {
                    displayImg(type, ele, src);
                })
                .ready(function() {
                    displayImg(type, ele, src);
                })
                .error(function() {
                    console.log(errorMessage);
                })
                .attr("src", src);
        }
    };

    var setUpDom = function() {
        var newElements = $("." + imgrClass, context);
        var time = new Date().getTime();
        newElements.each(function(index) {
            var ele = $(this);
            ele.attr("id", "imgr_" + time);
            var loc = ele.offset();
            ele.removeClass(imgrClass);
            ele.addClass(imgrrClass);
            ele.css({
                "opacity": "0.05",
                "background-color": "grey"
            });
        });
        if (!elements.length) {
            elements = newElements;
        } else {
            elements = $.merge(elements, newElements);
        }
    };
    $.fn.imgr = function(options) {
        context = $(this).length ? $(this) : $("body");
        scrollEl = $(window);
        options = options || {};
        atOnce = options.atOnce || false;
        setUpDom();
        if (!evBinded && !atOnce) {
            checkAndLoad();
            evBinded = true;
        }
        checkIfElementLoaded();
    };
})($);