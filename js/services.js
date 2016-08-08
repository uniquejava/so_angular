parking.factory("parkingFactory", function (parkingConfig) {
    var _calculateTicket = function (car) {
        var departHour = new Date().getHours();
        var entranceHour = new Date(car.entrance).getHours();
        var parkingPeriod = departHour - entranceHour;
        var parkingPrice = parkingPeriod * parkingConfig.parkingRate;
        return {
            period: parkingPeriod,
            price: parkingPrice
        };
    };
    // Revealing Module Pattern
    return {
        calculateTicket: _calculateTicket
    };
});


parking.service("parkingService", function (parkingConfig) {
    this.calculateTicket = function (car) {
        var departHour = new Date().getHours();
        var entranceHour = new Date(car.entrance).getHours();
        var parkingPeriod = departHour - entranceHour;
        var parkingPrice = parkingPeriod * parkingConfig.parkingRate;
        return {
            period: parkingPeriod,
            price: parkingPrice
        };
    };

});

parking.provider("parkingProvider", function (parkingConfig) {
    var _parkingRate = parkingConfig.parkingRate;
    var _calculateTicket = function (car) {
        var departHour = new Date().getHours();
        var entranceHour = new Date(car.entrance).getHours();
        var parkingPeriod = departHour - entranceHour;
        var parkingPrice = parkingPeriod * _parkingRate;
        return {
            period: parkingPeriod,
            price: parkingPrice
        };
    };

    this.setParkingRate = function (parkingRate) {
        _parkingRate = parkingRate;
    };

    this.$get = function () {
        // Revealing Module Pattern
        return {
            calculateTicket: _calculateTicket
        };
    };
});

parking.factory("parkingHttpFacade", function ($http, parkingConfig) {
    var url = parkingConfig.rest_url;

    var _getCars = function () {
        return $http.get(url + "/cars");
    };

    var _getCar = function (id) {
        return $http.get(url + "/cars/" + id);
    };

    var _saveCar = function (car) {
        return $http.post(url + "/cars", car);
    };

    var _updateCar = function (car) {
        return $http.put(url + "/cars/" + car.id, car);
    };

    var _deleteCar = function (id) {
        return $http.delete(url + "/cars/" + id);
    };

    return {
        getCars: _getCars,
        getCar: _getCar,
        saveCar: _saveCar,
        updateCar: _updateCar,
        deleteCar: _deleteCar
    };
});

parking.factory("httpTimestampInterceptor", function () {
    return {
        'request': function (config) {
            var ts = Date.now();
            config.url = config.url + "?ts=" + ts;
            return config;
        }
    };
});

parking.factory("httpUnauthorizedInterceptor", function ($q, $rootScope) {
    return {
        'responseError': function (rejection) {
            console.log('rejection:', rejection);

            if (rejection.status === 401) {
                // indicate that the app should open the login dialog
                $rootScope.login = true;
            }

            return $q.reject(rejection);

        }
    };
});


parking.factory("carSearchService", function ($timeout, $q) {
    var filterPromise;

    var _filter = function (cars, criteria, successCb, errorCb) {
        $timeout.cancel(filterPromise);

        var deferred = $q.defer();
        filterPromise = $timeout(function () {
            var result = [];
            angular.forEach(cars, function (car) {
                if (_matches(car, criteria)) {
                    result.push(car);
                }
            });
            if (result.length > 0) {
                deferred.resolve(result)
            } else {
                deferred.reject("No results were found!");
            }
        }, 1000);

        return deferred.promise;
    };

    var _matches = function (car, criteria) {
        return angular.toJson(car).indexOf(criteria) > 0;
    };
    return {
        filter: _filter
    };
});

parking.factory("loginService", function ($http) {
    var _login = function (user) {
        $http.post("/login", user);
    };
    return {
        login: _login
    };
});

parking.factory("tickGenerator", function ($rootScope, $timeout) {
    var _tickTimeout;
    var _start = function () {
        _tick();
    };

    var _tick = function () {
        $rootScope.$broadcast("TICK", new Date());
        _tickTimeout = $timeout(_tick, 1000);
    };
    var _stop = function () {
        $timeout.cancel(_tickTimeout);
    };

    var _listenToStop = function () {
        $rootScope.$on('STOP_TICK', function (event, data) {
            _stop();
        });
    };

    _listenToStop();
    return {
        start: _start,
        stop: _stop()
    };
});