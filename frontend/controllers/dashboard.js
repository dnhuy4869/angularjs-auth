var app = angular.module('dashboardApp', []);

app.controller('DashboardController', function ($scope, $http, $window) {
    $scope.users = [];

    $scope.fetchUsers = function () {
        $http.get('http://127.0.0.1:8000/user/get-all')
            .then(function (response) {
                $scope.users = response.data;
            }, function (error) {
                console.error('Error fetching users:', error);
            });
    };

    $scope.logout = function () {
        console.log("logout");
        $window.location.href = 'login.html';
    };

    $scope.editUser = function (user) {
        alert('Edit user: ' + user.username);
    };

    $scope.deleteUser = function (user) {
        $http.delete('http://127.0.0.1:8000/user/delete-one/' + user._id)
            .then(function (response) {
                console.log('User deleted:', response.data);
                // Remove user from the local users array
                var index = $scope.users.indexOf(user);
                if (index > -1) {
                    $scope.users.splice(index, 1);
                }
            }, function (error) {
                console.error('Error deleting user:', error);
            });
    };

    // Init users
    $scope.fetchUsers();
});
