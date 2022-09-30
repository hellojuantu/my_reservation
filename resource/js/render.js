function loadData() {
    if (localStorage.data == undefined) {
        localStorage.data = JSON.stringify({name:"", area:"", info:"", lock:false})
    }
    var data = JSON.parse(localStorage.data)
    console.log("data", data)
    var name = data['name']
    e('#id-input-name').innerText = name || "输入你的姓名"
    // 上锁, 防止误触
    var locked = data['lock'] || false
    console.log("locked", locked)
    lock(locked)
}

function bindEvent() {
    e('#id-input-name').addEventListener('blur', function () {
        var name = e('#id-input-name').innerHTML
        var dic = JSON.parse(localStorage.data)
        dic['name'] = name
        console.log('name idc', dic)
        localStorage.data = JSON.stringify(dic)
    })

    e('#id-select-area').addEventListener('blur', function () {
        var area = e("#id-select-area")
        var opt = area.options[area.options.selectedIndex].innerHTML
        //
        e("#id-update-log").style.display = 'none'
        //
        if (opt.endsWith("浴池")) {
            e("#hxButtonDiv").style.display = ''
        } else {
            e("#hxButtonDiv").style.display = 'none'
        }
        //
        e('#id-area').innerHTML = opt
        var dic = JSON.parse(localStorage.data)
        dic['area'] = opt
        console.log('area idc', dic)
        localStorage.data = JSON.stringify(dic)
    })

    e('#id-stu-info').addEventListener('blur', function () {
        var info = e('#id-stu-info').innerHTML
        var dic = JSON.parse(localStorage.data)
        dic['info'] = info
        console.log('info idc', dic)
        localStorage.data = JSON.stringify(dic)
    })

    e('#id-lock-toggle').addEventListener('click', function () {
        var dic = JSON.parse(localStorage.data)
        var locked = dic['lock']
        dic['lock'] = !locked
        lock(dic['lock'])
        localStorage.data = JSON.stringify(dic)
    })

}

function init() {
    // 显示时间
    displayTime()
    window.setInterval("displayTime()", 1000);
    // 绑定事件
    bindEvent()
    // 导入本地数据
    loadData()
}

function __main() {
    if (dd && dd.env.platform !== 'notInDingTalk') {
        dd.ready(function() {
            dd.runtime.permission.requestAuthCode({
                corpId: "ding2e82ac7b61addfc6a1320dcb25e91351",
                onSuccess: function(result) {
                    // showGXRZ()
                    init()
                },
                onFail : function(err) {
                    window.location = 'http://yy.hrbfu.edu.cn/yy/tsgyy.jsp'
                }
            })
        });
    } else {
        window.location = 'http://yy.hrbfu.edu.cn/yy/tsgyy.jsp'
    }
}

__main()