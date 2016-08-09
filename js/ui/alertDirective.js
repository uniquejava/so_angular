ui.directive("alert", function () {
    var ddo = {
        restrict: 'E',
        scope: {
            topic: '@', // 使用者将直接给定一个字符串常量.
            content: '=', // 指令局部的scope与指令所在的controller(parent scope)共享同一个变量
            close: '&' // 指定一个可供directive回调的外部函数
        },
        replace: true, // 使用模板替换掉指定了该指令的标签(outerHTML)
        transclude: true, // 使用了该指令的标签的body将直接插入到模板中ng-transclude所在的位置
        template: "<div class='alert'>" +
        "<span class='alert-topic'>" +
        "{{topic}}" +
        "</span>" +
        "<span class='alert-description' ng-transclude>" +
        "</span>" +
        "</div>"
    };
    return ddo;
});