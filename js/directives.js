/**
 * Created by cyper on 8/2/16.
 */
parking.directive("alert", function () {
    return {
        restrict: 'E',
        scope: {
            title: '@',
            close: '&'
        },
        templateUrl: "alert.html",
        replace: true,
        transclude: true
    };

}).directive('accordion', function () {
    var directiveDefinitionObject = {
        template: "<div ng-transclude=''></div>",
        restrict: "E",
        transclude: true,
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

    return directiveDefinitionObject;
}).directive('accordionItem', function () {

    return {
        templateUrl: 'accordionItem.html',
        restrict: "E",
        scope: {
            title: "@"
        },
        transclude: true,
        require: '^accordion', //查找名为accordion[parent指令]中是否有定义controller, ^表示parent
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
});