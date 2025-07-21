"use strict";
$define(["pl_util"], function(t) {
    return {
        init: function() {
            var e = this._params
              , c = (e.id,
            this.scope)
              , o = e.propJson;
            function n() {
                var t = encodeURIComponent(c.find(".p_input").val())
                  , n = c.find(".p_c_span").attr("data-v")
                  , i = -1 < e.searchUrl.indexOf("?") ? "&" : "?"
                  , n = e.searchUrl + i + "keywords=" + t + "&appIds=" + n;
                "_blank" == o.href.target ? $.openNewWindow(n) : $.openHref(n)
            }
            c.on("click", ".p_current", function(t) {
                t.stopPropagation(),
                c.find(".p_selectList").toggle()
            }),
            c.on("click", ".p_selectItem", function() {
                var t = $(this).attr("data-v")
                  , n = $(this).text();
                c.find(".p_c_span").text(n).attr("data-v", t),
                c.find(".p_selectList").hide()
            }),
            $(document).click(function() {
                c.find(".p_selectList").hide()
            }),
            c.on("click", ".p_btn", function() {
                n()
            }),
            c.on("keydown", ".p_input", function(t) {
                13 == t.keyCode && n()
            })
        }
    }
});
