var pyMustWatchApp = angular.module('pyMustWatchApp', []);

pyMustWatchApp.controller('VideoListCtrl', function($scope, $http, $sce) {
    $scope.currentVideo = null;
    
    $http.get('./videos.json').success(function (data) {
        $scope.videos = data;
    });

    $scope.youtubeIdFromUri = function(uri) {
        var re = /v=([a-z0-9_\-]+)/i;
        var match = uri.match(re);
        var id = match[1];
        return id;
    }

    $scope.youtubeThumbnail = function(uri) {
        var id = $scope.youtubeIdFromUri(uri);
        return 'http://i.ytimg.com/vi/' + id + '/mqdefault.jpg';
    }

    $scope.youtubeEmbed = function(uri) {
        var id = $scope.youtubeIdFromUri(uri);
        console.log(id);
        return 'http://www.youtube.com/embed/' + id;
    }

    $scope.currentVideoUri = function() {
        if ($scope.currentVideo !== null) {
            var uri = $scope.currentVideo.videos.youtube;
            return $sce.trustAsResourceUrl(uri);
        }

    }

    $scope.setCurrentVideo = function(videoObject) {
        $scope.currentVideo = videoObject;
        var currentVideoId = $scope.youtubeIdFromUri($scope.currentVideo.videos.youtube);
        player.loadVideoById(currentVideoId);

    }

    $scope.selectVideo = function(videoObject) {
        // http://stackoverflow.com/questions/14147677/youtube-iframe-api-on-internet-explorer-and-firefox
        $('#video-player-container').removeClass('hide');
        $('html, body').animate({ scrollTop: 0 }, 150,"swing");
        $scope.setCurrentVideo(videoObject);     
    }

});