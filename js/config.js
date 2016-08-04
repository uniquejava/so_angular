// note that when config, we need to append `Provider` as a suffix!!!
parking.config(function (parkingService3Provider, $httpProvider) {
    parkingService3Provider.setParkingRate(10);
    $httpProvider.interceptors.push("httpTimestampInterceptor");
    $httpProvider.interceptors.push("httpUnauthorizedInterceptor");
});