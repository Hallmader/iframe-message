/*Iframe/父子窗口通讯组件
 *利用HTML5 postMessage Api制作
 *目前不能兼容IE8以下浏览器
 *
 *从原理上来说，postMessage的第二个参数在本地环境，或是同源环境下是不适用的
 *这里采用各个窗口/页面的window对象名称作为唯一标示
 *由此可针对不同的窗口/页面发送不同的信息，当然也可以是相同的
 *
 *缺陷在于，监听功能并不能很好地确认是哪一方发来了信息
 *考虑到不同的应用场景，还没有想到非常好的方法判断来源
 *因此，用户应当通过验证目标发来的信息/信号来采取不同的处理行为
 */



//通讯类
//传入目标页面的window对象，并且它是唯一标示
//通过postMessage传递数据
var MessageToTarget = function(id, targetWindow) {
    this.target = targetWindow;
    this.id = id;
};
//向目标窗体发送数据体msg
MessageToTarget.prototype.sendMsg = function(msg) {
    this.target.postMessage(msg, '*');
};


//发送信息类
//订阅者通过监听onmessage事件收取发布者发来的数据，同时根据具体的回调函数作出处理
var MessageListener = function(listener) {
    this.targets = {};
    this.listener = listener;
    this.listenFunction = [];
};

MessageListener.prototype = {
    //建立MessageToTarget对象实例，并存于targets对象内保存
    addMsgTarget: function(id, targetWindow) {
        var target = new MessageToTarget(id, targetWindow);
        this.targets[id] = target;
    },
    //开始监听数据————获取数据后的行为由传入的回调函数决定
    listenToMsg: function(callback) {
        var callbackFlag = false;
        var that = this;
        for (var i = 0, len = this.listenFunction.length; i < len; i++) {
            if (this.listenFunction[i] === callback) {
                callbackFlag = true;
                break;
            }
        }
        if (!callbackFlag) {
            this.listenFunction.push(callback);
        }

        var msgCallback = function(event) {
            for (var i = 0, len = that.listenFunction.length; i < len; i++) {
                that.listenFunction[i](event.data);
            }
        };
        window.addEventListener('message', msgCallback);
    },
    //调用已经建立的目标对象中的send
    sendMsg: function(msg) {
        for (var target in this.targets) {
            if (targets.hasOwnProperty(target)) {
                targets[target].sendMsg(msg);
            }
        }
    }
};
