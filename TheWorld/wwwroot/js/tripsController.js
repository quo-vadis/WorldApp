//tripsController.js
(function() {
    "use scrict";

    //Getting existing module
  angular.module("app-trips")
    .controller("tripsController", tripsController);

  function tripsController($http) {

    var vm = this;

    vm.trips = [];

    vm.trips = [];

    vm.errorMessage = "";
    vm.isBusy = true;

    $http.get("/api/trips")
      .then(function(resp) {
          angular.copy(resp.data, vm.trips);
        },
        function(error) {
            vm.errorMessage = "Failed to load data" + error;
        })
        .finally(function() {
          vm.isBusy = false;
      });

    vm.newTrip = {};

    vm.addTrip = function () {

        vm.isBusy = true;

      $http.post("/api/trips", vm.newTrip)
        .then(function(resp) {
            vm.trips.push(resp.data);
            vm.newTrip = {};
          },
          function() {
            vm.errorMessage = "Failed to save new trip";
          })
        .finally(function() {
          vm.isBusy = false;
        });
    };

  }

})();