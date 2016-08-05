/**
 * Created by cyper on 8/2/16.
 */
// the cars is from routeProvider-resolve
parking.controller('parkingCtrl', function ($scope, $filter, $http, parkingProvider, parkingHttpFacade, cars) {
    $scope.appTitle = $filter('uppercase')("Fighting! <small>Cyper</small>");
    $scope.showAlert = true;
    $scope.alertDesc = "hello desc";
    $scope.closeAlert = function () {
        $scope.showAlert = false;
    };
    $scope.cars = [];
    $scope.colors = ["White", "Black", "Blue", "Red", "Silver"];

    $scope.oldParkCar = function (car) {

        car.entrance = new Date();
        $scope.cars.push(car);
        delete $scope.car;

        $scope.carForm.$setPristine();
    };

    $scope.parkCar = function (car) {
        car.id = parseInt(Math.random() * 10e4);
        console.log('car is:', car);
        parkingHttpFacade.saveCar(car)
            .success(function (data, status, headers, config) {
                retrieveCars();
                $scope.message = "The car was parked successfully!";

            })
            .error(function (data, status, headers, config) {
                $scope.message = "Something went wrong!";
                console.log(data, status);

            });

    };

    $scope.calculateTicket = function (car) {
        $scope.ticket = parkingProvider.calculateTicket(car);

    };

    var retrieveCars = function () {
        parkingHttpFacade.getCars()
            .success(function (data, status, headers, config) {
                $scope.cars = data;

            })
            .error(function (data, status, headers, config) {
                $scope.message = "Something went wrong!";
                console.log(data, status);

            });
    };
    //retrieveCars();
    $scope.cars = cars.data;
});

// the car is from routeProvider-resolve
parking.controller("carCtrl", function ($scope, $routeParams, parkingHttpFacade,parkingProvider, $location, $window, car) {
    $scope.depart = function (car) {
        parkingHttpFacade.deleteCar(car.id).then(function success(res) {
            $scope.message = "OK";
            $location.path("/parking");

        }, function error(res) {
            //console.log(res.data, res.status, res.headers, res.config, res.statusText);
            $window.location.href = "error.html";

        });
    };


    $scope.car = car.data;
    $scope.ticket = parkingProvider.calculateTicket(car.data);
    
});