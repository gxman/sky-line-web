"use strict";
$define([], function() {
    return {
        init: function() {
            this._params;
            var i = this.scope;
            i.find(".p_o,.p_p").click(function() {
                i.find(".p_level2Box").animate({
                    height: "toggle"
                })
            })
        }
    }
});
