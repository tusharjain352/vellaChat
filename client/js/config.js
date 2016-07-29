chatApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
            controller:'homeCtrl'
        })

        .state('group',{
            url:'/group',
            templateUrl: 'templates/group.html',
            controller:'groupCtrl'
        })

        .state('groupDetails',{
            url:'/groupDetails',
            params : {
                myparams : null
            },
            templateUrl:'templates/groupDetails.html',
            controller:'groupDetailsCtrl'
        })

        .state('signup',{
            url:'/signup',
            templateUrl:'templates/signup.html',
            controller:'signupCtrl'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit   
            url: '/about',
            templateUrl: 'templates/about.html'    
        })

        .state('chat', {
            // we'll get to this in a bit  
            //myparams: {'myparams':null},
            // abstract:true,
            url: '/chat',
            templateUrl: 'templates/chat.html',
            controller:'chatCtrl'     
        })
        .state('chat.onToOne', {
            // we'll get to this in a bit  
            //myparams: {'myparams':null},
            url: '/oneToOne',
            params : {
                myparams : null
            },
            templateUrl: 'templates/chatOneToOne.html',
            controller:'oneToOneCtrl'     
        });
        
});
