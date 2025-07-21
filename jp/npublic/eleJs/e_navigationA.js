"use strict";
$define([], function(i) {
    function t(n, e, i) {
        isFrontEnv() || n.on("click", ".js_editor_click", function(i) {
            var n = $(this).parent();
            $(this).next("ul").toggle(),
            n.siblings().find("ul").hide(),
            i.stopPropagation()
        }),
        i.propJson.useclick ? (n.find(".p_jtIcon").show(),
        n.find(e.item1).children().children(".p_jtIcon").on("click", function() {
            var i = $(this).parents(e.item1);
            $(this).hasClass("isSelected") ? ($(this).css({
                transform: "rotate(90deg)"
            }),
            $(this).removeClass("isSelected"),
            i.find(e.box2).hide().find(e.box3).hide()) : ($(this).css({
                transform: "rotate(270deg)"
            }),
            n.find(e.box2).hide(),
            n.find(".p_jtIcon").removeClass("isSelected"),
            $(this).addClass("isSelected"),
            i.find(e.box2).stop().slideDown(200))
        }),
        n.find(e.item2).on("click", ".p_jtIcon", function() {
            var i = $(this).parents(e.item2);
            $(this).hasClass("isSelected") ? ($(this).css({
                transform: "rotate(90deg)"
            }),
            $(this).removeClass("isSelected"),
            i.find(e.box3).hide().find(e.box3).hide()) : ($(this).css({
                transform: "rotate(270deg)"
            }),
            n.find(".p_jtIcon").removeClass("isSelected"),
            $(this).addClass("isSelected"),
            i.find(e.box3).stop().slideDown(200))
        }),
        $(document).on("click", function(i) {
            i = i.target;
            $(i).parent().hasClass("p_jtIcon") || $(i).hasClass("p_jtIcon") || ($(".p_jtIcon").css({
                transform: "rotate(90deg)"
            }).removeClass("isSelected"),
            $(e.box2).hide(),
            $(e.box3).hide())
        })) : (n.find(e.item1).mouseover(function() {
            $(this).find(e.box2).stop().slideDown(200)
        }),
        n.find(e.item1).mouseleave(function() {
            $(this).find(e.box2).hide().find(e.box3).hide()
        }),
        n.find(e.item2).mouseover(function() {
            $(this).find(e.box3).stop().slideDown(200)
        }),
        n.find(e.item2).mouseleave(function() {
            $(this).find(e.box3).hide()
        }))
    }
    function o(i, n) {
        0 < i.find(n.content).length ? (i.find(n.openBtn).click(function() {
            i.find(n.content).stop().slideDown(200)
        }),
        i.find(n.closeBtn).click(function() {
            i.find(n.content).hide().find(n.box2).hide().find(n.box3).hide(),
            i.find(n.jtIcon).removeClass("p_jtHover")
        }),
        i.find(n.jtIcon).click(function(i) {
            i.stopPropagation(),
            $(this).toggleClass("p_jtHover"),
            $(this).parent().next("ul").stop().slideToggle(200)
        })) : (i.find(n.openBtn).click(function() {
            i.find(n.box1).stop().slideDown(200),
            $(this).hide().siblings().show()
        }),
        i.find(n.closeBtn).click(function() {
            i.find(n.box1).hide().find(n.box2).hide().find(n.box3).hide(),
            i.find(n.jtIcon).removeClass("p_jtHover"),
            $(this).hide().siblings().show()
        }),
        i.find(n.item1).click(function() {
            $(this).find(n.jtIcon).hasClass("p_jtHover") ? $(this).find(n.jtIcon).removeClass("p_jtHover") : ($(this).find(n.jtIcon).eq(0).addClass("p_jtHover"),
            $(this).siblings().find(n.jtIcon).removeClass("p_jtHover")),
            $(this).find(n.box2).stop().slideToggle(200).find(n.box3).hide(),
            $(this).siblings().find(n.box2).hide().find(n.box3).hide()
        }),
        i.find(n.item2).click(function(i) {
            i.stopPropagation(),
            $(this).find(n.jtIcon).hasClass("p_jtHover") ? $(this).find(n.jtIcon).removeClass("p_jtHover") : ($(this).find(n.jtIcon).addClass("p_jtHover"),
            $(this).siblings().find(n.jtIcon).removeClass("p_jtHover")),
            $(this).find(n.box3).stop().slideToggle(200),
            $(this).siblings().find(n.box3).hide()
        }))
    }
    return {
        init: function() {
            var i = this._params
              , n = this.scope
              , e = {
                content: ".p_navContent",
                box1: ".p_level1Box",
                box2: ".p_level2Box",
                box3: ".p_level3Box",
                item1: ".p_level1Item",
                item2: ".p_level2Item",
                item3: ".p_level3Item",
                openBtn: ".p_openIcon",
                closeBtn: ".p_closeIcon",
                jtIcon: ".p_jtIcon"
            };
            i.propJson.mopx ? $(window).width() <= i.propJson.mopx ? o(n, e) : t(n, e, i) : isMo() ? o(n, e) : t(n, e, i)
        }
    }
});
