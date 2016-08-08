parking.run(function ($http, $rootScope, $window) {
    $http.defaults.headers.common.Accept = "application/json";
    $http.defaults.headers.common.Authorization = 'Basic YmVlcDpib29w';

    $http.defaults.cache = true;

    $rootScope.$on("$routeChangeStart", function (event, current, previous, rejection) {
        $rootScope.loading = true;
    });
    $rootScope.$on("$routeChangeSuccess", function (event, current, previous, rejection) {
        $rootScope.loading = false;
    });
    $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
        $window.location.href = "error.html";

    });
});