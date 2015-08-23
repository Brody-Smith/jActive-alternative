/**
   _                      _
  (_)    /\          _   (_)
   _    /  \    ___ | |_  _ __   __ ___
  | |  / /\ \  / __|| __|| |\ \ / // _ \
  | | / ____ \| (__ | |_ | | \ V /|  __/
  | |/_/    \_\\___| \__||_|  \_/  \___|
 _/ |
|__/

 *
 * @author Brody Smith
 * @version 1.0
 * @license GNU General Public License v2.0
 * @description jActive is a simple, yet flexible jquery plugin for applying a class based on the specified criteria. This alternate version allows you to pass criteria using JSON.
 * @documentation http://brody-smith.github.io/jActive
 */
;(function($, window){
    $.jActive = function(el, options){

        // Avoid scope issues
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Reverse reference to the DOM object
        base.$el.data("jActive", base);

        // Override the default options, and start running the checks
        base.init = function(){
            base.options = $.extend({}, $.jActive.defaultOptions, options);
            base._runChecks();
        };

        // Apply the class specified via options
        base._applyClass = function() {
            base.$el.addClass(base.options.class);
        };

        // Test against the specified attribute
        base._testAttr = function(attr) {
            var t = attr[0],
                n = attr[1];

            if ($(t, base.el).attr(n) === base.options.match) {
                base._applyClass();
            }
        };

        // Test against the supplied regex
        base._testRegex = function(regex) {
            regex = new RegExp(regex);

            if (regex.test(base.options.match)) {
                base._applyClass();
            }
        };

        // Test against an array of strings
        base._testString = function(string) {
            $.each(string, function(i, v){
                if (v === base.options.match) {
                    base._applyClass();
                    return false;
                }
            });
        };

        base._runChecks = function() {
            var string = base.$el.data(base.options.name).string,
                regex = base.$el.data(base.options.name).regex,
                attr  = base.$el.data(base.options.name).attr;

            if (regex) {
                base._testRegex(regex);
            } else if (attr) {
                base._testAttr(attr);
            } else if (string) {
                base._testString(string);
            } else {
                throw new Error('Invalid property specified');
            }
        };

        base.init();
    };

    $.jActive.defaultOptions = {
        class : 'active',
        name  : 'jactive',
        match : window.location.pathname
    };

    $.fn.jActive = function(options){
        return this.each(function(){
            if (!$.data(this, "jActive")) {
                $.data(this, "jActive",
                    new $.jActive(this, options)
                );
            }
        });
    };

})(jQuery, window);