"use strict";
$define(["cmsAjax"], function(t) {
    return {
        init: function() {
            var n = this._params
              , i = this.scope;
            t.cmsAjax.get(location.origin + "/icp").then(function(t) {
                var a = $(i).attr("isShow");
                t.data ? "true" == a ? i.find("a").html(t.data.split("-")[0]) : i.find("a").html(t.data) : null != n.propJson.recordName && "" != n.propJson.recordName || i.find("a").html("京ICP备10002622号-38"),
                i.find("a").attr("rel", "nofollow")
            })
        }
    }
});
