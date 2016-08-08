// note that when config, we need to append `Provider` as a suffix!!!
parking.config(function (parkingProviderProvider, $httpProvider, $routeProvider, $logProvider) {
    parkingProviderProvider.setParkingRate(10);
    $httpProvider.interceptors.push("httpTimestampInterceptor");
    $httpProvider.interceptors.push("httpUnauthorizedInterceptor");

    //$httpProvider.defaults.useXDomain = true;
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $logProvider.debugEnabled(false);

    $routeProvider.when("/parking", {
        templateUrl: "parking.html",
        controller: "parkingCtrl",
        resolve: {
            "cars": function (parkingHttpFacade) {
                return parkingHttpFacade.getCars();
            }
        }
    }).when("/car/:id", {
        templateUrl: "car.html",
        controller: "carCtrl",
        resolve: {
            "car": function (parkingHttpFacade, $route) {
                var id = $route.current.params.id;
                return parkingHttpFacade.getCar(id);
            }
        }
    }).otherwise({
        redirectTo: "/parking"
    });

});