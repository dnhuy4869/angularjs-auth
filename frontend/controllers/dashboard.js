var app = angular.module('myApp', []);

app.controller('DashboardController', ($scope, $http, $window) => {
    $scope.users = [];

    $scope.fetchUsers = () => {
        $http.get('http://127.0.0.1:8000/user/get-all')
            .then((response) => {
                $scope.users = response.data;
            }, function (error) {
                console.error('Error fetching users:', error);
            });
    };

    $scope.logout = () => {
        console.log("logout");

        $window.localStorage.removeItem('loginData');
        $window.location.href = 'login.html';
    };

    $scope.editUser = (user) => {
        alert('Edit user: ' + user.username);
    };

    $scope.deleteUser = (user) => {
        $http.delete('http://127.0.0.1:8000/user/delete-one/' + user._id)
            .then((response) => {
                console.log('User deleted:', response.data);
                // Remove user from the local users array
                var index = $scope.users.indexOf(user);
                if (index > -1) {
                    $scope.users.splice(index, 1);
                }
            }, (error) => {
                console.error('Error deleting user:', error);
            });
    };

    // Init users
    $scope.fetchUsers();
});
