parking.factory("parkingService", function (parkingConfig) {
    var _calculateTicket = function (car) {
        var departHour = new Date().getHours();
        var entranceHour = car.entrance.getHours();
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


parking.service("parkingService2", function (parkingConfig) {
    this.calculateTicket = function (car) {
        var departHour = new Date().getHours();
        var entranceHour = car.entrance.getHours();
        var parkingPeriod = departHour - entranceHour;
        var parkingPrice = parkingPeriod * parkingConfig.parkingRate;
        return {
            period: parkingPeriod,
            price: parkingPrice
        };
    };

});

parking.provider("parkingService3", function (parkingConfig) {
    var _parkingRate = parkingConfig.parkingRate;
    var _calculateTicket = function (car) {
        var departHour = new Date().getHours();
        var entranceHour = car.entrance.getHours();
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

parking.factory("parkingHttpFacade", function ($http) {
    var _getCars = function () {
        return $http.get("/cars");
    };

    var _getCar = function (id) {
        return $http.get("/cars/" + id);
    };

    var _saveCar = function (car) {
        $http.post("/cars", car);
    };

    var _updateCar = function (car) {
        return $http.put("/cars/" + car.id, car);
    };

    var _deleteCar = function (id) {
        return $http.delete("/cars/" + id);
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
