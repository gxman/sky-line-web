"use strict";
$define(["cmsAjax"], function(t) {
    return {
        init: function() {
            var n = this.scope;
            this._params.propJson;
            isFrontEnv() || n.text("请进入后台编辑版权信息"),
            t.cmsAjax.get(location.origin + "/fwebapi/cms/baseConfig/get").then(function(t) {
                200 == t.status && 200 == t.data.status && (null == (t = t.data.data).copyrightInfo_symbol || "" == t.copyrightInfo_symbol ? n.text("请进入后台编辑版权信息") : n.text(t.copyrightInfo_symbol))
            })
        }
    }
});
