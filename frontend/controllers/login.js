var app = angular.module('myApp', []);

app.controller('MainController', function ($scope, $http, $window) {
    $scope.title = "Welcome to My AngularJS Website!";
    $scope.description = "This is a simple single-page application using AngularJS.";

    $scope.user = {};
    $scope.isLoginFailed = false;

    $scope.login = function () {

        console.log($scope.user.username);
        console.log($scope.user.password);

        var loginData = {
            username: $scope.user.username,
            password: $scope.user.password
        };

        $http.post('http://127.0.0.1:8000/auth/login', loginData)
            .then(function (response) {
                console.log(response.data);

                $scope.isLoginFailed = false;
                $window.location.href = 'dashboard.html';

            }, function (error) {
                console.log(error);
                $scope.isLoginFailed = true;
            });
    };
});