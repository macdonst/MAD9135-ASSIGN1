angular.module('CollarApp', ['ionic', 'CollarAppCtrls', 'CollarAppSrvs'])

.run(function($ionicPlatform, $rootScope, contactSrv) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
        $rootScope.networkStatus = contactSrv.detectConnection();
         
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('contacts', {
            url: '/',
            templateUrl: 'templates/contact-all.html',
            controller: 'rootCtrl',
            resolve: {
                httpRaw: ['$http',
                    function($http) {
                        return $http.get('https://dl.dropboxusercontent.com/u/887989/MAD9135/contacts.json')
                            .then(function(response) {
                                return response.data;
                            });
                    }
                ]
            }
        })
        .state('details', {
            url: '/details',
            templateUrl: 'templates/contact-details.html',
            controller: 'detailsCtrl',
            resolve: {
                selectedContact: ['contactSrv',
                    function(contactSrv) {
                        return contactSrv.getSelectedContact();
                    }
                ]
            }
        })
        .state('add', {
            url: '/add',
            templateUrl: 'templates/contact-add.html',
            controller: 'addCtrl'

        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
});
