$define(['pl_util','cmsAjax','pl_toast'],function (u,c,t) {
    Array.prototype.max = function(){ 
        return Math.max.apply({},this) 
    } 
    Array.prototype.min = function(){ 
        return Math.min.apply({},this) 
    }
    //鑾峰彇鍏冪礌瀵瑰簲涓枃鍚�
    function getElemCname(elemId,cid){
        let str = ''
        const elemList = [
            {"name": "琛ㄥ崟瀹瑰櫒","code": "e_form"},
            {"name": "鍗曡杈撳叆妗�","code": "e_input"},
            {"name": "鏁板瓧杈撳叆妗�","code": "e_number"},
            {"name": "澶氳杈撳叆妗�","code": "e_textarea"},
            {"name": "涓嬫媺鍗曢€�","code": "e_select"},
            {"name": "涓嬫媺澶氶€�","code": "e_multipleSelect"},
            {"name": "鍗曢€夐」","code": "e_radio"},
            {"name": "澶氶€夐」","code": "e_checkbox"},
            {"name": "鏍囩鍨�","code": "e_label"},
            {"name": "鏃ユ湡鍨�","code": "e_date"},
            {"name": "鍖洪棿鏃ユ湡鍨�","code": "e_rangeDate"},
            {"name": "璇勫垎銆佽瘎浠�","code": "e_score"},
            {"name": "鎸夐挳","code": "e_formBtn"},
            {"name": "鍦板潃鍨�","code": "e_address"},
            {"name": "鍥剧墖鍨�","code": "e_uploadImg"},
            {"name": "鏂囦欢鍨�","code": "e_uploadFile"},
            {"name": "瑙嗛鍨�","code": "e_uploadVideo"},
            {"name": "瀛愯〃鍗�","code": "e_subForm"},
            {"name": "鐩稿叧椤�","code": "e_relevantItem"},
            {"name": "鏉℃鏉′欢","code": "e_agreement"},
            {"name": "瀹夊叏楠岃瘉","code": "e_code"},
            {"name": "鎵嬫満鍙烽獙璇�","code": "e_mobileCode"},
            {"name": "閭楠岃瘉","code": "e_emailCode"},
            {"name": "鍥炬枃鏍囩","code": "e_cardLabel"},
            {"name": "绾跨储鎵嬫満","code": "e_clueMobile"},
            {"name": "绾跨储濮撳悕","code": "e_clueName"},
            {"name": "绾跨储閭","code": "e_clueEmail"},
            {"name": "棰勭害鏃堕棿","code": "e_timeAppointment"}
        ]
        let t = elemList.find(n=>n.code==elemId.split('-')[0])
        if(t){
            str = t.name
        }
        return str
    }
    //鑾峰彇琛ㄥ崟椤圭殑value
    function getElemValue(elemId,cid){
        var elemType = elemId.split('-')[0]
        var value = '',obj = $('#' + cid + " ." + elemId)
        switch (elemType) {
            case 'e_input'://鍗曡鏂囨湰
            case 'e_clueMobile'://鍗曡鏂囨湰
            case 'e_clueName'://鍗曡鏂囨湰
            case 'e_clueEmail'://鍗曡鏂囨湰
                value = getInputValue(elemId,cid)
                break;
            case 'e_number'://鏁板瓧杈撳叆妗�
            case 'e_textarea'://澶氳鏂囨湰
            case 'e_date'://鏃ユ湡鏃堕棿
                var inp = obj.find('[name="'+elemId+'"]')
                if(inp.length==0){
                    inp = obj.find('[data-name="'+elemId+'"]')
                }
                var tmpValue = inp.val()
                value = getDateFormat(tmpValue,elemId,cid)
                break; 
            case 'e_select'://涓嬫媺鍗曢€�
            case 'e_multipleSelect'://涓嬫媺澶氶€�
            case 'e_score'://璇勫垎
                var inp = obj.find('[name="'+elemId+'"]')
                if(inp.length==0){
                    inp = obj.find('[data-name="'+elemId+'"]')
                }
                var tmpValue = inp.val()
                value = getOption(tmpValue,elemId,cid)
                break;  
            case 'e_radio'://鍗曢€夐」
            case 'e_checkbox'://澶氶€夐」    
            case 'e_label'://鏍囩
            case 'e_cardLabel'://鏍囩
                var tmpValue = []
                var formCheck = '.form-check'
                if(!obj.hasClass('formHide')){//琛ㄥ崟椤归殣钘忔椂涓嶈€冭檻閫夐」闅愯棌
                    formCheck = '.form-check:visible'
                }
                obj.find(formCheck).each(function(){
                    var inp = $(this).find('[name="'+elemId+'"]')
                    if(inp.length==0){
                        inp = $(this).find('[data-name="'+elemId+'"]')
                    }
                    let checkbox = inp.is(":checked")
                    if(checkbox){
                        tmpValue.push(inp.val())
                    }
                })
                value = getOption(tmpValue.join(","),elemId,cid)
                break;  
            case 'e_rangeDate'://鍖洪棿鏃堕棿
                var inps = obj.find("[name='"+elemId+"-start']")
                var inpe = obj.find("[name='"+elemId+"-end']")
                if(inps.length==0){
                    inps = obj.find("[data-name='"+elemId+"-start']")
                }
                if(inpe.length==0){
                    inpe = obj.find("[data-name='"+elemId+"-end']")
                }
                value = {
                    start:inps.val(),
                    end:inpe.val()
                }
                break;  
            case 'e_address'://鍦板潃鍨�
            case 'e_uploadFile'://鏂囦欢鍨�
            case 'e_uploadImg'://鍥剧墖鍨�
            case 'e_uploadVideo'://瑙嗛鍨�
                var inp = obj.find('[name="'+elemId+'"]')
                if(inp.length==0){
                    inp = obj.find('[data-name="'+elemId+'"]')
                }
                if(inp.val()){
                    value = JSON.parse(inp.val())
                }else{
                    value = []
                }
                break;  
            case 'e_subForm'://瀛愯〃鍗�
                value = getSubFormVaue(elemId,cid)
                break;  
            case 'e_relevantItem'://鐩稿叧椤�
                value = getRelevantItemValue(elemId,cid)
                break;  
            case 'e_mobileCode'://鎵嬫満楠岃瘉鐮�
            case 'e_emailCode'://閭楠岃瘉鐮�
                var inpn = obj.find("[name='"+elemId+"-Number']")
                var inpc = obj.find("[name='"+elemId+"-Code']")
                if(inpn.length==0){
                    inpn = obj.find("[data-name='"+elemId+"-Number']")
                }
                if(inpc.length==0){
                    inpc = obj.find("[data-name='"+elemId+"-Code']")
                }
                value = {
                    number:inpn.val(),
                    code:inpc.val()
                }
                break;  
            case 'e_timeAppointment'://棰勭害鏃堕棿
                value = getTimeAppointmentValue(elemId,cid)
                break;  
            default:
                break;
        }
        return value
    }
    //鑾峰彇棰勭害鏃堕棿鐨剉alue
    function getTimeAppointmentValue(elemId,cid){
        let getSelectData = function(k){
            let arr = []
            let obj = $('#' + cid + " ." + elemId)
            let inp = obj.find(`[name="${elemId}-${k}"]`)
            if(inp.length==0){
                inp = obj.find(`[data-name="${elemId}-${k}"]`)
            }
            let checkbox = inp.parent().find(":checked")
            checkbox.each(function(){
                arr.push($(this).val())
            })
            return arr
        }
        let prop = getProp(elemId,cid)
        let value = {
            date:getSelectData('date')
        }
        if(prop.type=='2'){
            value.time = getSelectData('time')
        }
        return value
    }
    //鏍煎紡鍖栨棩鏈熸椂闂存牸寮�
    function getDateFormat(value,elemId,cid){
        if(!value){
            return ""
        }
        var prop = getProp(elemId,cid),nv=value
        if(prop.type=='date'){
            let fA = prop.format.split('-')
            let vA = value.split('-')
            let t = []
            fA.forEach((e,i)=>{
                if(/Y|M|D/.test(e) && vA[i]){
                    t.push(vA[i])
                }
            })
            nv = t.join("-")
        }
        return nv
    }
    //鑾峰彇鍗曡鏂囨湰鐨剉alue
    function getInputValue(elemId,cid){
        var inputProp = getProp(elemId,cid),value,obj = $('#' + cid + " ." + elemId)
        let inp = obj.find('[name="'+elemId+'"]')
        if(inp.length==0){
            inp = obj.find('[data-name="'+elemId+'"]')
        }
        if(inputProp.type=="countryMobile" || inputProp.type=="countryTel"){
            value = {
                callingCode: obj.find("[name='phoneDail']").val(), 
                countryCode: obj.find("[name='phoneIso']").val(),
                phoneNumber: inp.val()  
            }
        }else{
            value = inp.val()
        }
        return value
    }
    function getOpt(elemId,cid){
        var obj = $('#' + cid + " ." + elemId)
        var eStyle = elemId.split('-')[0]
        var checkArr = ['e_checkbox','e_radio','e_label','e_cardLabel']
        var option = []
        if(checkArr.indexOf(eStyle)>-1){
            obj.find('.form-check').each(function(){
                var input = $(this).find('.form-check-input')
                var label = $(this).find('.form-check-label')
                var tmp = {
                    label:label.text(),
                    value:input.val()
                }
                if(eStyle == 'e_cardLabel'){
                    tmp.label = $(this).find('.p_title').text()
                    tmp.img = $(this).find('.p_img span').attr('data-src')
                }
                option.push(tmp)
            })
        }else if(eStyle == 'e_multipleSelect'){
            obj.find(".multSelect-option div").each(function(){
                option.push({
                    label:$(this).find('span').text(),
                    value:$(this).attr('data-value')
                })
            })
        }else if(eStyle == 'e_select'){
            var inp = obj.find('[name="'+elemId+'"]')
            if(inp.length==0){
                inp = obj.find('[data-name="'+elemId+'"]')
            }
            inp.find('option').each(function(){
                if($(this).attr('value')!=''){
                    option.push({
                        label:$(this).text(),
                        value:$(this).attr('value')
                    })
                }
            })
        }
        return option
    }
    //鏍规嵁閫夋嫨鏁版嵁锛岃繕鍘熼€夐」鏁版嵁
    function getOption(value,elemId,cid){
        var data = []
        var eleItem = $('#' + cid + " ." + elemId)
        var elemProp = getProp(elemId,cid)
        var options = getOpt(elemId,cid)
        var valueArr = value.split(',')
        valueArr.forEach(e=>{
            if(e){
                var ne=e,p = {}
                if(elemId.indexOf('e_score')>-1){
                    ne=Math.ceil(e.split("/")[0])
                    var tmp = elemProp.prompt.find(n=>n.from<=ne&&n.to>=ne)
                    p.score=e
                }else{
                    var tmp = options.find(n=>n.value==ne)
                    p.value=e
                }
                p.label=tmp ? tmp.label : ne
                if(elemId.indexOf('e_cardLabel')>-1){
                    let tmpItem = eleItem.find(`[value="${e}"]`)
                    p = JSON.parse(tmpItem.parent(".p_labelItem").attr("data-value"))
                    p.label = unescape(p.label)
                }
                data.push(p)
            }
        })
        let objArr=['e_radio','e_select','e_score']
        if(objArr.indexOf(elemId.split('-')[0])>-1){
            data=data[0] || {}
        }
        return data
    }
    //鑾峰彇鐩稿叧椤规暟鎹�
    function getRelevantItemValue(elemId,cid){
        var relevantItem = $('#' + cid + " ." + elemId)
        var subForm = relevantItem.closest("[class^=e_subForm-]")
        var isInSubForm = subForm.length > 0 ? true : false

        var eleprop = getProp(elemId,cid)
        var openLink = false
        eleprop.previewList.forEach(e=>{
            if(e.openLink){
                openLink = true
            }
        })
        
        var val = []
        if(isInSubForm){
            val = {}
            if(relevantItem.attr('datakey')){
                val[relevantItem.attr('datakey')] = relevantItem.attr('datavalue') || ''
            }
            relevantItem.find('.p_relevantTd').each(function(){
                val[$(this).attr('datakey')] = $(this).attr('datavalue') ? unescape($(this).attr('datavalue')) : ''
            })
            if(openLink){
                let obj = JSON.parse(unescape(relevantItem.attr('dataobj')))
                val.href = obj.href || obj._href || ''
            }
        }else{
            relevantItem.find('.p_tabelList tbody tr').each(function(i,e){
                var tmp={}
                tmp[$(this).attr('datakey')] = $(this).attr('datavalue') || ''
                $(this).find("td").each(function(){
                    if(!$(this).hasClass("op")){
                        tmp[$(this).attr('datakey')] = $(this).attr('datavalue') ? unescape($(this).attr('datavalue')) : ''
                    }
                })
                if(openLink){
                    let obj = JSON.parse(unescape($(e).attr('dataobj')))
                    tmp.href = obj.href || obj._href || ''
                }
                val.push(tmp)
            })
        }
        
        return val
    }
    //鑾峰彇瀛愯〃鍗曟暟鎹�
    function getSubFormVaue(elemId,cid){
        var subForm = $('#' + cid + " ." + elemId)
        var dataArr = []
        subForm.find(".p_tbody .p_tr:visible").each(function(){
            var tr = $(this)
            if(tr.height()!=0){
                var dataObj = {}
                tr.find("[class^='e_']").each(function(){
                    var className=$(this).attr('class').split(/\s+/)
                    var subelemId=className.find(n=>/^e_/.test(n))
                    var k = subelemId
                    if(subelemId.indexOf('__')){
                        k = k.split('__')[0]
                    }
                    dataObj[k] = getElemValue(subelemId,cid)
                })
                dataArr.push(dataObj)
            }
        })
        return dataArr
    }
    //鑾峰彇琛ㄥ崟鍏冪礌prop
    function getProp(elemId,cid){
        var comp = $('#' + cid );
        var prop = comp.children("input:hidden[name='propJson']").val()
        var formProp=prop?JSON.parse(prop):{}
        var tmpObj={}
        var id=elemId.split('-')[1]
        //鍏煎瀛愯〃鍗曞鍒剁殑琛ㄥ崟椤�
        if(id.indexOf('__')){
            id=id.split('__')[0]
        }
        //鍏煎瀛愯〃鍗曞鍒剁殑琛ㄥ崟椤�
        for(var i in formProp){
            if(i.split('_')[1]==id){
                tmpObj[i.split('_')[0]]=formProp[i]
            }
        }
        return tmpObj
    }
    //鏍规嵁琛ㄥ崟鍐呭厓绱爄d鑾峰彇琛ㄥ崟瀹瑰櫒prop
    function formProp(elemId,cid){
        var comp = $('#'+cid);
        var prop = comp.children("input:hidden[name='propJson']").val()
        var allProp=JSON.parse(prop)
        var form = $('.'+elemId).closest("[class^='e_form-']");
        var classArr = form.attr("class").split(/\s+/)
        var formElementId = classArr.find(n=>/^e_/.test(n))
        var tmpObj={}
        if(formElementId){
            var id=formElementId.split('-')[1]
            //鍏煎瀛愯〃鍗曞鍒剁殑琛ㄥ崟椤�
            if(id.indexOf('__')){
                id=id.split('__')[0]
            }
            //鍏煎瀛愯〃鍗曞鍒剁殑琛ㄥ崟椤�
            for(var i in allProp){
                if(i.split('_')[1]==id){
                    tmpObj[i.split('_')[0]]=allProp[i]
                }
            }
        }
        return tmpObj
    }
    //鍒嗙骇琛ㄥ崟id鑾峰彇琛ㄥ崟label
    function getElemLabel(elemId,cid){
        var prop = this.getProp(elemId,cid)
        return prop.label?prop.label:this.getElemCname(elemId,cid)
    }
    //鍥炴樉鏁版嵁瀵瑰簲dom
    function getListContent(item,obj,data){
        if(data){
            let dd = obj[item.outCode]
            let arr = ['array[markList]','array[images]','array[img]','array[keywords]','object','array[category]','array[video]','array[file]']
            if(arr.indexOf(item.outType)>-1){
                dd = dd ? JSON.stringify(dd).toString() : ''
            }
            return escape(dd)
        }
        let contentStr = obj[item.outCode] || '',
            className = 'p_listWord';
        if(item.outType == 'array[img]'||item.outType == 'array[images]'){
            let img = obj[item.outCode]?obj[item.outCode][0]:{}
            if(img){
                contentStr = `<img src="${$.handleDataImg(img.imageUrl)}">`
            }
            className = 'p_listImg'
        }else if(item.outType == 'array[video]'){
            let img = obj[item.outCode]?obj[item.outCode][0]:{}
            if(img){
                contentStr = `<img src="${$.handleDataImg(img.coverImgUrl)}">`
            }
            className = 'p_listImg'
        }else if(item.outType == 'array[file]' || item.outType == 'array[category]'){
            let dom = []
            if(obj[item.outCode]){
                obj[item.outCode].forEach(e=>{
                    dom.push(e.title)
                })
                contentStr = dom.join(',')
            }
        }else if(item.outType == 'array[keywords]'){
            let dom = []
            if(obj[item.outCode]){
                obj[item.outCode].forEach(e=>{
                    dom.push(e.itemName)
                })
                contentStr = dom.join(',')
            }
        }else if(item.outType == 'array[markList]'){
            let dom = []
            if(obj[item.outCode]){
                obj[item.outCode].forEach(e=>{
                    dom.push(e.markName)
                })
                contentStr = dom.join(',')
            }
        }else if(item.outType == 'object'){
            if(obj[item.outCode]){
                contentStr = obj[item.outCode].title
            }
        }
        if(item.openLink){
            let href = obj.href || obj._href
            contentStr = `<a href="${href}" target="${item.linkTarget}">` + contentStr + `</a>`
        }
        let str = `<div class="${className}" name="${item.outCode}">${contentStr}</div>`
        return str
    }
    //濉啓鏉′欢
    function txRule(e,k,cid){
        var ifValue = e.if.value
        var realIfItemValue = getElemValue(e.if.item,cid)
        //鏁版嵁鍊煎拰鏄惁涓虹┖
        var valueEmpty = true,realValue=""
        switch (Object.prototype.toString.call(realIfItemValue)){
            case '[object String]':
            case '[object Number]':
                realValue = realIfItemValue
                if(realValue!=""){
                    valueEmpty = false
                }
                break
            case '[object Object]':
                realValue = realIfItemValue.value?[realIfItemValue.value]:[]
                if(realValue.length>0){
                    valueEmpty = false
                }
                break
            case '[object Array]':
                realValue = []
                realIfItemValue.forEach(e=>{
                    if(e.value){
                        realValue.push(e.value)
                    }
                })
                if(realValue.length>0){
                    valueEmpty = false
                }
                break
        }
        //宸插～鍐欐潯浠�
        var ytxRule = (ifValue==1 && !valueEmpty)
        //涓旀潯浠�
        if(ytxRule && e.if.option.length>0){
            e.if.option.forEach((ee,ii)=>{
                e.if.option[ii]=ee.toString()
            })
            var dxx = ['e_radio','e_select']
            function radioLabel(elemId,cid){
                return getProp(elemId,cid).limit == 1
            }
            if(dxx.indexOf(e.if.item.split('-')[0])>-1 || (e.if.item.split('-')[0]=='e_label' && radioLabel(e.if.item,cid))){//鍗曢€夊瀷
                ytxRule = e.if.option.indexOf(realValue[0]) > -1
            }else{//澶氶€夊瀷
                ytxRule = e.if.option.toString() == realValue.toString()
            }
        }
        //鏈～鍐欐潯浠�
        var wtxRule = (ifValue==2 && valueEmpty)
        if(k){//宸插～鍐欐潯浠�
            return ytxRule
        }else{//鏈～鍐欐潯浠�
            return wtxRule
        }
    }
    //鎵ц鍔ㄤ綔
    function doAction(then,k,fid,cid,logic){
        if(Object.prototype.toString.call(then) == '[object Object]'){
            doActionSingle(then,k,fid,cid,logic)
        }else if(Object.prototype.toString.call(then) == '[object Array]'){
            then.forEach(e=>{
                if(e.state){
                    doActionSingle(e,k,fid,cid,logic)
                }
            })
        }
    }
    function doActionSingle(then,k,fid,cid,logic){
        if(then.type==1 || !then.type){//鏀瑰彉琛ㄥ崟椤�
            changeItemType(then,k,fid,cid)
        }else if(then.type==2){//鏀瑰彉琛ㄥ崟椤瑰€肩殑鐘舵€�
            changeItemOption(then,k,fid,cid)
        }else if(then.type==3){//鏀瑰彉琛ㄥ崟鍊�
            changeItemValue(then,k,fid,cid,logic)
        }else if(then.type==4){//鎵ц璁＄畻缁撴灉
            doLogic(then,k,fid,cid,logic)
        }
    }
    //鎵ц璁＄畻缁撴灉
    function doLogic(then,k,fid,cid,logic){
        if(k){
            let form = $(`#${cid} .${fid}`)
            for(var i in then.itemValue){
                if(then.itemValue[i]){
                    let formula = logic[i]
                    let result = calculation(formula.formula,cid)
                    let hasSubFomrRow = formula.formula.find(n=>n.type=='subFormRow')
                    if(formula.output){
                        if(hasSubFomrRow){//瀛愯〃鍗曡鍐呰繍绠�
                            let subf = form.find(`.${hasSubFomrRow.subform}`)
                            subf.find('.p_tr').each(function(ii,ee){
                                let sufix = ''
                                if(ii!=0){
                                    sufix = '__'+(ii+1)
                                }
                                var outputItem = $(ee).find(`[name="${formula.output}${sufix}"]`)
                                if(outputItem.length==0){
                                    outputItem = $(ee).find(`[data-name="${formula.output}${sufix}"]`)
                                }
                                outputItem.val(result[ii])
                            })
                        }else{
                            var outputItem = form.find('[name="'+formula.output+'"]')
                            if(outputItem.length==0){
                                outputItem = form.find('[data-name="'+formula.output+'"]')
                            }
                            outputItem.val(result)
                        }
                    }
                }
            }
        }
    }
    //鍒囨崲琛ㄥ崟鐘舵€�
    function changeItemType(then,k,fid,cid){
        var scp = $(`#${cid} .${fid}`)
        var thenItemId = then.item
        var thenAction = then.action
        var tObj = scp.find('.'+thenItemId),ac
        var ele = tObj.find('[name='+thenItemId+']')
        if(ele.length==0){
            ele = tObj.find('[data-name='+thenItemId+']')
        }
        switch(thenAction){
            case 'show':
                ac = k?'block':'none'
                tObj.css({"cssText":`display:${ac} !important`})
                break;
            case 'hide':
                ac = !k?'block':'none'
                tObj.css({"cssText":`display:${ac} !important`})
                break;
            case 'normal':
                ac = k?false:true
                tObj.attr("required",ac)
                break;
            case 'required':
                ac = !k?false:true
                tObj.attr("required",ac)
                break;
            case 'disabled':
                ac = !k?false:true
                ele.attr("disabled",ac)
                break;
            case 'nodisabled':
                ac = k?false:true
                ele.attr("disabled",ac)
                break;
        }
    }
    //鏀瑰彉琛ㄥ崟椤瑰€肩殑鐘舵€�
    function changeItemOption(then,k,fid,cid){
        var scp = $(`#${cid} .${fid}`)
        var thenItemId = then.item
        var elemType = then.item.split('-')[0],ac
        var ele = scp.find('.'+thenItemId)
        switch(elemType){
            case 'e_select':
                var selectProp = getProp(then.item,cid)
                var hasplaceholder = selectProp.showPlaceholder
                ele.find('.p_input option').each(function(j,e){
                    let ni = hasplaceholder ? (j-1) : j
                    if(j>=0){
                        ac = k&&then.itemValue[ni]?'none':'block'
                        $(e).css({"cssText":`display:${ac} !important`})
                    }
                })

                // var selectProp = getProp(then.item,cid)
                // for(var i in then.itemValue){
                //     let ind = selectProp.showPlaceholder ? (Number(i)+1) : Number(i)
                //     ac = k&&then.itemValue[i]?'none':'block'
                //     ele.find('.p_input option').eq(ind).css({"cssText":`display:${ac} !important`})
                // }
                break;
            case 'e_multipleSelect':
                var mOp = ele.find('.multSelect-option')
                mOp.find('div').each(function(j,e){
                    ac = k&&then.itemValue[j]?'none':'block'
                    $(e).css({"cssText":`display:${ac} !important`})
                })

                // for(var i in then.itemValue){
                //     ac = k&&then.itemValue[i]?'none':'block'
                //     mOp.find('div').eq(i).css({"cssText":`display:${ac} !important`})
                // }
                break;
            case 'e_radio':
            case 'e_checkbox':
            case 'e_label':
                ele.find('.p_input .form-check').each(function(j,e){
                    ac = k&&then.itemValue[j]?'none':'inline-flex'
                    $(e).css({"cssText":`display:${ac} !important`})
                })

                // for(var i in then.itemValue){
                //     ac = k&&then.itemValue[i]?'none':'inline-flex'
                //     ele.find('.p_input .form-check').eq(i).css({"cssText":`display:${ac} !important`})
                // }
                break;
        }
    }
    //鏀瑰彉琛ㄥ崟椤瑰€�
    function changeItemValue(then,k,fid,cid,logic){
        var scp = $(`#${cid} .${fid}`)
        var thenItemId = then.item
        var ele = scp.find('.'+thenItemId)
        var styleId = thenItemId.split('-')[0]
        var selectItem = ['e_select','e_multipleSelect','e_radio','e_checkbox','e_label']
        if(selectItem.indexOf(styleId)>-1){
            if(k){
                if(styleId == 'e_checkbox' || styleId == 'e_radio' || styleId == 'e_label'){
                    ele.find(".form-check").each(function(i,e){
                        if(then.itemValue[i]){
                            $(this).find(".form-check-input").prop("checked",true)
                        }else{
                            $(this).find(".form-check-input").prop("checked",false)
                        }
                    })
                    ele.trigger('change')
                }else if(styleId == 'e_select'){
                    let index
                    for(var i in then.itemValue){
                        if(then.itemValue[i]){
                            index = i
                        }
                    }
                    ele.trigger('select',index).trigger('change')
                }else if(styleId == 'e_multipleSelect'){
                    let indexArr = []
                    for(var i in then.itemValue){
                        if(then.itemValue[i]){
                            indexArr.push(i)
                        }
                    }
                    ele.trigger('select',JSON.stringify(indexArr)).trigger('change')
                }
            }else{
                ele.trigger('reset')
            }
        }else{
            let v = ''
            var inp = ele.find('[name="'+thenItemId+'"]')
            if(inp.length==0){
                inp = ele.find('[data-name="'+thenItemId+'"]')
            }
            if(k){
                if(then.valueType==1){
                    v = then.action
                }else if(then.valueType==2){
                    let tvalue = getElemValue(then.action,cid),realValue
                    switch (Object.prototype.toString.call(tvalue)){
                        case '[object String]':
                        case '[object Number]':
                            realValue = [tvalue]
                            break
                        case '[object Object]':
                            realValue = tvalue.value?[tvalue.value]:[]
                            break
                        case '[object Array]':
                            realValue = []
                            tvalue.forEach(e=>{
                                if(e.value){
                                    realValue.push(e.value)
                                }
                            })
                            break
                    }
                    v = realValue.join(',')
                }else if(then.valueType==7){
                    let tvalue = getElemValue(then.action,cid),realValue
                    switch (Object.prototype.toString.call(tvalue)){
                        case '[object String]':
                        case '[object Number]':
                            realValue = [tvalue]
                            break
                        case '[object Object]':
                            realValue = tvalue.label?[tvalue.label]:[]
                            break
                        case '[object Array]':
                            realValue = []
                            tvalue.forEach(e=>{
                                if(e.label){
                                    realValue.push(e.label)
                                }
                            })
                            break
                    }
                    v = realValue.join(',')
                }else if(then.valueType==3){
                    let formula = logic[then.action]
                    let result = calculation(formula.formula,cid)
                    v = result
                }else if(then.valueType==4){
                    v = getCookie(then.action) || ""
                }else if(then.valueType==5){
                    v = $.getSearch()[then.action]
                }else if(then.valueType==6){
                    let datasource = then.datasource
                    let ddItem = then.ddItem
                    let initValue
                    getDatasource(datasource,function(res){
                        let dataObj;
                        try {
                            if(datasource.type=='object'){
                                dataObj = res.data.current 
                            }else if(datasource.type=='list'){
                                dataObj = res.data.list[0] 
                            }
                        } catch (error) {}
                        if(dataObj){
                            initValue = dataObj[ddItem.outCode]
                        }
                        
                        inp.val(initValue).trigger("change")
                    })
                }
            }else{
                v = ''
            }
            inp.val(v).trigger("change")
        }
    }
    //鍙栨渶澶у€硷紝鏈€灏忓€硷紝骞冲潎鍊�
    function mathCount(arr,k){
        let v
        if(k=='max'){
            v=arr.max()
        }else if(k=='min'){
            v=arr.min()
        }else if(k=='average'){
            let sum = 0
            arr.forEach(e=>{
                sum += Number(e)
            })
            v=sum/arr.length
        }
        return v
    }
    //璁＄畻鍗曚釜鍏紡
    function calculation(data,cid){
        // var hasSubFormRow = data.find(n=>n.type=="subFormRow")
        // if(hasSubFormRow){//瀛愯〃鍗曡鍐呰繍绠�
        //     console.log(data)
        //     let formula = []
        //     data.forEach((e,i)=>{

        //     })
        //     return []
        // }
        // var hasSubFormSum = data.find(n=>n.type=="subFormSum")
        // if(hasSubFormSum){//瀛愯〃鍗曟眰鍜岃繍绠�
        //     return ''
        // }
        let formula = []
        let hasSubFormRow = false,hasSubFormSum = false;
        data.forEach(el=>{
            if(el.type=='max'||el.type=='min'||el.type=='average'){
                let arr = []
                el.item.forEach(ele=>{
                    if(/^e_/.test(ele.value)){
                        var v = getElemValue(ele.value,cid)
                        if(typeof v == 'object'){
                            v = v.value
                        }
                        arr.push(v)
                    }else{
                        arr.push(ele.value)
                    }
                })
                formula.push(mathCount(arr,el.type))
            }else if(el.type=='pow2'||el.type=='pow3'){
                let value = 0,zs=el.type=='pow2'?2:3
                let v = calculation(el.item,cid)
                value = Math.pow(Number(v),zs)
                formula.push(value)
            }else if(el.type=='sqrt'){
                let value=0,gen,bei
                gen = calculation(el.genItem,cid)
                bei = calculation(el.beiItem,cid)
                value = Math.pow(bei,1/gen)
                formula.push(value)
            }else if(el.type=='pown'){
                let value=0,gen,bei
                gen = calculation(el.genItem,cid)
                bei = calculation(el.beiItem,cid)
                value = Math.pow(bei,gen)
                formula.push(value)
            }else if(el.type=='subFormRow'){
                let v = []
                let subf = $(`#${cid} .${el.subform}`)
                subf.find(".p_tr").each(function(i,e){
                    v.push(getRowSum($(e),i,el.item,cid))
                })
                formula.push(v)
            }else if(el.type=='subFormSum'){
                let v = []
                let subf = $(`#${cid} .${el.subform}`)
                subf.find(".p_tr").each(function(i,e){
                    v.push(getRowSum($(e),i,el.item,cid))
                })
                v = eval(v.join("+"))
                formula.push(v)
            }else if(/^e_/.test(el.value)){
                var v = getElemValue(el.value,cid)
                if(typeof v == 'object'){
                    v = v.value
                }
                formula.push(v)
            }else{
                formula.push(el.value)
            }
        })
        var result = ""
        try {
            let hasArr = formula.find(n=>typeof n == 'object')
            if(hasArr){
                result = []
                hasArr.forEach((ee,ii)=>{
                    let tmpformula = []
                    if(typeof ee == 'object'){
                        tmpformula.push(ee[ii])
                    }else{
                        tmpformula.push(ee)
                    }
                    result.push(eval(tmpformula.join("")))
                })
            }else{
                result = eval(formula.join(""))
            }
            
        } catch (error) {
            $.pl_toast({msg:i18n.form_formulaError})
            console.error("鍏紡閿欒",data)
        }
        console.log(result)
        return result
    }
    //瀛愯〃鍗曞崟琛岃繍绠�
    function getRowSum(obj,index,data,cid){
        let formula = []
        data.forEach(e=>{
            if(e.type=='formIt'){
                let sufix = ''
                if(index!=0){
                    sufix = '__'+(index+1)
                }
                let eid = e.value + sufix
                var v = getElemValue(eid,cid)
                if(typeof v == 'object'){
                    v = v.value
                }
                formula.push(v || 0)
            }else{
                formula.push(e.value)
            }
        })
        var result = 0
        console.log(formula)
        try {
            result = eval(formula.join(""))
        } catch (error) {
            console.error("鍏紡閿欒",data)
        }
        return result
    }
    //璇锋眰鏁版嵁婧�
    function getDatasource(datasource,callback){
        if(!datasource.api){
            return
        }
        let params = JSON.parse(JSON.stringify(datasource.params))
        let search = $.getSearch()
        params.query.forEach((e,i)=>{
            if(e.sourceType == 'page'){
                if(e.value=="_detailId" && !search._detailId){
                    e.value = window.pageObj._detailId
                }else{
                    e.value = search[e.value] ? search[e.value] : ""
                }
                params.query[i] = e
            }
        })
        c.cmsAjax.postJson(datasource.api,params).then(function(res){
            callback(res)
        })
    }
    //闇€瑕佽姹傚姩鎬乷ption
    function needOption(options){
        let index = options.findIndex(n=>n.isData)
        return index > -1
    }
    //璇锋眰閫夐」鍨嬫暟鎹�
    function getOptionDatasource(prop,callback){
        let datasourceList = prop.datasourceList
        let ddItemList = prop.ddItemList
        let options = prop.options
        let norepeat = prop.noRepeat
        let norepeatfor = prop.noRepeatFor
        let opList = {},k=0,l=0
        options.forEach(e=>{
            if(e.isData){
                opList[e.value]=[]
                k++
                let ind = Number(e.value.replace('data-',''))
                let datasource = datasourceList[ind]
                datasource.params.size=100
                getDatasource(datasource,function(res){
                    let tmpList = [],dataList = []
                    try {
                        let labelK = ddItemList[ind].label.outCode
                        let valueK = ddItemList[ind].value.outCode
                        let imgK
                        if(ddItemList[ind].img){
                            imgK = ddItemList[ind].img.outCode
                        } 
                        if(datasource.type=='object'){
                            dataList = [res.data.current]
                        }else if(datasource.type=='list'){
                            dataList = res.data.list
                        }
                        dataList.forEach(el=>{
                            if(el[labelK] && el[valueK]){
                                let obj = {
                                    label:el[labelK],
                                    value:el[valueK]
                                }
                                if(imgK){
                                    obj.img=el[imgK]
                                }
                                tmpList.push(obj)
                            }
                        })
                        
                    } catch (error) {}
                    opList[e.value]=tmpList
                    l++
                    doRenderOption()
                })
            }
        })
        function doRenderOption(){
            if(k==l){
                let nOpt = []
                options.forEach(e=>{
                    if(e.isData){
                        if(e.select){
                            opList[e.value][0].select = true
                        }
                        nOpt.push.apply(nOpt,opList[e.value]) 
                    }else{
                        nOpt.push(e)
                    }
                })
                if(norepeat){
                    let noRepeatOpt = []
                    nOpt.forEach(e=>{
                        let tmp = noRepeatOpt.find(n=>n[norepeatfor]==e[norepeatfor])
                        if(!tmp){
                            noRepeatOpt.push(e)
                        }
                    })
                    nOpt = noRepeatOpt
                }
                callback(nOpt)
            }
        }
    }
    //鑾峰彇鍏冪礌i18n
    function getI18n(elemId){
        if(elemId.indexOf("__")){
            elemId = elemId.split("__")[0]
        }
        var form = $('.'+elemId).closest("[class^='e_form-']");
        if(form.length==0){
            console.log(elemId,"鏈湪琛ㄥ崟瀹瑰櫒鍐�")
            return {}
        }
        var lastId = elemId.split("-")[1]
        var i18nJson = form.find('input[name="i18nJson"]').val() || "{}"
        i18nJson = JSON.parse(i18nJson)
        let tObj = {}
        for (var i in i18nJson) {
            if (i.endsWith("_" + lastId)) {
                tObj[i.split("_")[0]] = i18nJson[i]
            }
        }
        return tObj
    }
    return {
        getElemCname:getElemCname,
        getElemValue:getElemValue,
        getInputValue:getInputValue,
        getOption:getOption,
        getSubFormVaue:getSubFormVaue,
        getProp:getProp,
        formProp:formProp,
        getElemLabel:getElemLabel,
        getListContent:getListContent,
        txRule:txRule,
        doAction:doAction,
        calculation:calculation,
        getDatasource:getDatasource,
        needOption:needOption,
        getOptionDatasource:getOptionDatasource,
        getI18n:getI18n
    }
});