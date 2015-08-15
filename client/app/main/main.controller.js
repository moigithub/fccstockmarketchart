'use strict';

angular.module('basej3App')
  .controller('MainCtrl', function ($scope, $http, socket, FinanceData) {

    $scope.symbols = [];
    $scope.newSymbol = '';

    var names = ['MSFT', 'AAPL', 'GOOG'];

    $http.get('/api/symbols').success(function(symbols) {
      $scope.symbols = symbols;
      socket.syncUpdates('symbol', $scope.symbols, function(){
        names = symbols.map(function(symbol){
          return "'"+symbol.name+"'";
        });
        updateChart(names);
      });


      // fill highchart data
      names = symbols.map(function(symbol){
        return "'"+symbol.name+"'";
      });

      // refresh chart data
      updateChart(names);
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



/// highchart
    // create the chart when all data is loaded
    var createChart = function (seriesOptions) {
      $('#chart').highcharts('StockChart', {
          rangeSelector: {
              selected: 1
          },

          yAxis: {
              labels: {
                  formatter: function () {
                      return (this.value > 0 ? ' + ' : '') + this.value + '%';
                  }
              },
              plotLines: [{
                  value: 0,
                  width: 2,
                  color: 'silver'
              }]
          },

          plotOptions: {
              series: {
                  compare: 'percent'
              }
          },

          tooltip: {
              pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
              valueDecimals: 2
          },

          series: seriesOptions
      });
    }; // fin createChart

    function updateChart(names){
      // for each symbol.name make a yahoo query for financial data
      var seriesOptions = [];

      FinanceData.getData(names).success(function(historicaldata){
        // fill data array
        // reformat data
        
        //console.log("hist",historicaldata);
        var collectData={};
        historicaldata.query.results.quote.forEach(function(data){
          // if object dont exist.. create/initialize as empty array
          if(!collectData[data.Symbol]) {
            collectData[data.Symbol]=[];
          }
          collectData[data.Symbol].push([Date.parse(data["Date"]),parseFloat(data.Open)]);
        });

        Object.keys(collectData).forEach(function(symbol){
          // data must be ascending, on X (date)
          seriesOptions.push( { name: symbol, data:collectData[symbol].sort(function(a,b){return a[0]-b[0];}) });
        });

        // create/display chart
        console.log(seriesOptions);

        createChart(seriesOptions);
      });

    } // fin updateChart
  });
