
var app = angular.module("Posts", []);

app.controller("addPostController", function($scope, $http, $timeout) {

$scope.addPost = function() {

	database = firebase.database();

	var ref = database.ref('Posts');

	const
	id = Math.round(Math.random() * (1000000000 - 1) + 1);

	var datePost = document.getElementById("date").value;
	
	var timeLost = document.getElementById("time").value;

	var file = document.getElementById("fileInput").files[0];
	
	var location = document.getElementById("location").value;

	var description = document.getElementById("description").value;

	var objet = document.getElementById("object").value;
	
	var type = document.getElementById("type").value;

	// Create a storage file"

	var storageRef = firebase.storage().ref("images/" + "image" + id);

	// Upload file

	var task = storageRef.put(file);

	task.on('state_changed', function(snapshot) {

		// Observe state change events such as progress, pause, and resume

		// Get task progress, including the number of bytes uploaded and the
		// total number of bytes to be uploaded

		var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

		console.log('Upload is ' + progress + '% done');

		switch (snapshot.state) {

		case firebase.storage.TaskState.PAUSED: // or 'paused'

			console.log('Upload is paused');

			break;

		case firebase.storage.TaskState.RUNNING: // or 'running'

			console.log('Upload is running');

			break;

		}

	}, function(error) {

		// Handle unsuccessful uploads

	}, function() {

		// Handle successful uploads on complete

		// For instance, get the download URL:
		// https://firebasestorage.googleapis.com/...

		var downloadURL = task.snapshot.downloadURL;

		console.log(downloadURL);
		var mounth = new Date().toDateString().substr(4, 4);

		var day = new Date().getDay();

		var hour = new Date().getHours();

		var minute = new Date().getMinutes();

		var timePost = day + " " + mounth + hour + ":" + minute;
		
		var user = firebase.auth().currentUser.uid;
		
		
		const
		reff = firebase.database().ref().child('usersTizen/'+user);


		reff.on("value", function(snapshot) {

			$timeout(function() {
				
				$scope.userPost = snapshot.val();
			
				var ref = database.ref('Posts');
				var myRef = ref.push();
				var key = myRef.key

				var data = {
						
				
					id : key,

					date : datePost,

					description : description,

					object : objet,

					place : location,

					placePost : location,

					postPicture : downloadURL,

					state : "Open",

					time : timeLost,

					timePost : timePost,

					type : type,

					user : $scope.userPost

				};
				
				console.log(data);
				

				myRef.set(data);
				window.location = "home.html";
				
				
				

			});
		});
		
		

		
		

	});
	






}
});



