$define([],function () {
    $.extend({
        pl_toast: function(options) {
            var obj = $.extend({
                msg:'',
                time: 2,
                html:'',
                show:function(){},
                hide:function(){}
            }, options);
            if(!obj.msg){
                return
            }
            var id = 'toast' + +new Date()
            var html = '<div class="pl_toast" id="'+ id +'"><span class="pl_toast_con"><span>'+obj.msg+'</span></span></div>'
            if(obj.html){
                html = $(obj.html)
                html.attr("id",id)
            }
            $("body").append(html)
            obj.show()
            $('body').trigger('toastShow',id)
            if(obj.time!=0){
                setTimeout(function(){
                    $("#"+id).fadeOut(500);
                },obj.time*1000)
                setTimeout(function(){
                    $("#"+id).remove();
                    obj.hide()
                },(obj.time)*1000+500)
            }else{
                obj.hide()
            }
        },
    });
});