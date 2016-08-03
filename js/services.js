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