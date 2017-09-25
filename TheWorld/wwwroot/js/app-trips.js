//app-trips.js
(function() {
  angular.module("app-trips", ["simpleControls", "ngRoute"])
    .config(function($routeProvider) {

      $routeProvider.when("/",
          {
            controller: "tripsController",
            controllerAs: "vm",
            templateUrl: "/view/tripsView.html"
          })
        .when("/editor/:tripName",
          {
            controller: "tripEditorController",
            controllerAs: "vm",
            templateUrl: "/view/tripEditorView.html"
          });

      $routeProvider.otherwise({ redirectTo: "/" });
    });
})();
