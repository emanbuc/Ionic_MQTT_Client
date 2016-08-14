angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,mqttclient) {

  $scope.connect= function(){
    cordova.plugins.CordovaMqTTPlugin.connect({
          url:"tcp://broker.mqttdashboard.com", //a public broker used for testing purposes only. Try using a self hosted broker for production. 
          port:1883, 
          clientId:"MY_CLIENT_ID_20160814",
          connectionTimeout:3000,
          willTopicConfig:{
              qos:2,
              retain:true,
              topic:"ebtest",
              payload:"Messaggio di prova"
          },
          username:"uname",
          password:'pass',
          keepAlive:60,
          success:function(s){
              console.log("connect success");
          },
          error:function(e){
              console.log("connect error");
          },
          onConnectionLost:function (){
              console.log("disconnect");
          }
      })
  };

$scope.publish= function(){
    cordova.plugins.CordovaMqTTPlugin.publish({
         topic:"ebtest",
         payload:"hello from the plugin",
         qos:0,
         retain:false,
        success:function(s){
       
        },
        error:function(e){
        
        }
    })
};

$scope.subscribe=function(){
    cordova.plugins.CordovaMqTTPlugin.subscribe({
       topic:"ebtest",
       qos:0,
      success:function(s){
     
      },
      error:function(e){
      
      }
    });
};

$scope.disconnect = function(){
  cordova.plugins.CordovaMqTTPlugin.disconnect({
  success:function(s){
 
  },
  error:function(e){
  
  }
})
}



})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
