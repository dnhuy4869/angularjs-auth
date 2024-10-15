var app = angular.module('myApp', []);

app.controller('MainController', function ($scope) {
    $scope.title = "Welcome to My AngularJS Website!";
    $scope.description = "This is a simple single-page application using AngularJS.";
    $scope.userName = "";
});