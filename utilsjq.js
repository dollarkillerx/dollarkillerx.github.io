/**
 LayUi等常用工具集合

 功能: 表单验证  请求封装 弹窗提示 V0.1

 需要 LayUI  Jq
 **/

/*
    check 部分 后缀为Message的check错误会弹框警告
 */
function checkParamNotNullValidate(param) {
    if(param != null && param != '') {
        return true;
    }
    return false;
}

/*
    LayUi 弹窗提示封装
 */
function errorMessage(msg) {
    layer.msg(msg, {icon: 5});
}
function successMessage(msg) {
    layer.msg(msg, {icon: 1});
}
function inputMessage(title,func) {
    //prompt层
    layer.prompt({title: title, formType: 3}, function(pass, index){
        layer.close(index);
        func(pass);
    });
}

/*
    request 请求封装
 */
function request(url,data,suc,err,method) {
    if (method == "GET") {
        $.ajax({
            type : "GET",
            url : url,
            success : function(data){
                suc(data);
            },
            error : function (data) {
                err(data);
            }
        });
    }else{
        $.ajax({
            type : "POST",
            url : url,
            data : data,
            success : function(data){
                suc(data);
            },
            error : function (data) {
                err(data);
            }
        });
    }
}

/*
    iframe 框
 */
function PopWindow($title,$url) {
    layer.open({
        type: 2,
        title: $title,
        shadeClose: true,
        shade: false,
        maxmin: true, //开启最大化最小化按钮
        area: ['893px', '600px'],
        content: $url
    });
}


////////////////////基础工具//////////////////////////
/*
    obj->json
 */
function objToJson(obj) {
    return JSON.stringify(obj)
}
/*
    json->obj
 */
function jsonToObj(json) {
    return JSON.parse(json)
}
/*
    判断localStorage 值不为空
 */
function localStorageHas(key) {
    let s = localStorage.getItem(key);
    return checkParamNotNullValidate(s)
}
