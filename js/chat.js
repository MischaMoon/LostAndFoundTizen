var app = angular.module('chatApp', [ 'firebase' ]);

app.controller('chatAppController', function($scope, $firebaseArray,
		$firebaseObject) {
	
	var refChat = firebase.database().ref().child('messages');
	$scope.messages = $firebaseArray(refChat);
	$scope.uid = localStorage.getItem('uid');
	
	console.log($scope.uid);

	$scope.send = function() {

		var uid = localStorage.getItem('uid');
		var refUser = firebase.database().ref().child('usersTizen/' + uid);
		var user = $firebaseObject(refUser);

		user.$loaded().then(function() {

			
			
			
			try
		       {
		          //var appControl = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/create_content", null, "image/jpg", null);
		          //      appControl= new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/pick",null,"IMAGE",null);
		   var notificationDict =
		          {
		             content: $scope.messageText,
		            // iconPath: "PATH",
		            // soundPath: "PATH",
		            // vibration: true,
		             userPhoto : user.profile_picture,
		             userName : user.username
		          };
		   //"SIMPLE", "THUMBNAIL", "ONGOING", "PROGRESS"
		          var notification = new tizen.StatusNotification("SIMPLE", data.titre, notificationDict);
		 
		          tizen.notification.post(notification);
		       }
		       catch (err)
		       {
		          console.log(err.name + ": " + err.message);
		       }  
			
			
			
			
			console.log(user);
			$scope.messages.$add({
				message : $scope.messageText,

				date : Date.now(),

				user : user
			})
			$scope.messageText = "";
			window.scrollTo(20, document.body.scrollHeight );
		});
		
		

		//window.location = "chat.html";
	}

});
