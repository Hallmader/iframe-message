/**
 *页内通讯类
 *@Class:ChangeFeeling
 *观察者模式实现——底部状态栏内容根据左侧点击的按钮进行响应
 *模式中，底部状态栏为订阅者，左侧按钮为发布者
 *
 *
 *页内通讯 原型方法
 *@method:registerObserve 订阅者feeling加入发布者的订阅列表中
 *@param:feeling 订阅者实例对象
 * 
 *@method:notifyObserve 遍历发布者的订阅列表，对每个订阅者执行
 *@param:feeling 订阅者实例对象
 *
 **/
var ChangeFeeling = function() {
    this.feeling = [];
};

ChangeFeeling.prototype = {
    registerObserve: function(feeling) {
        this.feeling.push(feeling);
    },
    notifyObserve: function(feeling) {
        for (var i = 0, len = this.feeling.length; i < len; i++) {
            this.feeling[i].update();
        }
    }
};
/**
 *底部状态类
 *@Class FeelingGood/FeelingBoring/FeelingAngry
 *@param:changerBtn 传入发布者实例，并将调用它的订阅者(按钮)传入发布者订阅列表
 *三个按钮类的功能基本一致，核心在于其update方法有不同的状态响应
 *
 *
 *底部状态 原型方法
 *@method:update 显示底部状态，并更新内容与图片。具体根据不同按钮，内容不同
 *
 **/
var FeelingGood = function(changerBtn) {
    this.changerBtn = changerBtn;
    this.changerBtn.registerObserve(this);
    this.feelingBox = document.querySelector(".feeling-today");
    this.imgBox = document.querySelectorAll('.feeling-today ul li');
    this.feeling = document.querySelector('.feeling-today h2');
};

FeelingGood.prototype.update = function() {
    this.feelingBox.style.visibility = "visible";
    this.feelingBox.style.opacity = "1";
    this.feelingBox.style.filter = "alpha(opacity=100)";
    this.feeling.innerHTML = "心情好的话，就要努力工作哦。";
    for (var i = 0, len = this.imgBox.length; i < len; i++) {
        this.imgBox[i].firstChild.src = "images/good.png";
    }
};
var FeelingBoring = function(changerBtn) {
    this.changerBtn = changerBtn;
    this.changerBtn.registerObserve(this);
    this.feelingBox = document.querySelector(".feeling-today");
    this.imgBox = document.querySelectorAll('.feeling-today ul li');
    this.feeling = document.querySelector('.feeling-today h2');
};

FeelingBoring.prototype.update = function() {
    this.feelingBox.style.visibility = "visible";
    this.feelingBox.style.opacity = "1";
    this.feelingBox.style.filter = "alpha(opacity=100)";
    this.feeling.innerHTML = "世界太和平了，都不需要码农来拯救了。";
    for (var i = 0, len = this.imgBox.length; i < len; i++) {
        this.imgBox[i].firstChild.src = "images/boring.png";
    }
};
var FeelingAngry = function(changerBtn) {
    this.changerBtn = changerBtn;
    this.changerBtn.registerObserve(this);
    this.feelingBox = document.querySelector(".feeling-today");
    this.imgBox = document.querySelectorAll('.feeling-today ul li');
    this.feeling = document.querySelector('.feeling-today h2');
};

FeelingAngry.prototype.update = function() {
    this.feelingBox.style.visibility = "visible";
    this.feelingBox.style.opacity = "1";
    this.feelingBox.style.filter = "alpha(opacity=100)";
    this.feeling.innerHTML = "(╯‵□′)╯︵┻━┻!!!";
    for (var i = 0, len = this.imgBox.length; i < len; i++) {
        this.imgBox[i].firstChild.src = "images/angry.png";
    }
};
window.onload = function() {
    var btnBox = document.querySelectorAll('.controller-list ul li a');
    btnBox[0].onclick = function() {
        var changeFeeling = new ChangeFeeling();
        var feelingGood = new FeelingGood(changeFeeling);
        changeFeeling.notifyObserve(feelingGood);
    };
    btnBox[1].onclick = function() {
        var changeFeeling = new ChangeFeeling();
        var feelingBoring = new FeelingBoring(changeFeeling);
        changeFeeling.notifyObserve(feelingBoring);
    };
    btnBox[2].onclick = function() {
        var changeFeeling = new ChangeFeeling();
        var feelingAngry = new FeelingAngry(changeFeeling);
        changeFeeling.notifyObserve(feelingAngry);
    };

};
