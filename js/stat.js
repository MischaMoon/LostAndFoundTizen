var app = angular.module('statApp', [ 'firebase' ]);

app.controller('statAppController', function($scope, $firebaseArray,
		$firebaseObject) {
	
	var refChat = firebase.database().ref().child('Post');
	$scope.Post = $firebaseArray(refChat);
	
	
	

	$scope.chart = function() {
		console.log("zebi w zabour 3amlou 3arka");
		
		var refChat = firebase.database().ref().child('Post');
		var post = $firebaseArray(refChat);
		
		$scope.lost = 0;
		$scope.found = 0;
		
		
		post.$loaded()
	    .then(function(){
	        angular.forEach(post, function(p) {
	            console.log(p);
	            
			      if (p.type == "found") {
			    	  $scope.found++;
			      }
			      
			      if (p.type == "lost") {
			    	  $scope.lost++;
			      }
	console.log($scope.found+" "+$scope.lost);
	        })
	    });




		
		

		
	}

});



// google.charts.load('current', {'packages':['corechart']});
//      google.charts.setOnLoadCallback(drawChart);
//
//      function drawChart() {
//
//        var data = google.visualization.arrayToDataTable([
//          ['Task', 'Hours per Day'],
//          ['Work',     11],
//          ['Eat',      2],
//          ['Commute',  2],
//          ['Watch TV', 2],
//          ['Sleep',    7]
//        ]);
//
//        var options = {
//          title: 'My Daily Activities'
//        };
//
//        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
//
//        chart.draw(data, options);
//      }