var appProfile = angular.module("Profile", [ 'firebase' ]);

appProfile.controller("ProfileController", function ($scope, $http, $timeout,$firebaseObject) {


    $scope.profile = function () {

        const ref = firebase.database().ref().child('usersTizen');

        ref.on("value", function (snapshot) {
            $timeout(function () {
                var user = firebase.auth().currentUser;
                const
                    refProfile = firebase.database().ref().child('usersTizen/' + user.uid);
                console.log(user.uid + "++++");

                refProfile.on("value", function (snapshot) {

                    $timeout(function () {
                        $scope.userProfile = snapshot.val();
                    });


                });

            });
        });
    };

	$scope.loadPost = function() {
        $scope.ps = [];
		$scope.allPostes = [];
		$scope.postList = [];

		const ref = firebase.database().ref().child('Posts');

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

				const r = firebase.database().ref().child('Posts/' + p.id);
				var obj = $firebaseObject(r);
				obj.$remove().then(function(r) {
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

var appU = angular.module("update", []);

appU.controller("updateController", function ($scope, $http, $timeout) {


    $scope.profile = function () {

        const ref = firebase.database().ref().child('usersTizen');

        ref.on("value", function (snapshot) {
            $timeout(function () {
                var user = firebase.auth().currentUser;
                const
                    refProfile = firebase.database().ref().child('usersTizen/' + user.uid);
                console.log(user.uid + "++++");

                refProfile.on("value", function (snapshot) {

                    $timeout(function () {
                        $scope.userProfile = snapshot.val();
                    });


                });

            });
        });
    };
	
    $scope.setProfile = function () {
        database = firebase.database();

        var user = firebase.auth().currentUser;
        var refProfile = firebase.database().ref().child('usersTizen/' + user.uid);

        var image = document.getElementById("file").files[0];

        var data = {
            email: document.getElementById("Email").value,
            password: document.getElementById("Password").value,
            profile_picture: $scope.userProfile.profile_picture,
            uid: user.uid,
            username: document.getElementById("Name").value,
            phone: document.getElementById("Phone").value,
            university: document.getElementById("university").value
        };


        // Create a storage file"

        var storageRef = firebase.storage().ref("profilepics/" + "image" + user.uid);

        // Upload file

        console.log("image", image);
        if (image) {

            var task = storageRef.put(image);

            console.log("task", task);
            task.on('state_changed', function (snapshot) {

                // Observe state change events such as progress, pause, and resume

                // Get task progress, including the number of bytes uploaded and the
                // total number of bytes to be uploaded

                $scope.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                console.log('Upload is ' + $scope.progress + '% done');

                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;

                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }

            }, function (error) {

                // Handle unsuccessful uploads

            }, function () {

                // Handle successful uploads on complete

                // For instance, get the download URL:
                // https://firebasestorage.googleapis.com/...

                var downloadURL = task.snapshot.downloadURL;

                $scope.userProfile.profile_picture = downloadURL;
                $scope.$apply();

                console.log(data);
                refProfile.set(data);
                //window.location = "profile.html";
//				
				window.location = "home.html";

            });
        } else {
            refProfile.set(data);
        }

    };	
});

var app = angular.module('myApp', ['zingchart-angularjs']);

app.controller('MainController', function($scope) {

    $scope.myJson = {
        globals: {
            shadow: false,
            fontFamily: "Verdana",
            fontWeight: "100"
        },
        type: "pie",
        backgroundColor: "#fff",

        legend: {
            layout: "x5",
            position: "50%",
            borderColor: "transparent",
            marker: {
                borderRadius: 10,
                borderColor: "transparent"
            }
        },
        tooltip: {
            text: "%v requests"
        },
        plot: {
            refAngle: "-90",
            borderWidth: "0px",
            valueBox: {
                placement: "in",
                text: "%npv %",
                fontSize: "15px",
                textAlpha: 1,
            }
        },
        series: [{
            text: "10.0.0.80",
            values: [4660],
            backgroundColor: "#FA6E6E #FA9494",
        }, {
            text: "167.114.156.198",
            values: [1807],
            backgroundColor: "#F1C795 #feebd2"
        }]
    };
});


	
	
	
