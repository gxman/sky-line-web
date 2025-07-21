$define(['pl_util', 'pl_readyload','cmsAjax'], function (u, r,c) {
    var init = function(_$the, scop, params, turnCallBack){
        var page = params.page
        var currentPage = Number(page.from)
        var totalPage = Math.ceil(Number(page.totalCount) / Number(page.size));
        var compId = params.cid;
        var eleId = params.id;

        var sParams = params.sParams;
        //如果有筛选条件
        if (scop.find('.js_filter_pagination').length > 0) {
            $require(['cmsAjax'], function (c) {
                let itemList = scop.find('.js_filter_pagination a');
                var size = sParams.size;
                itemList.removeClass('current');
                itemList.eq(1).addClass('current')
                scop.find('.page_prev').addClass('disabled')
                console.log('方法执行')
                //页码绑定点击事件
                bindevent();
                function bindevent(status = "not") {
                    $('#' + compId).off("click").on('click', ".page_a", function () {

                        if ($(this).hasClass('disabled')) return;
                        if ($(this).hasClass('current')) return;
                        if($(this).hasClass('page_ellipsis')) return;
                        let oldcurrentIndex = parseInt(scop.find('.js_filter_pagination .page_num.current').text()) - 1
                        if (parseInt($(this).text()) - 1 == oldcurrentIndex) return;

                        let pageNumDom = scop.find('.js_filter_pagination .page_num');
                        pageNumDom.removeClass('current');
                        //点击上一页
                        // let currentIndex = scop.find('.js_filter_pagination .page_num.current').attr('index');
                        if ($(this).hasClass('page_prev')) {
                            // pageNumDom.eq(oldcurrentIndex - 1).addClass('current')
                            $(pageNumDom).each((i, item) => {
                                if (parseInt($(item).text()) - 1 == (oldcurrentIndex - 1)) {
                                    $(item).addClass("current");
                                }
                            })
                            // aList.eq.addClass('current');
                        } else if ($(this).hasClass('page_next')) {
                            // pageNumDom.eq(oldcurrentIndex + 1).addClass('current')
                            $(pageNumDom).each((i, item) => {
                                if (parseInt($(item).text()) - 1 == (oldcurrentIndex + 1)) {
                                    $(item).addClass("current");
                                }
                            })
                            
                        } else {
                            $(this).addClass('current');
                        }
                        let currentIndex = parseInt(scop.find('.js_filter_pagination .page_num.current').text()) - 1;

                        //判断是否可以下一页上一页
                        if (currentIndex + 1 == pageNumDom.length) {
                            scop.find('.page_next').addClass('disabled')
                        } else {
                            scop.find('.page_next').removeClass('disabled')
                        }
                        if (currentIndex == 0) {
                            scop.find('.page_prev').addClass('disabled')
                        } else {
                            scop.find('.page_prev').removeClass('disabled')
                        }
                        //解决点击过快出现的问题
                        if(scop.find('.js_filter_pagination .current').length==0) return;
                        
                        let pageIndex = 0
                        if ($(this).hasClass('page_prev')) {
                            pageIndex = parseInt(scop.find('.js_filter_pagination .current').text()) - 1;
                        } else if ($(this).hasClass('page_next')) {
                            pageIndex = parseInt(scop.find('.js_filter_pagination .current').text()) - 1;
                        } else {
                            pageIndex = parseInt($(this).text()) - 1;
                        }

                        sParams.from = pageIndex * size;
                        let total = $(this).parents(".js_filter_pagination").attr("data-total");
                        getData();
                    })
                }
                function getData() {
                    let dataObj = {};
                    dataObj.view = params.view;
                    dataObj.compId = compId;
                    dataObj.params = JSON.stringify(sParams);
                    let dataType = { dataType: 'html' }
                    c.cmsAjax.postJson(window.location.origin + '/api/get_comp', dataObj, dataType).then((res) => {

                        let eleDom = '';
                        $(res).each((index, item) => {
                            if ($(item).hasClass(eleId)) {
                                eleDom = item;
                            }else if($(item).find("." + eleId).length > 0){
                                eleDom = $(item).find("." + eleId);
                            }
                        })
                        let isEmpty = $(eleDom).find('.p_nodata').length > 0 ? true : false;
                        if (isEmpty) {
                            let insertDom = $(eleDom).find('.p_nodata')
                            $('#' + compId).find('.' + eleId).find('.p_nodata').remove()
                            $('#' + compId).find('.' + eleId).find('.p_list').remove()
                            if ($('#' + compId).find('.' + eleId).find('.p_filter_wrapper').length == 0) {
                                $('#' + compId).find('.' + eleId).find('.p_page').before(insertDom)
                            } else {
                                $('#' + compId).find('.' + eleId).find('.p_filter_wrapper').after(insertDom)

                            }
                        } else {
                            let insertDom = $(eleDom).find('.p_list');
                            $('#' + compId).find('.' + eleId).find('.p_nodata').remove()
                            $('#' + compId).find('.' + eleId).find('.p_list').remove()
                            // $('#' + compId).find('.' + eleId).find('.p_filter_wrapper').after(insertDom)
                            if (($('#' + compId).find('.' + eleId).find('.p_filter_wrapper').length == 0) || ($('#' + compId).find('.' + eleId).find('.p_filter_wrapper').hasClass("before"))) {
                                $('#' + compId).find('.' + eleId).find('.p_page').before(insertDom)
                            } else {
                                $('#' + compId).find('.' + eleId).find('.p_filter_wrapper').after(insertDom)

                            }
                            //翻页修改domv2
                            let pageconDom = $(eleDom).find('.page_con');
                            $('#' + compId).find('.' + eleId).find('.p_page').empty().html(pageconDom)
                            $('#' + compId).find('.' + eleId).find('.p_page a').attr('href', 'javascript:;')

                        }
                        r.lazyImg();
                    })
                }
                bindeventKeyup();
                function bindeventKeyup(status = 'not') {

                    scop.find('.p_page').off('click').on('click', 'a', function (e) {
                        if ($(this).hasClass('disabled')) {
                            e.preventDefault();
                            return
                        }
                    })
                    $(".js_filter_pagination").on('keyup', ".page_input", function (event) {
                        var _input = $(this);
                        var val = _input.val();
                        if (/[^\d]/.test(val)) {
                            var temp_amount = val.replace(/[^\d]/g, '');
                            _input.val(temp_amount);
                        }
                        if (val && val < 1) {
                            _input.val(1);
                        }
                        let total = parseInt($('#' + compId).find('.' + eleId).find(".page_num").last().text())
                        if (val && val > total) {
                            _input.val(total);
                        }
                        if (event.keyCode == "13") {//回车执行查询
                            let curpage = parseInt(scop.find('.js_filter_pagination .current').text())
                            if (_input.val() && _input.val() != parseInt(curpage)) {
                                console.log("跳转到第" + _input.val() + "页")
                                let jumpVal = parseInt(_input.val()) - 1

                                sParams.from = sParams.size * jumpVal;
                                scop.find('.js_filter_pagination .page_num').removeClass('current')
                                scop.find('.js_filter_pagination .page_num').eq(jumpVal).addClass('current')
                                getData()
                            }
                        }
                    })

                    //按钮跳转
                    scop.find(".js_filter_pagination").on("click", ".page_confirmJump", function () {
                        var _input = scop.find(".page_input");
                        let curpage = parseInt(scop.find('.js_filter_pagination .current').text())
                        if (_input.val() && _input.val() != parseInt(curpage)) {
                            console.log("跳转到第" + _input.val() + "页")
                            let jumpVal = parseInt(_input.val()) - 1

                            sParams.from = sParams.size * jumpVal;
                            scop.find('.js_filter_pagination .page_num').removeClass('current')
                            scop.find('.js_filter_pagination .page_num').eq(jumpVal).addClass('current')
                            getData()
                        }
                    })
                }


            })
        } else {
            scop.find('.p_page').removeClass('js_filter_pagination')
            //解决disabled仍然跳转的问题
            scop.find(".p_page a").each((index, item) => {
                if ($(item).hasClass("disabled")) {
                    $(item).attr('href', 'javascript:;')
                }
            })
            scop.find('.p_page').on('click', 'a', function (e) {
                if ($(this).hasClass('disabled')) {
                    e.preventDefault();
                    return
                }
            })
            //回车跳转
            var _input = scop.find(".page_input");
            _input.on('keyup', function (event) {
                var val = _input.val();
                if (/[^\d]/.test(val)) {
                    var temp_amount = val.replace(/[^\d]/g, '');
                    _input.val(temp_amount);
                }
                if (val && val < 1) {
                    _input.val(1);
                }
                if (val && val > totalPage) {
                    _input.val(totalPage);
                }
                if (event.keyCode == "13") {//回车执行查询
                    let curpage = scop.find('.page_a.current').text();

                    if (_input.val() && _input.val() != parseInt(curpage)) {
                        currentPage = parseInt(_input.val()) - 1
                        console.log("跳转到第" + _input.val() + "页")
                        if (scop.find('.page_next.disabled').length == 0) {
                            var oUrl = scop.find('.page_next').attr("href");
                        } else if (scop.find('.page_prev.disabled').length == 0) {
                            var oUrl = scop.find('.page_prev').attr("href");
                        } else {
                            return;
                        }
                        let noUrl = oUrl.split("?")[0] || ''
                        let pageurl = noUrl.substr(noUrl.lastIndexOf('/'), noUrl.lastIndexOf('.'))

                        var npageUrl = pageurl.substr(0, pageurl.indexOf('-')) + '-' + currentPage * page.size + '-' + page.size + '.html';

                        let nurl = oUrl.replace(pageurl, npageUrl)
                        $.openHref(nurl)
                    }
                }
            })
            //按钮跳转
            scop.find(".page_confirmJump").on("click", function () {
                var _input = scop.find(".page_input");
                let curpage = scop.find('.page_a.current').text();
                if (_input.val() && _input.val() != parseInt(curpage)) {
                    currentPage = parseInt(_input.val()) - 1
                    console.log("跳转到第" + _input.val() + "页")
                    if (scop.find('.page_next.disabled').length == 0) {
                        var oUrl = scop.find('.page_next').attr("href");
                    } else if (scop.find('.page_prev.disabled').length == 0) {
                        var oUrl = scop.find('.page_prev').attr("href");
                    } else {
                        return;
                    }

                    let noUrl = oUrl.split("?")[0] || ''
                    let pageurl = noUrl.substr(noUrl.lastIndexOf('/'), noUrl.lastIndexOf('.'))

                    var npageUrl = pageurl.substr(0, pageurl.indexOf('-')) + '-' + currentPage * page.size + '-' + page.size + '.html';

                    let nurl = oUrl.replace(pageurl, npageUrl)
                    $.openHref(nurl)
                }
            })
        }
    }
    return {
        init: init
    };
});