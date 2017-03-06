'use strict';

angular.module('basej3App')
  .factory('FinanceData', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    // for each symbol.name make a yahoo query for financial data
    // https://developer.yahoo.com/yql/console
      
    // https://developer.yahoo.com/yql/console
	// request data to yahoo
	return {
		getData: function(names){
			var url1= "https://query.yahooapis.com/v1/public/yql?q=",
			  select="select * from yahoo.finance.historicaldata where symbol in ("+names.join(",")+")",
			  curdate= new Date,
			  startDate= (curdate.getFullYear()-1)+"-01-01",
			  endDate= curdate.getFullYear()+"-"+curdate.getMonth()+"-"+curdate.getDay(),
			  url2=encodeURIComponent(select+" and startDate='"+startDate+"' and endDate='"+endDate+"'"),
			  url3="&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"; //&callback=
			var queryStr = url1+url2+url3;

			return $http.get(queryStr);
		}
	}

  });
