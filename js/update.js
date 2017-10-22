var appProfile = angular.module("Profile", []);
appProfile.controller("UprofileController", function ($scope, $http, $timeout) {


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
});
	