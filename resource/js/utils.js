// utils
function sleep(time){
    var timeStamp = new Date().getTime();
    var endTime = timeStamp + time;
    while (true) {
        if (new Date().getTime() > endTime){
            return;
        }
    }
}

function e(selector) {
    return document.querySelector(selector)
}

function es(selector) {
    return document.querySelectorAll(selector)
}

function check(val) {
    if (val < 10) {
        return ("0" + val);
    } else {
        return (val);
    }
}

function curTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var second = date.getSeconds();
    var timestr = year + "-" + check(month) + "-" + check(day) + " " + check(hour) + ":" + check(minutes) + ":" + check(second);
    return timestr
}

function displayTime() {
    var timeP = document.getElementById("timeP");
    timeP.innerHTML = curTime();
}

function hidePreloader() {
    dd.device.notification.hidePreloader({
        onSuccess : function(result) {},
        onFail : function(err) {
            alert("页面脚本错误，请在清理缓存后重试。");
        }
    })
}
