var app = angular.module('myApp', []);

app.factory('AuthInterceptor', ($q, $window, $injector) => {
    const refreshToken = async () => {
        try {
            const $http = $injector.get('$http');
            const res = await $http.post('http://127.0.0.1:8000/auth/refresh', {}, {
                headers: { 'skip-interceptor': true },
                withCredentials: true
            });

            const currUser = JSON.parse($window.localStorage.getItem('loginData'));
            if (currUser) {
                currUser.accessToken = res.data.accessToken;
                $window.localStorage.setItem('loginData', JSON.stringify(currUser));

                console.log("Access token refreshed");
            }

            return { isSuccess: true, response: res.data };
        } catch (err) {
            return {
                isSuccess: false,
                response: err.data || { message: 'Unknown error during refresh' }
            };
        }
    };

    return {
        request: function (config) {
            const currUser = JSON.parse($window.localStorage.getItem('loginData'));
            const token = currUser ? currUser.accessToken : '';
            console.log(`Access token: ${token}`);

            config.headers = config.headers || {};
            config.headers['authorization'] = token;
            return config;
        },

        responseError: async (response) => {
            const $http = $injector.get('$http');
            const originalRequest = response.config;

            if (originalRequest.headers['skip-interceptor']) {
                return $q.reject(response);
            }

            if (response.status === 401 && response.data.invalidToken && !originalRequest._retry) {
                const result = await refreshToken();
                if (result.isSuccess) {
                    originalRequest._retry = true;
                    originalRequest.headers['authorization'] = result.response.accessToken;
                    return $http(originalRequest);
                } else {
                    const event = new CustomEvent('refreshTokenFailed');
                    window.dispatchEvent(event);

                    console.log("Refresh token expired");
                }
            }

            return $q.reject(response);
        }
    };
});

app.config(($httpProvider) => {
    $httpProvider.interceptors.push('AuthInterceptor');
});

app.run(function ($http) {
    console.log("App has been loaded");
});