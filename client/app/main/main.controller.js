'use strict';

angular.module('basej3App')
  .controller('MainCtrl', function ($scope, $http, socket) {

    $scope.symbols = [];
    $scope.newSymbol = '';

    $http.get('/api/symbols').success(function(symbols) {
      $scope.symbols = symbols;
      socket.syncUpdates('symbol', $scope.symbols);
    });

    $scope.addSymbol = function() {
      if($scope.newSymbol === '') {
        return;
      }
      $http.post('/api/symbols', { name: $scope.newSymbol.toUpperCase() });
      $scope.newSymbol = '';
    };

    $scope.deleteSymbol = function(symbol) {
      $http.delete('/api/symbols/' + symbol._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('symbol');
    });

  });
