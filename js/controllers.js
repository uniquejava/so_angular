/**
 * Created by cyper on 8/2/16.
 */
parking.controller('parkingCtrl', function ($scope, $filter, $http, parkingService3, parkingHttpFacade) {
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
        parkingHttpFacade.saveCar(car)
            .success(function (data, status, headers, config) {
                retrieveCars();
                $scope.message = "The car was parked successfully!";

            })
            .error(function (data, status, headers, config) {
                switch (status) {
                    case 401:
                    {
                        $scope.message = "You must be authenticated!";
                        break;
                    }
                    case 500:
                    {
                        $scope.message = "Something went wrong!";
                        break;

                    }
                }
                console.log(data, status);

            });

    };

    $scope.calculateTicket = function (car) {
        $scope.ticket = parkingService3.calculateTicket(car);

    };

    var retrieveCars = function () {
        parkingHttpFacade.getCars()
            .success(function (data, status, headers, config) {
                $scope.cars = data;

            })
            .error(function (data, status, headers, config) {
                switch (status) {
                    case 401:
                    {
                        $scope.message = "You must be authenticated!";
                        break;
                    }
                    case 500:
                    {
                        $scope.message = "Something went wrong!";
                        break;

                    }
                }
                console.log(data, status);

            });
    };
    retrieveCars();
});



