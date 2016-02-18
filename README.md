# iframe-message
iframe通讯组件

Demo实现的功能为：
1、页内模块通讯。页面一部分被点击，其它部分通过监听触发行为事件；
2、跨iframe通讯。iframe中点击提交的信息将发送至主页面显示；
3、父子窗口通讯。登录用窗口点击登录后，主页面将作出响应；
4、子窗口之间通讯。3个测试子窗口的主题可切换，其中有一个切换，其它所有的子窗口都会同步切换。亦可通过父窗口的按钮切换所有子窗口主题。

innerMsg.js为第一项功能。
功能2~4业务代码在html文件内部内嵌。依赖本Demo核心即msg通讯组件msg.js实现。

msg.js通过监听onmessage事件来获取不同窗体/窗口发来的信息；通过建立发信目标，利用HTML5的postMessage Api发送信息。
此处的限制在于，不能很好地区分信息的来源，尤其是在同源环境（或本地环境）下。因此业务代码中需要根据实际情况，判断接收到的信息是否符合预期，并进入各自的代码逻辑进行处理。

ps：demo2.js是作废的一版……并非是将功能2~4组件化，而是强耦合的纯业务性代码。考虑到重用性才将跨页通讯部分封装成了可复用的组件。