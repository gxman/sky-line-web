"use strict";
$define([], function() {
    return {
        init: function() {
            var n = this._params
              , l = (n.id,
            n.propJson)
              , r = this.scope
              , i = !1;
            if (!l.scroll) {
                var t = r.find(".p_num")
                  , e = t.attr("data-num");
                return l.Thousandth && (e = d(e)),
                void t.text(e)
            }
            var o, s, a, u = (o = function(n, t) {
                n = n.find("[use-rollNum]");
                !function(e, n, t) {
                    {
                        var o, r, i, s;
                        !function(n) {
                            if (!l.scroll)
                                return !1;
                            var t = !0
                              , e = $(window)
                              , o = $($(n)[0]).offset().top
                              , r = $($(n)[0]).outerHeight()
                              , n = e.height()
                              , e = e.scrollTop();
                            t = !(o + r < e || e < o - n);
                            return t
                        }(t) ? (l.once || t.removeClass("js_roll"),
                        l.Thousandth && (e = d(e)),
                        t.text(e)) : (o = function n() {
                            var t;
                            e <= (i += r) ? (i = e,
                            t = Math.round(i),
                            l.Thousandth && (t = d(t)),
                            s.textContent = t) : (t = Math.round(i),
                            l.Thousandth && (t = d(t)),
                            s.textContent = t,
                            requestAnimationFrame(n))
                        }
                        ,
                        t.hasClass("js_roll") || (t.addClass("js_roll"),
                        r = e / (n / 16.67),
                        s = t[i = 0],
                        requestAnimationFrame(o)))
                    }
                }(Number(n.attr("data-num")), 1e3 * t.time, n)
            }
            ,
            a = new Date,
            s = s || 160,
            function() {
                var n = arguments
                  , t = +new Date;
                s <= t - a ? (o.apply(this, n),
                a = t) : o.apply(this, n)
            }
            ), n = 0 < $("[id^='c_flipPage']").length, t = !1, e = $("[id^='c_flipPageNew']");
            function d(n) {
                return Number(n).toLocaleString()
            }
            0 < e.length && ((e = e.children("input[name='propJson']").val()) && (e = JSON.parse(e),
            $(window).width() < e.settings.closed && (t = !0))),
            !n || t ? (u(r, l),
            $(window).scroll(function() {
                u(r, l)
            })) : ($(window).on("scrollEnd", function(n, t, e) {
                var o;
                0 != e || i || (i = !0,
                (o = r.closest(".swiper-slide")).index() == e && (u(r, l),
                l.once || o.find("[use-rollNum]").removeClass("js_roll")))
            }),
            $(window).on("scrollEndEnd", function(n, t, e) {
                var o = r.closest(".swiper-slide");
                o.index() == e && (u(r, l),
                l.once || o.find("[use-rollNum]").removeClass("js_roll"))
            }))
        }
    }
});
