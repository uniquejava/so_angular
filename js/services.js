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
