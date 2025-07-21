"use strict";
function ownKeys(t, e) {
    var n, a = Object.keys(t);
    return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t),
    e && (n = n.filter(function(e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable
    })),
    a.push.apply(a, n)),
    a
}
function _objectSpread(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2 ? ownKeys(Object(n), !0).forEach(function(e) {
            _defineProperty(t, e, n[e])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : ownKeys(Object(n)).forEach(function(e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
        })
    }
    return t
}
function _defineProperty(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n,
    e
}
var smsFlag = !1
  , smsShowFun = null
  , hasScroll = !1
  , isWeixin = function() {
    return "micromessenger" == navigator.userAgent.toLowerCase().match(/MicroMessenger/i)
}
  , $t = function(e) {
    return e
}
  , interwords = ("local" == __ce.env ? "http://" + tenant.makeDomain : "") + "/jp/npublic/commonjs/language/" + ("hn" == tenant.language ? "es" : tenant.language) + ".js";
function ttsPlay() {
    var e = $("[ttsPlay]");
    0 < e.length && e.each(function(e, t) {
        var n, a, o, i, r, s = $(t);
        0 == s.parents("[ttsPlay]").length && (0 < (t = s.closest("[class^='e_richText']")).length && (n = t.attr("aid") || "",
        a = t.attr("tid") || "",
        o = t.attr("cid") || "",
        i = (i = t.attr("code") || "") && i.substr(i.lastIndexOf(".") + 1)),
        t = "/jp/npublic/commonjs/nouglify/audioPlay/ttsPlay.js",
        r = {
            element: s
        },
        n && a && o && i ? (t = "/jp/npublic/commonjs/nouglify/audioPlay/audioPlay.js",
        r = _objectSpread(_objectSpread({}, r), {}, {
            aid: n,
            tid: a,
            cid: o,
            code: i
        }),
        $require([t], function() {
            new ttsPlay2(r)
        })) : $require([t], function() {
            new ttsPlay(r)
        }))
    })
}
function wxPoint() {
    var e;
    0 < $(".wx_poi_link").length && ((e = document.createElement("style")).innerHTML = '.wx_poi_popover{display:none;position:fixed;width:100%;height:100%;z-index:999999999;left:0;top:0;background-color:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;}.wx_poi_con{background-color:#fff;border:1px solid #eee;padding:10px;border-radius:5px;box-shadow:0 2px 10px rgba(0,0,0,0.1);z-index:1000;width:800px;height:500px;max-width:96%;max-height:80%;}.wx_poi_popover p{height:26px;line-height:26px;}.wx_poi_popover p.name{display:flex;justify-content:space-between;}.wx_poi_popover p.name span{font-weight:bold;}.wx_poi_popover p.name svg{margin:0;}.wx_poi_popover::after{content:"";position:absolute;bottom:-10px;left:20px;margin-left:-5px;border-width:5px;border-style:solid;border-color:#ccc transparent transparent transparent;}.wx_poi_popover #wxMapCotainer{height:calc(100% - 52px);padding-top:5px;}',
    document.head.appendChild(e),
    $(".wx_poi_link").attr("href", "javascript:;").css({
        color: "rgb(42 115 178)"
    }).prepend('<span class="wx_poi_icon"><svg t="1733280754431" class="icon" style="width:16px;height:16px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5843" width="32" height="32"><path d="M511.981438 0A398.232179 398.232179 0 0 0 114.006018 397.97542c0 156.622585 191.541718 456.516321 289.366644 574.625156a140.44681 140.44681 0 0 0 217.217552 0C718.41514 854.491741 909.956859 554.598005 909.956859 397.97542A398.232179 398.232179 0 0 0 511.981438 0z m49.297601 924.330009a65.986892 65.986892 0 0 1-98.595201 0C352.020995 789.531882 191.033519 518.138322 191.033519 397.97542a320.94792 320.94792 0 0 1 641.895839 0c0 120.162901-160.987477 391.556462-271.650319 526.354589z" p-id="5844"></path><path d="M511.981438 205.406669a192.568752 192.568752 0 1 0 192.568752 192.568751A192.568752 192.568752 0 0 0 511.981438 205.406669z m0 308.110002a115.541251 115.541251 0 1 1 115.541252-115.541251 115.798009 115.798009 0 0 1-115.541252 115.541251z" p-id="5845"></path></svg></span>'),
    renderWxMap(),
    $("body").on("click", ".wx_poi_link", function() {
        showPop({
            name: decodeURIComponent($(this).data("name")),
            address: decodeURIComponent($(this).data("address")),
            lng: decodeURIComponent($(this).data("longitude")),
            lat: decodeURIComponent($(this).data("latitude"))
        }, $(this), !0)
    }))
}
$require([interwords], function() {
    $t = function(e, t) {
        var n = window.i18n[e] || "";
        return t && 0 < t.length && t.forEach(function(e, t) {
            n = n.replace("{" + t + "}", e)
        }),
        n || e
    }
}),
$(function() {
    window.pageObj && 1 == window.pageObj.isHomePage && gray(),
    "portal-saas-mall" != tenant.unittype && (festival(),
    smartServiceInit()),
    268516 != tenant.tenantId && "portal-saas-mall" != tenant.unittype && preventFish(),
    isWeixin() && "portal-saas-mall" != tenant.unittype && wxShare(),
    "miniprogram" === window.__wxjs_environment && $require(["/jp/npublic/commonjs/jweixin/jweixin.js", "pl_util"], function() {
        wx.miniProgram.postMessage({
            data: {
                shareTitle: encodeURIComponent(document.title),
                shareDesc: getmeta("description"),
                shareUrl: encodeURIComponent(location.href)
            }
        })
    }),
    accessLimit(),
    wxPoint(),
    ttsPlay()
});
var wxMap = null
  , wxMarkerLayer = null
  , wxInfoWindowLocation = null;
function renderWxMap() {
    $require(["async!tMap"], function() {
        var e = $(".wx_poi_popover");
        0 == e.length && ($("body").append('<div class="wx_poi_popover">\n                <div class="wx_poi_con">\n                    <p class="name"><span></span><a href="javascript:;" class="wx_poi_close"><svg t="1732698820322" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4415" width="32" height="32"><path d="M807.538939 256.459755a20.897959 20.897959 0 0 1 0 29.549714L571.099429 522.44898l236.43951 236.43951a20.897959 20.897959 0 0 1 0 29.549714l-29.549715 29.549714a20.897959 20.897959 0 0 1-29.549714 0L512 581.548408 275.56049 817.987918a20.897959 20.897959 0 0 1-29.549714 0l-29.549715-29.549714a20.897959 20.897959 0 0 1 0-29.549714L452.900571 522.44898 216.461061 286.009469a20.897959 20.897959 0 0 1 0-29.549714l29.549715-29.549714a20.897959 20.897959 0 0 1 29.549714 0L512 463.349551l236.43951-236.43951a20.897959 20.897959 0 0 1 29.549714 0l29.549715 29.549714z" p-id="4416"></path></svg></a></p>\n                    <p class="address"><span></span></p>\n                    <div id="wxMapCotainer"></div>\n                </div>\n            </div>'),
        e = $(".wx_poi_popover")),
        e.show(),
        wxMap = new TMap.Map(e.find("#wxMapCotainer")[0],{
            center: new TMap.LatLng(39.908823,116.39747),
            zoom: 17
        }),
        e.hide(),
        e.on("click", ".wx_poi_close", function() {
            e.hide()
        })
    })
}
function showPop(a, e, o) {
    $require(["async!tMap"], function() {
        var e, t, n = $(".wx_poi_popover");
        o ? (n.show(),
        n.find(".name span").text(a.name),
        n.find(".address span").text(a.address),
        wxMap.setCenter(new TMap.LatLng(a.lat,a.lng)),
        wxMap.setZoom(17),
        e = wxMap,
        t = a,
        wxMarkerLayer ? wxMarkerLayer.updateGeometries([{
            id: "1",
            styleId: "myStyle",
            position: new TMap.LatLng(t.lat,t.lng)
        }]) : wxMarkerLayer = new TMap.MultiMarker({
            map: e,
            styles: {
                myStyle: new TMap.MarkerStyle({
                    width: 20,
                    height: 30
                })
            },
            geometries: [{
                id: "1",
                styleId: "myStyle",
                position: new TMap.LatLng(t.lat,t.lng)
            }]
        })) : n.hide()
    })
}
function accessLimit() {
    var e, t, n, a, o;
    isFrontEnv() && location.hostname == tenant.domain && (e = tenant.XSKey,
    t = localStorage.getItem("kt" + tenant.tenantId),
    n = +new Date,
    !isNaN(Number(t)) && 36e5 < n - Number(t) && localStorage.removeItem("kt" + tenant.tenantId),
    e && !t && (a = e[9],
    o = e[10],
    "1" != a && "1" != o || $require(["cmsAjax", "/jp/npublic/commonjs/jsencrypt.js"], function(t, e) {
        var n = $.nrsa("designVue&".concat(+new Date), "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCdBbSMUKBY3wW8C/RFFwFoTHyO8xM67xBtgERb/4z6dqUq2ZeTagHUT6tbnuvhug0FNU9t/bzBc6KOivkzPToYYJG/RDzvdAJTjdvvvu3WQUpKOa0s0V3ehkKRoZPIFw3YnahtUrIe9es0V0LlTkOyFlH2M6rpceC7K0XgEs7lZwIDAQAB");
        t.cmsAjax.get("/fwebapi/visitor/lowcode/designToken/getToken", {}, {
            headers: {
                authCode: n
            }
        }).then(function(e) {
            try {
                t.cmsAjax.get("/fwebapi/visitor/lowcode/designToken/getI", {}, {
                    headers: {
                        token: e.data.token
                    }
                }).then(function(e) {
                    ("1" == e.data.status && "1" == a || "2" == e.data.status && "1" == o) && (location.href = "/jp/npublic/plugins/accessLimit/index.html")
                })
            } catch (e) {}
        })
    })))
}
function getmeta(e) {
    for (var t, n = document.getElementsByTagName("meta"), a = 0; t = n[a++]; )
        if (t.getAttribute("name") && t.getAttribute("name").toLowerCase() === e)
            return encodeURIComponent(t.content)
}
function gray() {
    $require(["cmsAjax"], function(e) {
        var t = window.location.origin + "/ndesigner/api/gray";
        e.cmsAjax.postJson(t).then(function(e) {
            200 == e.code && ($("html")[0].style = "filter:progid:DXImageTransform.Microsoft.Basiclmage(grayscale=1);-webkit-filter:grayscale(100%);")
        })
    })
}
function festival() {
    isFrontEnv() && $require(["cmsAjax"], function(e) {
        e.cmsAjax.get("/fwebapi/cms/lowcode/festivalPendant/getSettings").then(function(e) {
            var t;
            e.data && 200 == e.data.code && e.data.settings && (1 == (t = e.data.settings).location && window.pageObj && 1 != window.pageObj.isHomePage || (e = t.showTime && 2 == t.showTime.length && t.nowTime >= t.showTime[0] && t.nowTime <= t.showTime[1] || !t.showTime || 0 == t.showTime.length,
            t.isOpen && e && $require(["/jp/npublic/commonjs/restival.js"], function(e) {
                e.init(t)
            })))
        })
    })
}
function smartServiceInit() {
    isFrontEnv() && !window.noSms && $(window).on("mousemove scroll touchmove tap click keydown", function() {
        hasScroll || (hasScroll = !0,
        $require(["cmsAjax", "pl_util"], function(e) {
            var t = $.getSearch()
              , a = __ce.smartServiceUrl || "https://web-visitor.yun300.cn"
              , n = "".concat(a, "/visitormanager/intelligent/front/checkAndRegister?tenantId=").concat(tenant.tenantId, "&instance=").concat(tenant.bossProductInstance)
              , o = {
                account: localStorage.getItem("account_".concat(tenant.tenantId))
            };
            t.previewFlow && (o.account = t.previewFlow),
            e.cmsAjax.postJson(n, o).then(function(n) {
                var e;
                200 == n.status && n.data && !function(e) {
                    var t = !1
                      , n = JSON.parse(e.colorLayout).linkObj
                      , a = window.pageObj ? pageObj.pageId : "";
                    a && n && (e = n.P,
                    !isMo() || 1 != tenant.mobileStatus && 6 != tenant.mobileStatus && 11 != tenant.mobileStatus || (e = n.M),
                    -1 < e.findIndex(function(e) {
                        return e.pageId == a
                    }) && (t = !0));
                    return t
                }(n.data.setting) && (t.previewFlow || localStorage.setItem("account_".concat(tenant.tenantId), n.data.account),
                e = "default",
                2 == JSON.parse(n.data.setting.colorLayout).modelType && (e = "business"),
                $require(["css!/npublic/commonjs/smartService/them/".concat(e, ".css"), "/jp/npublic/commonjs/smartService/smartService.js"], function(e, t) {
                    n.data.domain = a;
                    new t(n.data)
                }))
            })
        }))
    })
}
function preventFish() {
    var e = location.hostname
      , t = getCookie("realhost") || "";
    t && t != e && (t = "/repository/cheat?req=" + e + "&rel=" + t,
    $.ajax({
        url: t
    }))
}
function wxShare() {
    $require(["cmsAjax", "/jp/npublic/commonjs/jweixin/jweixin.js", "pl_util"], function(e) {
        var t = {
            pageUrl: location.href,
            appCode: pageObj.appId,
            tid: pageObj.contentType,
            pageType: pageObj.pageType,
            isHomePage: pageObj.isHomePage,
            pageId: pageObj.pageId,
            contentId: pageObj._detailId,
            pageName: pageObj.name
        };
        e.cmsAjax.postJson("/fwebapi/cms/api/tdk/getWxShareInfo", t).then(function(e) {
            var t, n, a, o = e.data;
            o.data && (o = o.data),
            o.wxJsConfig && (t = o.wxJsConfig,
            a = o.wxShareContent,
            n = {
                title: a.title,
                desc: a.desc,
                link: location.href,
                imgUrl: (e = $.handleDataImg(a.imgUrl),
                o = 104,
                a = -1 < e.indexOf("?") ? e.split("?")[1] : "",
                e = e.split("?")[0],
                a = a ? "?" + a : "",
                e + "_" + o + "xaf" + e.substr(e.lastIndexOf(".")) + a)
            },
            wx.config({
                debug: !1,
                appId: t.appId,
                timestamp: t.timestamp,
                nonceStr: t.nonceStr,
                signature: t.signature,
                jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"]
            }),
            wx.ready(function() {
                wx.updateAppMessageShareData(n),
                wx.updateTimelineShareData(n)
            }))
        })
    })
}
