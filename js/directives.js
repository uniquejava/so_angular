/**
 * Created by cyper on 8/2/16.
 */
parking.directive("alert", function () {
    return {
        restrict: 'E',
        scope: {
            title: '=',
            close: '&'
        },
        templateUrl: "alert.html",
        replace: true,
        transclude: true
    };

});