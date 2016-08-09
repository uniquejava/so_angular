parking.directive('accordion', function () {
    var ddo = {
        restrict: "E",
        transclude: true,
        template: "<div ng-transclude=''></div>",
        controller: function ($scope, $element, $attrs, $transclude) {
            var accordionItems = [];
            var addAccordionItem = function (accordionScope) {
                accordionItems.push(accordionScope);
            };
            var closeAll = function () {
                angular.forEach(accordionItems, function (accordionScope) {
                    accordionScope.active = false;
                })
            };

            return {
                addAccordionItem: addAccordionItem,
                closeAll: closeAll
            }
        }
    };

    return ddo;
});

parking.directive("accordionItem", function () {
    var ddo = {
        restrict: 'E',
        scope: {
            title: '@'
        },
        transclude: true, // 使用了该指令的标签的body将直接插入到模板中ng-transclude所在的位置
        template: "<div class='accordion-item'>" +
        "{{title}}" +
        "</div>" +
        "<div " +
        "ng-show='active' " +
        "class='accordion-description' " +
        "ng-transclude" +
        ">" +
        "</div>",
        require: '^accordion', //查找名为accordion[parent指令]中是否有定义controller, ^表示parent, 并将其设置为link的第4个参数
        link: function (scope, element, attrs, ctrl, transcludeFn) {
            ctrl.addAccordionItem(scope);
            element.bind('click', function () {
                var isActive = scope.active;
                ctrl.closeAll();
                scope.$apply(function () {
                    scope.active = !isActive;
                });
            });
        }
    };
    return ddo;
});