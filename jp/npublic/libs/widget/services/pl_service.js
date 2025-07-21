"use strict";
$define(["pl_util"], function() {
    $.extend({
        pl_service: function(c) {
            var e = $.extend({
                data: {}
            }, c)
              , c = "service" + +new Date;
            function _(c, n, a) {
                n = n || "";
                var e = {};
                switch (c) {
                case 1:
                    e = {
                        key: "qq",
                        name: "QQ",
                        url: "tencent://message/?uin=".concat(n),
                        id: 6
                    };
                    break;
                case 2:
                case 3:
                    e = {
                        key: "alww",
                        name: i18n.service_alww,
                        url: "http://amos.alicdn.com/getcid.aw?v=2&uid=".concat(n, "&site=cntaobao&s=2&groupid=0&charset=utf-8"),
                        id: 2 == c ? 7 : 8
                    };
                    break;
                case 4:
                    e = {
                        key: "skype",
                        name: "Skype",
                        url: "skype:".concat(n, "?chat"),
                        id: 9
                    };
                    break;
                case 5:
                    e = {
                        key: "whatsapp",
                        name: "WhatsApp",
                        url: "https://api.whatsapp.com/send?phone=".concat(n, "&text=Hello"),
                        id: 4
                    };
                    break;
                case 6:
                    e = {
                        key: "wx",
                        name: i18n.service_wx,
                        url: "",
                        id: 17
                    };
                    break;
                case 7:
                    e = {
                        key: "qyszmp",
                        name: i18n.service_szmp,
                        url: "",
                        id: 16
                    };
                    break;
                case 8:
                    e = {
                        key: "yj",
                        name: i18n.service_yx,
                        url: "mailto:".concat(n),
                        id: 11
                    };
                    break;
                case 9:
                    e = {
                        key: "tel",
                        name: "电话",
                        url: "tel:".concat(n),
                        id: 12
                    };
                    break;
                case 10:
                    e = {
                        key: "link",
                        name: "链接",
                        url: "".concat(a),
                        id: 18
                    };
                    break;
                case 11:
                    e = {
                        key: "custom",
                        name: "自定义",
                        url: "".concat(a),
                        id: ""
                    };
                    break;
                case 12:
                    e = {
                        key: "smService",
                        name: "智慧客服",
                        url: "".concat(a),
                        id: 1
                    }
                }
                return e
            }
            function h(c) {
                var n = 1 == e.data.tplId ? "solid" : "hollow";
                return isMo() || "number" != typeof c ? serviceIcon.hollow[c] || "" : serviceIcon[n][_(c).key] || ""
            }
            function t(c, u) {
                var a = [];
                return c && 0 < c.length && c.forEach(function(c, n) {
                    var c = c.staffVOs
                      , m = [];
                    c && 0 < c.length && c.forEach(function(c, n) {
                        var a, e, t, s, i, o, r, p, l, d, v;
                        c.status && (a = "",
                        e = 11 == c.type && c.iconUrl ? c.iconUrl : h(c.type),
                        t = 12 == c.type ? "smartService" : "",
                        s = 6 == c.type || 7 == c.type || 11 == c.type && c.imageUrl ? "doThirdFunc" : "",
                        v = r = o = "",
                        (d = (i = _(c.type, c.account, c.link)).url) && "null" != d && ((8 == c.type || 9 == c.type || 11 == c.type && (-1 < d.indexOf("tel:") || -1 < d.indexOf("mailto:"))) && (v = 'rel="nofollow"'),
                        5 == c.type && (c.linkTarget = "_blank"),
                        o = '<a class="p_doThirdFunc" href="'.concat(d, '" target="').concat(c.linkTarget, '" ').concat(v, ' id="').concat(i.id, '">'),
                        r = "</a>"),
                        p = "".concat(o).concat(c.name).concat(r),
                        l = '<div class="service_value dh" '.concat(t, ">").concat(o, "<span>").concat(c.account || c.name, "</span>").concat(r, "</div>"),
                        d = "showLang",
                        (6 == c.type || 7 == c.type || 11 == c.type && c.imageUrl) && (a = '<div class="service_img"><img src="'.concat($.handleDataImg(c.imageUrl), '" alt="').concat(c.name, '"></div>'),
                        p = '<p class="doThirdFunc" type="'.concat(c.type, '" account="').concat(c.account, '" img="').concat(c.imageUrl, '"><span>').concat(c.name, "</span></p>"),
                        l = '<div class="service_value tp"><img src="'.concat($.handleDataImg(c.imageUrl), '" alt="').concat(c.name, '"></div>'),
                        d = "showImg"),
                        v = "",
                        1 == u ? v = '<p class="service_item '.concat(s, '" ').concat(t, ' type="').concat(c.type, '" account="').concat(c.account, '" img="').concat(c.imageUrl, '">\n                                            ').concat(o, '<span class="iconSpan">').concat(e, "</span><span>").concat(c.account || c.name, "</span>").concat(r, "\n                                        </p>") : 2 == u ? v = '<div class="service_item">\n                                            <p class="service_icon">'.concat(e, '</p>\n                                            <div class="service_value_con">\n                                                <div class="service_value dh">\n                                                    <p class="p_doThirdFunc" type="').concat(c.type, '" account="').concat(c.account, '" img="').concat(c.imageUrl, '">\n                                                        ').concat(o, '<span class="iconSpan">').concat(e, "</span><span ").concat(t, ">").concat(c.account || c.name, "</span>").concat(r, "\n                                                    </p>\n                                                </div>\n                                            </div>\n                                            ").concat(a, "\n                                        </div>") : 3 == u ? v = '<div class="item_con">\n                                            <div class="service_item '.concat(i.key, '">\n                                                <p class="service_icon">').concat(e, '</p>\n                                                <div class="service_value dh" ').concat(t, ">").concat(p, "</div>\n                                            </div>\n                                        </div>") : 4 == u ? v = '<div class="item_con clearfix">\n                                            <div class="service_item '.concat(d, '">\n                                                <p class="service_icon">\n                                                    ').concat(e, "\n                                                </p>\n                                                ").concat(l, "\n                                            </div>\n                                        </div>") : "mo" == u && (p = " ".concat(o).concat(8 === c.type ? c.account : c.name, " ").concat(r),
                        (6 == c.type || 7 == c.type || 11 == c.type && c.imageUrl) && (p = '<p class="doThirdFunc" type="'.concat(c.type, '" account="').concat(c.account, '" img="').concat(c.imageUrl, '">').concat(8 === c.type ? c.account : c.name, "</p>")),
                        e = 11 == c.type && c.iconUrl ? c.iconUrl : h(i.key),
                        v = '<div class="service_item">\n                                            <div class="service_icon"> '.concat(e, ' </div>\n                                            <div class="service_value" ').concat(t, ">").concat(p, "</div>\n                                        </div>")),
                        m.push(v))
                    }),
                    0 < m.length && a.push('<div class="service_group">'.concat(m.join(""), "</div>"))
                }),
                a
            }
            -1 < [1, 2, 3, 4].indexOf(Number(e.data.tplId)) && function(c) {
                isMo() ? ($("body").append(function(c) {
                    var n = t(e.data.staffGroupVOs, "mo");
                    return '<div class="pl_service" id='.concat(c, '>\n                    <div class="p_defaultIocn"> ').concat(h("ccontact"), '</div>\n                    <div class="pl_content_box">\n                        <div class="body_service">\n                        <div class="footer_service">\n                            <p>\n                                <span class="p_kefuicon">').concat(h("kf"), '</span>\n                                <span class="bottom_type">').concat(i18n.service_rx, ' <span> <a style="color:#333" href="tel:').concat(e.data.telephone, '" rel="nofollow">').concat(e.data.telephone, '</a> </span>|<span class="bottom_type">').concat(i18n.service_sj, '<span style="color:#333">').concat(e.data.serviceTimeStart, " - ").concat(e.data.serviceTimeEnd, "</span> </span> </span>\n                            </p>\n                        </div>\n                        ").concat(n.join(""), ' \n                        </div>\n                    </div>\n                </div> \n                <div class="custom-service-background"></div>')
                }(c)),
                $(".p_defaultIocn").on("click", function(c) {
                    $(".custom-service-background").toggle(),
                    $(".pl_content_box").toggleClass("show")
                }),
                $(".custom-service-background").on("click", function(c) {
                    $(".custom-service-background").hide(),
                    $(".pl_content_box").removeClass("show")
                })) : $("body").append(function(c, n) {
                    var a = t(e.data.staffGroupVOs, c);
                    return 1 == c ? '<div class="pl_service1 clearfix" id='.concat(n, '>\n                        <div class="service_btn">\n                            <div class="sevice_flex_con">\n                            <div class="btn_con">\n                                <p>').concat(h("kf"), '</p>\n                            </div>\n                            </div>\n                        </div>\n                        <div class="service_con">\n                            <div class="service_group">\n                                <p class="service_item">\n                                    <span class="iconSpan">').concat(h("kf"), "</span>\n                                    <span>").concat(i18n.service_zxkf, ':</span>\n                                    <span><a href="tel:').concat(e.data.telephone, '" rel="nofollow">').concat(e.data.telephone, '</a></span>\n                                </p>\n                                <p class="service_item">\n                                    <span class="iconSpan">').concat(h("kf"), "</span>\n                                    <span>").concat(i18n.service_fwsj, ":</span>\n                                    <span>").concat(e.data.serviceTimeStart, " - ").concat(e.data.serviceTimeEnd, "</span>\n                                </p>\n                            </div>\n                            ").concat(a.join(""), "\n                        </div>\n                    </div>") : 2 == c ? '<div class="pl_service2" id='.concat(n, '>\n                        <div class="service_item">\n                            <p class="service_icon">').concat(h("kf"), '</p>\n                            <div class="service_value_con">\n                            <div class="service_value">\n                                <p><span>').concat(i18n.service_kfrx, ':</span><span><a href="tel:').concat(e.data.telephone, '" rel="nofollow">').concat(e.data.telephone, "</a></span></p>\n                                <p><span>").concat(i18n.service_fwsj, ":</span><span>").concat(e.data.serviceTimeStart, " - ").concat(e.data.serviceTimeEnd, "</span></p>\n                            </div>\n                            </div>\n                        </div>\n                        ").concat(a.join(""), "\n                    </div>") : 3 == c ? '<div class="pl_service3" id='.concat(n, '>\n                        <div class="item_con">\n                            <div class="service_item kf">\n                                <p class="service_icon">').concat(h("kf"), '</p>\n                                <div class="service_value">\n                                    <p><span>').concat(i18n.service_rx, ':</span><span><a href="tel:').concat(e.data.telephone, '" rel="nofollow">').concat(e.data.telephone, "</a></span></p>\n                                    <p><span>").concat(i18n.service_sj, ":</span><span>").concat(e.data.serviceTimeStart, " - ").concat(e.data.serviceTimeEnd, "</span></p>\n                                </div>\n                            </div>\n                        </div>\n                        ").concat(a.join(""), "\n                    </div>") : 4 == c ? '<div class="pl_service4" id='.concat(n, '>\n                        <div class="item_con clearfix">\n                            <div class="service_item showLang">\n                                <p class="service_icon">\n                                    ').concat(h("kf"), '\n                                </p>\n                                <div class="service_value">\n                                    <p><span>').concat(i18n.service_rx, ':</span><span><a href="tel:').concat(e.data.telephone, '" rel="nofollow">').concat(e.data.telephone, "</a></span></p>\n                                    <p><span>").concat(i18n.service_sj, ":</span><span>").concat(e.data.serviceTimeStart, " - ").concat(e.data.serviceTimeEnd, "</span></p>\n                                </div>\n                            </div>\n                        </div>\n                        ").concat(a.join(""), "\n                    </div>") : void 0
                }(e.data.tplId, c));
                $(".doThirdFunc").click(function() {
                    var c = this
                      , n = Number($(this).attr("type"))
                      , a = $(this).attr("img")
                      , e = $(this).attr("account");
                    !isMo() || 6 != n && 7 != n && 11 != n ? function(c, n) {
                        0 < $(".service_pop").length ? $(".service_pop img").attr("src", $.handleDataImg(c)) : $("body").append('<div class="service_pop">\n                        <p>'.concat(i18n.service_sys, '</p>\n                        <img src="').concat($.handleDataImg(c), '" alt="').concat(n, '">\n                    </div>'));
                        $(document).on("click", function(c) {
                            $(".service_pop").is(c.target) || 0 !== $(".service_pop").has(c.target).length || $(".doThirdFunc").is(c.target) || 0 !== $(".doThirdFunc").has(c.target).length || $(".service_pop").remove()
                        })
                    }(a, e) : $(this).find(".chat-wraper").hasClass("show") ? ($(this).find(".chat-wraper").slideUp(500),
                    $(this).find(".chat-wraper").removeClass("show")) : (0 == $(this).find(".chat-wraper").length && (a = $.handleDataImg(a),
                    $(this).append('<div class="chat-wraper" style="display:none"><div >'.concat(i18n.service_sys, '</div><p><img style="width:100px" src="').concat(a, '" alt="').concat(i18n.service_sys, '" /></p></div>'))),
                    setTimeout(function() {
                        $(c).find(".chat-wraper").slideDown()
                    }, 100),
                    $(this).find(".chat-wraper").addClass("show"))
                })
            }(c)
        }
    })
});
