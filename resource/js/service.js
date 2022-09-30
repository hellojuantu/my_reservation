// 
function showQY(){
    dd.device.notification.showPreloader({
        text: "正在更新剩余位置...", 
        showIcon: true, 
        onSuccess : function(result) {
            var html = `<option value="0">区域</option><option value="2lxn" disabled="disabled" style="color:red">二楼：西南（文学、艺术）(70/70)</option><option value="2ldn" disabled="disabled" style="color:red">二楼：东南（中国文学）(70/70)</option><option value="2lkyq" disabled="disabled" style="color:red">二楼：考研学习区（限本人座位）(33/33)</option><option value="3lxn" disabled="disabled" style="color:red">三楼：西南（农业经济）(75/75)</option><option value="3ldn" disabled="disabled" style="color:red">三楼：东南（经济学）(70/70)</option><option value="3lz" disabled="disabled" style="color:red">三楼：中（大厅侧）(20/20)</option><option value="3lxb" disabled="disabled" style="color:red">三楼：西北（特色文献）(30/30)</option><option value="3lkyq" disabled="disabled" style="color:red">三楼：考研学习区（限本人座位）(11/11)</option><option value="4lxn" disabled="disabled" style="color:red">四楼：西南（马列）(75/75)</option><option value="4ldn" disabled="disabled" style="color:red">四楼：东南（法律）(70/70)</option><option value="4lz" disabled="disabled" style="color:red">四楼：中（大厅侧）(20/20)</option><option value="4lxb" disabled="disabled" style="color:red">四楼：西北（外文）(30/30)</option><option value="4lkyq" disabled="disabled" style="color:red">四楼：考研学习区（限本人座位）(11/11)</option>`
            document.getElementById("qy").innerHTML=html;
            document.getElementById("yyButton").disabled="";
            document.getElementById("yyButton").style.background="#1E90FF";
            //
            sleep(500)
            dd.device.notification.hidePreloader({
                onSuccess : function(result) {

                },
                onFail : function(err) {
                    alert("页面脚本错误，请在清理缓存后重试。");
                }
            });
        },
        onFail : function(err) {
            alert("页面脚本错误，请在清理缓存后重试。");
        }
    });
}

function tsgyy(){
    document.getElementById("yyButton").disabled="disabled";
    document.getElementById("yyButton").style.background="lightgrey";
    document.getElementById("sm").innerHTML="<span style=\"color:red;\">请选择预约区域！</span><img src=\"./resource/img/red.png\" class=\"messagePic\"/>"
}

function showGXRZ(){
    dd.device.notification.alert({
        //message: "1.修正了可以连续点击预约按钮的问题2.优化了更新剩余位置的时机",
        //title: "更新日志2022.03.24",//可传空
        //message: "1.针对早高峰时段，由于并发访问量过大导致的系统易崩溃的问题进行了优化，增加了数据库的最大连接数2.增加了预约中等待结果时的提示，以免用户误认为应用卡住",
        //title: "更新日志2022.03.30",//可传空
        //message: "1.增加了大部分区域的座位数（除电子阅览室和考研学习区外）",
        //title: "更新日志2022.03.31",//可传空
        //message: "1.建立了数据库索引，极大幅度地提升了“更新剩余位置”和“预约”的速度，降低了等待时“转圈圈”的时间。小Tips:计算机系的同学们学习数据库课程的时候把索引好好学一下，工作中能用到❛‿˂̵✧",
        //title: "更新日志2022.04.01",//可传空
        //message: "根据学校规定，对图书馆各区域座位数进行调整，今日已经预约的同学仍可正常展示预约凭证。",
        //title: "更新日志2022.04.03",//可传空
        //message: "小Tips：当前时段，指的是当前时间所对应的预约时间段。所以，已经预约的同学，在预约时段（7:00-21:30）之外，点击“我要进馆”，显示“当前时段尚未预约”是正常的哦。",
        //title: "更新日志2022.04.04",//可传空
        message: "通知：系统将于4月7日21:00停机维护，对服务器进行升级，维护期间将无法访问。",
        title: "更新日志2022.04.07",//可传空
        buttonName: "我知道了",
        onSuccess : function() {
            //onSuccess将在点击button之后回调
            /*回调*/
        },
        onFail : function(err) {}
    });
}

function hxpz(){
    dd.device.notification.confirm({
        message: "核销后本次预约凭证将作废，确认要核销凭证吗？",
        title: "提示",
        buttonLabels: ['确认', '取消'],
        onSuccess : function(result) {
            if (result.buttonIndex == 0) {
                // 浴池自动加锁(零时锁), 避免误触
                lock(true)
                // 核销按钮变灰，无法点击
                var hxButton = document.getElementById("hxButton");
                hxButton.disabled = "disabled";
                hxButton.style.background = "lightgrey";
                // 页面显示核销中状态
                var imgDiv = document.getElementById("imgDiv");
                imgDiv.style.display = 'none';
                var hxTable = document.getElementById("hxTable");
                hxTable.style.display = 'table';
                var hxImg = document.getElementById("hxImg");
                hxImg.innerHTML = "<img src=\"./resource/img/yellow.png\" width=\"80px\"/>";
                var hxMessage = document.getElementById("hxMessage");
                hxMessage.innerHTML = "正在核销...";
                sleep(400)
                dd.device.notification.showPreloader({
                    text: "正在为您核销凭证...", 
                    showIcon: true, 
                    onSuccess : function(result) {
                        sleep(400)
                        // 核销按钮隐藏
                        document.getElementById("hxButtonDiv").style.display='none';
                        // 页面显示已核销
                        document.getElementById("hxImg").innerHTML="<img src=\"./resource/img/green.png\" width=\"80px\"/>";
                        document.getElementById("hxMessage").innerHTML="已核销";
                        hidePreloader()
                    },
                    onFail : function(err) {
                        alert("页面脚本错误，请在清理缓存后重试。");
                    }
                });
            }
        },
        onFail : function(err) {
            alert("页面脚本错误，请在清理缓存后重试。");
        }
    })
}

function lock(locked) {
    if (locked) {
        es(".modify-area").forEach(function(self) {
            self.setAttribute('contenteditable', false)
        })
        e("#id-select-area").setAttribute('disabled', 'disabled')
    } else {
        es(".modify-area").forEach(function(self) {
            self.setAttribute('contenteditable', true)
        })
        e("#id-select-area").removeAttribute('disabled')
    }
}

function enter() {
    dd.biz.navigation.setTitle({
        title: "预约凭证",
    })
    // 页面切换
    e("#id-pre").style.display = 'none'
    e("#id-qr").style.display = ''
    // 获取本地数据
    var data = JSON.parse(localStorage.data)
    var area = data['area']
    var info = data['info']
    console.log("area", area)
    // 移除首页的 更新记录按钮
    e("#id-update-log").style.display = 'none'
    // 如果是浴池则需要显示核销按钮
    if (area.endsWith("浴池")) {
        e("#hxButtonDiv").style.display = ''
    }
    e('#id-area').innerHTML  = area
    console.log("info", info)
    e('#id-stu-info').innerHTML  = info || "请在这里输入学号和姓名"
}