(function() {
  "use scrict";

  angular.module("app-trips")
    .controller("tripEditorController", tripEditorController);

  function tripEditorController($routeParams, $http) {
    var vm = this;

    vm.tripName = $routeParams.tripName;

    vm.stops = [];
    vm.errorMessage = "";
    vm.isBusy = true;
    vm.newStop = {};

    vm.url = "/api/trips/" + vm.tripName + "/stops";

    $http.get(vm.url)
      .then(function(resp) {
          angular.copy(resp.data, vm.stops);
          _showMap(vm.stops);
        },
        function(error) {
          vm.errorMessage = "failed to load Stops" + error;
        })
      .finally(function() {
        vm.isBusy = false;
        });

    vm.addStop = function() {
        vm.isBusy = true;

      $http.post(vm.url, vm.newStop)
        .then(function(resp) {
            vm.stops.push(resp.data);
            _showMap(vm.stops);
            vm.newStop = {};
          },
          function(err) {
            vm.errorMessage = "Falded to add new Stop" + err;
          })
        .finally(function() {
          vm.isBusy = false;
        });
    };
  }

  function _showMap(stops) {
      if (stops && stops.length > 0) {

       var mapStops = _.map(stops,
            function (item) {
              return {
                lat: item.latitude,
                long:item.longitude,
                info:item.name
              };
            });

      travelMap.createMap({
        stops: mapStops,
        selector: "#map",
        currentStop: 1,
        initialZoom : 3
      });
    }
  }

})();