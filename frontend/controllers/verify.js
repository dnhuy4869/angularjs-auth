var app = angular.module('verifyApp', []);

app.controller('VerifyController', ($scope, $http, $window) => {
    $scope.verificationCode = "";
    $scope.isVerifyFailed = false;

    $scope.verify = () => {

        const currUser = JSON.parse($window.localStorage.getItem('loginData'));

        console.log(currUser.username);
        console.log($scope.verificationCode);

        var verifyData = {
            username: currUser.username,
            code: $scope.verificationCode
        };

        $http.post('http://127.0.0.1:8000/auth/verify-email', verifyData, {
            withCredentials: true
        })
            .then((response) => {
                console.log(response.data);

                localStorage.setItem('loginData', JSON.stringify(response.data));
                $scope.isVerifyFailed = false;
                $window.location.href = 'dashboard.html';

            }, (error) => {
                console.log(error);
                $scope.isVerifyFailed = true;
            });
    };
});