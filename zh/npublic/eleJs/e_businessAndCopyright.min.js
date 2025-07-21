"use strict";
$define(["cmsAjax"], function(n) {
    return {
        init: function() {
            var i, s = this._params, a = this.scope, t = s.propJson;
            s.id,
            s.cid;
            i = function(s) {
                var i, n;
                "business" == t.type ? s.businessImgUrl ? (i = __ce.imgStaticUrl[0] + "/" + s.businessImgUrl,
                n = a.find(".js-business").text(),
                n = '<img class="p_businessimg" src="'.concat(i, '" alt="').concat(n, '" la="la"/>'),
                a.find(".p_businesscontent").append(n),
                a.find(".js-business").on("click", function() {
                    !function(s) {
                        if (0 < a.find("canvas.p_businessimg").length)
                            return s();
                        var i = a.find("img.p_businessimg")[0];
                        a.find(".businessCanvas").remove(),
                        a.find(".p_businesscontent").append('<canvas class="businessCanvas p_businessimg"/>');
                        var n = a.find(".businessCanvas")[0]
                          , t = i.width
                          , e = i.height;
                        n.width = t,
                        n.height = e;
                        t = n.getContext("2d");
                        t.drawImage(i, 0, 0);
                        e = document.createElement("canvas");
                        e.width = 350,
                        e.height = 120;
                        i = e.getContext("2d");
                        i.textAlign = "left",
                        i.textBaseline = "top",
                        i.font = "14px Microsoft Yahei",
                        i.fillStyle = "rgba(0,0,0,.5)",
                        i.rotate(-20 * Math.PI / 180),
                        i.fillText("此证件仅限在官网亮证使用，复印或下载无效", 0, 110),
                        t.fillStyle = t.createPattern(e, "repeat"),
                        t.fillRect(0, 0, n.width, n.height),
                        a.find("img.p_businessimg").remove(),
                        s && s()
                    }(function() {
                        a.find(".p_businesspopup").show()
                    })
                }),
                a.find(".p_businessclose,.p_businessbg").on("click", function() {
                    a.find(".p_businesspopup").hide()
                })) : isFrontEnv() && a.hide() : (isFrontEnv() || a.text("请进入后台编辑版权信息"),
                s.copyrightInfo_symbol && a.text(s.copyrightInfo_symbol))
            }
            ,
            n.cmsAjax.get(location.origin + "/fwebapi/cms/baseConfig/get").then(function(s) {
                200 == s.status && 200 == s.data.status && i(s.data.data)
            })
        }
    }
});
