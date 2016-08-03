/**
 * Created by cyper on 8/2/16.
 */
parking.controller('parkingCtrl', function ($scope, $filter, parkingService3) {
    $scope.appTitle = $filter('uppercase')("Fighting! <small>Cyper</small>");
    $scope.showAlert = true;
    $scope.alertDesc = "hello desc";
    $scope.closeAlert = function () {
        $scope.showAlert = false;
    };
    $scope.cars = [];
    $scope.colors = ["White", "Black", "Blue", "Red", "Silver"];

    $scope.park = function (car) {

        car.entrance = new Date();
        $scope.cars.push(car);
        delete $scope.car;

        $scope.carForm.$setPristine();
    };

    $scope.calculateTicket = function (car) {
        $scope.ticket = parkingService3.calculateTicket(car);

    };
});

