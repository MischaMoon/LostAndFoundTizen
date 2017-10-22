function logout() {
	firebase.auth().signOut().then(function() {
		// Sign-out successful.
		window.location = "login.html";
		// document.getElementById("btn_go_sign_in").click();
	}, function(error) {
		// An error happened.

	});

}

var app = angular.module("Posts", [ 'firebase' ]);

app.controller("postController", function($scope, $http, $timeout,
		$firebaseObject) {

	$scope.ps = [];
	var psts = [];

	$scope.loadPost = function() {

		$scope.allPostes = [];
		$scope.postList = [];

		const
		ref = firebase.database().ref().child('Posts');

		ref.on("value", function(snapshot) {

			$timeout(function() {
				// console.log(firebase.auth().currentUser.uid + "======");
				$scope.uid = firebase.auth().currentUser.uid;

				localStorage.setItem("uid", $scope.uid);

				$scope.ps = snapshot.val();
				var keys = Object.keys($scope.ps);
				$scope.postUid = [];
				for (var i = 0; i < keys.length; i++)

				{

					var key = keys[i];

					$scope.postList.push($scope.ps[key]);
					// console.log(JSON.stringify($scope.ps[key]));

				}

				$scope.allPostes = $scope.postList.reverse();

			});

		});

		$scope.displayPostDetail = function(p) {

			localStorage.setItem("post", JSON.stringify(p));
			window.location.href = "blog-post.html";

		}

		$scope.delateMyPost = function(p) {
			console.log(p.id);
			if (confirm('Are you sure you want to delete your post ?')) {

				const
				ref = firebase.database().ref().child('Posts/' + p.id);
				var obj = $firebaseObject(ref);
				obj.$remove().then(function(ref) {
					// data has been deleted locally and in the database
				}, function(error) {
					console.log("Error:", error);
				});

				alert("post deleted");
				window.location = "home.html";
			}

		};

	};

});

var postDetail = angular.module("PostsDetails", []);
postDetail.controller("postsDetailsController", function($scope, $http,
		$timeout) {

	$scope.loadPostDetail = function() {

		$scope.postDetail = JSON.parse(localStorage.getItem('post'));
		console.log($scope.postDetail);

	}

});
