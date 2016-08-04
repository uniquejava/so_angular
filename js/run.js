parking.run(function ($http) {
    // see https://docs.angularjs.org/api/ng/service/$http
    // request header
    // before: `Accept:application/json, text/plain, */*`
    // after: `Accept:application/json`
    $http.defaults.headers.common.Accept = "application/json";
    $http.defaults.headers.common.Authorization = 'Basic YmVlcDpib29w';

    // before: no Cache-Control header
    // after: still no Cache-Control header
    $http.defaults.cache = true;
    

});