/**
 * Created by cyper on 8/2/16.
 */
parking.controller('parkingCtrl', function ($scope) {
    $scope.appTitle = "Fighting! <small>Cyper</small>";
    $scope.cars = [];
    $scope.colors = ["White", "Black", "Blue", "Red", "Silver"];

    $scope.park = function (car) {
        car.entrance = new Date();
        $scope.cars.push(car);
        delete $scope.car;
    };
})