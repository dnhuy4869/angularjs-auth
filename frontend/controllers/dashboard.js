var app = angular.module('dashboardApp', []);

app.controller('DashboardController', function ($scope, $window) {
    $scope.users = [
        { username: 'user1', email: 'user1@example.com' },
        { username: 'user2', email: 'user2@example.com' },
        { username: 'user3', email: 'user3@example.com' }
    ];

    $scope.logout = function () {
        console.log("logout");
        $window.location.href = 'login.html';
    };

    $scope.editUser = function (user) {
        alert('Edit user: ' + user.username);
    };

    $scope.deleteUser = function (user) {
        var index = $scope.users.indexOf(user);
        if (index > -1) {
            $scope.users.splice(index, 1);
        }
    };
});
