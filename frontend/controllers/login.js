var app = angular.module('loginApp', []);

app.controller('LoginController', ($scope, $http, $window) => {
    $scope.user = {};
    $scope.isLoginFailed = false;

    $scope.login = () => {

        console.log($scope.user.username);
        console.log($scope.user.password);

        var loginData = {
            username: $scope.user.username,
            password: $scope.user.password
        };

        $http.post('http://127.0.0.1:8000/auth/login', loginData, {
            withCredentials: true
        })
            .then((response) => {
                console.log(response.data);

                localStorage.setItem('loginData', JSON.stringify(response.data));
                $scope.isLoginFailed = false;
                $window.location.href = 'verify.html';

            }, (error) => {
                console.log(error);
                $scope.isLoginFailed = true;
            });
    };
});